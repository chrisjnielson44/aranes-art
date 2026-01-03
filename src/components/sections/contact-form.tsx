'use client'

import { clsx } from 'clsx/lite'
import { useState } from 'react'
import { Button } from '../elements/button'
import { Section } from '../elements/section'

export function ContactForm({
  artworks = [],
  className,
  ...props
}: {
  artworks?: Array<{ id: string; title: string }>
} & React.ComponentProps<typeof Section>) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    artworkInterest: '',
    message: '',
  })
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('submitting')

    // TODO: Implement actual form submission
    // For now, just simulate success
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', artworkInterest: '', message: '' })
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <Section className={className} {...props}>
      <form onSubmit={handleSubmit} className="mx-auto max-w-2xl">
        <div className="flex flex-col gap-6">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-olive-950 dark:text-white">
              Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className={clsx(
                'mt-2 w-full rounded-lg border border-olive-950/10 bg-white px-4 py-3 text-olive-950',
                'placeholder:text-olive-500 focus:border-olive-500 focus:outline-none focus:ring-2 focus:ring-olive-500/20',
                'dark:border-white/10 dark:bg-olive-950/50 dark:text-white dark:placeholder:text-olive-400',
                'dark:focus:border-olive-400 dark:focus:ring-olive-400/20',
              )}
              placeholder="Your full name"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-olive-950 dark:text-white">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className={clsx(
                'mt-2 w-full rounded-lg border border-olive-950/10 bg-white px-4 py-3 text-olive-950',
                'placeholder:text-olive-500 focus:border-olive-500 focus:outline-none focus:ring-2 focus:ring-olive-500/20',
                'dark:border-white/10 dark:bg-olive-950/50 dark:text-white dark:placeholder:text-olive-400',
                'dark:focus:border-olive-400 dark:focus:ring-olive-400/20',
              )}
              placeholder="your.email@example.com"
            />
          </div>

          {/* Phone Field */}
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-olive-950 dark:text-white">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={clsx(
                'mt-2 w-full rounded-lg border border-olive-950/10 bg-white px-4 py-3 text-olive-950',
                'placeholder:text-olive-500 focus:border-olive-500 focus:outline-none focus:ring-2 focus:ring-olive-500/20',
                'dark:border-white/10 dark:bg-olive-950/50 dark:text-white dark:placeholder:text-olive-400',
                'dark:focus:border-olive-400 dark:focus:ring-olive-400/20',
              )}
              placeholder="(123) 456-7890"
            />
          </div>

          {/* Artwork Interest Dropdown */}
          {artworks.length > 0 && (
            <div>
              <label htmlFor="artworkInterest" className="block text-sm font-medium text-olive-950 dark:text-white">
                Artwork of Interest
              </label>
              <select
                id="artworkInterest"
                name="artworkInterest"
                value={formData.artworkInterest}
                onChange={handleChange}
                className={clsx(
                  'mt-2 w-full rounded-lg border border-olive-950/10 bg-white px-4 py-3 text-olive-950',
                  'focus:border-olive-500 focus:outline-none focus:ring-2 focus:ring-olive-500/20',
                  'dark:border-white/10 dark:bg-olive-950/50 dark:text-white',
                  'dark:focus:border-olive-400 dark:focus:ring-olive-400/20',
                )}
              >
                <option value="">Select an artwork (optional)</option>
                {artworks.map((artwork) => (
                  <option key={artwork.id} value={artwork.id}>
                    {artwork.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-olive-950 dark:text-white">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className={clsx(
                'mt-2 w-full resize-none rounded-lg border border-olive-950/10 bg-white px-4 py-3 text-olive-950',
                'placeholder:text-olive-500 focus:border-olive-500 focus:outline-none focus:ring-2 focus:ring-olive-500/20',
                'dark:border-white/10 dark:bg-olive-950/50 dark:text-white dark:placeholder:text-olive-400',
                'dark:focus:border-olive-400 dark:focus:ring-olive-400/20',
              )}
              placeholder="Tell me about your inquiry, commission request, or gallery interest..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex items-center gap-4">
            <Button type="submit" size="lg" disabled={status === 'submitting'}>
              {status === 'submitting' ? 'Sending...' : 'Send Message'}
            </Button>

            {status === 'success' && (
              <p className="text-sm text-green-600 dark:text-green-400">Message sent successfully!</p>
            )}

            {status === 'error' && (
              <p className="text-sm text-red-600 dark:text-red-400">
                Failed to send message. Please try again.
              </p>
            )}
          </div>
        </div>
      </form>
    </Section>
  )
}
