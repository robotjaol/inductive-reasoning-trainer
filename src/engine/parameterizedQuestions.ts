import { InductiveQuestion, StimulusItem, QuestionFamily, DifficultyLevel } from '../types';

// 4096 combinations of relevant counts/steps, independent of labels and option order.
export function parameterizedQuestion(code: number, family: QuestionFamily, difficulty: DifficultyLevel, random: () => number = Math.random): InductiveQuestion {
  const a = code % 8 + 1;
  const b = Math.floor(code / 8) % 8 + 1;
  const c = Math.floor(code / 64) % 8 + 1;
  const step = Math.floor(code / 512) % 8 + 1;
  const item = (black: number, white: number): StimulusItem => ({
    primaryShape: 'square', dots: { blackCount: black, whiteCount: white, positions: 'grid' },
    description: `${black} titik hitam dan ${white} titik putih`,
  });
  const q: InductiveQuestion = {
    id: `parameter-${family}-${code}`, title: 'Relasi Jumlah Titik', family, difficulty,
    tags: ['titik', 'relasi-kuantitatif'], prompt: '', options: [], correctAnswerId: 'A',
    explanation: { hiddenRule: '', summary: '', evidenceAnalysis: [], stepByStep: [], distractors: [], proTip: 'Hitung titik hitam dan putih secara terpisah, lalu uji relasinya pada seluruh contoh.' },
  };
  let rule = '';
  let candidates: Array<{ label?: string; stimulus?: StimulusItem }> = [];
  if (family === 'analogy') {
    q.prompt = 'Terapkan perubahan jumlah titik dari A ke B pada C. Warna titik tetap.';
    q.analogyItems = { a: item(a, b), b: item(a + step, b + c), c: item(b, a) };
    rule = `Titik hitam bertambah ${step}; titik putih bertambah ${c}. Hasil C: ${b + step} hitam dan ${a + c} putih.`;
    candidates = [[b + step, a + c], [b, a + c], [b + step, a], [b + step + 1, a + c], [b + step, a + c + 1]].map(([h, w]) => ({ stimulus: item(h, w) }));
  } else if (family === 'sequence_induction') {
    q.prompt = 'Lanjutkan deret. Amati perubahan jumlah titik hitam dan putih pada setiap langkah.';
    // c controls the initial white count, b its step: all four parameters are visible.
    q.contextStimuli = Array.from({ length: 4 }, (_, i) => item(a + i * step, c + i * b));
    const h = a + 4 * step, w = c + 4 * b;
    rule = `Setiap langkah: +${step} titik hitam dan +${b} titik putih. Berikutnya ${h} hitam dan ${w} putih.`;
    candidates = [[h, w], [h - step, w], [h, w - b], [h + 1, w], [h, w + 1]].map(([x, y]) => ({ stimulus: item(x, y) }));
  } else {
    const values = [a, a + b, a + b + c];
    q.groupA = { name: 'Kelompok A', items: values.map(n => item(n, n + step)) };
    q.groupB = { name: 'Kelompok B', items: values.map(n => item(n + step, n)) };
    if (family === 'group_classification') {
      q.prompt = 'Kelompok mana yang sesuai dengan Gambar Uji? Bandingkan jumlah titik kedua warna.';
      const inA = (a + b + c) % 2 === 0;
      q.testItem = inA ? item(c, c + step) : item(c + step, c);
      candidates = [{ label: inA ? 'Kelompok A' : 'Kelompok B' }, { label: inA ? 'Kelompok B' : 'Kelompok A' }, { label: 'Kedua kelompok' }, { label: 'Tidak termasuk keduanya' }];
      rule = `A: putih − hitam = ${step}. B: hitam − putih = ${step}. Gambar uji termasuk ${inA ? 'A' : 'B'}.`;
    } else if (family === 'rule_identification') {
      q.prompt = 'Pilih aturan yang berlaku untuk seluruh contoh positif (A), dan tidak berlaku untuk contoh negatif (B).';
      candidates = [
        { label: `Jumlah titik putih = jumlah titik hitam + ${step}.` },
        { label: `Jumlah titik hitam = jumlah titik putih + ${step}.` },
        { label: 'Jumlah titik hitam sama dengan jumlah titik putih.' },
        { label: `Jumlah titik putih = jumlah titik hitam + ${step + 1}.` },
        { label: `Jumlah titik putih selalu ${a + step}.` },
      ];
      rule = `Pada setiap contoh A, putih − hitam = ${step}; pada B selisihnya −${step}. Jumlah absolut berubah antarcontoh.`;
    } else {
      delete q.groupA; delete q.groupB;
      q.prompt = 'Empat figur mempunyai selisih jumlah titik putih dan hitam yang sama. Pilih satu yang berbeda.';
      candidates = [item(a + b + c + 1, a + b + c + step + 2), ...[a, a + b, a + b + c, a + b + c + 1].map(n => item(n, n + step))].map(stimulus => ({ stimulus }));
      rule = `Empat figur memiliki putih − hitam = ${step}. Figur berbeda memiliki selisih ${step + 1}.`;
    }
  }
  const shuffled = candidates.map((value, i) => ({ ...value, correct: i === 0 }));
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  q.options = shuffled.map((value, i) => {
    const id = String.fromCharCode(65 + i);
    if (value.correct) q.correctAnswerId = id;
    return { id, label: value.label ?? `Pilihan ${id}`, stimulus: value.stimulus };
  });
  q.explanation = {
    hiddenRule: rule, summary: `Jawaban ${q.correctAnswerId}. ${rule}`,
    evidenceAnalysis: [{ title: 'Verifikasi jumlah', points: [rule] }],
    stepByStep: [{ title: 'Hitung dan bandingkan', content: rule }],
    distractors: q.options.filter(o => o.id !== q.correctAnswerId).map(o => ({ optionId: o.id, reason: `Tidak memenuhi seluruh relasi: ${rule}`, flawType: 'incomplete_rule' as const })),
    proTip: q.explanation.proTip,
  };
  return q;
}

export function questionFingerprint(q: InductiveQuestion): string {
  // Object property order is not part of the displayed question.
  const stable = (value: unknown): string => JSON.stringify(value, (_key, nested) => {
    if (nested && typeof nested === 'object' && !Array.isArray(nested)) {
      return Object.fromEntries(Object.entries(nested).sort(([a], [b]) => a.localeCompare(b)));
    }
    return nested;
  });
  const visual = (s?: StimulusItem) => {
    if (!s) return null;
    const { id, textLabel, description, ...data } = s;
    if (data.primaryShape) delete data.sides;
    const periods: Record<string, number> = { square: 90, diamond: 90, triangle: 120, pentagon: 72, hexagon: 60, circle: 1, star: 72, cross: 90 };
    const period = data.innerShapes?.length || data.customPaths?.length ? 360 : periods[data.primaryShape ?? ''] ?? 360;
    data.rotation = ((data.rotation ?? 0) % period + period) % period;
    data.fillColor ??= 'none';
    if (data.segments) data.segments = { ...data.segments, shadedIndices: [...data.segments.shadedIndices].sort((a, b) => a - b) };
    return data;
  };
  const unordered = (items: StimulusItem[]) => items.map(s => stable(visual(s))).sort();
  // Reordering examples does not create a new classification/rule problem.
  // Changing distractors or answer letters does not create a new problem either.
  // Sequence and analogy positions, however, are essential to their meaning.
  return stable([
    q.family,
    q.groupA && unordered(q.groupA.items),
    q.groupB && unordered(q.groupB.items),
    visual(q.testItem),
    q.contextStimuli && (q.family === 'sequence_induction' ? q.contextStimuli.map(visual) : unordered(q.contextStimuli)),
    q.analogyItems && [q.analogyItems.a, q.analogyItems.b, q.analogyItems.c].map(visual),
    q.family === 'odd_one_out' ? unordered(q.options.map(o => o.stimulus!)) : undefined,
  ]);
}

/** Fail closed before a session can display a partial or repeated question set. */
export function assertUniqueQuestionSet(questions: InductiveQuestion[], expectedCount: number): void {
  if (questions.length !== expectedCount) throw new Error('Jumlah soal tidak sesuai permintaan.');
  const fingerprints = new Set<string>();
  for (const question of questions) {
    const fingerprint = questionFingerprint(question);
    if (fingerprints.has(fingerprint)) throw new Error('Duplikat isi soal terdeteksi. Sesi tidak dimulai.');
    fingerprints.add(fingerprint);
  }
}
