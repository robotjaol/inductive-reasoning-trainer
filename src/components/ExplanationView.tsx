import React from 'react';
import { DetailedExplanation, ChoiceOption } from '../types';
import {
  CheckCircle2,
  XCircle,
  BookOpen,
  HelpCircle,
  Terminal,
  Compass,
  AlertCircle,
} from 'lucide-react';

interface ExplanationViewProps {
  explanation: DetailedExplanation;
  options: ChoiceOption[];
  correctAnswerId: string;
  selectedOptionId?: string;
}

export const ExplanationView: React.FC<ExplanationViewProps> = ({
  explanation,
  options,
  correctAnswerId,
  selectedOptionId,
}) => {
  const isSelectedCorrect = selectedOptionId === correctAnswerId;

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 sm:p-5 space-y-5 text-slate-800">
      {/* Header telemetry and validation status */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3.5">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-slate-700" />
            <span className="font-mono text-[10px] uppercase tracking-[0.08em] font-semibold text-slate-500">
              AUDIT FORMAL PENALARAN INDUKTIF
            </span>
          </div>
          <h4 className="text-sm font-bold tracking-tight text-slate-900">
            Bedah Logika & Pembuktian Invarian
          </h4>
        </div>

        {selectedOptionId && (
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-mono font-medium border ${
              isSelectedCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                : 'bg-rose-50 border-rose-300 text-rose-800'
            }`}
          >
            {isSelectedCorrect ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                <span>PILIHAN TEPAT: OPSI [{selectedOptionId}]</span>
              </>
            ) : (
              <>
                <XCircle className="w-3.5 h-3.5 text-rose-700" />
                <span>
                  PILIHAN ANDA: [{selectedOptionId}] • KUNCI: [{correctAnswerId}]
                </span>
              </>
            )}
          </div>
        )}
      </div>

      {/* 1. Aturan Invarian Tersembunyi (The Hidden Invariant Rule) */}
      <div className="bg-white rounded border border-slate-900 p-4 space-y-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider font-bold bg-slate-900 text-white px-2 py-0.5 rounded">
            RUMUSAN INVARIAN (HIDDEN RULE)
          </span>
          <span className="font-mono text-xs text-slate-500 font-semibold">
            Kunci Solusi: Opsi [{correctAnswerId}]
          </span>
        </div>
        <p className="text-xs sm:text-sm font-semibold text-slate-900 leading-relaxed font-mono">
          {explanation.hiddenRule}
        </p>
        <p className="text-xs text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
          <strong className="text-slate-800 font-medium">Ringkasan Konseptual:</strong> {explanation.summary}
        </p>
      </div>

      {/* 2. Observasi Bukti Empiris */}
      {explanation.evidenceAnalysis && explanation.evidenceAnalysis.length > 0 && (
        <div className="space-y-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] font-semibold text-slate-500 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-slate-600" />
            1. Dekomposisi Variabel & Observasi Bukti
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {explanation.evidenceAnalysis.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded border border-slate-200 p-3 space-y-1 text-xs"
              >
                <div className="font-bold text-slate-900 font-mono text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-slate-700 rounded-full" />
                  {item.title}
                </div>
                <ul className="space-y-1 text-slate-600 pt-1">
                  {item.points.map((pt, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-1.5">
                      <span className="text-slate-400 font-mono mt-0.5">•</span>
                      <span className="leading-relaxed">{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. Langkah Penalaran Sistematis */}
      <div className="space-y-2.5">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] font-semibold text-slate-500 flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-slate-600" />
          2. Rekonstruksi Langkah Solusi Sistematis
        </span>
        <div className="space-y-2">
          {explanation.stepByStep.map((step, idx) => (
            <div
              key={idx}
              className="bg-white rounded border border-slate-200 p-3 space-y-1 text-xs"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[11px] font-bold text-slate-900">
                  [{String(idx + 1).padStart(2, '0')}] {step.title}
                </span>
                {step.highlight && (
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200 text-[10px] font-mono">
                    {step.highlight}
                  </span>
                )}
              </div>
              <p className="text-slate-600 leading-relaxed pt-0.5">
                {step.content}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Analisis Opsi Pengecoh (Distractor Analysis) */}
      {explanation.distractors && explanation.distractors.length > 0 && (
        <div className="space-y-2.5">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] font-semibold text-slate-500 flex items-center gap-1.5">
            <AlertCircle className="w-3.5 h-3.5 text-slate-600" />
            3. Analisis Falsifikasi Pengecoh (Distractor Ledger)
          </span>
          <div className="space-y-1.5">
            {explanation.distractors.map((dist, idx) => {
              return (
                <div
                  key={idx}
                  className="bg-white rounded border border-slate-200 p-2.5 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                >
                  <div className="flex items-start gap-2 min-w-0">
                    <span className="font-mono font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-800 border border-rose-200 text-[10px] shrink-0">
                      Opsi [{dist.optionId}]
                    </span>
                    <span className="text-slate-700 leading-relaxed">
                      {dist.reason}
                    </span>
                  </div>
                  <span className="self-start sm:self-auto text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 shrink-0 border border-slate-200">
                    Defek: {dist.flawType.replace('_', ' ')}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 5. Heuristik Ujian (Pro-tip) */}
      {explanation.proTip && (
        <div className="rounded border border-amber-300 bg-amber-50/70 p-3 flex items-start gap-2.5 text-xs text-amber-950">
          <span className="font-mono font-bold text-[10px] uppercase tracking-wider bg-amber-200 text-amber-900 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
            HEURISTIK
          </span>
          <div className="space-y-0.5 leading-relaxed">
            <span className="font-semibold block">Prinsip Kecepatan Ujian:</span>
            <p className="text-amber-900/90">{explanation.proTip}</p>
          </div>
        </div>
      )}
    </div>
  );
};
