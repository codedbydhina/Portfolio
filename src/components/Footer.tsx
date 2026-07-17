import { profile } from "@/data/content"

export function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1180px] flex-col items-center gap-6 px-6 py-10 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:gap-0">
        <div className="flex items-center gap-3 sm:justify-self-start">
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-foreground text-[13px] font-semibold text-background font-heading">
            P
          </span>
          <span className="font-display text-[15px] font-medium tracking-tight">
            {profile.name}
          </span>
        </div>

        <p className="text-[13px] text-subtle sm:justify-self-center">
          {profile.location} · {year}
        </p>

        <p className="text-[13px] text-subtle sm:justify-self-end">
          © 2026 Dhinakaran. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
