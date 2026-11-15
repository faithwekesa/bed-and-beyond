import Link from 'next/link'
import Hero from '@/components/Hero'
import ImpactStrip from '@/components/ImpactStrip'
import Pillars from '@/components/Pillars'
import StoryTeaser from '@/components/StoryTeaser'
import HomePreview from '@/components/HomePreview'
import JourneyStrip from '@/components/JourneyStrip'

export default function Home() {
  return (
    <>
      <Hero />
      <ImpactStrip />
      <Pillars />
      <StoryTeaser />
      <HomePreview />
      <JourneyStrip />
      <section className="section">
        <div className="wrap">
          <div className="closing">
            <h2>Help us reach the next home</h2>
            <p>A bed, a meal and an hour of company can change a life. There is a way for you to be part of it.</p>
            <div className="gx-ask-btns">
              <Link className="gx-btn gx-btn-solid" href="/get-involved">Ways to help</Link>
              <Link className="gx-btn gx-btn-line" href="/contact">Get in touch</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
