'use client'

import { useEffect, useRef } from 'react'

interface HoverTarget {
  type: 'header' | 'contact' | 'button' | 'skill'
  bounds: DOMRect
}

export default function BlobCursor() {
  const blobRef = useRef<HTMLDivElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const blobX = useRef(0)
  const blobY = useRef(0)
  const blobWidth = useRef(20)
  const blobHeight = useRef(20)
  const currentHoverRef = useRef<HoverTarget | null>(null)
  const lastHoverTypeRef = useRef<string | null>(null)
  const easing = 0.12

  useEffect(() => {
    // Hide cursor on touch devices
    const handleTouchStart = () => {
      const blob = blobRef.current
      if (blob) {
        blob.style.display = 'none'
      }
    }

    window.addEventListener('touchstart', handleTouchStart, { once: true })

    const checkHoverState = (clientX: number, clientY: number): HoverTarget | null => {
      const target = document.elementFromPoint(clientX, clientY) as HTMLElement
      if (!target) return null

      // Check for contact button
      const contactButton = target.closest('.contact-button')
      if (contactButton) {
        // Use range to get actual text bounds, not full element bounds
        const range = document.createRange()
        range.selectNodeContents(contactButton)
        const textRect = range.getBoundingClientRect()

        const padding = 8
        const isWithinBounds =
          clientX >= textRect.left - padding &&
          clientX <= textRect.right + padding &&
          clientY >= textRect.top - 2 &&
          clientY <= textRect.bottom + 2

        if (isWithinBounds) {
          return {
            type: 'header',
            bounds: new DOMRect(textRect.left - 8, textRect.top - 2, textRect.width + 16, textRect.height + 4),
          }
        }
      }

      // Check for skill bubble
      const skillBubble = target.closest('.skill-bubble')
      if (skillBubble) {
        const rect = skillBubble.getBoundingClientRect()
        
        const padding = 8
        const isWithinBounds =
          clientX >= rect.left - padding &&
          clientX <= rect.right + padding &&
          clientY >= rect.top - 4 &&
          clientY <= rect.bottom + 4

        if (isWithinBounds) {
          return {
            type: 'skill',
            bounds: new DOMRect(rect.left - 8, rect.top - 4, rect.width + 16, rect.height + 8),
          }
        }
      }

      // Check for contact link
      const contactLink = target.closest('.contact-link')
      if (contactLink) {
        const rect = contactLink.getBoundingClientRect()
        return {
          type: 'contact',
          bounds: new DOMRect(rect.left, rect.bottom - 2, rect.width, 2),
        }
      }

      // Check for experience link
      const experienceLink = target.closest('.experience-link')
      if (experienceLink) {
        const rect = experienceLink.getBoundingClientRect()
        return {
          type: 'contact',
          bounds: new DOMRect(rect.left, rect.bottom - 2, rect.width, 2),
        }
      }

      // Check for download button
      const downloadBtn = target.closest('.download-btn')
      if (downloadBtn) {
        const rect = downloadBtn.getBoundingClientRect()
        
        const padding = 8
        const isWithinBounds =
          clientX >= rect.left - padding &&
          clientX <= rect.right + padding &&
          clientY >= rect.top - 2 &&
          clientY <= rect.bottom + 2

        if (isWithinBounds) {
          return {
            type: 'button',
            bounds: new DOMRect(rect.left - 4, rect.top - 2, rect.width + 8, rect.height + 4),
          }
        }
      }

      // Check for h1/h2
      const header = target.closest('h1, h2')
      if (header) {
        // Use range to get actual text bounds, not full element bounds
        const range = document.createRange()
        range.selectNodeContents(header)
        const textRect = range.getBoundingClientRect()

        const padding = 8
        const isWithinBounds =
          clientX >= textRect.left - padding &&
          clientX <= textRect.right + padding &&
          clientY >= textRect.top - 2 &&
          clientY <= textRect.bottom + 2

        if (isWithinBounds) {
          return {
            type: 'header',
            bounds: new DOMRect(textRect.left - 8, textRect.top - 2, textRect.width + 16, textRect.height + 4),
          }
        }
      }

      return null
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
      currentHoverRef.current = checkHoverState(e.clientX, e.clientY)
    }

    const handleScroll = () => {
      currentHoverRef.current = checkHoverState(mouseX.current, mouseY.current)
    }

    // Single animation loop, not recreated on state changes
    const animate = () => {
      const blob = blobRef.current
      if (!blob) {
        requestAnimationFrame(animate)
        return
      }

      const hover = currentHoverRef.current
      const hoverType = hover?.type ?? null

      // Update class based on hover type (only when it changes)
      if (hoverType !== lastHoverTypeRef.current) {
        blob.classList.remove('hover-header', 'hover-contact', 'hover-button', 'hover-skill')
        if (hoverType === 'header') blob.classList.add('hover-header')
        else if (hoverType === 'contact') blob.classList.add('hover-contact')
        else if (hoverType === 'button') blob.classList.add('hover-button')
        else if (hoverType === 'skill') blob.classList.add('hover-skill')
        lastHoverTypeRef.current = hoverType
      }

      if (hover) {
        // Smoothly animate to hover target
        blobX.current += (hover.bounds.left - blobX.current) * 0.12
        blobY.current += (hover.bounds.top - blobY.current) * 0.12
        blobWidth.current += (hover.bounds.width - blobWidth.current) * 0.12
        blobHeight.current += (hover.bounds.height - blobHeight.current) * 0.12

        blob.style.left = blobX.current + 'px'
        blob.style.top = blobY.current + 'px'
        blob.style.width = blobWidth.current + 'px'
        blob.style.height = blobHeight.current + 'px'
        blob.style.transform = 'translate(0, 0)'
      } else {
        // Return to circle following mouse
        blobX.current += (mouseX.current - blobX.current) * 0.12
        blobY.current += (mouseY.current - blobY.current) * 0.12
        blobWidth.current += (20 - blobWidth.current) * 0.12
        blobHeight.current += (20 - blobHeight.current) * 0.12

        blob.style.left = blobX.current + 'px'
        blob.style.top = blobY.current + 'px'
        blob.style.width = blobWidth.current + 'px'
        blob.style.height = blobHeight.current + 'px'
        blob.style.transform = 'translate(-50%, -50%)'
      }

      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('scroll', handleScroll, true)

    const animationId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('scroll', handleScroll, true)
      window.removeEventListener('touchstart', handleTouchStart)
      cancelAnimationFrame(animationId)
    }
  }, [])

  return <div ref={blobRef} className="blob-cursor" />
}
