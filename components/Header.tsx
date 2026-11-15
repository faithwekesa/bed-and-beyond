'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { NAV, SITE } from '@/lib/site'

export default function Header() {
  const pathname = usePathname()
  const [openAt, setOpenAt] = useState<string | null>(null)
  const open = openAt === pathname

  return (
    <header className="site-header">
      <div className="wrap nav-inner">
        <Link href="/" className="logo-link" aria-label={SITE.name}>
          <Image src="/logo.png" alt={SITE.name} width={627} height={284} priority className="logo-img" />
        </Link>
        <button
          type="button"
          className="menu-btn"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpenAt(open ? null : pathname)}
        >
          {open ? '\u2715' : '\u2630'}
        </button>
        <nav className={`nav-links${open ? ' open' : ''}`}>
          {NAV.map((item) => {
            const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link key={item.href} href={item.href} className={`nav-link${active ? ' active' : ''}`}>
                {item.label}
              </Link>
            )
          })}
          <Link href="/get-involved#donate" className="btn btn-primary nav-donate">
            Donate
          </Link>
        </nav>
      </div>
    </header>
  )
}
