import React from 'react';

interface AxiomMarkProps {
  size?: number;
  className?: string;
  variant?: 'monochrome' | 'accent' | 'inverted';
}

/**
 * AXIOM Vector Identity Hallmark
 * Designed under Pentagram / COLLINS principles:
 * - Geometric clarity: Precision equilateral hexagon housing an internal tri-axial vector convergence.
 * - Conceptual metaphor: Inductive cognition—abstracting a singular invariant centroid from empirical coordinates.
 * - Pure vector geometry, pixel-aligned stroke rendering, 100% scalable from 16px to display billboards.
 * - Monochrome compatible (passes all WCAG contrast standards in black/white or reverse).
 */
export const AxiomMark: React.FC<AxiomMarkProps> = ({
  size = 24,
  className = '',
  variant = 'monochrome',
}) => {
  const strokeColor =
    variant === 'inverted'
      ? '#FFFFFF'
      : variant === 'accent'
      ? '#0F172A'
      : 'currentColor';

  const nodeCenterFill =
    variant === 'inverted'
      ? '#FFFFFF'
      : variant === 'accent'
      ? '#2563EB'
      : 'currentColor';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 select-none ${className}`}
      aria-label="AXIOM Cognition Symbol"
      role="img"
    >
      {/* Outer regular hexagonal boundary representing empirical observation domain */}
      <polygon
        points="16,3 27.5,9.6 27.5,22.4 16,29 4.5,22.4 4.5,9.6"
        stroke={strokeColor}
        strokeWidth="1.75"
        strokeLinejoin="round"
        strokeLinecap="round"
      />

      {/* Internal tri-axial convergence lines (Deduction, Induction, Abduction axes) */}
      <line
        x1="16"
        y1="3"
        x2="16"
        y2="16"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="27.5"
        y1="22.4"
        x2="16"
        y2="16"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="4.5"
        y1="22.4"
        x2="16"
        y2="16"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Invariant centroid: The discovered general law */}
      <circle cx="16" cy="16" r="2.25" fill={nodeCenterFill} />

      {/* Empirical satellite coordinates */}
      <circle cx="16" cy="9.5" r="1.2" fill={strokeColor} />
      <circle cx="21.8" cy="19.2" r="1.2" fill={strokeColor} />
      <circle cx="10.2" cy="19.2" r="1.2" fill={strokeColor} />
    </svg>
  );
};

export const AxiomBrandHeader: React.FC<{
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
}> = ({ size = 'md', showSubtitle = true }) => {
  const markSize = size === 'sm' ? 18 : size === 'lg' ? 26 : 22;
  const boxSize = size === 'sm' ? 'w-7 h-7' : size === 'lg' ? 'w-9 h-9' : 'w-8 h-8';

  return (
    <div className="flex items-center gap-2.5 select-none">
      {/* Precision Hallmark Container */}
      <div
        className={`${boxSize} rounded bg-slate-900 text-white flex items-center justify-center border border-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.08)]`}
      >
        <AxiomMark size={markSize} className="text-slate-100" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-baseline gap-1.5">
          <span className="font-bold text-sm tracking-tight text-slate-900 font-sans">
            AXIOM
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.08em] font-semibold text-slate-400">
            SYSTEMS
          </span>
        </div>
        {showSubtitle && (
          <span className="text-[10px] text-slate-500 font-mono tracking-tight -mt-0.5">
            Inductive Reasoning Engine
          </span>
        )}
      </div>
    </div>
  );
};

/**
 * Brand Identity Specification Sheet Modal / Drawer
 * Documents clear-space, optical scale, typography pairing, and semantic color rules.
 */
export const AxiomIdentitySpec: React.FC = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-6 text-slate-900 text-xs">
      <div className="border-b border-slate-200 pb-3">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] font-bold text-slate-500">
            AXIOM DESIGN SYSTEM MANUAL • REF #IDS-01
          </span>
        </div>
        <h3 className="text-sm font-bold text-slate-900 tracking-tight">
          Spesifikasi Identitas Visual & Standar Merek AXIOM
        </h3>
        <p className="text-xs text-slate-600 mt-0.5">
          Sistem identitas berbasis geometri rasional, terinspirasi oleh metodologi Swiss Typography dan studio identitas global (Pentagram, Collins).
        </p>
      </div>

      {/* Grid of specifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Spec 1: Mark Geometry */}
        <div className="p-3 rounded border border-slate-200 bg-slate-50/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-[11px] text-slate-900 uppercase">
              1. Hallmark Geometri
            </span>
            <AxiomMark size={18} className="text-slate-900" />
          </div>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Heksagonal isometrik dengan konvergensi tri-aksial. Mewakili ekstraksi hukum invarian dari sebaran data empiris.
          </p>
          <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-200">
            Stroke: 1.75px / Min: 16px
          </div>
        </div>

        {/* Spec 2: Clear Space */}
        <div className="p-3 rounded border border-slate-200 bg-slate-50/60 space-y-2">
          <span className="font-mono font-bold text-[11px] text-slate-900 uppercase block">
            2. Clear-Space & Batas
          </span>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Zona isolasi minimum di sekeliling logo adalah 0.5× tinggi heksagon (X/2). Tidak boleh ada teks atau elemen dekoratif di dalam perimeter isolasi.
          </p>
          <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-200">
            Clear-Space: ≥ 16px (1rem)
          </div>
        </div>

        {/* Spec 3: Typography Hierarchy */}
        <div className="p-3 rounded border border-slate-200 bg-slate-50/60 space-y-2">
          <span className="font-mono font-bold text-[11px] text-slate-900 uppercase block">
            3. Tipografi Disiplin
          </span>
          <p className="text-[11px] text-slate-600 leading-relaxed">
            Inter (Primary UI & Display) dipadukan dengan JetBrains Mono (Telemetry, Rumus Invarian, Kode Butir Soal, Tabular Data).
          </p>
          <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-200">
            Scale: 11 / 12 / 14 / 16 / 24px
          </div>
        </div>

        {/* Spec 4: Semantic Color Matrix */}
        <div className="p-3 rounded border border-slate-200 bg-slate-50/60 space-y-2">
          <span className="font-mono font-bold text-[11px] text-slate-900 uppercase block">
            4. Palet Semantik
          </span>
          <div className="flex items-center gap-1.5 pt-1">
            <span className="w-5 h-5 rounded bg-slate-900 border border-slate-800" title="Slate 900 (Canvas Dark)" />
            <span className="w-5 h-5 rounded bg-slate-100 border border-slate-300" title="Slate 100 (Neutral)" />
            <span className="w-5 h-5 rounded bg-emerald-600" title="Emerald 600 (Valid Invariant)" />
            <span className="w-5 h-5 rounded bg-rose-600" title="Rose 600 (Falsified / Error)" />
            <span className="w-5 h-5 rounded bg-amber-500" title="Amber 500 (Flagged Review)" />
          </div>
          <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-200">
            Rasio Kontras: WCAG AAA (&gt;7:1)
          </div>
        </div>
      </div>
    </div>
  );
};
