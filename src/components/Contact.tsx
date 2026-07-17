import { Mail, ArrowUpRight } from "lucide-react"
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons"
import { Reveal } from "@/components/ui/Reveal"
import { Button } from "@/components/ui/Button"
import { profile } from "@/data/content"

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-soft blur-3xl" />

      <div className="relative mx-auto max-w-[820px] px-6 text-center">
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[13px] text-muted">Open to Software Engineering Opportunities</span>
          </span>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-8 font-display text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.02] tracking-[-0.03em] text-balance">
            Let&apos;s build something
            <br />
            worth remembering.
          </h2>
        </Reveal>

        <Reveal delay={0.16}>
          <p className="mx-auto mt-6 max-w-md text-[18px] leading-relaxed text-muted text-pretty">
            Open to Software Engineering opportunities to build scalable software and AI-powered solutions with real-world impact.
            Passionate about clean engineering, continuous learning, and contributing to products that make a difference.
          </p>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Button href={`mailto:${profile.email}`}>
              <Mail className="h-[18px] w-[18px]" strokeWidth={1.75} />
              {profile.email}
            </Button>
          </div>
        </Reveal>

        <Reveal delay={0.32}>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button variant="secondary" href={profile.socials.linkedin} external>
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
              <ArrowUpRight className="h-4 w-4 text-subtle" strokeWidth={1.75} />
            </Button>
            <Button variant="secondary" href={profile.socials.github} external>
              <GithubIcon className="h-4 w-4" />
              GitHub
              <ArrowUpRight className="h-4 w-4 text-subtle" strokeWidth={1.75} />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
