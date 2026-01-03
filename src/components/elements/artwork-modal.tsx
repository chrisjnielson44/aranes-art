'use client'

import { clsx } from 'clsx/lite'
import type { ReactNode } from 'react'
import { useEffect } from 'react'
import { Button } from './button'

export function ArtworkModal({
  isOpen,
  onClose,
  image,
  title,
  medium,
  dimensions,
  price,
  year,
  description,
  sold = false,
}: {
  isOpen: boolean
  onClose: () => void
  image: ReactNode
  title: string
  medium?: string
  dimensions?: string
  price?: string
  year?: string | number
  description?: string
  sold?: boolean
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className={clsx(
          'relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-lg bg-white p-6 shadow-2xl dark:bg-olive-950',
          'animate-in fade-in zoom-in-95 duration-300',
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full bg-olive-950/10 p-2 text-olive-950 hover:bg-olive-950/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          aria-label="Close modal"
        >
          <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-olive-100 dark:bg-olive-900">
            <div className="size-full *:size-full *:object-contain">{image}</div>
            {sold && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="rounded-full bg-white px-6 py-3 text-lg font-semibold text-olive-950">SOLD</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-3xl font-bold text-olive-950 dark:text-white">{title}</h2>
              {year && <p className="mt-2 text-lg text-olive-700 dark:text-olive-400">{year}</p>}
            </div>

            {medium && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-olive-600 dark:text-olive-500">
                  Medium
                </h3>
                <p className="mt-1 text-olive-950 dark:text-white">{medium}</p>
              </div>
            )}

            {dimensions && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-olive-600 dark:text-olive-500">
                  Dimensions
                </h3>
                <p className="mt-1 text-olive-950 dark:text-white">{dimensions}</p>
              </div>
            )}

            {description && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-olive-600 dark:text-olive-500">
                  About this piece
                </h3>
                <p className="mt-1 text-olive-950 dark:text-white">{description}</p>
              </div>
            )}

            {price && !sold && (
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wider text-olive-600 dark:text-olive-500">
                  Price
                </h3>
                <p className="mt-1 text-2xl font-bold text-olive-950 dark:text-white">{price}</p>
              </div>
            )}

            <div className="mt-auto flex gap-4">
              {!sold && (
                <Button size="lg" onClick={() => (window.location.href = '/contact')}>
                  Inquire
                </Button>
              )}
              <Button size="lg" color="light" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
