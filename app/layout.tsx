import type { Metadata } from 'next'
import { Playfair_Display, Montserrat } from 'next/font/google'
import { readFileSync } from 'fs'
import { join } from 'path'
import './globals.css'
import BlobCursor from './components/BlobCursor'
import { parseResume } from './utils/parseResume'

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: 'variable',
  variable: '--font-playfair',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['300'],
  variable: '--font-montserrat',
})

export async function generateMetadata(): Promise<Metadata> {
  const tex = readFileSync(join(process.cwd(), 'REPLACE_ME_resume.tex'), 'utf-8')
  const { header } = parseResume(tex)
  const name = header.name || 'Resume'
  return {
    title: `${name} | Resume`,
    description: `${name} Resume`,
    icons: {
      icon: '/favicon.ico',
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${playfairDisplay.variable} ${montserrat.variable}`}>
        <BlobCursor />
        {children}
      </body>
    </html>
  )
}
