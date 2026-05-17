import type { ComponentProps } from 'react'
import { Section } from '../elements/section'

export function GalleryGrid({ children, ...props }: ComponentProps<typeof Section>) {
  return (
    <Section {...props}>
      <div className="grid grid-cols-1 gap-x-16 gap-y-14 md:grid-cols-6 lg:gap-y-16">{children}</div>
    </Section>
  )
}
