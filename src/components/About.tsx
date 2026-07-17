import { SectionLabel } from "@/components/ui/SectionLabel"
import { Reveal } from "@/components/ui/Reveal"
import { profile, education } from "@/data/content"

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <SectionLabel index="01">About</SectionLabel>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-x-16 gap-y-12 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Left column — image + facts */}
          <div>
            <Reveal>
              <div className="relative w-fit">
                <div className="absolute -inset-2 rounded-[24px] bg-secondary" />
                <img
                  src="/dhina.jpeg"
                  alt="Alex Rivera"
                  width={280}
                  height={340}
                  loading="lazy"
                  className="relative h-[340px] w-[280px] rounded-[18px] object-cover grayscale"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <dl className="mt-8 space-y-4">
                {[
                  ["Based in", profile.location],
                  ["Focus", "Full stack Development & AI "],
                  ["Currently", "Open to Software Engineering Opportunities"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between border-b border-border pb-3 max-md:grid max-md:grid-cols-[110px_minmax(0,1fr)] max-md:justify-normal">
                    <dt className="text-[13px] uppercase tracking-wider text-subtle max-md:shrink-0 max-md:whitespace-nowrap">{k}</dt>
                    <dd className="text-[15px] font-medium text-foreground max-md:min-w-0 max-md:text-left max-md:whitespace-normal max-md:break-words">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Right column — editorial copy */}
          <div className="lg:pt-2">
            <Reveal>
              <p className="font-display text-[clamp(1.75rem,3.2vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.02em] text-balance">
                I build products at the seam where design meets engineering —
                where a considered interface and a resilient system become the
                same thing.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-8 max-w-xl space-y-5 text-[16px] leading-relaxed text-muted">
                <p>
                  As a recent AI & Data Science graduate, I'm passionate about building scalable software that blends clean architecture, thoughtful design, and modern technologies. From full-stack web applications to AI-powered solutions, I enjoy creating products that solve real-world problems while continuously learning and refining my craft.
                </p>
                <p>
                  I believe the best software feels simple, reliable, and purposeful. That's why I focus on writing clean, maintainable code, designing intuitive user experiences, and building applications that deliver lasting value beyond their features.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="mt-12">
                <p className="text-[13px] uppercase tracking-[0.2em] text-subtle">
                  Education
                </p>
                <ol className="mt-6 space-y-0">
                  {education.map((item) => (
                    <li
                      key={item.year}
                      className="group flex items-center gap-6 border-t border-border py-4 transition-colors hover:bg-secondary/50"
                      style={{ paddingLeft: 4, paddingRight: 4 }}
                    >
                      <span className="font-mono text-sm tabular-nums text-accent">
                        {item.year}
                      </span>
                      <span className="h-1.5 w-1.5 rounded-full bg-border-strong transition-colors group-hover:bg-accent" />
                      <span className="text-[15px] text-foreground">{item.label}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
