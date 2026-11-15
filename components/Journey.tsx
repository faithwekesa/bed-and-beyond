import Image from 'next/image'
import { STEPS } from '@/lib/content'

export default function Journey() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>The Dignity Journey</h2>
          <p className="section-sub">We don't just drop off a mattress. Every visit follows the same steps.</p>
        </div>
        <div className="steps-grid">
          {STEPS.map((s, i) => (
            <article key={s.title} className="step-card">
              {s.image ? (
                <div className="step-img">
                  <Image src={`/images/${s.image}.webp`} alt="" fill sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 380px" />
                </div>
              ) : null}
              <div className="step-body">
                <span className="card-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
