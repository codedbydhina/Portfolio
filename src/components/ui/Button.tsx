import { motion } from "framer-motion"
import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type ButtonProps = {
  children: ReactNode
  href?: string
  onClick?: () => void
  variant?: "primary" | "secondary"
  className?: string
  ariaLabel?: string
  external?: boolean
}

export function Button({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  ariaLabel,
  external,
}: ButtonProps) {
  const base =
    "inline-flex h-12 items-center justify-center gap-2 rounded-[14px] px-6 text-[15px] font-medium tracking-tight transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform"

  const styles = {
    primary:
      "bg-foreground text-background hover:bg-foreground/90",
    secondary:
      "bg-card text-foreground border border-[#E5E7EB] hover:border-border-strong hover:bg-secondary",
  }

  const content = (
    <motion.span
      className={cn(base, styles[variant], className)}
      whileHover={{ y: -2 }}
      whileTap={{ y: 0, scale: 0.99 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.span>
  )

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        aria-label={ariaLabel}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer noopener" : undefined}
        className="inline-block"
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} aria-label={ariaLabel} className="inline-block">
      {content}
    </button>
  )
}
