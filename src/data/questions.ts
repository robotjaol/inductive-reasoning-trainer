import { InductiveQuestion } from '../types';
import { completeQuestionBank } from './questionBank';

const REFERENCE_QUESTIONS: InductiveQuestion[] = [
  // ==========================================
  // SOAL 1: KLASIFIKASI KELOMPOK (Group Classification)
  // ==========================================
  {
    id: 'ind-01',
    title: 'Klasifikasi Kelompok: Paritas Sisi & Titik Hitam',
    family: 'group_classification',
    difficulty: 'mudah',
    tags: ['Klasifikasi', 'Paritas Sisi', 'Jumlah Titik'],
    prompt:
      'Perhatikan karakteristik figur pada Kelompok A dan Kelompok B di bawah ini. Tentukan kelompok yang paling tepat untuk Gambar Uji (Test Figure), atau pilih opsi yang sesuai!',
    contextNote:
      'Kelompok A dan Kelompok B masing-masing memiliki aturan logika konsisten yang saling eksklusif.',
    groupA: {
      name: 'Kelompok A',
      items: [
        {
          primaryShape: 'triangle',
          sides: 3,
          dots: { blackCount: 2, whiteCount: 0 },
          fillColor: 'none',
        },
        {
          primaryShape: 'pentagon',
          sides: 5,
          dots: { blackCount: 2, whiteCount: 0 },
          fillColor: 'none',
        },
        {
          primaryShape: 'star',
          sides: 5,
          dots: { blackCount: 2, whiteCount: 0 },
          fillColor: 'none',
        },
      ],
    },
    groupB: {
      name: 'Kelompok B',
      items: [
        {
          primaryShape: 'square',
          sides: 4,
          dots: { blackCount: 1, whiteCount: 0 },
          fillColor: 'none',
        },
        {
          primaryShape: 'hexagon',
          sides: 6,
          dots: { blackCount: 1, whiteCount: 0 },
          fillColor: 'none',
        },
        {
          primaryShape: 'diamond',
          sides: 4,
          dots: { blackCount: 1, whiteCount: 0 },
          fillColor: 'none',
        },
      ],
    },
    testItem: {
      primaryShape: 'triangle',
      sides: 3,
      dots: { blackCount: 2, whiteCount: 0 },
      fillColor: 'none',
    },
    options: [
      {
        id: 'A',
        label: 'A. Termasuk ke dalam Kelompok A',
        text: 'Gambar Uji memenuhi seluruh aturan invariant Kelompok A.',
      },
      {
        id: 'B',
        label: 'B. Termasuk ke dalam Kelompok B',
        text: 'Gambar Uji memenuhi seluruh aturan invariant Kelompok B.',
      },
      {
        id: 'C',
        label: 'C. Tidak Termasuk Kelompok A maupun B',
        text: 'Gambar Uji melanggar aturan kedua kelompok.',
      },
      {
        id: 'D',
        label: 'D. Informasi belum cukup untuk menentukan kelompok',
        text: 'Perlu data sudut atau rotasi tambahan.',
      },
    ],
    correctAnswerId: 'A',
    explanation: {
      hiddenRule:
        'Kelompok A mensyaratkan: Bangun luar bersisi GANJIL (3 atau 5) DAN memuat tepat 2 titik hitam. Kelompok B mensyaratkan: Bangun luar bersisi GENAP (4 atau 6) DAN memuat tepat 1 titik hitam.',
      summary:
        'Gambar Uji berupa segitiga (3 sisi = ganjil) dengan tepat 2 titik hitam, sehingga memenuhi aturan konjungtif Kelompok A secara sempurna.',
      evidenceAnalysis: [
        {
          title: 'Observasi Bukti Kelompok A',
          points: [
            'Segitiga (3 sisi) memuat 2 titik hitam.',
            'Segilima / Pentagon (5 sisi) memuat 2 titik hitam.',
            'Bintang segi lima (5 sudut luar) memuat 2 titik hitam.',
            'Pola umum: Sisi luar bilangan ganjil (3, 5) dan jumlah titik hitam selalu = 2.',
          ],
        },
        {
          title: 'Observasi Bukti Kelompok B',
          points: [
            'Bujursangkar (4 sisi) memuat 1 titik hitam.',
            'Segienam / Hexagon (6 sisi) memuat 1 titik hitam.',
            'Belah ketupat (4 sisi) memuat 1 titik hitam.',
            'Pola umum: Sisi luar bilangan genap (4, 6) dan jumlah titik hitam selalu = 1.',
          ],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Identifikasi Variabel Bebas',
          content:
            'Perhatikan dua atribut utama pada setiap gambar: (1) Jumlah sisi/sudut bangun luar, dan (2) Jumlah titik di dalam bangun.',
          highlight: 'Atribut = Sisi Bangun Luar & Jumlah Titik Hitam',
        },
        {
          title: 'Langkah 2: Uji Hipotesis Induktif',
          content:
            'Kelompok A: 3 sisi & 2 titik; 5 sisi & 2 titik. Hipotesis: Sisi ganjil + 2 titik hitam.\nKelompok B: 4 sisi & 1 titik; 6 sisi & 1 titik. Hipotesis: Sisi genap + 1 titik hitam.',
          highlight: 'Kelompok A: Ganjil + 2 titik | Kelompok B: Genap + 1 titik',
        },
        {
          title: 'Langkah 3: Evaluasi Gambar Uji (Test Figure)',
          content:
            'Gambar Uji adalah Segitiga (3 sisi = ganjil) dengan 2 titik hitam. Ini cocok 100% dengan aturan Kelompok A.',
          highlight: 'Jawaban yang tepat adalah A.',
        },
      ],
      distractors: [
        {
          optionId: 'B',
          reason:
            'Kelompok B memerlukan bangun bersisi genap dengan 1 titik hitam. Gambar uji memiliki sisi ganjil dan 2 titik hitam.',
          flawType: 'wrong_parity',
        },
        {
          optionId: 'C',
          reason:
            'Opsi C keliru karena gambar uji jelas memenuhi seluruh kriteria invarian kelompok A tanpa ambiguitas.',
          flawType: 'overgeneralization',
        },
        {
          optionId: 'D',
          reason:
            'Informasi yang tersedia sudah lengkap dan deterministik; rotasi atau ukuran bukan variabel yang memengaruhi aturan kelompok.',
          flawType: 'irrelevant_feature',
        },
      ],
      proTip:
        'Pola Paritas (Ganjil vs Genap) pada jumlah sisi dan elemen internal adalah salah satu pola paling sering muncul dalam tes psikometri penalaran induktif (seperti SHL / BUMN).',
    },
  },

  // ==========================================
  // SOAL 2: ODD-ONE-OUT (Mencari Yang Berbeda)
  // ==========================================
  {
    id: 'ind-02',
    title: 'Odd-One-Out: Relasi Titik Sudut/Ujung Luar Terhadap Titik Sudut/Ujung Dalam',
    family: 'odd_one_out',
    difficulty: 'sedang',
    tags: ['Odd-One-Out', 'Hubungan Relasional', 'Pengurangan Titik Sudut/Ujung'],
    prompt:
      'Di antara 5 opsi gambar berikut, empat di antaranya mengikuti aturan relasi geometris yang sama, sedangkan SATU gambar melanggar aturan tersebut (Odd-One-Out). Manakah gambar yang TIDAK mengikuti pola?',
    options: [
      {
        id: 'A',
        label: 'Opsi A',
        stimulus: {
          primaryShape: 'hexagon',
          sides: 6,
          innerShapes: [{ shape: 'square', count: 1, fill: 'gray' }],
        },
        text: 'Segienam (luar) berisi Persegi (dalam)',
      },
      {
        id: 'B',
        label: 'Opsi B',
        stimulus: {
          primaryShape: 'pentagon',
          sides: 5,
          innerShapes: [{ shape: 'triangle', count: 1, fill: 'gray' }],
        },
        text: 'Segilima (luar) berisi Segitiga (dalam)',
      },
      {
        id: 'C',
        label: 'Opsi C',
        stimulus: {
          primaryShape: 'square',
          sides: 4,
          innerShapes: [{ shape: 'line', count: 1, fill: 'black' }],
        },
        text: 'Persegi (4 titik sudut/ujung) berisi Garis Lurus (2 ujung / 2 titik sudut/ujung)',
      },
      {
        id: 'D',
        label: 'Opsi D',
        stimulus: {
          primaryShape: 'hexagon',
          sides: 6,
          innerShapes: [{ shape: 'triangle', count: 1, fill: 'gray' }],
        },
        text: 'Segienam (6 titik sudut/ujung) berisi Segitiga (3 titik sudut/ujung)',
      },
      {
        id: 'E',
        label: 'Opsi E',
        stimulus: {
          primaryShape: 'diamond',
          sides: 4,
          innerShapes: [{ shape: 'line', count: 1, fill: 'black' }],
        },
        text: 'Belah Ketupat (4 titik sudut/ujung) berisi Garis Lurus (2 ujung)',
      },
    ],
    correctAnswerId: 'D',
    explanation: {
      hiddenRule:
        'Aturan konsisten pada gambar mayoritas: Jumlah titik sudut/ujung bangun luar dikurangi jumlah titik sudut/ujung bangun dalam SELALU SAMA DENGAN 2 (Titik Sudut/Ujung Luar - Titik Sudut/Ujung Dalam = 2).',
      summary:
        'Pada Opsi D, bangun luar adalah segienam (6 titik sudut/ujung) dan bangun dalam segitiga (3 titik sudut/ujung), selisih titik sudut/ujungnya adalah 6 - 3 = 3 (seharusnya 2). Maka Opsi D adalah Odd-One-Out.',
      evidenceAnalysis: [
        {
          title: 'Perhitungan Selisih Titik Sudut/Ujung Tiap Pilihan',
          points: [
            'Opsi A: Segienam (6 titik sudut/ujung) - Persegi (4 titik sudut/ujung) = 6 - 4 = 2 (BENAR SESUAI POLA)',
            'Opsi B: Segilima (5 titik sudut/ujung) - Segitiga (3 titik sudut/ujung) = 5 - 3 = 2 (BENAR SESUAI POLA)',
            'Opsi C: Persegi (4 titik sudut/ujung) - Garis (2 ujung) = 4 - 2 = 2 (BENAR SESUAI POLA)',
            'Opsi D: Segienam (6 titik sudut/ujung) - Segitiga (3 titik sudut/ujung) = 6 - 3 = 3 (MENYIMPANG DARI POLA)',
            'Opsi E: Belah Ketupat (4 titik sudut/ujung) - Garis (2 ujung) = 4 - 2 = 2 (BENAR SESUAI POLA)',
          ],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Jangan Terkecoh Ukuran atau Warna',
          content:
            'Warna abu-abu dan hitam adalah fitur distraktor. Fokus pada hubungan kuantitatif antara bentuk luar dan bentuk dalam.',
          highlight: 'Fokus pada: Jumlah Titik Sudut/Ujung Luar vs Titik Sudut/Ujung Dalam',
        },
        {
          title: 'Langkah 2: Menemukan Relasi Aritmatika Invarian',
          content:
            'Bandingkan Opsi A (6 dan 4, selisih 2) dengan Opsi B (5 dan 3, selisih 2). Ini mengonfirmasi formula relasional: Selisih titik sudut/ujung = 2.',
          highlight: 'Rumus: Titik Sudut/Ujung_Luar - Titik Sudut/Ujung_Dalam = 2',
        },
        {
          title: 'Langkah 3: Menentukan Pelanggar Pola',
          content:
            'Opsi D memiliki segienam dan segitiga (6 - 3 = 3). Opsi D gagal memenuhi selisih 2, sehingga merupakan gambar yang berbeda.',
          highlight: 'Opsi D adalah jawaban yang benar.',
        },
      ],
      distractors: [
        {
          optionId: 'A',
          reason: 'Mengikuti aturan selisih 2 titik sudut/ujung dengan tepat (6 - 4 = 2).',
          flawType: 'incomplete_rule',
        },
        {
          optionId: 'B',
          reason: 'Mengikuti aturan selisih 2 titik sudut/ujung dengan tepat (5 - 3 = 2).',
          flawType: 'incomplete_rule',
        },
        {
          optionId: 'C',
          reason: 'Garis mewakili elemen berorde 2, selisih 4 - 2 = 2 memenuhi aturan.',
          flawType: 'incomplete_rule',
        },
        {
          optionId: 'E',
          reason: 'Belah ketupat 4 titik sudut/ujung - 2 = 2, memenuhi aturan invariant.',
          flawType: 'incomplete_rule',
        },
      ],
      proTip:
        'Saat melihat figur bersarang (nested shapes), selalu hitung selisih atau rasio jumlah titik sudut/ujung antara bangun luar dan bangun dalam.',
    },
  },

  // ==========================================
  // SOAL 3: IDENTIFIKASI ATURAN (Rule Identification)
  // ==========================================
  {
    id: 'ind-03',
    title: 'Identifikasi Aturan: Pola Penjumlahan Sudut & Elemen Silang',
    family: 'rule_identification',
    difficulty: 'sedang',
    tags: ['Identifikasi Aturan', 'Formulasi Logika', 'Hipotesis'],
    prompt:
      'Perhatikan contoh-contoh POSITIF (memenuhi aturan) dan contoh-contoh NEGATIF (melanggar aturan) berikut. Manakah formulasi kalimat aturan di bawah ini yang paling tepat menjelaskan kriteria contoh positif?',
    contextNote:
      'Contoh Positif selalu diterima oleh sistem, sedangkan Contoh Negatif selalu ditolak.',
    groupA: {
      name: 'Contoh Positif (Valid)',
      items: [
        {
          primaryShape: 'triangle',
          sides: 3,
          innerShapes: [{ shape: 'cross', count: 3, position: 'distributed' }],
        },
        {
          primaryShape: 'square',
          sides: 4,
          innerShapes: [{ shape: 'cross', count: 2, position: 'distributed' }],
        },
        {
          primaryShape: 'pentagon',
          sides: 5,
          innerShapes: [{ shape: 'cross', count: 1, position: 'distributed' }],
        },
      ],
    },
    groupB: {
      name: 'Contoh Negatif (Tidak Valid)',
      items: [
        {
          primaryShape: 'square',
          sides: 4,
          innerShapes: [{ shape: 'cross', count: 4, position: 'distributed' }],
        },
        {
          primaryShape: 'triangle',
          sides: 3,
          innerShapes: [{ shape: 'cross', count: 1, position: 'distributed' }],
        },
        {
          primaryShape: 'hexagon',
          sides: 6,
          innerShapes: [{ shape: 'cross', count: 2, position: 'distributed' }],
        },
      ],
    },
    options: [
      {
        id: 'A',
        label: 'A. Jumlah sisi bangun luar harus selalu ganjil.',
        text: 'Aturan hanya berfokus pada sifat ganjil-genap sisi bangun luar.',
      },
      {
        id: 'B',
        label: 'B. Jumlah sisi bangun luar ditambah jumlah tanda silang di dalamnya harus selalu berjumlah tepat 6.',
        text: 'Formula: (Sisi Bangun Luar + Jumlah Tanda Silang = 6).',
      },
      {
        id: 'C',
        label: 'C. Jumlah tanda silang harus selalu lebih sedikit dari jumlah sisi bangun luar.',
        text: 'Aturan ketidaksamaan (Silang < Sisi).',
      },
      {
        id: 'D',
        label: 'D. Bangun luar harus memiliki paling sedikit 4 sisi dan minimal 2 tanda silang.',
        text: 'Batasan nilai minimum sisi dan silang.',
      },
    ],
    correctAnswerId: 'B',
    explanation: {
      hiddenRule:
        'Jumlah sisi poligon luar dijumlahkan dengan banyaknya tanda silang di bagian dalam selalu bernilai KONSTAN, yaitu tepat 6 (Sisi + Silang = 6).',
      summary:
        'Pilihan B adalah satu-satunya aturan yang menjelaskan mengapa seluruh contoh positif benar (3+3=6, 4+2=6, 5+1=6) sekaligus menolak semua contoh negatif (4+4=8, 3+1=4, 6+2=8).',
      evidenceAnalysis: [
        {
          title: 'Verifikasi Contoh Positif',
          points: [
            'Segitiga (3 sisi) + 3 silang = 3 + 3 = 6 ✓',
            'Persegi (4 sisi) + 2 silang = 4 + 2 = 6 ✓',
            'Segilima (5 sisi) + 1 silang = 5 + 1 = 6 ✓',
          ],
        },
        {
          title: 'Verifikasi Contoh Negatif (Ditolak)',
          points: [
            'Persegi (4 sisi) + 4 silang = 4 + 4 = 8 (≠ 6) ✗',
            'Segitiga (3 sisi) + 1 silang = 3 + 1 = 4 (≠ 6) ✗',
            'Segienam (6 sisi) + 2 silang = 6 + 2 = 8 (≠ 6) ✗',
          ],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Gugurkan Hipotesis Tunggal',
          content:
            'Apakah sisi harus ganjil? Tidak, karena contoh positif kedua adalah Persegi (4 sisi, genap). Jadi opsi A gugur.',
          highlight: 'Opsi A Gugur',
        },
        {
          title: 'Langkah 2: Uji Hubungan Aditif / Penjumlahan',
          content:
            'Perhatikan bahwa ketika sisi bertambah (3 -> 4 -> 5), jumlah tanda silang berkurang secara seimbang (3 -> 2 -> 1). Pola kompensasi ini mencirikan jumlah konstan.',
          highlight: 'Sisi naik 1, Silang turun 1 => Jumlah Tetap 6',
        },
        {
          title: 'Langkah 3: Uji Opsi C pada Contoh Negatif',
          content:
            'Pada opsi C: "Silang < Sisi". Pada contoh negatif kedua (Segitiga 3 sisi, 1 silang), silang (1) < sisi (3), tetapi contoh ini DITOLAK. Artinya hipotesis C salah karena menerima contoh negatif.',
          highlight: 'Opsi C tidak mampu mendiskualifikasi contoh negatif.',
        },
      ],
      distractors: [
        {
          optionId: 'A',
          reason:
            'Gugur karena persegi (4 sisi = genap) terdapat pada contoh positif yang sah.',
          flawType: 'overgeneralization',
        },
        {
          optionId: 'C',
          reason:
            'Gugur karena segitiga dengan 1 silang (1 < 3) masuk dalam contoh negatif, membuktikan aturan bukan sekadar "silang < sisi".',
          flawType: 'incomplete_rule',
        },
        {
          optionId: 'D',
          reason:
            'Gugur karena segitiga (3 sisi) ada pada contoh positif, bertentangan dengan klaim minimal 4 sisi.',
          flawType: 'overgeneralization',
        },
      ],
      proTip:
        'Ketika satu variabel meningkat dan variabel lain menurun dengan laju yang sama, selalu periksa apakah jumlah kedua variabel bernilai konstan (Konstanta Jumlah).',
    },
  },

  // ==========================================
  // SOAL 4: ANALOGI POLA (A : B :: C : D)
  // ==========================================
  {
    id: 'ind-04',
    title: 'Analogi Pola: Transformasi Sisi & Pembalikan Warna',
    family: 'analogy',
    difficulty: 'sedang',
    tags: ['Analogi', 'Transformasi Sisi', 'Inversi Warna'],
    prompt:
      'Terdapat hubungan transformasi logis antara Gambar 1 dan Gambar 2. Terapkan aturan induktif yang sama pada Gambar 3 untuk menemukan Gambar 4 di antara opsi pilihan ganda berikut!',
    contextNote: 'Aturan: Gambar 1 berubah menjadi Gambar 2 = Gambar 3 berubah menjadi (?)',
    analogyItems: {
      a: {
        primaryShape: 'triangle',
        sides: 3,
        dots: { blackCount: 1, whiteCount: 0 },
        fillColor: 'none',
      },
      b: {
        primaryShape: 'square',
        sides: 4,
        dots: { blackCount: 0, whiteCount: 1 },
        fillColor: 'light',
      },
      c: {
        primaryShape: 'pentagon',
        sides: 5,
        dots: { blackCount: 2, whiteCount: 0 },
        fillColor: 'none',
      },
    },
    options: [
      {
        id: 'A',
        label: 'Opsi A',
        stimulus: {
          primaryShape: 'hexagon',
          sides: 6,
          dots: { blackCount: 0, whiteCount: 2 },
          fillColor: 'light',
        },
        text: 'Segienam arsir lembut dengan 2 titik putih',
      },
      {
        id: 'B',
        label: 'Opsi B',
        stimulus: {
          primaryShape: 'square',
          sides: 4,
          dots: { blackCount: 0, whiteCount: 2 },
          fillColor: 'light',
        },
        text: 'Persegi arsir lembut dengan 2 titik putih',
      },
      {
        id: 'C',
        label: 'Opsi C',
        stimulus: {
          primaryShape: 'hexagon',
          sides: 6,
          dots: { blackCount: 2, whiteCount: 0 },
          fillColor: 'none',
        },
        text: 'Segienam tanpa arsir dengan 2 titik hitam',
      },
      {
        id: 'D',
        label: 'Opsi D',
        stimulus: {
          primaryShape: 'star',
          sides: 5,
          dots: { blackCount: 0, whiteCount: 1 },
          fillColor: 'light',
        },
        text: 'Bintang 5 sudut dengan 1 titik putih',
      },
    ],
    correctAnswerId: 'A',
    explanation: {
      hiddenRule:
        'Transformasi memiliki 3 aturan simultan: (1) Jumlah sisi poligon luar bertambah 1 (+1 sisi), (2) Warna titik mengalami inversi dari HITAM menjadi PUTIH tanpa mengubah jumlah titik, dan (3) Latar belakang bangun berubah dari transparan menjadi arsir lembut.',
      summary:
        'Gambar 3 adalah Segilima (5 sisi) dengan 2 titik hitam. Setelah ditransformasikan: Sisi menjadi 5 + 1 = 6 (Segienam), titik berubah menjadi 2 titik putih, dan bangun diberi arsir lembut. Bentuk yang tepat adalah Opsi A.',
      evidenceAnalysis: [
        {
          title: 'Pemetaan Transformasi Gambar 1 -> Gambar 2',
          points: [
            'Sisi: Segitiga (3 sisi) -> Persegi (4 sisi) [Aturan: Sisi + 1]',
            'Titik: 1 titik hitam -> 1 titik putih [Aturan: Inversi Warna Titik]',
            'Latar: Tanpa warna -> Arsir lembut [Aturan: Aktifkan Latar]',
          ],
        },
        {
          title: 'Aplikasi Transformasi pada Gambar 3',
          points: [
            'Gambar 3: Segilima (5 sisi) + 2 titik hitam + tanpa arsir.',
            'Hasil yang diharapkan: Segienam (6 sisi) + 2 titik putih + arsir lembut.',
          ],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Dekomposisi Operasi Logis',
          content:
            'Pisahkan elemen luar (bentuk bangun), isi titik (jumlah dan warna), serta atribut shading.',
          highlight: 'Sisi + 1, Hitam -> Putih, Latar -> Berisi',
        },
        {
          title: 'Langkah 2: Menghitung Target Baru',
          content:
            'Bangun asal bersisi 5, maka bangun target harus bersisi 6 (Segienam / Hexagon). Ini otomatis menggugurkan Opsi B dan D.',
          highlight: 'Opsi B & D Gugur',
        },
        {
          title: 'Langkah 3: Memeriksa Warna Titik dan Latar',
          content:
            'Opsi C mempertahankan titik hitam dan tanpa latar arsir (tidak ada transformasi). Hanya Opsi A yang memenuhi inversi warna titik dan arsir latar.',
          highlight: 'Opsi A Memenuhi Semua Kriteria',
        },
      ],
      distractors: [
        {
          optionId: 'B',
          reason:
            'Sisi bangun luar berkurang menjadi 4 (seharusnya bertambah menjadi 6).',
          flawType: 'inverted_relation',
        },
        {
          optionId: 'C',
          reason:
            'Titik tetap hitam dan tidak memiliki latar arsir lembut (tidak menjalankan aturan inversi warna).',
          flawType: 'incomplete_rule',
        },
        {
          optionId: 'D',
          reason:
            'Jumlah sisi tidak bertambah menjadi 6 dan jumlah titik berkurang dari 2 menjadi 1.',
          flawType: 'wrong_parity',
        },
      ],
      proTip:
        'Dalam analogi bangun (A:B :: C:D), tuliskan perubahan tiap komponen dalam rumus singkat: Sisi (+1), Titik (Warna Balik, Jumlah Tetap), Latar (On). Lalu eliminasi opsi satu per satu.',
    },
  },

  // ==========================================
  // SOAL 5: KLASIFIKASI KELOMPOK (Arsir Sektor Lingkaran)
  // ==========================================
  {
    id: 'ind-05',
    title: 'Klasifikasi Kelompok: Posisi Relatif Sektor Terarsir',
    family: 'group_classification',
    difficulty: 'sedang',
    tags: ['Klasifikasi Kelompok', 'Sektor Lingkaran', 'Jarak Sudut'],
    prompt:
      'Perhatikan lingkaran yang terbagi menjadi 8 sektor pada Kelompok A dan Kelompok B. Tentukan ke kelompok mana Gambar Uji (Test Figure) seharusnya digolongkan!',
    contextNote:
      'Kedua kelompok sama-sama memiliki lingkaran 8 sektor dengan 2 sektor terarsir gelap, namun dengan hubungan spasial yang berbeda.',
    groupA: {
      name: 'Kelompok A',
      items: [
        {
          primaryShape: 'circle',
          segments: { total: 8, shadedIndices: [0, 1] }, // Bersebelahan langsung (adjacent)
        },
        {
          primaryShape: 'circle',
          segments: { total: 8, shadedIndices: [3, 4] }, // Bersebelahan langsung
        },
        {
          primaryShape: 'circle',
          segments: { total: 8, shadedIndices: [6, 7] }, // Bersebelahan langsung
        },
      ],
    },
    groupB: {
      name: 'Kelompok B',
      items: [
        {
          primaryShape: 'circle',
          segments: { total: 8, shadedIndices: [0, 2] }, // Terpisah tepat 1 sektor kosong
        },
        {
          primaryShape: 'circle',
          segments: { total: 8, shadedIndices: [3, 5] }, // Terpisah tepat 1 sektor kosong
        },
        {
          primaryShape: 'circle',
          segments: { total: 8, shadedIndices: [5, 7] }, // Terpisah tepat 1 sektor kosong
        },
      ],
    },
    testItem: {
      primaryShape: 'circle',
      segments: { total: 8, shadedIndices: [2, 4] }, // Terpisah 1 sektor kosong (sektor 3)
    },
    options: [
      {
        id: 'A',
        label: 'A. Termasuk ke dalam Kelompok A',
        text: 'Kedua sektor terarsir memiliki hubungan sudut berdekatan seperti Kelompok A.',
      },
      {
        id: 'B',
        label: 'B. Termasuk ke dalam Kelompok B',
        text: 'Kedua sektor terarsir dipisahkan oleh tepat 1 sektor putih (kosong), identik dengan aturan Kelompok B.',
      },
      {
        id: 'C',
        label: 'C. Tidak termasuk keduanya (Kelompok Lain)',
        text: 'Posisi sektor tidak cocok dengan kelompok manapun.',
      },
      {
        id: 'D',
        label: 'D. Termasuk ke dalam kedua kelompok sekaligus',
        text: 'Kedua aturan tumpang tindih.',
      },
    ],
    correctAnswerId: 'B',
    explanation: {
      hiddenRule:
        'Kelompok A: Tepat 2 sektor terarsir yang saling BERDAMPINGAN LANGSUNG (sudut pemisah 0 sektor / 45° bertetangga). Kelompok B: Tepat 2 sektor terarsir yang TERPISAH TEPAT SATU SEKTOR KOSONG (jarak sudut 90°).',
      summary:
        'Gambar Uji mengarsir sektor ke-2 dan ke-4, dengan sektor ke-3 berada di antaranya sebagai pemisah tunggal. Hubungan ini tepat memenuhi aturan spesifik Kelompok B.',
      evidenceAnalysis: [
        {
          title: 'Karakteristik Spasial Kelompok A',
          points: [
            'Semua contoh di Kelompok A memiliki 2 sektor arsir berdampingan tanpa celah putih.',
          ],
        },
        {
          title: 'Karakteristik Spasial Kelompok B',
          points: [
            'Semua contoh di Kelompok B memiliki jarak persis 1 sektor putih di antara kedua sektor hitam.',
          ],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Menghitung Jumlah & Jarak Sektor',
          content:
            'Semua figur memiliki 8 bagian dan 2 bagian gelap. Jumlah bagian gelap bukan pembeda, jadi pembedanya adalah posisi spasial relatif.',
          highlight: 'Fokus pada jarak/celah antar sektor gelap',
        },
        {
          title: 'Langkah 2: Mengukur Celah pada Gambar Uji',
          content:
            'Pada gambar uji, sektor gelap berada di posisi jam 3 dan jam 6 (terdapat 1 celah di jam 4.30). Ini membuktikan terdapat celah 1 sektor putih.',
          highlight: 'Celah = Tepat 1 sektor putih => Kelompok B',
        },
        {
          title: 'Langkah 3: Menentukan Kesimpulan',
          content:
            'Karena memenuhi kriteria keterpisahan 1 sektor putih, Gambar Uji tergolong ke dalam Kelompok B.',
          highlight: 'Jawaban yang tepat adalah B.',
        },
      ],
      distractors: [
        {
          optionId: 'A',
          reason:
            'Kelompok A menuntut kedua sektor menempel berdampingan tanpa celah pemisah.',
          flawType: 'incomplete_rule',
        },
        {
          optionId: 'C',
          reason:
            'Gambar uji memiliki struktur yang sepenuhnya konsisten dengan Kelompok B.',
          flawType: 'overgeneralization',
        },
        {
          optionId: 'D',
          reason:
            'Kedua kelompok bersifat mutually exclusive (saling lepas); sebuah gambar tidak bisa berdampingan sekaligus berjarak 1 sektor.',
          flawType: 'overgeneralization',
        },
      ],
      proTip:
        'Pada soal sektor/pie chart berulang, hitung selisih indeks antar potongan (misal indeks 0 dan 1 selisih 1 = menempel, indeks 0 dan 2 selisih 2 = ada 1 celah).',
    },
  },

  // ==========================================
  // SOAL 6: KELANJUTAN POLA INDUKTIF (Sequence Induction)
  // ==========================================
  {
    id: 'ind-06',
    title: 'Kelanjutan Pola: Pertambahan Titik & Rotasi Poligon',
    family: 'sequence_induction',
    difficulty: 'sulit',
    tags: ['Seri Gambar', 'Rotasi Bertingkat', 'Progresi Deret'],
    prompt:
      'Perhatikan urutan 4 gambar berurutan berikut. Tentukan gambar ke-5 yang paling tepat untuk melanjutkan rangkaian logika induktif tersebut!',
    contextStimuli: [
      {
        primaryShape: 'square',
        sides: 4,
        rotation: 0,
        dots: { blackCount: 1, whiteCount: 0 },
        textLabel: '1',
      },
      {
        primaryShape: 'square',
        sides: 4,
        rotation: 45,
        dots: { blackCount: 2, whiteCount: 0 },
        textLabel: '2',
      },
      {
        primaryShape: 'square',
        sides: 4,
        rotation: 90,
        dots: { blackCount: 3, whiteCount: 0 },
        textLabel: '3',
      },
      {
        primaryShape: 'square',
        sides: 4,
        rotation: 135,
        dots: { blackCount: 4, whiteCount: 0 },
        textLabel: '4',
      },
    ],
    options: [
      {
        id: 'A',
        label: 'Opsi A',
        stimulus: {
          primaryShape: 'square',
          sides: 4,
          rotation: 180,
          dots: { blackCount: 5, whiteCount: 0 },
        },
        text: 'Persegi rotasi 180° (tegak lurus) dengan 5 titik hitam',
      },
      {
        id: 'B',
        label: 'Opsi B',
        stimulus: {
          primaryShape: 'diamond',
          sides: 4,
          rotation: 45,
          dots: { blackCount: 4, whiteCount: 0 },
        },
        text: 'Persegi miring 45° dengan 4 titik hitam',
      },
      {
        id: 'C',
        label: 'Opsi C',
        stimulus: {
          primaryShape: 'square',
          sides: 4,
          rotation: 180,
          dots: { blackCount: 4, whiteCount: 1 },
        },
        text: 'Persegi rotasi 180° dengan 4 titik hitam dan 1 titik putih',
      },
      {
        id: 'D',
        label: 'Opsi D',
        stimulus: {
          primaryShape: 'pentagon',
          sides: 5,
          rotation: 180,
          dots: { blackCount: 5, whiteCount: 0 },
        },
        text: 'Segilima dengan 5 titik hitam',
      },
    ],
    correctAnswerId: 'A',
    explanation: {
      hiddenRule:
        'Terdapat 2 aturan simultan yang berjalan secara deret berurutan: (1) Bangun persegi berotasi searah jarum jam sebesar +45° pada tiap langkah berikutnya (0° -> 45° -> 90° -> 135° -> 180°), dan (2) Titik hitam di dalam bertambah +1 titik secara konstan (1 -> 2 -> 3 -> 4 -> 5 titik hitam).',
      summary:
        'Gambar ke-5 harus memiliki sudut rotasi 135° + 45° = 180° dan memuat 4 + 1 = 5 titik hitam. Opsi A memenuhi kedua aturan tersebut dengan tepat.',
      evidenceAnalysis: [
        {
          title: 'Dekomposisi Variabel Deret',
          points: [
            'Langkah 1: Sudut 0°, Titik = 1',
            'Langkah 2: Sudut 45°, Titik = 2 (+45° rotasi, +1 titik)',
            'Langkah 3: Sudut 90°, Titik = 3 (+45° rotasi, +1 titik)',
            'Langkah 4: Sudut 135°, Titik = 4 (+45° rotasi, +1 titik)',
            'Langkah 5 (Target): Sudut 135° + 45° = 180°, Titik = 4 + 1 = 5.',
          ],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Periksa Jumlah Titik Hitam',
          content:
            'Deret titik hitam adalah 1, 2, 3, 4. Maka angka selanjutnya wajib 5 titik hitam. Ini mengeliminasi Opsi B (4 titik) dan Opsi C (4 hitam + 1 putih).',
          highlight: 'Target Titik = Tepat 5 titik hitam',
        },
        {
          title: 'Langkah 2: Periksa Bentuk Bangun Pokok',
          content:
            'Bangun pokok tetap persegi (4 sisi) di seluruh 4 langkah awal. Tidak ada aturan pertambahan sisi poligon, sehingga Opsi D (segilima) tereliminasi.',
          highlight: 'Bangun tetap persegi, bukan segilima.',
        },
        {
          title: 'Langkah 3: Konfirmasi Rotasi Akhir',
          content:
            'Rotasi 180° pada persegi mengembalikan orientasi tegak lurus persegi dengan 5 titik di dalamnya.',
          highlight: 'Opsi A benar.',
        },
      ],
      distractors: [
        {
          optionId: 'B',
          reason: 'Jumlah titik tidak bertambah menjadi 5 dan rotasinya salah.',
          flawType: 'incomplete_rule',
        },
        {
          optionId: 'C',
          reason:
            'Memperkenalkan titik putih yang tidak pernah ada dalam rangkaian pola (fitur asing/distraktor).',
          flawType: 'irrelevant_feature',
        },
        {
          optionId: 'D',
          reason:
            'Mengubah bangun dasar menjadi segilima padahal bentuk dasar konstan persegi.',
          flawType: 'overgeneralization',
        },
      ],
      proTip:
        'Saat mengerjakan soal deret induktif, buat tabel mental cepat untuk setiap variabel: Kolom 1 = Deret Bentuk, Kolom 2 = Deret Sudut, Kolom 3 = Deret Elemen Dalam.',
    },
  },

  // ==========================================
  // SOAL 7: ODD-ONE-OUT (Paritas Titik vs Garis)
  // ==========================================
  {
    id: 'ind-07',
    title: 'Odd-One-Out: Hubungan Titik Hitam Terhadap Garis Pembagi',
    family: 'odd_one_out',
    difficulty: 'mudah',
    tags: ['Odd-One-Out', 'Pola Pembagian', 'Paritas'],
    prompt:
      'Dari 5 figur berikut, empat di antaranya mematuhi aturan keteraturan tertentu mengenai titik hitam dan garis pembagi, sedangkan satu di antaranya ganjil (berbeda). Temukan gambar yang menyimpang!',
    options: [
      {
        id: 'A',
        label: 'Opsi A',
        stimulus: {
          primaryShape: 'circle',
          innerShapes: [{ shape: 'line', count: 1 }],
          dots: { blackCount: 2, whiteCount: 0 },
        },
        text: 'Lingkaran dengan 1 garis pembagi dan 2 titik hitam',
      },
      {
        id: 'B',
        label: 'Opsi B',
        stimulus: {
          primaryShape: 'square',
          innerShapes: [{ shape: 'line', count: 1 }],
          dots: { blackCount: 2, whiteCount: 0 },
        },
        text: 'Persegi dengan 1 garis pembagi dan 2 titik hitam',
      },
      {
        id: 'C',
        label: 'Opsi C',
        stimulus: {
          primaryShape: 'triangle',
          innerShapes: [{ shape: 'line', count: 1 }],
          dots: { blackCount: 2, whiteCount: 0 },
        },
        text: 'Segitiga dengan 1 garis pembagi dan 2 titik hitam',
      },
      {
        id: 'D',
        label: 'Opsi D',
        stimulus: {
          primaryShape: 'diamond',
          innerShapes: [{ shape: 'line', count: 1 }],
          dots: { blackCount: 3, whiteCount: 0 },
        },
        text: 'Belah Ketupat dengan 1 garis pembagi dan 3 titik hitam',
      },
      {
        id: 'E',
        label: 'Opsi E',
        stimulus: {
          primaryShape: 'hexagon',
          innerShapes: [{ shape: 'line', count: 1 }],
          dots: { blackCount: 2, whiteCount: 0 },
        },
        text: 'Segienam dengan 1 garis pembagi dan 2 titik hitam',
      },
    ],
    correctAnswerId: 'D',
    explanation: {
      hiddenRule:
        'Pada seluruh gambar pola, 1 garis pembagi membagi bangun menjadi 2 area, dan terdapat TEPAT 2 TITIK HITAM (1 titik pada masing-masing sisi garis). Total titik hitam selalu genap (= 2).',
      summary:
        'Opsi D memiliki 3 titik hitam (bilangan ganjil) yang melanggar aturan paritas titik hitam konstan (= 2). Maka Opsi D adalah Odd-One-Out.',
      evidenceAnalysis: [
        {
          title: 'Inspeksi Titik Hitam Tiap Opsi',
          points: [
            'Opsi A: 2 titik hitam (Genap)',
            'Opsi B: 2 titik hitam (Genap)',
            'Opsi C: 2 titik hitam (Genap)',
            'Opsi D: 3 titik hitam (Ganjil - Menyimpang)',
            'Opsi E: 2 titik hitam (Genap)',
          ],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Identifikasi Fitur Relevan vs Irrelevan',
          content:
            'Bentuk bangun luar berbeda-beda (lingkaran, persegi, segitiga, segienam). Ini menandakan bentuk luar adalah fitur pengecoh/distraktor.',
          highlight: 'Bentuk luar bervariasi = jangan jadikan patokan utama.',
        },
        {
          title: 'Langkah 2: Amati Elemen Konstan',
          content:
            'Semua opsi memiliki tepat 1 garis pembagi. Namun perhatikan jumlah titik hitam: A(2), B(2), C(2), D(3), E(2).',
          highlight: 'Hanya D yang memiliki 3 titik hitam.',
        },
        {
          title: 'Langkah 3: Kesimpulan',
          content:
            'Opsi D memuat 3 titik hitam, sehingga menyimpang dari aturan mayoritas.',
          highlight: 'Opsi D adalah jawaban benar.',
        },
      ],
      distractors: [
        {
          optionId: 'A',
          reason: 'Memiliki tepat 2 titik hitam, sesuai aturan mayoritas.',
          flawType: 'incomplete_rule',
        },
        {
          optionId: 'B',
          reason: 'Memiliki tepat 2 titik hitam, sesuai aturan mayoritas.',
          flawType: 'incomplete_rule',
        },
        {
          optionId: 'C',
          reason: 'Memiliki tepat 2 titik hitam, sesuai aturan mayoritas.',
          flawType: 'incomplete_rule',
        },
        {
          optionId: 'E',
          reason: 'Memiliki tepat 2 titik hitam, sesuai aturan mayoritas.',
          flawType: 'incomplete_rule',
        },
      ],
      proTip:
        'Jika bentuk luar semuanya berbeda-beda pada soal Odd-One-Out, aturan hampir dipastikan berada pada elemen internal (jumlah titik, tipe garis, atau rasio simetri).',
    },
  },

  // ==========================================
  // SOAL 8: IDENTIFIKASI ATURAN (Rasio Luas / Segmen)
  // ==========================================
  {
    id: 'ind-08',
    title: 'Identifikasi Aturan: Proporsi Bagian Terarsir',
    family: 'rule_identification',
    difficulty: 'sulit',
    tags: ['Identifikasi Aturan', 'Fraksi', 'Proporsi 50%'],
    prompt:
      'Perhatikan kumpulan figur di bawah ini yang semuanya tergolong ke dalam "Kategori Valid". Analisislah aturan induktif yang mendasarinya dan pilih pernyataan yang paling akurat!',
    contextStimuli: [
      {
        primaryShape: 'circle',
        segments: { total: 4, shadedIndices: [0, 2] },
        textLabel: 'Figur 1 (2/4 arsir)',
      },
      {
        primaryShape: 'circle',
        segments: { total: 6, shadedIndices: [0, 2, 4] },
        textLabel: 'Figur 2 (3/6 arsir)',
      },
      {
        primaryShape: 'circle',
        segments: { total: 8, shadedIndices: [0, 1, 4, 5] },
        textLabel: 'Figur 3 (4/8 arsir)',
      },
      {
        primaryShape: 'square',
        segments: { total: 4, shadedIndices: [1, 3] },
        textLabel: 'Figur 4 (2/4 arsir)',
      },
    ],
    options: [
      {
        id: 'A',
        label: 'A. Setiap figur harus memiliki tepat 4 sektor pembagi.',
        text: 'Membatasi jumlah potongan menjadi 4.',
      },
      {
        id: 'B',
        label: 'B. Rasio area atau jumlah sektor yang terarsir selalu tepat 50% (setengah) dari total seluruh sektor.',
        text: 'Formula: (Sektor Gelap / Total Sektor) = 1/2.',
      },
      {
        id: 'C',
        label: 'C. Bagian yang terarsir harus selalu berselang-seling (checkerboard pattern).',
        text: 'Aturan posisi alternating.',
      },
      {
        id: 'D',
        label: 'D. Bangun yang digunakan wajib berupa lingkaran utuh.',
        text: 'Membatasi bentuk menjadi hanya lingkaran.',
      },
    ],
    correctAnswerId: 'B',
    explanation: {
      hiddenRule:
        'Pada setiap figur valid, proporsi bagian terarsir selalu tepat 50% (1/2) dari total jumlah pembagian bidang bangun tersebut (2/4 = 1/2, 3/6 = 1/2, 4/8 = 1/2).',
      summary:
        'Pernyataan B paling tepat karena menangkap invariant matematika sejati: luas/jumlah bagian hitam selalu persis 50% dari keseluruhan figur, tanpa memedulikan total pembagian (4, 6, atau 8 sektor).',
      evidenceAnalysis: [
        {
          title: 'Pemeriksaan Rasio Pecahan Setiap Contoh',
          points: [
            'Figur 1: 2 sektor hitam dari 4 sektor = 2/4 = 50%',
            'Figur 2: 3 sektor hitam dari 6 sektor = 3/6 = 50%',
            'Figur 3: 4 sektor hitam dari 8 sektor = 4/8 = 50%',
            'Figur 4: 2 sektor hitam dari 4 sektor persegi = 2/4 = 50%',
          ],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Eliminasi Batasan Bentuk & Sektor Tunggal',
          content:
            'Opsi A salah karena Figur 2 memiliki 6 sektor dan Figur 3 memiliki 8 sektor. Opsi D salah karena Figur 4 adalah persegi.',
          highlight: 'Opsi A & D Gugur',
        },
        {
          title: 'Langkah 2: Periksa Pola Posisi (Alternating vs Blok)',
          content:
            'Pada Figur 3, sektor 0 dan 1 terarsir bersamaan (blok 2 sektor berdampingan), membuktikan bahwa pola arsir TIDAK wajib berselang-seling secara ketat.',
          highlight: 'Opsi C Gugur',
        },
        {
          title: 'Langkah 3: Konfirmasi Aturan Rasio 50%',
          content:
            'Satu-satunya aturan invarian yang konsisten pada semua figur adalah rasio 1/2 atau 50% bidang terarsir.',
          highlight: 'Pilihan B adalah jawaban yang benar.',
        },
      ],
      distractors: [
        {
          optionId: 'A',
          reason: 'Bertentangan dengan Figur 2 (6 sektor) dan Figur 3 (8 sektor).',
          flawType: 'overgeneralization',
        },
        {
          optionId: 'C',
          reason: 'Figur 3 memiliki 2 sektor hitam bersebelahan (tidak berselang-seling).',
          flawType: 'incomplete_rule',
        },
        {
          optionId: 'D',
          reason: 'Figur 4 adalah persegi, membuktikan bangun tidak harus lingkaran.',
          flawType: 'overgeneralization',
        },
      ],
      proTip:
        'Kapanpun Anda melihat sektor terarsir dengan jumlah pembagi berbeda (4, 6, 8, 10), selalu hitung persentase pecahan: 2/4 = 3/6 = 4/8 = 50%.',
    },
  },

  // ==========================================
  // SOAL 9: ANALOGI POLA (Rotasi & Inversi Titik)
  // ==========================================
  {
    id: 'ind-09',
    title: 'Analogi Pola: Rotasi 90° & Perpindahan Elemen Titik',
    family: 'analogy',
    difficulty: 'mudah',
    tags: ['Analogi', 'Rotasi 90°', 'Penataan Spasial'],
    prompt:
      'Perhatikan bagaimana Gambar A bertransformasi menjadi Gambar B. Terapkan prinsip induksi yang sama dari Gambar C untuk memilih Gambar D yang sesuai!',
    contextNote: 'Aturan perubahan Gambar A ke B wajib identik dengan Gambar C ke D.',
    analogyItems: {
      a: {
        primaryShape: 'triangle',
        sides: 3,
        rotation: 0,
        innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }],
      },
      b: {
        primaryShape: 'triangle',
        sides: 3,
        rotation: 90,
        innerShapes: [{ shape: 'dot', count: 2, fill: 'black' }],
      },
      c: {
        primaryShape: 'square',
        sides: 4,
        rotation: 0,
        innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }],
      },
    },
    options: [
      {
        id: 'A',
        label: 'Opsi A',
        stimulus: {
          primaryShape: 'square',
          sides: 4,
          rotation: 90,
          innerShapes: [{ shape: 'dot', count: 2, fill: 'black' }],
        },
        text: 'Persegi berotasi 90° dengan 2 titik hitam di dalamnya',
      },
      {
        id: 'B',
        label: 'Opsi B',
        stimulus: {
          primaryShape: 'square',
          sides: 4,
          rotation: 0,
          innerShapes: [{ shape: 'dot', count: 2, fill: 'black' }],
        },
        text: 'Persegi tanpa rotasi (0°) dengan 2 titik hitam',
      },
      {
        id: 'C',
        label: 'Opsi C',
        stimulus: {
          primaryShape: 'pentagon',
          sides: 5,
          rotation: 90,
          innerShapes: [{ shape: 'dot', count: 2, fill: 'black' }],
        },
        text: 'Segilima berotasi 90° dengan 2 titik hitam',
      },
      {
        id: 'D',
        label: 'Opsi D',
        stimulus: {
          primaryShape: 'square',
          sides: 4,
          rotation: 90,
          innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }],
        },
        text: 'Persegi berotasi 90° dengan 1 titik hitam',
      },
    ],
    correctAnswerId: 'A',
    explanation: {
      hiddenRule:
        'Transformasi dari A ke B terdiri atas dua operasi: (1) Bangun utama diputar searah jarum jam sebesar 90°, dan (2) Jumlah titik hitam di dalam bertambah satu (+1 titik hitam). Bentuk bangun dasar TIDAK berubah.',
      summary:
        'Gambar C adalah persegi (0°) dengan 1 titik. Setelah diputar 90° dan ditambah 1 titik hitam (total 2 titik), hasilnya adalah Opsi A.',
      evidenceAnalysis: [
        {
          title: 'Pengamatan Pasangan A -> B',
          points: [
            'Segitiga ujung atas (0°) berputar menjadi segitiga ujung kanan (90°)',
            'Titik bertambah dari 1 menjadi 2',
          ],
        },
        {
          title: 'Aplikasi pada Pasangan C -> D',
          points: [
            'Persegi (0°) diputar 90° (tetap persegi terorientasi 90°)',
            'Titik bertambah dari 1 menjadi 2',
          ],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Cek Perubahan Titik',
          content: 'Titik bertambah dari 1 ke 2. Opsi D gugur karena hanya punya 1 titik.',
          highlight: 'Opsi D Gugur',
        },
        {
          title: 'Langkah 2: Cek Bentuk Dasar',
          content: 'Bentuk dasar tidak berubah menjadi segilima, jadi Opsi C gugur.',
          highlight: 'Opsi C Gugur',
        },
        {
          title: 'Langkah 3: Cek Operasi Rotasi',
          content: 'Bangun harus mengalami rotasi 90°. Opsi B tidak mengalami rotasi.',
          highlight: 'Opsi A Memenuhi Semua Aturan',
        },
      ],
      distractors: [
        {
          optionId: 'B',
          reason: 'Lupa menerapkan rotasi 90° pada bangun utama.',
          flawType: 'incomplete_rule',
        },
        {
          optionId: 'C',
          reason: 'Menambah jumlah sisi bangun secara tidak perlu.',
          flawType: 'irrelevant_feature',
        },
        {
          optionId: 'D',
          reason: 'Lupa menambah jumlah titik hitam dari 1 menjadi 2.',
          flawType: 'incomplete_rule',
        },
      ],
      proTip:
        'Selalu cek status rotasi dan jumlah elemen secara terpisah sebelum memilih opsi.',
    },
  },

  // ==========================================
  // SOAL 10: KLASIFIKASI KELOMPOK (Bintang & Titik Pusat)
  // ==========================================
  {
    id: 'ind-10',
    title: 'Klasifikasi Kelompok: Distribusi Titik Pusat vs Tepi',
    family: 'group_classification',
    difficulty: 'mudah',
    tags: ['Klasifikasi', 'Posisi Spasial', 'Konsentris'],
    prompt:
      'Perhatikan contoh pada Kelompok A dan Kelompok B. Masuk ke dalam kelompok manakah Gambar Uji (Test Figure)?',
    contextNote:
      'Fokus pada posisi penempatan elemen lingkaran terhadap titik pusat bangun luar.',
    groupA: {
      name: 'Kelompok A',
      items: [
        {
          primaryShape: 'circle',
          innerShapes: [{ shape: 'dot', count: 1, fill: 'black', position: 'center' }],
        },
        {
          primaryShape: 'square',
          innerShapes: [{ shape: 'dot', count: 1, fill: 'black', position: 'center' }],
        },
        {
          primaryShape: 'triangle',
          innerShapes: [{ shape: 'dot', count: 1, fill: 'black', position: 'center' }],
        },
      ],
    },
    groupB: {
      name: 'Kelompok B',
      items: [
        {
          primaryShape: 'circle',
          innerShapes: [{ shape: 'dot', count: 3, fill: 'black', position: 'distributed' }],
        },
        {
          primaryShape: 'square',
          innerShapes: [{ shape: 'dot', count: 3, fill: 'black', position: 'distributed' }],
        },
        {
          primaryShape: 'triangle',
          innerShapes: [{ shape: 'dot', count: 3, fill: 'black', position: 'distributed' }],
        },
      ],
    },
    testItem: {
      primaryShape: 'pentagon',
      innerShapes: [{ shape: 'dot', count: 1, fill: 'black', position: 'center' }],
    },
    options: [
      {
        id: 'A',
        label: 'A. Termasuk Kelompok A',
        text: 'Memiliki tepat 1 titik hitam konsentris di pusat bangun.',
      },
      {
        id: 'B',
        label: 'B. Termasuk Kelompok B',
        text: 'Memiliki sebaran titik jamak seperti Kelompok B.',
      },
      {
        id: 'C',
        label: 'C. Tidak Termasuk Keduanya',
        text: 'Karena segilima tidak ada di contoh kelompok manapun.',
      },
      {
        id: 'D',
        label: 'D. Data tidak memadai',
        text: 'Tidak ada aturan yang konsisten.',
      },
    ],
    correctAnswerId: 'A',
    explanation: {
      hiddenRule:
        'Kelompok A selalu memiliki TEPAT 1 TITIK HITAM DI PUSAT (titik tunggal konsentris). Kelompok B selalu memiliki 3 TITIK HITAM YANG TERDISTRIBUSI.',
      summary:
        'Gambar Uji memiliki tepat 1 titik hitam di pusat segilima. Meskipun bangun luar segilima belum ada pada contoh, aturan induktif beroperasi pada jumlah dan posisi titik di pusat.',
      evidenceAnalysis: [
        {
          title: 'Karakteristik Kelompok A',
          points: ['Tepat 1 titik hitam tepat di tengah-tengah (pusat).'],
        },
        {
          title: 'Karakteristik Kelompok B',
          points: ['Tepat 3 titik hitam tersebar berderet.'],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Menilai Relevansi Bangun Luar',
          content:
            'Di kedua kelompok terdapat lingkaran, persegi, dan segitiga. Ini membuktikan bentuk bangun luar adalah variabel pengalih (distraktor).',
          highlight: 'Bentuk bangun luar bebas / tidak mengikat.',
        },
        {
          title: 'Langkah 2: Menilai Elemen Internal',
          content:
            'Kelompok A: selalu 1 titik di pusat. Kelompok B: selalu 3 titik tersebar. Gambar uji memiliki 1 titik di pusat.',
          highlight: 'Gambar uji = 1 titik di pusat => Kelompok A',
        },
      ],
      distractors: [
        {
          optionId: 'B',
          reason: 'Gambar uji tidak memuat 3 titik tersebar.',
          flawType: 'incomplete_rule',
        },
        {
          optionId: 'C',
          reason:
            'Pola induktif mengabstraksi sifat umum, bukan mencocokkan bentuk persis (shape overfitting trap).',
          flawType: 'overgeneralization',
        },
        {
          optionId: 'D',
          reason: 'Aturan sepenuhnya deterministik dan jelas.',
          flawType: 'irrelevant_feature',
        },
      ],
      proTip:
        'Hati-hati terhadap jebakan Overfitting (mengira bentuk bangun luar harus sama persis). Penalaran induktif justru menuntut kita mengabstraksi aturan independen dari fitur permukaan.',
    },
  },
];

export const QUESTIONS: InductiveQuestion[] = completeQuestionBank(REFERENCE_QUESTIONS);
