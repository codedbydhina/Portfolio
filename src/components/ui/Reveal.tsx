import { motion, type Variants } from "framer-motion"
import type { ReactNode } from "react"

const variants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

type RevealProps = {
  children: ReactNode
  delay?: number
  className?: string
  as?: "div" | "section" | "li" | "span"
}

export function Reveal({ children, delay = 0, className, as = "div" }: RevealProps) {
  const MotionTag = motion[as]
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        hidden: variants.hidden,
        visible: {
          ...(variants.visible as object),
          transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay },
        },
      }}
    >
      {children}
    </MotionTag>
  )
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

export function RevealGroup({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  )
}

export const childVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}
