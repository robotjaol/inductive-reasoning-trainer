import React from 'react';
import { UserStats } from '../types';
import { AxiomBrandHeader } from './AxiomMark';
import {
  Compass,
  Archive,
  BookOpen,
  Bookmark,
  BarChart2,
  Sliders,
  Sparkles,
  Layers,
} from 'lucide-react';

export type AppMode = 'assessment' | 'catalog' | 'theory' | 'analytics';

interface NavbarProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  stats: UserStats;
  inActiveSession?: boolean;
  onOpenDesignManual?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentMode,
  onSelectMode,
  stats,
  inActiveSession = false,
  onOpenDesignManual,
}) => {
  const accuracy =
    stats.totalSolved > 0
      ? Math.round((stats.totalCorrect / stats.totalSolved) * 100)
      : 0;

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14 gap-4">
          {/* Brand Identity Hallmark & Title */}
          <button
            type="button"
            onClick={() => onSelectMode('assessment')}
            className="cursor-pointer text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 rounded"
            aria-label="Kembali ke Beranda AXIOM"
          >
            <AxiomBrandHeader size="md" showSubtitle={true} />
          </button>

          {/* Desktop Architectural Navigation Tabs */}
          {!inActiveSession ? (
            <nav className="hidden md:flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => onSelectMode('assessment')}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-2 border font-medium ${
                  currentMode === 'assessment'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                    : 'bg-white text-slate-700 border-transparent hover:bg-slate-100 hover:border-slate-200'
                }`}
              >
                <Compass className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Sesi Asesmen</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectMode('catalog')}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-2 border font-medium ${
                  currentMode === 'catalog'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                    : 'bg-white text-slate-700 border-transparent hover:bg-slate-100 hover:border-slate-200'
                }`}
              >
                <Archive className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Bank Soal Standar</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectMode('theory')}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-2 border font-medium ${
                  currentMode === 'theory'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                    : 'bg-white text-slate-700 border-transparent hover:bg-slate-100 hover:border-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Kompandium Teori</span>
              </button>

              <button
                type="button"
                onClick={() => onSelectMode('analytics')}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer flex items-center gap-2 border font-medium ${
                  currentMode === 'analytics'
                    ? 'bg-slate-900 text-white border-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.06)]'
                    : 'bg-white text-slate-700 border-transparent hover:bg-slate-100 hover:border-slate-200'
                }`}
              >
                <BarChart2 className="w-3.5 h-3.5" strokeWidth={1.75} />
                <span>Metrik & Riwayat</span>
              </button>
            </nav>
          ) : (
            /* Active session indicator chip */
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded bg-slate-100 border border-slate-200 text-xs font-mono text-slate-700">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span className="tracking-tight font-semibold">SESI AKTIF EVALUASI KOGNITIF</span>
            </div>
          )}

          {/* Right Action Controls: Design Spec + Telemetry Capsule */}
          <div className="flex items-center gap-2">
            {onOpenDesignManual && (
              <button
                type="button"
                onClick={onOpenDesignManual}
                title="Buka Panduan Desain & Identitas Visual AXIOM"
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-xs text-slate-600 font-mono transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-slate-500" strokeWidth={1.75} />
                <span className="text-[11px]">Design System</span>
              </button>
            )}

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1 rounded text-xs font-mono">
              <span className="text-slate-400 text-[11px] uppercase tracking-wider">Metrik:</span>
              <span className="text-slate-700 font-semibold tabular-nums">
                {stats.totalSolved} <span className="font-normal text-slate-400">soal</span>
              </span>
              <span className="text-slate-300">/</span>
              <span
                className={`font-semibold tabular-nums ${
                  accuracy >= 70 ? 'text-emerald-700' : 'text-slate-800'
                }`}
              >
                {accuracy}% <span className="font-normal text-slate-400">akurasi</span>
              </span>
            </div>

            {stats.bookmarkedQuestionIds.length > 0 && (
              <button
                type="button"
                onClick={() => onSelectMode('catalog')}
                title="Lihat soal yang ditandai di bank soal"
                className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-50 text-xs text-slate-700 flex items-center gap-1 font-mono cursor-pointer transition-colors"
              >
                <Bookmark className="w-3.5 h-3.5 text-slate-700 fill-slate-700" strokeWidth={1.75} />
                <span className="tabular-nums font-semibold">{stats.bookmarkedQuestionIds.length}</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Strip */}
        {!inActiveSession && (
          <div className="flex md:hidden items-center overflow-x-auto py-2 border-t border-slate-100 gap-1.5 text-xs font-medium scrollbar-none">
            <button
              type="button"
              onClick={() => onSelectMode('assessment')}
              className={`px-2.5 py-1 rounded whitespace-nowrap border cursor-pointer ${
                currentMode === 'assessment'
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                  : 'text-slate-700 bg-slate-50 border-slate-200'
              }`}
            >
              Asesmen
            </button>
            <button
              type="button"
              onClick={() => onSelectMode('catalog')}
              className={`px-2.5 py-1 rounded whitespace-nowrap border cursor-pointer ${
                currentMode === 'catalog'
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                  : 'text-slate-700 bg-slate-50 border-slate-200'
              }`}
            >
              Bank Soal
            </button>
            <button
              type="button"
              onClick={() => onSelectMode('theory')}
              className={`px-2.5 py-1 rounded whitespace-nowrap border cursor-pointer ${
                currentMode === 'theory'
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                  : 'text-slate-700 bg-slate-50 border-slate-200'
              }`}
            >
              Teori
            </button>
            <button
              type="button"
              onClick={() => onSelectMode('analytics')}
              className={`px-2.5 py-1 rounded whitespace-nowrap border cursor-pointer ${
                currentMode === 'analytics'
                  ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                  : 'text-slate-700 bg-slate-50 border-slate-200'
              }`}
            >
              Riwayat
            </button>
          </div>
        )}
      </div>
    </header>
  );
};
