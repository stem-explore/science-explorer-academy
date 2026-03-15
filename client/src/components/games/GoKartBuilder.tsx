// ============================================================
// GO-KART BUILDER GAME — Unit 2, Lesson 4: Physics Master
// Choose parts to optimize forces and win the race
// Teaches: Review of forces, motion, speed, gravity
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from '@/hooks/useSounds';

interface GoKartBuilderProps {
  onComplete: (score: number) => void;
}

interface KartPart {
  id: string;
  category: 'engine' | 'wheels' | 'body';
  emoji: string;
  name: string;
  speedBonus: number;
  frictionBonus: number;
  description: string;
}

const PARTS: KartPart[] = [
  // Engines
  { id: 'engine-small', category: 'engine', emoji: '⚙️', name: 'Small Engine', speedBonus: 1, frictionBonus: 0, description: 'Low force output' },
  { id: 'engine-big', category: 'engine', emoji: '🔥', name: 'Turbo Engine', speedBonus: 3, frictionBonus: 0, description: 'High force = more speed!' },
  { id: 'engine-rocket', category: 'engine', emoji: '🚀', name: 'Rocket Booster', speedBonus: 5, frictionBonus: -1, description: 'Maximum force!' },
  // Wheels
  { id: 'wheels-smooth', category: 'wheels', emoji: '⭕', name: 'Smooth Wheels', speedBonus: 1, frictionBonus: -2, description: 'Less friction = faster!' },
  { id: 'wheels-grip', category: 'wheels', emoji: '🔵', name: 'Grip Wheels', speedBonus: 0, frictionBonus: 2, description: 'More friction = better control' },
  { id: 'wheels-mega', category: 'wheels', emoji: '🟣', name: 'Mega Wheels', speedBonus: 2, frictionBonus: -1, description: 'Balanced speed and grip' },
  // Body
  { id: 'body-heavy', category: 'body', emoji: '🧱', name: 'Heavy Body', speedBonus: -1, frictionBonus: 1, description: 'More mass = needs more force' },
  { id: 'body-light', category: 'body', emoji: '📦', name: 'Light Body', speedBonus: 2, frictionBonus: 0, description: 'Less mass = easier to accelerate!' },
  { id: 'body-aerodynamic', category: 'body', emoji: '✈️', name: 'Aero Body', speedBonus: 3, frictionBonus: -1, description: 'Reduces air resistance!' },
];

const CATEGORY_LABELS = {
  engine: '⚙️ Engine (Force)',
  wheels: '🔵 Wheels (Friction)',
  body: '📦 Body (Mass)',
};

export default function GoKartBuilder({ onComplete }: GoKartBuilderProps) {
  const [selectedParts, setSelectedParts] = useState<Record<string, string>>({
    engine: 'engine-small',
    wheels: 'wheels-smooth',
    body: 'body-light',
  });
  const [racing, setRacing] = useState(false);
  const [raceResult, setRaceResult] = useState<'win' | 'lose' | null>(null);
  const [playerX, setPlayerX] = useState(0);
  const [opponentX, setOpponentX] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const { playCorrect, playWrong, playLevelUp } = useSounds();

  const FINISH = 90;
  const OPPONENT_SPEED = 2.8;

  const getKartStats = useCallback(() => {
    const parts = Object.values(selectedParts).map(id => PARTS.find(p => p.id === id)!).filter(Boolean);
    const speedBonus = parts.reduce((sum, p) => sum + p.speedBonus, 0);
    const frictionBonus = parts.reduce((sum, p) => sum + p.frictionBonus, 0);
    const baseSpeed = 2;
    const finalSpeed = Math.max(0.5, baseSpeed + speedBonus + frictionBonus * 0.3);
    return { speed: finalSpeed, speedBonus, frictionBonus };
  }, [selectedParts]);

  const stats = getKartStats();

  const startRace = useCallback(() => {
    setRacing(true);
    setPlayerX(0);
    setOpponentX(0);
    setRaceResult(null);
  }, []);

  // Race loop
  useEffect(() => {
    if (!racing) return;
    const interval = setInterval(() => {
      setPlayerX(prev => {
        const newX = prev + stats.speed * 0.4;
        if (newX >= FINISH) {
          clearInterval(interval);
          setRacing(false);
          setRaceResult('win');
          playLevelUp();
          setScore(3);
          setTimeout(() => setGameOver(true), 3000);
        }
        return Math.min(newX, FINISH);
      });
      setOpponentX(prev => {
        const newX = prev + OPPONENT_SPEED * 0.4;
        if (newX >= FINISH) {
          clearInterval(interval);
          setRacing(false);
          setRaceResult('lose');
          playWrong();
          setScore(1);
          setTimeout(() => setGameOver(true), 3000);
        }
        return Math.min(newX, FINISH);
      });
    }, 50);
    return () => clearInterval(interval);
  }, [racing, stats.speed, playLevelUp, playWrong]);

  const selectPart = useCallback((part: KartPart) => {
    if (racing) return;
    setSelectedParts(prev => ({ ...prev, [part.category]: part.id }));
  }, [racing]);

  const speedPercent = Math.min(100, (stats.speed / 8) * 100);

  return (
    <div style={{ position: 'relative' }}>
      {/* HUD */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        background: '#FFF8E8',
        borderBottom: '3px solid #3D2B1F',
        fontFamily: "'Fredoka One', sans-serif",
      }}>
        <span style={{ fontSize: '1rem', color: '#3D2B1F' }}>🏎️ Go-Kart Builder</span>
        <span style={{ fontSize: '0.85rem', color: '#F39C12', fontFamily: "'Comic Neue', cursive", fontWeight: 700 }}>
          Build your kart, then race!
        </span>
      </div>

      <div style={{ padding: '0.75rem', background: '#FFF8E7' }}>
        {/* Kart preview */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          background: '#FFF0D0',
          border: '3px solid #3D2B1F',
          borderRadius: 14,
          padding: '0.75rem',
          marginBottom: '0.75rem',
          boxShadow: '3px 3px 0 #3D2B1F',
        }}>
          <div style={{ fontSize: '3rem' }}>🏎️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.9rem', color: '#3D2B1F', marginBottom: '0.3rem' }}>
              Your Kart Speed:
            </div>
            <div className="progress-cartoon" style={{ height: 18 }}>
              <motion.div
                className="progress-cartoon-fill"
                style={{ background: speedPercent > 70 ? 'linear-gradient(90deg, #52B788, #FFD700)' : 'linear-gradient(90deg, #FF6B35, #FF8A65)' }}
                animate={{ width: `${speedPercent}%` }}
                transition={{ duration: 0.4 }}
              />
            </div>
            <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.75rem', color: '#888', marginTop: '2px' }}>
              Speed: {stats.speed.toFixed(1)} | Opponent: {OPPONENT_SPEED.toFixed(1)}
            </div>
          </div>
          <div style={{
            fontFamily: "'Fredoka One', sans-serif",
            fontSize: '1.1rem',
            color: stats.speed > OPPONENT_SPEED ? '#52B788' : '#E74C3C',
          }}>
            {stats.speed > OPPONENT_SPEED ? '🏆 WIN!' : '⚠️ LOSE'}
          </div>
        </div>

        {/* Part selection */}
        {!racing && !raceResult && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '0.75rem' }}>
            {(['engine', 'wheels', 'body'] as const).map(category => (
              <div key={category}>
                <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.85rem', color: '#3D2B1F', marginBottom: '0.3rem' }}>
                  {CATEGORY_LABELS[category]}
                </div>
                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                  {PARTS.filter(p => p.category === category).map(part => (
                    <motion.button
                      key={part.id}
                      onClick={() => selectPart(part)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        background: selectedParts[category] === part.id ? '#FFD700' : '#FFF8E7',
                        border: `3px solid ${selectedParts[category] === part.id ? '#3D2B1F' : '#C8C0B0'}`,
                        borderRadius: 12,
                        padding: '0.4rem 0.6rem',
                        cursor: 'pointer',
                        boxShadow: selectedParts[category] === part.id ? '3px 3px 0 #3D2B1F' : '2px 2px 0 #C8C0B0',
                        textAlign: 'center',
                        minWidth: 80,
                      }}
                    >
                      <div style={{ fontSize: '1.4rem' }}>{part.emoji}</div>
                      <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.65rem', color: '#3D2B1F' }}>{part.name}</div>
                      <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.6rem', color: '#888' }}>
                        {part.speedBonus > 0 ? `+${part.speedBonus}` : part.speedBonus} speed
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Race track */}
        {(racing || raceResult) && (
          <div style={{
            background: '#4CAF50',
            border: '3px solid #3D2B1F',
            borderRadius: 14,
            padding: '0.5rem',
            marginBottom: '0.75rem',
            boxShadow: '3px 3px 0 #3D2B1F',
          }}>
            {/* Finish line */}
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: `${FINISH}%`,
                top: 0,
                bottom: 0,
                width: 3,
                background: 'repeating-linear-gradient(180deg, black 0px, black 8px, white 8px, white 16px)',
                zIndex: 5,
              }} />

              {/* Player kart */}
              <div style={{ height: 50, background: 'rgba(255,255,255,0.15)', borderRadius: 8, marginBottom: 4, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%)', fontFamily: "'Fredoka One', sans-serif", fontSize: '0.7rem', color: 'white' }}>YOU</div>
                <motion.div animate={{ x: `${playerX * 0.85}%` }} transition={{ type: 'tween', ease: 'linear', duration: 0.05 }}
                  style={{ position: 'absolute', left: '8%', top: '50%', transform: 'translateY(-50%)', fontSize: '1.8rem' }}>
                  🏎️
                </motion.div>
              </div>

              {/* Opponent */}
              <div style={{ height: 50, background: 'rgba(0,0,0,0.1)', borderRadius: 8, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', left: 4, top: '50%', transform: 'translateY(-50%)', fontFamily: "'Fredoka One', sans-serif", fontSize: '0.7rem', color: 'white' }}>CPU</div>
                <motion.div animate={{ x: `${opponentX * 0.85}%` }} transition={{ type: 'tween', ease: 'linear', duration: 0.05 }}
                  style={{ position: 'absolute', left: '8%', top: '50%', transform: 'translateY(-50%)', fontSize: '1.8rem' }}>
                  🚗
                </motion.div>
              </div>
            </div>
          </div>
        )}

        {/* Result message */}
        <AnimatePresence>
          {raceResult && !gameOver && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                textAlign: 'center',
                background: raceResult === 'win' ? '#C8F7C5' : '#FFE0E0',
                border: '3px solid #3D2B1F',
                borderRadius: 14,
                padding: '0.75rem',
                boxShadow: '3px 3px 0 #3D2B1F',
                marginBottom: '0.75rem',
              }}
            >
              <div style={{ fontSize: '2rem' }}>{raceResult === 'win' ? '🏆' : '😅'}</div>
              <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.1rem', color: '#3D2B1F' }}>
                {raceResult === 'win' ? 'You Won! Great kart design!' : 'You lost! Try a faster engine next time!'}
              </div>
              <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.85rem', color: '#5D4037', marginTop: '0.25rem' }}>
                {raceResult === 'win'
                  ? 'More force + less friction = more speed! Physics works!'
                  : 'Tip: Use the Turbo Engine + Smooth Wheels + Aero Body for max speed!'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action button */}
        {!racing && !raceResult && (
          <button
            onClick={startRace}
            className="btn-cartoon btn-cartoon-yellow"
            style={{ width: '100%', fontSize: '1.2rem', padding: '0.75rem' }}
          >
            🏁 START RACE!
          </button>
        )}

        {!racing && raceResult && !gameOver && (
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => { setRaceResult(null); setPlayerX(0); setOpponentX(0); }}
              className="btn-cartoon btn-cartoon-blue"
              style={{ flex: 1 }}
            >
              🔧 Rebuild
            </button>
            <button
              onClick={() => setGameOver(true)}
              className="btn-cartoon btn-cartoon-green"
              style={{ flex: 1 }}
            >
              Continue →
            </button>
          </div>
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
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }} style={{ fontSize: '3rem' }}>🏎️</motion.div>
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.5rem', color: '#3D2B1F' }}>Physics Champion!</div>
            <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, color: '#5D4037', textAlign: 'center', padding: '0 1rem' }}>
              {raceResult === 'win' ? 'Your kart used forces perfectly!' : 'You learned about forces and motion!'}
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }}
                  style={{ fontSize: '1.8rem', opacity: i < score ? 1 : 0.25 }}>⭐</motion.span>
              ))}
            </div>
            <button onClick={() => onComplete(score)} className="btn-cartoon btn-cartoon-yellow" style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
              Continue! →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
