/* ============================================================
   SCIENCE EXPLORER ACADEMY — Settings Page
   Teacher Skip Mode, Reset Progress, etc.
   ============================================================ */

import { useGame } from '@/contexts/GameContext';
import { useLocation } from 'wouter';
import TopNav from '@/components/TopNav';
import { motion } from 'framer-motion';

export default function SettingsPage() {
  const { player, toggleTeacherSkipMode, resetProgress } = useGame();
  const [, navigate] = useLocation();

  const handleReset = () => {
    if (window.confirm('Are you sure? This will erase all progress, badges, and XP.')) {
      resetProgress();
      navigate('/');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFF8E7' }}>
      <TopNav />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: 600,
          margin: '0 auto',
          padding: '2rem 1rem',
        }}
      >
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '2rem',
        }}>
          <h1 style={{
            fontFamily: "'Fredoka One', sans-serif",
            fontSize: '2rem',
            color: '#3D2B1F',
            margin: 0,
          }}>
            ⚙️ Settings
          </h1>
          <p style={{
            fontFamily: "'Comic Neue', cursive",
            fontSize: '1rem',
            color: '#666',
            marginTop: '0.5rem',
          }}>
            Customize your learning experience
          </p>
        </div>

        {/* Settings Card */}
        <div style={{
          background: 'white',
          border: '4px solid #3D2B1F',
          borderRadius: 20,
          padding: '1.5rem',
          boxShadow: '6px 6px 0 #3D2B1F',
          marginBottom: '1.5rem',
        }}>
          {/* Teacher Skip Mode */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: '1rem',
            borderBottom: '2px dashed #DDD',
            marginBottom: '1rem',
          }}>
            <div>
              <h3 style={{
                fontFamily: "'Fredoka One', sans-serif",
                fontSize: '1.1rem',
                color: '#3D2B1F',
                margin: '0 0 0.25rem 0',
              }}>
                👨‍🏫 Teacher Skip Mode
              </h3>
              <p style={{
                fontFamily: "'Comic Neue', cursive",
                fontSize: '0.9rem',
                color: '#666',
                margin: 0,
              }}>
                Skip the 1-minute video wait when demonstrating lessons
              </p>
            </div>
            <button
              onClick={toggleTeacherSkipMode}
              style={{
                fontFamily: "'Fredoka One', sans-serif",
                fontSize: '1rem',
                fontWeight: 'bold',
                border: '3px solid #3D2B1F',
                borderRadius: 12,
                padding: '0.5rem 1rem',
                background: player.teacherSkipMode ? '#FFD700' : '#E8E8E8',
                color: '#3D2B1F',
                cursor: 'pointer',
                boxShadow: '3px 3px 0 #3D2B1F',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLButtonElement).style.boxShadow = '5px 5px 0 #3D2B1F';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.target as HTMLButtonElement).style.boxShadow = '3px 3px 0 #3D2B1F';
              }}
            >
              {player.teacherSkipMode ? '✅ ON' : '⭕ OFF'}
            </button>
          </div>

          {/* Reset Progress */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <h3 style={{
                fontFamily: "'Fredoka One', sans-serif",
                fontSize: '1.1rem',
                color: '#3D2B1F',
                margin: '0 0 0.25rem 0',
              }}>
                🔄 Reset Progress
              </h3>
              <p style={{
                fontFamily: "'Comic Neue', cursive",
                fontSize: '0.9rem',
                color: '#666',
                margin: 0,
              }}>
                Start over from the beginning (cannot undo)
              </p>
            </div>
            <button
              onClick={handleReset}
              style={{
                fontFamily: "'Fredoka One', sans-serif",
                fontSize: '1rem',
                fontWeight: 'bold',
                border: '3px solid #3D2B1F',
                borderRadius: 12,
                padding: '0.5rem 1rem',
                background: '#FF6B6B',
                color: 'white',
                cursor: 'pointer',
                boxShadow: '3px 3px 0 #3D2B1F',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
                (e.target as HTMLButtonElement).style.boxShadow = '5px 5px 0 #3D2B1F';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
                (e.target as HTMLButtonElement).style.boxShadow = '3px 3px 0 #3D2B1F';
              }}
            >
              Reset
            </button>
          </div>
        </div>

        {/* Info Card */}
        <div style={{
          background: '#E8F5E9',
          border: '3px solid #52B788',
          borderRadius: 16,
          padding: '1rem',
          fontFamily: "'Comic Neue', cursive",
          fontSize: '0.95rem',
          color: '#2D5016',
          lineHeight: 1.6,
        }}>
          <strong>💡 Tip:</strong> Teacher Skip Mode is perfect for classroom demonstrations. When enabled, the Hook phase video will skip instantly, letting you move through lessons quickly without waiting for the 1-minute timer.
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: '2rem',
            fontFamily: "'Fredoka One', sans-serif",
            fontSize: '1rem',
            fontWeight: 'bold',
            border: '3px solid #3D2B1F',
            borderRadius: 14,
            padding: '0.75rem 1.5rem',
            background: '#4FC3F7',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '4px 4px 0 #3D2B1F',
            transition: 'all 0.2s ease',
            width: '100%',
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(-2px)';
            (e.target as HTMLButtonElement).style.boxShadow = '6px 6px 0 #3D2B1F';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.transform = 'translateY(0)';
            (e.target as HTMLButtonElement).style.boxShadow = '4px 4px 0 #3D2B1F';
          }}
        >
          ← Back to Map
        </button>
      </motion.div>
    </div>
  );
}
