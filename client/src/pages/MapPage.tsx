// ============================================================
// SCIENCE EXPLORER ACADEMY — Explorer's Map Page
// Linear path map with lesson nodes, unit banners, and progress
// Design: Treasure map aesthetic with parchment background
// ============================================================

import { useGame } from '@/contexts/GameContext';
import { UNITS } from '@/lib/gameData';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import TopNav from '@/components/TopNav';

const HERO_MAP_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663440693124/LRCQh74urLCPMmK8QUgPSZ/map-background-stem-9m94GXy9tBDUMwpe5Fy2jm.webp';
const OWL_URL = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663440693124/LRCQh74urLCPMmK8QUgPSZ/avatar-scientist-A5DxgHtRoTEVyXzf5WmEy5.webp';

function StarRating({ stars, max = 3 }: { stars: number; max?: number }) {
  return (
    <div style={{ display: 'flex', gap: '2px', justifyContent: 'center' }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{ fontSize: '0.75rem', opacity: i < stars ? 1 : 0.25 }}>⭐</span>
      ))}
    </div>
  );
}

function LessonNode({
  lesson,
  isUnlocked,
  isComplete,
  stars,
  index,
}: {
  lesson: any;
  isUnlocked: boolean;
  isComplete: boolean;
  stars: number;
  index: number;
}) {

  const nodeColor = isComplete
    ? '#52B788'
    : isUnlocked
    ? lesson.color
    : '#C8C0B0';

  const textColor = isComplete || isUnlocked ? 'white' : '#888';

  const nodeContent = (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: index * 0.1, type: 'spring', stiffness: 300, damping: 20 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}
    >
      <motion.div
        whileHover={isUnlocked ? { scale: 1.12 } : {}}
        whileTap={isUnlocked ? { scale: 0.95 } : {}}
        animate={isUnlocked && !isComplete ? {
          scale: [1, 1.05, 1],
          boxShadow: ['4px 4px 0px #3D2B1F', '6px 6px 0px #3D2B1F', '4px 4px 0px #3D2B1F'],
        } : {}}
        transition={isUnlocked && !isComplete ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : {}}
        style={{
          width: 88,
          height: 88,
          borderRadius: '50%',
          border: '4px solid #3D2B1F',
          background: nodeColor,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: isUnlocked ? 'pointer' : 'not-allowed',
          boxShadow: '4px 4px 0px #3D2B1F',
          position: 'relative',
          opacity: isUnlocked ? 1 : 0.6,
        }}
      >
        <span style={{ fontSize: '1.8rem', lineHeight: 1 }}>
          {isComplete ? '✅' : isUnlocked ? lesson.emoji : '🔒'}
        </span>
        <span style={{
          fontSize: '0.65rem',
          fontFamily: "'Fredoka One', sans-serif",
          color: textColor,
          textAlign: 'center',
          lineHeight: 1.1,
          padding: '0 4px',
        }}>
          {isUnlocked ? `L${lesson.number}` : ''}
        </span>
      </motion.div>

      {/* Lesson title */}
      <div style={{
        fontFamily: "'Fredoka One', sans-serif",
        fontSize: '0.8rem',
        color: '#3D2B1F',
        textAlign: 'center',
        maxWidth: 90,
        lineHeight: 1.2,
        opacity: isUnlocked ? 1 : 0.5,
      }}>
        {lesson.title}
      </div>

      {/* Stars */}
      {isComplete && <StarRating stars={stars} />}
    </motion.div>
  );

  if (isUnlocked) {
    return (
      <Link href={`/lesson/${lesson.id}`} style={{ textDecoration: 'none' }}>
        {nodeContent}
      </Link>
    );
  }
  return nodeContent;
}

function DottedPath({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '0 8px' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            background: '#3D2B1F',
            opacity: 0.35,
          }}
        />
      ))}
    </div>
  );
}

export default function MapPage() {
  const { player, isLessonUnlocked, isLessonComplete, getLessonStars } = useGame();

  const completedCount = player.completedLessons.length;
  const totalLessons = UNITS.flatMap(u => u.lessons).length;

  return (
    <div className="parchment-bg" style={{ minHeight: '100vh' }}>
      <TopNav />

      {/* Hero Banner */}
      <div
        style={{
          position: 'relative',
          height: 220,
          overflow: 'hidden',
          borderBottom: '4px solid #3D2B1F',
        }}
      >
        <img
          src={HERO_MAP_URL}
          alt="Explorer's Map"
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to right, rgba(253,246,227,0.85) 0%, rgba(253,246,227,0.4) 50%, transparent 100%)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 2rem',
          }}
        >
          <div>
            <h1 style={{
              fontFamily: "'Fredoka One', sans-serif",
              fontSize: 'clamp(1.8rem, 5vw, 2.8rem)',
              color: '#3D2B1F',
              lineHeight: 1.1,
              margin: 0,
            }}>
              Explorer's Map 🗺️
            </h1>
            <p style={{
              fontFamily: "'Comic Neue', cursive",
              fontWeight: 700,
              fontSize: '1rem',
              color: '#5D4037',
              margin: '0.4rem 0 0',
            }}>
              Welcome back, {player.name}! Ready to explore?
            </p>
            <div style={{ marginTop: '0.6rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{
                background: '#FFD700',
                border: '2px solid #3D2B1F',
                borderRadius: 100,
                padding: '3px 12px',
                fontFamily: "'Fredoka One', sans-serif",
                fontSize: '0.85rem',
                color: '#3D2B1F',
                boxShadow: '2px 2px 0 #3D2B1F',
              }}>
                ⭐ {player.totalStars} Stars
              </span>
              <span style={{
                background: '#4FC3F7',
                border: '2px solid #3D2B1F',
                borderRadius: 100,
                padding: '3px 12px',
                fontFamily: "'Fredoka One', sans-serif",
                fontSize: '0.85rem',
                color: 'white',
                boxShadow: '2px 2px 0 #3D2B1F',
              }}>
                🏅 {player.earnedBadges.length} Badges
              </span>
              <span style={{
                background: '#52B788',
                border: '2px solid #3D2B1F',
                borderRadius: 100,
                padding: '3px 12px',
                fontFamily: "'Fredoka One', sans-serif",
                fontSize: '0.85rem',
                color: 'white',
                boxShadow: '2px 2px 0 #3D2B1F',
              }}>
                ✅ {completedCount}/{totalLessons} Done
              </span>
            </div>
          </div>
        </div>

        {/* Owl mascot */}
        <motion.img
          src={OWL_URL}
          alt="Professor Hoot"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            right: '2rem',
            bottom: 0,
            height: 160,
            objectFit: 'contain',
            filter: 'drop-shadow(4px 4px 0px rgba(0,0,0,0.3))',
          }}
        />
      </div>

      {/* Overall Progress Bar */}
      <div style={{ background: '#FFF8E7', borderBottom: '3px solid #3D2B1F', padding: '0.75rem 1.5rem' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
            <span style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.9rem', color: '#3D2B1F' }}>
              🗺️ Journey Progress
            </span>
            <span style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.85rem', color: '#5D4037' }}>
              {Math.round((completedCount / totalLessons) * 100)}%
            </span>
          </div>
          <div className="progress-cartoon">
            <motion.div
              className="progress-cartoon-fill"
              style={{ background: 'linear-gradient(90deg, #52B788, #4FC3F7)' }}
              initial={{ width: 0 }}
              animate={{ width: `${(completedCount / totalLessons) * 100}%` }}
              transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
            />
          </div>
        </div>
      </div>

      {/* Map Content */}
      <div style={{ padding: '2rem 1rem', maxWidth: 900, margin: '0 auto' }}>
        {UNITS.map((unit, unitIndex) => (
          <motion.div
            key={unit.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: unitIndex * 0.2 }}
            style={{ marginBottom: '3rem' }}
          >
            {/* Unit Banner */}
            <div
              className="unit-banner"
              style={{ marginBottom: '2rem', overflow: 'hidden' }}
            >
              <div style={{ position: 'relative', height: 120 }}>
                <img
                  src={unit.bannerUrl}
                  alt={unit.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0 1.5rem',
                  gap: '1rem',
                }}>
                  <span style={{ fontSize: '2.5rem' }}>{unit.emoji}</span>
                  <div>
                    <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.3rem', color: 'white', lineHeight: 1.1 }}>
                      Unit {unit.number}: {unit.title}
                    </div>
                    <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)' }}>
                      🎯 {unit.theme}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Lesson Nodes on Map Path */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexWrap: 'wrap',
              gap: '0',
              padding: '1rem',
              background: 'rgba(255,255,255,0.5)',
              borderRadius: 20,
              border: '3px solid #3D2B1F',
              boxShadow: '4px 4px 0 #3D2B1F',
            }}>
              {unit.lessons.map((lesson, lessonIndex) => (
                <div key={lesson.id} style={{ display: 'flex', alignItems: 'center' }}>
                  <LessonNode
                    lesson={lesson}
                    isUnlocked={isLessonUnlocked(lesson.id)}
                    isComplete={isLessonComplete(lesson.id)}
                    stars={getLessonStars(lesson.id)}
                    index={unitIndex * 4 + lessonIndex}
                  />
                  {lessonIndex < unit.lessons.length - 1 && (
                    <DottedPath count={5} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          style={{
            textAlign: 'center',
            padding: '2rem',
            background: 'rgba(255,255,255,0.6)',
            borderRadius: 20,
            border: '3px solid #3D2B1F',
            boxShadow: '4px 4px 0 #3D2B1F',
          }}
        >
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🦉</div>
          <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.1rem', color: '#3D2B1F', marginBottom: '0.5rem' }}>
            Professor Hoot says:
          </div>
          <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '1rem', color: '#5D4037', marginBottom: '1rem' }}>
            "Every scientist starts with curiosity! Click a lesson to begin your adventure!"
          </div>
          <Link href="/locker">
            <button className="btn-cartoon btn-cartoon-yellow" style={{ fontSize: '1rem' }}>
              🏆 View My Badge Locker
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
