import PostalMime, { type Address } from 'postal-mime'
import { Resend } from 'resend'

/**
 * Forwards mail sent to any address on the domain to INBOUND_FORWARD_TO. Resend receives the message and calls this
 * route with an `email.received` webhook. The copy keeps the original body and attachments, and its Reply-To points at
 * the original sender, so answering from the inbox goes straight back to them.
 */
export async function POST(request: Request) {
  const {
    RESEND_API_KEY: apiKey,
    RESEND_WEBHOOK_SECRET: webhookSecret,
    RESEND_EMAIL_DOMAIN: domain,
    INBOUND_FORWARD_TO: forwardTo,
  } = process.env
  if (!apiKey || !webhookSecret || !domain || !forwardTo) {
    return new Response('Inbound forwarding is not configured', { status: 503 })
  }

  const resend = new Resend(apiKey)
  const payload = await request.text()
  let event
  try {
    event = resend.webhooks.verify({
      payload,
      headers: {
        id: request.headers.get('svix-id') ?? '',
        timestamp: request.headers.get('svix-timestamp') ?? '',
        signature: request.headers.get('svix-signature') ?? '',
      },
      webhookSecret,
    })
  } catch {
    return new Response('Invalid signature', { status: 401 })
  }
  if (event.type !== 'email.received') return new Response(null, { status: 204 })

  // Any failure below answers 500 so Resend retries; the idempotency key keeps a retry from sending a second copy.
  const { data: email, error } = await resend.emails.receiving.get(event.data.email_id)
  if (error || !email?.raw?.download_url) {
    console.error('Inbound email lookup failed', event.data.email_id, error)
    return new Response('Email not available', { status: 500 })
  }

  const raw = await fetch(email.raw.download_url, { signal: AbortSignal.timeout(15_000) })
  if (!raw.ok) {
    console.error('Inbound email download failed', email.id, raw.status)
    return new Response('Email download failed', { status: 500 })
  }
  const parsed = await PostalMime.parse(await raw.arrayBuffer(), { attachmentEncoding: 'base64' })

  const replyTo = mailboxes(parsed.replyTo?.length ? parsed.replyTo : parsed.from ? [parsed.from] : [])
  const senderName = parsed.from?.name || parsed.from?.address || email.from
  const { error: sendError } = await resend.emails.send(
    {
      from: `"${senderName.replace(/["\\<>]/g, '')} via Aranes Art" <inbox@${domain}>`,
      to: forwardTo.split(',').map((address) => address.trim()),
      replyTo: replyTo.length ? replyTo : email.from,
      subject: email.subject || '(no subject)',
      html: parsed.html || undefined,
      text: parsed.text ?? '',
      attachments: parsed.attachments.map((attachment) => ({
        filename: attachment.filename ?? undefined,
        content: attachment.content as string,
        contentType: attachment.mimeType,
        // Inline images reference their content ID without the angle brackets.
        contentId: attachment.contentId?.replace(/^<|>$/g, '') || undefined,
      })),
    },
    { idempotencyKey: `inbound-${email.id}` },
  )
  if (sendError) {
    console.error('Inbound email forward failed', email.id, sendError)
    return new Response('Forward failed', { status: 500 })
  }
  return new Response(null, { status: 204 })
}

/** Flattens address groups into a plain list of email addresses. */
function mailboxes(addresses: Address[]) {
  return addresses.flatMap((address) => (address.group ? address.group : [address])).map((mailbox) => mailbox.address)
}
