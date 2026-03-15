// ============================================================
// BUBBLE POP GAME — Unit 1, Lesson 1: The Air Around Us
// Click bubbles to pop them and move objects with air pressure
// Teaches: Air has mass and takes up space
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from '@/hooks/useSounds';

interface Bubble {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  speed: number;
  popped: boolean;
}

interface BubblePopProps {
  onComplete: (score: number) => void;
}

const BUBBLE_COLORS = ['#4FC3F7', '#81D4FA', '#B3E5FC', '#E1F5FE', '#80DEEA', '#A5F3FC'];
const TARGET_POPS = 15;

export default function BubblePop({ onComplete }: BubblePopProps) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [boatX, setBoatX] = useState(50);
  const [popEffects, setPopEffects] = useState<{ id: number; x: number; y: number }[]>([]);
  const nextId = useRef(0);
  const { playPop } = useSounds();
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Spawn bubbles
  const spawnBubble = useCallback(() => {
    const newBubble: Bubble = {
      id: nextId.current++,
      x: Math.random() * 85 + 5,
      y: 100,
      size: Math.random() * 30 + 25,
      color: BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)],
      speed: Math.random() * 0.8 + 0.4,
      popped: false,
    };
    setBubbles(prev => [...prev.slice(-20), newBubble]);
  }, []);

  // Float bubbles up
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setBubbles(prev =>
        prev
          .map(b => ({ ...b, y: b.y - b.speed }))
          .filter(b => b.y > -10 && !b.popped)
      );
    }, 50);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Spawn interval
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(spawnBubble, 800);
    return () => clearInterval(interval);
  }, [gameOver, spawnBubble]);

  // Timer
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Move boat based on score
  useEffect(() => {
    setBoatX(Math.min(85, (score / TARGET_POPS) * 80 + 5));
  }, [score]);

  // Check win
  useEffect(() => {
    if (score >= TARGET_POPS) {
      setGameOver(true);
    }
  }, [score]);

  const popBubble = useCallback((bubble: Bubble) => {
    if (bubble.popped || gameOver) return;
    playPop();
    setBubbles(prev => prev.filter(b => b.id !== bubble.id));
    setScore(prev => prev + 1);
    setPopEffects(prev => [...prev, { id: bubble.id, x: bubble.x, y: bubble.y }]);
    setTimeout(() => {
      setPopEffects(prev => prev.filter(e => e.id !== bubble.id));
    }, 500);
  }, [gameOver, playPop]);

  const finalScore = Math.min(3, Math.round((score / TARGET_POPS) * 3));

  return (
    <div>
      {/* HUD */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        background: '#E3F7FF',
        borderBottom: '3px solid #3D2B1F',
        fontFamily: "'Fredoka One', sans-serif",
      }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <span style={{ fontSize: '1rem', color: '#3D2B1F' }}>💨 Pops: {score}/{TARGET_POPS}</span>
          <span style={{ fontSize: '1rem', color: timeLeft <= 10 ? '#E74C3C' : '#3D2B1F' }}>
            ⏱️ {timeLeft}s
          </span>
        </div>
        <div style={{ fontSize: '0.9rem', color: '#5D4037', fontFamily: "'Comic Neue', cursive", fontWeight: 700 }}>
          Pop bubbles to push the boat! 🚢
        </div>
      </div>

      {/* Game Area */}
      <div
        ref={gameAreaRef}
        style={{
          position: 'relative',
          height: 280,
          background: 'linear-gradient(180deg, #87CEEB 0%, #87CEEB 60%, #4FC3F7 60%, #29B6F6 100%)',
          overflow: 'hidden',
          cursor: 'crosshair',
        }}
      >
        {/* Clouds */}
        <div style={{ position: 'absolute', top: 20, left: '10%', fontSize: '2rem', opacity: 0.7 }}>☁️</div>
        <div style={{ position: 'absolute', top: 10, left: '60%', fontSize: '1.5rem', opacity: 0.6 }}>☁️</div>
        <div style={{ position: 'absolute', top: 35, left: '35%', fontSize: '1.8rem', opacity: 0.5 }}>☁️</div>

        {/* Water label */}
        <div style={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Fredoka One', sans-serif",
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.7)',
        }}>
          ~ Water (Liquid) ~
        </div>

        {/* Boat */}
        <motion.div
          animate={{ x: `${boatX}%` }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          style={{
            position: 'absolute',
            bottom: 40,
            left: 0,
            fontSize: '2.5rem',
            filter: 'drop-shadow(2px 2px 0 rgba(0,0,0,0.3))',
          }}
        >
          🚢
        </motion.div>

        {/* Finish flag */}
        <div style={{
          position: 'absolute',
          bottom: 40,
          right: '8%',
          fontSize: '1.5rem',
        }}>
          🏁
        </div>

        {/* Bubbles */}
        {bubbles.map(bubble => (
          <motion.div
            key={bubble.id}
            onClick={() => popBubble(bubble)}
            style={{
              position: 'absolute',
              left: `${bubble.x}%`,
              top: `${bubble.y}%`,
              width: bubble.size,
              height: bubble.size,
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, white, ${bubble.color})`,
              border: '2px solid rgba(255,255,255,0.8)',
              boxShadow: `0 0 8px ${bubble.color}`,
              cursor: 'pointer',
              transform: 'translate(-50%, -50%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: bubble.size * 0.4,
            }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
          >
            💨
          </motion.div>
        ))}

        {/* Pop effects */}
        {popEffects.map(effect => (
          <motion.div
            key={effect.id}
            initial={{ scale: 0.5, opacity: 1 }}
            animate={{ scale: 2, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              left: `${effect.x}%`,
              top: `${effect.y}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: '1.5rem',
              pointerEvents: 'none',
            }}
          >
            ✨
          </motion.div>
        ))}

        {/* Progress bar overlay */}
        <div style={{
          position: 'absolute',
          top: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
        }}>
          <div className="progress-cartoon" style={{ height: 12 }}>
            <motion.div
              className="progress-cartoon-fill"
              style={{ background: 'linear-gradient(90deg, #4FC3F7, #0288D1)' }}
              animate={{ width: `${Math.min(100, (score / TARGET_POPS) * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Game Over Overlay */}
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
              gap: '1rem',
              borderRadius: 16,
              zIndex: 10,
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{ fontSize: '3rem' }}
            >
              {score >= TARGET_POPS ? '🎉' : score >= 8 ? '👍' : '💪'}
            </motion.div>
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.5rem', color: '#3D2B1F' }}>
              {score >= TARGET_POPS ? 'Amazing! You did it!' : `You popped ${score} bubbles!`}
            </div>
            <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, color: '#5D4037' }}>
              Air is real matter — it pushed your boat! 💨
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: i * 0.2 }}
                  style={{ fontSize: '1.8rem', opacity: i < finalScore ? 1 : 0.25 }}
                >
                  ⭐
                </motion.span>
              ))}
            </div>
            <button
              onClick={() => onComplete(finalScore)}
              className="btn-cartoon btn-cartoon-blue"
              style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}
            >
              Continue! →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
