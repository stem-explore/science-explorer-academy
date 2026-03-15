/* ============================================================
   SCIENCE EXPLORER ACADEMY — Leaderboard Page
   Top 10 Students by XP and Badges (This Week)
   ============================================================ */

import { useGame } from '@/contexts/GameContext';
import { useLocation } from 'wouter';
import TopNav from '@/components/TopNav';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface LeaderboardEntry {
  rank: number;
  name: string;
  xp: number;
  badges: number;
  level: number;
  avatar: string;
  score: number; // XP + (badges * 50)
}

export default function LeaderboardPage() {
  const { player } = useGame();
  const [, navigate] = useLocation();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    // Load all players from localStorage (simulated multi-user scenario)
    try {
      const allPlayers = localStorage.getItem('scienceExplorer_allPlayers');
      let players: any[] = [];
      
      if (allPlayers) {
        players = JSON.parse(allPlayers);
      } else {
        // Initialize with current player if no data exists
        players = [player];
        localStorage.setItem('scienceExplorer_allPlayers', JSON.stringify(players));
      }

      // Generate leaderboard entries
      const entries = players.map((p, idx) => ({
        rank: idx + 1,
        name: p.name,
        xp: p.xp,
        badges: p.earnedBadges?.length || 0,
        level: p.level,
        avatar: p.avatarEmoji,
        score: p.xp + ((p.earnedBadges?.length || 0) * 50),
      }));

      // Sort by score (XP + badge bonus)
      entries.sort((a, b) => b.score - a.score);

      // Re-rank after sorting
      entries.forEach((e, i) => {
        e.rank = i + 1;
      });

      // Take top 10
      setLeaderboard(entries.slice(0, 10));
    } catch (err) {
      console.error('Error loading leaderboard:', err);
      // Fallback: show current player
      setLeaderboard([{
        rank: 1,
        name: player.name,
        xp: player.xp,
        badges: player.earnedBadges.length,
        level: player.level,
        avatar: player.avatarEmoji,
        score: player.xp + (player.earnedBadges.length * 50),
      }]);
    }
  }, [player]);

  const currentPlayerRank = leaderboard.find(e => e.name === player.name)?.rank || null;

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${rank}`;
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFF8E7' }}>
      <TopNav />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          maxWidth: 800,
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
            fontSize: '2.5rem',
            color: '#3D2B1F',
            margin: '0 0 0.5rem 0',
          }}>
            🏆 Leaderboard
          </h1>
          <p style={{
            fontFamily: "'Comic Neue', cursive",
            fontSize: '1rem',
            color: '#666',
            margin: 0,
          }}>
            Top 10 Explorers by XP & Badges
          </p>
        </div>

        {/* Leaderboard Table */}
        <div style={{
          background: 'white',
          border: '4px solid #3D2B1F',
          borderRadius: 20,
          overflow: 'hidden',
          boxShadow: '6px 6px 0 #3D2B1F',
          marginBottom: '2rem',
        }}>
          {leaderboard.length > 0 ? (
            <div>
              {leaderboard.map((entry, idx) => {
                const isCurrentPlayer = entry.name === player.name;
                return (
                  <motion.div
                    key={entry.rank}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '1rem 1.5rem',
                      borderBottom: idx < leaderboard.length - 1 ? '2px dashed #DDD' : 'none',
                      background: isCurrentPlayer ? '#FFF9E6' : 'white',
                      borderLeft: isCurrentPlayer ? '4px solid #FFD700' : 'none',
                    }}
                  >
                    {/* Rank */}
                    <div style={{
                      fontFamily: "'Fredoka One', sans-serif",
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      minWidth: 50,
                      textAlign: 'center',
                      color: entry.rank <= 3 ? '#FF9500' : '#666',
                    }}>
                      {getMedalEmoji(entry.rank)}
                    </div>

                    {/* Avatar & Name */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      flex: 1,
                      marginLeft: '1rem',
                    }}>
                      <div style={{
                        width: 50,
                        height: 50,
                        borderRadius: '50%',
                        background: '#E8F5E9',
                        border: '2px solid #3D2B1F',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.5rem',
                      }}>
                        {entry.avatar}
                      </div>
                      <div>
                        <div style={{
                          fontFamily: "'Fredoka One', sans-serif",
                          fontSize: '1rem',
                          color: '#3D2B1F',
                          fontWeight: 'bold',
                          margin: 0,
                        }}>
                          {entry.name}
                          {isCurrentPlayer && ' (You)'}
                        </div>
                        <div style={{
                          fontFamily: "'Comic Neue', cursive",
                          fontSize: '0.85rem',
                          color: '#888',
                          margin: 0,
                        }}>
                          Level {entry.level}
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div style={{
                      display: 'flex',
                      gap: '2rem',
                      textAlign: 'right',
                    }}>
                      <div>
                        <div style={{
                          fontFamily: "'Fredoka One', sans-serif",
                          fontSize: '1.2rem',
                          color: '#FFD700',
                          fontWeight: 'bold',
                          margin: 0,
                        }}>
                          {entry.xp} XP
                        </div>
                        <div style={{
                          fontFamily: "'Comic Neue', cursive",
                          fontSize: '0.8rem',
                          color: '#888',
                          margin: 0,
                        }}>
                          Experience
                        </div>
                      </div>
                      <div>
                        <div style={{
                          fontFamily: "'Fredoka One', sans-serif",
                          fontSize: '1.2rem',
                          color: '#FF6B9D',
                          fontWeight: 'bold',
                          margin: 0,
                        }}>
                          {entry.badges} 🏅
                        </div>
                        <div style={{
                          fontFamily: "'Comic Neue', cursive",
                          fontSize: '0.8rem',
                          color: '#888',
                          margin: 0,
                        }}>
                          Badges
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          ) : (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              fontFamily: "'Comic Neue', cursive",
              color: '#666',
            }}>
              No leaderboard data yet. Complete lessons to appear on the leaderboard!
            </div>
          )}
        </div>

        {/* Your Rank Card */}
        {currentPlayerRank && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              border: '4px solid #3D2B1F',
              borderRadius: 16,
              padding: '1.5rem',
              textAlign: 'center',
              boxShadow: '4px 4px 0 #3D2B1F',
              marginBottom: '2rem',
            }}
          >
            <div style={{
              fontFamily: "'Fredoka One', sans-serif",
              fontSize: '1.2rem',
              color: '#3D2B1F',
              marginBottom: '0.5rem',
            }}>
              🎯 Your Rank
            </div>
            <div style={{
              fontFamily: "'Fredoka One', sans-serif",
              fontSize: '2.5rem',
              color: '#3D2B1F',
              fontWeight: 'bold',
              margin: 0,
            }}>
              #{currentPlayerRank}
            </div>
            <div style={{
              fontFamily: "'Comic Neue', cursive",
              fontSize: '0.95rem',
              color: '#3D2B1F',
              marginTop: '0.5rem',
            }}>
              Keep exploring to climb the leaderboard! 🚀
            </div>
          </motion.div>
        )}

        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          style={{
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
