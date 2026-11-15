import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import Pillars from '@/components/Pillars'
import Journey from '@/components/Journey'
import CtaBand from '@/components/CtaBand'
import QuoteStrip from '@/components/QuoteStrip'
import WatchList from '@/components/WatchList'
import { MISSION } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Programmes',
}

export default function ProgrammesPage() {
  return (
    <>
      <PageHeader eyebrow="How we work" title="Programmes">
        <p className="hero-sub">{MISSION.text}</p>
      </PageHeader>
      <Pillars />
      <Journey />
      <WatchList />
      <QuoteStrip />
      <CtaBand />
    </>
  )
}
