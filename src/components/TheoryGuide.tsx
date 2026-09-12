import React from 'react';
import { AxiomMark } from './AxiomMark';
import {
  Compass,
  CheckCircle2,
  AlertOctagon,
  ArrowRight,
  GitBranch,
  Layers,
  HelpCircle,
  Hash,
  RotateCw,
  PieChart,
  Maximize2,
} from 'lucide-react';

interface TheoryGuideProps {
  onStartPractice?: () => void;
}

export const TheoryGuide: React.FC<TheoryGuideProps> = ({ onStartPractice }) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto text-slate-800">
      {/* Editorial Title Banner */}
      <div className="border-b border-slate-200 pb-6 space-y-3">
        <div className="flex items-center gap-2">
          <AxiomMark size={20} className="text-slate-900" />
          <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-slate-500">
            Kompandium Metodologi Kognitif • Dokumen Ref #AX-THY-01
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 leading-tight">
          Prinsip & Landasan Formal Penalaran Induktif
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
          Berbeda dari logika deduktif yang mengaplikasikan aksioma yang sudah ditetapkan, penalaran induktif menuntut kemampuan kognitif tingkat tinggi untuk mengekstrak formula invarian tersembunyi (hidden rules) dari serangkaian observasi terbatas, lalu menggeneralisasikan aturan tersebut ke objek uji baru secara presisi.
        </p>
      </div>

      {/* 1. Formal Epistemological Comparison */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-slate-700" />
            1. Perbedaan Epistemologis: Deduksi vs Induksi
          </h2>
          <span className="text-[10px] font-mono text-slate-400">
            AXIOM LOGIC FRAMEWORK
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded border border-slate-200 bg-slate-50/60 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-900 uppercase">
                Penalaran Deduktif
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-200 text-slate-700">
                Top-Down (Pasti)
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Aturan umum sudah diberikan secara eksplisit di awal. Subjek hanya perlu memvalidasi konsekuensi spesifik dari aturan tersebut.
            </p>
            <div className="p-2.5 bg-white rounded border border-slate-200 font-mono text-[11px] text-slate-700">
              Premis: Semua A = B.<br />
              Kasus: X adalah A.<br />
              Kesimpulan: X pasti B.
            </div>
          </div>

          <div className="p-4 rounded border border-slate-900 bg-slate-900 text-white space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-white uppercase">
                Penalaran Induktif
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                Bottom-Up (Probabilistik / Evaluatif)
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Aturan TIDAK pernah diberikan. Subjek harus mengobservasi variasi contoh empiris, mengeliminasi variabel semu, dan merumuskan kriteria invarian.
            </p>
            <div className="p-2.5 bg-slate-800 rounded border border-slate-700 font-mono text-[11px] text-slate-200">
              Observasi: Gambar 1, 2, 3 konsisten bersisi genap.<br />
              Hipotesis: Invarian = Bilangan Genap.<br />
              Uji: Pilih opsi yang mempertahankan sifat ini.
            </div>
          </div>
        </div>
      </div>

      {/* 2. Metode S-P-O-R-T (The 45-Second Mental Heuristic) */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 space-y-5">
        <div className="border-b border-slate-100 pb-3 space-y-1">
          <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.08em] text-slate-500">
            METODOLOGI PEMBEDAHAN POLA
          </span>
          <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            2. Kerangka Mental S-P-O-R-T (45 Detik per Soal)
          </h2>
          <p className="text-xs text-slate-600">
            Urutan checklist visual terstruktur untuk mengidentifikasi variabel yang berubah dan konstan:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* S */}
          <div className="p-3.5 rounded border border-slate-200 bg-white space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                S
              </span>
              <span className="text-xs font-bold text-slate-900">
                Shape & Vertices (Bentuk & Paritas Sisi)
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hitung jumlah sisi geometris luar dan poligon dalam. Uji sifat paritas (apakah selalu ganjil atau genap?) atau pertambahan berkala (+1 sisi per frame).
            </p>
          </div>

          {/* P */}
          <div className="p-3.5 rounded border border-slate-200 bg-white space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                P
              </span>
              <span className="text-xs font-bold text-slate-900">
                Position & Topology (Posisi & Distribusi)
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Analisis letak titik atau elemen pembantu: apakah konsentris di titik pusat, menempel pada simpul sudut, atau berada di luar perimetri?
            </p>
          </div>

          {/* O */}
          <div className="p-3.5 rounded border border-slate-200 bg-white space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                O
              </span>
              <span className="text-xs font-bold text-slate-900">
                Orientation & Angular Velocity (Rotasi Sudut)
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Apakah elemen berputar teratur (45°, 90°, 180°)? Searah atau berlawanan jarum jam? Apakah terjadi pencerminan reflektif terhadap sumbu simetri?
            </p>
          </div>

          {/* R */}
          <div className="p-3.5 rounded border border-slate-200 bg-white space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                R
              </span>
              <span className="text-xs font-bold text-slate-900">
                Ratio & Shading Inversion (Proporsi Arsir)
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Berapa rasio luas daerah gelap terhadap terang? Apakah arsiran selalu mencakup separuh (50%) poligon atau bertukar warna secara bergantian (XOR logic)?
            </p>
          </div>

          {/* T */}
          <div className="p-3.5 rounded border border-slate-200 bg-white space-y-1.5 sm:col-span-2">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded bg-slate-900 text-white font-mono font-bold text-xs flex items-center justify-center">
                T
              </span>
              <span className="text-xs font-bold text-slate-900">
                Total Arithmetic Relation (Korelasi Aritmetika Lintas Elemen)
              </span>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Periksa hubungan numerik: misalnya <code className="font-mono text-slate-800 bg-slate-100 px-1 py-0.5 rounded">Jumlah Sisi - Jumlah Titik = 2 (konstan)</code>. Relasi matematis antar-fitur adalah metode klasik dalam penilaian psikometri mahir.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Common Cognitive Pitfalls & Distractor Anatomy */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-2">
            <AlertOctagon className="w-4 h-4 text-rose-700" />
            3. Anatomi Pengecoh (Distractors) & Jebakan Kognitif
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="p-3.5 rounded border border-rose-200 bg-rose-50/40 space-y-1.5">
            <span className="font-mono font-bold text-rose-800 block uppercase text-[11px]">
              Jebakan 01: Overfitting (Terlalu Spesifik)
            </span>
            <p className="text-slate-600 leading-relaxed">
              Mengira bahwa bentuk poligon harus persis segitiga sama sisi karena semua contoh kebetulan segitiga, padahal aturan invarian hanya menuntut sifat &quot;poligon bersisi ganjil&quot;.
            </p>
          </div>

          <div className="p-3.5 rounded border border-rose-200 bg-rose-50/40 space-y-1.5">
            <span className="font-mono font-bold text-rose-800 block uppercase text-[11px]">
              Jebakan 02: Incomplete Conjunction (Aturan Separuh)
            </span>
            <p className="text-slate-600 leading-relaxed">
              Memilih opsi yang hanya memenuhi kriteria primer (misal: rotasi benar) tetapi mengabaikan kriteria sekunder (misal: jumlah dot di dalam tidak cocok).
            </p>
          </div>

          <div className="p-3.5 rounded border border-rose-200 bg-rose-50/40 space-y-1.5">
            <span className="font-mono font-bold text-rose-800 block uppercase text-[11px]">
              Jebakan 03: Red Herring (Fitur Acak Pengecoh)
            </span>
            <p className="text-slate-600 leading-relaxed">
              Menghabiskan waktu menganalisis arah garis aksen yang sebenarnya bervariasi acak sebagai noise penguji fokus.
            </p>
          </div>

          <div className="p-3.5 rounded border border-rose-200 bg-rose-50/40 space-y-1.5">
            <span className="font-mono font-bold text-rose-800 block uppercase text-[11px]">
              Jebakan 04: Negation Blindness (Gagal Menguji Falsifikasi)
            </span>
            <p className="text-slate-600 leading-relaxed">
              Hipotesis aturan yang baik bukan hanya mencakup contoh positif (Group A), melainkan WAJIB memfalsifikasi dan menolak seluruh contoh negatif (Group B).
            </p>
          </div>
        </div>

        {onStartPractice && (
          <div className="pt-3 border-t border-slate-100 flex justify-end">
            <button
              type="button"
              onClick={onStartPractice}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-2xs"
            >
              <span>Uji Pemahaman di Sesi Asesmen</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
