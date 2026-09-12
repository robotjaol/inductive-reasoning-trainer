export type QuestionFamily =
  | 'group_classification'  // Klasifikasi Kelompok (Group A vs Group B)
  | 'odd_one_out'           // Cari yang Berbeda (Odd One Out)
  | 'rule_identification'   // Identifikasi Aturan Logika
  | 'analogy'               // Analogi Pola (A : B :: C : D)
  | 'sequence_induction';   // Kelanjutan Pola Induktif

export type DifficultyLevel = 'mudah' | 'sedang' | 'sulit';

// SVG Stimulus Definition for rendering pure geometric inductive patterns
export interface StimulusItem {
  id?: string;
  type?: 'polygon' | 'circle' | 'nested' | 'grid' | 'segmented' | 'composite' | 'custom_svg';
  primaryShape?: 'triangle' | 'square' | 'pentagon' | 'hexagon' | 'circle' | 'diamond' | 'star' | 'cross';
  sides?: number;
  vertices?: number;
  rotation?: number; // degrees
  fillColor?: string; // 'none', 'filled', 'shaded', 'half', color code
  strokeColor?: string;
  strokeWidth?: number;
  innerShapes?: {
    shape: 'circle' | 'square' | 'triangle' | 'dot' | 'cross' | 'line';
    count: number;
    fill?: 'black' | 'white' | 'gray' | 'accent';
    position?: 'center' | 'corners' | 'distributed' | 'border' | 'radial';
    rotation?: number;
  }[];
  dots?: {
    blackCount: number;
    whiteCount: number;
    positions?: string;
  };
  segments?: {
    total: number;
    shadedIndices: number[];
  };
  customPaths?: {
    d: string;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    strokeDasharray?: string;
  }[];
  textLabel?: string; // e.g., 'A', 'B', or vertex count hint
  description?: string; // Accessibility & screen reader
}

export interface ChoiceOption {
  id: string; // 'A' | 'B' | 'C' | 'D' | 'E'
  label: string;
  stimulus?: StimulusItem;
  text?: string; // For text-based choices like rule identification
}

export interface ExplanationStep {
  title: string;
  content: string;
  highlight?: string;
}

export interface DistractorAnalysis {
  optionId: string;
  reason: string;
  flawType: 'irrelevant_feature' | 'incomplete_rule' | 'wrong_parity' | 'inverted_relation' | 'overgeneralization';
}

export interface DetailedExplanation {
  hiddenRule: string; // Aturan inti penalaran induktif
  summary: string;    // Ringkasan jawaban singkat
  evidenceAnalysis: {
    title: string;
    points: string[];
  }[];
  stepByStep: ExplanationStep[];
  distractors: DistractorAnalysis[];
  proTip: string;     // Trik cepat mengenali pola sejenis dalam ujian
}

export interface InductiveQuestion {
  id: string;
  title: string;
  family: QuestionFamily;
  difficulty: DifficultyLevel;
  tags: string[];
  prompt: string; // Teks instruksi soal
  contextNote?: string; // e.g., "Perhatikan hubungan antara Kelompok A dan Kelompok B berikut:"
  
  // For Group Classification
  groupA?: {
    name: string;
    items: StimulusItem[];
    ruleHint?: string;
  };
  groupB?: {
    name: string;
    items: StimulusItem[];
    ruleHint?: string;
  };
  testItem?: StimulusItem; // Item yang hendak diklasifikasikan (jika format klasifikasi kelompok)

  // For Odd-One-Out or General Set
  contextStimuli?: StimulusItem[];

  // For Analogy (A : B :: C : ?)
  analogyItems?: {
    a: StimulusItem;
    b: StimulusItem;
    c: StimulusItem;
  };

  // Multiple choice options (Pilihan Ganda A-E)
  options: ChoiceOption[];
  correctAnswerId: string;

  // Pembahasan lengkap
  explanation: DetailedExplanation;
}

export interface UserExamRecord {
  id: string;
  date: string;
  totalQuestions: number;
  correctAnswers: number;
  scorePercentage: number;
  timeSpentSeconds: number;
  familyBreakdown: Record<QuestionFamily, { total: number; correct: number }>;
  userAnswers: Record<string, string>; // questionId -> chosenOptionId
}

export interface UserStats {
  totalSolved: number;
  totalCorrect: number;
  streakDays: number;
  bookmarkedQuestionIds: string[];
  lastExamScore?: number;
  history: UserExamRecord[];
}
