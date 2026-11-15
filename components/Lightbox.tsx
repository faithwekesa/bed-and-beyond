'use client'

import { useCallback, useEffect, useRef } from 'react'
import Image from 'next/image'

export type LbItem = { src: string; alt: string; caption?: string }

type Props = {
  items: LbItem[]
  index: number
  onIndex: (n: number) => void
  onClose: () => void
}

export default function Lightbox({ items, index, onIndex, onClose }: Props) {
  const box = useRef<HTMLDivElement>(null)
  const closeBtn = useRef<HTMLButtonElement>(null)
  const startX = useRef<number | null>(null)
  const n = items.length
  const item = items[index]

  const go = useCallback((d: number) => onIndex((index + d + n) % n), [index, n, onIndex])

  useEffect(() => {
    const prev = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeBtn.current?.focus()
    return () => {
      document.body.style.overflow = overflow
      prev?.focus()
    }
  }, [])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'ArrowRight') {
        go(1)
        return
      }
      if (e.key === 'ArrowLeft') {
        go(-1)
        return
      }
      if (e.key === 'Tab') {
        const f = box.current?.querySelectorAll<HTMLElement>('button')
        if (!f || !f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [go, onClose])

  useEffect(() => {
    ;[1, -1].forEach((d) => {
      const im = new window.Image()
      im.src = items[(index + d + n) % n].src
    })
  }, [index, items, n])

  return (
    <div className="gx-lb" role="dialog" aria-modal="true" aria-label="Photo viewer" ref={box} onClick={onClose}>
      <button
        ref={closeBtn}
        type="button"
        className="gx-lb-close"
        aria-label="Close"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
      >
        ×
      </button>
      <button
        type="button"
        className="gx-lb-nav gx-lb-prev"
        aria-label="Previous photo"
        onClick={(e) => {
          e.stopPropagation()
          go(-1)
        }}
      >
        ‹
      </button>
      <figure
        className="gx-lb-fig"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => {
          startX.current = e.touches[0].clientX
        }}
        onTouchEnd={(e) => {
          if (startX.current === null) return
          const dx = e.changedTouches[0].clientX - startX.current
          startX.current = null
          if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1)
        }}
      >
        <div className="gx-lb-img">
          <Image src={item.src} alt={item.alt} fill sizes="100vw" unoptimized />
        </div>
        <figcaption>
          {item.caption ? <span>{item.caption}</span> : null}
          <span className="gx-lb-count">
            {index + 1} of {n}
          </span>
        </figcaption>
      </figure>
      <button
        type="button"
        className="gx-lb-nav gx-lb-next"
        aria-label="Next photo"
        onClick={(e) => {
          e.stopPropagation()
          go(1)
        }}
      >
        ›
      </button>
    </div>
  )
}
