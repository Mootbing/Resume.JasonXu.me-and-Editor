'use client'

export default function ContactButton(): JSX.Element {
  return (
    <div className="contact-button-container">
      <a
        href="https://contact.jasonxu.me"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-button"
      >
        Interested? Inspired?
      </a>
      <a
        href="https://jasonxu.me"
        target="_blank"
        rel="noopener noreferrer"
        className="contact-link contact-link-secondary"
      >
        JasonXu.me
      </a>
    </div>
  )
}
