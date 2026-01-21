'use client'

import { useEffect, useState } from 'react'
import {
  BACKGROUND_RESUME_START_VH,
  BACKGROUND_RESUME_START_PX,
  BACKGROUND_RESUME_END_PX,
  SCROLL_THRESHOLD_PX,
  BACKGROUND_RESUME_FONT_SIZE,
} from '../constants/animation'

export default function BackgroundResume(): JSX.Element {
  const [topPosition, setTopPosition] = useState(`${BACKGROUND_RESUME_START_VH}vh`)
  const [opacity, setOpacity] = useState(0.1)

  useEffect(() => {
    const handleScroll = () => {
      const scrollProgress = Math.min(window.scrollY / SCROLL_THRESHOLD_PX, 1)
      const newTop = BACKGROUND_RESUME_START_PX + scrollProgress * BACKGROUND_RESUME_END_PX
      setTopPosition(`${newTop}vh`)
      const newOpacity = 0.1 * (1 - scrollProgress)
      setOpacity(newOpacity)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: topPosition,
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: BACKGROUND_RESUME_FONT_SIZE,
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
  )
}

