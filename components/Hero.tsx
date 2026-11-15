'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { SITE } from '@/lib/site'

const SLIDES = [
  {
    src: '/images/hero.webp',
    alt: 'A smiling older man sits on his new bed beside a shelf of groceries',
    position: 'center 40%',
  },
  {
    src: '/images/slide-1.webp',
    alt: 'An older woman smiling on her new bed with red pillows',
    position: 'center 35%',
  },
  {
    src: '/images/slide-2.webp',
    alt: 'A volunteer caring for an older man outside his home, a basin of water between them',
    position: 'center 40%',
  },
]

export default function Hero() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const timer = setInterval(() => setIndex((n) => (n + 1) % SLIDES.length), 6500)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className="hero-full">
      {SLIDES.map((s, i) => (
        <div key={s.src} className={`hero-slide${i === index ? ' on' : ''}`}>
          <Image src={s.src} alt={s.alt} fill priority={i === 0} sizes="100vw" style={{ objectPosition: s.position }} />
        </div>
      ))}
      <div className="hero-shade" />
      <div className="hero-gloss" />
      <div className="wrap hero-copy">
        <div className="eyebrow">{SITE.place}</div>
        <h1>{SITE.tagline}</h1>
        <p className="hero-sub">Beds, meals, care and company for older persons who have been forgotten.</p>
        <div className="hero-actions">
          <Link href="/get-involved#donate" className="btn btn-light-solid">
            Donate
          </Link>
          <Link href="/our-story" className="btn btn-ghost">
            Read our story
          </Link>
        </div>
      </div>
    </section>
  )
}
