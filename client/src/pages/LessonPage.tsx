// ============================================================
// SCIENCE EXPLORER ACADEMY — Lesson Page
// ADHD-Friendly Quick-Fire Loop:
// 1. Hook (2-min video placeholder with fun fact)
// 2. Check-In (3 visual mini-quiz questions)
// 3. The Activity (interactive game)
// 4. Boss Battle (5-question final quiz)
// 5. Victory (badge + XP reward)
// ============================================================

import { useState, useCallback, useEffect } from 'react';
import { useParams, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { getLessonById, getUnitById } from '@/lib/gameData';
import { useGame } from '@/contexts/GameContext';
import { useSounds } from '@/hooks/useSounds';
import TopNav from '@/components/TopNav';
import Confetti from '@/components/Confetti';

// Games
import BubblePop from '@/components/games/BubblePop';
import ParticleSorter from '@/components/games/ParticleSorter';
import ThermostatHero from '@/components/games/ThermostatHero';
import PotionLab from '@/components/games/PotionLab';
import SpaceRover from '@/components/games/SpaceRover';
import SnailRace from '@/components/games/SnailRace';
import DropTest from '@/components/games/DropTest';
import GoKartBuilder from '@/components/games/GoKartBuilder';

type Phase = 'hook' | 'mini-quiz' | 'game' | 'boss-battle' | 'victory';

const OWL_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663440693124/LRCQh74urLCPMmK8QUgPSZ/avatar-scientist-A5DxgHtRoTEVyXzf5WmEy5.webp';

function PhaseIndicator({ phase, lessonColor }: { phase: Phase; lessonColor: string }) {
  const phases: { key: Phase; label: string; emoji: string }[] = [
    { key: 'hook', label: 'Hook', emoji: '🎬' },
    { key: 'mini-quiz', label: 'Check-In', emoji: '❓' },
    { key: 'game', label: 'Activity', emoji: '🎮' },
    { key: 'boss-battle', label: 'Boss Battle', emoji: '⚔️' },
    { key: 'victory', label: 'Victory!', emoji: '🏆' },
  ];
  const currentIndex = phases.findIndex(p => p.key === phase);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0',
      padding: '0.5rem 1rem',
      background: '#FFF8E7',
      borderBottom: '3px solid #3D2B1F',
      overflowX: 'auto',
    }}>
      {phases.map((p, i) => (
        <div key={p.key} style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2px',
            padding: '4px 8px',
            borderRadius: 10,
            background: i === currentIndex ? lessonColor : i < currentIndex ? '#52B788' : 'transparent',
            border: i === currentIndex ? '2px solid #3D2B1F' : '2px solid transparent',
            boxShadow: i === currentIndex ? '2px 2px 0 #3D2B1F' : 'none',
            minWidth: 52,
          }}>
            <span style={{ fontSize: '1rem' }}>{i < currentIndex ? '✅' : p.emoji}</span>
            <span style={{
              fontFamily: "'Fredoka One', sans-serif",
              fontSize: '0.6rem',
              color: i === currentIndex ? 'white' : i < currentIndex ? 'white' : '#888',
              whiteSpace: 'nowrap',
            }}>
              {p.label}
            </span>
          </div>
          {i < phases.length - 1 && (
            <div style={{
              width: 20,
              height: 2,
              background: i < currentIndex ? '#52B788' : '#C8C0B0',
              margin: '0 2px',
              marginBottom: 12,
            }} />
          )}
        </div>
      ))}
    </div>
  );
}

function HookPhase({ lesson, onNext }: { lesson: any; onNext: () => void }) {
  const [watched, setWatched] = useState(false);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setWatched(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '1rem' }}
    >
      {/* Video placeholder */}
      <div style={{
        background: '#1A1A2E',
        border: '4px solid #3D2B1F',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: '1rem',
        boxShadow: '5px 5px 0 #3D2B1F',
        position: 'relative',
        aspectRatio: '16/9',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* Simulated video player */}
        <div style={{ textAlign: 'center', padding: '1.5rem' }}>
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ fontSize: '3rem', marginBottom: '0.5rem' }}
          >
            {lesson.emoji}
          </motion.div>
          <div style={{
            fontFamily: "'Fredoka One', sans-serif",
            fontSize: '1.2rem',
            color: 'white',
            marginBottom: '0.5rem',
          }}>
            {lesson.title}
          </div>
          <div style={{
            fontFamily: "'Comic Neue', cursive",
            fontWeight: 700,
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.7)',
            maxWidth: 300,
            textAlign: 'center',
            lineHeight: 1.4,
          }}>
            🎬 2-minute science animation
          </div>
        </div>

        {/* CC badge */}
        <div style={{
          position: 'absolute',
          bottom: 8,
          left: 8,
          background: 'rgba(0,0,0,0.7)',
          color: 'white',
          padding: '2px 8px',
          borderRadius: 4,
          fontFamily: "'Comic Neue', cursive",
          fontWeight: 700,
          fontSize: '0.7rem',
        }}>
          CC Closed Captions ON
        </div>

        {/* Progress bar */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 4,
          background: 'rgba(255,255,255,0.2)',
        }}>
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: watched ? '100%' : `${((5 - countdown) / 5) * 100}%` }}
            style={{ height: '100%', background: lesson.color }}
          />
        </div>
      </div>

      {/* Fun fact card */}
      <div style={{
        background: lesson.bgColor,
        border: '3px solid #3D2B1F',
        borderRadius: 16,
        padding: '1rem',
        marginBottom: '1rem',
        boxShadow: '4px 4px 0 #3D2B1F',
        display: 'flex',
        gap: '0.75rem',
        alignItems: 'flex-start',
      }}>
        <img src={OWL_URL} alt="Professor Hoot" style={{ width: 60, height: 60, objectFit: 'contain', flexShrink: 0 }} />
        <div>
          <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.85rem', color: '#3D2B1F', marginBottom: '0.25rem' }}>
            Professor Hoot says:
          </div>
          <div style={{
            fontFamily: "'Comic Neue', cursive",
            fontWeight: 700,
            fontSize: '1rem',
            color: '#3D2B1F',
            lineHeight: 1.4,
          }}>
            "{lesson.hookFact}"
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!watched}
        className={`btn-cartoon ${watched ? 'btn-cartoon-yellow' : ''}`}
        style={{
          width: '100%',
          fontSize: '1.1rem',
          padding: '0.75rem',
          opacity: watched ? 1 : 0.6,
          background: watched ? undefined : '#C8C0B0',
          color: watched ? undefined : '#888',
        }}
      >
        {watched ? '✅ Got it! Take the Check-In →' : `⏳ Loading... (${countdown}s)`}
      </button>
    </motion.div>
  );
}

function QuizPhase({
  lesson,
  isBossBattle,
  onComplete,
}: {
  lesson: any;
  isBossBattle: boolean;
  onComplete: (score: number) => void;
}) {
  const questions = isBossBattle ? lesson.bossQuiz : lesson.miniQuiz;
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const { playCorrect, playWrong, vibrateCorrect, vibrateWrong } = useSounds();

  const question = questions[currentQ];

  const handleAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);

    if (index === question.correctIndex) {
      playCorrect();
      vibrateCorrect();
      setScore(prev => prev + 1);
    } else {
      playWrong();
      vibrateWrong();
    }

    setTimeout(() => {
      setShowExplanation(false);
      setSelectedAnswer(null);
      if (currentQ < questions.length - 1) {
        setCurrentQ(prev => prev + 1);
      } else {
        const finalScore = Math.min(3, Math.round(((score + (index === question.correctIndex ? 1 : 0)) / questions.length) * 3) + 1);
        onComplete(finalScore);
      }
    }, 2500);
  }, [selectedAnswer, question, currentQ, questions.length, score, playCorrect, playWrong, vibrateCorrect, vibrateWrong, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ padding: '1rem' }}
    >
      {/* Boss Battle header */}
      {isBossBattle && (
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          style={{
            background: '#1A1A2E',
            border: '3px solid #FFD700',
            borderRadius: 14,
            padding: '0.75rem',
            marginBottom: '1rem',
            textAlign: 'center',
            boxShadow: '4px 4px 0 #3D2B1F',
          }}
        >
          <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.2rem', color: '#FFD700' }}>
            ⚔️ BOSS BATTLE!
          </div>
          <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)' }}>
            Answer all 5 questions to earn your badge!
          </div>
        </motion.div>
      )}

      {/* Progress */}
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.85rem', color: '#3D2B1F' }}>
            Question {currentQ + 1} of {questions.length}
          </span>
          <span style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.85rem', color: '#52B788' }}>
            ✅ {score} correct
          </span>
        </div>
        <div className="progress-cartoon">
          <motion.div
            className="progress-cartoon-fill"
            style={{ background: lesson.color }}
            animate={{ width: `${((currentQ) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <div style={{
            background: lesson.bgColor,
            border: '3px solid #3D2B1F',
            borderRadius: 16,
            padding: '1rem',
            marginBottom: '1rem',
            boxShadow: '4px 4px 0 #3D2B1F',
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem', textAlign: 'center' }}>{question.emoji}</div>
            <div style={{
              fontFamily: "'Fredoka One', sans-serif",
              fontSize: '1.1rem',
              color: '#3D2B1F',
              textAlign: 'center',
              lineHeight: 1.3,
            }}>
              {question.question}
            </div>
          </div>

          {/* Options */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {question.options.map((opt: string, i: number) => (
              <motion.button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selectedAnswer !== null}
                whileHover={selectedAnswer === null ? { x: 4 } : {}}
                whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                className={`quiz-option ${
                  selectedAnswer !== null
                    ? i === question.correctIndex
                      ? 'quiz-option-correct'
                      : selectedAnswer === i
                      ? 'quiz-option-wrong'
                      : ''
                    : ''
                }`}
              >
                <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>
                  {selectedAnswer !== null
                    ? i === question.correctIndex ? '✅' : selectedAnswer === i ? '❌' : '⭕'
                    : ['🅐', '🅑', '🅒', '🅓'][i] || '⭕'}
                </span>
                <span style={{ flex: 1 }}>{opt}</span>
              </motion.button>
            ))}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                style={{
                  marginTop: '0.75rem',
                  background: selectedAnswer === question.correctIndex ? '#C8F7C5' : '#FFE0E0',
                  border: '2px solid #3D2B1F',
                  borderRadius: 12,
                  padding: '0.75rem',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  fontFamily: "'Comic Neue', cursive",
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#3D2B1F',
                  lineHeight: 1.4,
                }}>
                  {selectedAnswer === question.correctIndex ? '🎉 ' : '💡 '}
                  {question.explanation}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

function VictoryPhase({
  lesson,
  stars,
  xpEarned,
  onContinue,
}: {
  lesson: any;
  stars: number;
  xpEarned: number;
  onContinue: () => void;
}) {
  const [, navigate] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{ padding: '1.5rem', textAlign: 'center' }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
        style={{ fontSize: '4rem', marginBottom: '0.5rem' }}
      >
        🏆
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 style={{
          fontFamily: "'Fredoka One', sans-serif",
          fontSize: '2rem',
          color: '#3D2B1F',
          margin: '0 0 0.25rem',
        }}>
          Lesson Complete!
        </h2>
        <p style={{
          fontFamily: "'Comic Neue', cursive",
          fontWeight: 700,
          color: '#5D4037',
          margin: '0 0 1.5rem',
        }}>
          You finished: {lesson.title}
        </p>
      </motion.div>

      {/* Stars */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}
      >
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.7 + i * 0.15, type: 'spring', stiffness: 400 }}
            style={{ fontSize: '2.5rem', opacity: i < stars ? 1 : 0.2 }}
          >
            ⭐
          </motion.span>
        ))}
      </motion.div>

      {/* Badge earned */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.9 }}
        style={{
          background: `${lesson.color}22`,
          border: `3px solid ${lesson.color}`,
          borderRadius: 20,
          padding: '1.25rem',
          marginBottom: '1.5rem',
          boxShadow: '4px 4px 0 #3D2B1F',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{lesson.badgeEmoji}</div>
        <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.2rem', color: '#3D2B1F' }}>
          New Badge Earned!
        </div>
        <div style={{
          background: lesson.color,
          color: 'white',
          border: '2px solid #3D2B1F',
          borderRadius: 100,
          padding: '4px 16px',
          display: 'inline-block',
          fontFamily: "'Fredoka One', sans-serif",
          fontSize: '0.9rem',
          marginTop: '0.5rem',
          boxShadow: '2px 2px 0 #3D2B1F',
        }}>
          🏅 {lesson.badgeName}
        </div>
      </motion.div>

      {/* XP reward */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.1, type: 'spring' }}
        style={{
          background: '#FFD700',
          border: '3px solid #3D2B1F',
          borderRadius: 14,
          padding: '0.75rem',
          marginBottom: '1.5rem',
          boxShadow: '4px 4px 0 #3D2B1F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{ fontSize: '1.5rem' }}>⚡</span>
        <span style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.2rem', color: '#3D2B1F' }}>
          +{xpEarned} XP Earned!
        </span>
      </motion.div>

      {/* Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <button
          onClick={onContinue}
          className="btn-cartoon btn-cartoon-yellow"
          style={{ fontSize: '1.1rem', padding: '0.75rem' }}
        >
          🗺️ Back to Map
        </button>
        <button
          onClick={() => navigate('/locker')}
          className="btn-cartoon btn-cartoon-blue"
          style={{ fontSize: '1rem', padding: '0.6rem' }}
        >
          🏆 View My Badge Locker
        </button>
      </div>
    </motion.div>
  );
}

function GameWrapper({ lesson, onComplete }: { lesson: any; onComplete: (stars: number) => void }) {
  const gameMap: Record<string, React.ComponentType<{ onComplete: (score: number) => void }>> = {
    'bubble-pop': BubblePop,
    'particle-sorter': ParticleSorter,
    'thermostat-hero': ThermostatHero,
    'potion-lab': PotionLab,
    'space-rover': SpaceRover,
    'snail-race': SnailRace,
    'drop-test': DropTest,
    'gokart-builder': GoKartBuilder,
  };

  const GameComponent = gameMap[lesson.gameType];
  if (!GameComponent) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎮</div>
        <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.2rem', color: '#3D2B1F', marginBottom: '1rem' }}>
          {lesson.gameTitle}
        </div>
        <button onClick={() => onComplete(3)} className="btn-cartoon btn-cartoon-green" style={{ fontSize: '1rem' }}>
          Complete Game →
        </button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Game header */}
      <div style={{
        background: lesson.color,
        padding: '0.6rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
      }}>
        <span style={{ fontSize: '1.3rem' }}>🎮</span>
        <span style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1rem', color: 'white' }}>
          {lesson.gameTitle}
        </span>
      </div>
      <div style={{ position: 'relative' }}>
        <GameComponent onComplete={onComplete} />
      </div>
    </motion.div>
  );
}

export default function LessonPage() {
  const { id } = useParams<{ id: string }>();
  const [, navigate] = useLocation();
  const lesson = getLessonById(id || '');
  const unit = lesson ? getUnitById(lesson.unitId) : null;
  const { completeLesson, isLessonUnlocked } = useGame();
  const { playLevelUp } = useSounds();

  const [phase, setPhase] = useState<Phase>('hook');
  const [miniQuizScore, setMiniQuizScore] = useState(0);
  const [gameScore, setGameScore] = useState(0);
  const [bossScore, setBossScore] = useState(0);
  const [finalStars, setFinalStars] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  if (!lesson || !unit) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.5rem', color: '#3D2B1F' }}>
          Lesson not found! 😕
        </div>
        <button onClick={() => navigate('/')} className="btn-cartoon btn-cartoon-yellow" style={{ marginTop: '1rem' }}>
          Back to Map
        </button>
      </div>
    );
  }

  if (!isLessonUnlocked(lesson.id)) {
    return (
      <div className="parchment-bg" style={{ minHeight: '100vh' }}>
        <TopNav />
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔒</div>
          <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.5rem', color: '#3D2B1F', marginBottom: '0.5rem' }}>
            Lesson Locked!
          </div>
          <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, color: '#5D4037', marginBottom: '1.5rem' }}>
            Complete the previous lesson first to unlock this one!
          </div>
          <button onClick={() => navigate('/')} className="btn-cartoon btn-cartoon-yellow">
            🗺️ Back to Map
          </button>
        </div>
      </div>
    );
  }

  const handleHookComplete = () => setPhase('mini-quiz');

  const handleMiniQuizComplete = (score: number) => {
    setMiniQuizScore(score);
    setPhase('game');
  };

  const handleGameComplete = (score: number) => {
    setGameScore(score);
    setPhase('boss-battle');
  };

  const handleBossComplete = (score: number) => {
    setBossScore(score);
    const stars = Math.min(3, Math.round((miniQuizScore + score + gameScore) / 3));
    setFinalStars(stars);
    completeLesson(lesson.id, stars, lesson.xpReward);
    playLevelUp();
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
    setPhase('victory');
  };

  const handleVictoryContinue = () => navigate('/');

  return (
    <div className="parchment-bg" style={{ minHeight: '100vh' }}>
      <TopNav />
      <Confetti active={showConfetti} count={60} />

      {/* Lesson header */}
      <div style={{
        background: lesson.color,
        borderBottom: '4px solid #3D2B1F',
        padding: '0.75rem 1rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
      }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'rgba(255,255,255,0.3)',
            border: '2px solid rgba(255,255,255,0.6)',
            borderRadius: 10,
            padding: '4px 10px',
            color: 'white',
            fontFamily: "'Fredoka One', sans-serif",
            fontSize: '0.85rem',
            cursor: 'pointer',
          }}
        >
          ← Map
        </button>
        <span style={{ fontSize: '1.5rem' }}>{lesson.emoji}</span>
        <div>
          <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1rem', color: 'white', lineHeight: 1.1 }}>
            {lesson.title}
          </div>
          <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.75rem', color: 'rgba(255,255,255,0.8)' }}>
            Unit {unit.number} · {unit.theme}
          </div>
        </div>
      </div>

      {/* Phase indicator */}
      <PhaseIndicator phase={phase} lessonColor={lesson.color} />

      {/* Content */}
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <div style={{
          background: '#FFF8E7',
          border: '3px solid #3D2B1F',
          borderRadius: '0 0 20px 20px',
          boxShadow: '0 6px 0 #3D2B1F',
          overflow: 'hidden',
          margin: '0 0.5rem',
        }}>
          <AnimatePresence mode="wait">
            {phase === 'hook' && (
              <motion.div key="hook" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <HookPhase lesson={lesson} onNext={handleHookComplete} />
              </motion.div>
            )}
            {phase === 'mini-quiz' && (
              <motion.div key="mini-quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <div style={{ padding: '0.75rem 1rem 0', fontFamily: "'Fredoka One', sans-serif", fontSize: '1rem', color: '#3D2B1F' }}>
                  ❓ Quick Check-In — 3 Questions!
                </div>
                <QuizPhase lesson={lesson} isBossBattle={false} onComplete={handleMiniQuizComplete} />
              </motion.div>
            )}
            {phase === 'game' && (
              <motion.div key="game" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <GameWrapper lesson={lesson} onComplete={handleGameComplete} />
              </motion.div>
            )}
            {phase === 'boss-battle' && (
              <motion.div key="boss" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <QuizPhase lesson={lesson} isBossBattle={true} onComplete={handleBossComplete} />
              </motion.div>
            )}
            {phase === 'victory' && (
              <motion.div key="victory" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <VictoryPhase
                  lesson={lesson}
                  stars={finalStars}
                  xpEarned={lesson.xpReward}
                  onContinue={handleVictoryContinue}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
