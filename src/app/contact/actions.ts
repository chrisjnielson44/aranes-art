'use server'

import { INQUIRER_KINDS } from '@/app/contact/inquirer-kinds'
import { artworks } from '@/lib/artworks'
import { allow } from '@/lib/rate-limit'
import { checkBotId } from 'botid/server'
import { headers } from 'next/headers'
import { Resend } from 'resend'

const MINUTE = 60_000

type Field = 'name' | 'email' | 'phone' | 'kind' | 'artwork' | 'message'

/** What the visitor typed, echoed back so React's post-action form reset restores it instead of clearing it. */
export type InquiryValues = Partial<Record<Field, string>>

export type InquiryState =
  | { status: 'idle' }
  | { status: 'success'; name: string }
  | {
      status: 'error'
      message: string
      fieldErrors?: Partial<Record<'name' | 'email' | 'message', string>>
      values: InquiryValues
    }

/**
 * Emails a contact form inquiry through Resend to CONTACT_TO_EMAIL, with Reply-To set to the visitor so answering
 * from the inbox goes straight back to them. The sender uses RESEND_EMAIL_DOMAIN, which must be verified in Resend.
 */
export async function sendInquiry(_previous: InquiryState, formData: FormData): Promise<InquiryState> {
  // Bots fill every field, including this one that people never see.
  if (formData.get('website')) return { status: 'success', name: '' }

  const field = (key: Field) => {
    const value = formData.get(key)
    return typeof value === 'string' ? value : ''
  }
  const values: InquiryValues = {
    name: field('name'),
    email: field('email'),
    phone: field('phone'),
    kind: field('kind'),
    artwork: field('artwork'),
    message: field('message'),
  }

  const name = values.name!.trim().slice(0, 120)
  const email = values.email!.trim().slice(0, 200)
  const phone = values.phone!.trim().slice(0, 40)
  const message = values.message!.trim().slice(0, 5000)
  const kind = INQUIRER_KINDS[values.kind as keyof typeof INQUIRER_KINDS]
  const artwork = artworks.find((artwork) => artwork.id === values.artwork)?.title

  const fieldErrors: Partial<Record<'name' | 'email' | 'message', string>> = {}
  if (!name) fieldErrors.name = 'Please add your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fieldErrors.email = 'Please use a valid email address.'
  if (message.length < 10) fieldErrors.message = 'A sentence or two helps me reply properly.'
  if (Object.keys(fieldErrors).length) {
    return { status: 'error', message: 'Please check the highlighted fields.', fieldErrors, values }
  }

  const blocked = (message: string): InquiryState => ({ status: 'error', message, values })
  if ((await checkBotId()).isBot) {
    return blocked('This message could not be verified as coming from a browser. Please email info@aranesart.com.')
  }
  // Per address: a few messages in quick succession is fine; a steady stream is not. The site-wide cap keeps a
  // distributed flood from using up the email quota.
  const ip = (await headers()).get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
  if (!allow(`ip:${ip}`, 3, 10 * MINUTE) || !allow(`day:${ip}`, 10, 24 * 60 * MINUTE)) {
    return blocked('That is a lot of messages in a short time. Please try again later, or email info@aranesart.com.')
  }
  if (!allow('site', 100, 24 * 60 * MINUTE)) {
    return blocked('The form is receiving an unusual number of messages. Please email info@aranesart.com.')
  }

  const { RESEND_API_KEY: apiKey, RESEND_EMAIL_DOMAIN: domain, CONTACT_TO_EMAIL: to } = process.env
  if (!apiKey || !domain || !to) {
    console.error('Contact form is not configured')
    return blocked('Your message did not go through. Please email info@aranesart.com.')
  }

  const details = [
    `Name: ${name}`,
    `Email: ${email}`,
    phone && `Phone: ${phone}`,
    kind && `Reaching out as: ${kind}`,
    artwork && `Artwork: ${artwork}`,
  ]
  const { error } = await new Resend(apiKey).emails.send({
    from: `"${name.replace(/["\\<>]/g, '')} via Aranes Art" <info@${domain}>`,
    to: to.split(',').map((address) => address.trim()),
    replyTo: email,
    subject: `New inquiry from ${name}${artwork ? ` about ${artwork}` : ''}`,
    text: `${details.filter(Boolean).join('\n')}\n\n${message}`,
  })
  if (error) {
    console.error('Inquiry delivery failed', error)
    return blocked('Your message did not go through. Please try again, or email info@aranesart.com.')
  }
  return { status: 'success', name: name.split(/\s+/)[0] }
}
