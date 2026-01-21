'use client'

import { useEffect, useState } from 'react'


export default function BackgroundResume() {
  const [topPosition, setTopPosition] = useState('25vh');
  const [opacity, setOpacity] = useState(0.1);

  useEffect(() => {
    const handleScroll = () => {
      // Start at 25vh and increase to 50vh as you scroll
      const scrollProgress = Math.min(window.scrollY / 500, 1); // Full movement within 500px of scroll
      const newTop = 25 + scrollProgress * 25; // Goes from 25vh to 50vh
      setTopPosition(`${newTop}vh`);
      // Fade out opacity from 0.1 to 0 as it reaches center
      const newOpacity = 0.1 * (1 - scrollProgress);
      setOpacity(newOpacity);
    };

    window.addEventListener('scroll', handleScroll);
    // Call once to set initial state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: topPosition,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: 'clamp(50px, 20vw, 300px)',
        fontWeight: 300,
        fontFamily: 'var(--font-playfair), serif',
        color: '#000',
        zIndex: -1,
        whiteSpace: 'nowrap',
        opacity: opacity,
        pointerEvents: 'none',
        transition: 'top 0.1s ease, opacity 0.1s ease',
      }}
    >
      RÉSUMÉ
    </div>
  );
}

