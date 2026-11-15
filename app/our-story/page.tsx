import Image from 'next/image'
import PageHeader from '@/components/PageHeader'
import StoryBook from '@/components/StoryBook'
import MvBadge from '@/components/MvBadge'
import { MISSION, VISION } from '@/lib/content'

export const metadata = { title: 'Our Story' }

const txt = (x: unknown): string =>
  typeof x === 'string'
    ? x
    : x && typeof x === 'object'
      ? Object.values(x as object)
          .filter((v): v is string => typeof v === 'string')
          .sort((a, b) => b.length - a.length)[0] ?? ''
      : ''

const ITEMS = [
  {
    label: 'Mission',
    statement: 'No Older Person Should Sleep in the Dust',
    text: txt(MISSION),
    tone: 'orange',
    kind: 'target' as const,
  },
  {
    label: 'Vision',
    statement: 'A Future Where Every Older Person Lives With Dignity',
    text: txt(VISION),
    tone: 'brown',
    kind: 'eye' as const,
  },
]

export default function OurStoryPage() {
  return (
    <>
      <PageHeader eyebrow="The story behind our mission" title="Our Story">
        <p className="hero-sub">Read how one evening in a village became a mission.</p>
      </PageHeader>

      <StoryBook />

      <section className="section fo-sec">
        <div className="wrap">
          <div id="founder" className="fo">
            <div className="fo-photo">
              <Image
                src="/images/founder.webp"
                alt="Miroyo Mwita, founder of Bed & Beyond for Older Persons"
                fill
                sizes="(min-width: 760px) 440px, 100vw"
              />
            </div>
            <blockquote className="fo-quote">
              <span className="fo-tag">Meet the founder</span>
              <p>
                “Above all, we want every older person to know that they matter, they are valued, and they are not
                forgotten.”
              </p>
              <footer>
                <strong>Miroyo Mwita</strong>
                <span>Founder, Bed &amp; Beyond for Older Persons</span>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="mvc">
            {ITEMS.map((it, i) => (
              <article key={it.label} className={`mvc-item tone-${it.tone}${i % 2 ? ' flip' : ''}`}>
                <MvBadge kind={it.kind} />
                <div className="mvc-text">
                  <span className="mvc-rule" aria-hidden="true" />
                  <h2>{it.label}</h2>
                  <p className="mvc-statement">“{it.statement}”</p>
                  <p>{it.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
