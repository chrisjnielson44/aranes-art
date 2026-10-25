'use server'

import { Resend } from 'resend'

export type Inquiry = {
  name: string
  email: string
  phone: string
  artworkInterest: string
  message: string
  /** Hidden from people; bots fill it in. */
  website: string
}

/**
 * Emails a contact form inquiry through Resend to CONTACT_TO_EMAIL, with Reply-To set to the visitor so answering
 * from the inbox goes straight back to them. The sender uses RESEND_EMAIL_DOMAIN, which must be verified in Resend.
 */
export async function sendInquiry(inquiry: Inquiry): Promise<{ ok: boolean }> {
  if (inquiry.website) return { ok: true }

  const name = inquiry.name.trim().slice(0, 120)
  const email = inquiry.email.trim().slice(0, 200)
  const phone = inquiry.phone.trim().slice(0, 40)
  const artwork = inquiry.artworkInterest.trim().slice(0, 160)
  const message = inquiry.message.trim().slice(0, 5000)
  if (!name || !message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false }

  const { RESEND_API_KEY: apiKey, RESEND_EMAIL_DOMAIN: domain, CONTACT_TO_EMAIL: to } = process.env
  if (!apiKey || !domain || !to) {
    console.error('Contact form is not configured')
    return { ok: false }
  }

  const details = [`Name: ${name}`, `Email: ${email}`, phone && `Phone: ${phone}`, artwork && `Artwork: ${artwork}`]
  const { error } = await new Resend(apiKey).emails.send({
    from: `"${name.replace(/["\\<>]/g, '')} via Aranes Art" <contact@${domain}>`,
    to: to.split(',').map((address) => address.trim()),
    replyTo: email,
    subject: `New inquiry from ${name}${artwork ? ` about ${artwork}` : ''}`,
    text: `${details.filter(Boolean).join('\n')}\n\n${message}`,
  })
  if (error) {
    console.error('Inquiry delivery failed', error)
    return { ok: false }
  }
  return { ok: true }
}
