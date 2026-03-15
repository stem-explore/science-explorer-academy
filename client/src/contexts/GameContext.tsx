// ============================================================
// SCIENCE EXPLORER ACADEMY — Game Context
// Manages: player progress, XP, badges, streaks, avatar
// Persists to localStorage for session continuity
// ============================================================

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { ALL_LESSONS } from '@/lib/gameData';

export interface PlayerState {
  name: string;
  avatarEmoji: string;
  avatarColor: string;
  xp: number;
  level: number;
  streak: number;
  lastPlayDate: string | null;
  completedLessons: string[];
  earnedBadges: string[];
  unlockedAvatarItems: string[];
  totalStars: number;
  teacherSkipMode: boolean;
  currentLessonProgress: {
    lessonId: string;
    phase: 'hook' | 'checkin' | 'activity' | 'bossbattle' | 'victory';
    timestamp: number;
  } | null;
}

export interface GameContextType {
  player: PlayerState;
  setPlayerName: (name: string) => void;
  setAvatar: (emoji: string, color: string) => void;
  completeLesson: (lessonId: string, stars: number, xpEarned: number) => void;
  isLessonUnlocked: (lessonId: string) => boolean;
  isLessonComplete: (lessonId: string) => boolean;
  getLessonStars: (lessonId: string) => number;
  addXP: (amount: number) => void;
  resetProgress: () => void;
  currentLessonId: string | null;
  setCurrentLessonId: (id: string | null) => void;
  lessonStars: Record<string, number>;
  toggleTeacherSkipMode: () => void;
  saveLessonProgress: (lessonId: string, phase: 'hook' | 'checkin' | 'activity' | 'bossbattle' | 'victory') => void;
  clearLessonProgress: () => void;
}

const DEFAULT_PLAYER: PlayerState = {
  name: 'Explorer',
  avatarEmoji: '🦉',
  avatarColor: '#4FC3F7',
  xp: 0,
  level: 1,
  streak: 1,
  lastPlayDate: null,
  completedLessons: [],
  earnedBadges: [],
  unlockedAvatarItems: [],
  totalStars: 0,
  teacherSkipMode: false,
  currentLessonProgress: null,
};

const XP_PER_LEVEL = 300;

const GameContext = createContext<GameContextType | null>(null);

export function GameProvider({ children }: { children: React.ReactNode }) {
  const [player, setPlayer] = useState<PlayerState>(() => {
    try {
      const saved = localStorage.getItem('scienceExplorer_player');
      return saved ? { ...DEFAULT_PLAYER, ...JSON.parse(saved) } : DEFAULT_PLAYER;
    } catch {
      return DEFAULT_PLAYER;
    }
  });

  const [lessonStars, setLessonStars] = useState<Record<string, number>>(() => {
    try {
      const saved = localStorage.getItem('scienceExplorer_stars');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [currentLessonId, setCurrentLessonId] = useState<string | null>(null);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('scienceExplorer_player', JSON.stringify(player));
  }, [player]);

  useEffect(() => {
    localStorage.setItem('scienceExplorer_stars', JSON.stringify(lessonStars));
  }, [lessonStars]);

  // Update streak on load
  useEffect(() => {
    const today = new Date().toDateString();
    if (player.lastPlayDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const wasYesterday = player.lastPlayDate === yesterday.toDateString();
      setPlayer(prev => ({
        ...prev,
        streak: wasYesterday ? prev.streak + 1 : 1,
        lastPlayDate: today,
      }));
    }
  }, []);

  const setPlayerName = useCallback((name: string) => {
    setPlayer(prev => ({ ...prev, name }));
  }, []);

  const setAvatar = useCallback((emoji: string, color: string) => {
    setPlayer(prev => ({ ...prev, avatarEmoji: emoji, avatarColor: color }));
  }, []);

  const addXP = useCallback((amount: number) => {
    setPlayer(prev => {
      const newXP = prev.xp + amount;
      const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
      return { ...prev, xp: newXP, level: newLevel };
    });
  }, []);

  const completeLesson = useCallback((lessonId: string, stars: number, xpEarned: number) => {
    const lesson = ALL_LESSONS.find(l => l.id === lessonId);
    if (!lesson) return;

    setLessonStars(prev => ({
      ...prev,
      [lessonId]: Math.max(prev[lessonId] || 0, stars),
    }));

    setPlayer(prev => {
      const alreadyCompleted = prev.completedLessons.includes(lessonId);
      const newCompleted = alreadyCompleted
        ? prev.completedLessons
        : [...prev.completedLessons, lessonId];

      const newBadges = prev.earnedBadges.includes(lesson.badgeName)
        ? prev.earnedBadges
        : [...prev.earnedBadges, lesson.badgeName];

      const xpGain = alreadyCompleted ? Math.floor(xpEarned * 0.3) : xpEarned;
      const newXP = prev.xp + xpGain;
      const newLevel = Math.floor(newXP / XP_PER_LEVEL) + 1;
      const newStars = prev.totalStars + (alreadyCompleted ? 0 : stars);

      return {
        ...prev,
        xp: newXP,
        level: newLevel,
        completedLessons: newCompleted,
        earnedBadges: newBadges,
        totalStars: newStars,
      };
    });
  }, []);

  const isLessonUnlocked = useCallback((lessonId: string): boolean => {
    const lessonIndex = ALL_LESSONS.findIndex(l => l.id === lessonId);
    if (lessonIndex === 0) return true;
    const prevLesson = ALL_LESSONS[lessonIndex - 1];
    return player.completedLessons.includes(prevLesson.id);
  }, [player.completedLessons]);

  const isLessonComplete = useCallback((lessonId: string): boolean => {
    return player.completedLessons.includes(lessonId);
  }, [player.completedLessons]);

  const getLessonStars = useCallback((lessonId: string): number => {
    return lessonStars[lessonId] || 0;
  }, [lessonStars]);

  const resetProgress = useCallback(() => {
    setPlayer(DEFAULT_PLAYER);
    setLessonStars({});
    localStorage.removeItem('scienceExplorer_player');
    localStorage.removeItem('scienceExplorer_stars');
  }, []);

  const toggleTeacherSkipMode = useCallback(() => {
    setPlayer(prev => ({ ...prev, teacherSkipMode: !prev.teacherSkipMode }));
  }, []);

  const saveLessonProgress = useCallback((lessonId: string, phase: 'hook' | 'checkin' | 'activity' | 'bossbattle' | 'victory') => {
    setPlayer(prev => ({
      ...prev,
      currentLessonProgress: {
        lessonId,
        phase,
        timestamp: Date.now(),
      },
    }));
  }, []);

  const clearLessonProgress = useCallback(() => {
    setPlayer(prev => ({ ...prev, currentLessonProgress: null }));
  }, []);

  return (
    <GameContext.Provider value={{
      player,
      setPlayerName,
      setAvatar,
      completeLesson,
      isLessonUnlocked,
      isLessonComplete,
      getLessonStars,
      addXP,
      resetProgress,
      currentLessonId,
      setCurrentLessonId,
      lessonStars,
      toggleTeacherSkipMode,
      saveLessonProgress,
      clearLessonProgress,
    }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}

export function useXPProgress(xp: number) {
  const xpInCurrentLevel = xp % XP_PER_LEVEL;
  const progressPercent = (xpInCurrentLevel / XP_PER_LEVEL) * 100;
  return { xpInCurrentLevel, progressPercent, xpToNextLevel: XP_PER_LEVEL - xpInCurrentLevel };
}
