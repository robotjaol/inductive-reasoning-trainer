import React, { useState } from 'react';
import { InductiveQuestion } from '../types';
import { SvgStimulus } from './SvgStimulus';
import { AnswerOption } from './AnswerOption';
import { ExplanationView } from './ExplanationView';
import {
  ArrowRight,
  ArrowLeft,
  Flag,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

interface QuestionCardProps {
  question: InductiveQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedOptionId?: string;
  onSelectOption: (optionId: string) => void;
  onClearOption?: () => void;
  isPracticeMode?: boolean;
  showExplanationInitially?: boolean;
  isFlagged?: boolean;
  onToggleFlag?: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  currentIndex,
  totalQuestions,
  selectedOptionId,
  onSelectOption,
  onClearOption,
  isPracticeMode = false,
  showExplanationInitially = false,
  isFlagged = false,
  onToggleFlag,
  onPrev,
  onNext,
  hasPrev = true,
  hasNext = true,
}) => {
  const [showExplanation, setShowExplanation] = useState<boolean>(showExplanationInitially);

  const isAnswered = Boolean(selectedOptionId);
  const isCorrect = selectedOptionId === question.correctAnswerId;

  // Indonesian labels for category
  const familyLabels: Record<string, string> = {
    group_classification: 'Klasifikasi Kelompok (A vs B)',
    odd_one_out: 'Odd-One-Out (Cari yang Berbeda)',
    rule_identification: 'Identifikasi Aturan Pola',
    analogy: 'Analogi Geometris (A : B :: C : D)',
    sequence_induction: 'Deret Induktif (Sequence)',
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-xs overflow-hidden">
      {/* Top Meta Header */}
      <div className="px-5 py-3 border-b border-slate-100 bg-slate-50/70 flex items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-mono font-bold text-slate-900 bg-white border border-slate-200 px-2 py-0.5 rounded">
            Soal #{currentIndex + 1}
          </span>
          <span className="text-slate-600 font-medium hidden sm:inline">
            {familyLabels[question.family] || question.family}
          </span>
          <span className="font-mono text-[11px] text-slate-500 uppercase px-1.5 py-0.5 bg-slate-100 rounded border border-slate-200">
            {question.difficulty}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Flag for Review Toggle */}
          {onToggleFlag && (
            <button
              type="button"
              onClick={onToggleFlag}
              title="Tandai ragu-ragu untuk ditinjau kembali (Shortcut: F)"
              className={`px-2.5 py-1 rounded border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
                isFlagged
                  ? 'bg-amber-50 border-amber-300 text-amber-800 font-semibold'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-amber-600 text-amber-600' : 'text-slate-400'}`} />
              <span>{isFlagged ? 'Ragu-ragu' : 'Tandai Ragu'}</span>
            </button>
          )}

          {/* Clear Answer Button */}
          {isAnswered && onClearOption && (
            <button
              type="button"
              onClick={onClearOption}
              title="Hapus pilihan jawaban saat ini"
              className="px-2.5 py-1 rounded border border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 text-xs transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Hapus</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Card Content */}
      <div className="p-5 sm:p-6 space-y-6">
        {/* Title and Prompt */}
        <div className="space-y-1">
          <h2 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
            {question.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
            {question.prompt}
          </p>
          {question.contextNote && (
            <p className="text-xs text-slate-500 italic mt-1">
              {question.contextNote}
            </p>
          )}
        </div>

        {/* ------------------------------------------------------------- */}
        {/* STIMULUS VISUAL DISPLAY */}
        {/* ------------------------------------------------------------- */}

        {/* 1. Group Classification (Group A vs Group B + Test Item) */}
        {question.family === 'group_classification' && question.groupA && question.groupB && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Group A Box */}
              <div className="rounded-md border border-slate-300 bg-slate-50/50 p-4 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-xs bg-slate-900 inline-block" />
                    {question.groupA.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Kumpulan 1
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-around gap-2 py-1">
                  {question.groupA.items.map((item, idx) => (
                    <SvgStimulus key={idx} stimulus={item} size={90} />
                  ))}
                </div>
              </div>

              {/* Group B Box */}
              <div className="rounded-md border border-slate-300 bg-slate-50/50 p-4 space-y-2.5">
                <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                  <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-xs bg-slate-500 inline-block" />
                    {question.groupB.name}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                    Kumpulan 2
                  </span>
                </div>
                <div className="flex flex-wrap items-center justify-around gap-2 py-1">
                  {question.groupB.items.map((item, idx) => (
                    <SvgStimulus key={idx} stimulus={item} size={90} />
                  ))}
                </div>
              </div>
            </div>

            {/* Test Item Display */}
            {question.testItem && (
              <div className="bg-slate-100/70 border border-slate-300 rounded-md p-3.5 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5 text-center sm:text-left">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-600 font-semibold">
                    Gambar Uji
                  </span>
                  <p className="text-xs text-slate-800 font-medium">
                    Tentukan keanggotaan gambar ini terhadap kedua kelompok di atas:
                  </p>
                </div>
                <div className="p-1 bg-white rounded border border-slate-300">
                  <SvgStimulus stimulus={question.testItem} size={100} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* 2. Analogy (A : B :: C : ?) */}
        {question.family === 'analogy' && question.analogyItems && (
          <div className="rounded-md border border-slate-300 bg-slate-50/50 p-4 space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
              Transformasi Analogi Pasangan
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-5 py-2">
              {/* Pair 1: A -> B */}
              <div className="flex items-center gap-2 bg-white p-2.5 rounded border border-slate-200">
                <div className="text-center">
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">A</span>
                  <SvgStimulus stimulus={question.analogyItems.a} size={84} />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="text-center">
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">B</span>
                  <SvgStimulus stimulus={question.analogyItems.b} size={84} />
                </div>
              </div>

              <div className="text-sm font-mono font-bold text-slate-400 select-none">
                ::
              </div>

              {/* Pair 2: C -> ? */}
              <div className="flex items-center gap-2 bg-white p-2.5 rounded border border-slate-200">
                <div className="text-center">
                  <span className="text-[10px] font-mono text-slate-400 block mb-1">C</span>
                  <SvgStimulus stimulus={question.analogyItems.c} size={84} />
                </div>
                <ArrowRight className="w-4 h-4 text-slate-400 shrink-0" />
                <div className="text-center">
                  <span className="text-[10px] font-mono text-slate-800 font-bold block mb-1">?</span>
                  <div className="w-[84px] h-[84px] rounded border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center text-slate-500 font-mono font-bold text-lg">
                    ?
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. Sequence Induction (1 -> 2 -> 3 -> 4 -> ?) */}
        {question.family === 'sequence_induction' && question.contextStimuli && (
          <div className="rounded-md border border-slate-300 bg-slate-50/50 p-4 space-y-2.5">
            <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
              Rangkaian Pola Deret
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2">
              {question.contextStimuli.map((stim, sIdx) => (
                <React.Fragment key={sIdx}>
                  <div className="text-center bg-white p-1.5 rounded border border-slate-200">
                    <span className="text-[10px] font-mono text-slate-400 block mb-0.5">
                      #{sIdx + 1}
                    </span>
                    <SvgStimulus stimulus={stim} size={80} />
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
                </React.Fragment>
              ))}
              <div className="text-center bg-white p-1.5 rounded border border-dashed border-slate-400">
                <span className="text-[10px] font-mono text-slate-700 font-bold block mb-0.5">
                  ?
                </span>
                <div className="w-[80px] h-[80px] flex items-center justify-center text-slate-600 font-mono font-bold text-base bg-slate-50 rounded">
                  ?
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. Rule Identification / Context Figures */}
        {question.family === 'rule_identification' && question.contextStimuli && (
          <div className="flex flex-wrap gap-3">
            {question.contextStimuli.map((item, idx) => <SvgStimulus key={idx} stimulus={item} size={100} />)}
          </div>
        )}
        {question.family === 'rule_identification' && question.groupA && question.groupB && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="rounded border border-slate-300 bg-slate-50 p-3 space-y-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Contoh Positif
              </span>
              <div className="flex flex-wrap items-center justify-around gap-2 pt-1">
                {question.groupA.items.map((item, idx) => (
                  <SvgStimulus key={idx} stimulus={item} size={84} />
                ))}
              </div>
            </div>

            <div className="rounded border border-slate-300 bg-slate-50 p-3 space-y-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                Contoh Negatif
              </span>
              <div className="flex flex-wrap items-center justify-around gap-2 pt-1">
                {question.groupB.items.map((item, idx) => (
                  <SvgStimulus key={idx} stimulus={item} size={84} />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* ANSWER CHOICES */}
        {/* ------------------------------------------------------------- */}
        <div className="space-y-2 pt-1">
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span className="font-semibold text-slate-700 uppercase tracking-wider text-[11px]">
              Opsi Pilihan Ganda:
            </span>
            <span className="font-mono text-[11px]">Tekan huruf A – E atau angka 1 – 5</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {question.options.map((opt) => {
              const isSelected = selectedOptionId === opt.id;
              const isOptionCorrect = opt.id === question.correctAnswerId;
              const isIncorrectSelected = isSelected && !isCorrect;

              return (
                <AnswerOption
                  key={opt.id}
                  option={opt}
                  isSelected={isSelected}
                  onSelect={onSelectOption}
                  showOutcome={isPracticeMode && isAnswered}
                  isCorrect={isOptionCorrect}
                  isIncorrectSelected={isIncorrectSelected}
                />
              );
            })}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* ACTION BAR (PREVIOUS, NEXT, PRACTICE EXPLANATION TOGGLE) */}
        {/* ------------------------------------------------------------- */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
          <div className="flex items-center gap-2">
            {isPracticeMode && (
              <button
                type="button"
                onClick={() => setShowExplanation(!showExplanation)}
                className={`px-3 py-1.5 rounded border text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showExplanation
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{showExplanation ? 'Sembunyikan Pembahasan' : 'Lihat Pembahasan'}</span>
              </button>
            )}

            {isPracticeMode && isAnswered && (
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded border font-mono ${
                  isCorrect
                    ? 'text-emerald-800 bg-emerald-50 border-emerald-200'
                    : 'text-rose-800 bg-rose-50 border-rose-200'
                }`}
              >
                {isCorrect ? 'Benar ✓' : 'Kurang Tepat ✗'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {onPrev && (
              <button
                type="button"
                onClick={onPrev}
                disabled={!hasPrev || currentIndex === 0}
                className="px-3 py-1.5 rounded border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>
            )}

            {onNext && (
              <button
                type="button"
                onClick={onNext}
                disabled={!hasNext && currentIndex === totalQuestions - 1}
                className="px-3.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>{currentIndex === totalQuestions - 1 ? 'Soal Terakhir' : 'Berikutnya'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* ------------------------------------------------------------- */}
        {/* EXPANDED DETAILED EXPLANATION (IF REQUESTED) */}
        {/* ------------------------------------------------------------- */}
        {showExplanation && (
          <div className="pt-2">
            <ExplanationView
              explanation={question.explanation}
              options={question.options}
              correctAnswerId={question.correctAnswerId}
              selectedOptionId={selectedOptionId}
            />
          </div>
        )}
      </div>
    </div>
  );
};
