// ============================================================
// SCIENCE EXPLORER ACADEMY — Onboarding Page
// First-time setup: name + avatar selection
// ============================================================

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useGame } from '@/contexts/GameContext';

const AVATAR_EMOJIS = ['🦉', '🦊', '🐸', '🐼', '🦁', '🐯', '🦄', '🐲', '🤖', '👩‍🔬', '👨‍🔬', '🧙'];
const AVATAR_COLORS = [
  '#4FC3F7', '#FF6B35', '#52B788', '#FFD700',
  '#9B59B6', '#E74C3C', '#F39C12', '#1ABC9C',
];

const OWL_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663440693124/LRCQh74urLCPMmK8QUgPSZ/avatar-scientist-A5DxgHtRoTEVyXzf5WmEy5.webp';

interface OnboardingPageProps {
  onComplete: () => void;
}

export default function OnboardingPage({ onComplete }: OnboardingPageProps) {
  const { setPlayerName, setAvatar } = useGame();
  const [name, setName] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🦉');
  const [selectedColor, setSelectedColor] = useState('#4FC3F7');
  const [step, setStep] = useState<'name' | 'avatar'>('name');

  const handleNameNext = () => {
    if (name.trim().length < 1) return;
    setPlayerName(name.trim());
    setStep('avatar');
  };

  const handleAvatarDone = () => {
    setAvatar(selectedEmoji, selectedColor);
    onComplete();
  };

  return (
    <div
      className="parchment-bg"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      {/* Logo */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ textAlign: 'center', marginBottom: '2rem' }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '0.25rem' }}>🔬</div>
        <h1 style={{
          fontFamily: "'Fredoka One', sans-serif",
          fontSize: '2.2rem',
          color: '#3D2B1F',
          margin: 0,
          lineHeight: 1.1,
        }}>
          Science Explorer
        </h1>
        <div style={{
          fontFamily: "'Comic Neue', cursive",
          fontWeight: 700,
          fontSize: '1rem',
          color: '#5D4037',
        }}>
          Academy
        </div>
      </motion.div>

      {/* Card */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={{
          background: '#FFF8E7',
          border: '4px solid #3D2B1F',
          borderRadius: 24,
          boxShadow: '6px 6px 0 #3D2B1F',
          padding: '2rem',
          width: '100%',
          maxWidth: 420,
        }}
      >
        {/* Owl mascot */}
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <motion.img
            src={OWL_URL}
            alt="Professor Hoot"
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            style={{ height: 100, objectFit: 'contain' }}
          />
        </div>

        {step === 'name' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div style={{
              fontFamily: "'Fredoka One', sans-serif",
              fontSize: '1.4rem',
              color: '#3D2B1F',
              textAlign: 'center',
              marginBottom: '0.5rem',
            }}>
              Welcome, Explorer!
            </div>
            <div style={{
              fontFamily: "'Comic Neue', cursive",
              fontWeight: 700,
              fontSize: '1rem',
              color: '#5D4037',
              textAlign: 'center',
              marginBottom: '1.5rem',
            }}>
              Professor Hoot here! What's your name?
            </div>

            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleNameNext()}
              placeholder="Type your name..."
              maxLength={20}
              autoFocus
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                fontFamily: "'Fredoka One', sans-serif",
                fontSize: '1.2rem',
                border: '3px solid #3D2B1F',
                borderRadius: 14,
                background: '#FFFDF0',
                color: '#3D2B1F',
                boxShadow: '3px 3px 0 #3D2B1F',
                outline: 'none',
                boxSizing: 'border-box',
                marginBottom: '1rem',
              }}
            />

            <button
              onClick={handleNameNext}
              disabled={name.trim().length < 1}
              className="btn-cartoon btn-cartoon-yellow"
              style={{ width: '100%', fontSize: '1.1rem', padding: '0.75rem', opacity: name.trim().length < 1 ? 0.5 : 1 }}
            >
              Let's Go! 🚀
            </button>
          </motion.div>
        )}

        {step === 'avatar' && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div style={{
              fontFamily: "'Fredoka One', sans-serif",
              fontSize: '1.4rem',
              color: '#3D2B1F',
              textAlign: 'center',
              marginBottom: '0.25rem',
            }}>
              Hi, {name}! 👋
            </div>
            <div style={{
              fontFamily: "'Comic Neue', cursive",
              fontWeight: 700,
              fontSize: '0.95rem',
              color: '#5D4037',
              textAlign: 'center',
              marginBottom: '1.25rem',
            }}>
              Pick your explorer avatar!
            </div>

            {/* Avatar preview */}
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <motion.div
                key={selectedEmoji + selectedColor}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  border: '4px solid #3D2B1F',
                  background: selectedColor,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2.5rem',
                  boxShadow: '4px 4px 0 #3D2B1F',
                }}
              >
                {selectedEmoji}
              </motion.div>
            </div>

            {/* Emoji picker */}
            <div style={{ marginBottom: '0.75rem' }}>
              <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.85rem', color: '#3D2B1F', marginBottom: '0.4rem' }}>
                Choose your character:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {AVATAR_EMOJIS.map(emoji => (
                  <button
                    key={emoji}
                    onClick={() => setSelectedEmoji(emoji)}
                    style={{
                      width: 44,
                      height: 44,
                      fontSize: '1.5rem',
                      border: `3px solid ${selectedEmoji === emoji ? '#3D2B1F' : '#C8C0B0'}`,
                      borderRadius: 12,
                      background: selectedEmoji === emoji ? '#FFD700' : '#FFF8E7',
                      cursor: 'pointer',
                      boxShadow: selectedEmoji === emoji ? '2px 2px 0 #3D2B1F' : 'none',
                      transition: 'all 0.1s ease',
                    }}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Color picker */}
            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.85rem', color: '#3D2B1F', marginBottom: '0.4rem' }}>
                Pick a color:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {AVATAR_COLORS.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      background: color,
                      border: `3px solid ${selectedColor === color ? '#3D2B1F' : 'transparent'}`,
                      cursor: 'pointer',
                      boxShadow: selectedColor === color ? '2px 2px 0 #3D2B1F' : 'none',
                      transition: 'all 0.1s ease',
                    }}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={handleAvatarDone}
              className="btn-cartoon btn-cartoon-yellow"
              style={{ width: '100%', fontSize: '1.1rem', padding: '0.75rem' }}
            >
              Start Exploring! 🗺️
            </button>
          </motion.div>
        )}
      </motion.div>

      {/* Fun facts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        style={{
          marginTop: '1.5rem',
          fontFamily: "'Comic Neue', cursive",
          fontWeight: 700,
          fontSize: '0.85rem',
          color: '#888',
          textAlign: 'center',
          maxWidth: 320,
        }}
      >
        🔬 Explore 2 science units · 8 lessons · 8 games · Earn badges!
      </motion.div>
    </div>
  );
}
