export const IMPACT: { value: string; label: string }[] = [
  { value: '20', label: 'older persons impacted every month' },
  { value: '240', label: 'older persons impacted every year' },
  { value: '1,500', label: 'older persons impacted in five years' },
]

export type Quote = {
  text: string
  original?: string
  who: string
}

export const QUOTES: Quote[] = [
  {
    text: 'I have not received anything today, but tomorrow is another day.',
    original: '',
    who: 'An older man on a village road in Kilifi County, speaking in Giriama',
  },
]
