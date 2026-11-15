'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { VIDEOS } from '@/lib/videos'
import { SITE } from '@/lib/site'

const handle = (href: string) => {
  try {
    const last = new URL(href).pathname.split('/').filter(Boolean).pop() ?? ''
    return last.startsWith('@') ? last : '@' + last
  } catch {
    return ''
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

export default function WatchList() {
  const [open, setOpen] = useState<number | null>(null)
  const box = useRef<HTMLDivElement>(null)
  const socials = SITE.socials as { label: string; href: string }[]

  useEffect(() => {
    const el = box.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const rows = Array.from(el.querySelectorAll<HTMLElement>('.wl-row'))
    el.classList.add('wl-js')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          const t = e.target as HTMLElement
          t.classList.add('in')
          io.unobserve(t)
          window.setTimeout(() => {
            t.style.transitionDelay = ''
          }, 1000)
        })
      },
      { threshold: 0.15 }
    )
    rows.forEach((r, i) => {
      r.style.transitionDelay = `${(i % 3) * 90}ms`
      io.observe(r)
    })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (open === null) return
    const prev = document.activeElement as HTMLElement | null
    const overflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = overflow
      document.removeEventListener('keydown', onKey)
      prev?.focus()
    }
  }, [open])

  if (!VIDEOS.length && !socials.length) return null

  return (
    <section className="section">
      <div className="wrap">
        <div className="gx-head">
          <div className="eyebrow">Watch and follow</div>
          <h2>Our work on film</h2>
          <p>Short films from our visits and the places to follow our work.</p>
        </div>

        <div className="wl" ref={box}>
          {VIDEOS.map((v, k) => (
            <div className="wl-row" key={v.src}>
              <span className="wl-no">Film • {pad(k + 1)}</span>
              <div className="wl-text">
                <h3>{v.title}</h3>
                <p>{v.duration} min</p>
                <button type="button" className="wl-link" onClick={() => setOpen(k)}>
                  Play film <span className="wl-arrow">→</span>
                </button>
              </div>
              <button
                type="button"
                className="wl-thumb"
                aria-label={`Play video: ${v.title}`}
                onClick={() => setOpen(k)}
              >
                <Image src={v.poster} alt="" fill sizes="280px" />
                <span className="wl-play" aria-hidden="true" />
              </button>
            </div>
          ))}

          {socials.map((s, k) => (
            <div className="wl-row" key={s.href}>
              <span className="wl-no">Follow • {pad(k + 1)}</span>
              <div className="wl-text">
                <h3>{s.label}</h3>
                <p>{handle(s.href)}</p>
              </div>
              <a className="gx-btn gx-btn-line wl-open" href={s.href} target="_blank" rel="noopener noreferrer">
                Open {s.label} ↗
              </a>
            </div>
          ))}
        </div>
      </div>

      {open !== null ? (
        <div
          className="wl-modal"
          role="dialog"
          aria-modal="true"
          aria-label={VIDEOS[open].title}
          onClick={() => setOpen(null)}
        >
          <button
            type="button"
            className="gx-lb-close"
            aria-label="Close"
            autoFocus
            onClick={(e) => {
              e.stopPropagation()
              setOpen(null)
            }}
          >
            ×
          </button>
          <video
            src={VIDEOS[open].src}
            poster={VIDEOS[open].poster}
            controls
            autoPlay
            playsInline
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </section>
  )
}
