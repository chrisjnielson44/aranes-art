'use client'

import { useEffect, useId, useRef, useState } from 'react'
import { LOGO_PATHS, LOGO_VIEWBOX } from './logo-paths'
import { SIGNATURE_STROKE_WIDTH, SIGNATURE_STROKES, SIGNED_STORAGE_KEY } from './signature-strokes'

// Pen speed in viewBox units per second, and the pause while the pen lifts between strokes.
const PEN_SPEED = 1500
const PEN_LIFT = 0.12

let start = 0
const timings = SIGNATURE_STROKES.map(({ length }) => {
  const duration = Math.max(length / PEN_SPEED, 0.15)
  const timing = { delay: start, duration }
  start += duration + PEN_LIFT
  return timing
})

type Drawn = 'on-load' | 'in-view'

// Signatures already written since this page loaded, so a logo remounted by client-side navigation shows up finished.
const written = new Set<Drawn>()

/** Remembers for the rest of the tab's session that this signature has been written; see SIGNED_STORAGE_KEY. */
function markWritten(drawn: Drawn) {
  written.add(drawn)
  try {
    const signed = new Set(sessionStorage.getItem(SIGNED_STORAGE_KEY)?.split(' '))
    signed.add(drawn)
    sessionStorage.setItem(SIGNED_STORAGE_KEY, [...signed].filter(Boolean).join(' '))
  } catch {
    // Storage can be unavailable (private mode, blocked cookies); the signature then just writes again next load.
  }
}

export function Logo({
  className,
  width,
  height,
  drawn,
}: {
  className?: string
  width?: number | string
  height?: number | string
  /** Writes the signature in like a pen, on load or when it scrolls into view, once per browser session. */
  drawn?: Drawn
}) {
  const maskId = `signature-${useId().replace(/[^\w-]/g, '')}`
  const ref = useRef<SVGSVGElement>(null)
  const [draw] = useState(() => drawn !== undefined && !written.has(drawn))
  const [writing, setWriting] = useState(drawn === 'on-load')

  useEffect(() => {
    if (!draw) return
    if (drawn === 'on-load') markWritten('on-load')
    if (drawn !== 'in-view' || !ref.current) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setWriting(true)
        markWritten('in-view')
        observer.disconnect()
      },
      { threshold: 0.5 },
    )
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [drawn, draw])

  return (
    <svg
      ref={ref}
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox={LOGO_VIEWBOX}
      className={className}
      width={width || '100'}
      height={height || '50'}
      fill="currentColor"
    >
      {draw && (
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="1024" height="528">
            {SIGNATURE_STROKES.map(({ name, d }, i) => (
              <path
                key={name}
                d={d}
                pathLength={1}
                fill="none"
                stroke="white"
                strokeWidth={SIGNATURE_STROKE_WIDTH}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="signature-stroke"
                data-signature={drawn}
                style={{
                  animationDelay: `${timings[i].delay}s`,
                  animationDuration: `${timings[i].duration}s`,
                  animationPlayState: writing ? 'running' : 'paused',
                }}
              />
            ))}
          </mask>
        </defs>
      )}
      <g mask={draw ? `url(#${maskId})` : undefined}>
        {LOGO_PATHS.map((d) => (
          <path key={d.slice(0, 24)} d={d} />
        ))}
      </g>
    </svg>
  )
}
