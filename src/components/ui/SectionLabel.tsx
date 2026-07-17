import { cn } from "@/lib/utils"

export function SectionLabel({
  index,
  children,
  className,
}: {
  index: string
  children: string
  className?: string
}) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <span className="font-mono text-xs tracking-widest text-subtle tabular-nums">
        {index}
      </span>
      <span className="h-px w-8 bg-border-strong" aria-hidden="true" />
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted">
        {children}
      </span>
    </div>
  )
}
