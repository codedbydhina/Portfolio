import { motion } from "framer-motion"
import {
  Layout,
  Server,
  Database,
  Cloud,
  Sparkles,
  Wrench,
  type LucideIcon,
} from "lucide-react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { Reveal } from "@/components/ui/Reveal"
import { skillGroups } from "@/data/content"

const icons: Record<string, LucideIcon> = {
  Frontend: Layout,
  Backend: Server,
  Database: Database,
  Cloud: Cloud,
  AI: Sparkles,
  Tools: Wrench,
}

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <SectionLabel index="03">Capabilities</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
            The technologies behind every project.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, gi) => {
            const Icon = icons[group.category]
            return (
              <Reveal key={group.category} delay={gi * 0.05}>
                <div className="group h-full rounded-[20px] border border-border bg-card p-6 transition-colors duration-500 hover:border-border-strong">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl border border-border bg-secondary/60 transition-colors duration-500 group-hover:bg-accent-soft">
                      <Icon
                        className="h-[18px] w-[18px] text-foreground transition-colors duration-500 group-hover:text-accent"
                        strokeWidth={1.6}
                      />
                    </span>
                    <h3 className="font-heading text-[17px] font-semibold tracking-tight">
                      {group.category}
                    </h3>
                  </div>

                  <ul className="mt-6 space-y-1">
                    {group.items.map((item) => (
                      <motion.li
                        key={item.name}
                        whileHover={{ x: 4 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-baseline justify-between gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-secondary/60"
                      >
                        <span className="text-[15px] font-medium text-foreground">
                          {item.name}
                        </span>
                        <span className="text-right text-[13px] text-subtle">
                          {item.description}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
