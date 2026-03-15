// ============================================================
// POTION LAB GAME — Unit 1, Lesson 4: Mix it Up! (Review)
// Combine matter states to create the Super Solution
// Teaches: Review of all Unit 1 concepts
// ============================================================

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSounds } from '@/hooks/useSounds';

interface PotionLabProps {
  onComplete: (score: number) => void;
}

interface Ingredient {
  id: string;
  emoji: string;
  label: string;
  state: 'solid' | 'liquid' | 'gas';
  color: string;
}

interface Recipe {
  id: number;
  name: string;
  description: string;
  required: string[]; // ingredient ids
  resultEmoji: string;
  resultColor: string;
  scienceFact: string;
}

const INGREDIENTS: Ingredient[] = [
  { id: 'ice', emoji: '🧊', label: 'Ice (Solid)', state: 'solid', color: '#B3E5FC' },
  { id: 'water', emoji: '💧', label: 'Water (Liquid)', state: 'liquid', color: '#29B6F6' },
  { id: 'steam', emoji: '♨️', label: 'Steam (Gas)', state: 'gas', color: '#E1F5FE' },
  { id: 'rock', emoji: '🪨', label: 'Rock (Solid)', state: 'solid', color: '#795548' },
  { id: 'juice', emoji: '🧃', label: 'Juice (Liquid)', state: 'liquid', color: '#FF8F00' },
  { id: 'air', emoji: '💨', label: 'Air (Gas)', state: 'gas', color: '#E3F2FD' },
];

const RECIPES: Recipe[] = [
  {
    id: 1,
    name: '❄️ Frosty Freeze Potion',
    description: 'Combine a solid AND a liquid!',
    required: ['ice', 'water'],
    resultEmoji: '🫧',
    resultColor: '#B3E5FC',
    scienceFact: 'Ice and water are the SAME substance — just different states! H₂O!',
  },
  {
    id: 2,
    name: '☁️ Cloud Maker Potion',
    description: 'Mix a liquid AND a gas!',
    required: ['water', 'steam'],
    resultEmoji: '☁️',
    resultColor: '#E1F5FE',
    scienceFact: 'Clouds form when water vapor (gas) cools and condenses into tiny liquid droplets!',
  },
  {
    id: 3,
    name: '🌋 Volcano Blast Potion',
    description: 'Combine a solid AND a gas!',
    required: ['rock', 'air'],
    resultEmoji: '🌋',
    resultColor: '#FF5722',
    scienceFact: 'Volcanoes have solid rock AND gas bubbles — when gas escapes, it causes eruptions!',
  },
  {
    id: 4,
    name: '⚗️ SUPER SOLUTION',
    description: 'Use ALL THREE states: solid, liquid, AND gas!',
    required: ['ice', 'juice', 'steam'],
    resultEmoji: '✨',
    resultColor: '#FFD700',
    scienceFact: 'You combined all 3 states of matter! Everything in the universe is made of solid, liquid, or gas!',
  },
];

export default function PotionLab({ onComplete }: PotionLabProps) {
  const [cauldron, setCauldron] = useState<string[]>([]);
  const [completedRecipes, setCompletedRecipes] = useState<number[]>([]);
  const [currentResult, setCurrentResult] = useState<Recipe | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const { playCorrect, playWrong, playLevelUp, playDrop } = useSounds();

  const addIngredient = useCallback((ingredient: Ingredient) => {
    if (cauldron.includes(ingredient.id)) {
      setFeedback('Already in the cauldron!');
      setTimeout(() => setFeedback(null), 1500);
      return;
    }
    playDrop();
    setCauldron(prev => [...prev, ingredient.id]);
  }, [cauldron, playDrop]);

  const removeFromCauldron = useCallback((id: string) => {
    setCauldron(prev => prev.filter(i => i !== id));
  }, []);

  const clearCauldron = useCallback(() => {
    setCauldron([]);
    setCurrentResult(null);
  }, []);

  const brew = useCallback(() => {
    if (cauldron.length < 2) {
      setFeedback('Add at least 2 ingredients!');
      setTimeout(() => setFeedback(null), 1500);
      return;
    }

    // Check recipes
    const matchedRecipe = RECIPES.find(recipe => {
      const required = recipe.required;
      return required.every(r => cauldron.includes(r)) && cauldron.length === required.length;
    });

    if (matchedRecipe && !completedRecipes.includes(matchedRecipe.id)) {
      playCorrect();
      if (matchedRecipe.id === 4) playLevelUp();
      setCurrentResult(matchedRecipe);
      setCompletedRecipes(prev => [...prev, matchedRecipe.id]);
      setCauldron([]);

      if (completedRecipes.length + 1 >= RECIPES.length) {
        setTimeout(() => setGameOver(true), 3000);
      }
    } else if (matchedRecipe && completedRecipes.includes(matchedRecipe.id)) {
      setFeedback('Already made that potion! Try a different combo!');
      setTimeout(() => setFeedback(null), 2000);
    } else {
      playWrong();
      setFeedback('Hmm, that combo doesn\'t work... Try again!');
      setTimeout(() => setFeedback(null), 2000);
    }
  }, [cauldron, completedRecipes, playCorrect, playWrong, playLevelUp]);

  const finalScore = Math.min(3, Math.round((completedRecipes.length / RECIPES.length) * 3) + (completedRecipes.length >= 2 ? 1 : 0));

  return (
    <div style={{ position: 'relative' }}>
      {/* HUD */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        background: '#F5E8FF',
        borderBottom: '3px solid #3D2B1F',
        fontFamily: "'Fredoka One', sans-serif",
      }}>
        <span style={{ fontSize: '1rem', color: '#3D2B1F' }}>⚗️ Potions: {completedRecipes.length}/{RECIPES.length}</span>
        <span style={{ fontSize: '0.85rem', color: '#9B59B6', fontFamily: "'Comic Neue', cursive", fontWeight: 700 }}>
          Mix ingredients to make potions!
        </span>
      </div>

      <div style={{ padding: '0.75rem', background: '#F5E8FF', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {/* Ingredients shelf */}
        <div>
          <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.9rem', color: '#3D2B1F', marginBottom: '0.4rem' }}>
            🧪 Ingredient Shelf — Click to add!
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {INGREDIENTS.map(ing => (
              <motion.button
                key={ing.id}
                onClick={() => addIngredient(ing)}
                whileHover={{ scale: 1.1, rotate: 3 }}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: cauldron.includes(ing.id) ? '#C8F7C5' : ing.color,
                  border: `3px solid ${cauldron.includes(ing.id) ? '#52B788' : '#3D2B1F'}`,
                  borderRadius: 12,
                  padding: '0.4rem 0.6rem',
                  cursor: 'pointer',
                  boxShadow: '3px 3px 0 #3D2B1F',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '1px',
                  opacity: cauldron.includes(ing.id) ? 0.7 : 1,
                }}
              >
                <span style={{ fontSize: '1.5rem' }}>{ing.emoji}</span>
                <span style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.65rem', color: '#3D2B1F' }}>
                  {ing.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Cauldron */}
        <div style={{
          background: '#2D1B4E',
          border: '4px solid #3D2B1F',
          borderRadius: 20,
          padding: '0.75rem',
          boxShadow: '5px 5px 0 #3D2B1F',
          minHeight: 100,
        }}>
          <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.4rem' }}>
            🫕 Cauldron ({cauldron.length} ingredients)
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', minHeight: 50, alignItems: 'center' }}>
            {cauldron.length === 0 ? (
              <div style={{ color: 'rgba(255,255,255,0.4)', fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.85rem' }}>
                Add ingredients above...
              </div>
            ) : (
              cauldron.map(id => {
                const ing = INGREDIENTS.find(i => i.id === id);
                return ing ? (
                  <motion.button
                    key={id}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    onClick={() => removeFromCauldron(id)}
                    whileHover={{ scale: 1.1 }}
                    style={{
                      background: ing.color,
                      border: '2px solid rgba(255,255,255,0.5)',
                      borderRadius: 10,
                      padding: '0.3rem 0.5rem',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    <span style={{ fontSize: '1.2rem' }}>{ing.emoji}</span>
                    <span style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.65rem', color: '#3D2B1F' }}>✕</span>
                  </motion.button>
                ) : null;
              })
            )}
          </div>
        </div>

        {/* Feedback */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: '#FF8A65',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: 100,
                border: '2px solid #3D2B1F',
                fontFamily: "'Fredoka One', sans-serif",
                fontSize: '0.9rem',
                textAlign: 'center',
                boxShadow: '3px 3px 0 #3D2B1F',
              }}
            >
              {feedback}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <AnimatePresence>
          {currentResult && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{
                background: currentResult.resultColor + '33',
                border: `3px solid ${currentResult.resultColor}`,
                borderRadius: 14,
                padding: '0.75rem',
                boxShadow: '3px 3px 0 #3D2B1F',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '0.25rem' }}>{currentResult.resultEmoji}</div>
              <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1rem', color: '#3D2B1F' }}>
                {currentResult.name}
              </div>
              <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.8rem', color: '#5D4037', marginTop: '0.25rem' }}>
                🔬 {currentResult.scienceFact}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button onClick={clearCauldron} className="btn-cartoon btn-cartoon-red" style={{ flex: 1 }}>
            🗑️ Clear
          </button>
          <button onClick={brew} className="btn-cartoon btn-cartoon-yellow" style={{ flex: 2, fontSize: '1.1rem' }}>
            ⚗️ BREW!
          </button>
        </div>

        {/* Recipe hints */}
        <div>
          <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '0.85rem', color: '#3D2B1F', marginBottom: '0.4rem' }}>
            📜 Recipes to Discover:
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {RECIPES.map(recipe => (
              <div
                key={recipe.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  opacity: completedRecipes.includes(recipe.id) ? 1 : 0.6,
                }}
              >
                <span style={{ fontSize: '1rem' }}>
                  {completedRecipes.includes(recipe.id) ? '✅' : '⭕'}
                </span>
                <span style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, fontSize: '0.8rem', color: '#3D2B1F' }}>
                  {recipe.name} — {recipe.description}
                </span>
              </div>
            ))}
          </div>
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
              background: 'rgba(245,232,255,0.95)',
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
              ✨
            </motion.div>
            <div style={{ fontFamily: "'Fredoka One', sans-serif", fontSize: '1.5rem', color: '#3D2B1F' }}>
              Potion Master!
            </div>
            <div style={{ fontFamily: "'Comic Neue', cursive", fontWeight: 700, color: '#5D4037', textAlign: 'center', padding: '0 1rem' }}>
              You discovered all {completedRecipes.length} potions!
            </div>
            <div style={{ display: 'flex', gap: '4px' }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.span key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.2 }}
                  style={{ fontSize: '1.8rem', opacity: i < finalScore ? 1 : 0.25 }}>⭐</motion.span>
              ))}
            </div>
            <button onClick={() => onComplete(finalScore)} className="btn-cartoon btn-cartoon-yellow" style={{ fontSize: '1.1rem', padding: '0.75rem 2rem' }}>
              Continue! →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
