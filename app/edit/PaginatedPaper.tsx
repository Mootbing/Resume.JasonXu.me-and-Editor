'use client'

import { ReactNode, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'

const DPI = 96
const PAGE_WIDTH_PX = 8.5 * DPI
const PAGE_HEIGHT_PX = 11 * DPI
const PAGE_PADDING_PX = 0.5 * DPI
const CONTENT_HEIGHT_PX = PAGE_HEIGHT_PX - 2 * PAGE_PADDING_PX

interface PaginatedPaperProps {
  blocks: ReactNode[]
}

export default function PaginatedPaper({ blocks }: PaginatedPaperProps): JSX.Element {
  const wrapRef = useRef<HTMLDivElement>(null)
  const measureRef = useRef<HTMLDivElement>(null)
  const [pages, setPages] = useState<number[][]>(() => [blocks.map((_, i) => i)])
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (!wrapRef.current) return
    const update = () => {
      if (!wrapRef.current) return
      const cw = wrapRef.current.clientWidth
      const target = Math.max(0, cw - 32)
      setScale(Math.min(1, target / PAGE_WIDTH_PX))
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(wrapRef.current)
    return () => ro.disconnect()
  }, [])

  useLayoutEffect(() => {
    const m = measureRef.current
    if (!m) return
    const els = Array.from(m.children) as HTMLElement[]
    if (els.length !== blocks.length) return
    const result: number[][] = [[]]
    let cur = 0
    els.forEach((el, i) => {
      const h = el.getBoundingClientRect().height
      const last = result[result.length - 1]
      if (cur + h > CONTENT_HEIGHT_PX && last.length > 0) {
        result.push([i])
        cur = h
      } else {
        last.push(i)
        cur += h
      }
    })
    setPages(result)
  }, [blocks])

  const blockKey = (b: ReactNode, i: number) => {
    if (b && typeof b === 'object' && 'key' in (b as object)) {
      const k = (b as { key?: string | number | null }).key
      if (k != null) return k
    }
    return i
  }

  const measureWidth = PAGE_WIDTH_PX - 2 * PAGE_PADDING_PX

  const visiblePageHeight = PAGE_HEIGHT_PX * scale
  const visiblePageWidth = PAGE_WIDTH_PX * scale

  return (
    <div className="lx-paper-stack" ref={wrapRef}>
      <div
        className="lx-measure"
        ref={measureRef}
        aria-hidden="true"
        style={{ width: measureWidth }}
      >
        {blocks.map((b, i) => (
          <div key={blockKey(b, i)} className="lx-block">
            {b}
          </div>
        ))}
      </div>

      <div className="lx-pages">
        {pages.map((idxs, p) => (
          <div
            key={p}
            className="lx-page-outer"
            style={{ width: visiblePageWidth, height: visiblePageHeight }}
          >
            <div
              className="lx-page-frame"
              style={{
                width: PAGE_WIDTH_PX,
                height: PAGE_HEIGHT_PX,
                transform: `scale(${scale})`,
                transformOrigin: '0 0',
              }}
            >
              <div className="lx-page-content">
                {idxs.map((i) => (
                  <div key={blockKey(blocks[i], i)} className="lx-block">
                    {blocks[i]}
                  </div>
                ))}
              </div>
              <div className="lx-page-num">
                {p + 1} / {pages.length}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
