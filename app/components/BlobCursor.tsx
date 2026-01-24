'use client'

import { useEffect, useRef } from 'react'
import {
  BLOB_EASING,
  BLOB_BASE_SIZE,
  BLOB_PADDING_LARGE,
  BLOB_PADDING_MEDIUM,
  BLOB_PADDING_SMALL,
  BLOB_SIZE_MULTIPLIER_LARGE,
  BLOB_SIZE_MULTIPLIER_MEDIUM,
} from '../constants/animation'

interface HoverTarget {
  type: 'header' | 'contact' | 'button' | 'skill'
  bounds: DOMRect
}

export default function BlobCursor(): JSX.Element {
  const blobRef = useRef<HTMLDivElement>(null)
  const mouseX = useRef(0)
  const mouseY = useRef(0)
  const blobX = useRef(0)
  const blobY = useRef(0)
  const blobWidth = useRef(BLOB_BASE_SIZE)
  const blobHeight = useRef(BLOB_BASE_SIZE)
  const currentHoverRef = useRef<HoverTarget | null>(null)
  const lastHoverTypeRef = useRef<string | null>(null)

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
        try {
          const range = document.createRange()
          range.selectNodeContents(contactButton)
          const textRect = range.getBoundingClientRect()

          const isWithinBounds =
            clientX >= textRect.left - BLOB_PADDING_LARGE &&
            clientX <= textRect.right + BLOB_PADDING_LARGE &&
            clientY >= textRect.top - BLOB_PADDING_SMALL &&
            clientY <= textRect.bottom + BLOB_PADDING_SMALL

          if (isWithinBounds) {
            return {
              type: 'header',
              bounds: new DOMRect(
                textRect.left - BLOB_PADDING_LARGE,
                textRect.top - BLOB_PADDING_SMALL,
                textRect.width + BLOB_SIZE_MULTIPLIER_LARGE,
                textRect.height + BLOB_PADDING_MEDIUM
              ),
            }
          }
        } catch (error) {
          console.error('Error creating range for contact button:', error)
        }
      }

      // Check for skill bubble
      const skillBubble = target.closest('.skill-bubble')
      if (skillBubble) {
        const rect = skillBubble.getBoundingClientRect()

        const isWithinBounds =
          clientX >= rect.left - BLOB_PADDING_LARGE &&
          clientX <= rect.right + BLOB_PADDING_LARGE &&
          clientY >= rect.top - BLOB_PADDING_MEDIUM &&
          clientY <= rect.bottom + BLOB_PADDING_MEDIUM

        if (isWithinBounds) {
          return {
            type: 'skill',
            bounds: new DOMRect(
              rect.left - BLOB_PADDING_LARGE,
              rect.top - BLOB_PADDING_MEDIUM,
              rect.width + BLOB_SIZE_MULTIPLIER_LARGE,
              rect.height + BLOB_SIZE_MULTIPLIER_MEDIUM
            ),
          }
        }
      }

      // Check for contact link
      const contactLink = target.closest('.contact-link')
      if (contactLink) {
        const rect = contactLink.getBoundingClientRect()
        return {
          type: 'contact',
          bounds: new DOMRect(rect.left, rect.bottom - BLOB_PADDING_SMALL, rect.width, BLOB_PADDING_SMALL),
        }
      }

      // Check for experience link
      const experienceLink = target.closest('.experience-link')
      if (experienceLink) {
        const rect = experienceLink.getBoundingClientRect()
        return {
          type: 'contact',
          bounds: new DOMRect(rect.left, rect.bottom - BLOB_PADDING_SMALL, rect.width, BLOB_PADDING_SMALL),
        }
      }

      // Check for download button
      const downloadBtn = target.closest('.download-btn')
      if (downloadBtn) {
        const rect = downloadBtn.getBoundingClientRect()

        const isWithinBounds =
          clientX >= rect.left - BLOB_PADDING_LARGE &&
          clientX <= rect.right + BLOB_PADDING_LARGE &&
          clientY >= rect.top - BLOB_PADDING_SMALL &&
          clientY <= rect.bottom + BLOB_PADDING_SMALL

        if (isWithinBounds) {
          return {
            type: 'button',
            bounds: new DOMRect(
              rect.left - BLOB_PADDING_MEDIUM,
              rect.top - BLOB_PADDING_SMALL,
              rect.width + BLOB_SIZE_MULTIPLIER_MEDIUM,
              rect.height + BLOB_PADDING_MEDIUM
            ),
          }
        }
      }

      // Check for h1/h2
      const header = target.closest('h1, h2')
      if (header) {
        try {
          const range = document.createRange()
          range.selectNodeContents(header)
          const textRect = range.getBoundingClientRect()

          const isWithinBounds =
            clientX >= textRect.left - BLOB_PADDING_LARGE &&
            clientX <= textRect.right + BLOB_PADDING_LARGE &&
            clientY >= textRect.top - BLOB_PADDING_SMALL &&
            clientY <= textRect.bottom + BLOB_PADDING_SMALL

          if (isWithinBounds) {
            return {
              type: 'header',
              bounds: new DOMRect(
                textRect.left - BLOB_PADDING_LARGE,
                textRect.top - BLOB_PADDING_SMALL,
                textRect.width + BLOB_SIZE_MULTIPLIER_LARGE,
                textRect.height + BLOB_PADDING_MEDIUM
              ),
            }
          }
        } catch (error) {
          console.error('Error creating range for header:', error)
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
        // Smoothly animate to hover target (use center of bounds for consistent positioning)
        const targetX = hover.bounds.left + hover.bounds.width / 2
        const targetY = hover.bounds.top + hover.bounds.height / 2
        blobX.current += (targetX - blobX.current) * BLOB_EASING
        blobY.current += (targetY - blobY.current) * BLOB_EASING
        blobWidth.current += (hover.bounds.width - blobWidth.current) * BLOB_EASING
        blobHeight.current += (hover.bounds.height - blobHeight.current) * BLOB_EASING
      } else {
        // Return to circle following mouse
        blobX.current += (mouseX.current - blobX.current) * BLOB_EASING
        blobY.current += (mouseY.current - blobY.current) * BLOB_EASING
        blobWidth.current += (BLOB_BASE_SIZE - blobWidth.current) * BLOB_EASING
        blobHeight.current += (BLOB_BASE_SIZE - blobHeight.current) * BLOB_EASING
      }

      // Always use center-based positioning for smooth transitions
      blob.style.left = blobX.current + 'px'
      blob.style.top = blobY.current + 'px'
      blob.style.width = blobWidth.current + 'px'
      blob.style.height = blobHeight.current + 'px'
      blob.style.transform = 'translate(-50%, -50%)'

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
