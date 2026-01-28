'use client'

export default function BackgroundResume(): JSX.Element {
  return (
    <section
      className="hero-section"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 24px',
        position: 'relative',
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
        <a
          href="#resume"
          className="hero-heading"
          style={{
            fontFamily: 'var(--font-playfair), serif',
            fontWeight: 300,
            color: '#333',
            fontSize: 'clamp(3rem, 8vw, 4.5rem)',
            lineHeight: 1.1,
            marginBottom: '24px',
            textDecoration: 'none',
            display: 'block',
          }}
        >
          Résumé
        </a>

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
          USDA certified, 100% organic projects.
        </p>
      </div>

    </section>
  )
}
