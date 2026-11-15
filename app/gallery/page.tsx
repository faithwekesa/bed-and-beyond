import Link from 'next/link'
import PageHeader from '@/components/PageHeader'
import GalleryBody from '@/components/GalleryBody'
import type { Photo } from '@/components/GalleryBody'
import { GALLERY } from '@/lib/gallery'
import { BEFORE, AFTER } from '@/lib/stories'

export const metadata = { title: 'Gallery' }

export default function GalleryPage() {
  const paired = new Set<string>()
  const seen = new Set<string>()
  const everything = [
    ...(GALLERY as unknown as Photo[]),
    ...(BEFORE as unknown as Photo[]),
    ...(AFTER as unknown as Photo[]),
  ]
  const beyond = everything.filter((p) => {
    if (paired.has(p.src) || seen.has(p.src)) return false
    seen.add(p.src)
    return true
  })

  return (
    <>
      <PageHeader eyebrow="The difference a visit makes" title="Gallery">
        <p className="hero-sub">Where older persons slept before we came and where they rest now.</p>
      </PageHeader>

      <GalleryBody pairs={[]} photos={beyond} />

      <section className="section">
        <div className="wrap">
          <div className="gx-ask">
            <h2>Stand with an older person today</h2>
            <p>
              Whatever you are able to share, whether a gift of money, food, bedding or your time, helps us reach the next home.
              Thank you for standing with them.
            </p>
            <div className="gx-ask-btns">
              <Link className="gx-btn gx-btn-solid" href="/get-involved#donate">Donate</Link>
              <Link className="gx-btn gx-btn-line" href="/get-involved#in-kind">Give in kind</Link>
              <Link className="gx-btn gx-btn-line" href="/get-involved#volunteer">Volunteer</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
