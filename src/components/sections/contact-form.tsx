'use client'

import { sendInquiry, type InquiryState } from '@/app/contact/actions'
import { INQUIRER_KINDS } from '@/app/contact/inquirer-kinds'
import { clsx } from 'clsx/lite'
import { useActionState, type ReactNode } from 'react'
import { ButtonLink } from '../elements/button'
import { ArrowNarrowRightIcon } from '../icons/arrow-narrow-right-icon'
import { CheckmarkIcon } from '../icons/checkmark-icon'
import { ChevronIcon } from '../icons/chevron-icon'

const control = clsx(
  'w-full rounded-xl border border-olive-950/10 bg-olive-50 px-4 py-3 text-base/6 text-olive-950 transition sm:text-sm/6',
  'placeholder:text-olive-500 hover:border-olive-950/20 focus:border-olive-500 focus:bg-white focus:ring-4 focus:ring-olive-500/15 focus:outline-none',
  'aria-invalid:border-red-500/60 aria-invalid:focus:ring-red-500/15',
  'dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-olive-400 dark:hover:border-white/20',
  'dark:focus:border-olive-400 dark:focus:bg-white/10 dark:focus:ring-olive-400/20',
)

function Field({
  id,
  label,
  optional,
  error,
  className,
  children,
}: {
  id: string
  label: ReactNode
  optional?: boolean
  error?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={clsx('flex flex-col gap-2', className)}>
      <label htmlFor={id} className="flex justify-between text-sm/6 font-medium text-olive-950 dark:text-white">
        {label}
        {optional && <span className="font-normal text-olive-500 dark:text-olive-400">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm/6 text-red-700 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

/** Error props for an input whose server-side validation may fail. */
function invalid(id: string, error?: string) {
  return { 'aria-invalid': Boolean(error), 'aria-describedby': error ? `${id}-error` : undefined }
}

export function ContactForm({
  artworks,
  selected,
}: {
  artworks: Array<{ id: string; title: string }>
  /** The painting to preselect, when the visitor came from a painting's Inquire button. */
  selected?: string
}) {
  const [state, formAction, pending] = useActionState<InquiryState, FormData>(sendInquiry, { status: 'idle' })
  const fieldErrors = state.status === 'error' ? state.fieldErrors : undefined
  const values = state.status === 'error' ? state.values : {}

  if (state.status === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-6 py-6">
        <span className="flex size-12 items-center justify-center rounded-full bg-olive-950 text-white dark:bg-olive-300 dark:text-olive-950">
          <CheckmarkIcon className="size-5" />
        </span>
        <div className="flex flex-col gap-3">
          <h2 className="font-display text-4xl/10 tracking-tight text-olive-950 dark:text-white">
            Thank you{state.name && `, ${state.name}`}.
          </h2>
          <p className="max-w-md text-base/7 text-olive-700 dark:text-olive-400">
            Your message is on its way to me, and I&apos;ll reply by email soon.
          </p>
        </div>
        <ButtonLink href="/" size="lg">
          Back to the gallery
        </ButtonLink>
      </div>
    )
  }

  return (
    <form action={formAction} noValidate className="flex flex-col gap-8">
      {/* Honeypot: hidden from people and assistive tech, tempting to bots. */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <fieldset className="flex flex-col gap-3">
        <legend className="mb-3 text-sm/6 font-medium text-olive-950 dark:text-white">
          I&apos;m reaching out as a
        </legend>
        <div className="flex flex-wrap gap-2">
          {Object.entries(INQUIRER_KINDS).map(([value, label]) => (
            <label
              key={value}
              className={clsx(
                'cursor-pointer rounded-full border border-olive-950/10 px-4 py-2 text-sm/6 text-olive-800 transition select-none',
                'hover:border-olive-950/25 has-checked:border-olive-950 has-checked:bg-olive-950 has-checked:text-white',
                'has-focus-visible:ring-4 has-focus-visible:ring-olive-500/25',
                'dark:border-white/15 dark:text-olive-200 dark:hover:border-white/30',
                'dark:has-checked:border-olive-300 dark:has-checked:bg-olive-300 dark:has-checked:text-olive-950',
              )}
            >
              <input
                type="radio"
                name="kind"
                value={value}
                defaultChecked={values.kind === value}
                className="sr-only"
              />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" error={fieldErrors?.name}>
          <input
            id="name"
            name="name"
            defaultValue={values.name}
            autoComplete="name"
            placeholder="Your full name"
            required
            className={control}
            {...invalid('name', fieldErrors?.name)}
          />
        </Field>
        <Field id="email" label="Email" error={fieldErrors?.email}>
          <input
            id="email"
            name="email"
            type="email"
            defaultValue={values.email}
            autoComplete="email"
            placeholder="you@example.com"
            required
            className={control}
            {...invalid('email', fieldErrors?.email)}
          />
        </Field>
        <Field id="phone" label="Phone" optional>
          <input
            id="phone"
            name="phone"
            type="tel"
            defaultValue={values.phone}
            autoComplete="tel"
            placeholder="(123) 456-7890"
            className={control}
          />
        </Field>
        <Field id="artwork" label="Artwork of interest" optional>
          <div className="relative">
            <select
              id="artwork"
              name="artwork"
              defaultValue={values.artwork ?? selected ?? ''}
              className={clsx(control, 'appearance-none pr-10')}
            >
              <option value="">No particular piece</option>
              {artworks.map((artwork) => (
                <option key={artwork.id} value={artwork.id}>
                  {artwork.title}
                </option>
              ))}
            </select>
            <ChevronIcon className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 rotate-90 text-olive-500" />
          </div>
        </Field>
        <Field id="message" label="Message" error={fieldErrors?.message} className="sm:col-span-2">
          <textarea
            id="message"
            name="message"
            rows={6}
            defaultValue={values.message}
            placeholder="Tell me about your gallery, the space you have in mind, or the piece that caught your eye."
            required
            className={clsx(control, 'resize-y')}
            {...invalid('message', fieldErrors?.message)}
          />
        </Field>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div aria-live="polite" className="text-sm/6 text-red-700 dark:text-red-400">
          {state.status === 'error' && !fieldErrors && state.message}
        </div>
        <button
          type="submit"
          disabled={pending}
          className={clsx(
            'group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-olive-950 px-6 py-3 text-sm/6 font-medium text-white transition',
            'hover:bg-olive-800 disabled:cursor-wait disabled:opacity-70',
            'dark:bg-olive-300 dark:text-olive-950 dark:hover:bg-olive-200',
          )}
        >
          {pending ? 'Sending…' : 'Send message'}
          {!pending && <ArrowNarrowRightIcon className="transition-transform group-hover:translate-x-0.5" />}
        </button>
      </div>
    </form>
  )
}
