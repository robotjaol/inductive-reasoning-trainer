import React from 'react';
import { ProgressIndicator } from './ProgressIndicator';
import { Clock, CheckSquare, Bookmark, Pause, Play, AlertTriangle } from 'lucide-react';

interface AssessmentHeaderProps {
  title: string;
  categoryName: string;
  currentIndex: number; // 0-indexed
  totalQuestions: number;
  answeredCount: number;
  timeRemainingSeconds?: number | null; // null if untimed
  isTimerRunning?: boolean;
  onToggleTimer?: () => void;
  onSubmitSession: () => void;
  onExitSession: () => void;
  modeLabel: string;
}

export const AssessmentHeader: React.FC<AssessmentHeaderProps> = ({
  title,
  categoryName,
  currentIndex,
  totalQuestions,
  answeredCount,
  timeRemainingSeconds,
  isTimerRunning = true,
  onToggleTimer,
  onSubmitSession,
  onExitSession,
  modeLabel,
}) => {
  const formatTime = (totalSeconds: number): string => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const hrs = Math.floor(mins / 60);
    if (hrs > 0) {
      const remMins = mins % 60;
      return `${hrs}:${remMins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const isLowTime = timeRemainingSeconds !== null && timeRemainingSeconds !== undefined && timeRemainingSeconds <= 60;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Left: Test info & Category */}
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              onClick={onExitSession}
              title="Keluar ke Pengaturan"
              className="text-xs font-medium text-slate-500 hover:text-slate-900 border border-slate-200 hover:border-slate-300 rounded px-2.5 py-1 transition-colors"
            >
              Keluar
            </button>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-900 truncate">
                  {title}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded border border-slate-200">
                  {modeLabel}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 truncate">
                {categoryName}
              </div>
            </div>
          </div>

          {/* Center: Question Counter display */}
          <div className="hidden sm:flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Soal:</span>
            <span className="text-sm font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
              {currentIndex + 1} <span className="text-slate-400 font-normal">/</span> {totalQuestions}
            </span>
          </div>

          {/* Right: Timer & Submit Action */}
          <div className="flex items-center gap-2.5">
            {timeRemainingSeconds !== null && timeRemainingSeconds !== undefined && (
              <div
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded border font-mono text-xs ${
                  isLowTime
                    ? 'bg-rose-50 border-rose-300 text-rose-700 font-bold animate-pulse'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>{formatTime(timeRemainingSeconds)}</span>
                {onToggleTimer && (
                  <button
                    type="button"
                    onClick={onToggleTimer}
                    title={isTimerRunning ? 'Jeda Waktu' : 'Lanjutkan Waktu'}
                    className="p-0.5 text-slate-400 hover:text-slate-700 ml-0.5"
                  >
                    {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  </button>
                )}
              </div>
            )}

            <button
              type="button"
              onClick={onSubmitSession}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold tracking-wide transition-colors cursor-pointer"
            >
              Selesai & Nilai
            </button>
          </div>
        </div>

        {/* Minimalist Progress Strip */}
        <div className="pb-2">
          <ProgressIndicator
            current={currentIndex + 1}
            total={totalQuestions}
            answeredCount={answeredCount}
          />
        </div>
      </div>
    </header>
  );
};
