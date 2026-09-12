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
    return { ...defaultStats, ...parsed };
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
