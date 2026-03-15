// ============================================================
// THERMOSTAT HERO GAME — Unit 1, Lesson 3: Heat & Cold
// Use a temperature slider to melt ice or freeze water
// Teaches: Heat changes states of matter
// ============================================================

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from '@/hooks/useSounds';

interface ThermostatHeroProps {
  onComplete: (score: number) => void;
}

interface Challenge {
  id: number;
  description: string;
  startState: 'solid' | 'liquid' | 'gas';
  targetState: 'solid' | 'liquid' | 'gas';
  targetTempRange: [number, number]; // min, max temp needed
  emoji: string;
  hint: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    description: 'Melt the ice to make a bridge of water!',
    startState: 'solid',
    targetState: 'liquid',
    targetTempRange: [30, 80],
    emoji: '🧊',
    hint: 'Heat it up! Ice melts above 0°C',
  },
  {
    id: 2,
    description: 'Freeze the water to make an ice bridge!',
    startState: 'liquid',
    targetState: 'solid',
    targetTempRange: [-20, -1],
    emoji: '💧',
    hint: 'Cool it down! Water freezes below 0°C',
  },
  {
    id: 3,
    description: 'Boil the water into steam!',
    startState: 'liquid',
    targetState: 'gas',
    targetTempRange: [90, 120],
    emoji: '💧',
    hint: 'Heat it a lot! Water boils at 100°C',
  },
  {
    id: 4,
    description: 'Condense the steam back to water!',
    startState: 'gas',
    targetState: 'liquid',
    targetTempRange: [10, 50],
    emoji: '♨️',
    hint: 'Cool the steam! It condenses below 100°C',
  },
  {
    id: 5,
    description: 'Melt the ice cream before it melts you!',
    startState: 'solid',
    targetState: 'liquid',
    targetTempRange: [20, 60],
    emoji: '🍦',
    hint: 'Warm it up gently!',
  },
];

const STATE_VISUALS = {
  solid: { emoji: '🧊', label: 'Solid', color: '#B3E5FC', desc: 'Particles locked tight!' },
  liquid: { emoji: '💧', label: 'Liquid', color: '#29B6F6', desc: 'Particles flowing freely!' },
  gas: { emoji: '♨️', label: 'Gas', color: '#E1F5FE', desc: 'Particles zooming around!' },
};

function getCurrentState(temp: number): 'solid' | 'liquid' | 'gas' {
  if (temp < 0) return 'solid';
  if (temp < 100) return 'liquid';
  return 'gas';
}

export default function ThermostatHero({ onComplete }: ThermostatHeroProps) {
  const [temp, setTemp] = useState(20);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const { playCorrect, playProgress } = useSounds();

  const challenge = CHALLENGES[challengeIndex];
  const currentState = getCurrentState(temp);
  const isCorrect = challenge && currentState === challenge.targetState;

  // Check if temperature is in target range
  const inRange = challenge && temp >= challenge.targetTempRange[0] && temp <= challenge.targetTempRange[1];

  const handleTempChange = (newTemp: number) => {
    setTemp(newTemp);
    playProgress();
  };

  const handleConfirm = useCallback(() => {
    if (!inRange) {
      setFeedback(`Not quite! ${challenge.hint}`);
      setTimeout(() => setFeedback(null), 2500);
      return;
    }

    playCorrect();
    setScore(prev => prev + 1);
    setSuccess(true);
    setFeedback(`🎉 ${currentState === 'solid' ? 'Frozen!' : currentState === 'liquid' ? 'Melted!' : 'Evaporated!'} Amazing!`);

    setTimeout(() => {
      setSuccess(false);
      setFeedback(null);
      if (challengeIndex < CHALLENGES.length - 1) {
        setChallengeIndex(prev => prev + 1);
        setTemp(20);
      } else {
        setGameOver(true);
      }
    }, 2000);
  }, [inRange, challenge, currentState, challengeIndex, playCorrect]);

  const finalScore = Math.min(3, Math.round((score / CHALLENGES.length) * 3));

  const tempColor = temp < 0 ? '#B3E5FC' : temp < 50 ? '#81D4FA' : temp < 100 ? '#FF8A65' : '#FF5722';

  return (
    <div style={{ position: 'relative' }}>
      {/* HUD */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        background: '#FFF8E7',
        borderBottom: '3px solid #3D2B1F',
        fontFamily: "'Fredoka One', sans-serif",
      }}>
        <span style={{ fontSize: '1rem', color: '#3D2B1F' }}>
          🌡️ Challenge {challengeIndex + 1}/{CHALLENGES.length}
        </span>
        <span style={{ fontSize: '1rem', color: '#52B788' }}>✅ {score} solved</span>
      </div>

      <div style={{ padding: '1rem', background: '#FFF8E7' }}>
        {/* Challenge description */}
        {challenge && (
          <div style={{
            background: '#E3F7FF',
            border: '3px solid #3D2B1F',
            borderRadius: 14,
            padding: '0.75rem 1rem',
            marginBottom: '1rem',
            boxShadow: '3px 3px 0 #3D2B1F',
          }}>
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.1rem', color: '#3D2B1F' }}>
              {challenge.emoji} {challenge.description}
            </div>
            <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.85rem', color: '#5D4037', marginTop: '0.25rem' }}>
              💡 Hint: {challenge.hint}
            </div>
          </div>
        )}

        {/* Matter visualization */}
        <div style={{
          display: 'flex',
          gap: '1rem',
          marginBottom: '1rem',
          justifyContent: 'center',
        }}>
          {/* Start state */}
          <div style={{
            flex: 1,
            background: STATE_VISUALS[challenge?.startState || 'solid'].color,
            border: '3px solid #3D2B1F',
            borderRadius: 14,
            padding: '0.75rem',
            textAlign: 'center',
            boxShadow: '3px 3px 0 #3D2B1F',
          }}>
            <div style={{ fontSize: '2rem' }}>{STATE_VISUALS[challenge?.startState || 'solid'].emoji}</div>
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.8rem', color: '#3D2B1F' }}>
              Start: {STATE_VISUALS[challenge?.startState || 'solid'].label}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem' }}>→</div>

          {/* Current state */}
          <motion.div
            animate={{
              background: STATE_VISUALS[currentState].color,
              scale: success ? [1, 1.1, 1] : 1,
            }}
            style={{
              flex: 1,
              border: `3px solid ${inRange ? '#52B788' : '#3D2B1F'}`,
              borderRadius: 14,
              padding: '0.75rem',
              textAlign: 'center',
              boxShadow: `3px 3px 0 ${inRange ? '#52B788' : '#3D2B1F'}`,
            }}
          >
            <motion.div
              animate={{ rotate: currentState === 'gas' ? [0, 10, -10, 0] : 0 }}
              transition={{ duration: 0.5, repeat: currentState === 'gas' ? Infinity : 0 }}
              style={{ fontSize: '2rem' }}
            >
              {STATE_VISUALS[currentState].emoji}
            </motion.div>
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.8rem', color: '#3D2B1F' }}>
              Now: {STATE_VISUALS[currentState].label}
            </div>
            <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.65rem', color: '#888' }}>
              {STATE_VISUALS[currentState].desc}
            </div>
          </motion.div>

          <div style={{ display: 'flex', alignItems: 'center', fontSize: '1.5rem' }}>→</div>

          {/* Target state */}
          <div style={{
            flex: 1,
            background: challenge && currentState === challenge.targetState ? '#C8F7C5' : '#F5F5F5',
            border: `3px solid ${challenge && currentState === challenge.targetState ? '#52B788' : '#C8C0B0'}`,
            borderRadius: 14,
            padding: '0.75rem',
            textAlign: 'center',
            boxShadow: '3px 3px 0 #C8C0B0',
          }}>
            <div style={{ fontSize: '2rem' }}>{STATE_VISUALS[challenge?.targetState || 'liquid'].emoji}</div>
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.8rem', color: '#3D2B1F' }}>
              Goal: {STATE_VISUALS[challenge?.targetState || 'liquid'].label}
            </div>
          </div>
        </div>

        {/* Temperature display */}
        <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          <motion.div
            animate={{ color: tempColor }}
            style={{
              fontFamily: "'Fredoka One', sans-serif",
              fontSize: '2rem',
            }}
          >
            🌡️ {temp}°C
          </motion.div>
          <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.8rem', color: '#888' }}>
            {temp < 0 ? '❄️ Very Cold' : temp < 50 ? '🌤️ Warm' : temp < 100 ? '🔥 Hot' : '♨️ Boiling!'}
          </div>
        </div>

        {/* Slider */}
        <div style={{ padding: '0 1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.75rem', color: '#4FC3F7' }}>❄️ -20°C</span>
            <span style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.75rem', color: '#FF5722' }}>🔥 120°C</span>
          </div>
          <input
            type="range"
            min={-20}
            max={120}
            value={temp}
            onChange={(e) => handleTempChange(parseInt(e.target.value))}
            style={{
              width: '100%',
              height: 24,
              cursor: 'pointer',
              accentColor: tempColor,
            }}
          />
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              style={{
                background: success ? '#52B788' : '#FF8A65',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: 100,
                border: '2px solid #3D2B1F',
                fontFamily: "'Fredoka One', sans-serif",
                fontSize: '0.9rem',
                textAlign: 'center',
                marginBottom: '0.75rem',
                boxShadow: '3px 3px 0 #3D2B1F',
              }}
            >
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirm button */}
        <button
          onClick={handleConfirm}
          className={`btn-cartoon ${inRange ? 'btn-cartoon-green' : 'btn-cartoon-orange'}`}
          style={{ width: '100%', fontSize: '1.1rem', padding: '0.75rem' }}
        >
          {inRange ? '✅ Lock In Temperature!' : '🌡️ Adjust Temperature First'}
        </button>
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
              🌡️
            </motion.div>
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.5rem', color: '#3D2B1F' }}>
              Thermostat Hero!
            </div>
            <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, color: '#5D4037', textAlign: 'center' }}>
              You solved {score}/{CHALLENGES.length} challenges!
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
