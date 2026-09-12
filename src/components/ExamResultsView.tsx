import React, { useState } from 'react';
import { UserExamRecord, InductiveQuestion } from '../types';
import { ExplanationView } from './ExplanationView';
import { SvgStimulus } from './SvgStimulus';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  Filter,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface ExamResultsViewProps {
  record: UserExamRecord;
  questions: InductiveQuestion[];
  onRetakeExam: () => void;
  onGoToPractice: () => void;
}

export const ExamResultsView: React.FC<ExamResultsViewProps> = ({
  record,
  questions,
  onRetakeExam,
  onGoToPractice,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'incorrect' | 'correct'>('all');
  const [expandedQuestionIds, setExpandedQuestionIds] = useState<string[]>([]);

  // Format time
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} menit ${secs} detik`;
  };

  const isPassed = record.scorePercentage >= 70;

  const toggleExpand = (qId: string) => {
    setExpandedQuestionIds((prev) =>
      prev.includes(qId) ? prev.filter((id) => id !== qId) : [...prev, qId]
    );
  };

  const expandAll = () => {
    setExpandedQuestionIds(questions.map((q) => q.id));
  };

  const collapseAll = () => {
    setExpandedQuestionIds([]);
  };

  // Filter questions
  const filteredQuestions = questions.filter((q) => {
    const userAns = record.userAnswers[q.id];
    const isCorrect = userAns === q.correctAnswerId;
    if (filterMode === 'correct') return isCorrect;
    if (filterMode === 'incorrect') return !isCorrect;
    return true;
  });

  const familyLabels: Record<string, string> = {
    group_classification: 'Klasifikasi Kelompok',
    odd_one_out: 'Odd-One-Out',
    rule_identification: 'Identifikasi Aturan',
    analogy: 'Analogi Pola',
    sequence_induction: 'Deret Induktif',
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in-50 duration-300">
      {/* 1. Hero Score Banner */}
      <div
        className={`rounded-3xl p-6 sm:p-8 text-white shadow-md relative overflow-hidden ${
          isPassed
            ? 'bg-gradient-to-br from-indigo-900 via-indigo-800 to-slate-900'
            : 'bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950'
        }`}
      >
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-xs">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Laporan Evaluasi Simulasi Ujian
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {isPassed ? 'Luar Biasa! Pemahaman Pola Sangat Kuat' : 'Hasil Evaluasi Penalaran Induktif'}
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              {isPassed
                ? 'Anda mampu mengabstraksi aturan invarian dari bukti-bukti visual dengan sangat akurat dan teliti.'
                : 'Terus tingkatkan latihan pembuktian hipotesis dan eliminasi jebakan fitur semu pada pembahasan di bawah.'}
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center px-2">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-amber-300">
                {record.scorePercentage}%
              </div>
              <div className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold mt-0.5">
                Skor Akurasi
              </div>
            </div>
            <div className="w-px h-10 bg-white/20"></div>
            <div className="text-center px-2">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                {record.correctAnswers}/{record.totalQuestions}
              </div>
              <div className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold mt-0.5">
                Soal Benar
              </div>
            </div>
          </div>
        </div>

        {/* Quick Meta chips */}
        <div className="relative z-10 pt-6 mt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-indigo-300" />
            <span>Waktu Pengerjaan: <strong className="text-white">{formatTime(record.timeSpentSeconds)}</strong></span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onRetakeExam}
              className="px-4 py-2 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Ulangi Ujian</span>
            </button>
            <button
              onClick={onGoToPractice}
              className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Mode Latihan Bebas</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Breakdown per Kategori Logika */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
          Analisis Penguasaan Tipe Penalaran Induktif
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {(Object.entries(record.familyBreakdown) as [string, { total: number; correct: number }][]).map(([famKey, data]) => {
            const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
            return (
              <div
                key={famKey}
                className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800">
                    {familyLabels[famKey] || famKey}
                  </span>
                  <span className="font-mono font-bold text-slate-600">
                    {data.correct}/{data.total}
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-rose-500'
                    }`}
                    style={{ width: `${pct}%` }}
                  ></div>
                </div>
                <div className="text-[11px] text-right font-mono font-medium text-slate-500">
                  {pct}% Benar
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Section Pembahasan Setiap Nomor Soal */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-indigo-600" />
              Pembahasan Lengkap Tiap Nomor Soal
            </h3>
            <p className="text-xs text-slate-500">
              Pelajari aturan tersembunyi dan alasan mengapa opsi lain merupakan jawaban pengecoh
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Filter buttons */}
            <div className="inline-flex rounded-xl p-1 bg-slate-100 border border-slate-200 text-xs">
              <button
                onClick={() => setFilterMode('all')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterMode === 'all'
                    ? 'bg-white text-slate-900 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Semua ({questions.length})
              </button>
              <button
                onClick={() => setFilterMode('incorrect')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterMode === 'incorrect'
                    ? 'bg-white text-rose-700 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Salah ({record.totalQuestions - record.correctAnswers})
              </button>
              <button
                onClick={() => setFilterMode('correct')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  filterMode === 'correct'
                    ? 'bg-white text-emerald-700 font-bold shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Benar ({record.correctAnswers})
              </button>
            </div>

            {/* Expand / Collapse all */}
            <button
              onClick={expandAll}
              className="px-2.5 py-1 text-xs font-semibold text-indigo-600 hover:bg-indigo-50 rounded-lg border border-indigo-200"
            >
              Buka Semua
            </button>
            <button
              onClick={collapseAll}
              className="px-2.5 py-1 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg border border-slate-200"
            >
              Tutup Semua
            </button>
          </div>
        </div>

        {/* List of reviewed questions */}
        <div className="space-y-4">
          {filteredQuestions.map((q, idx) => {
            const originalIndex = questions.findIndex((item) => item.id === q.id);
            const userChoice = record.userAnswers[q.id];
            const isCorrect = userChoice === q.correctAnswerId;
            const isExpanded = expandedQuestionIds.includes(q.id);

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => toggleExpand(q.id)}
                  className="p-4 sm:p-5 flex items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/70 transition-colors"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}
                    >
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600" />
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-slate-500">
                          Soal #{originalIndex + 1}
                        </span>
                        <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-600">
                          {familyLabels[q.family] || q.family}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 truncate mt-0.5">
                        {q.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right text-xs hidden sm:block">
                      <div className="font-semibold text-slate-800">
                        Pilihan Anda: <strong className={isCorrect ? 'text-emerald-600' : 'text-rose-600'}>{userChoice || 'Kosong'}</strong>
                      </div>
                      <div className="text-slate-400 text-[11px]">
                        Kunci: <strong>{q.correctAnswerId}</strong>
                      </div>
                    </div>

                    <button
                      className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                      aria-label="Toggle detail"
                    >
                      {isExpanded ? (
                        <ChevronUp className="w-5 h-5" />
                      ) : (
                        <ChevronDown className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Accordion Content */}
                {isExpanded && (
                  <div className="p-4 sm:p-6 border-t border-slate-100 bg-slate-50/40 space-y-6">
                    {/* Prompt */}
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {q.prompt}
                    </p>

                    {/* Stimulus Preview */}
                    {q.family === 'group_classification' && q.groupA && q.groupB && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-white rounded-xl border border-indigo-100 space-y-2">
                          <span className="font-bold text-indigo-900">Kelompok A:</span>
                          <div className="flex items-center gap-2">
                            {q.groupA.items.map((it, i) => (
                              <SvgStimulus key={i} stimulus={it} size={70} />
                            ))}
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-2">
                          <span className="font-bold text-slate-800">Kelompok B:</span>
                          <div className="flex items-center gap-2">
                            {q.groupB.items.map((it, i) => (
                              <SvgStimulus key={i} stimulus={it} size={70} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Options list */}
                    <div className="space-y-2">
                      <div className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                        Pilihan Ganda:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt) => {
                          const isKunci = opt.id === q.correctAnswerId;
                          const isDipilih = userChoice === opt.id;
                          return (
                            <div
                              key={opt.id}
                              className={`p-3 rounded-xl border text-xs flex items-center gap-2.5 ${
                                isKunci
                                  ? 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold'
                                  : isDipilih
                                  ? 'bg-rose-50 border-rose-300 text-rose-950 font-semibold'
                                  : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              <span
                                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold shrink-0 ${
                                  isKunci
                                    ? 'bg-emerald-600 text-white'
                                    : isDipilih
                                    ? 'bg-rose-600 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                {opt.id}
                              </span>
                              {opt.stimulus && (
                                <SvgStimulus stimulus={opt.stimulus} size={50} showBorder={false} />
                              )}
                              <span className="flex-1">{opt.label}</span>
                              {isKunci && <span className="text-[10px] text-emerald-700 font-bold">Kunci</span>}
                              {isDipilih && !isKunci && (
                                <span className="text-[10px] text-rose-700 font-bold">Pilihan Anda</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Full Explanation */}
                    <ExplanationView
                      explanation={q.explanation}
                      options={q.options}
                      correctAnswerId={q.correctAnswerId}
                      selectedOptionId={userChoice}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
