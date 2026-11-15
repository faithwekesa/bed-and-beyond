'use client'

import Image from 'next/image'
import { useCallback, useEffect, useState } from 'react'

export type LightItem = {
  src: string
  alt: string
  caption?: string
  tag?: 'before' | 'after'
  width?: number
  height?: number
}

export default function LightboxGallery({ items, variant }: { items: LightItem[]; variant: 'tiles' | 'masonry' }) {
  const [open, setOpen] = useState<number | null>(null)
  const close = useCallback(() => setOpen(null), [])
  const move = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)),
    [items.length]
  )

  useEffect(() => {
    if (open === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, close, move])

  const cur = open === null ? null : items[open]

  return (
    <>
      {variant === 'tiles' ? (
        <div className="tiles">
          {items.map((it, i) => (
            <button key={it.src} type="button" className="tile-btn" onClick={() => setOpen(i)} aria-label={`Open photo: ${it.caption ?? it.alt}`}>
              <span className="tile-img">
                <Image src={it.src} alt={it.alt} fill sizes="(max-width: 640px) 50vw, (max-width: 1100px) 33vw, 220px" />
                {it.tag ? <span className={`tile-tag ${it.tag}`}>{it.tag}</span> : null}
              </span>
              {it.caption ? <span className="tile-cap">{it.caption}</span> : null}
            </button>
          ))}
        </div>
      ) : (
        <div className="gallery-grid">
          {items.map((it, i) => (
            <button key={it.src} type="button" className="tile-btn gallery-item" onClick={() => setOpen(i)} aria-label={`Open photo ${i + 1}`}>
              <Image
                src={it.src}
                width={it.width ?? 800}
                height={it.height ?? 600}
                alt={it.alt}
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px"
              />
            </button>
          ))}
        </div>
      )}

      {cur ? (
        <div className="lb" role="dialog" aria-modal="true" onClick={close}>
          <button type="button" className="lb-close" aria-label="Close" onClick={close}>
            &#10005;
          </button>
          <button
            type="button"
            className="lb-nav lb-prev"
            aria-label="Previous photo"
            onClick={(e) => {
              e.stopPropagation()
              move(-1)
            }}
          >
            &#8249;
          </button>
          <figure className="lb-fig" onClick={(e) => e.stopPropagation()}>
            <div className="lb-img">
              <Image src={cur.src} alt={cur.alt} fill sizes="100vw" />
            </div>
            {cur.caption ? <figcaption>{cur.caption}</figcaption> : null}
          </figure>
          <button
            type="button"
            className="lb-nav lb-next"
            aria-label="Next photo"
            onClick={(e) => {
              e.stopPropagation()
              move(1)
            }}
          >
            &#8250;
          </button>
        </div>
      ) : null}
    </>
  )
}
