import type { CSSProperties } from 'react'
import { BedIcon, HeartIcon, StarIcon, MegaphoneIcon } from '@/components/icons'

const ITEMS = [
  {
    title: 'Safe sleeping',
    text: 'A proper bed and clean bedding, so rest is comfortable and safe.',
    Icon: BedIcon,
    a: '#e24e1b',
    b: '#e8a31c',
  },
  {
    title: 'Care and support',
    text: 'Meals, household shopping and personal care that lift everyday wellbeing.',
    Icon: HeartIcon,
    a: '#5c3a21',
    b: '#e24e1b',
  },
  {
    title: 'Celebration',
    text: 'Special events that honour older persons and bring joy back into their days.',
    Icon: StarIcon,
    a: '#d9890f',
    b: '#b5532f',
  },
  {
    title: 'Awareness',
    text: 'Speaking up against elder abuse and for the respect older persons deserve.',
    Icon: MegaphoneIcon,
    a: '#c93f10',
    b: '#5c3a21',
  },
]

export default function Pillars() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">What we do</div>
          <h2>Four ways we bring dignity home</h2>
        </div>
        <div className="ways">
          {ITEMS.map((item) => (
            <article key={item.title} className="way" style={{ '--a': item.a, '--b': item.b } as CSSProperties}>
              <div className="way-icon">
                <item.Icon />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
