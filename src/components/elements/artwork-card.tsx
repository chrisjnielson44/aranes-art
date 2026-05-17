'use client'

import { clsx } from 'clsx/lite'
import type { ComponentProps, CSSProperties, ReactNode } from 'react'

export function ArtworkCard({
  image,
  title,
  medium,
  dimensions,
  price,
  year,
  sold = false,
  onClick,
  showDetails = false,
  displayWidth,
  displayHeight,
  displayMaxSide,
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
  showDetails?: boolean
  displayWidth?: number
  displayHeight?: number
  displayMaxSide?: number
} & ComponentProps<'div'>) {
  const shouldScaleArtwork =
    displayWidth !== undefined && displayHeight !== undefined && displayMaxSide !== undefined
  const scaledArtworkStyle = shouldScaleArtwork
    ? ({
        '--artwork-width': `${Math.min((displayWidth / displayMaxSide) * 100, 100)}%`,
        '--artwork-max-width': `${Math.min((displayWidth / displayHeight) * 100, 100)}%`,
        '--artwork-ratio': `${displayWidth} / ${displayHeight}`,
      } as CSSProperties)
    : undefined

  return (
    <div
      onClick={onClick}
      aria-label={`View details for ${title}`}
      className={clsx(
        'group relative flex cursor-pointer flex-col rounded-lg transition-all focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-olive-500',
        className,
      )}
      {...props}
    >
      <div
        className={clsx(
          'relative flex justify-center',
          shouldScaleArtwork && 'h-auto',
          !shouldScaleArtwork && 'overflow-hidden rounded-md',
        )}
      >
        <div
          className={clsx(
            'transition-transform duration-300 group-hover:scale-[1.02]',
            shouldScaleArtwork
              ? 'w-(--artwork-width) max-w-(--artwork-max-width) *:block *:size-full *:object-contain'
              : '*:block *:h-auto *:w-full *:object-contain',
          )}
          style={scaledArtworkStyle}
        >
          {shouldScaleArtwork ? <div className="aspect-(--artwork-ratio)">{image}</div> : image}
        </div>
        {sold && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-olive-950">SOLD</span>
          </div>
        )}
      </div>

      {showDetails && (
        <div className="mt-4 flex flex-col gap-1">
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
      )}
    </div>
  )
}
