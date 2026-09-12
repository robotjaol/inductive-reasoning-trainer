import React from 'react';
import { UserStats, UserExamRecord } from '../types';
import {
  BarChart2,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  AlertTriangle,
  RotateCcw,
  Compass,
  ArrowRight,
  Shield,
  Layers,
} from 'lucide-react';

interface AnalyticsDashboardProps {
  stats: UserStats;
  onStartAssessment: () => void;
  onResetStats?: () => void;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  stats,
  onStartAssessment,
  onResetStats,
}) => {
  const accuracy =
    stats.totalSolved > 0
      ? Math.round((stats.totalCorrect / stats.totalSolved) * 100)
      : 0;

  // Cognitive Competency categorization based on practice & exams
  const families = [
    {
      id: 'group_classification',
      name: 'Klasifikasi Kelompok',
      desc: 'Ekstraksi invarian pembeda Kelompok A vs Kelompok B',
      benchmark: 82,
    },
    {
      id: 'odd_one_out',
      name: 'Odd-One-Out (Anomali)',
      desc: 'Deteksi figur tunggal yang melanggar hukum simetri kelompok',
      benchmark: 78,
    },
    {
      id: 'analogy',
      name: 'Analogi Pola Geometris',
      desc: 'Transformasi relasional formal A:B diterapkan pada C:D',
      benchmark: 75,
    },
    {
      id: 'sequence_induction',
      name: 'Deret Induktif (Sequence)',
      desc: 'Prediksi laju rotasi bertingkat, perpindahan elemen, dan paritas',
      benchmark: 70,
    },
    {
      id: 'rule_identification',
      name: 'Identifikasi Aturan Formal',
      desc: 'Formulasi relasi numerik invarian (misal: Sisi - Titik = K)',
      benchmark: 72,
    },
  ];

  const examHistoryList = stats.history || [];
  const totalExams = examHistoryList.length;
  const recentExams = [...examHistoryList];

  // Average time calculation across exam history
  const totalExamSeconds = examHistoryList.reduce((acc, curr) => acc + curr.timeSpentSeconds, 0);
  const totalExamQuestions = examHistoryList.reduce((acc, curr) => acc + curr.totalQuestions, 0);
  const avgExamSecondsPerQuestion =
    totalExamQuestions > 0
      ? Math.round(totalExamSeconds / totalExamQuestions)
      : 0;

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-slate-800">
      {/* Header bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BarChart2 className="w-4 h-4 text-slate-700" strokeWidth={1.75} />
            <span className="font-mono text-[11px] uppercase tracking-[0.08em] font-semibold text-slate-500">
              AUDIT TELEMETRI & PROFIL KOGNITIF
            </span>
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Dasbor Analitika & Riwayat Evaluasi
          </h1>
          <p className="text-xs text-slate-600 mt-0.5">
            Laporan longitudinal penguasaan penalaran induktif, kecepatan pemecahan pola, dan rekam jejak sesi asesmen.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onResetStats && stats.totalSolved > 0 && (
            <button
              type="button"
              onClick={onResetStats}
              className="px-3 py-1.5 rounded border border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50 text-slate-600 text-xs font-mono transition-colors cursor-pointer"
            >
              Reset Data
            </button>
          )}

          <button
            type="button"
            onClick={onStartAssessment}
            className="px-3.5 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-2xs transition-colors"
          >
            <span>Mulai Asesmen Baru</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Metric 1: Total Solved */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block font-mono">
            Total Soal Dikerjakan
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 tabular-nums">
            {stats.totalSolved.toLocaleString('id-ID')}
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Instrumen evaluasi
          </p>
        </div>

        {/* Metric 2: Cumulative Accuracy */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block font-mono">
            Akurasi Kumulatif
          </span>
          <div className="flex items-baseline gap-1.5">
            <span
              className={`text-2xl sm:text-3xl font-mono font-bold tabular-nums ${
                accuracy >= 75
                  ? 'text-emerald-700'
                  : accuracy >= 50
                  ? 'text-slate-900'
                  : 'text-rose-700'
              }`}
            >
              {accuracy}%
            </span>
            <span className="text-xs font-mono text-slate-500">
              ({stats.totalCorrect}/{stats.totalSolved})
            </span>
          </div>
          <div className="h-1 w-full bg-slate-100 rounded-full overflow-hidden mt-1.5">
            <div
              className={`h-full ${
                accuracy >= 75
                  ? 'bg-emerald-600'
                  : accuracy >= 50
                  ? 'bg-slate-900'
                  : 'bg-rose-500'
              }`}
              style={{ width: `${accuracy}%` }}
            />
          </div>
        </div>

        {/* Metric 3: Pacing Index */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block font-mono">
            Tempo Rata-Rata
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 tabular-nums">
            {avgExamSecondsPerQuestion}s
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            {avgExamSecondsPerQuestion <= 45
              ? 'Pacing: Sangat Responsif'
              : avgExamSecondsPerQuestion <= 60
              ? 'Pacing: Standar Ujian'
              : 'Pacing: Analitis Mendalam'}
          </p>
        </div>

        {/* Metric 4: Completed Exam Sessions */}
        <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-1">
          <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block font-mono">
            Sesi Ujian Selesai
          </span>
          <div className="text-2xl sm:text-3xl font-mono font-bold text-slate-900 tabular-nums">
            {totalExams}
          </div>
          <p className="text-[11px] text-slate-500 font-mono">
            Terekam dalam arsip
          </p>
        </div>
      </div>

      {/* Section 2: Cognitive Competency Matrix */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
              <Shield className="w-4 h-4 text-slate-700" strokeWidth={1.75} />
              Matriks Penguasaan 5 Domain Penalaran Induktif
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Tingkat kemahiran dihitung dari konsistensi ekstraksi aturan dan kecepatan eliminasi distractor.
            </p>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            HASIL UJIAN TERSIMPAN
          </span>
        </div>

        <div className="space-y-3">
          {families.map((fam) => {
            const totals = examHistoryList.reduce((sum, record) => {
              const value = record.familyBreakdown?.[fam.id];
              return { total: sum.total + (value?.total || 0), correct: sum.correct + (value?.correct || 0) };
            }, { total: 0, correct: 0 });
            const userProficiency = totals.total ? Math.round(totals.correct / totals.total * 100) : 0;

            return (
              <div
                key={fam.id}
                className="p-3 rounded border border-slate-100 bg-slate-50/50 hover:bg-white hover:border-slate-300 transition-colors space-y-1.5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div>
                    <span className="text-xs font-bold text-slate-900">
                      {fam.name}
                    </span>
                    <span className="text-[11px] text-slate-500 block sm:inline sm:ml-2">
                      {fam.desc}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                    <span className="font-mono text-xs font-bold text-slate-900 tabular-nums">
                      {totals.total > 0 ? `${userProficiency}%` : 'Belum ada data'}
                    </span>
                    <span
                      className={`text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded border ${
                        userProficiency >= 75
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : userProficiency >= 60
                          ? 'bg-slate-100 text-slate-700 border-slate-200'
                          : 'bg-rose-50 text-rose-800 border-rose-200'
                      }`}
                    >
                      {!totals.total ? 'Belum dinilai' : userProficiency >= 80
                        ? 'Mastery (Tinggi)'
                        : userProficiency >= 60
                        ? 'Kompeten'
                        : 'Butuh Latihan'}
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${
                      userProficiency >= 75
                        ? 'bg-slate-900'
                        : userProficiency >= 60
                        ? 'bg-slate-600'
                        : 'bg-amber-600'
                    }`}
                    style={{ width: `${userProficiency}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 3: Exam History Ledger */}
      <div className="bg-white border border-slate-200 rounded-lg p-5 sm:p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Clock className="w-4 h-4 text-slate-700" strokeWidth={1.75} />
            Buku Catatan Sesi Ujian (Session History Ledger)
          </h2>
          <span className="text-xs font-mono text-slate-500">
            {recentExams.length} Catatan Tersimpan
          </span>
        </div>

        {recentExams.length === 0 ? (
          <div className="text-center py-10 rounded border border-dashed border-slate-200 bg-slate-50/50 space-y-2">
            <Compass className="w-6 h-6 text-slate-400 mx-auto" />
            <p className="text-xs font-semibold text-slate-700">
              Belum ada sesi simulasi ujian yang terekam.
            </p>
            <p className="text-[11px] text-slate-500 max-w-sm mx-auto">
              Selesaikan sesi pertama Anda di menu Sesi Asesmen untuk melihat riwayat akurasi, waktu pengerjaan, dan tren perbaikan Anda di sini.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={onStartAssessment}
                className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-xs font-semibold cursor-pointer"
              >
                Mulai Sesi Ujian Pertama
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 font-mono text-[10px] text-slate-500 uppercase tracking-wider">
                  <th className="py-2.5 px-3">ID Sesi</th>
                  <th className="py-2.5 px-3">Tanggal & Jam</th>
                  <th className="py-2.5 px-3 text-center">Jumlah Soal</th>
                  <th className="py-2.5 px-3 text-center">Durasi</th>
                  <th className="py-2.5 px-3 text-center">Jawaban Benar</th>
                  <th className="py-2.5 px-3 text-right">Skor Akurasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {recentExams.map((item, idx) => {
                  const isHigh = item.scorePercentage >= 75;
                  const isMid = item.scorePercentage >= 50;

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3 px-3 font-bold text-slate-900">
                        #{item.id.slice(-6)}
                      </td>
                      <td className="py-3 px-3 text-slate-600 font-sans text-xs">
                        {item.date}
                      </td>
                      <td className="py-3 px-3 text-center text-slate-700">
                        {item.totalQuestions} soal
                      </td>
                      <td className="py-3 px-3 text-center text-slate-600">
                        {formatSeconds(item.timeSpentSeconds)}
                      </td>
                      <td className="py-3 px-3 text-center">
                        <span className="text-emerald-700 font-semibold">
                          {item.correctAnswers}
                        </span>{' '}
                        <span className="text-slate-400">/ {item.totalQuestions}</span>
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span
                          className={`inline-block px-2 py-0.5 rounded font-bold ${
                            isHigh
                              ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                              : isMid
                              ? 'bg-slate-100 text-slate-800 border border-slate-200'
                              : 'bg-rose-50 text-rose-800 border border-rose-200'
                          }`}
                        >
                          {item.scorePercentage}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
