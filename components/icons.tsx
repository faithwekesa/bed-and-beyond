import type { SVGProps } from 'react'

const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.6,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  viewBox: '0 0 24 24',
} as const

type P = SVGProps<SVGSVGElement>

export const HomeIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 11l9-7 9 7" />
    <path d="M5 10v10h14V10" />
    <path d="M10 20v-5h4v5" />
  </svg>
)

export const BedIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 19V6M3 15h18v4M21 15v-2.5A3.5 3.5 0 0 0 17.5 9H11v6" />
    <circle cx="7" cy="11.5" r="1.8" />
  </svg>
)

export const BagIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 8h14l-1 12H6L5 8z" />
    <path d="M9 8a3 3 0 0 1 6 0" />
  </svg>
)

export const HeartIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 20s-7-4.4-7-9.3A3.9 3.9 0 0 1 12 8.5a3.9 3.9 0 0 1 7 2.2C19 15.6 12 20 12 20z" />
  </svg>
)

export const ChatIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 5h16v11H9l-5 4V5z" />
  </svg>
)

export const RepeatIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M4 12a8 8 0 0 1 14-5l2 2" />
    <path d="M20 4v5h-5" />
    <path d="M20 12a8 8 0 0 1-14 5l-2-2" />
    <path d="M4 20v-5h5" />
  </svg>
)

export const StarIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 3l1.9 4.9L19 9.5l-5.1 1.6L12 16l-1.9-4.9L5 9.5l5.1-1.6z" />
    <path d="M19 15v4M17 17h4M5 16v3M3.5 17.5h3" />
  </svg>
)

export const MegaphoneIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M3 10v4h3l8 4V6L6 10H3z" />
    <path d="M17.5 9a4 4 0 0 1 0 6" />
  </svg>
)

export const PhoneIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
  </svg>
)

export const MailIcon = (p: P) => (
  <svg {...base} {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
)

export const PinIcon = (p: P) => (
  <svg {...base} {...p}>
    <path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z" />
    <circle cx="12" cy="10" r="2.5" />
  </svg>
)
