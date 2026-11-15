'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { SITE } from '@/lib/site'
import { gmail, whatsapp } from '@/lib/links'

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('company')) return

    if (!ENDPOINT) {
      const name = String(data.get('name') || '')
      const email = String(data.get('email') || '')
      const phone = String(data.get('phone') || '')
      const message = String(data.get('message') || '')
      const body = `${message}\n\nFrom: ${name}\nEmail: ${email}${phone ? `\nPhone: ${phone}` : ''}`
      window.open(gmail(`Message from ${name}`, body), '_blank', 'noopener,noreferrer')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', headers: { Accept: 'application/json' }, body: data })
      if (res.ok) {
        form.reset()
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <form className="form-card" onSubmit={onSubmit}>
      <h2>Send us a message</h2>
      <p>Tell us how you would like to help, or ask us anything.</p>
      <input type="hidden" name="_subject" value="New message from the Bed & Beyond website" />
      <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hp" aria-hidden="true" />
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">Your name</label>
          <input id="name" name="name" type="text" required />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone (optional)</label>
          <input id="phone" name="phone" type="tel" />
        </div>
      </div>
      <div className="field">
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" required />
      </div>
      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" rows={5} required />
      </div>
      <button type="submit" className="btn btn-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : 'Send message'}
      </button>
      {status === 'sent' ? <p className="form-note ok">Thank you. Your message has been sent.</p> : null}
      {status === 'error' ? <p className="form-note err">Something went wrong. Please call or message us on WhatsApp.</p> : null}
    </form>
  )
}
