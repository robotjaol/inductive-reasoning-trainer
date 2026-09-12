import {
  InductiveQuestion,
  QuestionFamily,
  DifficultyLevel,
  StimulusItem,
  ChoiceOption,
  DetailedExplanation,
} from '../types';

// Helper for deterministic pseudo-random or fast seeded random
function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomChoice<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

const POLYGONS: Array<{ shape: NonNullable<StimulusItem['primaryShape']>; sides: number }> = [
  { shape: 'triangle', sides: 3 },
  { shape: 'square', sides: 4 },
  { shape: 'pentagon', sides: 5 },
  { shape: 'hexagon', sides: 6 },
  { shape: 'diamond', sides: 4 },
  { shape: 'circle', sides: 0 },
];

/**
 * Procedural Generators for each Question Family
 */

// 1. Group Classification (Kelompok A vs Kelompok B)
function generateGroupClassificationQuestion(index: number, difficulty: DifficultyLevel): InductiveQuestion {
  // Strategy: Invariant rule in Group A vs contrasting invariant rule in Group B
  // Types of rules:
  // - Parity of sides (Odd sides vs Even sides)
  // - Arithmetic relation: sides + dots = K (Group A: sum=6, Group B: sum=7)
  // - Concentric containment: Outer has more sides than inner vs Outer has fewer
  // - Shaded fraction: Exactly 50% shaded vs exactly 25% shaded
  // - Black dots vs White dots parity
  
  const ruleTypes = ['side_parity', 'arithmetic_sum', 'concentric_diff', 'sector_shading', 'dot_parity'];
  const ruleType = ruleTypes[index % ruleTypes.length];
  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  let title = '';
  let prompt = 'Tentukan kelompok yang tepat untuk Gambar Uji berdasarkan aturan keteraturan geometris:';
  let groupAItems: StimulusItem[] = [];
  let groupBItems: StimulusItem[] = [];
  let testItem: StimulusItem;
  let correctChoiceId = '';
  let options: ChoiceOption[] = [];
  let explanation: DetailedExplanation;

  if (ruleType === 'side_parity') {
    // Group A: Outer shape has ODD sides (3, 5). Group B: Outer shape has EVEN sides (4, 6).
    const oddShapes = POLYGONS.filter(p => p.sides === 3 || p.sides === 5);
    const evenShapes = POLYGONS.filter(p => p.sides === 4 || p.sides === 6);

    const aShape1 = getRandomChoice(oddShapes);
    const aShape2 = getRandomChoice(oddShapes);
    const aShape3 = getRandomChoice(oddShapes);

    const bShape1 = getRandomChoice(evenShapes);
    const bShape2 = getRandomChoice(evenShapes);
    const bShape3 = getRandomChoice(evenShapes);

    const testIsGroupA = Math.random() > 0.5;
    const testShape = testIsGroupA ? getRandomChoice(oddShapes) : getRandomChoice(evenShapes);

    const rotA1 = getRandomChoice([0, 45, 90, 180]);
    const rotA2 = getRandomChoice([0, 45, 90, 180]);
    const rotA3 = getRandomChoice([0, 45, 90, 180]);

    groupAItems = [
      { primaryShape: aShape1.shape, sides: aShape1.sides, rotation: rotA1, fillColor: 'none' },
      { primaryShape: aShape2.shape, sides: aShape2.sides, rotation: rotA2, fillColor: 'none' },
      { primaryShape: aShape3.shape, sides: aShape3.sides, rotation: rotA3, fillColor: 'none' },
    ];

    groupBItems = [
      { primaryShape: bShape1.shape, sides: bShape1.sides, rotation: getRandomChoice([0, 45]), fillColor: 'none' },
      { primaryShape: bShape2.shape, sides: bShape2.sides, rotation: getRandomChoice([0, 45]), fillColor: 'none' },
      { primaryShape: bShape3.shape, sides: bShape3.sides, rotation: getRandomChoice([0, 45]), fillColor: 'none' },
    ];

    testItem = {
      primaryShape: testShape.shape,
      sides: testShape.sides,
      rotation: getRandomChoice([0, 45, 90]),
      fillColor: 'none',
    };

    title = `Klasifikasi Bangun: Paritas Sisi Poligon #${index + 1}`;
    prompt = 'Berdasarkan karakteristik invarian kelompok, ke manakah Gambar Uji berikut harus diklasifikasikan?';

    correctChoiceId = testIsGroupA ? 'A' : 'B';

    options = [
      { id: 'A', label: 'Masuk ke dalam Kelompok A' },
      { id: 'B', label: 'Masuk ke dalam Kelompok B' },
      { id: 'C', label: 'Masuk ke dalam Kelompok A dan B sekaligus' },
      { id: 'D', label: 'Tidak masuk ke dalam Kelompok A maupun B' },
      { id: 'E', label: 'Informasi kelompok tidak cukup untuk ditentukan' },
    ];

    explanation = {
      hiddenRule: 'Kelompok A selalu memiliki jumlah sisi GANJIL (segitiga = 3, segilima = 5), sedangkan Kelompok B selalu memiliki jumlah sisi GENAP (segiempat = 4, segienam = 6).',
      summary: `Gambar uji adalah ${testShape.shape} dengan ${testShape.sides} sisi (${testShape.sides % 2 === 1 ? 'Ganjil' : 'Genap'}), sehingga secara konsisten masuk ke ${testIsGroupA ? 'Kelompok A' : 'Kelompok B'}.`,
      evidenceAnalysis: [
        {
          title: 'Observasi Kelompok A',
          points: [
            'Semua figur memiliki jumlah titik sudut / sisi ganjil (3 atau 5).',
            'Orientasi rotasi dan ukuran garis tidak mempengaruhi klasifikasi.',
          ],
        },
        {
          title: 'Observasi Kelompok B',
          points: [
            'Semua figur memiliki jumlah sisi genap (4 atau 6).',
          ],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Ekstraksi Fitur Dasar',
          content: 'Hitung jumlah sisi pembentuk poligon pada masing-masing kelompok.',
        },
        {
          title: 'Langkah 2: Uji Paritas',
          content: 'Bandingkan nilai paritas: Kelompok A = {3, 5} (Ganjil), Kelompok B = {4, 6} (Genap).',
        },
        {
          title: 'Langkah 3: Klasifikasi Gambar Uji',
          content: `Gambar uji memiliki ${testShape.sides} sisi (${testShape.sides % 2 === 1 ? 'ganjil' : 'genap'}), sehingga pilihan tepat adalah ${correctChoiceId}.`,
        },
      ],
      distractors: [
        {
          optionId: testIsGroupA ? 'B' : 'A',
          reason: 'Melanggar aturan paritas sisi yang konsisten pada seluruh anggota himpunan.',
          flawType: 'wrong_parity',
        },
        {
          optionId: 'C',
          reason: 'Kategori ganjil dan genap bersifat mutually exclusive (saling lepas).',
          flawType: 'overgeneralization',
        },
        {
          optionId: 'D',
          reason: 'Gambar uji memiliki bentuk poligon terdefinisi yang secara langsung cocok dengan salah satu kelompok.',
          flawType: 'incomplete_rule',
        },
      ],
      proTip: 'Pada soal klasifikasi kelompok, langkah pertama paling cepat adalah selalu menghitung jumlah sisi bangun luar (ganjil vs genap).',
    };
  } else if (ruleType === 'arithmetic_sum') {
    // Arithmetic sum: Sides + Black Dots = constant K
    // Group A: Sum = 6. Group B: Sum = 7.
    const sumA = 6;
    const sumB = 7;

    const makeSumItem = (targetSum: number): StimulusItem => {
      const sides = getRandomChoice([3, 4, 5]);
      const dotsCount = targetSum - sides;
      const shapeObj = POLYGONS.find(p => p.sides === sides) || { shape: 'square', sides: 4 };
      return {
        primaryShape: shapeObj.shape,
        sides: shapeObj.sides,
        fillColor: 'none',
        innerShapes: [{ shape: 'dot', count: dotsCount, fill: 'black', position: 'distributed' }],
      };
    };

    groupAItems = [makeSumItem(sumA), makeSumItem(sumA), makeSumItem(sumA)];
    groupBItems = [makeSumItem(sumB), makeSumItem(sumB), makeSumItem(sumB)];

    const testIsGroupA = Math.random() > 0.5;
    testItem = makeSumItem(testIsGroupA ? sumA : sumB);

    title = `Klasifikasi Kelompok: Jumlah Sisi & Titik #${index + 1}`;
    prompt = 'Tentukan keanggotaan Gambar Uji berdasarkan relasi kuantitatif invarian pada Kelompok A dan Kelompok B:';
    correctChoiceId = testIsGroupA ? 'A' : 'B';

    options = [
      { id: 'A', label: 'Masuk ke dalam Kelompok A' },
      { id: 'B', label: 'Masuk ke dalam Kelompok B' },
      { id: 'C', label: 'Masuk ke kedua kelompok' },
      { id: 'D', label: 'Tidak memenuhi aturan Kelompok A maupun B' },
      { id: 'E', label: 'Pola tidak dapat dirumuskan' },
    ];

    explanation = {
      hiddenRule: `Relasi Invarian: Kelompok A: (Jumlah Sisi Poligon + Jumlah Titik Hitam) = ${sumA}. Kelompok B: (Jumlah Sisi Poligon + Jumlah Titik Hitam) = ${sumB}.`,
      summary: `Total nilai gambar uji adalah ${testIsGroupA ? sumA : sumB}, yang memenuhi aturan eksklusif ${testIsGroupA ? 'Kelompok A' : 'Kelompok B'}.`,
      evidenceAnalysis: [
        {
          title: 'Verifikasi Kelompok A',
          points: [`Setiap kotak selalu menghasilkan total konstan sisi + titik = ${sumA}.`],
        },
        {
          title: 'Verifikasi Kelompok B',
          points: [`Setiap kotak selalu menghasilkan total konstan sisi + titik = ${sumB}.`],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Tabulasi Data',
          content: 'Catat jumlah sisi poligon luar dan hitung jumlah titik hitam di dalamnya.',
        },
        {
          title: 'Langkah 2: Temukan Persamaan Invarian',
          content: `Perhatikan bahwa (sisi + titik) menghasilkan konstanta ${sumA} pada A dan ${sumB} pada B.`,
        },
        {
          title: 'Langkah 3: Hitung Nilai Gambar Uji',
          content: `Gambar uji memiliki ${testItem.sides} sisi + ${testItem.innerShapes?.[0].count} titik = ${testIsGroupA ? sumA : sumB}.`,
        },
      ],
      distractors: [
        {
          optionId: testIsGroupA ? 'B' : 'A',
          reason: `Jumlah total sisi + titik tidak sama dengan ${testIsGroupA ? sumB : sumA}.`,
          flawType: 'incomplete_rule',
        },
      ],
      proTip: 'Jika bangun dan titik tampak bervariasi acak, buat operasi aritmatika sederhana (tambah atau kurang) antara jumlah sisi dan jumlah elemen internal.',
    };
  } else if (ruleType === 'sector_shading') {
    // Sector fraction: Group A = 50% shaded, Group B = 25% or 75% shaded
    const totalSectors = 4;
    groupAItems = [
      { primaryShape: 'circle', segments: { total: totalSectors, shadedIndices: [0, 1] } },
      { primaryShape: 'circle', segments: { total: totalSectors, shadedIndices: [1, 3] } },
      { primaryShape: 'circle', segments: { total: totalSectors, shadedIndices: [0, 2] } },
    ];
    groupBItems = [
      { primaryShape: 'circle', segments: { total: totalSectors, shadedIndices: [0] } },
      { primaryShape: 'circle', segments: { total: totalSectors, shadedIndices: [2] } },
      { primaryShape: 'circle', segments: { total: totalSectors, shadedIndices: [1] } },
    ];

    const testIsGroupA = Math.random() > 0.5;
    testItem = testIsGroupA
      ? { primaryShape: 'circle', segments: { total: totalSectors, shadedIndices: [2, 3] } }
      : { primaryShape: 'circle', segments: { total: totalSectors, shadedIndices: [3] } };

    title = `Klasifikasi Sektor Arsir: Fraksi Area #${index + 1}`;
    prompt = 'Manakah kelompok yang sesuai untuk Gambar Uji berdasarkan proporsi luas arsir?';
    correctChoiceId = testIsGroupA ? 'A' : 'B';

    options = [
      { id: 'A', label: 'Kelompok A (Tepat 50% luas lingkaran terarsir)' },
      { id: 'B', label: 'Kelompok B (Tepat 25% luas lingkaran terarsir)' },
      { id: 'C', label: 'Dapat dimasukkan ke Kelompok A atau B' },
      { id: 'D', label: 'Tidak sesuai dengan kriteria kedua kelompok' },
      { id: 'E', label: 'Memerlukan informasi sudut rotasi tambahan' },
    ];

    explanation = {
      hiddenRule: 'Kelompok A mensyaratkan tepat 2 dari 4 sektor terarsir (50%), sedangkan Kelompok B mensyaratkan tepat 1 dari 4 sektor terarsir (25%).',
      summary: `Gambar uji memiliki ${testIsGroupA ? '2' : '1'} sektor terarsir dari 4 sektor total, sehingga termasuk ${testIsGroupA ? 'Kelompok A' : 'Kelompok B'}.`,
      evidenceAnalysis: [
        {
          title: 'Pembedahan Fraksi',
          points: [
            'Kelompok A: Selalu terarsir 2 sektor (rasio 2/4 = 1/2). Posisi sektor boleh bersebelahan atau berseberangan.',
            'Kelompok B: Selalu terarsir 1 sektor tunggal (rasio 1/4 = 25%).',
          ],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Identifikasi Proporsi Arsir',
          content: 'Hitung jumlah sektor yang terisi gelap dibagi total sektor pembagi lingkaran.',
        },
      ],
      distractors: [
        {
          optionId: testIsGroupA ? 'B' : 'A',
          reason: 'Rasio luas arsir tidak sesuai dengan rasio invarian kelompok tersebut.',
          flawType: 'wrong_parity',
        },
      ],
      proTip: 'Abaikan posisi sudut rotasi sektor yang terarsir bila jumlah sektor yang diarsir sudah menunjukkan rasio konstan.',
    };
  } else {
    // Dot parity rule
    const isOddDotsA = (index % 2) === 0;
    const aCount = isOddDotsA ? 3 : 2;
    const bCount = isOddDotsA ? 4 : 3;

    groupAItems = [
      { primaryShape: 'square', innerShapes: [{ shape: 'dot', count: aCount, fill: 'black', position: 'distributed' }] },
      { primaryShape: 'triangle', innerShapes: [{ shape: 'dot', count: aCount, fill: 'black', position: 'distributed' }] },
      { primaryShape: 'circle', innerShapes: [{ shape: 'dot', count: aCount, fill: 'black', position: 'distributed' }] },
    ];
    groupBItems = [
      { primaryShape: 'square', innerShapes: [{ shape: 'dot', count: bCount, fill: 'black', position: 'distributed' }] },
      { primaryShape: 'triangle', innerShapes: [{ shape: 'dot', count: bCount, fill: 'black', position: 'distributed' }] },
      { primaryShape: 'circle', innerShapes: [{ shape: 'dot', count: bCount, fill: 'black', position: 'distributed' }] },
    ];

    const testIsGroupA = Math.random() > 0.5;
    testItem = {
      primaryShape: 'pentagon',
      innerShapes: [{ shape: 'dot', count: testIsGroupA ? aCount : bCount, fill: 'black', position: 'distributed' }],
    };

    title = `Klasifikasi Titik Internal: Konsistensi Elemen #${index + 1}`;
    prompt = 'Ke dalam kelompok manakah figur poligon segilima ini harus diklasifikasikan?';
    correctChoiceId = testIsGroupA ? 'A' : 'B';

    options = [
      { id: 'A', label: 'Kelompok A' },
      { id: 'B', label: 'Kelompok B' },
      { id: 'C', label: 'Kelompok A dan B' },
      { id: 'D', label: 'Bukan Kelompok A maupun B' },
      { id: 'E', label: 'Tidak dapat diputuskan' },
    ];

    explanation = {
      hiddenRule: `Kelompok A mewajibkan tepat ${aCount} titik hitam di dalam figur apapun, sedangkan Kelompok B mewajibkan tepat ${bCount} titik hitam.`,
      summary: `Gambar uji memiliki ${testIsGroupA ? aCount : bCount} titik hitam internal, sehingga valid masuk ke ${testIsGroupA ? 'Kelompok A' : 'Kelompok B'}.`,
      evidenceAnalysis: [
        {
          title: 'Karakteristik Elemen Dalam',
          points: [
            `Bentuk luar (lingkaran, segiempat, segitiga) hanyalah distraktor pengecoh. Variabel invarian tunggal adalah jumlah titik.`,
          ],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Pisahkan Fitur Esensial vs Distraktor',
          content: 'Bentuk poligon luar berganti-ganti, namun jumlah titik selalu konstan.',
        },
      ],
      distractors: [
        {
          optionId: testIsGroupA ? 'B' : 'A',
          reason: `Jumlah titik internal tidak sesuai dengan batas invarian ${testIsGroupA ? bCount : aCount}.`,
          flawType: 'wrong_parity',
        },
      ],
      proTip: 'Jika bentuk bingkai luar berubah-ubah antar kotak, seringkali bingkai tersebut hanyalah variabel independen (noise/red herring).',
    };
  }

  return {
    id: `gen-gc-${index}-${Date.now()}`,
    title,
    family: 'group_classification',
    difficulty,
    tags: ['klasifikasi', 'invarian', 'pilihan-ganda', ruleType],
    prompt,
    contextNote: 'Perhatikan relasi intrinsik antara Kelompok A dan Kelompok B:',
    groupA: {
      name: 'Kelompok A',
      items: groupAItems,
    },
    groupB: {
      name: 'Kelompok B',
      items: groupBItems,
    },
    testItem,
    options,
    correctAnswerId: correctChoiceId,
    explanation,
  };
}

// 2. Odd One Out (Cari Yang Berbeda dari 5 Pilihan)
function generateOddOneOutQuestion(index: number, difficulty: DifficultyLevel): InductiveQuestion {
  // Strategy: 4 figures share a strict rule, 1 violates it.
  // Patterns:
  // - Vertices count is divisible by 2 (or all have 4 sides except one with 3 or 5)
  // - Concentric shapes: outer shape sides = inner dots + 1 (except one where it is +2)
  // - Rotational symmetry / Angle orientation
  // - Shaded area fraction: 4 items have 1/2 shaded, 1 has 1/4 or 3/4
  // - Number of intersection lines

  const patterns = ['sides_parity', 'outer_inner_diff', 'sector_shading_odd', 'dot_count_odd'];
  const pattern = patterns[index % patterns.length];

  let rawOptions: Array<{ stimulus: StimulusItem; isCorrect: boolean; reason: string }> = [];
  let ruleDescription = '';

  if (pattern === 'sides_parity') {
    // 4 items have EVEN number of sides (4, 4, 6, 6), 1 has ODD number of sides (3 or 5)
    ruleDescription = 'Empat figur memiliki jumlah sisi genap (segiempat atau segienam), sedangkan satu figur memiliki jumlah sisi ganjil.';
    
    rawOptions = [
      { stimulus: { primaryShape: 'square', sides: 4, fillColor: 'none' }, isCorrect: false, reason: 'Memiliki 4 sisi (genap).' },
      { stimulus: { primaryShape: 'hexagon', sides: 6, fillColor: 'none' }, isCorrect: false, reason: 'Memiliki 6 sisi (genap).' },
      { stimulus: { primaryShape: 'diamond', sides: 4, fillColor: 'none', rotation: 45 }, isCorrect: false, reason: 'Memiliki 4 sisi (genap).' },
      { stimulus: { primaryShape: 'triangle', sides: 3, fillColor: 'none' }, isCorrect: true, reason: 'Memiliki 3 sisi (ganjil) — melanggar aturan genap.' },
      { stimulus: { primaryShape: 'hexagon', sides: 6, fillColor: 'none', rotation: 30 }, isCorrect: false, reason: 'Memiliki 6 sisi (genap).' },
    ];
  } else if (pattern === 'outer_inner_diff') {
    // Outer sides - inner dots = 2 for 4 items, but != 2 for the odd one
    ruleDescription = 'Relasi invarian: Jumlah sisi poligon luar dikurangi jumlah titik hitam di dalamnya selalu bernilai tepat 2.';
    rawOptions = [
      {
        stimulus: { primaryShape: 'triangle', sides: 3, innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] }, // 3 - 1 = 2
        isCorrect: false,
        reason: 'Sisi (3) - Titik (1) = 2 (Memenuhi aturan).',
      },
      {
        stimulus: { primaryShape: 'square', sides: 4, innerShapes: [{ shape: 'dot', count: 2, fill: 'black' }] }, // 4 - 2 = 2
        isCorrect: false,
        reason: 'Sisi (4) - Titik (2) = 2 (Memenuhi aturan).',
      },
      {
        stimulus: { primaryShape: 'pentagon', sides: 5, innerShapes: [{ shape: 'dot', count: 3, fill: 'black' }] }, // 5 - 3 = 2
        isCorrect: false,
        reason: 'Sisi (5) - Titik (3) = 2 (Memenuhi aturan).',
      },
      {
        stimulus: { primaryShape: 'hexagon', sides: 6, innerShapes: [{ shape: 'dot', count: 4, fill: 'black' }] }, // 6 - 4 = 2
        isCorrect: false,
        reason: 'Sisi (6) - Titik (4) = 2 (Memenuhi aturan).',
      },
      {
        stimulus: { primaryShape: 'pentagon', sides: 5, innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] }, // 5 - 1 = 4 != 2
        isCorrect: true,
        reason: 'Sisi (5) - Titik (1) = 4 (Melanggar selisih invarian 2).',
      },
    ];
  } else if (pattern === 'sector_shading_odd') {
    ruleDescription = 'Empat figur memiliki tepat 50% sektor lingkaran yang terarsir (2 dari 4 sektor), sedangkan satu figur berbeda proporsinya.';
    rawOptions = [
      { stimulus: { primaryShape: 'circle', segments: { total: 4, shadedIndices: [0, 1] } }, isCorrect: false, reason: '2 dari 4 sektor terarsir (50%).' },
      { stimulus: { primaryShape: 'circle', segments: { total: 4, shadedIndices: [1, 2] } }, isCorrect: false, reason: '2 dari 4 sektor terarsir (50%).' },
      { stimulus: { primaryShape: 'circle', segments: { total: 4, shadedIndices: [0, 3] } }, isCorrect: false, reason: '2 dari 4 sektor terarsir (50%).' },
      { stimulus: { primaryShape: 'circle', segments: { total: 4, shadedIndices: [0, 1, 2] } }, isCorrect: true, reason: '3 dari 4 sektor terarsir (75%) — satu-satunya yang tidak 50%.' },
      { stimulus: { primaryShape: 'circle', segments: { total: 4, shadedIndices: [0, 2] } }, isCorrect: false, reason: '2 dari 4 sektor terarsir (50%).' },
    ];
  } else {
    // Dot count odd
    ruleDescription = 'Empat figur memiliki jumlah titik hitam genap (4 titik), sedangkan satu figur memiliki jumlah titik hitam ganjil (3 titik).';
    rawOptions = [
      { stimulus: { primaryShape: 'square', innerShapes: [{ shape: 'dot', count: 4, fill: 'black', position: 'distributed' }] }, isCorrect: false, reason: 'Memiliki 4 titik (genap).' },
      { stimulus: { primaryShape: 'circle', innerShapes: [{ shape: 'dot', count: 4, fill: 'black', position: 'distributed' }] }, isCorrect: false, reason: 'Memiliki 4 titik (genap).' },
      { stimulus: { primaryShape: 'triangle', innerShapes: [{ shape: 'dot', count: 3, fill: 'black', position: 'distributed' }] }, isCorrect: true, reason: 'Memiliki 3 titik (ganjil) — melanggar keseragaman genap.' },
      { stimulus: { primaryShape: 'diamond', innerShapes: [{ shape: 'dot', count: 4, fill: 'black', position: 'distributed' }] }, isCorrect: false, reason: 'Memiliki 4 titik (genap).' },
      { stimulus: { primaryShape: 'pentagon', innerShapes: [{ shape: 'dot', count: 4, fill: 'black', position: 'distributed' }] }, isCorrect: false, reason: 'Memiliki 4 titik (genap).' },
    ];
  }

  // Shuffle the 5 options
  const shuffled = shuffleArray(rawOptions);
  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  let correctId = 'A';
  const finalOptions: ChoiceOption[] = shuffled.map((item, idx) => {
    const letter = optionLetters[idx];
    if (item.isCorrect) correctId = letter;
    return {
      id: letter,
      label: `Pilihan ${letter}`,
      stimulus: item.stimulus,
    };
  });

  const correctItem = shuffled.find(s => s.isCorrect)!;

  return {
    id: `gen-ooo-${index}-${Date.now()}`,
    title: `Odd-One-Out: Identifikasi Anomali Pola #${index + 1}`,
    family: 'odd_one_out',
    difficulty,
    tags: ['odd-one-out', 'anomali', 'pola', pattern],
    prompt: 'Dari kelima figur berikut, tentukan satu figur yang TIDAK mengikuti aturan geometris tersembunyi yang sama dengan empat figur lainnya:',
    options: finalOptions,
    correctAnswerId: correctId,
    explanation: {
      hiddenRule: ruleDescription,
      summary: `Opsi ${correctId} adalah anomali karena ${correctItem.reason}.`,
      evidenceAnalysis: [
        {
          title: 'Konsistensi 4 Figur Lainnya',
          points: ['Semua figur lain secara mutlak memenuhi hukum invarian yang sama.'],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Pengujian Properti',
          content: 'Uji parameter: jumlah sisi, jumlah titik internal, dan relasi matematis di antara keduanya.',
        },
        {
          title: 'Langkah 2: Menemukan Pelanggaran',
          content: `Hanya Opsi ${correctId} yang melanggar nilai invarian tersebut.`,
        },
      ],
      distractors: shuffled
        .filter(s => !s.isCorrect)
        .map((s, idx) => ({
          optionId: finalOptions.find(o => o.stimulus === s.stimulus)?.id || `Distractor-${idx}`,
          reason: s.reason,
          flawType: 'incomplete_rule',
        })),
      proTip: 'Cari sifat yang dapat dikuantifikasi (angka sisi, angka titik, rasio pecahan arsir) daripada mengandalkan kesan visual sekilas.',
    },
  };
}

// 3. Analogy (Analogi Pola A : B :: C : ?)
function generateAnalogyQuestion(index: number, difficulty: DifficultyLevel): InductiveQuestion {
  // Transformation types:
  // - Rotation by 90 degrees or 180 degrees
  // - Color/Shade Inversion (white becomes black)
  // - Element Addition (sides increase by 1, e.g. Triangle -> Square, Pentagon -> Hexagon)
  // - Scale inversion (outer and inner swap)

  const transformationTypes = ['rotation_90', 'side_plus_one', 'color_invert', 'dot_increment'];
  const tType = transformationTypes[index % transformationTypes.length];

  let itemA: StimulusItem;
  let itemB: StimulusItem;
  let itemC: StimulusItem;
  let correctItemD: StimulusItem;
  let distractorItems: StimulusItem[] = [];
  let ruleText = '';

  if (tType === 'rotation_90') {
    // Rotation by 90 degrees clockwise
    ruleText = 'Transformasi rotasi 90 derajat searah jarum jam (+90° CW).';
    itemA = { primaryShape: 'triangle', rotation: 0, innerShapes: [{ shape: 'dot', count: 1, fill: 'black', position: 'corners' }] };
    itemB = { primaryShape: 'triangle', rotation: 90, innerShapes: [{ shape: 'dot', count: 1, fill: 'black', position: 'corners' }] };
    itemC = { primaryShape: 'square', rotation: 0, innerShapes: [{ shape: 'dot', count: 1, fill: 'black', position: 'corners' }] };
    correctItemD = { primaryShape: 'square', rotation: 90, innerShapes: [{ shape: 'dot', count: 1, fill: 'black', position: 'corners' }] };

    distractorItems = [
      { primaryShape: 'square', rotation: 180, innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] },
      { primaryShape: 'square', rotation: 270, innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] },
      { primaryShape: 'triangle', rotation: 90, innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] },
      { primaryShape: 'diamond', rotation: 45, innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] },
    ];
  } else if (tType === 'side_plus_one') {
    // Number of sides increases by 1: Triangle (3) -> Square (4); Pentagon (5) -> Hexagon (6)
    ruleText = 'Jumlah sisi poligon bertambah tepat 1 (+1 sisi).';
    itemA = { primaryShape: 'triangle', sides: 3, fillColor: 'none' };
    itemB = { primaryShape: 'square', sides: 4, fillColor: 'none' };
    itemC = { primaryShape: 'pentagon', sides: 5, fillColor: 'none' };
    correctItemD = { primaryShape: 'hexagon', sides: 6, fillColor: 'none' };

    distractorItems = [
      { primaryShape: 'pentagon', sides: 5, fillColor: 'none' },
      { primaryShape: 'square', sides: 4, fillColor: 'none' },
      { primaryShape: 'diamond', sides: 4, fillColor: 'none' },
      { primaryShape: 'circle', sides: 0, fillColor: 'none' },
    ];
  } else if (tType === 'color_invert') {
    // Fill color inverts: empty -> black
    ruleText = 'Inversi warna arsir: Bangun kosong berubah menjadi terisi hitam pekat.';
    itemA = { primaryShape: 'circle', fillColor: 'none' };
    itemB = { primaryShape: 'circle', fillColor: 'black' };
    itemC = { primaryShape: 'triangle', fillColor: 'none' };
    correctItemD = { primaryShape: 'triangle', fillColor: 'black' };

    distractorItems = [
      { primaryShape: 'triangle', fillColor: 'none' },
      { primaryShape: 'circle', fillColor: 'black' },
      { primaryShape: 'square', fillColor: 'black' },
      { primaryShape: 'triangle', fillColor: 'shaded' },
    ];
  } else {
    // Dot count increment (+1 dot)
    ruleText = 'Jumlah titik internal bertambah tepat 1 titik.';
    itemA = { primaryShape: 'square', innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] };
    itemB = { primaryShape: 'square', innerShapes: [{ shape: 'dot', count: 2, fill: 'black' }] };
    itemC = { primaryShape: 'circle', innerShapes: [{ shape: 'dot', count: 2, fill: 'black' }] };
    correctItemD = { primaryShape: 'circle', innerShapes: [{ shape: 'dot', count: 3, fill: 'black' }] };

    distractorItems = [
      { primaryShape: 'circle', innerShapes: [{ shape: 'dot', count: 2, fill: 'black' }] },
      { primaryShape: 'circle', innerShapes: [{ shape: 'dot', count: 4, fill: 'black' }] },
      { primaryShape: 'square', innerShapes: [{ shape: 'dot', count: 3, fill: 'black' }] },
      { primaryShape: 'triangle', innerShapes: [{ shape: 'dot', count: 3, fill: 'black' }] },
    ];
  }

  // Assemble 5 multiple choices
  const rawPool = [
    { stimulus: correctItemD, isCorrect: true, reason: 'Memenuhi hukum transformasi analogi yang sama persis.' },
    ...distractorItems.slice(0, 4).map((d, i) => ({
      stimulus: d,
      isCorrect: false,
      reason: `Pilihan pengecoh #${i + 1} tidak memenuhi transformasi dengan tepat.`,
    })),
  ];

  const shuffled = shuffleArray(rawPool);
  const optionLetters = ['A', 'B', 'C', 'D', 'E'];
  let correctId = 'A';

  const options: ChoiceOption[] = shuffled.map((item, idx) => {
    const letter = optionLetters[idx];
    if (item.isCorrect) correctId = letter;
    return {
      id: letter,
      label: `Pilihan ${letter}`,
      stimulus: item.stimulus,
    };
  });

  return {
    id: `gen-ana-${index}-${Date.now()}`,
    title: `Analogi Geometris: Pola Transformasi #${index + 1}`,
    family: 'analogy',
    difficulty,
    tags: ['analogi', 'transformasi', 'rotasi', tType],
    prompt: 'Berdasarkan relasi antara Gambar A dan Gambar B, tentukan gambar yang melengkapi analogi untuk Gambar C:',
    analogyItems: {
      a: itemA,
      b: itemB,
      c: itemC,
    },
    options,
    correctAnswerId: correctId,
    explanation: {
      hiddenRule: `Aturan Transformasi: ${ruleText}`,
      summary: `Menerapkan transformasi dari A ke B secara identik ke Gambar C menghasilkan bentuk pada Opsi ${correctId}.`,
      evidenceAnalysis: [
        {
          title: 'Pemetaan Transformasi',
          points: [
            'Analisis relasi A -> B mengidentifikasi aturan invariant.',
            'Aturan tersebut dioperasikan langsung pada elemen Gambar C.',
          ],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Tentukan Hukum Perubahan A -> B',
          content: ruleText,
        },
        {
          title: 'Langkah 2: Terapkan ke C',
          content: `Objek C mengalami transformasi yang sama sehingga membentuk Opsi ${correctId}.`,
        },
      ],
      distractors: shuffled
        .filter(s => !s.isCorrect)
        .map((s) => ({
          optionId: options.find(o => o.stimulus === s.stimulus)?.id || '',
          reason: 'Transformasi yang dihasilkan salah atau berlebih.',
          flawType: 'incomplete_rule',
        })),
      proTip: 'Uraikan setiap transformasi menjadi komponen diskret (arah rotasi, jumlah sisi, status warna) dan periksa satu per satu.',
    },
  };
}

// 4. Sequence Induction (Deret Induktif 1 -> 2 -> 3 -> 4 -> ?)
function generateSequenceInductionQuestion(index: number, difficulty: DifficultyLevel): InductiveQuestion {
  // Sequences:
  // - Polygon sides progression: 3 -> 4 -> 5 -> 6 -> (7 or Star)
  // - Rotation progression: 0 -> 45 -> 90 -> 135 -> (180)
  // - Sector shading clockwise: sector 0 -> sector 1 -> sector 2 -> sector 3 -> (sector 0 or 4)
  // - Dots count progression: 1 -> 2 -> 3 -> 4 -> (5)

  const seqTypes = ['rotation_45', 'sides_growth', 'sector_shading_progression', 'dots_progression'];
  const sType = seqTypes[index % seqTypes.length];

  let seqItems: StimulusItem[] = [];
  let correctNext: StimulusItem;
  let distractors: StimulusItem[] = [];
  let ruleText = '';

  if (sType === 'rotation_45') {
    ruleText = 'Bangun berotasi 45 derajat searah jarum jam secara konsisten pada setiap langkah (+45° CW).';
    seqItems = [
      { primaryShape: 'diamond', rotation: 0, innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] },
      { primaryShape: 'diamond', rotation: 45, innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] },
      { primaryShape: 'diamond', rotation: 90, innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] },
      { primaryShape: 'diamond', rotation: 135, innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] },
    ];
    correctNext = { primaryShape: 'diamond', rotation: 180, innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] };
    distractors = [
      { primaryShape: 'diamond', rotation: 225, innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] },
      { primaryShape: 'diamond', rotation: 90, innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] },
      { primaryShape: 'square', rotation: 180, innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] },
      { primaryShape: 'diamond', rotation: 270, innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] },
    ];
  } else if (sType === 'sides_growth') {
    ruleText = 'Jumlah sisi bangun bertambah 1 pada setiap langkah deret: Segitiga (3) -> Segiempat (4) -> Segilima (5) -> Segienam (6) -> [Segitujuh / Bintang 7 / 7-gon].';
    seqItems = [
      { primaryShape: 'triangle', sides: 3, fillColor: 'none' },
      { primaryShape: 'square', sides: 4, fillColor: 'none' },
      { primaryShape: 'pentagon', sides: 5, fillColor: 'none' },
      { primaryShape: 'hexagon', sides: 6, fillColor: 'none' },
    ];
    correctNext = { primaryShape: 'star', sides: 7, fillColor: 'none' };
    distractors = [
      { primaryShape: 'hexagon', sides: 6, fillColor: 'none' },
      { primaryShape: 'square', sides: 4, fillColor: 'none' },
      { primaryShape: 'triangle', sides: 3, fillColor: 'none' },
      { primaryShape: 'circle', sides: 0, fillColor: 'none' },
    ];
  } else if (sType === 'sector_shading_progression') {
    ruleText = 'Satu sektor yang terarsir berpindah 1 posisi searah jarum jam pada setiap langkah.';
    seqItems = [
      { primaryShape: 'circle', segments: { total: 4, shadedIndices: [0] } },
      { primaryShape: 'circle', segments: { total: 4, shadedIndices: [1] } },
      { primaryShape: 'circle', segments: { total: 4, shadedIndices: [2] } },
      { primaryShape: 'circle', segments: { total: 4, shadedIndices: [3] } },
    ];
    correctNext = { primaryShape: 'circle', segments: { total: 4, shadedIndices: [0] } };
    distractors = [
      { primaryShape: 'circle', segments: { total: 4, shadedIndices: [2] } },
      { primaryShape: 'circle', segments: { total: 4, shadedIndices: [1] } },
      { primaryShape: 'circle', segments: { total: 4, shadedIndices: [3] } },
      { primaryShape: 'circle', segments: { total: 4, shadedIndices: [0, 1] } },
    ];
  } else {
    ruleText = 'Jumlah titik hitam di dalam lingkaran bertambah 1 secara berkala (+1 titik per kotak).';
    seqItems = [
      { primaryShape: 'circle', innerShapes: [{ shape: 'dot', count: 1, fill: 'black' }] },
      { primaryShape: 'circle', innerShapes: [{ shape: 'dot', count: 2, fill: 'black' }] },
      { primaryShape: 'circle', innerShapes: [{ shape: 'dot', count: 3, fill: 'black' }] },
      { primaryShape: 'circle', innerShapes: [{ shape: 'dot', count: 4, fill: 'black' }] },
    ];
    correctNext = { primaryShape: 'circle', innerShapes: [{ shape: 'dot', count: 5, fill: 'black' }] };
    distractors = [
      { primaryShape: 'circle', innerShapes: [{ shape: 'dot', count: 4, fill: 'black' }] },
      { primaryShape: 'circle', innerShapes: [{ shape: 'dot', count: 6, fill: 'black' }] },
      { primaryShape: 'square', innerShapes: [{ shape: 'dot', count: 5, fill: 'black' }] },
      { primaryShape: 'circle', innerShapes: [{ shape: 'dot', count: 3, fill: 'black' }] },
    ];
  }

  const rawPool = [
    { stimulus: correctNext, isCorrect: true },
    ...distractors.slice(0, 4).map(d => ({ stimulus: d, isCorrect: false })),
  ];

  const shuffled = shuffleArray(rawPool);
  const optionLetters = ['A', 'B', 'C', 'D', 'E'];
  let correctId = 'A';

  const options: ChoiceOption[] = shuffled.map((item, idx) => {
    const letter = optionLetters[idx];
    if (item.isCorrect) correctId = letter;
    return {
      id: letter,
      label: `Pilihan ${letter}`,
      stimulus: item.stimulus,
    };
  });

  return {
    id: `gen-seq-${index}-${Date.now()}`,
    title: `Deret Induktif: Prediksi Kotak Kelima #${index + 1}`,
    family: 'sequence_induction',
    difficulty,
    tags: ['deret', 'prediksi', 'aritmatika', sType],
    prompt: 'Perhatikan deret pola 4 kotak berikut dari kiri ke kanan. Tentukan figur yang mengisi kotak kelima (?) sesuai urutan logis:',
    contextStimuli: seqItems,
    options,
    correctAnswerId: correctId,
    explanation: {
      hiddenRule: `Aturan Deret: ${ruleText}`,
      summary: `Melanjutkan deret secara konstan menghasilkan figur pada Opsi ${correctId}.`,
      evidenceAnalysis: [
        {
          title: 'Analisis Perpindahan Step-by-Step',
          points: [
            'Langkah 1 -> 2 -> 3 -> 4 menunjukkan selisih tetap (deret aritmatika/rotasi konstan).',
            'Opsi yang benar melanjutkan langkah tersebut ke posisi berikutnya.',
          ],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Hitung Laju Perubahan',
          content: ruleText,
        },
        {
          title: 'Langkah 2: Proyeksikan ke Kotak ke-5',
          content: `Hasil proyeksi identik dengan Opsi ${correctId}.`,
        },
      ],
      distractors: shuffled
        .filter(s => !s.isCorrect)
        .map(() => ({
          optionId: '',
          reason: 'Langkah deret salah hitung atau melompati urutan.',
          flawType: 'incomplete_rule',
        })),
      proTip: 'Selalu tandai posisi awal elemen (misal jarum jam pada 12:00) dan amati delta derajat pertambahannya.',
    },
  };
}

// 5. Rule Identification (Identifikasi Pernyataan Aturan Logika)
function generateRuleIdentificationQuestion(index: number, difficulty: DifficultyLevel): InductiveQuestion {
  const isParity = (index % 2) === 0;

  let ruleStatement = '';
  let correctText = '';
  let incorrectTexts: string[] = [];

  if (isParity) {
    ruleStatement = 'Semua bangun yang valid memiliki jumlah sisi yang merupakan bilangan genap.';
    correctText = 'Setiap gambar yang lolos klasifikasi wajib memiliki jumlah sisi genap (4 atau 6).';
    incorrectTexts = [
      'Setiap gambar wajib memiliki jumlah sisi berupa bilangan ganjil.',
      'Setiap gambar wajib memiliki titik hitam di bagian sudut bangun.',
      'Setiap gambar harus memiliki luas arsir lebih dari 75%.',
      'Hanya bangun lingkaran yang diperbolehkan.',
    ];
  } else {
    ruleStatement = 'Jumlah sisi luar ditambah jumlah titik hitam di dalam selalu menghasilkan bilangan prima.';
    correctText = 'Nilai (Sisi Luar + Titik Dalam) selalu merupakan bilangan prima (3, 5, atau 7).';
    incorrectTexts = [
      'Nilai (Sisi Luar + Titik Dalam) selalu bernilai genap.',
      'Nilai (Sisi Luar - Titik Dalam) selalu sama dengan 0.',
      'Jumlah titik dalam selalu dua kali lipat jumlah sisi luar.',
      'Bentuk luar tidak berpengaruh pada keteraturan sama sekali.',
    ];
  }

  const rawPool = [
    { text: correctText, isCorrect: true },
    ...incorrectTexts.map(t => ({ text: t, isCorrect: false })),
  ];

  const shuffled = shuffleArray(rawPool);
  const optionLetters = ['A', 'B', 'C', 'D', 'E'];
  let correctId = 'A';

  const options: ChoiceOption[] = shuffled.map((item, idx) => {
    const letter = optionLetters[idx];
    if (item.isCorrect) correctId = letter;
    return {
      id: letter,
      label: item.text,
      text: item.text,
    };
  });

  return {
    id: `gen-rule-${index}-${Date.now()}`,
    title: `Identifikasi Aturan Logika Tersembunyi #${index + 1}`,
    family: 'rule_identification',
    difficulty,
    tags: ['identifikasi-aturan', 'induksi', 'logika'],
    prompt: 'Berdasarkan observasi data eksperimen geometri yang diberikan, manakah formulasi hipotesis aturan induktif yang paling tepat?',
    options,
    correctAnswerId: correctId,
    explanation: {
      hiddenRule: ruleStatement,
      summary: `Opsi ${correctId} mendefinisikan aturan keteraturan umum secara eksak tanpa kontradiksi.`,
      evidenceAnalysis: [
        {
          title: 'Verifikasi Hipotesis',
          points: [
            'Hipotesis yang benar mencakup seluruh data positif dan secara konsisten menolak contoh kontras.',
          ],
        },
      ],
      stepByStep: [
        {
          title: 'Langkah 1: Periksa Kecocokan Opsi',
          content: `Hanya Opsi ${correctId} yang berlaku konsisten untuk seluruh observasi.`,
        },
      ],
      distractors: shuffled
        .filter(s => !s.isCorrect)
        .map(() => ({
          optionId: '',
          reason: 'Pernyataan bertentangan dengan bukti observasi yang ada.',
          flawType: 'overgeneralization',
        })),
      proTip: 'Uji setiap pernyataan terhadap contoh kasus ekstrem (seperti lingkaran dengan 0 sisi atau segitiga dengan 3 sisi).',
    },
  };
}

/**
 * Procedural Master Generator for arbitrary question counts (1 to 1,000)
 */
export function generateQuestionsSet(
  count: number,
  category: QuestionFamily | 'all' = 'all',
  difficulty: DifficultyLevel | 'all' = 'all'
): InductiveQuestion[] {
  const safeCount = Math.max(1, Math.min(1000, Math.floor(count)));
  const questions: InductiveQuestion[] = [];

  const families: QuestionFamily[] = [
    'group_classification',
    'odd_one_out',
    'analogy',
    'sequence_induction',
    'rule_identification',
  ];

  const diffLevels: DifficultyLevel[] = ['mudah', 'sedang', 'sulit'];

  for (let i = 0; i < safeCount; i++) {
    const selectedFamily: QuestionFamily =
      category !== 'all' ? category : families[i % families.length];

    const selectedDifficulty: DifficultyLevel =
      difficulty !== 'all' ? difficulty : diffLevels[i % diffLevels.length];

    let q: InductiveQuestion;
    switch (selectedFamily) {
      case 'group_classification':
        q = generateGroupClassificationQuestion(i, selectedDifficulty);
        break;
      case 'odd_one_out':
        q = generateOddOneOutQuestion(i, selectedDifficulty);
        break;
      case 'analogy':
        q = generateAnalogyQuestion(i, selectedDifficulty);
        break;
      case 'sequence_induction':
        q = generateSequenceInductionQuestion(i, selectedDifficulty);
        break;
      case 'rule_identification':
        q = generateRuleIdentificationQuestion(i, selectedDifficulty);
        break;
      default:
        q = generateGroupClassificationQuestion(i, selectedDifficulty);
        break;
    }

    questions.push(q);
  }

  return questions;
}
