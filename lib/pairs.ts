export type Pair = {
  before: string
  after: string
  beforeAlt: string
  afterAlt: string
  beforeCaption: string
  afterCaption: string
  caption: string
}

const MAP: [number, number][] = [
  [1, 1],
  [2, 2],
  [3, 3],
  [4, 4],
  [5, 5],
]

export const PAIRS: Pair[] = [
  {
    before: '/images/pair-before.webp',
    after: '/images/pair-after.webp',
    beforeAlt: 'An older woman sitting on the floor of her home with a volunteer before receiving a bed',
    afterAlt: 'The older woman sitting on her new made bed',
    beforeCaption: 'Before: no proper bed',
    afterCaption: 'After: a made bed and a shelf of food',
    caption: 'Story 1',
  },
  ...MAP.map(([b, a], k) => ({
    before: `/images/before-${b}.webp`,
    after: `/images/after-${a}.webp`,
    beforeAlt: 'An older person at home before a Bed & Beyond visit',
    afterAlt: 'An older person at home after a Bed & Beyond visit',
    beforeCaption: 'Before the visit',
    afterCaption: 'After the visit',
    caption: `Story ${k + 2}`,
  })),
]
