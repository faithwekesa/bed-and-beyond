import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: string
  children?: ReactNode
}

export default function PageHeader({ eyebrow, title, children }: Props) {
  return (
    <section className="ph">
      <div className="wrap ph-center">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        <span className="ph-rule" />
        {children}
      </div>
    </section>
  )
}
