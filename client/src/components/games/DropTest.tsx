// ============================================================
// DROP TEST GAME — Unit 2, Lesson 3: Gravity's Pull
// Predict which items fall to Earth in vacuum vs air
// Teaches: Gravity pulls everything; air resistance affects speed
// ============================================================

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from '@/hooks/useSounds';

interface DropTestProps {
  onComplete: (score: number) => void;
}

interface DropChallenge {
  id: number;
  item1: { emoji: string; name: string; heavy: boolean };
  item2: { emoji: string; name: string; heavy: boolean };
  environment: 'vacuum' | 'air';
  question: string;
  answer: 'same' | 'item1' | 'item2';
  explanation: string;
}

const CHALLENGES: DropChallenge[] = [
  {
    id: 1,
    item1: { emoji: '🪶', name: 'Feather', heavy: false },
    item2: { emoji: '🎳', name: 'Bowling Ball', heavy: true },
    environment: 'vacuum',
    question: 'In a VACUUM (no air), which hits the ground first?',
    answer: 'same',
    explanation: 'In a vacuum, they fall at the SAME speed! Without air, gravity pulls all objects equally regardless of weight.',
  },
  {
    id: 2,
    item1: { emoji: '🪶', name: 'Feather', heavy: false },
    item2: { emoji: '🎳', name: 'Bowling Ball', heavy: true },
    environment: 'air',
    question: 'In AIR, which hits the ground first?',
    answer: 'item2',
    explanation: 'The bowling ball lands first! Air resistance slows the feather more because of its large surface area.',
  },
  {
    id: 3,
    item1: { emoji: '🍎', name: 'Apple', heavy: true },
    item2: { emoji: '🍊', name: 'Orange', heavy: true },
    environment: 'air',
    question: 'In AIR, which hits the ground first?',
    answer: 'same',
    explanation: 'They fall at almost the same speed! Both are similar size and weight, so air resistance affects them equally.',
  },
  {
    id: 4,
    item1: { emoji: '📄', name: 'Flat Paper', heavy: false },
    item2: { emoji: '📦', name: 'Paper Ball', heavy: false },
    environment: 'air',
    question: 'Same paper — flat vs. crumpled ball. Which is faster in AIR?',
    answer: 'item2',
    explanation: 'The paper ball is faster! Crumpling reduces surface area, so less air resistance slows it down.',
  },
  {
    id: 5,
    item1: { emoji: '🏀', name: 'Basketball', heavy: true },
    item2: { emoji: '⚽', name: 'Soccer Ball', heavy: true },
    environment: 'vacuum',
    question: 'In a VACUUM, which hits the ground first?',
    answer: 'same',
    explanation: 'Same speed in a vacuum! Without air resistance, all objects fall at the same rate due to gravity.',
  },
];

export default function DropTest({ onComplete }: DropTestProps) {
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [dropping, setDropping] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { playCorrect, playWrong } = useSounds();

  const challenge = CHALLENGES[challengeIndex];

  const handleAnswer = useCallback((answer: string) => {
    if (selectedAnswer || dropping) return;
    setDropping(true);
    setSelectedAnswer(answer);

    setTimeout(() => {
      if (answer === challenge.answer) {
        playCorrect();
        setScore(prev => prev + 1);
      } else {
        playWrong();
      }

      setTimeout(() => {
        setDropping(false);
        setSelectedAnswer(null);
        if (challengeIndex < CHALLENGES.length - 1) {
          setChallengeIndex(prev => prev + 1);
        } else {
          setGameOver(true);
        }
      }, 2500);
    }, 1500);
  }, [selectedAnswer, dropping, challenge, challengeIndex, playCorrect, playWrong]);

  const finalScore = Math.min(3, Math.round((score / CHALLENGES.length) * 3) + (score >= 3 ? 1 : 0));

  const isCorrect = selectedAnswer === challenge?.answer;

  // Determine fall speeds for animation
  const getItem1Duration = () => {
    if (!dropping) return 0;
    if (challenge.environment === 'vacuum') return 1.5;
    if (!challenge.item1.heavy) return 2.5; // slow (feather, paper)
    return 1.5;
  };

  const getItem2Duration = () => {
    if (!dropping) return 0;
    if (challenge.environment === 'vacuum') return 1.5;
    if (!challenge.item2.heavy) return 2.5;
    return 1.5;
  };

  return (
    <div style={{ position: 'relative' }}>
      {/* HUD */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        background: '#FFE8E8',
        borderBottom: '3px solid #3D2B1F',
        fontFamily: "'Fredoka One', sans-serif",
      }}>
        <span style={{ fontSize: '1rem', color: '#3D2B1F' }}>🍎 Test {challengeIndex + 1}/{CHALLENGES.length}</span>
        <span style={{ fontSize: '1rem', color: '#52B788' }}>✅ {score} correct</span>
      </div>

      <div style={{ padding: '0.75rem', background: '#FFF8E7' }}>
        {/* Environment badge */}
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: challenge?.environment === 'vacuum' ? '#1A237E' : '#E3F2FD',
          border: '2px solid #3D2B1F',
          borderRadius: 100,
          padding: '4px 12px',
          marginBottom: '0.75rem',
          boxShadow: '2px 2px 0 #3D2B1F',
        }}>
          <span style={{ fontSize: '1rem' }}>{challenge?.environment === 'vacuum' ? '🌌' : '🌍'}</span>
          <span style={{
            fontFamily: "'Fredoka One', sans-serif",
            fontSize: '0.85rem',
            color: challenge?.environment === 'vacuum' ? 'white' : '#1565C0',
          }}>
            {challenge?.environment === 'vacuum' ? 'VACUUM (No Air!)' : 'Normal Air'}
          </span>
        </div>

        {/* Question */}
        <div style={{
          fontFamily: "'Fredoka One', sans-serif",
          fontSize: '1rem',
          color: '#3D2B1F',
          marginBottom: '1rem',
          background: '#E3F7FF',
          border: '2px solid #3D2B1F',
          borderRadius: 12,
          padding: '0.75rem',
          boxShadow: '3px 3px 0 #3D2B1F',
        }}>
          {challenge?.question}
        </div>

        {/* Drop visualization */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem',
          height: 160,
          background: challenge?.environment === 'vacuum'
            ? 'radial-gradient(ellipse at center, #1a1a4e, #0A0E27)'
            : 'linear-gradient(180deg, #87CEEB, #E3F7FF)',
          border: '3px solid #3D2B1F',
          borderRadius: 14,
          overflow: 'hidden',
          boxShadow: '3px 3px 0 #3D2B1F',
          position: 'relative',
        }}>
          {/* Ground */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 20,
            background: '#795548',
            borderTop: '2px solid #3D2B1F',
          }} />

          {/* Item 1 */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <motion.div
              animate={dropping ? { y: 120 } : { y: 0 }}
              transition={{ duration: getItem1Duration(), ease: 'easeIn' }}
              style={{ position: 'absolute', top: 10, fontSize: '2.5rem' }}
            >
              {challenge?.item1.emoji}
            </motion.div>
            <div style={{
              position: 'absolute',
              bottom: 22,
              fontFamily: "'Fredoka One', sans-serif",
              fontSize: '0.7rem',
              color: challenge?.environment === 'vacuum' ? 'white' : '#3D2B1F',
            }}>
              {challenge?.item1.name}
            </div>
          </div>

          {/* Divider */}
          <div style={{ width: 2, background: 'rgba(255,255,255,0.3)', margin: '10px 0' }} />

          {/* Item 2 */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', position: 'relative' }}>
            <motion.div
              animate={dropping ? { y: 120 } : { y: 0 }}
              transition={{ duration: getItem2Duration(), ease: 'easeIn' }}
              style={{ position: 'absolute', top: 10, fontSize: '2.5rem' }}
            >
              {challenge?.item2.emoji}
            </motion.div>
            <div style={{
              position: 'absolute',
              bottom: 22,
              fontFamily: "'Fredoka One', sans-serif",
              fontSize: '0.7rem',
              color: challenge?.environment === 'vacuum' ? 'white' : '#3D2B1F',
            }}>
              {challenge?.item2.name}
            </div>
          </div>
        </div>

        {/* Answer buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {[
            { value: 'item1', label: `${challenge?.item1.emoji} ${challenge?.item1.name} lands first` },
            { value: 'same', label: '🤝 They land at the SAME time' },
            { value: 'item2', label: `${challenge?.item2.emoji} ${challenge?.item2.name} lands first` },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => handleAnswer(opt.value)}
              disabled={!!selectedAnswer}
              className={`quiz-option ${
                selectedAnswer
                  ? opt.value === challenge?.answer
                    ? 'quiz-option-correct'
                    : selectedAnswer === opt.value
                    ? 'quiz-option-wrong'
                    : ''
                  : ''
              }`}
            >
              <span style={{ fontSize: '1.2rem' }}>
                {selectedAnswer
                  ? opt.value === challenge?.answer ? '✅' : selectedAnswer === opt.value ? '❌' : '⭕'
                  : '⭕'}
              </span>
              {opt.label}
            </button>
          ))}
        </div>

        {/* Explanation */}
        <AnimatePresence>
          {selectedAnswer && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                marginTop: '0.75rem',
                background: isCorrect ? '#C8F7C5' : '#FFE0E0',
                border: '2px solid #3D2B1F',
                borderRadius: 12,
                padding: '0.75rem',
                fontFamily: "'Comic Neue', cursive",
                fontWeight: 700,
                fontSize: '0.85rem',
                color: '#3D2B1F',
              }}
            >
              {isCorrect ? '🎉 Correct! ' : '💡 Not quite — '}{challenge?.explanation}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Game Over */}
      <AnimatePresence>
        {gameOver && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(253,246,227,0.95)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              borderRadius: 16,
              zIndex: 10,
            }}
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} style={{ fontSize: '3rem' }}>🍎</motion.div>
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.5rem', color: '#3D2B1F' }}>Gravity Guru!</div>
            <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, color: '#5D4037' }}>
              {score}/{CHALLENGES.length} correct predictions!
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }}
                  style={{ fontSize: '1.8rem', opacity: i < finalScore ? 1 : 0.25 }}>⭐</motion.span>
              ))}
            </div>
            <button onClick={() => onComplete(finalScore)} className="btn-cartoon btn-cartoon-red" style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
              Continue! →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
