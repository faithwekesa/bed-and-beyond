import Image from 'next/image'
import Link from 'next/link'
import { AFTER, BEFORE } from '@/lib/stories'

const PICKS = [
  { item: BEFORE[0], tag: 'before' },
  { item: AFTER[2], tag: 'after' },
  { item: AFTER[3], tag: 'after' },
]

export default function HomePreview() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">The difference a visit makes</div>
          <h2>Before and after</h2>
          <p className="section-sub">Where older persons slept, and where they rest now.</p>
        </div>
        <div className="tiles tiles-3">
          {PICKS.map(({ item, tag }) => (
            <figure key={item.src} className="tile">
              <div className="tile-img">
                <Image src={item.src} alt={item.alt} fill sizes="(max-width: 640px) 100vw, 380px" />
                <span className={`tile-tag ${tag}`}>{tag}</span>
              </div>
              <figcaption>{item.caption}</figcaption>
            </figure>
          ))}
        </div>
        <Link href="/gallery" className="btn btn-outline">
          See the full gallery
        </Link>
      </div>
    </section>
  )
}
