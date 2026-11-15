import { WHAT_WE_DO } from '@/lib/content'

export default function WhatWeDo() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <h2>What we do</h2>
        </div>
        <div className="cards-4">
          {WHAT_WE_DO.map((item, i) => (
            <article key={item.title} className="card">
              <span className="card-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
