'use client'

import { MouseEvent } from 'react'

const STATIC_PDF = '/Jason_Xu.pdf'

export default function DownloadButton(): JSX.Element {
  const handleClick = async (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    try {
      const r = await fetch('/api/download-resume')
      if (!r.ok) throw new Error(`status ${r.status}`)
      const blob = await r.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'Jason_Xu.pdf'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(url)
    } catch {
      window.location.href = STATIC_PDF
    }
  }

  return (
    <a
      href={STATIC_PDF}
      onClick={handleClick}
      download="Jason_Xu.pdf"
      className="download-btn download-btn-fixed"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
      </svg>
    </a>
  )
}
