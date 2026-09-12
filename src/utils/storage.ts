import { UserStats, UserExamRecord } from '../types';

const STORAGE_KEY = 'inductive_reasoning_user_stats_v1';

const defaultStats: UserStats = {
  totalSolved: 0,
  totalCorrect: 0,
  streakDays: 1,
  bookmarkedQuestionIds: [],
  history: [],
};

export const getStoredStats = (): UserStats => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStats;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return { ...defaultStats };
    const nonnegative = (value: unknown) => typeof value === 'number' && Number.isFinite(value) && value >= 0 ? Math.floor(value) : 0;
    const totalSolved = nonnegative(parsed.totalSolved);
    return {
      ...defaultStats,
      totalSolved,
      totalCorrect: Math.min(totalSolved, nonnegative(parsed.totalCorrect)),
      streakDays: nonnegative(parsed.streakDays),
      bookmarkedQuestionIds: Array.isArray(parsed.bookmarkedQuestionIds) ? parsed.bookmarkedQuestionIds.filter((id: unknown) => typeof id === 'string') : [],
      lastExamScore: typeof parsed.lastExamScore === 'number' && Number.isFinite(parsed.lastExamScore) ? Math.min(100, Math.max(0, parsed.lastExamScore)) : undefined,
      history: Array.isArray(parsed.history) ? parsed.history.filter((r: UserExamRecord) => r && typeof r.id === 'string' && typeof r.date === 'string' && Number.isFinite(r.totalQuestions) && r.totalQuestions > 0 && Number.isFinite(r.correctAnswers) && Number.isFinite(r.scorePercentage) && Number.isFinite(r.timeSpentSeconds) && r.familyBreakdown && typeof r.familyBreakdown === 'object').slice(0, 50) : [],
    };
  } catch {
    return defaultStats;
  }
};

export const saveUserExamRecord = (record: UserExamRecord): UserStats => {
  const current = getStoredStats();
  const updatedHistory = [record, ...current.history].slice(0, 50); // keep last 50
  const updatedStats: UserStats = {
    ...current,
    totalSolved: current.totalSolved + record.totalQuestions,
    totalCorrect: current.totalCorrect + record.correctAnswers,
    lastExamScore: record.scorePercentage,
    history: updatedHistory,
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStats));
  } catch (e) {
    console.error('Failed to save to localStorage', e);
  }

  return updatedStats;
};

export const toggleBookmark = (questionId: string): string[] => {
  const current = getStoredStats();
  const exists = current.bookmarkedQuestionIds.includes(questionId);
  const updated = exists
    ? current.bookmarkedQuestionIds.filter((id) => id !== questionId)
    : [...current.bookmarkedQuestionIds, questionId];

  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...current, bookmarkedQuestionIds: updated })
    );
  } catch (e) {
    console.error('Failed to save bookmark', e);
  }

  return updated;
};

export const recordPracticeSolve = (isCorrect: boolean): UserStats => {
  const current = getStoredStats();
  const updatedStats: UserStats = {
    ...current,
    totalSolved: current.totalSolved + 1,
    totalCorrect: current.totalCorrect + (isCorrect ? 1 : 0),
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStats));
  } catch (e) {
    console.error('Failed to save practice solve', e);
  }

  return updatedStats;
};

export const clearAllStats = (): UserStats => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear stats', e);
  }
  return { ...defaultStats };
};
