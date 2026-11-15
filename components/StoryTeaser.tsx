import Image from 'next/image'
import Link from 'next/link'
import { QUOTE, STORY } from '@/lib/content'

export default function StoryTeaser() {
  return (
    <section className="section">
      <div className="wrap story-grid">
        <div className="story-img">
          <Image
            src="/images/story.webp"
            alt="A volunteer embraces an older woman at her doorway, carrying pillows"
            fill
            sizes="(max-width: 920px) 100vw, 520px"
          />
        </div>
        <div>
          <blockquote className="pull-quote">{QUOTE}</blockquote>
          <p className="story-text">{STORY[1]}</p>
          <Link href="/our-story" className="btn btn-primary">
            Read the full story
          </Link>
        </div>
      </div>
    </section>
  )
}
