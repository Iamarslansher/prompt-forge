import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';
import { getProgress, saveProgress, saveQuizAttempt, getQuizAttempts } from '../utils/storage';
import { getLevelInfo } from '../utils/xpUtils';
import { generateCertificateId } from '../utils/certificateUtils';
import { ACHIEVEMENTS_DATA } from '../data/achievements';
import { CHAPTERS_DATA } from '../data/chapters';

const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [progress, setProgressState] = useState(null);

  // Load progress when user logs in or changes
  useEffect(() => {
    if (user?.username) {
      const data = getProgress(user.username);
      
      // Streak Calculation
      const today = new Date().toISOString().split('T')[0];
      const lastLogin = data.lastLoginDate;
      let newStreak = data.streakDays || 1;

      if (lastLogin && lastLogin !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (lastLogin === yesterday) {
          newStreak += 1; // Maintained streak
        } else {
          newStreak = 1; // Reset streak
        }
      }

      const updated = {
        ...data,
        streakDays: newStreak,
        lastLoginDate: today
      };

      setProgressState(updated);
      saveProgress(user.username, updated);
    } else {
      setProgressState(null);
    }
  }, [user]);

  const updateProgress = (updates) => {
    if (!user?.username) return;
    const nextProgress = { ...progress, ...updates };
    setProgressState(nextProgress);
    saveProgress(user.username, nextProgress);
    checkAchievements(nextProgress);
  };

  const addXp = (amount, reason) => {
    if (!progress) return;
    const oldLevel = getLevelInfo(progress.totalXp).level;
    const newXp = (progress.totalXp || 0) + amount;
    const newLevelInfo = getLevelInfo(newXp);

    updateProgress({ totalXp: newXp });

    addToast({
      title: `+${amount} XP Earned! ⭐`,
      message: reason,
      type: 'success',
      icon: 'Zap'
    });

    // Level up notification
    if (newLevelInfo.level > oldLevel) {
      addToast({
        title: `LEVEL UP! 🏆`,
        message: `Congratulations! You reached ${newLevelInfo.fullTitle}!`,
        type: 'gold',
        icon: 'Award',
        duration: 6000
      });
    }
  };

  const markChapterRead = (chapterId) => {
    if (!progress) return;
    const readList = progress.readChapters || [];
    if (!readList.includes(chapterId)) {
      const updated = [...readList, chapterId];
      updateProgress({ readChapters: updated });
      addXp(100, `Completed reading Chapter ${chapterId}`);
    }
  };

  const recordQuizResult = (chapterId, score, correctCount, totalQuestions, answers) => {
    if (!user?.username || !progress) return;

    const chapterNum = Number(chapterId);
    const passed = score >= 75;
    const isPerfect = score === 100;

    // Save attempt log
    saveQuizAttempt(user.username, {
      chapterId: chapterNum,
      score,
      correctCount,
      totalQuestions,
      passed,
      answers
    });

    const attemptsCount = (progress.quizAttemptsCount || 0) + 1;
    const existingScores = progress.chapterScores || {};
    const bestScoreForChapter = Math.max(existingScores[chapterNum] || 0, score);

    const newChapterScores = {
      ...existingScores,
      [chapterNum]: bestScoreForChapter
    };

    const overallBestScore = Math.max(progress.bestQuizScore || 0, score);
    const passedList = progress.passedChapters || [];
    const newlyPassed = passed && !passedList.includes(chapterNum);
    const newPassedList = newlyPassed ? [...passedList, chapterNum] : passedList;

    // Progression Rule: Unlock next chapter if score >= 75%
    const unlockedList = [...(progress.unlockedChapters || [1])];
    if (passed && chapterNum < 5) {
      const nextChapterNum = chapterNum + 1;
      if (!unlockedList.includes(nextChapterNum)) {
        unlockedList.push(nextChapterNum);
        addToast({
          title: `Chapter ${nextChapterNum} Unlocked! 🔓`,
          message: `Great job passing Chapter ${chapterNum}! Next chapter is now open.`,
          type: 'success',
          icon: 'Unlock',
          duration: 5000
        });
      }
    }

    // Check overall course completion (all 5 chapters passed)
    const allChaptersPassed = CHAPTERS_DATA.every(c => newPassedList.includes(c.id));
    let certIssued = progress.certificateIssued;
    let certId = progress.certificateId;
    let certDate = progress.certificateDate;

    if (allChaptersPassed && !certIssued) {
      certIssued = true;
      certId = generateCertificateId();
      certDate = new Date().toISOString();
      addXp(1000, "Completed the entire Prompt Engineering Master course!");
      addToast({
        title: "PROMPT ENGINEERING CERTIFIED! 🏆",
        message: "You completed all 5 chapters! Your Certificate is now unlocked.",
        type: 'gold',
        icon: 'GraduationCap',
        duration: 8000
      });
    }

    // Award XP for attempt
    if (newlyPassed) {
      addXp(250, `Passed Chapter ${chapterNum} Quiz (${score}%)`);
    }
    if (isPerfect) {
      addXp(500, `Perfect Score! 100% on Chapter ${chapterNum}`);
    }

    updateProgress({
      quizAttemptsCount: attemptsCount,
      chapterScores: newChapterScores,
      bestQuizScore: overallBestScore,
      passedChapters: newPassedList,
      unlockedChapters: unlockedList,
      certificateIssued: certIssued,
      certificateId: certId,
      certificateDate: certDate
    });

    return {
      passed,
      newlyPassed,
      score,
      nextChapterUnlocked: passed && chapterNum < 5
    };
  };

  const checkAchievements = (currentProgress) => {
    if (!currentProgress) return;
    const unlocked = currentProgress.unlockedAchievements || [];
    const newUnlocked = [...unlocked];

    ACHIEVEMENTS_DATA.forEach(ach => {
      if (newUnlocked.includes(ach.id)) return;

      let conditionMet = false;
      if (ach.id === 'first_prompt' && currentProgress.passedChapters?.includes(1)) conditionMet = true;
      if (ach.id === 'structured_thinker' && currentProgress.passedChapters?.includes(2)) conditionMet = true;
      if (ach.id === 'advanced_mind' && currentProgress.passedChapters?.includes(3)) conditionMet = true;
      if (ach.id === 'real_world_ready' && currentProgress.passedChapters?.includes(4)) conditionMet = true;
      if (ach.id === 'prompt_master' && currentProgress.passedChapters?.includes(5)) conditionMet = true;
      if (ach.id === 'perfect_score' && Object.values(currentProgress.chapterScores || {}).some(s => s === 100)) conditionMet = true;
      if (ach.id === 'consistent_learner' && (currentProgress.streakDays || 1) >= 7) conditionMet = true;
      if (ach.id === 'knowledge_seeker' && (currentProgress.readChapters || []).length >= 5) conditionMet = true;
      if (ach.id === 'certified_engineer' && currentProgress.certificateIssued) conditionMet = true;

      if (conditionMet) {
        newUnlocked.push(ach.id);
        addToast({
          title: `Achievement Unlocked! 🎖️`,
          message: `${ach.title}: ${ach.description}`,
          type: 'gold',
          icon: ach.icon
        });
      }
    });

    if (newUnlocked.length !== unlocked.length) {
      saveProgress(user.username, { ...currentProgress, unlockedAchievements: newUnlocked });
      setProgressState(prev => ({ ...prev, unlockedAchievements: newUnlocked }));
    }
  };

  const levelInfo = getLevelInfo(progress?.totalXp || 0);

  return (
    <ProgressContext.Provider value={{
      progress,
      levelInfo,
      markChapterRead,
      recordQuizResult,
      addXp,
      attemptsHistory: user ? getQuizAttempts(user.username) : []
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
