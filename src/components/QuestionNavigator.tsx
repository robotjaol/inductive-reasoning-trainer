import React, { useState, useMemo } from 'react';
import { Flag, Search, ChevronLeft, ChevronRight, Check } from 'lucide-react';

interface QuestionNavigatorProps {
  totalQuestions: number;
  currentIndex: number; // 0-indexed
  userAnswers: Record<string, string>;
  flaggedIds: Set<string>;
  questionIds: string[];
  onSelectIndex: (index: number) => void;
  chunkSize?: number; // default 50 per page
}

type FilterStatus = 'all' | 'unanswered' | 'answered' | 'flagged';

export const QuestionNavigator: React.FC<QuestionNavigatorProps> = ({
  totalQuestions,
  currentIndex,
  userAnswers,
  flaggedIds,
  questionIds,
  onSelectIndex,
  chunkSize = 50,
}) => {
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [jumpInput, setJumpInput] = useState<string>('');
  const [jumpError, setJumpError] = useState<string | null>(null);

  // Calculate current chunk index based on currentIndex
  const currentChunk = Math.floor(currentIndex / chunkSize);
  const [activeChunk, setActiveChunk] = useState<number>(currentChunk);

  // Sync active chunk if currentIndex moves outside
  React.useEffect(() => {
    const expectedChunk = Math.floor(currentIndex / chunkSize);
    if (expectedChunk !== activeChunk) {
      setActiveChunk(expectedChunk);
    }
  }, [currentIndex, chunkSize]);

  const totalChunks = Math.ceil(totalQuestions / chunkSize);

  // Handle direct jump to question #
  const handleJumpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setJumpError(null);
    const parsed = parseInt(jumpInput.trim(), 10);
    if (isNaN(parsed) || parsed < 1 || parsed > totalQuestions) {
      setJumpError(`Masukkan nomor 1 – ${totalQuestions}`);
      return;
    }
    const targetIdx = parsed - 1;
    onSelectIndex(targetIdx);
    setActiveChunk(Math.floor(targetIdx / chunkSize));
    setJumpInput('');
  };

  // Questions in current chunk
  const chunkQuestions = useMemo(() => {
    const start = activeChunk * chunkSize;
    const end = Math.min(start + chunkSize, totalQuestions);
    const items = [];
    for (let i = start; i < end; i++) {
      const qId = questionIds[i];
      const isAnswered = Boolean(userAnswers[qId]);
      const isFlagged = flaggedIds.has(qId);
      const isCurrent = i === currentIndex;

      // Filter check
      let matchesFilter = true;
      if (filterStatus === 'answered' && !isAnswered) matchesFilter = false;
      if (filterStatus === 'unanswered' && isAnswered) matchesFilter = false;
      if (filterStatus === 'flagged' && !isFlagged) matchesFilter = false;

      items.push({
        index: i,
        questionNumber: i + 1,
        qId,
        isAnswered,
        isFlagged,
        isCurrent,
        matchesFilter,
      });
    }
    return items;
  }, [activeChunk, chunkSize, totalQuestions, questionIds, userAnswers, flaggedIds, currentIndex, filterStatus]);

  // Overall counts
  const answeredTotal = Object.keys(userAnswers).length;
  const flaggedTotal = flaggedIds.size;
  const unansweredTotal = Math.max(0, totalQuestions - answeredTotal);

  return (
    <aside className="bg-white border border-slate-200 rounded-lg p-3.5 space-y-3 font-sans">
      {/* Navigator Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
        <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
          Navigasi Soal
        </span>
        <span className="text-[11px] font-mono text-slate-500">
          Total: {totalQuestions}
        </span>
      </div>

      {/* Jump to Question input */}
      <form onSubmit={handleJumpSubmit} className="space-y-1">
        <div className="flex items-center gap-1.5">
          <div className="relative flex-1">
            <input
              type="number"
              min={1}
              max={totalQuestions}
              placeholder={`Lompat ke (1 - ${totalQuestions})`}
              value={jumpInput}
              onChange={(e) => {
                setJumpInput(e.target.value);
                setJumpError(null);
              }}
              className="w-full pl-2.5 pr-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs font-mono text-slate-800 placeholder-slate-400 focus:outline-none focus:border-slate-800 focus:bg-white"
            />
          </div>
          <button
            type="submit"
            className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded text-xs font-medium cursor-pointer transition-colors"
          >
            Buka
          </button>
        </div>
        {jumpError && (
          <p className="text-[10px] text-rose-600 font-medium">{jumpError}</p>
        )}
      </form>

      {/* Status Filter Badges */}
      <div className="grid grid-cols-4 gap-1 text-[11px]">
        <button
          type="button"
          onClick={() => setFilterStatus('all')}
          className={`py-1 px-1.5 rounded text-center transition-colors cursor-pointer border ${
            filterStatus === 'all'
              ? 'bg-slate-900 text-white border-slate-900 font-semibold'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          Semua
        </button>
        <button
          type="button"
          onClick={() => setFilterStatus('answered')}
          className={`py-1 px-1.5 rounded text-center transition-colors cursor-pointer border ${
            filterStatus === 'answered'
              ? 'bg-slate-900 text-white border-slate-900 font-semibold'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          Isi ({answeredTotal})
        </button>
        <button
          type="button"
          onClick={() => setFilterStatus('unanswered')}
          className={`py-1 px-1.5 rounded text-center transition-colors cursor-pointer border ${
            filterStatus === 'unanswered'
              ? 'bg-slate-900 text-white border-slate-900 font-semibold'
              : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
          }`}
        >
          Kosong ({unansweredTotal})
        </button>
        <button
          type="button"
          onClick={() => setFilterStatus('flagged')}
          className={`py-1 px-1.5 rounded text-center transition-colors cursor-pointer border ${
            filterStatus === 'flagged'
              ? 'bg-amber-600 text-white border-amber-600 font-semibold'
              : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
          }`}
        >
          Ragu ({flaggedTotal})
        </button>
      </div>

      {/* Chunk Range Pagination (for large scale up to 1,000 questions) */}
      {totalChunks > 1 && (
        <div className="flex items-center justify-between border-t border-b border-slate-100 py-1.5 text-xs font-mono">
          <button
            type="button"
            disabled={activeChunk === 0}
            onClick={() => setActiveChunk((prev) => Math.max(0, prev - 1))}
            className="p-1 rounded text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>

          <select
            value={activeChunk}
            onChange={(e) => setActiveChunk(Number(e.target.value))}
            className="bg-slate-50 border border-slate-200 rounded px-2 py-0.5 text-xs font-mono text-slate-800 focus:outline-none focus:border-slate-700"
          >
            {Array.from({ length: totalChunks }).map((_, cIdx) => {
              const startNum = cIdx * chunkSize + 1;
              const endNum = Math.min((cIdx + 1) * chunkSize, totalQuestions);
              return (
                <option key={cIdx} value={cIdx}>
                  Rentang {startNum} – {endNum}
                </option>
              );
            })}
          </select>

          <button
            type="button"
            disabled={activeChunk >= totalChunks - 1}
            onClick={() => setActiveChunk((prev) => Math.min(totalChunks - 1, prev + 1))}
            className="p-1 rounded text-slate-600 hover:bg-slate-100 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Compact Question Grid (renders 50 at a time efficiently) */}
      <div className="grid grid-cols-5 gap-1.5 max-h-[300px] overflow-y-auto pr-1">
        {chunkQuestions.map((q) => {
          let cellStyle = 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400';

          if (q.isCurrent) {
            cellStyle = 'ring-2 ring-slate-900 border-slate-900 font-bold bg-white text-slate-900';
          } else if (q.isAnswered) {
            cellStyle = 'bg-slate-800 text-white border-slate-800 font-medium';
          }

          const opacityClass = q.matchesFilter ? 'opacity-100' : 'opacity-25 pointer-events-none';

          return (
            <button
              key={q.index}
              type="button"
              onClick={() => onSelectIndex(q.index)}
              title={`Soal #${q.questionNumber}${q.isAnswered ? ' (Sudah Dijawab)' : ''}${q.isFlagged ? ' (Ditandai Ragu)' : ''}`}
              className={`relative h-8 rounded border font-mono text-xs flex items-center justify-center transition-colors cursor-pointer ${cellStyle} ${opacityClass}`}
            >
              <span>{q.questionNumber}</span>
              {/* Flagged marker */}
              {q.isFlagged && (
                <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 rounded-full bg-amber-500" />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend Footer */}
      <div className="border-t border-slate-100 pt-2 grid grid-cols-2 gap-y-1 text-[10px] text-slate-500 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-slate-800 inline-block" />
          <span>Terjawab</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs bg-slate-100 border border-slate-300 inline-block" />
          <span>Belum Diisi</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-xs ring-1 ring-slate-900 bg-white inline-block" />
          <span>Sedang Aktif</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
          <span>Ragu-ragu</span>
        </div>
      </div>
    </aside>
  );
};
