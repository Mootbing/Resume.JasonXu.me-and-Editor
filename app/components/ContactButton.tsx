'use client'

export default function ContactButton(): JSX.Element {
  return (
    <div style={{ textAlign: 'center' }}>
      <a
        href="https://contact.jasonxu.me"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-button"
        style={{
          fontFamily: 'var(--font-playfair), serif',
          fontWeight: 300,
          color: '#333',
          fontSize: '1.3em',
          marginTop: '40px',
          marginBottom: '0px',
          display: 'block',
          textAlign: 'center',
          textDecoration: 'none',
          transition: 'transform 0.2s ease',
          transformOrigin: 'center'
        }}
      >
        Interested? Inspired?
      </a>
      <a
        href="https://jasonxu.me"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-link"
        style={{
          color: '#666',
          fontSize: '0.9em',
          textDecoration: 'none',
          display: 'inline-block',
          transition: 'transform 0.2s ease'
        }}
      >
        JasonXu.me
      </a>
    </div>
  )
}
