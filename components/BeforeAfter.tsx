'use client'

import Image from 'next/image'
import { useState } from 'react'

type Props = {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
}

export default function BeforeAfter({ before, after, beforeAlt, afterAlt }: Props) {
  const [pos, setPos] = useState(50)

  return (
    <div className="ba-frame">
      <Image src={after} alt={afterAlt} fill sizes="(max-width: 920px) 100vw, 900px" />
      <div className="ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        <Image src={before} alt={beforeAlt} fill sizes="(max-width: 920px) 100vw, 900px" />
      </div>
      <span className="ba-tag ba-tag-l">Before</span>
      <span className="ba-tag ba-tag-r">After</span>
      <div className="ba-line" style={{ left: `${pos}%` }}>
        <span className="ba-knob">&#8646;</span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label="Slide to compare before and after"
        className="ba-range"
      />
    </div>
  )
}
