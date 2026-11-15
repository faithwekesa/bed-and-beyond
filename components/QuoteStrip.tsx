import { QUOTES } from '@/lib/proof'

export default function QuoteStrip() {
  if (!QUOTES.length) return null

  return (
    <section className="section">
      <div className="wrap">
        {QUOTES.map((q) => (
          <figure className="qs" key={q.text}>
            <blockquote>
              {q.original ? (
                <>
                  <h2 className="qs-text" lang="nyf">“{q.original}”</h2>
                  <details className="qs-tr">
                    <summary>Read the English translation</summary>
                    <p>“{q.text}”</p>
                  </details>
                </>
              ) : (
                <h2 className="qs-text">“{q.text}”</h2>
              )}
            </blockquote>
            <figcaption>{q.who}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  )
}
