import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import ContactForm from '@/components/ContactForm'
import { SITE } from '@/lib/site'
import { gmail, whatsapp } from '@/lib/links'
import { ChatIcon, MailIcon, PhoneIcon, PinIcon } from '@/components/icons'

export const metadata: Metadata = {
  title: 'Contact',
}

export default function ContactPage() {
  return (
    <>
      <PageHeader eyebrow="We would love to hear from you" title="Contact">
        <p className="hero-sub">Call, message or write to us. Every conversation starts with someone who cares.</p>
      </PageHeader>

      <section className="wrap contact-top">
        <ContactForm />
        <div className="contact-list">
          <a className="contact-row" href={`tel:${SITE.phones[0].tel}`}>
            <span className="contact-ico">
              <PhoneIcon />
            </span>
            <span>
              <small>Call</small>
              <strong>{SITE.phones[0].label}</strong>
              <br />
              <strong>{SITE.phones[1].label}</strong>
            </span>
          </a>
          <a className="contact-row" href={`https://wa.me/${SITE.whatsapp}`}>
            <span className="contact-ico">
              <ChatIcon />
            </span>
            <span>
              <small>WhatsApp</small>
              <strong>Chat with us</strong>
            </span>
          </a>
          <a className="contact-row" href={gmail()} target="_blank" rel="noopener noreferrer">
            <span className="contact-ico">
              <MailIcon />
            </span>
            <span>
              <small>Email</small>
              <strong>{SITE.email}</strong>
            </span>
          </a>
          <div className="contact-row">
            <span className="contact-ico">
              <PinIcon />
            </span>
            <span>
              <small>Where we work</small>
              <strong>{SITE.address}</strong>
            </span>
          </div>
        </div>
      </section>

      <section className="wrap map-wide">
        <div className="map-frame">
          <iframe
            title="Map of Kilifi County, Kenya"
            src="https://www.openstreetmap.org/export/embed.html?bbox=40.05%2C-3.27%2C40.18%2C-3.17&layer=mapnik"
            loading="lazy"
          />
        </div>
        <p className="map-note">
          Kilifi County, Kenya.{' '}
          <a href="https://www.openstreetmap.org/search?query=Kilifi%20County">View larger map</a>
        </p>
      </section>
    </>
  )
}
