import React from 'react';
import { Clock, AlertCircle, CheckCircle2, Flag } from 'lucide-react';

interface ExamNavGridProps {
  totalQuestions: number;
  currentIndex: number;
  userAnswers: Record<string, string>;
  flaggedQuestionIds: string[];
  questionIds: string[];
  timeRemainingSeconds: number;
  onSelectIndex: (index: number) => void;
  onSubmitExam: () => void;
}

export const ExamNavGrid: React.FC<ExamNavGridProps> = ({
  totalQuestions,
  currentIndex,
  userAnswers,
  flaggedQuestionIds,
  questionIds,
  timeRemainingSeconds,
  onSelectIndex,
  onSubmitExam,
}) => {
  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = flaggedQuestionIds.length;
  const unansweredCount = totalQuestions - answeredCount;

  // Format time mm:ss
  const minutes = Math.floor(timeRemainingSeconds / 60);
  const seconds = timeRemainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const isTimeCritical = timeRemainingSeconds < 120; // less than 2 mins

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-4 sm:p-5 space-y-4">
      {/* Timer Bar */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Sisa Waktu Ujian
        </span>
        <div
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono font-bold text-sm ${
            isTimeCritical
              ? 'bg-rose-100 text-rose-700 animate-pulse border border-rose-300'
              : 'bg-slate-100 text-slate-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>{formattedTime}</span>
        </div>
      </div>

      {/* Progress Summary Mini */}
      <div className="grid grid-cols-3 gap-2 text-center text-xs">
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
          <div className="text-slate-400 text-[10px] uppercase font-bold">Terjawab</div>
          <div className="font-bold text-slate-900 text-sm">{answeredCount}</div>
        </div>
        <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-200/70">
          <div className="text-amber-700 text-[10px] uppercase font-bold">Ragu-ragu</div>
          <div className="font-bold text-amber-800 text-sm">{flaggedCount}</div>
        </div>
        <div className="p-2 rounded-xl bg-slate-50 border border-slate-200/70">
          <div className="text-slate-400 text-[10px] uppercase font-bold">Belum</div>
          <div className="font-bold text-slate-600 text-sm">{unansweredCount}</div>
        </div>
      </div>

      {/* Numbers Grid */}
      <div className="space-y-2">
        <div className="text-xs font-semibold text-slate-700">Daftar Nomor Soal</div>
        <div className="grid grid-cols-5 gap-2">
          {questionIds.map((qId, idx) => {
            const isCurrent = idx === currentIndex;
            const isAnswered = Boolean(userAnswers[qId]);
            const isFlagged = flaggedQuestionIds.includes(qId);

            let btnStyle = 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50';

            if (isCurrent) {
              btnStyle = 'bg-indigo-600 border-indigo-600 text-white font-bold ring-2 ring-indigo-200';
            } else if (isFlagged) {
              btnStyle = 'bg-amber-100 border-amber-400 text-amber-900 font-semibold';
            } else if (isAnswered) {
              btnStyle = 'bg-slate-800 border-slate-800 text-white font-semibold';
            }

            return (
              <button
                key={qId}
                onClick={() => onSelectIndex(idx)}
                className={`h-9 rounded-xl border text-xs flex items-center justify-center relative transition-all cursor-pointer ${btnStyle}`}
              >
                {idx + 1}
                {isFlagged && !isCurrent && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-amber-500 ring-2 ring-white"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Legend */}
      <div className="pt-2 border-t border-slate-100 flex flex-wrap gap-3 text-[11px] text-slate-500">
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-slate-800"></span>
          <span>Terjawab</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-amber-200 border border-amber-400"></span>
          <span>Ragu-ragu</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-3 h-3 rounded bg-white border border-slate-300"></span>
          <span>Belum</span>
        </div>
      </div>

      {/* Finish & Submit Button */}
      <div className="pt-2">
        <button
          onClick={onSubmitExam}
          className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>Selesai & Kumpulkan Ujian</span>
        </button>
      </div>
    </div>
  );
};
