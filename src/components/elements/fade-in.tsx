'use client'

import { motion } from 'framer-motion'
import { usePathname } from 'next/navigation'
import type { ComponentProps, ReactNode } from 'react'

// Simple fade in on mount/scroll
export function FadeIn({
  children,
  delay = 0,
  className,
  ...props
}: {
  children: ReactNode
  delay?: number
  className?: string
} & Omit<ComponentProps<typeof motion.div>, 'initial' | 'animate' | 'whileInView' | 'viewport' | 'transition'>) {
  const pathname = usePathname()

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

// Container for staggered children animations
export function FadeInStagger({
  children,
  className,
  delayChildren = 0.1,
}: {
  children: ReactNode
  className?: string
  delayChildren?: number
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Child item for staggered animations
export function FadeInStaggerChild({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// Card with hover effect
export function MotionCard({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className={className}>
      {children}
    </motion.div>
  )
}

// Scale and fade in effect
export function ScaleFadeIn({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
