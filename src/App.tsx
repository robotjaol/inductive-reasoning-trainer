import React, { useState, useEffect, useMemo, useRef } from 'react';
import { InductiveQuestion, UserStats, UserExamRecord, QuestionFamily, DifficultyLevel } from './types';
import { QUESTIONS } from './data/questions';
import { generateQuestionsSet } from './engine/proceduralGenerator';
import {
  getStoredStats,
  saveUserExamRecord,
  toggleBookmark,
  recordPracticeSolve,
  clearAllStats,
} from './utils/storage';
import { Navbar, AppMode } from './components/Navbar';
import { SessionConfiguration, SessionConfig } from './components/SessionConfiguration';
import { AssessmentHeader } from './components/AssessmentHeader';
import { QuestionCard } from './components/QuestionCard';
import { QuestionNavigator } from './components/QuestionNavigator';
import { ResultsSummary } from './components/ResultsSummary';
import { BankSoalCatalog } from './components/BankSoalCatalog';
import { TheoryGuide } from './components/TheoryGuide';
import { AnalyticsDashboard } from './components/AnalyticsDashboard';
import { DesignSystemModal } from './components/DesignSystemModal';
import {
  Clock,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Play,
  ArrowRight,
  Filter,
  BarChart3,
  Layers,
} from 'lucide-react';

export default function App() {
  const [currentMode, setCurrentMode] = useState<AppMode>('assessment');
  const [stats, setStats] = useState<UserStats>(getStoredStats());
  const [isDesignManualOpen, setIsDesignManualOpen] = useState<boolean>(false);

  // -------------------------------------------------------------
  // ACTIVE ASSESSMENT SESSION STATE
  // -------------------------------------------------------------
  const [sessionConfig, setSessionConfig] = useState<SessionConfig | null>(null);
  const [sessionQuestions, setSessionQuestions] = useState<InductiveQuestion[]>([]);
  const [sessionIndex, setSessionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedIds, setFlaggedIds] = useState<Set<string>>(new Set());
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(true);
  const [sessionStartTime, setSessionStartTime] = useState<number>(0);
  const [completedRecord, setCompletedRecord] = useState<{
    questions: InductiveQuestion[];
    answers: Record<string, string>;
    flagged: Set<string>;
    totalTime: number;
  } | null>(null);

  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const finishedRef = useRef(false);
  const practiceRecorded = useRef(new Set<string>());

  const isSessionActive = Boolean(sessionConfig && !completedRecord);

  // Current question helper
  const currentQuestion = sessionQuestions[sessionIndex] || sessionQuestions[0];
  const totalQuestions = sessionQuestions.length;
  const answeredCount = Object.keys(userAnswers).length;

  // Question IDs list for O(1) Navigator
  const questionIds = useMemo(() => {
    return sessionQuestions.map((q) => q.id);
  }, [sessionQuestions]);

  // -------------------------------------------------------------
  // TIMER TICK EFFECT
  // -------------------------------------------------------------
  useEffect(() => {
    if (!isSessionActive || timeRemainingSeconds === null || !isTimerRunning) return;

    const deadline = Date.now() + timeRemainingSeconds * 1000;
    const timer = setInterval(() => {
      setTimeRemainingSeconds(Math.max(0, Math.ceil((deadline - Date.now()) / 1000)));
    }, 250);

    return () => clearInterval(timer);
  }, [isSessionActive, isTimerRunning]);

  useEffect(() => {
    if (isSessionActive && timeRemainingSeconds === 0) handleFinishSession();
  }, [isSessionActive, timeRemainingSeconds]);

  // -------------------------------------------------------------
  // START NEW SESSION
  // -------------------------------------------------------------
  const handleStartSession = (config: SessionConfig) => {
    finishedRef.current = false;
    practiceRecorded.current.clear();
    // Generate fresh randomized set
    const generated = generateQuestionsSet(
      config.questionCount,
      config.category,
      config.difficulty
    );

    setSessionConfig(config);
    setSessionQuestions(generated);
    setSessionIndex(0);
    setUserAnswers({});
    setFlaggedIds(new Set());
    setCompletedRecord(null);
    setShowSubmitModal(false);
    setSessionStartTime(Date.now());

    if (config.mode === 'exam' && config.timerEnabled) {
      const allocatedTotal = config.questionCount * config.secondsPerQuestion;
      setTimeRemainingSeconds(allocatedTotal);
      setIsTimerRunning(true);
    } else {
      setTimeRemainingSeconds(null);
    }

    setCurrentMode('assessment');
  };

  // -------------------------------------------------------------
  // SELECTION & ANSWERS HANDLERS
  // -------------------------------------------------------------
  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;

    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));

    // Update global solved stats
    if (sessionConfig?.mode === 'practice' && !practiceRecorded.current.has(currentQuestion.id)) {
      practiceRecorded.current.add(currentQuestion.id);
      const isCorrect = optionId === currentQuestion.correctAnswerId;
      const updated = recordPracticeSolve(isCorrect);
      setStats(updated);
    }
  };

  const handleClearOption = () => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[currentQuestion.id];
      return next;
    });
  };

  const handleToggleFlag = () => {
    if (!currentQuestion) return;
    setFlaggedIds((prev) => {
      const next = new Set(prev);
      if (next.has(currentQuestion.id)) {
        next.delete(currentQuestion.id);
      } else {
        next.add(currentQuestion.id);
      }
      return next;
    });
  };

  // -------------------------------------------------------------
  // SESSION SUBMISSION & RESULTS
  // -------------------------------------------------------------
  const handleFinishSession = () => {
    if (finishedRef.current || !sessionConfig || sessionQuestions.length === 0) return;
    finishedRef.current = true;
    setIsTimerRunning(false);
    setShowSubmitModal(false);
    const timeSpent = Math.max(1, Math.round((Date.now() - sessionStartTime) / 1000));

    // Save record to storage if exam mode
    if (sessionConfig?.mode === 'exam') {
      let correct = 0;
      const familyBreakdown: Record<QuestionFamily, { total: number; correct: number }> = {
        group_classification: { total: 0, correct: 0 },
        odd_one_out: { total: 0, correct: 0 },
        rule_identification: { total: 0, correct: 0 },
        analogy: { total: 0, correct: 0 },
        sequence_induction: { total: 0, correct: 0 },
      };

      sessionQuestions.forEach((q) => {
        const isCorrect = userAnswers[q.id] === q.correctAnswerId;
        if (isCorrect) correct += 1;
        if (!familyBreakdown[q.family]) {
          familyBreakdown[q.family] = { total: 0, correct: 0 };
        }
        familyBreakdown[q.family].total += 1;
        if (isCorrect) familyBreakdown[q.family].correct += 1;
      });

      const newRecord: UserExamRecord = {
        id: `exam-${Date.now()}`,
        date: new Date().toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        totalQuestions: sessionQuestions.length,
        correctAnswers: correct,
        scorePercentage: Math.round((correct / sessionQuestions.length) * 100),
        timeSpentSeconds: timeSpent,
        familyBreakdown,
        userAnswers: { ...userAnswers },
      };

      const updated = saveUserExamRecord(newRecord);
      setStats(updated);
    }

    setCompletedRecord({
      questions: sessionQuestions,
      answers: { ...userAnswers },
      flagged: new Set(flaggedIds),
      totalTime: timeSpent,
    });
  };

  // Retake incorrect questions
  const handleRetakeIncorrect = (incorrectQuestions: InductiveQuestion[]) => {
    if (!sessionConfig || incorrectQuestions.length === 0) return;
    finishedRef.current = false;
    practiceRecorded.current.clear();
    setSessionConfig({ ...sessionConfig, questionCount: incorrectQuestions.length });
    setSessionQuestions(incorrectQuestions);
    setSessionIndex(0);
    setUserAnswers({});
    setFlaggedIds(new Set());
    setCompletedRecord(null);
    setSessionStartTime(Date.now());

    if (sessionConfig.timerEnabled) {
      setTimeRemainingSeconds(incorrectQuestions.length * sessionConfig.secondsPerQuestion);
      setIsTimerRunning(true);
    } else {
      setTimeRemainingSeconds(null);
    }
  };

  // Retake all questions
  const handleRetakeAll = () => {
    if (!sessionConfig) return;
    finishedRef.current = false;
    practiceRecorded.current.clear();
    setSessionIndex(0);
    setUserAnswers({});
    setFlaggedIds(new Set());
    setCompletedRecord(null);
    setSessionStartTime(Date.now());

    if (sessionConfig.timerEnabled) {
      setTimeRemainingSeconds(sessionQuestions.length * sessionConfig.secondsPerQuestion);
      setIsTimerRunning(true);
    } else {
      setTimeRemainingSeconds(null);
    }
  };

  // Reset to configuration view
  const handleConfigureNewSession = () => {
    setShowSubmitModal(false);
    setTimeRemainingSeconds(null);
    setIsTimerRunning(false);
    setSessionConfig(null);
    setCompletedRecord(null);
    setSessionQuestions([]);
    setUserAnswers({});
    setFlaggedIds(new Set());
  };

  // -------------------------------------------------------------
  // KEYBOARD ACCESSIBILITY
  // -------------------------------------------------------------
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing in input
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat || (e.target instanceof HTMLElement && e.target.closest('input, textarea, select, button, [contenteditable="true"]'))) {
        return;
      }

      if (!isSessionActive || !currentQuestion || currentMode !== 'assessment' || showSubmitModal || isDesignManualOpen) return;
      if (['ArrowRight', 'ArrowLeft', 'Backspace'].includes(e.key)) e.preventDefault();

      const key = e.key.toUpperCase();
      const validLetterKeys = ['A', 'B', 'C', 'D', 'E'];
      const validNumberKeys = ['1', '2', '3', '4', '5'];

      // Option selection by A-E
      if (validLetterKeys.includes(key)) {
        const opt = currentQuestion.options.find((o) => o.id === key);
        if (opt) handleSelectOption(key);
      }
      // Option selection by 1-5
      else if (validNumberKeys.includes(key)) {
        const numIdx = parseInt(key, 10) - 1;
        const opt = currentQuestion.options[numIdx];
        if (opt) handleSelectOption(opt.id);
      }
      // Arrow navigation
      else if (e.key === 'ArrowRight' && sessionIndex < totalQuestions - 1) {
        setSessionIndex((i) => i + 1);
      } else if (e.key === 'ArrowLeft' && sessionIndex > 0) {
        setSessionIndex((i) => i - 1);
      }
      // Flag toggle
      else if (key === 'F') {
        handleToggleFlag();
      }
      // Clear answer
      else if (e.key === 'Backspace') {
        handleClearOption();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSessionActive, currentQuestion, sessionIndex, totalQuestions, userAnswers, flaggedIds, currentMode, showSubmitModal, isDesignManualOpen]);

  // Family label helper
  const getFamilyLabel = (family?: QuestionFamily | 'all') => {
    switch (family) {
      case 'group_classification':
        return 'Klasifikasi Kelompok';
      case 'odd_one_out':
        return 'Odd-One-Out';
      case 'analogy':
        return 'Analogi Geometris';
      case 'sequence_induction':
        return 'Deret Induktif';
      case 'rule_identification':
        return 'Identifikasi Aturan';
      default:
        return 'Kombinasi Pola Induktif';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-slate-200">
      {/* Universal Anti-Slop Top Navigation */}
      <Navbar
        currentMode={currentMode}
        onSelectMode={(mode) => {
          if (isSessionActive && mode !== 'assessment') {
            const confirmed = window.confirm(
              'Sesi pengerjaan sedang berlangsung. Apakah Anda yakin ingin beralih halaman?'
            );
            if (!confirmed) return;
          }
          setCurrentMode(mode);
        }}
        stats={stats}
        inActiveSession={isSessionActive}
        onOpenDesignManual={() => setIsDesignManualOpen(true)}
      />

      {/* Main Responsive Canvas */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-3 sm:p-5 lg:p-6">
        {/* ======================================================== */}
        {/* MODE 1: ASSESSMENT & PRACTICE SESSION */}
        {/* ======================================================== */}
        {currentMode === 'assessment' && (
          <div className="space-y-4">
            {/* 1A. Session Configuration Screen */}
            {!sessionConfig && !completedRecord && (
              <SessionConfiguration
                onStartSession={handleStartSession}
                defaultCount={20}
              />
            )}

            {/* 1B. Active Assessment Screen */}
            {isSessionActive && currentQuestion && (
              <div className="space-y-4">
                <AssessmentHeader
                  title="Sesi Penilaian Induktif"
                  categoryName={getFamilyLabel(sessionConfig?.category)}
                  currentIndex={sessionIndex}
                  totalQuestions={totalQuestions}
                  answeredCount={answeredCount}
                  timeRemainingSeconds={timeRemainingSeconds}
                  isTimerRunning={isTimerRunning}
                  onToggleTimer={() => setIsTimerRunning((prev) => !prev)}
                  onSubmitSession={() => setShowSubmitModal(true)}
                  onExitSession={() => {
                    const confirmed = window.confirm(
                      'Keluar dari sesi ini? Jawaban Anda yang belum disubmit tidak akan dihitung.'
                    );
                    if (confirmed) handleConfigureNewSession();
                  }}
                  modeLabel={sessionConfig?.mode === 'exam' ? 'Simulasi Ujian' : 'Latihan Bebas'}
                />

                {/* Grid Layout: Main Question Card + Question Navigator */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
                  {/* Question Card (Dominant, 8 columns on large screens) */}
                  <div className="lg:col-span-8 xl:col-span-9 space-y-4">
                    <QuestionCard
                      key={currentQuestion.id}
                      question={currentQuestion}
                      currentIndex={sessionIndex}
                      totalQuestions={totalQuestions}
                      selectedOptionId={userAnswers[currentQuestion.id]}
                      onSelectOption={handleSelectOption}
                      onClearOption={handleClearOption}
                      isPracticeMode={sessionConfig?.mode === 'practice'}
                      isFlagged={flaggedIds.has(currentQuestion.id)}
                      onToggleFlag={handleToggleFlag}
                      onPrev={() => setSessionIndex((i) => Math.max(0, i - 1))}
                      onNext={() => setSessionIndex((i) => Math.min(totalQuestions - 1, i + 1))}
                      hasPrev={sessionIndex > 0}
                      hasNext={sessionIndex < totalQuestions - 1}
                    />
                  </div>

                  {/* Question Navigator (Sidebar, 4 columns on large screens) */}
                  <div className="lg:col-span-4 xl:col-span-3">
                    <QuestionNavigator
                      totalQuestions={totalQuestions}
                      currentIndex={sessionIndex}
                      userAnswers={userAnswers}
                      flaggedIds={flaggedIds}
                      questionIds={questionIds}
                      onSelectIndex={(idx) => setSessionIndex(idx)}
                      chunkSize={50}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* 1C. Results & Analytics Summary Screen */}
            {completedRecord && (
              <ResultsSummary
                questions={completedRecord.questions}
                userAnswers={completedRecord.answers}
                flaggedIds={completedRecord.flagged}
                totalTimeSeconds={completedRecord.totalTime}
                onRetakeAll={handleRetakeAll}
                onRetakeIncorrect={handleRetakeIncorrect}
                onConfigureNewSession={handleConfigureNewSession}
              />
            )}
          </div>
        )}

        {/* ======================================================== */}
        {/* MODE 2: BANK SOAL & CATALOG VIEW */}
        {/* ======================================================== */}
        {currentMode === 'catalog' && (
          <BankSoalCatalog
            questions={QUESTIONS}
            bookmarkedIds={stats.bookmarkedQuestionIds}
            onToggleBookmark={(id) => setStats(prev => ({ ...prev, bookmarkedQuestionIds: toggleBookmark(id) }))}
            onPracticeQuestion={(questionId) => {
              // Start focused 1-question practice session
              const target = QUESTIONS.find((q) => q.id === questionId);
              if (target) {
                finishedRef.current = false;
                practiceRecorded.current.clear();
                setSessionStartTime(Date.now());
                setTimeRemainingSeconds(null);
                setIsTimerRunning(false);
                setShowSubmitModal(false);
                setSessionConfig({
                  mode: 'practice',
                  questionCount: 1,
                  category: target.family,
                  difficulty: target.difficulty,
                  timerEnabled: false,
                  secondsPerQuestion: 60,
                });
                setSessionQuestions([target]);
                setSessionIndex(0);
                setUserAnswers({});
                setFlaggedIds(new Set());
                setCompletedRecord(null);
                setCurrentMode('assessment');
              }
            }}
          />
        )}

        {/* ======================================================== */}
        {/* MODE 3: THEORY & METHODOLOGY GUIDE */}
        {/* ======================================================== */}
        {currentMode === 'theory' && <TheoryGuide onStartPractice={() => { handleConfigureNewSession(); setCurrentMode('assessment'); }} />}

        {/* ======================================================== */}
        {/* MODE 4: HISTORICAL ANALYTICS & LOGS */}
        {/* ======================================================== */}
        {currentMode === 'analytics' && (
          <AnalyticsDashboard
            stats={stats}
            onStartAssessment={() => {
              setSessionConfig(null);
              setCompletedRecord(null);
              setCurrentMode('assessment');
            }}
            onResetStats={() => {
              const fresh = clearAllStats();
              setStats(fresh);
            }}
          />
        )}
      </main>

      {/* Confirmation Modal Before Submission */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg border border-slate-300 max-w-md w-full p-5 space-y-4 shadow-xl">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900">
                Kumpulkan Jawaban Sesi Ini?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Anda telah menjawab{' '}
                <strong className="font-mono text-slate-900">{answeredCount}</strong> dari total{' '}
                <strong className="font-mono text-slate-900">{totalQuestions}</strong> soal.
                {totalQuestions - answeredCount > 0 && (
                  <span className="block text-amber-700 font-medium mt-1">
                    Peringatan: Masih ada {totalQuestions - answeredCount} soal yang belum diisi!
                  </span>
                )}
                {flaggedIds.size > 0 && (
                  <span className="block text-slate-600 font-mono text-[11px]">
                    Ada {flaggedIds.size} soal yang masih ditandai ragu-ragu.
                  </span>
                )}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-3.5 py-1.5 rounded border border-slate-300 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Lanjutkan Mengerjakan
              </button>
              <button
                type="button"
                onClick={handleFinishSession}
                className="px-4 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer shadow-2xs"
              >
                Ya, Selesaikan & Nilai
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Senior Designer Brand & Design Specification Modal */}
      <DesignSystemModal
        isOpen={isDesignManualOpen}
        onClose={() => setIsDesignManualOpen(false)}
      />
    </div>
  );
}
