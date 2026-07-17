import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { ArrowDown, Sparkles } from "lucide-react"
import { GithubIcon, LinkedinIcon, XIcon } from "@/components/ui/BrandIcons"
import { Button } from "@/components/ui/Button"
import { profile } from "@/data/content"

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const decoY = useTransform(scrollYProgress, [0, 1], [0, -60])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 40])
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const ease = [0.22, 1, 0.36, 1] as const

  return (
    <section
      ref={ref}
      id="top"
      className="relative overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 bg-lines [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <div className="pointer-events-none absolute -top-24 right-1/4 h-72 w-72 rounded-full bg-accent-soft blur-3xl" />
      <div className="pointer-events-none absolute top-40 -left-20 h-64 w-64 rounded-full bg-[rgba(0,0,0,0.03)] blur-3xl" />

      <div className="mx-auto grid max-w-[1180px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
        {/* Left — editorial content */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3.5 py-1.5 backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-accent" strokeWidth={1.75} />
            <span className="text-[13px] font-medium tracking-tight text-muted">
              {profile.role}
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.08 }}
            className="mt-6 font-display text-[clamp(2.75rem,7vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-balance"
          >
            Software built
            <br />
            with{" "}
            <span className="relative inline-block">
              intention.
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 9C40 4 120 3 198 7"
                  stroke="#635BFF"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            .
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.16 }}
            className="mt-7 max-w-md text-[19px] leading-relaxed text-muted text-pretty"
          >
            {profile.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-3"
          >
            <Button
              onClick={() =>
                document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View selected work
            </Button>
            <Button
              variant="secondary"
              onClick={() =>
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get in touch
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, ease, delay: 0.36 }}
            className="mt-10 flex items-center gap-6"
          >
            <div className="flex items-center gap-2.5">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[13px] text-muted">Open to Software Engineering Opportunities</span>
            </div>
            <span className="h-4 w-px bg-border-strong" />
            <div className="flex items-center gap-1">
              {[
                { icon: GithubIcon, href: profile.socials.github, label: "GitHub" },
                { icon: LinkedinIcon, href: profile.socials.linkedin, label: "LinkedIn" },
                { icon: XIcon, href: profile.socials.twitter, label: "X (Twitter)" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg text-muted transition-all duration-300 hover:-translate-y-0.5 hover:bg-secondary hover:text-foreground"
                >
                  <Icon className="h-[16px] w-[16px]" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Right — portrait with organic mask + decorations */}
        <motion.div style={{ y: portraitY }} className="relative z-10 mx-auto w-full max-w-md">
          <div className="relative aspect-square">
            {/* floating card top-left */}
            <motion.div
              style={{ y: decoY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease, delay: 0.5 }}
              className="absolute -left-2 top-10 z-20 rounded-2xl border border-border bg-card/90 px-4 py-3 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
            >
              <p className="font-display text-2xl font-semibold leading-none">Open</p>
              <p className="mt-1 text-[12px] text-muted">to Work</p>
            </motion.div>

            {/* floating card bottom-right */}
            <motion.div
              style={{ y: useTransform(scrollYProgress, [0, 1], [0, 40]) }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease, delay: 0.6 }}
              className="absolute -right-1 bottom-14 z-20 flex items-center gap-2.5 rounded-2xl border border-border bg-card/90 px-4 py-3 backdrop-blur-md shadow-[0_10px_40px_rgba(0,0,0,0.06)]"
            >
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent-soft">
                <Sparkles className="h-4 w-4 text-accent" strokeWidth={1.75} />
              </span>
              <div>
                <p className="text-[13px] font-medium leading-none">Product-minded</p>
                <p className="mt-1 text-[12px] text-muted">design + engineering</p>
              </div>
            </motion.div>

            {/* soft plate behind portrait */}
            <div className="absolute inset-4 rounded-[40px] bg-secondary" />
            <div className="noise absolute inset-4 overflow-hidden rounded-[40px]" />

            {/* portrait */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.3 }}
              className="mask-blob absolute inset-0"
            >
              <img
                src="/portrait2.png"
                alt="Portrait of Alex Rivera"
                width={520}
                height={520}
                loading="eager"
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <motion.div
        style={{ opacity: fade }}
        className="mt-16 flex justify-center md:mt-20"
      >
        <div className="flex flex-col items-center gap-2 text-subtle">
          <span className="text-[11px] uppercase tracking-[0.2em]">Scroll</span>
          <motion.span
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="h-4 w-4" strokeWidth={1.5} />
          </motion.span>
        </div>
      </motion.div>
    </section>
  )
}
