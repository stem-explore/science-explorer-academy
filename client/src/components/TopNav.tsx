// ============================================================
// SCIENCE EXPLORER ACADEMY — Top Navigation Bar
// Shows: streak flame, XP bar, level, avatar
// Design: Cartoon style with thick borders and warm parchment
// ============================================================

import { useGame, useXPProgress } from '@/contexts/GameContext';
import { motion } from 'framer-motion';
import { Link } from 'wouter';

export default function TopNav() {
  const { player } = useGame();
  const { xpInCurrentLevel, progressPercent } = useXPProgress(player.xp);

  return (
    <nav
      style={{
        background: 'oklch(0.99 0.015 85)',
        borderBottom: '3px solid oklch(0.22 0.04 50)',
        boxShadow: '0 4px 0px oklch(0.22 0.04 50)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        fontFamily: "'Fredoka One', sans-serif",
      }}
    >
      <div className="container" style={{ padding: '0.6rem 1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Link href="/">
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <span style={{ fontSize: '1.8rem' }}>🔬</span>
              <div style={{ lineHeight: 1.1 }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 400, color: 'oklch(0.22 0.04 50)', letterSpacing: '0.02em' }}>
                  Science Explorer
                </div>
                <div style={{ fontSize: '0.7rem', color: 'oklch(0.55 0.08 50)', fontFamily: "'Comic Neue', cursive", fontWeight: 700 }}>
                  Academy
                </div>
              </div>
            </div>
          </Link>

          {/* Center: XP Bar */}
          <div style={{ flex: 1, maxWidth: 280, display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.75rem', color: 'oklch(0.5 0.04 50)', fontFamily: "'Comic Neue', cursive", fontWeight: 700 }}>
                Level {player.level}
              </span>
              <span style={{ fontSize: '0.75rem', color: 'oklch(0.5 0.04 50)', fontFamily: "'Comic Neue', cursive", fontWeight: 700 }}>
                {xpInCurrentLevel} XP
              </span>
            </div>
            <div className="progress-cartoon" style={{ height: '16px' }}>
              <motion.div
                className="progress-cartoon-fill xp-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
              />
            </div>
          </div>

          {/* Right: Streak + Avatar + Links */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {/* Streak */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'oklch(0.88 0.18 85)',
                border: '2px solid oklch(0.22 0.04 50)',
                borderRadius: '100px',
                padding: '4px 10px',
                boxShadow: '2px 2px 0px oklch(0.22 0.04 50)',
              }}
            >
              <span className="streak-flame" style={{ fontSize: '1.1rem' }}>🔥</span>
              <span style={{ fontSize: '1rem', fontWeight: 400, color: 'oklch(0.22 0.04 50)' }}>
                {player.streak}
              </span>
            </div>

            {/* Leaderboard Link */}
            <Link href="/leaderboard">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontSize: '1.2rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = 'oklch(0.88 0.15 150 / 0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = 'transparent';
                }}
              >
                🏆
              </motion.button>
            </Link>

            {/* Settings Link */}
            <Link href="/settings">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  fontSize: '1.2rem',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 8px',
                  borderRadius: '8px',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = 'oklch(0.88 0.15 200 / 0.3)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = 'transparent';
                }}
              >
                ⚙️
              </motion.button>
            </Link>

            {/* Avatar */}
            <Link href="/locker">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  border: '3px solid oklch(0.22 0.04 50)',
                  background: player.avatarColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.4rem',
                  boxShadow: '2px 2px 0px oklch(0.22 0.04 50)',
                  cursor: 'pointer',
                  overflow: 'hidden',
                }}
              >
                {player.avatarEmoji}
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
