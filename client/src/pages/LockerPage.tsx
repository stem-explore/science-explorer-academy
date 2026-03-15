// ============================================================
// SCIENCE EXPLORER ACADEMY — Badge Locker Page
// Shows earned badges, avatar customization, and stats
// Design: Trophy case aesthetic with cartoon style
// ============================================================

import { useGame, useXPProgress } from '@/contexts/GameContext';
import { ALL_LESSONS, UNITS } from '@/lib/gameData';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'wouter';
import TopNav from '@/components/TopNav';

const AVATAR_EMOJIS = ['🦉', '🦊', '🐸', '🐼', '🦁', '🐯', '🦄', '🐲', '🤖', '👩‍🔬', '👨‍🔬', '🧙'];
const AVATAR_COLORS = [
  '#4FC3F7', '#FF6B35', '#52B788', '#FFD700',
  '#9B59B6', '#E74C3C', '#F39C12', '#1ABC9C',
  '#3498DB', '#E91E63', '#795548', '#607D8B',
];

function BadgeCard({ lesson, earned }: { lesson: any; earned: boolean }) {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={earned ? { scale: 1.05, y: -4 } : {}}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '1rem',
        background: earned ? '#FFF8E7' : '#F0EDE8',
        border: `3px solid ${earned ? '#3D2B1F' : '#C8C0B0'}`,
        borderRadius: 16,
        boxShadow: earned ? '4px 4px 0 #3D2B1F' : '2px 2px 0 #C8C0B0',
        opacity: earned ? 1 : 0.5,
        filter: earned ? 'none' : 'grayscale(0.8)',
        cursor: earned ? 'default' : 'not-allowed',
        minWidth: 110,
      }}
    >
      <div style={{
        width: 64,
        height: 64,
        borderRadius: '50%',
        border: `3px solid ${earned ? '#3D2B1F' : '#C8C0B0'}`,
        background: earned
          ? `radial-gradient(circle at 35% 35%, ${lesson.color}CC, ${lesson.color})`
          : '#E0D8CC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.8rem',
        boxShadow: earned ? '3px 3px 0 #3D2B1F' : 'none',
        position: 'relative',
      }}>
        {lesson.badgeEmoji}
        {earned && (
          <div style={{
            position: 'absolute',
            top: -6,
            right: -6,
            background: '#FFD700',
            border: '2px solid #3D2B1F',
            borderRadius: '50%',
            width: 20,
            height: 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.6rem',
          }}>
            ✓
          </div>
        )}
      </div>
      <div style={{
        fontFamily: "'Fredoka One', sans-serif",
        fontSize: '0.8rem',
        color: earned ? '#3D2B1F' : '#888',
        textAlign: 'center',
        lineHeight: 1.2,
      }}>
        {lesson.badgeName}
      </div>
      {!earned && (
        <div style={{
          fontFamily: "'Comic Neue', cursive",
          fontWeight: 700,
          fontSize: '0.7rem',
          color: '#AAA',
        }}>
          🔒 Locked
        </div>
      )}
    </motion.div>
  );
}

export default function LockerPage() {
  const { player, setAvatar, isLessonComplete } = useGame();
  const { xpInCurrentLevel, progressPercent, xpToNextLevel } = useXPProgress(player.xp);
  const [activeTab, setActiveTab] = useState<'badges' | 'avatar' | 'stats'>('badges');
  const [selectedEmoji, setSelectedEmoji] = useState(player.avatarEmoji);
  const [selectedColor, setSelectedColor] = useState(player.avatarColor);

  const handleSaveAvatar = () => {
    setAvatar(selectedEmoji, selectedColor);
  };

  const earnedBadgeCount = player.earnedBadges.length;
  const totalBadges = ALL_LESSONS.length;

  return (
    <div className="parchment-bg" style={{ minHeight: '100vh' }}>
      <TopNav />

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '1.5rem 1rem' }}>
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{ textAlign: 'center', marginBottom: '1.5rem' }}
        >
          <h1 style={{
            fontFamily: "'Fredoka One', sans-serif",
            fontSize: '2rem',
            color: '#3D2B1F',
            margin: 0,
          }}>
            🏆 My Explorer Locker
          </h1>
          <p style={{
            fontFamily: "'Comic Neue', cursive",
            fontWeight: 700,
            color: '#5D4037',
            margin: '0.3rem 0 0',
          }}>
            {earnedBadgeCount}/{totalBadges} badges earned — keep exploring!
          </p>
        </motion.div>

        {/* Player Card */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          style={{
            background: '#FFF8E7',
            border: '3px solid #3D2B1F',
            borderRadius: 20,
            boxShadow: '5px 5px 0 #3D2B1F',
            padding: '1.25rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1.25rem',
          }}
        >
          {/* Avatar */}
          <div style={{
            width: 80,
            height: 80,
            borderRadius: '50%',
            border: '4px solid #3D2B1F',
            background: player.avatarColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '2.5rem',
            boxShadow: '3px 3px 0 #3D2B1F',
            flexShrink: 0,
          }}>
            {player.avatarEmoji}
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "'Fredoka One', sans-serif",
              fontSize: '1.3rem',
              color: '#3D2B1F',
            }}>
              {player.name}
            </div>
            <div style={{
              display: 'flex',
              gap: '0.75rem',
              flexWrap: 'wrap',
              marginTop: '0.3rem',
            }}>
              <span style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.85rem', color: '#5D4037' }}>
                🔥 {player.streak} day streak
              </span>
              <span style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.85rem', color: '#5D4037' }}>
                ⭐ {player.totalStars} stars
              </span>
              <span style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.85rem', color: '#5D4037' }}>
                Level {player.level}
              </span>
            </div>
            {/* XP Bar */}
            <div style={{ marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                <span style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.75rem', color: '#888' }}>
                  {xpInCurrentLevel} / 300 XP
                </span>
                <span style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.75rem', color: '#888' }}>
                  {xpToNextLevel} to Level {player.level + 1}
                </span>
              </div>
              <div className="progress-cartoon" style={{ height: 14 }}>
                <motion.div
                  className="progress-cartoon-fill xp-bar-fill"
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.8 }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          marginBottom: '1.25rem',
          background: '#FFF8E7',
          border: '3px solid #3D2B1F',
          borderRadius: 14,
          padding: '4px',
          boxShadow: '3px 3px 0 #3D2B1F',
        }}>
          {(['badges', 'avatar', 'stats'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: '0.5rem',
                borderRadius: 10,
                border: activeTab === tab ? '2px solid #3D2B1F' : '2px solid transparent',
                background: activeTab === tab ? '#FFD700' : 'transparent',
                fontFamily: "'Fredoka One', sans-serif",
                fontSize: '0.9rem',
                color: '#3D2B1F',
                cursor: 'pointer',
                boxShadow: activeTab === tab ? '2px 2px 0 #3D2B1F' : 'none',
                transition: 'all 0.15s ease',
              }}
            >
              {tab === 'badges' && '🏅 Badges'}
              {tab === 'avatar' && '🎨 Avatar'}
              {tab === 'stats' && '📊 Stats'}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          {activeTab === 'badges' && (
            <motion.div
              key="badges"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              {UNITS.map(unit => (
                <div key={unit.id} style={{ marginBottom: '1.5rem' }}>
                  <div style={{
                    fontFamily: "'Fredoka One', sans-serif",
                    fontSize: '1.1rem',
                    color: '#3D2B1F',
                    marginBottom: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                  }}>
                    {unit.emoji} Unit {unit.number}: {unit.title}
                  </div>
                  <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                  }}>
                    {unit.lessons.map(lesson => (
                      <BadgeCard
                        key={lesson.id}
                        lesson={lesson}
                        earned={player.earnedBadges.includes(lesson.badgeName)}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'avatar' && (
            <motion.div
              key="avatar"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                background: '#FFF8E7',
                border: '3px solid #3D2B1F',
                borderRadius: 20,
                boxShadow: '5px 5px 0 #3D2B1F',
                padding: '1.5rem',
              }}
            >
              {/* Preview */}
              <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                <motion.div
                  key={`${selectedEmoji}-${selectedColor}`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  style={{
                    width: 100,
                    height: 100,
                    borderRadius: '50%',
                    border: '4px solid #3D2B1F',
                    background: selectedColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    boxShadow: '4px 4px 0 #3D2B1F',
                    margin: '0 auto 0.75rem',
                  }}
                >
                  {selectedEmoji}
                </motion.div>
                <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1rem', color: '#3D2B1F' }}>
                  Your Explorer
                </div>
              </div>

              {/* Emoji picker */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.95rem', color: '#3D2B1F', marginBottom: '0.5rem' }}>
                  Choose your character:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {AVATAR_EMOJIS.map(emoji => (
                    <motion.button
                      key={emoji}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedEmoji(emoji)}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        border: selectedEmoji === emoji ? '3px solid #3D2B1F' : '2px solid #C8C0B0',
                        background: selectedEmoji === emoji ? '#FFD700' : '#FFF8E7',
                        fontSize: '1.5rem',
                        cursor: 'pointer',
                        boxShadow: selectedEmoji === emoji ? '2px 2px 0 #3D2B1F' : 'none',
                        transition: 'all 0.1s ease',
                      }}
                    >
                      {emoji}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Color picker */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.95rem', color: '#3D2B1F', marginBottom: '0.5rem' }}>
                  Choose your color:
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {AVATAR_COLORS.map(color => (
                    <motion.button
                      key={color}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        border: selectedColor === color ? '3px solid #3D2B1F' : '2px solid rgba(0,0,0,0.2)',
                        background: color,
                        cursor: 'pointer',
                        boxShadow: selectedColor === color ? '2px 2px 0 #3D2B1F' : 'none',
                        transition: 'all 0.1s ease',
                      }}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={handleSaveAvatar}
                className="btn-cartoon btn-cartoon-green"
                style={{ width: '100%', fontSize: '1.1rem', padding: '0.75rem' }}
              >
                ✅ Save My Look!
              </button>
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                background: '#FFF8E7',
                border: '3px solid #3D2B1F',
                borderRadius: 20,
                boxShadow: '5px 5px 0 #3D2B1F',
                padding: '1.5rem',
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem' }}>
                {[
                  { label: 'Total XP', value: player.xp, emoji: '⚡' },
                  { label: 'Current Level', value: player.level, emoji: '🎯' },
                  { label: 'Day Streak', value: player.streak, emoji: '🔥' },
                  { label: 'Stars Earned', value: player.totalStars, emoji: '⭐' },
                  { label: 'Badges', value: `${earnedBadgeCount}/${totalBadges}`, emoji: '🏅' },
                  { label: 'Lessons Done', value: `${player.completedLessons.length}/${ALL_LESSONS.length}`, emoji: '✅' },
                ].map(stat => (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.03 }}
                    style={{
                      background: 'white',
                      border: '2px solid #3D2B1F',
                      borderRadius: 14,
                      padding: '1rem',
                      textAlign: 'center',
                      boxShadow: '3px 3px 0 #3D2B1F',
                    }}
                  >
                    <div style={{ fontSize: '1.8rem', marginBottom: '0.25rem' }}>{stat.emoji}</div>
                    <div style={{
                      fontFamily: "'Fredoka One', sans-serif",
                      fontSize: '1.4rem',
                      color: '#3D2B1F',
                    }}>
                      {stat.value}
                    </div>
                    <div style={{
                      fontFamily: "'Comic Neue', cursive",
                      fontWeight: 700,
                      fontSize: '0.8rem',
                      color: '#888',
                    }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Lesson completion list */}
              <div style={{ marginTop: '1.5rem' }}>
                <div style={{
                  fontFamily: "'Fredoka One', sans-serif",
                  fontSize: '1rem',
                  color: '#3D2B1F',
                  marginBottom: '0.75rem',
                }}>
                  📚 Lesson Progress
                </div>
                {ALL_LESSONS.map(lesson => {
                  const done = isLessonComplete(lesson.id);
                  return (
                    <div
                      key={lesson.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        padding: '0.5rem 0',
                        borderBottom: '1px solid #E8E0D0',
                      }}
                    >
                      <span style={{ fontSize: '1.2rem' }}>{done ? '✅' : '⭕'}</span>
                      <span style={{
                        fontFamily: "'Comic Neue', cursive",
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        color: done ? '#3D2B1F' : '#AAA',
                        flex: 1,
                      }}>
                        {lesson.title}
                      </span>
                      {done && (
                        <span style={{ fontSize: '0.8rem', color: '#52B788', fontFamily: "'Fredoka One', sans-serif" }}>
                          +{lesson.xpReward} XP
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Back to map */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link href="/">
            <button className="btn-cartoon btn-cartoon-yellow" style={{ fontSize: '1rem' }}>
              🗺️ Back to Map
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
