import React from 'react';

interface ProgressIndicatorProps {
  current: number; // 1-indexed
  total: number;
  answeredCount: number;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  current,
  total,
  answeredCount,
  className = '',
}) => {
  const progressPercent = total > 0 ? Math.min(100, Math.round((answeredCount / total) * 100)) : 0;
  const currentPercent = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex items-center justify-between text-xs font-mono text-slate-500">
        <span className="text-slate-700 font-medium">
          Kemajuan: <strong className="text-slate-900">{answeredCount}</strong> / {total}{' '}
          <span className="text-slate-400">({progressPercent}%)</span>
        </span>
        <span>
          Posisi: <strong className="text-slate-900">{current}</strong> / {total}
        </span>
      </div>

      {/* Progress Track */}
      <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden relative">
        {/* Answered progress */}
        <div
          className="h-full bg-slate-800 transition-all duration-150"
          style={{ width: `${progressPercent}%` }}
        />
        {/* Current position marker indicator */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-amber-500"
          style={{ left: `calc(${currentPercent}% - 2px)` }}
          title={`Soal saat ini: #${current}`}
        />
      </div>
    </div>
  );
};
