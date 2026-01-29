'use client'

import { useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'

export default function ResumeContainer({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleScroll = () => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const vh = window.innerHeight

    // margin goes from 10rem → 0 as the container top travels
    // from the viewport bottom (vh) to the 50 % mark (vh * 0.5)
    const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.5)))
    const margin = 2 * (1 - progress)

    containerRef.current.style.marginLeft = `${margin}rem`
    containerRef.current.style.marginRight = `${margin}rem`

    if (window.innerWidth <= 800) {
      const borderRadius = 50 * (1 - progress)
      containerRef.current.style.borderRadius = `${borderRadius}px ${borderRadius}px 0 0`
    } else {
      containerRef.current.style.borderRadius = ''
    }
  }

  // Run before first paint to avoid flicker
  useLayoutEffect(() => {
    handleScroll()
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      id="resume"
      className="container"
      ref={containerRef}
      style={{ marginLeft: '2rem', marginRight: '2rem' }}
    >
      {children}
    </div>
  )
}
