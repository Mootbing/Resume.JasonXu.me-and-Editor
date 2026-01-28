'use client'

const NAV_LINKS = [
  { href: 'https://jasonxu.me', label: 'About Me' },
  { href: 'https://contact.jasonxu.me', label: 'Contact' },
  { href: 'https://github.jasonxu.me', label: 'GitHub' },
  { href: 'https://linkedin.jasonxu.me', label: 'LinkedIn' },
] as const

export default function Footer() {
  return (
    <footer className="resume-footer">
      <h2 className="footer-heading">
        <a
          href="https://email.jasonxu.me"
          target="_blank"
          rel="noopener noreferrer"
          className="footer-email"
        >
          him@jasonxu.me
        </a>
      </h2>
      <nav className="footer-nav">
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-nav-link"
          >
            {label}
          </a>
        ))}
      </nav>
    </footer>
  )
}
