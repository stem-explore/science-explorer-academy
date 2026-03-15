// ============================================================
// PARTICLE SORTER GAME — Unit 1, Lesson 2: Sorting States
// Drag items into solid/liquid/gas bins before belt speeds up
// Teaches: Three states of matter
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from '@/hooks/useSounds';

interface SortItem {
  id: number;
  emoji: string;
  label: string;
  state: 'solid' | 'liquid' | 'gas';
  x: number;
  sorted: boolean;
}

interface ParticleSorterProps {
  onComplete: (score: number) => void;
}

const ITEMS_DATA = [
  { emoji: '🪨', label: 'Rock', state: 'solid' as const },
  { emoji: '💧', label: 'Water', state: 'liquid' as const },
  { emoji: '💨', label: 'Air', state: 'gas' as const },
  { emoji: '🧊', label: 'Ice', state: 'solid' as const },
  { emoji: '🥛', label: 'Milk', state: 'liquid' as const },
  { emoji: '♨️', label: 'Steam', state: 'gas' as const },
  { emoji: '🍎', label: 'Apple', state: 'solid' as const },
  { emoji: '🍯', label: 'Honey', state: 'liquid' as const },
  { emoji: '☁️', label: 'Cloud', state: 'gas' as const },
  { emoji: '🪵', label: 'Wood', state: 'solid' as const },
  { emoji: '🧃', label: 'Juice', state: 'liquid' as const },
  { emoji: '💨', label: 'Wind', state: 'gas' as const },
];

const BIN_COLORS = {
  solid: { bg: '#795548', border: '#4E342E', label: '🪨 Solid', desc: 'Fixed shape' },
  liquid: { bg: '#1565C0', border: '#0D47A1', label: '💧 Liquid', desc: 'Flows freely' },
  gas: { bg: '#7B1FA2', border: '#4A148C', label: '💨 Gas', desc: 'Fills space' },
};

export default function ParticleSorter({ onComplete }: ParticleSorterProps) {
  const [items, setItems] = useState<SortItem[]>([]);
  const [score, setScore] = useState(0);
  const [mistakes, setMistakes] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ text: string; correct: boolean } | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);
  const { playCorrect, playWrong, playDrop } = useSounds();

  // Initialize items
  useEffect(() => {
    const shuffled = [...ITEMS_DATA].sort(() => Math.random() - 0.5);
    setItems(shuffled.map((item, i) => ({
      ...item,
      id: i,
      x: (i % 4) * 25 + 5,
      sorted: false,
    })));
  }, []);

  // Speed up over time
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setSpeed(prev => Math.min(prev + 0.3, 3));
    }, 8000);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Check completion
  const unsorted = items.filter(i => !i.sorted);
  useEffect(() => {
    if (items.length > 0 && unsorted.length === 0) {
      setGameOver(true);
    }
  }, [items, unsorted.length]);

  const handleSort = useCallback((itemId: number, bin: string) => {
    const item = items.find(i => i.id === itemId);
    if (!item || item.sorted) return;

    playDrop();

    if (item.state === bin) {
      playCorrect();
      setScore(prev => prev + 1);
      setFeedback({ text: `✅ ${item.label} is a ${bin}!`, correct: true });
      setItems(prev => prev.map(i => i.id === itemId ? { ...i, sorted: true } : i));
    } else {
      playWrong();
      setMistakes(prev => prev + 1);
      setFeedback({ text: `❌ ${item.label} is a ${item.state}, not a ${bin}!`, correct: false });
    }

    setTimeout(() => setFeedback(null), 2000);
  }, [items, playCorrect, playWrong, playDrop]);

  const handleDragStart = (e: React.DragEvent, itemId: number) => {
    e.dataTransfer.setData('itemId', String(itemId));
  };

  const handleDrop = (e: React.DragEvent, bin: string) => {
    e.preventDefault();
    const itemId = parseInt(e.dataTransfer.getData('itemId'));
    handleSort(itemId, bin);
    setDragOver(null);
  };

  const finalScore = Math.max(1, Math.min(3, 3 - Math.floor(mistakes / 3)));

  return (
    <div style={{ position: 'relative' }}>
      {/* HUD */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 1rem',
        background: '#FFF8E7',
        borderBottom: '3px solid #3D2B1F',
        fontFamily: "'Fredoka One', sans-serif",
      }}>
        <span style={{ fontSize: '1rem', color: '#3D2B1F' }}>✅ Sorted: {score}/{ITEMS_DATA.length}</span>
        <span style={{ fontSize: '0.85rem', color: speed > 2 ? '#E74C3C' : '#5D4037', fontFamily: "'Comic Neue', cursive", fontWeight: 700 }}>
          🏎️ Belt Speed: {speed.toFixed(1)}x
        </span>
        <span style={{ fontSize: '1rem', color: '#E74C3C' }}>❌ {mistakes}</span>
      </div>

      {/* Feedback */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              top: 50,
              left: '50%',
              transform: 'translateX(-50%)',
              background: feedback.correct ? '#52B788' : '#E74C3C',
              color: 'white',
              padding: '0.5rem 1.25rem',
              borderRadius: 100,
              border: '2px solid #3D2B1F',
              fontFamily: "'Fredoka One', sans-serif",
              fontSize: '0.9rem',
              zIndex: 20,
              whiteSpace: 'nowrap',
              boxShadow: '3px 3px 0 #3D2B1F',
            }}
          >
            {feedback.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conveyor Belt with Items */}
      <div style={{
        background: 'linear-gradient(180deg, #37474F 0%, #455A64 100%)',
        padding: '1rem',
        minHeight: 160,
        position: 'relative',
        borderBottom: '3px solid #3D2B1F',
      }}>
        {/* Belt texture */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 20,
          background: 'repeating-linear-gradient(90deg, #546E7A 0px, #546E7A 20px, #455A64 20px, #455A64 40px)',
          borderTop: '2px solid #263238',
        }} />

        <div style={{
          fontFamily: "'Fredoka One', sans-serif",
          fontSize: '0.85rem',
          color: 'rgba(255,255,255,0.7)',
          marginBottom: '0.5rem',
          textAlign: 'center',
        }}>
          Drag items to the right bin! ↓
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.75rem',
          justifyContent: 'center',
          padding: '0.25rem',
        }}>
          {items.filter(i => !i.sorted).map(item => (
            <motion.div
              key={item.id}
              draggable
              onDragStart={(e) => handleDragStart(e as any, item.id)}
              animate={{ x: [0, -speed * 3, 0] }}
              transition={{ duration: 2 / speed, repeat: Infinity, ease: 'linear' }}
              whileHover={{ scale: 1.15, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              style={{
                background: '#FFF8E7',
                border: '3px solid #3D2B1F',
                borderRadius: 14,
                padding: '0.5rem 0.75rem',
                cursor: 'grab',
                boxShadow: '3px 3px 0 #3D2B1F',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '2px',
                userSelect: 'none',
              }}
            >
              <span style={{ fontSize: '1.8rem' }}>{item.emoji}</span>
              <span style={{
                fontFamily: "'Fredoka One', sans-serif",
                fontSize: '0.7rem',
                color: '#3D2B1F',
              }}>
                {item.label}
              </span>
            </motion.div>
          ))}
          {unsorted.length === 0 && !gameOver && (
            <div style={{ color: 'rgba(255,255,255,0.7)', fontFamily: "'Fredoka One', sans-serif" }}>
              All sorted! 🎉
            </div>
          )}
        </div>
      </div>

      {/* Bins */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '0.5rem',
        padding: '0.75rem',
        background: '#FFF8E7',
      }}>
        {(Object.keys(BIN_COLORS) as Array<keyof typeof BIN_COLORS>).map(binType => (
          <div
            key={binType}
            onDragOver={(e) => { e.preventDefault(); setDragOver(binType); }}
            onDragLeave={() => setDragOver(null)}
            onDrop={(e) => handleDrop(e, binType)}
            style={{
              background: dragOver === binType ? `${BIN_COLORS[binType].bg}33` : `${BIN_COLORS[binType].bg}15`,
              border: `3px solid ${dragOver === binType ? BIN_COLORS[binType].bg : BIN_COLORS[binType].border}`,
              borderRadius: 14,
              padding: '0.75rem 0.5rem',
              textAlign: 'center',
              transition: 'all 0.15s ease',
              transform: dragOver === binType ? 'scale(1.03)' : 'scale(1)',
              minHeight: 80,
            }}
          >
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1rem', color: BIN_COLORS[binType].bg }}>
              {BIN_COLORS[binType].label}
            </div>
            <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.7rem', color: '#888' }}>
              {BIN_COLORS[binType].desc}
            </div>
          </div>
        ))}
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
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} style={{ fontSize: '3rem' }}>
              🎉
            </motion.div>
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.5rem', color: '#3D2B1F' }}>
              Sorting Complete!
            </div>
            <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, color: '#5D4037', textAlign: 'center', padding: '0 1rem' }}>
              You sorted {score} items! Mistakes: {mistakes}
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }}
                  style={{ fontSize: '1.8rem', opacity: i < finalScore ? 1 : 0.25 }}>⭐</motion.span>
              ))}
            </div>
            <button onClick={() => onComplete(finalScore)} className="btn-cartoon btn-cartoon-orange" style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
              Continue! →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
