'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function MobileDonate() {
  const pathname = usePathname()
  if (pathname.startsWith('/get-involved')) return null
  return (
    <Link href="/get-involved#donate" className="mobile-donate">
      Donate
    </Link>
  )
}
