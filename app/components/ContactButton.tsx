'use client'

export default function ContactButton() {
  return (
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
        marginBottom: '40px',
        display: 'block',
        textAlign: 'center',
        textDecoration: 'none',
        transition: 'transform 0.2s ease',
        transformOrigin: 'center'
      }}
      // hover scale removed
    >
      Interested? Inspired?
    </a>
  )
}
