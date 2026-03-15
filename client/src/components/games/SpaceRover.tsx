// ============================================================
// SPACE ROVER GAME — Unit 2, Lesson 1: Speed & Path
// Use force arrows to steer a rover through asteroids
// Teaches: Forces change direction and speed
// ============================================================

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from '@/hooks/useSounds';

interface SpaceRoverProps {
  onComplete: (score: number) => void;
}

interface Asteroid {
  id: number;
  x: number;
  y: number;
  size: number;
  speed: number;
}

interface Particle {
  id: number;
  x: number;
  y: number;
}

const ROVER_SPEED = 4;

export default function SpaceRover({ onComplete }: SpaceRoverProps) {
  const [roverX, setRoverX] = useState(50);
  const [roverY, setRoverY] = useState(75);
  const [asteroids, setAsteroids] = useState<Asteroid[]>([]);
  const [particles, setParticles] = useState<Particle[]>([]);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [invincible, setInvincible] = useState(false);
  const [timeLeft, setTimeLeft] = useState(40);
  const nextId = useRef(0);
  const { playCorrect, playWrong, playPop } = useSounds();
  const keysRef = useRef<Set<string>>(new Set());
  const gameAreaRef = useRef<HTMLDivElement>(null);

  // Keyboard controls
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      keysRef.current.add(e.key);
      e.preventDefault();
    };
    const onKeyUp = (e: KeyboardEvent) => keysRef.current.delete(e.key);
    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  // Rover movement loop
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setRoverX(prev => {
        let x = prev;
        if (keysRef.current.has('ArrowLeft') || keysRef.current.has('a')) x = Math.max(5, x - ROVER_SPEED);
        if (keysRef.current.has('ArrowRight') || keysRef.current.has('d')) x = Math.min(95, x + ROVER_SPEED);
        return x;
      });
      setRoverY(prev => {
        let y = prev;
        if (keysRef.current.has('ArrowUp') || keysRef.current.has('w')) y = Math.max(5, y - ROVER_SPEED);
        if (keysRef.current.has('ArrowDown') || keysRef.current.has('s')) y = Math.min(90, y + ROVER_SPEED);
        return y;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Spawn asteroids
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setAsteroids(prev => [
        ...prev.slice(-12),
        {
          id: nextId.current++,
          x: Math.random() * 90 + 5,
          y: -5,
          size: Math.random() * 20 + 15,
          speed: Math.random() * 1.5 + 0.8,
        },
      ]);
    }, 1200);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Move asteroids
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setAsteroids(prev =>
        prev.map(a => ({ ...a, y: a.y + a.speed })).filter(a => a.y < 110)
      );
    }, 50);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Spawn collectibles (stars)
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setParticles(prev => [
        ...prev.slice(-8),
        { id: nextId.current++, x: Math.random() * 85 + 5, y: -5 },
      ]);
    }, 2000);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Move particles
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setParticles(prev =>
        prev.map(p => ({ ...p, y: p.y + 1.2 })).filter(p => p.y < 110)
      );
    }, 50);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Collision detection
  useEffect(() => {
    if (gameOver || invincible) return;

    // Check asteroid collisions
    asteroids.forEach(asteroid => {
      const dx = roverX - asteroid.x;
      const dy = roverY - asteroid.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const hitRadius = (asteroid.size / 2) / 4 + 3;
      if (dist < hitRadius) {
        playWrong();
        setLives(prev => {
          const newLives = prev - 1;
          if (newLives <= 0) setGameOver(true);
          return newLives;
        });
        setInvincible(true);
        setTimeout(() => setInvincible(false), 2000);
        setAsteroids(prev => prev.filter(a => a.id !== asteroid.id));
      }
    });

    // Check star collection
    particles.forEach(particle => {
      const dx = roverX - particle.x;
      const dy = roverY - particle.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 8) {
        playPop();
        setScore(prev => prev + 1);
        setParticles(prev => prev.filter(p => p.id !== particle.id));
      }
    });
  }, [roverX, roverY, asteroids, particles, gameOver, invincible, playWrong, playPop]);

  // Timer
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { setGameOver(true); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [gameOver]);

  // Touch controls
  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!gameAreaRef.current) return;
    const rect = gameAreaRef.current.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    setRoverX(Math.max(5, Math.min(95, x)));
    setRoverY(Math.max(5, Math.min(90, y)));
  }, []);

  const finalScore = Math.min(3, Math.round((score / 5) * 3) + (lives > 0 ? 1 : 0));

  return (
    <div style={{ position: 'relative' }}>
      {/* HUD */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        background: '#0A0E27',
        borderBottom: '3px solid #3D2B1F',
        fontFamily: "'Fredoka One', sans-serif",
      }}>
        <span style={{ fontSize: '1rem', color: '#FFD700' }}>⭐ {score}</span>
        <span style={{ fontSize: '1rem', color: timeLeft <= 10 ? '#FF4444' : '#4FC3F7' }}>⏱️ {timeLeft}s</span>
        <span style={{ fontSize: '1rem', color: '#FF6B6B' }}>
          {'❤️'.repeat(lives)}{'🖤'.repeat(Math.max(0, 3 - lives))}
        </span>
      </div>

      {/* Game Area */}
      <div
        ref={gameAreaRef}
        onTouchMove={handleTouchMove}
        style={{
          position: 'relative',
          height: 280,
          background: 'radial-gradient(ellipse at center, #1a1a4e 0%, #0A0E27 100%)',
          overflow: 'hidden',
          cursor: 'none',
          touchAction: 'none',
        }}
      >
        {/* Stars background */}
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            left: `${(i * 17 + 3) % 95}%`,
            top: `${(i * 23 + 7) % 90}%`,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
            borderRadius: '50%',
            background: 'white',
            opacity: 0.4 + (i % 5) * 0.1,
          }} />
        ))}

        {/* Collectible stars */}
        {particles.map(p => (
          <motion.div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${p.y}%`,
              transform: 'translate(-50%, -50%)',
              fontSize: '1.2rem',
            }}
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            ⭐
          </motion.div>
        ))}

        {/* Asteroids */}
        {asteroids.map(asteroid => (
          <div
            key={asteroid.id}
            style={{
              position: 'absolute',
              left: `${asteroid.x}%`,
              top: `${asteroid.y}%`,
              width: asteroid.size,
              height: asteroid.size,
              transform: 'translate(-50%, -50%)',
              fontSize: asteroid.size * 0.8,
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            🪨
          </div>
        ))}

        {/* Rover */}
        <motion.div
          style={{
            position: 'absolute',
            left: `${roverX}%`,
            top: `${roverY}%`,
            transform: 'translate(-50%, -50%)',
            fontSize: '2rem',
            filter: invincible ? 'brightness(2)' : 'none',
            opacity: invincible ? 0.6 : 1,
          }}
          animate={invincible ? { opacity: [1, 0.3, 1] } : { opacity: 1 }}
          transition={invincible ? { duration: 0.3, repeat: Infinity } : {}}
        >
          🚀
        </motion.div>

        {/* Controls hint */}
        <div style={{
          position: 'absolute',
          bottom: 8,
          left: '50%',
          transform: 'translateX(-50%)',
          fontFamily: "'Fredoka One', sans-serif",
          fontSize: '0.7rem',
          color: 'rgba(255,255,255,0.5)',
          whiteSpace: 'nowrap',
        }}>
          Arrow keys / WASD / Touch to move
        </div>

        {/* Force arrows UI */}
        <div style={{
          position: 'absolute',
          bottom: 8,
          right: 8,
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 32px)',
          gridTemplateRows: 'repeat(3, 32px)',
          gap: '2px',
        }}>
          {[
            { key: 'w', label: '↑', row: 1, col: 2 },
            { key: 'a', label: '←', row: 2, col: 1 },
            { key: 's', label: '↓', row: 2, col: 2 },
            { key: 'd', label: '→', row: 2, col: 3 },
          ].map(btn => (
            <button
              key={btn.key}
              onPointerDown={() => keysRef.current.add(btn.key)}
              onPointerUp={() => keysRef.current.delete(btn.key)}
              onPointerLeave={() => keysRef.current.delete(btn.key)}
              style={{
                gridRow: btn.row,
                gridColumn: btn.col,
                background: 'rgba(255,255,255,0.2)',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: 6,
                color: 'white',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                touchAction: 'none',
              }}
            >
              {btn.label}
            </button>
          ))}
        </div>
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
              background: 'rgba(10,14,39,0.95)',
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
              {lives > 0 ? '🚀' : '💥'}
            </motion.div>
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.5rem', color: '#FFD700' }}>
              {lives > 0 ? 'Mission Complete!' : 'Mission Over!'}
            </div>
            <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, color: '#4FC3F7', textAlign: 'center' }}>
              Stars collected: {score} | Lives left: {lives}
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }}
                  style={{ fontSize: '1.8rem', opacity: i < finalScore ? 1 : 0.25 }}>⭐</motion.span>
              ))}
            </div>
            <button onClick={() => onComplete(finalScore)} className="btn-cartoon btn-cartoon-blue" style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
              Continue! →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
