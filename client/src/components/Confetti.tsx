// ============================================================
// SCIENCE EXPLORER ACADEMY — Confetti Celebration
// Triggered on lesson completion and correct boss battle answers
// ============================================================

import { useEffect, useRef } from 'react';

interface ConfettiProps {
  active: boolean;
  count?: number;
}

const COLORS = ['#FFD700', '#FF6B35', '#4FC3F7', '#52B788', '#FF4081', '#9B59B6'];
const SHAPES = ['●', '■', '▲', '★', '♦'];

export default function Confetti({ active, count = 40 }: ConfettiProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!active || !containerRef.current) return;
    const container = containerRef.current;

    // Clear previous
    container.innerHTML = '';

    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        left: ${Math.random() * 100}vw;
        top: -20px;
        font-size: ${Math.random() * 16 + 8}px;
        color: ${COLORS[Math.floor(Math.random() * COLORS.length)]};
        animation: confetti-fall ${Math.random() * 1.5 + 1}s ease-in ${Math.random() * 0.5}s forwards;
        transform: rotate(${Math.random() * 360}deg);
      `;
      particle.textContent = SHAPES[Math.floor(Math.random() * SHAPES.length)];
      container.appendChild(particle);
    }

    const timer = setTimeout(() => {
      if (container) container.innerHTML = '';
    }, 3000);

    return () => clearTimeout(timer);
  }, [active, count]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        overflow: 'hidden',
      }}
    />
  );
}
