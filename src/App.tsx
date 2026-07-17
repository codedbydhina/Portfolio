import { Navigation } from "@/components/Navigation"
import { Hero } from "@/components/Hero"
import { About } from "@/components/About"
import { Projects } from "@/components/Projects"
import { Skills } from "@/components/Skills"
import { Experience } from "@/components/Experience"
import { Contact } from "@/components/Contact"
import { Footer } from "@/components/Footer"
import { CursorGlow } from "@/components/ui/CursorGlow"

export default function App() {
  return (
    <div className="relative isolate min-h-screen bg-background text-foreground antialiased">
      <CursorGlow />
      <div className="relative z-10">
        <Navigation />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
