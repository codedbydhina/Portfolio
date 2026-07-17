import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, ArrowUpRight } from "lucide-react"
import { useScrollDirection } from "@/hooks/useScrollDirection"
import { cn } from "@/lib/utils"

const links = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
]

export function Navigation() {
  const { scrolled } = useScrollDirection()
  const [open, setOpen] = useState(false)
  const [activeHref, setActiveHref] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)
  const lightRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const sections = links
      .map(({ href }) => document.querySelector<HTMLElement>(href))
      .filter((section): section is HTMLElement => section !== null)

    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const activeEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (activeEntry) {
          setActiveHref(`#${activeEntry.target.id}`)
        }
      },
      {
        rootMargin: "-30% 0px -60% 0px",
        threshold: [0, 0.25, 0.5, 0.75],
      },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const nav = navRef.current
    const light = lightRef.current

    if (!nav || !light) return

    const proximityRange = 110
    const maxOffset = 4
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
    let reducedMotion = mediaQuery.matches
    let bounds = nav.getBoundingClientRect()
    let frame = 0
    let targetX = 0
    let targetY = 0
    let currentX = 0
    let currentY = 0
    let velocityX = 0
    let velocityY = 0
    let targetLightX = bounds.width / 2
    let targetLightY = bounds.height / 2
    let currentLightX = targetLightX
    let currentLightY = targetLightY
    let targetLightOpacity = 0
    let currentLightOpacity = 0

    const clamp = (value: number, min: number, max: number) =>
      Math.min(Math.max(value, min), max)

    const render = () => {
      velocityX = (velocityX + (targetX - currentX) * 0.11) * 0.72
      velocityY = (velocityY + (targetY - currentY) * 0.11) * 0.72
      currentX += velocityX
      currentY += velocityY
      currentLightX += (targetLightX - currentLightX) * 0.18
      currentLightY += (targetLightY - currentLightY) * 0.18
      currentLightOpacity += (targetLightOpacity - currentLightOpacity) * 0.16

      nav.style.transform = `translate3d(${currentX.toFixed(3)}px, ${currentY.toFixed(3)}px, 0)`
      light.style.setProperty("--nav-light-x", `${currentLightX.toFixed(1)}px`)
      light.style.setProperty("--nav-light-y", `${currentLightY.toFixed(1)}px`)
      light.style.opacity = currentLightOpacity.toFixed(3)

      const isSettled =
        Math.abs(targetX - currentX) < 0.01 &&
        Math.abs(targetY - currentY) < 0.01 &&
        Math.abs(velocityX) < 0.01 &&
        Math.abs(velocityY) < 0.01 &&
        Math.abs(targetLightX - currentLightX) < 0.1 &&
        Math.abs(targetLightY - currentLightY) < 0.1 &&
        Math.abs(targetLightOpacity - currentLightOpacity) < 0.01

      if (isSettled) {
        frame = 0
        return
      }

      frame = window.requestAnimationFrame(render)
    }

    const requestRender = () => {
      if (!frame) {
        frame = window.requestAnimationFrame(render)
      }
    }

    const reset = () => {
      if (reducedMotion) return

      targetX = 0
      targetY = 0
      targetLightOpacity = 0

      if (
        Math.abs(currentX) < 0.01 &&
        Math.abs(currentY) < 0.01 &&
        Math.abs(velocityX) < 0.01 &&
        Math.abs(velocityY) < 0.01 &&
        currentLightOpacity < 0.01
      ) {
        return
      }

      requestRender()
    }

    const measure = () => {
      bounds = nav.getBoundingClientRect()
      targetLightX = clamp(targetLightX, 0, bounds.width)
      targetLightY = clamp(targetLightY, 0, bounds.height)
      currentLightX = clamp(currentLightX, 0, bounds.width)
      currentLightY = clamp(currentLightY, 0, bounds.height)
    }

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion) return

      const closestX = clamp(event.clientX, bounds.left, bounds.right)
      const closestY = clamp(event.clientY, bounds.top, bounds.bottom)
      const distance = Math.hypot(event.clientX - closestX, event.clientY - closestY)

      if (distance > proximityRange) {
        reset()
        return
      }

      const proximity = 1 - distance / proximityRange
      const centerX = bounds.left + bounds.width / 2
      const centerY = bounds.top + bounds.height / 2
      targetX =
        clamp(
          (event.clientX - centerX) / (bounds.width / 2 + proximityRange),
          -1,
          1,
        ) *
        maxOffset *
        proximity
      targetY =
        clamp(
          (event.clientY - centerY) / (bounds.height / 2 + proximityRange),
          -1,
          1,
        ) *
        maxOffset *
        proximity
      targetLightX = clamp(event.clientX - bounds.left, 0, bounds.width)
      targetLightY = clamp(event.clientY - bounds.top, 0, bounds.height)
      targetLightOpacity = proximity
      requestRender()
    }

    const onMotionPreferenceChange = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches

      if (reducedMotion) {
        if (frame) window.cancelAnimationFrame(frame)
        frame = 0
        targetX = 0
        targetY = 0
        currentX = 0
        currentY = 0
        velocityX = 0
        velocityY = 0
        targetLightOpacity = 0
        currentLightOpacity = 0
        nav.style.transform = ""
        light.style.opacity = ""
      }
    }

    const resizeObserver = new ResizeObserver(measure)
    resizeObserver.observe(nav)
    window.addEventListener("pointermove", onPointerMove, { passive: true })
    window.addEventListener("blur", reset)
    window.addEventListener("resize", measure)
    mediaQuery.addEventListener("change", onMotionPreferenceChange)

    return () => {
      if (frame) window.cancelAnimationFrame(frame)
      resizeObserver.disconnect()
      window.removeEventListener("pointermove", onPointerMove)
      window.removeEventListener("blur", reset)
      window.removeEventListener("resize", measure)
      mediaQuery.removeEventListener("change", onMotionPreferenceChange)
      nav.style.transform = ""
      light.style.opacity = ""
    }
  }, [])

  const handleNav = (href: string) => {
    setOpen(false)
    setActiveHref(href)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Primary"
        ref={navRef}
        className={cn(
          "relative isolate flex w-full max-w-[1180px] items-center justify-between overflow-hidden rounded-[18px] border border-[rgba(255,255,255,0.55)] bg-[rgba(255,255,255,0.72)] px-3 py-2.5 shadow-[0_10px_40px_rgba(15,23,42,0.06)] [backdrop-filter:blur(20px)] [-webkit-backdrop-filter:blur(20px)] transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform before:pointer-events-none before:absolute before:inset-x-5 before:top-0 before:z-[1] before:h-px before:bg-white/70",
          scrolled &&
          "bg-[rgba(255,255,255,0.80)] shadow-[0_12px_44px_rgba(15,23,42,0.08)] [backdrop-filter:blur(24px)] [-webkit-backdrop-filter:blur(24px)]",
        )}
      >
        <span
          ref={lightRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0"
          style={{
            background:
              "radial-gradient(circle at var(--nav-light-x, 50%) var(--nav-light-y, 50%), rgba(255, 192, 203, 0.18), rgba(255, 192, 203, 0.08), transparent 70%)",
          }}
        />
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className="relative z-10 flex items-center gap-2 pl-2"
          aria-label="Alex Rivera — home"
        >
          <span className="grid h-7 w-7 place-items-center rounded-lg bg-foreground text-[13px] font-semibold text-background font-heading">
            P
          </span>
          <span className="block text-[13px] font-medium tracking-tight sm:text-sm">
            Dhinakaran
          </span>
        </a>

        <div className="relative z-10 hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <button
              key={l.href}
              onClick={() => handleNav(l.href)}
              aria-current={activeHref === l.href ? "page" : undefined}
              className={cn(
                "relative rounded-lg px-3.5 py-2 text-[14px] transition-[color,opacity,transform,background-color] duration-[250ms] ease-out will-change-transform after:pointer-events-none after:absolute after:bottom-[5px] after:left-3.5 after:right-3.5 after:h-px after:origin-center after:scale-x-0 after:bg-current after:opacity-0 after:transition-[transform,opacity] after:duration-[250ms] after:ease-out hover:-translate-y-px hover:bg-secondary hover:text-foreground hover:duration-[220ms]",
                activeHref === l.href
                  ? "text-foreground opacity-100 after:scale-x-100 after:opacity-50"
                  : "text-muted opacity-95",
              )}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="relative z-10 flex items-center gap-2">
          <a
            href="Dhinakarann.pdf/resume"
            className="group hidden h-10 items-center gap-1.5 rounded-[12px] bg-foreground px-4 text-[14px] font-medium text-background shadow-none transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:shadow-[0_8px_18px_rgba(15,23,42,0.22)] sm:inline-flex"
          >
            Resume
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-0.5"
              strokeWidth={1.75}
            />
          </a>
          <button
            className="grid h-10 w-10 place-items-center rounded-[12px] border border-border md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? (
              <X className="h-5 w-5" strokeWidth={1.75} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.75} />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-x-4 top-[72px] rounded-[18px] border border-border bg-card/90 p-2 backdrop-blur-xl md:hidden"
          >
            {links.map((l) => (
              <button
                key={l.href}
                onClick={() => handleNav(l.href)}
                className="block w-full rounded-xl px-4 py-3 text-left text-[15px] text-foreground transition-[color,transform,background-color] duration-[220ms] ease-out hover:-translate-y-px hover:bg-secondary"
              >
                {l.label}
              </button>
            ))}
            <a
              href="/resume"
              className="mt-1 flex items-center justify-between rounded-xl bg-foreground px-4 py-3 text-[15px] font-medium text-background"
            >
              Resume
              <ArrowUpRight className="h-4 w-4" strokeWidth={1.75} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
