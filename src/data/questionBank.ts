import { DifficultyLevel, InductiveQuestion, QuestionFamily } from '../types';
import { assertUniqueQuestionSet, parameterizedQuestion, questionFingerprint } from '../engine/parameterizedQuestions';

const families: QuestionFamily[] = ['group_classification', 'odd_one_out', 'rule_identification', 'analogy', 'sequence_induction'];
const levels: DifficultyLevel[] = ['mudah', 'sedang', 'sulit'];
const names: Record<QuestionFamily, string> = {
  group_classification: 'Klasifikasi Kelompok', odd_one_out: 'Cari Figur Berbeda',
  rule_identification: 'Identifikasi Aturan', analogy: 'Analogi Jumlah Titik', sequence_induction: 'Deret Jumlah Titik',
};

// A fixed catalogue, not a fresh random session. IDs, content and answer letters
// remain identical after reload; existing reference IDs/bookmarks are preserved.
export function completeQuestionBank(reference: InductiveQuestion[]): InductiveQuestion[] {
  const bank = [...reference];
  const seen = new Set(bank.map(questionFingerprint));
  for (const family of families) {
    let count = bank.filter(q => q.family === family).length;
    for (let cursor = 0; count < 200 && cursor < 4096; cursor++) {
      const code = (cursor * 2053 + families.indexOf(family) * 97) % 4096;
      let seed = code + families.indexOf(family) * 4096 + 1;
      const random = () => {
        seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
        return seed / 4294967296;
      };
      const question = parameterizedQuestion(code, family, levels[cursor % levels.length], random);
      const fingerprint = questionFingerprint(question);
      if (seen.has(fingerprint)) continue;
      seen.add(fingerprint);
      question.id = `bank-v1-${family}-${code}`;
      question.title = `${names[family]}: Relasi Titik ${String(count + 1).padStart(3, '0')}`;
      bank.push(question);
      count++;
    }
    if (count !== 200) throw new Error(`Bank kategori ${family} belum lengkap.`);
  }
  assertUniqueQuestionSet(bank, 1000);
  return bank;
}
