import { ANIMATION_DELAY_FAST, ANIMATION_DELAY_STANDARD, ANIMATION_DELAY_COMPLETE } from '../constants/animation'

export function wrapTextInChars(element: HTMLElement | null) {
  if (!element || !element.dataset.text) return
  const text = element.dataset.text

  // Clear existing content safely
  while (element.firstChild) {
    element.removeChild(element.firstChild)
  }

  for (let i = 0; i < text.length; i++) {
    const char = text[i] === ' ' ? '\u00A0' : text[i]
    const span = document.createElement('span')
    span.className = 'char'
    span.textContent = char
    element.appendChild(span)
  }
}

export function wrapAllTextInChars(container: HTMLElement) {
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    null
  )
  const textNodes: Text[] = []
  let node: Node | null
  while ((node = walker.nextNode())) {
    if (node.textContent?.trim()) {
      textNodes.push(node as Text)
    }
  }
  textNodes.forEach((textNode) => {
    const parent = textNode.parentNode as HTMLElement
    if (!parent || parent.tagName === 'SCRIPT' || parent.tagName === 'STYLE')
      return
    const text = textNode.textContent || ''
    const fragment = document.createDocumentFragment()
    for (let i = 0; i < text.length; i++) {
      const char = text[i] === ' ' ? '\u00A0' : text[i]
      const span = document.createElement('span')
      span.className = 'char'
      span.textContent = char
      fragment.appendChild(span)
    }
    parent.replaceChild(fragment, textNode)
  })
}

export function restoreTextContent(container: HTMLElement) {
  if (container.dataset.originalHtml) {
    container.innerHTML = container.dataset.originalHtml
    delete container.dataset.originalHtml
  }
}

export function animateChars(
  container: HTMLElement,
  onComplete?: () => void
) {
  const allChars = Array.from(container.querySelectorAll('.char'))
  let charIndex = 0
  const animateNext = () => {
    if (charIndex < allChars.length) {
      const char = allChars[charIndex] as HTMLElement
      char.classList.add('fade-in')
      charIndex++
      setTimeout(animateNext, ANIMATION_DELAY_FAST)
    } else {
      setTimeout(() => {
        container.classList.remove('animating')
        onComplete?.()
      }, ANIMATION_DELAY_COMPLETE)
    }
  }
  setTimeout(animateNext, ANIMATION_DELAY_STANDARD)
}
