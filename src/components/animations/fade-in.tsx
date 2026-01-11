'use client'

import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const fadeInVariants: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0 },
}

interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
}

export function FadeIn({ children, delay = 0, duration = 0.4, className }: FadeInProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px', amount: 0.3 }}
      transition={{ duration, delay, ease: 'easeOut' }}
      variants={fadeInVariants}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface FadeInStaggerProps {
  children: ReactNode
  staggerDelay?: number
  className?: string
}

export function FadeInStagger({ children, staggerDelay = 0.05, className }: FadeInStaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px', amount: 0.1 }}
      transition={{ staggerChildren: staggerDelay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function FadeInStaggerItem({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <motion.div variants={fadeInVariants} transition={{ duration: 0.4, ease: 'easeOut' }} className={className}>
      {children}
    </motion.div>
  )
}
