import Link from 'next/link'

export default function CtaBand() {
  return (
    <section className="section">
      <div className="wrap">
        <div className="cta-band">
          <h2>Help us reach the next home</h2>
          <p>A bed, a meal and an hour of company can change a life. There is a way for you to be part of it.</p>
          <div className="hero-actions center">
            <Link href="/get-involved" className="btn btn-light-solid">
              Ways to help
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Get in touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
