import React, { useState } from 'react';
import { QuestionCountSelector } from './QuestionCountSelector';
import { QuestionFamily, DifficultyLevel } from '../types';
import { Play, Check, ShieldCheck, HelpCircle, Shuffle, Clock, BookOpen, Layers } from 'lucide-react';

export type SessionMode = 'exam' | 'practice';

export interface SessionConfig {
  mode: SessionMode;
  questionCount: number;
  category: QuestionFamily | 'all';
  difficulty: DifficultyLevel | 'all';
  timerEnabled: boolean;
  secondsPerQuestion: number; // e.g. 60
}

interface SessionConfigurationProps {
  onStartSession: (config: SessionConfig) => void;
  defaultCount?: number;
}

export const SessionConfiguration: React.FC<SessionConfigurationProps> = ({
  onStartSession,
  defaultCount = 20,
}) => {
  const [mode, setMode] = useState<SessionMode>('exam');
  const [questionCount, setQuestionCount] = useState<number>(defaultCount);
  const [category, setCategory] = useState<QuestionFamily | 'all'>('all');
  const [difficulty, setDifficulty] = useState<DifficultyLevel | 'all'>('all');
  const [timerEnabled, setTimerEnabled] = useState<boolean>(true);
  const [timerPreset, setTimerPreset] = useState<number>(60); // seconds per question

  // Validation
  let countError = '';
  if (isNaN(questionCount) || questionCount === 0) {
    countError = 'Jumlah soal tidak boleh kosong.';
  } else if (!Number.isInteger(questionCount)) {
    countError = 'Jumlah soal harus bilangan bulat (bukan desimal).';
  } else if (questionCount < 1) {
    countError = 'Jumlah soal minimal 1.';
  } else if (questionCount > 1000) {
    countError = 'Jumlah soal maksimal 1.000.';
  }

  const isConfigValid = !countError;

  const totalCalculatedTimeMinutes = Math.round((questionCount * timerPreset) / 60);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConfigValid) return;
    onStartSession({
      mode,
      questionCount,
      category,
      difficulty,
      timerEnabled: mode === 'exam' ? timerEnabled : false,
      secondsPerQuestion: timerPreset,
    });
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Platform Title Banner */}
      <div className="border-b border-slate-200 pb-4 space-y-1">
        <h1 className="text-xl font-bold tracking-tight text-slate-900">
          Konfigurasi Sesi Penilaian Induktif
        </h1>
        <p className="text-xs text-slate-600">
          Atur parameter tes sesuai kebutuhan latihan Anda. Seluruh kumpulan soal dan opsi jawaban akan digenerasikan secara acak secara prosedural.
        </p>
      </div>

      <form onSubmit={handleStart} className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 space-y-6">
        {/* 1. Mode Selection: Assessment vs Practice */}
        <div className="space-y-2">
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
            Tipe Sesi
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setMode('exam')}
              className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                mode === 'exam'
                  ? 'border-slate-900 bg-slate-50 text-slate-900 ring-1 ring-slate-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-700" />
                  Simulasi Ujian (Timed Assessment)
                </span>
                {mode === 'exam' && <Check className="w-4 h-4 text-slate-900" />}
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Kondisi tes psikometri standar. Pembahasan dan evaluasi disajikan menyeluruh setelah seluruh soal dikumpulkan.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setMode('practice')}
              className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer ${
                mode === 'practice'
                  ? 'border-slate-900 bg-slate-50 text-slate-900 ring-1 ring-slate-900'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-slate-700" />
                  Latihan Interaktif (Practice Mode)
                </span>
                {mode === 'practice' && <Check className="w-4 h-4 text-slate-900" />}
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Pembahasan langkah-demi-langkah dan aturan tersembunyi dapat dilihat langsung setelah memilih jawaban.
              </p>
            </button>
          </div>
        </div>

        {/* 2. Prominent Question Count Selector with Presets */}
        <div className="pt-2 border-t border-slate-100">
          <QuestionCountSelector
            value={questionCount}
            onChange={(val) => setQuestionCount(val)}
            error={countError}
          />
        </div>

        {/* 3. Category & Difficulty Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-100">
          {/* Category */}
          <div className="space-y-1.5">
            <label
              htmlFor="category-select"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Kategori Pola
            </label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value as QuestionFamily | 'all')}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-slate-800"
            >
              <option value="all">Semua Kategori (Kombinasi Pola)</option>
              <option value="group_classification">Klasifikasi Kelompok (A vs B)</option>
              <option value="odd_one_out">Odd-One-Out (Cari yang Berbeda)</option>
              <option value="analogy">Analogi Geometris (A : B :: C : D)</option>
              <option value="sequence_induction">Deret Induktif (Sequence Induction)</option>
              <option value="rule_identification">Identifikasi Aturan Logika</option>
            </select>
          </div>

          {/* Difficulty */}
          <div className="space-y-1.5">
            <label
              htmlFor="difficulty-select"
              className="text-xs font-semibold uppercase tracking-wider text-slate-700"
            >
              Tingkat Kesulitan
            </label>
            <select
              id="difficulty-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as DifficultyLevel | 'all')}
              className="w-full px-3 py-2 bg-white border border-slate-300 rounded text-xs text-slate-800 focus:outline-none focus:border-slate-800"
            >
              <option value="all">Semua Tingkat (Campuran)</option>
              <option value="mudah">Dasar (Easy)</option>
              <option value="sedang">Menengah (Medium)</option>
              <option value="sulit">Mahir (Hard)</option>
            </select>
          </div>
        </div>

        {/* 4. Timer Configuration (Only in Exam Mode) */}
        {mode === 'exam' && (
          <div className="space-y-3 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-700">
                Pengaturan Waktu
              </label>
              <label className="flex items-center gap-1.5 text-xs text-slate-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={timerEnabled}
                  onChange={(e) => setTimerEnabled(e.target.checked)}
                  className="rounded border-slate-300 text-slate-900 focus:ring-slate-800"
                />
                <span>Aktifkan Batas Waktu</span>
              </label>
            </div>

            {timerEnabled && (
              <div className="p-3 bg-slate-50 border border-slate-200 rounded space-y-2">
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="text-slate-500 font-medium">Alokasi per soal:</span>
                  {[
                    { label: '45 detik/soal (Cepat)', sec: 45 },
                    { label: '60 detik/soal (Standar)', sec: 60 },
                    { label: '90 detik/soal (Santai)', sec: 90 },
                  ].map((p) => (
                    <button
                      key={p.sec}
                      type="button"
                      onClick={() => setTimerPreset(p.sec)}
                      className={`px-2.5 py-1 rounded text-xs font-mono transition-colors border ${
                        timerPreset === p.sec
                          ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <div className="text-[11px] text-slate-500 font-mono">
                  Estimasi total durasi tes:{' '}
                  <strong className="text-slate-900 font-bold">
                    {totalCalculatedTimeMinutes} Menit
                  </strong>{' '}
                  ({questionCount} soal × {timerPreset}s)
                </div>
              </div>
            )}
          </div>
        )}

        {/* 5. Randomization & Generation Status Box */}
        <div className="p-3.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-600 space-y-1">
          <div className="font-semibold text-slate-900 flex items-center gap-1.5">
            <Shuffle className="w-3.5 h-3.5 text-slate-700" />
            Randomisasi Prosedural Aktif
          </div>
          <p className="text-[11px] leading-relaxed">
            Setiap sesi menghasilkan set soal baru dengan parameter sudut rotasi, paritas sisi, jumlah elemen dalam, serta urutan opsi (A–E) yang diacak secara unik untuk mencegah pengulangan pola.
          </p>
        </div>

        {/* 6. Summary Confirmation & Start Button */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-100">
          <div className="text-xs text-slate-500">
            Terpilih:{' '}
            <strong className="font-mono text-slate-900 text-sm">
              {isConfigValid ? questionCount.toLocaleString('id-ID') : 0}
            </strong>{' '}
            soal • {mode === 'exam' ? 'Simulasi Ujian' : 'Latihan Bebas'}
          </div>

          <button
            type="submit"
            disabled={!isConfigValid}
            className="w-full sm:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-xs font-semibold tracking-wide rounded transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Mulai Sesi Sekarang</span>
          </button>
        </div>
      </form>
    </div>
  );
};
