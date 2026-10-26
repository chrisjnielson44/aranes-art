'use client'

import type { Artwork } from '@/lib/artworks'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ArrowNarrowLeftIcon } from '../icons/arrow-narrow-left-icon'
import { ArrowNarrowRightIcon } from '../icons/arrow-narrow-right-icon'
import { ButtonLink, SoftButton } from './button'

const smoothEase = [0.22, 1, 0.36, 1] as const

function CloseIcon() {
  return (
    <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}

function ArtworkImage({ artwork, sizes, className }: { artwork: Artwork; sizes: string; className?: string }) {
  return (
    <Image
      src={artwork.image}
      alt={artwork.title}
      width={Math.round(artwork.displayWidth * 40)}
      height={Math.round(artwork.displayHeight * 40)}
      sizes={sizes}
      quality={85}
      className={className}
    />
  )
}

/**
 * One painting at a time, with its details and a way to ask about it. Arrow keys, the arrow buttons, or a swipe move
 * through the gallery; clicking the painting shows it full screen.
 */
export function ArtworkModal({
  artwork,
  position,
  onClose,
  onPrevious,
  onNext,
}: {
  artwork: Artwork
  /** For example "3 of 9". */
  position: string
  onClose: () => void
  onPrevious: () => void
  onNext: () => void
}) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const swipeStart = useRef<number | null>(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) setIsFullscreen(false)
        else onClose()
      }
      if (e.key === 'ArrowLeft') onPrevious()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isFullscreen, onClose, onPrevious, onNext])

  const swipe = {
    onTouchStart: (e: React.TouchEvent) => {
      swipeStart.current = e.touches[0].clientX
    },
    onTouchEnd: (e: React.TouchEvent) => {
      if (swipeStart.current === null) return
      const distance = e.changedTouches[0].clientX - swipeStart.current
      swipeStart.current = null
      if (distance > 50) onPrevious()
      if (distance < -50) onNext()
    },
  }

  if (isFullscreen) {
    return (
      <div
        className="fixed inset-0 z-[9999] flex cursor-zoom-out items-center justify-center bg-black"
        onClick={() => setIsFullscreen(false)}
        {...swipe}
      >
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
          aria-label="Exit full screen"
        >
          <CloseIcon />
        </button>
        <ArtworkImage artwork={artwork} sizes="100vw" className="max-h-screen w-auto max-w-full object-contain" />
      </div>
    )
  }

  const details = [
    ['Medium', artwork.medium],
    ['Dimensions', artwork.dimensions],
  ].filter(([, value]) => value)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={artwork.title}
    >
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4, ease: smoothEase }}
        className="relative max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl sm:p-8 dark:bg-olive-950 dark:ring-1 dark:ring-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 rounded-full bg-olive-950/10 p-2 text-olive-950 hover:bg-olive-950/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className="grid gap-8 md:grid-cols-5 md:gap-10">
          <div
            className="relative flex cursor-zoom-in items-center justify-center overflow-hidden rounded-xl bg-olive-100 p-4 md:col-span-3 dark:bg-white/5"
            onClick={() => setIsFullscreen(true)}
            {...swipe}
          >
            <motion.div
              key={artwork.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.35, ease: smoothEase }}
              className="flex justify-center"
            >
              <ArtworkImage
                artwork={artwork}
                sizes="(min-width: 768px) 60vw, 100vw"
                className="max-h-[70vh] w-auto object-contain"
              />
            </motion.div>
            {artwork.sold && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <span className="rounded-full bg-white px-6 py-3 text-lg font-semibold text-olive-950">Sold</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-8 md:col-span-2 md:py-4">
            <div className="flex flex-col gap-2 pr-10">
              <p className="text-sm/6 text-olive-600 dark:text-olive-500">{position}</p>
              <h2 className="font-display text-4xl/10 tracking-tight text-olive-950 sm:text-5xl/14 dark:text-white">
                {artwork.title}
              </h2>
            </div>

            <dl className="flex flex-col divide-y divide-olive-950/10 border-y border-olive-950/10 dark:divide-white/10 dark:border-white/10">
              {details.map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-3 text-sm/6">
                  <dt className="text-olive-600 dark:text-olive-500">{label}</dt>
                  <dd className="text-right text-olive-950 dark:text-white">{value}</dd>
                </div>
              ))}
            </dl>

            <div className="flex flex-wrap gap-3">
              {!artwork.sold && (
                <ButtonLink href={`/contact?artwork=${artwork.id}`} size="lg">
                  Inquire about this piece
                </ButtonLink>
              )}
            </div>

            <div className="mt-auto flex items-center justify-between gap-4">
              <SoftButton size="lg" onClick={onPrevious} aria-label="Previous painting">
                <ArrowNarrowLeftIcon /> Previous
              </SoftButton>
              <SoftButton size="lg" onClick={onNext} aria-label="Next painting">
                Next <ArrowNarrowRightIcon />
              </SoftButton>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
