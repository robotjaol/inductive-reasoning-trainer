import React, { useState } from 'react';
import { InductiveQuestion } from '../types';
import { SvgStimulus } from './SvgStimulus';
import { ExplanationView } from './ExplanationView';
import {
  Search,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Archive,
  ArrowRight,
  SlidersHorizontal,
} from 'lucide-react';

interface BankSoalCatalogProps {
  questions: InductiveQuestion[];
  bookmarkedIds: string[];
  onToggleBookmark: (id: string) => void;
  onPracticeQuestion: (questionId: string) => void;
}

export const BankSoalCatalog: React.FC<BankSoalCatalogProps> = ({
  questions,
  bookmarkedIds,
  onToggleBookmark,
  onPracticeQuestion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const familyLabels: Record<string, string> = {
    group_classification: 'Klasifikasi Kelompok',
    odd_one_out: 'Odd-One-Out',
    rule_identification: 'Identifikasi Aturan',
    analogy: 'Analogi Pola',
    sequence_induction: 'Deret Induktif',
  };

  const filteredQuestions = questions.filter((q) => {
    if (onlyBookmarked && !bookmarkedIds.includes(q.id)) return false;
    if (selectedFamily !== 'all' && q.family !== selectedFamily) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    if (searchQuery.trim()) {
      const qText = `${q.title} ${q.prompt} ${q.explanation.hiddenRule} ${q.tags.join(' ')}`.toLowerCase();
      if (!qText.includes(searchQuery.toLowerCase())) return false;
    }
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Archive className="w-4 h-4 text-slate-700" />
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-slate-500">
              Katalog Referensi Baku
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Bank Soal Standar Penalaran Induktif
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Arsip instrumen uji representatif dengan bedah aturan invarian formal, pohon keputusan analitis, dan telaah opsi pengecoh.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-100 border border-slate-200 text-slate-700 font-semibold">
            {filteredQuestions.length} Butir Soal Terfilter
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari konsep pola (contoh: paritas, rotasi, titik, sisi)..."
              className="w-full pl-9 pr-3 py-2 rounded border border-slate-300 text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-slate-900 font-sans"
            />
          </div>

          {/* Bookmarked Filter Toggle */}
          <button
            type="button"
            onClick={() => setOnlyBookmarked(!onlyBookmarked)}
            className={`px-3 py-2 rounded text-xs font-medium flex items-center justify-center gap-1.5 border transition-colors cursor-pointer ${
              onlyBookmarked
                ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Bookmark className={`w-3.5 h-3.5 ${onlyBookmarked ? 'fill-white' : ''}`} />
            <span>Tersimpan ({bookmarkedIds.length})</span>
          </button>
        </div>

        {/* Category & Difficulty Filters */}
        <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-semibold mr-1">
              Kategori:
            </span>
            {[
              { id: 'all', label: 'Semua Kategori' },
              { id: 'group_classification', label: 'Klasifikasi Kelompok' },
              { id: 'odd_one_out', label: 'Odd-One-Out' },
              { id: 'rule_identification', label: 'Identifikasi Aturan' },
              { id: 'analogy', label: 'Analogi Pola' },
              { id: 'sequence_induction', label: 'Deret Induktif' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedFamily(item.id)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors border cursor-pointer ${
                  selectedFamily === item.id
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5">
            <span className="font-mono text-[10px] uppercase tracking-wider text-slate-400 font-semibold mr-1">
              Tingkat:
            </span>
            {[
              { id: 'all', label: 'Semua Level' },
              { id: 'mudah', label: 'Dasar (Easy)' },
              { id: 'sedang', label: 'Menengah (Medium)' },
              { id: 'sulit', label: 'Mahir (Hard)' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedDifficulty(item.id)}
                className={`px-2 py-0.5 rounded text-xs font-mono transition-colors border cursor-pointer ${
                  selectedDifficulty === item.id
                    ? 'bg-slate-900 text-white border-slate-900 font-semibold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center space-y-1">
            <p className="text-xs font-semibold text-slate-700">
              Tidak ada instrumen soal yang memenuhi kriteria pencarian.
            </p>
            <p className="text-[11px] text-slate-400 font-mono">
              Atur ulang kata kunci atau pilih Semua Kategori.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isBookmarked = bookmarkedIds.includes(q.id);
            const isExpanded = expandedId === q.id;

            return (
              <div
                key={q.id}
                className="bg-white rounded-lg border border-slate-200 overflow-hidden transition-colors"
              >
                {/* Header */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white">
                  <div className="flex items-start gap-3 min-w-0">
                    <span className="w-8 h-8 rounded border border-slate-200 bg-slate-50 font-mono text-xs font-bold flex items-center justify-center text-slate-800 shrink-0">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap text-xs">
                        <span className="font-mono text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                          {familyLabels[q.family] || q.family}
                        </span>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 uppercase">
                          {q.difficulty}
                        </span>
                        {q.tags.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] text-slate-400 font-mono"
                          >
                            #{t}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                        {q.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {q.prompt}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <button
                      type="button"
                      onClick={() => onToggleBookmark(q.id)}
                      title="Simpan soal ini"
                      className={`p-1.5 rounded border text-xs cursor-pointer transition-colors ${
                        isBookmarked
                          ? 'bg-slate-900 border-slate-900 text-white'
                          : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
                      }`}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="w-3.5 h-3.5" />
                      ) : (
                        <Bookmark className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => onPracticeQuestion(q.id)}
                      className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>Kerjakan</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleExpand(q.id)}
                      className={`px-3 py-1.5 rounded border text-xs font-medium flex items-center gap-1.5 cursor-pointer transition-colors ${
                        isExpanded
                          ? 'bg-slate-100 text-slate-900 border-slate-300'
                          : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <span>{isExpanded ? 'Tutup' : 'Telaah Pembahasan'}</span>
                      {isExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Expanded Detail Drawer */}
                {isExpanded && (
                  <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50/50 space-y-5">
                    {/* Visual Stimulus Preview if Group Classification */}
                    {q.family === 'group_classification' && q.groupA && q.groupB && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 bg-white rounded border border-slate-200 space-y-2">
                          <span className="font-bold text-slate-900 block font-mono text-[11px] uppercase">
                            Kelompok A (Contoh Positif):
                          </span>
                          <div className="flex flex-wrap items-center gap-2">
                            {q.groupA.items.map((it, i) => (
                              <SvgStimulus key={i} stimulus={it} size={70} />
                            ))}
                          </div>
                        </div>
                        <div className="p-3 bg-white rounded border border-slate-200 space-y-2">
                          <span className="font-bold text-slate-900 block font-mono text-[11px] uppercase">
                            Kelompok B (Contoh Negatif):
                          </span>
                          <div className="flex flex-wrap items-center gap-2">
                            {q.groupB.items.map((it, i) => (
                              <SvgStimulus key={i} stimulus={it} size={70} />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Options list */}
                    <div className="space-y-2">
                      <div className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                        Pilihan Jawaban & Verifikasi Kunci:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {q.options.map((opt) => {
                          const isKunci = opt.id === q.correctAnswerId;
                          return (
                            <div
                              key={opt.id}
                              className={`p-2.5 rounded border text-xs flex items-center gap-2.5 ${
                                isKunci
                                  ? 'bg-emerald-50/60 border-emerald-300 text-emerald-950 font-medium'
                                  : 'bg-white border-slate-200 text-slate-700'
                              }`}
                            >
                              <span
                                className={`w-6 h-6 rounded flex items-center justify-center font-mono text-xs font-bold shrink-0 border ${
                                  isKunci
                                    ? 'bg-emerald-700 text-white border-emerald-700'
                                    : 'bg-slate-100 text-slate-700 border-slate-200'
                                }`}
                              >
                                {opt.id}
                              </span>
                              {opt.stimulus && (
                                <SvgStimulus stimulus={opt.stimulus} size={48} showBorder={false} />
                              )}
                              <span className="flex-1">{opt.label}</span>
                              {isKunci && (
                                <span className="text-[10px] font-mono font-bold text-emerald-800 px-1.5 py-0.5 rounded bg-emerald-100 border border-emerald-200">
                                  Kunci Benar
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Full explanation view */}
                    <div className="pt-2 border-t border-slate-200">
                      <ExplanationView
                        explanation={q.explanation}
                        options={q.options}
                        correctAnswerId={q.correctAnswerId}
                        selectedOptionId={q.correctAnswerId}
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
