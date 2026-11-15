import { IMPACT } from '@/lib/proof'

export default function ImpactStrip() {
  if (!IMPACT.length) return null
  return (
    <section className="section">
      <div className="wrap impact-grid">
        {IMPACT.map((i) => (
          <div key={i.label} className="impact-item">
            <strong>{i.value}</strong>
            <span>{i.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
