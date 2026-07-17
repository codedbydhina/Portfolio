import { SectionLabel } from "@/components/ui/SectionLabel"
import { Reveal } from "@/components/ui/Reveal"
import { experiences } from "@/data/content"
import { cn } from "@/lib/utils"

export function Experience() {
  return (
    <section id="experience" className="relative bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <SectionLabel index="04">Experience</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
            "A journey built on building.
          </h2>
        </Reveal>

        <div className="relative mt-16">
          {/* center line (desktop) */}
          <span
            className="absolute left-4 top-0 h-full w-px bg-border md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          />

          <ol className="space-y-4 md:space-y-2">
            {experiences.map((exp, i) => {
              const left = i % 2 === 0
              return (
                <li key={exp.company} className="relative md:grid md:grid-cols-2 md:gap-12">
                  {/* node */}
                  <span
                    className="absolute left-4 top-8 z-10 grid h-3 w-3 -translate-x-1/2 place-items-center rounded-full border-2 border-background bg-foreground md:left-1/2"
                    aria-hidden="true"
                  />

                  <div
                    className={cn(
                      "pl-12 md:pl-0",
                      left ? "md:col-start-1 md:pr-4 md:text-right" : "md:col-start-2 md:pl-4",
                    )}
                  >
                    <Reveal>
                      <div
                        className={cn(
                          "rounded-[18px] border border-border bg-card p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_-16px_rgba(0,0,0,0.14)]",
                        )}
                      >
                        <div className="w-full min-w-0">
                          <div
                            className={cn(
                              "flex flex-col items-start gap-3 md:flex-row md:flex-wrap md:justify-between",
                              left && "md:flex-row-reverse md:text-right",
                            )}
                          >
                            <div className="min-w-0 flex-1">
                              <h3 className="font-heading text-[18px] font-semibold tracking-tight">
                                {exp.company}
                              </h3>
                              <p className="mt-1 text-[14px] font-medium text-accent">
                                {exp.role}
                              </p>
                            </div>
                            <span className="shrink-0 whitespace-nowrap font-mono text-[12px] tabular-nums text-subtle">
                              {exp.period}
                            </span>
                          </div>
                          <ul className="mt-3 w-full min-w-0 list-disc space-y-2 pl-5 text-left text-[14px] leading-relaxed text-muted whitespace-normal [overflow-wrap:break-word]">
                            {exp.description.map((item, index) => (
                              <li key={index} className="w-full min-w-0 break-words whitespace-normal [overflow-wrap:break-word]">{item}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Reveal>
                  </div>
                </li>
              )
            })}
          </ol>
        </div>
      </div>
    </section>
  )
}
