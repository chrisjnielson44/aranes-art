'use client'

import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'

export function ArtworkCardMasonry({
  image,
  title,
  medium,
  dimensions,
  price,
  year,
  sold = false,
  onClick,
  aspectRatio = '3/4', // Default portrait ratio, can be customized per artwork
  className,
  ...props
}: {
  image: ReactNode
  title: string
  medium?: string
  dimensions?: string
  price?: string
  year?: string | number
  sold?: boolean
  onClick?: () => void
  aspectRatio?: string // e.g., '3/4' for portrait, '4/3' for landscape, '1/1' for square
} & ComponentProps<'div'>) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'group mb-6 inline-block w-full cursor-pointer break-inside-avoid',
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm transition-all hover:shadow-md dark:bg-olive-950/50">
        <div
          className="relative overflow-hidden rounded-md bg-olive-100 outline -outline-offset-1 outline-black/5 dark:bg-olive-900 dark:outline-white/5"
          style={{ aspectRatio }}
        >
          <div className="size-full object-cover transition-transform duration-300 group-hover:scale-105 *:size-full *:object-cover">
            {image}
          </div>
          {sold && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-olive-950">SOLD</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="font-semibold text-olive-950 dark:text-white">{title}</h3>

          {medium && <p className="text-sm text-olive-700 dark:text-olive-400">{medium}</p>}

          {(dimensions || year) && (
            <p className="text-sm text-olive-600 dark:text-olive-500">
              {dimensions}
              {dimensions && year && ' • '}
              {year}
            </p>
          )}

          {price && !sold && <p className="mt-1 font-medium text-olive-950 dark:text-white">{price}</p>}
        </div>
      </div>
    </div>
  )
}
