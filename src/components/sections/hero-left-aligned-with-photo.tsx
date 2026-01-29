import { clsx } from 'clsx/lite'
import type { ComponentProps, ReactNode } from 'react'
import { Container } from '../elements/container'
import { Heading } from '../elements/heading'
import { Text } from '../elements/text'

export function HeroLeftAlignedWithPhoto({
  eyebrow,
  headline,
  subheadline,
  cta,
  photo,
  footer,
  className,
  ...props
}: {
  eyebrow?: ReactNode
  headline: ReactNode
  subheadline: ReactNode
  cta?: ReactNode
  photo?: ReactNode
  footer?: ReactNode
} & ComponentProps<'section'>) {
  return (
    <section className={clsx('py-16', className)} {...props}>
      <Container className="flex flex-col gap-16">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:gap-16">
          <div className="flex flex-col items-start gap-6 lg:flex-1 dark:text-white">
            {eyebrow}
            <Heading className="max-w-5xl text-3xl/9 sm:text-4xl/10">{headline}</Heading>
            <Text className="flex max-w-3xl flex-col gap-4">{subheadline}</Text>
            {cta}
          </div>
          <div className="lg:flex-1">{photo}</div>
        </div>
        {footer}
      </Container>
    </section>
  )
}
