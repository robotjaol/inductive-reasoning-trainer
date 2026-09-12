import React, { useState, useMemo } from 'react';
import { InductiveQuestion } from '../types';
import { SvgStimulus } from './SvgStimulus';
import { ExplanationView } from './ExplanationView';
import {
  RotateCcw,
  CheckCircle2,
  XCircle,
  Clock,
  Flag,
  ChevronRight,
  Filter,
  BarChart3,
  HelpCircle,
  FileText,
  Printer,
  Sparkles,
} from 'lucide-react';

interface ResultsSummaryProps {
  questions: InductiveQuestion[];
  userAnswers: Record<string, string>;
  flaggedIds: Set<string>;
  totalTimeSeconds: number;
  onRetakeAll: () => void;
  onRetakeIncorrect: (incorrectQuestions: InductiveQuestion[]) => void;
  onConfigureNewSession: () => void;
}

type ReviewFilter = 'all' | 'incorrect' | 'correct' | 'flagged' | 'unanswered';

export const ResultsSummary: React.FC<ResultsSummaryProps> = ({
  questions,
  userAnswers,
  flaggedIds,
  totalTimeSeconds,
  onRetakeAll,
  onRetakeIncorrect,
  onConfigureNewSession,
}) => {
  const [filter, setFilter] = useState<ReviewFilter>('all');
  const [selectedReviewIndex, setSelectedReviewIndex] = useState<number | null>(null);

  // Compute metrics
  const totalQuestions = questions.length;
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  const familyStats: Record<string, { total: number; correct: number }> = {};
  const difficultyStats: Record<string, { total: number; correct: number }> = {};

  const incorrectQuestionsList: InductiveQuestion[] = [];

  questions.forEach((q) => {
    const userChoice = userAnswers[q.id];
    const isAnswered = Boolean(userChoice);
    const isCorrect = userChoice === q.correctAnswerId;

    if (!isAnswered) {
      unansweredCount++;
      incorrectQuestionsList.push(q);
    } else if (isCorrect) {
      correctCount++;
    } else {
      incorrectCount++;
      incorrectQuestionsList.push(q);
    }

    // Family stats
    if (!familyStats[q.family]) {
      familyStats[q.family] = { total: 0, correct: 0 };
    }
    familyStats[q.family].total++;
    if (isCorrect) familyStats[q.family].correct++;

    // Difficulty stats
    if (!difficultyStats[q.difficulty]) {
      difficultyStats[q.difficulty] = { total: 0, correct: 0 };
    }
    difficultyStats[q.difficulty].total++;
    if (isCorrect) difficultyStats[q.difficulty].correct++;
  });

  const accuracyPercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  const avgSecondsPerQuestion = totalQuestions > 0 ? Math.round(totalTimeSeconds / totalQuestions) : 0;

  const formatDuration = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  const familyNames: Record<string, string> = {
    group_classification: 'Klasifikasi Kelompok (A vs B)',
    odd_one_out: 'Odd-One-Out (Cari Anomali)',
    analogy: 'Analogi Geometris (A:B :: C:D)',
    sequence_induction: 'Deret Induktif (Sequence)',
    rule_identification: 'Identifikasi Aturan Pola',
  };

  // Filtered review list
  const filteredQuestions = useMemo(() => {
    return questions
      .map((q, originalIndex) => {
        const userChoice = userAnswers[q.id];
        const isAnswered = Boolean(userChoice);
        const isCorrect = userChoice === q.correctAnswerId;
        const isFlagged = flaggedIds.has(q.id);

        let matches = true;
        if (filter === 'correct' && !isCorrect) matches = false;
        if (filter === 'incorrect' && (isCorrect || !isAnswered)) matches = false;
        if (filter === 'unanswered' && isAnswered) matches = false;
        if (filter === 'flagged' && !isFlagged) matches = false;

        return {
          question: q,
          originalIndex,
          userChoice,
          isAnswered,
          isCorrect,
          isFlagged,
          matches,
        };
      })
      .filter((item) => item.matches);
  }, [questions, userAnswers, flaggedIds, filter]);

  // Review modal/drawer question
  const activeReviewItem = selectedReviewIndex !== null ? questions[selectedReviewIndex] : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Laporan Hasil Penilaian Induktif
          </h1>
          <p className="text-xs text-slate-500 font-mono mt-0.5">
            Selesai pada: {new Date().toLocaleDateString('id-ID', { dateStyle: 'medium', timeStyle: 'short' })}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Cetak / PDF</span>
          </button>
          <button
            type="button"
            onClick={onConfigureNewSession}
            className="px-4 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
          >
            Sesi Baru
          </button>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Score & Accuracy */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Akurasi Skor
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-slate-900">
              {accuracyPercent}%
            </span>
            <span className="text-xs font-mono text-slate-500">
              ({correctCount}/{totalQuestions})
            </span>
          </div>
          <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden mt-2">
            <div
              className={`h-full ${accuracyPercent >= 70 ? 'bg-emerald-600' : accuracyPercent >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`}
              style={{ width: `${accuracyPercent}%` }}
            />
          </div>
        </div>

        {/* Breakdown Counts */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Status Jawaban
          </span>
          <div className="space-y-1 pt-0.5 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-emerald-700 font-medium">✓ Benar</span>
              <strong>{correctCount}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-rose-700 font-medium">✗ Salah</span>
              <strong>{incorrectCount}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">○ Kosong</span>
              <strong>{unansweredCount}</strong>
            </div>
          </div>
        </div>

        {/* Time Stats */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Durasi Pengerjaan
          </span>
          <div className="text-2xl font-mono font-bold text-slate-900">
            {formatDuration(totalTimeSeconds)}
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Rata-rata {avgSecondsPerQuestion}s / soal
          </p>
        </div>

        {/* Flagged items */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
            Ditandai Ragu
          </span>
          <div className="text-2xl font-mono font-bold text-amber-700">
            {flaggedIds.size}
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            {flaggedIds.size > 0 ? 'Perlu ditinjau kembali' : 'Semua dijawab yakin'}
          </p>
        </div>
      </div>

      {/* Performance by Pattern Category Breakdown */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-3">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
          <BarChart3 className="w-4 h-4 text-slate-700" />
          Distribusi Penguasaan Berdasarkan Kategori Pola
        </h2>

        <div className="space-y-2.5 pt-1">
          {Object.entries(familyStats).map(([fam, stats]) => {
            const pct = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            return (
              <div key={fam} className="space-y-1 text-xs">
                <div className="flex justify-between items-center font-mono">
                  <span className="font-medium text-slate-800">
                    {familyNames[fam] || fam}
                  </span>
                  <span className="text-slate-500">
                    <strong className="text-slate-900">{stats.correct}</strong> / {stats.total} ({pct}%)
                  </span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${pct >= 70 ? 'bg-slate-900' : pct >= 50 ? 'bg-amber-600' : 'bg-rose-500'}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action shortcuts */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="text-xs text-slate-600">
          Tersedia{' '}
          <strong className="font-mono text-slate-900">
            {incorrectQuestionsList.length}
          </strong>{' '}
          soal yang belum terjawab atau salah dijawab.
        </div>
        <div className="flex items-center gap-2">
          {incorrectQuestionsList.length > 0 && (
            <button
              type="button"
              onClick={() => onRetakeIncorrect(incorrectQuestionsList)}
              className="px-3.5 py-1.5 rounded border border-slate-800 bg-white text-slate-900 hover:bg-slate-100 text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Kerjakan Ulang Soal Salah</span>
            </button>
          )}
          <button
            type="button"
            onClick={onRetakeAll}
            className="px-3.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <span>Ulangi Seluruh Sesi</span>
          </button>
        </div>
      </div>

      {/* Item-by-Item Review Section */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Tinjauan Pembahasan Butir Soal
            </h2>
            <p className="text-xs text-slate-500">
              Klik pada salah satu soal untuk menelaah stimulus visual, opsi pengecoh, dan hukum keteraturan.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap items-center gap-1 text-xs">
            {(['all', 'incorrect', 'correct', 'flagged', 'unanswered'] as ReviewFilter[]).map((fKey) => {
              const labels: Record<ReviewFilter, string> = {
                all: `Semua (${totalQuestions})`,
                incorrect: `Salah (${incorrectCount})`,
                correct: `Benar (${correctCount})`,
                flagged: `Ragu (${flaggedIds.size})`,
                unanswered: `Kosong (${unansweredCount})`,
              };
              const isSelected = filter === fKey;
              return (
                <button
                  key={fKey}
                  type="button"
                  onClick={() => setFilter(fKey)}
                  className={`px-2.5 py-1 rounded text-xs font-mono transition-colors border cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {labels[fKey]}
                </button>
              );
            })}
          </div>
        </div>

        {/* Review list */}
        <div className="space-y-2 max-h-[480px] overflow-y-auto pr-1">
          {filteredQuestions.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400 font-mono">
              Tidak ada soal dengan filter status ini.
            </div>
          ) : (
            filteredQuestions.map((item) => {
              const q = item.question;
              return (
                <div
                  key={q.id}
                  onClick={() => setSelectedReviewIndex(item.originalIndex)}
                  className="p-3 rounded border border-slate-200 hover:border-slate-400 bg-slate-50/50 hover:bg-white transition-colors cursor-pointer flex items-center justify-between gap-3 text-xs"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className={`w-7 h-7 rounded font-mono font-bold flex items-center justify-center shrink-0 border ${
                        item.isCorrect
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : !item.isAnswered
                          ? 'bg-slate-100 text-slate-500 border-slate-300'
                          : 'bg-rose-50 text-rose-800 border-rose-300'
                      }`}
                    >
                      {item.originalIndex + 1}
                    </span>

                    <div className="min-w-0">
                      <div className="font-semibold text-slate-900 truncate">
                        {q.title}
                      </div>
                      <div className="text-[11px] text-slate-500 truncate">
                        {familyNames[q.family]} • Kunci:{' '}
                        <strong className="text-slate-800 font-mono">
                          {q.correctAnswerId}
                        </strong>{' '}
                        | Jawaban:{' '}
                        <strong className="text-slate-800 font-mono">
                          {item.userChoice || '—'}
                        </strong>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {item.isFlagged && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-300">
                        Ragu
                      </span>
                    )}
                    <span
                      className={`font-mono text-xs font-semibold ${
                        item.isCorrect
                          ? 'text-emerald-700'
                          : !item.isAnswered
                          ? 'text-slate-500'
                          : 'text-rose-700'
                      }`}
                    >
                      {item.isCorrect ? 'Benar' : !item.isAnswered ? 'Kosong' : 'Salah'}
                    </span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Review Modal Dialog */}
      {activeReviewItem && selectedReviewIndex !== null && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-300 max-w-3xl w-full max-h-[90vh] overflow-y-auto p-5 sm:p-6 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-xs font-mono text-slate-500 block">
                  Tinjauan Soal #{selectedReviewIndex + 1}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-slate-900">
                  {activeReviewItem.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedReviewIndex(null)}
                className="px-2.5 py-1 text-xs font-medium text-slate-600 hover:text-slate-900 border border-slate-200 rounded cursor-pointer"
              >
                Tutup [ESC]
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-700">
              {activeReviewItem.prompt}
            </p>

            {/* Stimulus visual in modal */}
            {activeReviewItem.groupA && activeReviewItem.groupB && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-[11px] font-bold text-slate-800 block mb-2">
                    {activeReviewItem.groupA.name}
                  </span>
                  <div className="flex flex-wrap gap-2 justify-around">
                    {activeReviewItem.groupA.items.map((it, idx) => (
                      <SvgStimulus key={idx} stimulus={it} size={76} />
                    ))}
                  </div>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                  <span className="text-[11px] font-bold text-slate-800 block mb-2">
                    {activeReviewItem.groupB.name}
                  </span>
                  <div className="flex flex-wrap gap-2 justify-around">
                    {activeReviewItem.groupB.items.map((it, idx) => (
                      <SvgStimulus key={idx} stimulus={it} size={76} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeReviewItem.testItem && (
              <div className="p-3 bg-slate-100 rounded border border-slate-300 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700">
                  Gambar Uji yang dievaluasi:
                </span>
                <SvgStimulus stimulus={activeReviewItem.testItem} size={84} />
              </div>
            )}

            {/* Explanation View */}
            <div className="flex flex-wrap gap-3">
              {activeReviewItem.contextStimuli?.map((it, idx) => <SvgStimulus key={idx} stimulus={it} size={100} />)}
              {activeReviewItem.analogyItems && Object.entries(activeReviewItem.analogyItems).map(([name, it]) => <div key={name}><span>{name.toUpperCase()}</span><SvgStimulus stimulus={it} size={100} /></div>)}
            </div>
            <div className="flex flex-wrap gap-3">
              {activeReviewItem.options.map(opt => <div key={opt.id} className="border rounded p-2 text-xs"><p>{opt.id}. {opt.label}</p>{opt.stimulus && <SvgStimulus stimulus={opt.stimulus} size={100} />}</div>)}
            </div>
            <div className="pt-2 border-t border-slate-100">
              <ExplanationView
                explanation={activeReviewItem.explanation}
                options={activeReviewItem.options}
                correctAnswerId={activeReviewItem.correctAnswerId}
                selectedOptionId={userAnswers[activeReviewItem.id]}
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
              <button
                type="button"
                onClick={() => setSelectedReviewIndex(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded text-xs font-semibold cursor-pointer"
              >
                Selesai Meninjau
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
