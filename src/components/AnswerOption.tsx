import React from 'react';
import { ChoiceOption } from '../types';
import { SvgStimulus } from './SvgStimulus';

interface AnswerOptionProps {
  option: ChoiceOption;
  isSelected: boolean;
  onSelect: (id: string) => void;
  disabled?: boolean;
  isCorrect?: boolean;
  isIncorrectSelected?: boolean;
  showOutcome?: boolean;
}

export const AnswerOption: React.FC<AnswerOptionProps> = ({
  option,
  isSelected,
  onSelect,
  disabled = false,
  isCorrect = false,
  isIncorrectSelected = false,
  showOutcome = false,
}) => {
  let containerStyle = 'bg-white border-slate-200 text-slate-900 hover:border-slate-400 hover:bg-slate-50/80';
  let badgeStyle = 'bg-slate-100 text-slate-700 border-slate-300';
  let kbdHintStyle = 'text-slate-400 border-slate-200 bg-slate-50';

  if (showOutcome) {
    if (isCorrect) {
      containerStyle = 'bg-emerald-50/70 border-emerald-400 text-emerald-950 font-medium';
      badgeStyle = 'bg-emerald-700 text-white border-emerald-700';
      kbdHintStyle = 'text-emerald-700 border-emerald-300 bg-emerald-100/50';
    } else if (isIncorrectSelected) {
      containerStyle = 'bg-rose-50/70 border-rose-400 text-rose-950';
      badgeStyle = 'bg-rose-700 text-white border-rose-700';
      kbdHintStyle = 'text-rose-700 border-rose-300 bg-rose-100/50';
    } else {
      containerStyle = 'bg-white border-slate-200 text-slate-400 opacity-50';
      badgeStyle = 'bg-slate-100 text-slate-400 border-slate-200';
      kbdHintStyle = 'text-slate-300 border-slate-200 bg-slate-50';
    }
  } else if (isSelected) {
    containerStyle = 'bg-slate-900 text-white border-slate-900 shadow-[0_1px_2px_rgba(0,0,0,0.06)]';
    badgeStyle = 'bg-white text-slate-900 border-white font-bold';
    kbdHintStyle = 'text-slate-300 border-slate-700 bg-slate-800';
  }

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => onSelect(option.id)}
      className={`w-full text-left p-3.5 rounded-lg border transition-colors flex items-center gap-3.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${containerStyle} ${
        disabled ? 'cursor-default' : 'cursor-pointer'
      }`}
    >
      {/* Option Identifier Mechanical Badge (A, B, C, D, E) */}
      <span
        className={`w-7 h-7 rounded border font-mono text-xs font-bold flex items-center justify-center shrink-0 transition-colors ${badgeStyle}`}
      >
        {option.id}
      </span>

      {/* Stimulus Preview (if choice is a geometric diagram) */}
      {option.stimulus && (
        <div className="shrink-0 bg-white p-1 rounded border border-slate-200">
          <SvgStimulus stimulus={option.stimulus} size={64} showBorder={false} />
        </div>
      )}

      {/* Text label or description */}
      <div className="flex-1 text-xs leading-relaxed font-medium">
        {option.text || option.label}
      </div>

      {/* Keyboard shortcut hint pill */}
      {!showOutcome && (
        <span
          className={`hidden sm:inline-block font-mono text-[10px] uppercase px-1.5 py-0.5 rounded border transition-colors ${kbdHintStyle}`}
        >
          {option.id}
        </span>
      )}

      {/* Outcome indicator badge if in review mode */}
      {showOutcome && isCorrect && (
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-300 shrink-0">
          KUNCI BENAR
        </span>
      )}
      {showOutcome && isIncorrectSelected && (
        <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-100 text-rose-800 border border-rose-300 shrink-0">
          PILIHAN ANDA
        </span>
      )}
    </button>
  );
};
