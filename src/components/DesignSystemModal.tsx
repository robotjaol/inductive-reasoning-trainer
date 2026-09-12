import React from 'react';
import { AxiomMark } from './AxiomMark';
import {
  X,
  Layers,
  Compass,
  CheckCircle2,
  Sliders,
  Type,
  Palette,
  LayoutGrid,
  Shield,
  Keyboard,
} from 'lucide-react';

interface DesignSystemModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DesignSystemModal: React.FC<DesignSystemModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-lg border border-slate-300 max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl text-slate-900 text-xs">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-slate-900 text-white flex items-center justify-center border border-slate-800">
              <AxiomMark size={20} className="text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.08em] font-bold text-slate-500">
                  MANUAL DESAIN & IDENTITAS
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 border border-slate-200">
                  v2.4 Baku
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight">
                Standar Sistem Desain Produk & Identitas Merek AXIOM
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-800 rounded border border-slate-200 hover:border-slate-300 transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" strokeWidth={1.75} />
          </button>
        </div>

        {/* 1. Brand Mark & Visual Identity System */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Shield className="w-4 h-4 text-slate-700" strokeWidth={1.75} />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              1. Identitas Vektor Hallmark (Pentagram & COLLINS Paradigm)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Hallmark Showcase */}
            <div className="p-4 rounded border border-slate-200 bg-slate-50/70 flex flex-col items-center text-center space-y-2.5">
              <div className="w-16 h-16 rounded-lg bg-slate-900 text-white flex items-center justify-center border border-slate-800 shadow-xs">
                <AxiomMark size={38} className="text-white" />
              </div>
              <span className="font-mono font-bold text-slate-900 text-xs">
                AXIOM Centroid Nexus
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Heksagon reguler membungkus konvergensi tri-aksial isometrik yang memusat pada titik invarian universal.
              </p>
            </div>

            {/* Clear-space & Minimum Size Rule */}
            <div className="p-4 rounded border border-slate-200 bg-white space-y-2">
              <span className="font-mono font-bold text-[11px] text-slate-900 uppercase block">
                Aturan Clear-Space & Skala
              </span>
              <ul className="space-y-1.5 text-[11px] text-slate-600">
                <li className="flex items-start gap-1.5">
                  <span className="font-mono text-slate-400">•</span>
                  <span><strong>Clear-space Minimum:</strong> 0.5× tinggi logo (X/2) di sekeliling perimeter.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-mono text-slate-400">•</span>
                  <span><strong>Ukuran Minimum Digital:</strong> 16px (Favicon / Micro-UI) dengan legibilitas utuh.</span>
                </li>
                <li className="flex items-start gap-1.5">
                  <span className="font-mono text-slate-400">•</span>
                  <span><strong>Ketebalan Stroke Vektor:</strong> 1.75px seragam dengan pixel-snapping optis.</span>
                </li>
              </ul>
            </div>

            {/* Monochrome & Contrast Integrity */}
            <div className="p-4 rounded border border-slate-200 bg-white space-y-2">
              <span className="font-mono font-bold text-[11px] text-slate-900 uppercase block">
                Aturan Warna & Kontras
              </span>
              <div className="flex items-center gap-2 pt-1">
                <div className="p-2 rounded bg-white border border-slate-300 text-slate-900">
                  <AxiomMark size={20} />
                </div>
                <div className="p-2 rounded bg-slate-900 text-white border border-slate-800">
                  <AxiomMark size={20} />
                </div>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed pt-1">
                Bebas gradien semu atau glowing drop shadow. Bekerja sempurna pada latar putih, slate terang, atau slate gelap dengan rasio kontras &gt; 12:1.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Typography Hierarchy (Swiss / Editorial Standard) */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Type className="w-4 h-4 text-slate-700" strokeWidth={1.75} />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              2. Hierarki Tipografi Disiplin (Inter + JetBrains Mono)
            </h3>
          </div>

          <div className="border border-slate-200 rounded overflow-hidden">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50 font-mono text-[10px] text-slate-500 uppercase">
                  <th className="p-2.5">Level Tipografi</th>
                  <th className="p-2.5">Font Family & Bobot</th>
                  <th className="p-2.5">Ukuran / Line-height</th>
                  <th className="p-2.5">Tujuan Fungsional</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[11px]">
                <tr>
                  <td className="p-2.5 font-bold text-slate-900">Display / Title</td>
                  <td className="p-2.5 font-sans">Inter Bold (700)</td>
                  <td className="p-2.5 font-mono">24px – 30px / 1.2</td>
                  <td className="p-2.5 text-slate-600">Judul halaman utama dan banner editorial</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-semibold text-slate-900">Heading UI</td>
                  <td className="p-2.5 font-sans">Inter SemiBold (600)</td>
                  <td className="p-2.5 font-mono">14px – 16px / 1.3</td>
                  <td className="p-2.5 text-slate-600">Nama komponen, kartu soal, sub-judul modul</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium text-slate-800">Body Text</td>
                  <td className="p-2.5 font-sans">Inter Regular (400) / Med (500)</td>
                  <td className="p-2.5 font-mono">12px – 14px / 1.6</td>
                  <td className="p-2.5 text-slate-600">Pertanyaan, deskripsi instruksi, pembuktian nalar</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono font-bold text-slate-900">Tabular Telemetry</td>
                  <td className="p-2.5 font-mono">JetBrains Mono SemiBold</td>
                  <td className="p-2.5 font-mono">11px – 13px / 1.0 (tnum)</td>
                  <td className="p-2.5 text-slate-600">Timer mundur, koordinat, skor persentil, indeks butir</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-mono text-slate-600">Section Eyebrow</td>
                  <td className="p-2.5 font-mono">JetBrains Mono SemiBold</td>
                  <td className="p-2.5 font-mono">10px / tracking-wider</td>
                  <td className="p-2.5 text-slate-600">Metadata ref dokumen, kategori standar AXIOM</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 3. Controlled Semantic Palette & Grid Standard */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
            <Palette className="w-4 h-4 text-slate-700" strokeWidth={1.75} />
            <h3 className="font-bold text-xs uppercase tracking-wider text-slate-900">
              3. Matriks Warna Semantik & Grid 8px (IBM Carbon & Vercel)
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded border border-slate-200 bg-white space-y-1">
              <div className="w-full h-4 rounded bg-slate-900" />
              <span className="font-mono font-bold text-[10px] text-slate-900 block">Canvas Dark / Slate-900</span>
              <span className="text-[10px] text-slate-500 font-mono">#0f172a • Kontras Utama</span>
            </div>
            <div className="p-2.5 rounded border border-slate-200 bg-white space-y-1">
              <div className="w-full h-4 rounded bg-emerald-600" />
              <span className="font-mono font-bold text-[10px] text-emerald-800 block">Valid Invariant / Emerald</span>
              <span className="text-[10px] text-slate-500 font-mono">#059669 • Kunci Benar</span>
            </div>
            <div className="p-2.5 rounded border border-slate-200 bg-white space-y-1">
              <div className="w-full h-4 rounded bg-rose-600" />
              <span className="font-mono font-bold text-[10px] text-rose-800 block">Falsified Defect / Rose</span>
              <span className="text-[10px] text-slate-500 font-mono">#e11d48 • Pengecoh/Salah</span>
            </div>
            <div className="p-2.5 rounded border border-slate-200 bg-white space-y-1">
              <div className="w-full h-4 rounded bg-amber-500" />
              <span className="font-mono font-bold text-[10px] text-amber-800 block">Review Flag / Amber</span>
              <span className="text-[10px] text-slate-500 font-mono">#d97706 • Ragu-ragu</span>
            </div>
          </div>
        </div>

        {/* 4. Keyboard Shortcuts for Pro Cognitive Evaluation */}
        <div className="p-3.5 rounded border border-slate-200 bg-slate-50 space-y-2">
          <div className="flex items-center gap-1.5 font-bold text-slate-900 text-xs">
            <Keyboard className="w-4 h-4 text-slate-700" strokeWidth={1.75} />
            <span>Pintasan Keyboard (Linear Pro UX Interaction)</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono">
            <div><kbd>A</kbd> – <kbd>E</kbd> : Pilih Opsi</div>
            <div><kbd>←</kbd> / <kbd>→</kbd> : Soal Lalu / Berikut</div>
            <div><kbd>F</kbd> : Tandai Ragu-ragu</div>
            <div><kbd>C</kbd> : Bersihkan Pilihan</div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200">
          <span className="font-mono text-[10px] text-slate-500">
            AXIOM Product Design Directive © 2026
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-900 text-white rounded font-semibold text-xs cursor-pointer hover:bg-slate-800"
          >
            Tutup Dokumentasi
          </button>
        </div>
      </div>
    </div>
  );
};
