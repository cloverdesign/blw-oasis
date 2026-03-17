"use client"

import { useRef } from "react"
import { motion, useReducedMotion, useInView } from "motion/react"

interface RevealProps {
  children: React.ReactNode
  className?: string
  delay?: number
  rotate?: number
  as?: keyof typeof motion
  amount?: number
}

export const Reveal = ({
  children,
  className,
  delay = 0,
  rotate = 0,
  as = "div",
  amount = 0.3,
}: RevealProps) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount })
  const prefersReducedMotion = useReducedMotion()

  const Component = motion[as] as typeof motion.div

  if (prefersReducedMotion) {
    return <Component className={className}>{children}</Component>
  }

  return (
    <Component
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 16, rotate }}
      animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : undefined}
      transition={{
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay,
      }}
    >
      {children}
    </Component>
  )
}
