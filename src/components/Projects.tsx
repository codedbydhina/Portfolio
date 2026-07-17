import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { SectionLabel } from "@/components/ui/SectionLabel"
import { Reveal } from "@/components/ui/Reveal"
import { projects, type Project } from "@/data/content"
import { cn } from "@/lib/utils"

function ProjectShowcase({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1

  return (
    <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-16">
      {/* Visual */}
      <div className={cn("lg:sticky lg:top-28", reversed && "lg:order-2")}>
        <Reveal>
          <motion.figure
            whileHover={{ y: -6 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[20px] border border-border bg-card shadow-[0_20px_60px_-20px_rgba(0,0,0,0.12)]"
          >
            <div className="flex items-center gap-1.5 border-b border-border bg-secondary/60 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="h-2.5 w-2.5 rounded-full bg-border-strong" />
              <span className="ml-3 font-mono text-[11px] text-subtle">
                {project.name.toLowerCase()}.app
              </span>
            </div>
            <div className="overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={`${project.name} product interface`}
                width={720}
                height={450}
                loading="lazy"
                className="aspect-[16/10] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
              />
            </div>
          </motion.figure>
        </Reveal>
      </div>

      {/* Narrative */}
      <div className={cn("flex flex-col", reversed && "lg:order-1")}>
        <Reveal>
          <div className="flex items-center gap-3">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: project.accent }}
            />
            <span className="font-mono text-xs text-subtle">{project.year}</span>
            <span className="text-xs text-subtle">·</span>
            <span className="text-xs text-muted">{project.role}</span>
          </div>

          <h3 className="mt-4 font-display text-4xl font-semibold tracking-[-0.03em] md:text-5xl">
            {project.name}
          </h3>

          <p className="mt-4 text-[18px] leading-relaxed text-foreground/80 text-pretty">
            {project.summary}
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-8 space-y-6">
            {[
              { label: "Problem", body: project.problem },
              { label: "Solution", body: project.solution },
            ].map((block) => (
              <div key={block.label}>
                <p className="text-[12px] font-medium uppercase tracking-[0.18em] text-subtle">
                  {block.label}
                </p>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.16}>
          <div className="mt-8 grid grid-cols-3 gap-4 border-y border-border py-6">
            {project.results.map((r) => (
              <div key={r}>
                <p className="text-[13px] font-medium leading-snug text-foreground">
                  {r}
                </p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.24}>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-[13px] text-muted transition-colors hover:border-border-strong hover:text-foreground"
              >
                {t}
              </span>
            ))}
          </div>
          <a
            href={project.githubUrl || "#contact"}
            target={project.githubUrl ? "_blank" : undefined}
            rel={project.githubUrl ? "noreferrer" : undefined}
            className="group mt-8 inline-flex items-center gap-1.5 text-[15px] font-medium text-foreground"
          >
            View case study
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.75}
            />
          </a>
        </Reveal>
      </div>
    </div>
  )
}

export function Projects() {
  return (
    <section id="projects" className="relative bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-[1180px] px-6">
        <Reveal>
          <SectionLabel index="02">Selected Work</SectionLabel>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 className="mt-6 max-w-2xl font-display text-[clamp(2rem,4vw,3rem)] font-semibold leading-[1.05] tracking-[-0.03em] text-balance">
            A few products I&apos;ve shaped end to end.
          </h2>
        </Reveal>

        <div className="mt-20 space-y-28 md:space-y-40">
          {projects.map((p, i) => (
            <ProjectShowcase key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
