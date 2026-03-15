// ============================================================
// SNAIL RACE GAME — Unit 2, Lesson 2: Comparing Speed
// Time animals and rank them on a podium
// Teaches: Speed is distance over time
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from '@/hooks/useSounds';

interface SnailRaceProps {
  onComplete: (score: number) => void;
}

interface Racer {
  id: string;
  emoji: string;
  name: string;
  speed: number; // pixels per frame
  x: number;
  finished: boolean;
  finishTime: number | null;
}

const RACERS_DATA = [
  { id: 'cheetah', emoji: '🐆', name: 'Cheetah', speed: 8.5 },
  { id: 'rabbit', emoji: '🐇', name: 'Rabbit', speed: 5.2 },
  { id: 'turtle', emoji: '🐢', name: 'Turtle', speed: 1.8 },
  { id: 'snail', emoji: '🐌', name: 'Snail', speed: 0.6 },
];

interface RankQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const RANK_QUESTIONS: RankQuestion[] = [
  {
    question: 'Which animal finished FIRST (fastest)?',
    options: ['🐌 Snail', '🐢 Turtle', '🐇 Rabbit', '🐆 Cheetah'],
    correctIndex: 3,
    explanation: 'The Cheetah is the fastest land animal — it can run up to 70 mph!',
  },
  {
    question: 'Which animal finished LAST (slowest)?',
    options: ['🐆 Cheetah', '🐇 Rabbit', '🐢 Turtle', '🐌 Snail'],
    correctIndex: 3,
    explanation: 'The Snail is the slowest — it moves about 0.03 mph, much slower than walking!',
  },
  {
    question: 'How do we know which animal is faster?',
    options: ['The bigger one is faster', 'The one that finishes first is faster', 'The heavier one is faster'],
    correctIndex: 1,
    explanation: 'The one that covers the same distance in LESS time is faster! That is the definition of speed.',
  },
];

export default function SnailRace({ onComplete }: SnailRaceProps) {
  const [phase, setPhase] = useState<'ready' | 'racing' | 'results' | 'quiz'>('ready');
  const [racers, setRacers] = useState<Racer[]>(
    RACERS_DATA.map(r => ({ ...r, x: 0, finished: false, finishTime: null }))
  );
  const [elapsedTime, setElapsedTime] = useState(0);
  const [finishOrder, setFinishOrder] = useState<string[]>([]);
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startTimeRef = useRef<number>(0);
  const { playCorrect, playWrong, playLevelUp } = useSounds();

  const FINISH_LINE = 85; // percent

  const startRace = useCallback(() => {
    setPhase('racing');
    startTimeRef.current = Date.now();
  }, []);

  // Race animation
  useEffect(() => {
    if (phase !== 'racing') return;
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      setElapsedTime(elapsed);

      setRacers(prev => {
        const updated = prev.map(r => {
          if (r.finished) return r;
          const newX = Math.min(FINISH_LINE, r.x + r.speed * 0.3);
          const justFinished = newX >= FINISH_LINE && !r.finished;
          if (justFinished) {
            setFinishOrder(order => [...order, r.id]);
          }
          return {
            ...r,
            x: newX,
            finished: newX >= FINISH_LINE,
            finishTime: justFinished ? elapsed : r.finishTime,
          };
        });

        if (updated.every(r => r.finished)) {
          clearInterval(interval);
          setTimeout(() => setPhase('results'), 500);
        }

        return updated;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [phase]);

  const handleQuizAnswer = useCallback((index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    const question = RANK_QUESTIONS[quizIndex];
    if (index === question.correctIndex) {
      playCorrect();
      setQuizScore(prev => prev + 1);
    } else {
      playWrong();
    }
    setTimeout(() => {
      setSelectedAnswer(null);
      if (quizIndex < RANK_QUESTIONS.length - 1) {
        setQuizIndex(prev => prev + 1);
      } else {
        setGameOver(true);
      }
    }, 2000);
  }, [quizIndex, selectedAnswer, playCorrect, playWrong]);

  const finalScore = Math.min(3, quizScore + 1);

  const podiumOrder = finishOrder.slice(0, 3);
  const podiumEmojis = ['🥇', '🥈', '🥉'];

  return (
    <div style={{ position: 'relative' }}>
      {/* HUD */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        background: '#E8FFF2',
        borderBottom: '3px solid #3D2B1F',
        fontFamily: "'Fredoka One', sans-serif",
      }}>
        <span style={{ fontSize: '1rem', color: '#3D2B1F' }}>🏁 Great Snail Race</span>
        {phase === 'racing' && (
          <span style={{ fontSize: '1rem', color: '#52B788' }}>⏱️ {elapsedTime.toFixed(1)}s</span>
        )}
        {phase === 'quiz' && (
          <span style={{ fontSize: '1rem', color: '#52B788' }}>❓ {quizIndex + 1}/{RANK_QUESTIONS.length}</span>
        )}
      </div>

      <div style={{ background: '#E8FFF2', padding: '0.75rem', minHeight: 280 }}>
        {/* READY phase */}
        {phase === 'ready' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: 'center', padding: '1.5rem' }}
          >
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🏁</div>
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.3rem', color: '#3D2B1F', marginBottom: '0.5rem' }}>
              The Great Animal Race!
            </div>
            <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, color: '#5D4037', marginBottom: '1rem' }}>
              Watch the race, then answer questions about speed!
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '1.5rem', fontSize: '2rem' }}>
              {RACERS_DATA.map(r => (
                <div key={r.id} style={{ textAlign: 'center' }}>
                  <div>{r.emoji}</div>
                  <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.7rem', color: '#3D2B1F' }}>{r.name}</div>
                </div>
              ))}
            </div>
            <button onClick={startRace} className="btn-cartoon btn-cartoon-green" style={{ fontSize: '1.2rem', padding: '0.75rem 2rem' }}>
              🏁 START RACE!
            </button>
          </motion.div>
        )}

        {/* RACING phase */}
        {(phase === 'racing' || phase === 'results') && (
          <div>
            {/* Track */}
            <div style={{
              background: '#4CAF50',
              border: '3px solid #3D2B1F',
              borderRadius: 14,
              padding: '0.5rem',
              marginBottom: '0.5rem',
              boxShadow: '3px 3px 0 #3D2B1F',
            }}>
              {/* Finish line */}
              <div style={{ position: 'relative' }}>
                <div style={{
                  position: 'absolute',
                  left: `${FINISH_LINE}%`,
                  top: 0,
                  bottom: 0,
                  width: 3,
                  background: 'repeating-linear-gradient(180deg, black 0px, black 8px, white 8px, white 16px)',
                  zIndex: 5,
                }} />
                <div style={{
                  position: 'absolute',
                  left: `${FINISH_LINE + 1}%`,
                  top: 0,
                  fontFamily: "'Fredoka One', sans-serif",
                  fontSize: '0.7rem',
                  color: '#3D2B1F',
                }}>
                  🏁
                </div>

                {racers.map((racer, i) => (
                  <div
                    key={racer.id}
                    style={{
                      height: 44,
                      background: i % 2 === 0 ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
                      borderRadius: 8,
                      marginBottom: 4,
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Lane label */}
                    <div style={{
                      position: 'absolute',
                      left: 4,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      fontFamily: "'Fredoka One', sans-serif",
                      fontSize: '0.7rem',
                      color: 'white',
                      zIndex: 2,
                    }}>
                      {racer.name}
                    </div>

                    {/* Racer */}
                    <motion.div
                      animate={{ x: `${racer.x * 0.85}%` }}
                      transition={{ type: 'tween', ease: 'linear', duration: 0.05 }}
                      style={{
                        position: 'absolute',
                        left: '8%',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontSize: '1.6rem',
                        zIndex: 3,
                        filter: racer.finished ? 'brightness(1.5)' : 'none',
                      }}
                    >
                      {racer.emoji}
                    </motion.div>

                    {/* Finish badge */}
                    {racer.finished && racer.finishTime && (
                      <div style={{
                        position: 'absolute',
                        right: 8,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        fontFamily: "'Fredoka One', sans-serif",
                        fontSize: '0.75rem',
                        color: '#FFD700',
                        background: 'rgba(0,0,0,0.5)',
                        padding: '2px 6px',
                        borderRadius: 100,
                      }}>
                        {racer.finishTime.toFixed(1)}s
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Results */}
            {phase === 'results' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1rem', color: '#3D2B1F', marginBottom: '0.5rem', textAlign: 'center' }}>
                  🏆 Final Standings!
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                  {podiumOrder.map((id, i) => {
                    const racer = racers.find(r => r.id === id);
                    return racer ? (
                      <motion.div
                        key={id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.2 }}
                        style={{
                          textAlign: 'center',
                          background: '#FFF8E7',
                          border: '2px solid #3D2B1F',
                          borderRadius: 12,
                          padding: '0.5rem 0.75rem',
                          boxShadow: '3px 3px 0 #3D2B1F',
                        }}
                      >
                        <div style={{ fontSize: '1.5rem' }}>{podiumEmojis[i]}</div>
                        <div style={{ fontSize: '1.5rem' }}>{racer.emoji}</div>
                        <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.7rem', color: '#3D2B1F' }}>{racer.name}</div>
                        <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.65rem', color: '#888' }}>
                          {racer.finishTime?.toFixed(1)}s
                        </div>
                      </motion.div>
                    ) : null;
                  })}
                </div>
                <button
                  onClick={() => setPhase('quiz')}
                  className="btn-cartoon btn-cartoon-green"
                  style={{ width: '100%', fontSize: '1rem' }}
                >
                  Answer Questions! →
                </button>
              </motion.div>
            )}
          </div>
        )}

        {/* QUIZ phase */}
        {phase === 'quiz' && !gameOver && (
          <motion.div
            key={quizIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.1rem', color: '#3D2B1F', marginBottom: '1rem' }}>
              {RANK_QUESTIONS[quizIndex].question}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {RANK_QUESTIONS[quizIndex].options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleQuizAnswer(i)}
                  className={`quiz-option ${
                    selectedAnswer !== null
                      ? i === RANK_QUESTIONS[quizIndex].correctIndex
                        ? 'quiz-option-correct'
                        : selectedAnswer === i
                        ? 'quiz-option-wrong'
                        : ''
                      : ''
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  <span style={{ fontSize: '1.2rem' }}>
                    {selectedAnswer !== null
                      ? i === RANK_QUESTIONS[quizIndex].correctIndex ? '✅' : selectedAnswer === i ? '❌' : '⭕'
                      : '⭕'}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
            {selectedAnswer !== null && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
                  marginTop: '0.75rem',
                  background: selectedAnswer === RANK_QUESTIONS[quizIndex].correctIndex ? '#C8F7C5' : '#FFE0E0',
                  border: '2px solid #3D2B1F',
                  borderRadius: 12,
                  padding: '0.75rem',
                  fontFamily: "'Comic Neue', cursive",
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  color: '#3D2B1F',
                }}
              >
                🔬 {RANK_QUESTIONS[quizIndex].explanation}
              </motion.div>
            )}
          </motion.div>
        )}
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
              background: 'rgba(232,255,242,0.95)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              borderRadius: 16,
              zIndex: 10,
            }}
          >
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} style={{ fontSize: '3rem' }}>🏆</motion.div>
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.5rem', color: '#3D2B1F' }}>Speed Champion!</div>
            <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, color: '#5D4037' }}>
              Quiz score: {quizScore}/{RANK_QUESTIONS.length}
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }}
                  style={{ fontSize: '1.8rem', opacity: i < finalScore ? 1 : 0.25 }}>⭐</motion.span>
              ))}
            </div>
            <button onClick={() => onComplete(finalScore)} className="btn-cartoon btn-cartoon-green" style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
              Continue! →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
