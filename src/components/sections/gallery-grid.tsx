import type { ComponentProps } from 'react'
import { Section } from '../elements/section'

export function GalleryGrid({ children, ...props }: ComponentProps<typeof Section>) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{children}</div>
    </Section>
  )
}
