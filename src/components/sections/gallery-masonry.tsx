import type { ComponentProps } from 'react'
import { Section } from '../elements/section'

export function GalleryMasonry({ children, ...props }: ComponentProps<typeof Section>) {
  return (
    <Section {...props}>
      <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 xl:columns-4">{children}</div>
    </Section>
  )
}
