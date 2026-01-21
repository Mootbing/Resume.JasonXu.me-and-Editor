'use client'

import { useState, useRef, ReactNode } from 'react'
import { wrapAllTextInChars, restoreTextContent, animateChars } from '../utils/animation'

interface CollapsibleSectionProps {
  id: string
  title: string
  children: ReactNode
  contentClassName?: string
  toggleClassName?: string
}

export default function CollapsibleSection({
  id,
  title,
  children,
  contentClassName = 'content',
  toggleClassName = 'toggle',
}: CollapsibleSectionProps): JSX.Element {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const toggle = () => {
    if (isCollapsed) {
      setIsCollapsed(false)
      if (contentRef.current) {
        contentRef.current.classList.remove('collapsed')
        if (!contentRef.current.dataset.originalHtml) {
          contentRef.current.dataset.originalHtml =
            contentRef.current.innerHTML
        }
        wrapAllTextInChars(contentRef.current)
        contentRef.current.classList.add('animating')
        animateChars(contentRef.current)
      }
    } else {
      setIsCollapsed(true)
      if (contentRef.current) {
        contentRef.current.classList.add('collapsed')
        contentRef.current.classList.remove('animating')
        restoreTextContent(contentRef.current)
      }
    }
  }

  return (
    <section
      id={id}
      className={isCollapsed ? 'collapsed' : ''}
    >
      <h2
        className={`${toggleClassName} ${isCollapsed ? 'collapsed' : ''}`}
        onClick={toggle}
      >
        {title}
      </h2>
      <div
        ref={contentRef}
        className={`${contentClassName} ${isCollapsed ? 'collapsed' : ''}`}
      >
        {children}
      </div>
    </section>
  )
}
