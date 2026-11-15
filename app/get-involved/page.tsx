import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import Image from 'next/image'
import { SITE } from '@/lib/site'
import { gmail, whatsapp } from '@/lib/links'

export const metadata: Metadata = {
  title: 'Get Involved',
}

const wa = (text: string) => `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
const mail = (subject: string) => gmail(subject)

export default function GetInvolvedPage() {
  const { paybill, account } = SITE.donate

  return (
    <>
      <PageHeader eyebrow="Be part of the mission" title="Get Involved">
        <p className="hero-sub">There is a place for you in this work, whether you can give, show up or open a door for us.</p>
        <div className="chips">
          <a className="chip" href="#donate">Give</a>
          <a className="chip" href="#volunteer">Volunteer</a>
          <a className="chip" href="#partner">Partner</a>
          <a className="chip" href="#in-kind">Give in kind</a>
        </div>
      </PageHeader>

      <section className="section" id="donate">
        <div className="wrap gi-block">
          <div className="gi-text">
            <span className="panel-label">Give</span>
            <h2>Help an older person rest in comfort</h2>
            <p>Your gift goes towards bedding, meals, household shopping and care for older persons in Kilifi County.</p>
            <ul className="tick-list">
              <li>A bed and clean bedding for an older person</li>
              <li>Meals and household shopping</li>
              <li>Personal care and follow-up visits</li>
              <li>Celebrations that bring joy</li>
            </ul>
            {paybill ? (
              <div className="pay-card">
                <h3>Give with M-Pesa</h3>
                <ol className="pay-steps">
                  <li>Open M-Pesa and choose <strong>Lipa na M-Pesa</strong>, then <strong>Paybill</strong></li>
                  <li>Business number: <strong>{paybill}</strong></li>
                  <li>Account number: <strong>{account}</strong></li>
                  <li>Enter your amount and confirm with your PIN</li>
                </ol>
              </div>
            ) : (
              <div className="pay-card">
                <h3>Payment details coming soon</h3>
                <p>We are finalising our M-Pesa details. To give today, message or call us and we will guide you.</p>
              </div>
            )}
            <div className="hero-actions">
              <a href={wa('Hello, I would like to give to Bed & Beyond.')} className="btn btn-primary">
                Give on WhatsApp
              </a>
              <a href={`tel:${SITE.phones[0].tel}`} className="btn btn-outline">
                Call {SITE.phones[0].label}
              </a>
              <a href={whatsapp(SITE.phones[0].tel)} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                WhatsApp
              </a>
            </div>
          </div>
          <div className="gi-img">
            <Image src="/images/journey-shopping.webp" alt="A volunteer and an older man holding food packs together" fill sizes="(max-width: 920px) 100vw, 520px" />
          </div>
        </div>
      </section>

      <section className="section" id="volunteer">
        <div className="wrap gi-block rev">
          <div className="gi-text">
            <span className="panel-label">Volunteer</span>
            <h2>Spend time where it matters most</h2>
            <p>Join a Dignity Journey visit. You do not need special skills, only a willingness to show up and care.</p>
            <ul className="tick-list">
              <li>Help install a bed and fresh bedding</li>
              <li>Cook and share a meal</li>
              <li>Help with household shopping and personal care</li>
              <li>Sit and listen to an older person&apos;s story</li>
            </ul>
            <a href={wa('Hello, I would like to volunteer with Bed & Beyond.')} className="btn btn-primary">
              Tell us you want to volunteer
            </a>
          </div>
          <div className="gi-img">
            <Image src="/images/journey-bed.webp" alt="A volunteer carrying a bed frame through a garden" fill sizes="(max-width: 920px) 100vw, 520px" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap two-cards">
          <div className="panel panel-dark" id="partner">
            <span className="panel-label">Partner</span>
            <h2>Work with us to reach more homes</h2>
            <p>Churches, schools, companies and community groups can stand with us.</p>
            <ul className="tick-list">
              <li>Support bedding for homes in need</li>
              <li>Take a group on a Dignity Journey visit</li>
              <li>Co-host celebration events for older persons</li>
              <li>Stand with us against elder abuse</li>
            </ul>
            <a target="_blank" rel="noopener noreferrer" href={mail('Partnering with Bed & Beyond')} className="btn btn-light-solid">
              Ask about partnering
            </a>
          </div>
          <div className="panel" id="in-kind">
            <span className="panel-label">Give in kind</span>
            <h2>Not able to give money?</h2>
            <p>Items and skills help just as much.</p>
            <ul className="tick-list">
              <li>Beds and mattresses</li>
              <li>Bedding and blankets</li>
              <li>Food and household items</li>
              <li>Your time and skills</li>
            </ul>
            <a href={wa('Hello, I would like to give items to Bed & Beyond.')} className="btn btn-primary">
              Tell us what you can give
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
