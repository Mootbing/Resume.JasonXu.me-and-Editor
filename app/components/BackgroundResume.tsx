'use client'

import { useEffect, useRef } from 'react'

export default function BackgroundResume(): JSX.Element {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return
      const scrollY = window.scrollY
      const fadeEnd = window.innerHeight * 0.6
      const opacity = Math.max(0, 1 - scrollY / fadeEnd)
      sectionRef.current.style.opacity = String(opacity)
      sectionRef.current.style.pointerEvents = opacity < 0.1 ? 'none' : 'auto'
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="hero-section"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        zIndex: 0,
        width: '100%',
        maxWidth: '800px',
      }}
    >
      <div style={{ maxWidth: '720px', width: '100%', textAlign: 'center' }}>
        {/* Name Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '16px',
          }}
        >
          <img
            src="/cow.svg"
            alt="Cow icon"
            style={{
              width: '48px',
              height: '48px',
              filter: 'invert(1) brightness(0.75)',
            }}
          />
          <p
            style={{
              fontFamily: 'var(--font-montserrat), sans-serif',
              fontWeight: 300,
              color: '#666',
              letterSpacing: '0.1em',
              fontSize: '1rem',
              margin: 0,
            }}
          >
            JASON XU
          </p>
        </div>

        {/* Hero Heading */}
        <p
          className="hero-heading"
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 300,
            color: '#333',
            fontSize: 'clamp(3rem, 8vw, 4.5rem)',
            lineHeight: 1.1,
            marginBottom: '24px',
            display: 'block',
          }}
        >
          Résumé
        </p>

        {/* Subtitle */}
        <p
          style={{
            color: '#666',
            lineHeight: 1.7,
            fontSize: '1rem',
            maxWidth: '540px',
            margin: '0 auto',
          }}
        >
          Locally sourced, grass fed projects.
        </p>
      </div>

    </section>
  )
}
