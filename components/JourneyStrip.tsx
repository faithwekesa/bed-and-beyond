import type { CSSProperties } from 'react'
import Link from 'next/link'
import { STEPS } from '@/lib/content'
import { BagIcon, BedIcon, ChatIcon, HeartIcon, HomeIcon, RepeatIcon } from '@/components/icons'

const ICONS = [HomeIcon, BedIcon, BagIcon, HeartIcon, ChatIcon, RepeatIcon]
const COLORS = ['#e24e1b', '#d9890f', '#5c3a21']

export default function JourneyStrip() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">Every visit</div>
          <h2>The Dignity Journey</h2>
          <p className="section-sub">We don&apos;t just drop off a mattress. Six steps, every time.</p>
        </div>
        <div className="flow">
          {STEPS.map((s, i) => {
            const Icon = ICONS[i]
            return (
              <article key={s.title} className="flow-card" style={{ '--c': COLORS[i % 3] } as CSSProperties}>
                <div className="flow-icon">
                  <Icon />
                </div>
                <span className="flow-step">Step {String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </article>
            )
          })}
        </div>
        <Link href="/programmes" className="btn btn-outline">
          See how each visit works
        </Link>
      </div>
    </section>
  )
}
