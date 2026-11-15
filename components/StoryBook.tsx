'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { STORY } from '@/lib/content'

type Spread = { kind: 'cover' | 'chapter' | 'end'; chapter: string; title: string; image: string; paras: number[] }

const SPREADS: Spread[] = [
  { kind: 'cover', chapter: 'Bed & Beyond for Older Persons', title: 'Our Story', image: 'slide-1', paras: [] },
  { kind: 'chapter', chapter: 'Chapter one', title: 'A walk through the village', image: 'journey-shopping', paras: [0, 1, 2] },
  { kind: 'chapter', chapter: 'Chapter two', title: 'A home without a bed', image: 'journey-assessment', paras: [3, 4] },
  { kind: 'chapter', chapter: 'Chapter three', title: 'A problem bigger than one person', image: 'story', paras: [5, 6] },
  { kind: 'chapter', chapter: 'Chapter four', title: 'Beyond the mattress', image: 'journey-care', paras: [7, 8] },
  { kind: 'end', chapter: 'Thank you for reading', title: 'The End', image: 'hero', paras: [] },
]

function Left({ s, n }: { s: Spread; n: number }) {
  return (
    <div className="page-face page-left">
      <Image src={`/images/${s.image}.webp`} alt="" fill sizes="(max-width: 920px) 100vw, 560px" />
      {s.kind !== 'cover' ? <span className="page-no l">{n}</span> : null}
    </div>
  )
}

function Right({ s, n, go }: { s: Spread; n: number; go: (n: number) => void }) {
  if (s.kind === 'cover') {
    return (
      <div className="page-face page-right book-title">
        <span className="book-chapter">{s.chapter}</span>
        <h2>{s.title}</h2>
        <p>In our founder&apos;s words. One evening, one village road and a promise that no older person should sleep in the dust.</p>
        <button type="button" className="btn btn-primary" onClick={() => go(1)}>
          Open the book
        </button>
      </div>
    )
  }

  if (s.kind === 'end') {
    return (
      <div className="page-face page-right book-title book-end">
        <span className="book-ornament" aria-hidden="true">✦</span>
        <span className="book-chapter">{s.chapter}</span>
        <h2>{s.title}</h2>
        <p>This is only where our story starts. Every older person we reach opens the next chapter. You can help write it.</p>
        <div className="hero-actions center">
          <Link href="/get-involved" className="btn btn-primary">
            Write the next chapter with us
          </Link>
        </div>
        <p className="book-colophon">Bed &amp; Beyond for Older Persons · Kilifi County, Kenya</p>
        <span className="page-no r">{n}</span>
      </div>
    )
  }

  return (
    <div className="page-face page-right">
      <span className="book-chapter">{s.chapter}</span>
      <h2>{s.title}</h2>
      <div className="book-text">
        {s.paras.map((p) => (
          <p key={p}>{STORY[p]}</p>
        ))}
      </div>
      <span className="page-no r">{n}</span>
    </div>
  )
}

export default function StoryBook() {
  const [i, setI] = useState(0)
  const [flip, setFlip] = useState<number | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const last = SPREADS.length - 1

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current)
    }
  }, [])

  const go = (target: number) => {
    const n = Math.min(Math.max(target, 0), last)
    if (n === i || flip !== null) return
    const simple =
      window.matchMedia('(max-width: 920px)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (simple) {
      setI(n)
      return
    }
    setFlip(n)
    timer.current = setTimeout(() => {
      setI(n)
      setFlip(null)
    }, 900)
  }

  const forward = flip !== null && flip > i
  const target = flip ?? i
  const leftIdx = flip === null ? i : forward ? i : target
  const rightIdx = flip === null ? i : forward ? target : i
  const frontIdx = forward ? i : target
  const backIdx = forward ? target : i

  return (
    <section className="section">
      <div className="wrap">
        <div className="book-desktop">
        <div
          className="book-cover"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') go(i + 1)
            if (e.key === 'ArrowLeft') go(i - 1)
          }}
        >
          <span className="book-ribbon" />
          <div className="book">
            <div className="book-half book-half-l">
              <Left s={SPREADS[leftIdx]} n={leftIdx * 2} />
            </div>
            <div className="book-half book-half-r">
              <Right s={SPREADS[rightIdx]} n={rightIdx * 2 + 1} go={go} />
            </div>
            {flip !== null ? (
              <div className={`book-leaf ${forward ? 'to-left' : 'to-right'}`}>
                <div className="leaf-face leaf-front">
                  <Right s={SPREADS[frontIdx]} n={frontIdx * 2 + 1} go={go} />
                </div>
                <div className="leaf-face leaf-back">
                  <Left s={SPREADS[backIdx]} n={backIdx * 2} />
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <div className="book-nav">
          <button type="button" className="btn btn-outline" onClick={() => go(i - 1)} disabled={i === 0}>
            Previous
          </button>
          <div className="book-dots">
            {SPREADS.map((s, n) => (
              <button
                key={s.title}
                type="button"
                aria-label={s.kind === 'cover' ? 'Cover' : s.kind === 'end' ? 'The end' : `Chapter ${n}`}
                className={`book-dot${n === i ? ' on' : ''}`}
                onClick={() => go(n)}
              />
            ))}
          </div>
          <button type="button" className="btn btn-primary" onClick={() => go(i + 1)} disabled={i === last}>
            Next
          </button>
        </div>
        </div>

        <div className="story-scroll">
          {SPREADS.filter((x) => x.kind === 'chapter').map((x) => (
            <article key={x.title} className="story-ch">
              <div className="story-ch-img">
                <Image src={`/images/${x.image}.webp`} alt="" fill sizes="100vw" />
              </div>
              <span className="book-chapter">{x.chapter}</span>
              <h2>{x.title}</h2>
              {x.paras.map((p) => (
                <p key={p}>{STORY[p]}</p>
              ))}
            </article>
          ))}
          <div className="story-ch-end">
            <span className="book-ornament" aria-hidden="true">✦</span>
            <h2>The End</h2>
            <p>This is only where our story starts. Every older person we reach opens the next chapter. You can help write it.</p>
            <Link href="/get-involved" className="btn btn-primary">
              Write the next chapter with us
            </Link>
          </div>
        </div>

        <details className="story-plain">
          <summary>Read as plain text</summary>
          <div className="story-plain-body">
            {SPREADS.filter((x) => x.kind === 'chapter').map((x) => (
              <section key={x.title}>
                <h3>{x.chapter}: {x.title}</h3>
                {x.paras.map((p) => (
                  <p key={p}>{STORY[p]}</p>
                ))}
              </section>
            ))}
          </div>
        </details>
      </div>
    </section>
  )
}
