import { ResumeHeader, HeaderContact } from '../utils/resumeTypes'

type IconType = 'mail' | 'linkedin' | 'github' | 'instagram' | null

function detectIcon(url: string): IconType {
  const u = url.toLowerCase()
  if (u.startsWith('mailto:')) return 'mail'
  if (u.includes('linkedin')) return 'linkedin'
  if (u.includes('github')) return 'github'
  if (u.includes('insta')) return 'instagram'
  return null
}

function shortenLabel(label: string, icon: IconType): string {
  if (icon === 'linkedin') {
    const m = label.match(/in\/([^/\s]+)/i)
    if (m) return m[1]
  }
  if (icon === 'github') {
    const m = label.match(/github\.com\/([^/\s]+)/i)
    if (m) return m[1]
  }
  if (icon === 'instagram') {
    const m = label.match(/instagram\.com\/([^/\s]+)/i)
    if (m) return m[1]
  }
  return label
}

function ContactIcon({ type }: { type: IconType }): JSX.Element | null {
  const common = {
    className: 'contact-icon',
    width: 14,
    height: 14,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }
  if (type === 'mail') {
    return (
      <svg {...common}>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
        <polyline points="22,6 12,13 2,6"></polyline>
      </svg>
    )
  }
  if (type === 'linkedin') {
    return (
      <svg {...common}>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
      </svg>
    )
  }
  if (type === 'instagram') {
    return (
      <svg {...common}>
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    )
  }
  if (type === 'github') {
    return (
      <svg {...common}>
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
      </svg>
    )
  }
  return null
}

interface HeaderProps {
  header: ResumeHeader
}

export default function Header({ header }: HeaderProps): JSX.Element {
  const websiteLink = header.contacts.find((c) => detectIcon(c.url) === null)
  const iconedContacts: HeaderContact[] = header.contacts.filter(
    (c) => detectIcon(c.url) !== null
  )

  return (
    <header>
      <div className="header-content">
        {header.icon && <img src={header.icon} alt="" className="cow-img" />}
        <div className="header-text">
          <div className="header-name-row">
            {websiteLink ? (
              <a
                href={websiteLink.url}
                target="_blank"
                rel="noopener noreferrer"
                className="header-link"
              >
                <h1>{header.name}</h1>
              </a>
            ) : (
              <h1>{header.name}</h1>
            )}
          </div>
          <div className="contact">
            {iconedContacts.map((c, i) => {
              const icon = detectIcon(c.url)
              const label = shortenLabel(c.label, icon)
              return (
                <a
                  key={i}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link"
                >
                  <ContactIcon type={icon} />
                  {label}
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}
