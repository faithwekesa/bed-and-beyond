import { SITE } from '@/lib/site'

export const gmail = (subject = '', body = '') => {
  let url = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(SITE.email)
  if (subject) url += '&su=' + encodeURIComponent(subject)
  if (body) url += '&body=' + encodeURIComponent(body)
  return url
}

export const whatsapp = (tel: string, text = '') =>
  'https://wa.me/' + tel.replace(/\D/g, '') + (text ? '?text=' + encodeURIComponent(text) : '')
