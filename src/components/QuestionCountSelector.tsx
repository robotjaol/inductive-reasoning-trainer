import React from 'react';

interface QuestionCountSelectorProps {
  value: number;
  onChange: (count: number) => void;
  error?: string;
  disabled?: boolean;
}

const PRESETS = [10, 20, 50, 100, 250, 500, 1000];

export const QuestionCountSelector: React.FC<QuestionCountSelectorProps> = ({
  value,
  onChange,
  error,
  disabled = false,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.trim();
    if (raw === '') {
      onChange(0);
      return;
    }
    const parsed = Number(raw);
    if (!isNaN(parsed)) {
      onChange(parsed);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between gap-4">
        <label
          htmlFor="question-count-input"
          className="text-xs font-semibold uppercase tracking-wider text-slate-700"
        >
          Jumlah Soal (Scale: 1 – 1.000)
        </label>
        <span className="text-xs text-slate-500 font-mono">
          Min: 1 | Max: 1.000
        </span>
      </div>

      {/* Numeric Input Field */}
      <div className="relative">
        <input
          id="question-count-input"
          type="number"
          min={1}
          max={1000}
          step={1}
          value={value === 0 ? '' : value}
          onChange={handleInputChange}
          disabled={disabled}
          placeholder="Masukkan jumlah (1 - 1000)"
          className={`w-full px-3.5 py-2.5 bg-white border text-sm font-mono text-slate-900 rounded-md transition-colors focus:outline-none focus:ring-1 ${
            error
              ? 'border-rose-500 focus:border-rose-600 focus:ring-rose-500'
              : 'border-slate-300 focus:border-slate-800 focus:ring-slate-800'
          }`}
        />
        <div className="absolute right-3 top-2.5 text-xs text-slate-400 font-mono pointer-events-none">
          soal
        </div>
      </div>

      {/* Quick Select Preset Buttons */}
      <div>
        <div className="text-[11px] font-medium text-slate-500 mb-1.5">
          Preset Cepat:
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map((preset) => {
            const isSelected = value === preset;
            return (
              <button
                key={preset}
                type="button"
                disabled={disabled}
                onClick={() => onChange(preset)}
                className={`px-3 py-1.5 text-xs font-mono font-medium rounded border transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 text-white border-slate-900 shadow-2xs font-semibold'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                }`}
              >
                {preset.toLocaleString('id-ID')}
              </button>
            );
          })}
        </div>
      </div>

      {/* Error / Validation Feedback */}
      {error && (
        <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
          <span>•</span>
          <span>{error}</span>
        </p>
      )}
    </div>
  );
};
