import Link from 'next/link'
import { SITE } from '@/lib/site'
import { gmail, whatsapp } from '@/lib/links'

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Our Story', href: '/our-story' },
  { label: 'Programmes', href: '/programmes' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Contact', href: '/contact' },
]

export default function Footer() {
  const raw = SITE.phones as unknown
  const list: unknown[] = Array.isArray(raw) ? raw : raw && typeof raw === 'object' ? Object.values(raw) : [raw]
  const phones = list
    .map((x) =>
      typeof x === 'string'
        ? x
        : String(
            Object.values((x ?? {}) as object).find(
              (v) => typeof v === 'string' && /\d{6,}/.test(v.replace(/\s/g, ''))
            ) ?? ''
          )
    )
    .filter(Boolean)
  const address = (SITE as unknown as { address?: string }).address
  const socials = SITE.socials as { label: string; href: string }[]
  const year = new Date().getFullYear()

  return (
    <footer className="ft">
      <div className="wrap">
        <div className="ft-grid">
          <div className="ft-brand">
            <Link href="/" className="ft-name" aria-label="Bed & Beyond for Older Persons home">
              <span className="ft-dot" aria-hidden="true" />
              Bed &amp; Beyond
            </Link>
            <p>A community based humanitarian initiative for older persons in Kilifi County, Kenya.</p>
          </div>

          <nav className="ft-col" aria-label="Footer">
            <h3>Explore</h3>
            <div className="ft-list">
              {LINKS.map((l) => (
                <Link key={l.href} href={l.href}>{l.label}</Link>
              ))}
            </div>
          </nav>

          <div className="ft-col">
            <h3>Contact</h3>
            <div className="ft-item">
              <span className="ft-label">Call</span>
              {phones.map((ph) => (
                <a key={ph} href={'tel:' + ph.replace(/[^+\d]/g, '')}>{ph}</a>
              ))}
            <a href={whatsapp(SITE.phones[0].tel)} target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
            </div>
            <div className="ft-item">
              <span className="ft-label">Email</span>
              <a href={gmail()} target="_blank" rel="noopener noreferrer">{SITE.email}</a>
            </div>
            {address ? (
              <div className="ft-item">
                <span className="ft-label">Visit</span>
                <a
                  href={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(address)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {address}
                </a>
              </div>
            ) : null}
          </div>

          {socials.length ? (
            <div className="ft-col">
              <h3>Follow us</h3>
              <div className="ft-list">
                {socials.map((s) => (
                  <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        <div className="ft-bottom">
          <span>© {year} {SITE.name}</span>
          {SITE.registration ? <span>{SITE.registration}</span> : null}
        </div>
      </div>
    </footer>
  )
}
