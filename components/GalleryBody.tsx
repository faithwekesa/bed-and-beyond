'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from '@/components/Lightbox'
import type { LbItem } from '@/components/Lightbox'
import type { Pair } from '@/lib/pairs'

export type Photo = {
  src: string
  alt?: string
  caption?: string
  width?: number
  height?: number
  w?: number
  h?: number
}

export default function GalleryBody({ pairs, photos }: { pairs: Pair[]; photos: Photo[] }) {
  const [open, setOpen] = useState<number | null>(null)

  const items: LbItem[] = [
    ...pairs.flatMap((p) => [
      { src: p.before, alt: p.beforeAlt, caption: p.beforeCaption },
      { src: p.after, alt: p.afterAlt, caption: p.afterCaption },
    ]),
    ...photos.map((p) => ({
      src: p.src,
      alt: p.alt || 'A moment from a Bed & Beyond visit',
      caption: p.caption,
    })),
  ]
  const offset = pairs.length * 2

  return (
    <>
      <section className="section">
        <div className="wrap">
          <div className="gx-head">
            <div className="eyebrow">Stories</div>
            <h2>Before and after</h2>
            <p>Tap any photo to see it larger.</p>
          </div>
          <div className="gx-rows">
            {pairs.map((p, k) => (
              <figure className="gx-row" key={p.after}>
                <div className="gx-pair">
                  <button
                    type="button"
                    className="gx-tile"
                    aria-label={`Open photo: ${p.beforeAlt}`}
                    onClick={() => setOpen(k * 2)}
                  >
                    <Image src={p.before} alt="" fill sizes="(min-width: 1100px) 250px, 45vw" />
                    <span className="gx-badge gx-badge-b">Before</span>
                  </button>
                  <button
                    type="button"
                    className="gx-tile"
                    aria-label={`Open photo: ${p.afterAlt}`}
                    onClick={() => setOpen(k * 2 + 1)}
                  >
                    <Image src={p.after} alt="" fill sizes="(min-width: 1100px) 250px, 45vw" />
                    <span className="gx-badge gx-badge-a">After</span>
                  </button>
                </div>
                <figcaption className="gx-row-cap">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="gx-head">
            <div className="eyebrow">More moments</div>
            <h2>Beyond the bed</h2>
            <p>Visits, shopping and time spent with the older persons we serve.</p>
          </div>
          <div className="gx-masonry">
            {photos.map((p, j) => (
              <button
                key={p.src}
                type="button"
                className="gx-m"
                aria-label={`Open photo: ${p.alt || 'A moment from a visit'}`}
                onClick={() => setOpen(offset + j)}
              >
                <Image
                  src={p.src}
                  alt=""
                  width={p.width ?? p.w ?? 1200}
                  height={p.height ?? p.h ?? 900}
                  sizes="(min-width: 1100px) 340px, (min-width: 640px) 33vw, 100vw"
                />
              </button>
            ))}
          </div>
        </div>
      </section>

      {open !== null ? (
        <Lightbox items={items} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      ) : null}
    </>
  )
}
