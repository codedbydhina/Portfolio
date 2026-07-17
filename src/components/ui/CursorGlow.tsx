import { useEffect, useRef, useState } from "react"

const INTERACTIVE_SELECTOR = "a, button, [role='button'], nav, .group"

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)
  const trailRef = useRef<HTMLDivElement>(null)
  const particleRefs = useRef<(HTMLSpanElement | null)[]>([])
  const [mode, setMode] = useState<"hidden" | "animated" | "static">("hidden")

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)")
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const supportsGlow = () => finePointer.matches

    const updateMode = () => {
      setMode(supportsGlow() ? (reducedMotion.matches ? "static" : "animated") : "hidden")
    }

    updateMode()
    finePointer.addEventListener("change", updateMode)
    reducedMotion.addEventListener("change", updateMode)

    return () => {
      finePointer.removeEventListener("change", updateMode)
      reducedMotion.removeEventListener("change", updateMode)
    }
  }, [])

  useEffect(() => {
    const glow = glowRef.current
    const trail = trailRef.current
    if (!glow || !trail || mode !== "animated") return

    const getSize = () => (window.innerWidth >= 1024 ? 330 : 240)
    const lag = 150
    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let currentX = targetX
    let currentY = targetY
    let targetScale = 1
    let currentScale = 1
    let intensity = 1
    let trailX = currentX
    let trailY = currentY
    let pointerX = targetX
    let pointerY = targetY
    let directionX = 0
    let directionY = 0
    let motionEnergy = 0
    let frame = 0
    let previousTime = performance.now()

    const setSectionIntensity = (target: EventTarget | null) => {
      const element = target instanceof Element ? target : null
      const section = element?.closest("section")

      intensity = section?.id === "top" ? 1.1 : element?.closest("footer") ? 0.6 : 1
    }

    const onPointerMove = (event: PointerEvent) => {
      // Keep a small amount of depth relative to the viewport rather than pinning to the cursor.
      targetX = window.innerWidth / 2 + (event.clientX - window.innerWidth / 2) * 0.95
      targetY = window.innerHeight / 2 + (event.clientY - window.innerHeight / 2) * 0.95
      const deltaX = event.clientX - pointerX
      const deltaY = event.clientY - pointerY
      const distance = Math.hypot(deltaX, deltaY)

      if (distance > 0) {
        directionX = deltaX / distance
        directionY = deltaY / distance
        motionEnergy = Math.min(1, distance / 20)
      }

      pointerX = event.clientX
      pointerY = event.clientY
      setSectionIntensity(event.target)
    }

    const onPointerOver = (event: PointerEvent) => {
      targetScale = (event.target as Element | null)?.closest(INTERACTIVE_SELECTOR) ? 1.1 : 1
      setSectionIntensity(event.target)
    }

    const onPointerOut = (event: PointerEvent) => {
      const from = event.target as Element | null
      const to = event.relatedTarget as Element | null
      if (from?.closest(INTERACTIVE_SELECTOR) && !to?.closest(INTERACTIVE_SELECTOR)) targetScale = 1
    }

    const render = (time: number) => {
      const delta = Math.min(time - previousTime, 64)
      previousTime = time
      const easing = 1 - Math.exp(-delta / lag)

      currentX += (targetX - currentX) * easing
      currentY += (targetY - currentY) * easing
      currentScale += (targetScale - currentScale) * easing
      trailX += (targetX - trailX) * (easing * 0.55)
      trailY += (targetY - trailY) * (easing * 0.55)
      motionEnergy *= Math.exp(-delta / 150)

      const size = getSize()
      glow.style.transform = `translate3d(${currentX - size / 2}px, ${currentY - size / 2}px, 0) scale(${currentScale})`
      glow.style.opacity = String(
        Math.min(0.92 * intensity * (targetScale > 1 ? 1.15 : 1), 1),
      )

      const trailSize = size * 0.62
      trail.style.transform = `translate3d(${trailX - trailSize / 2 - directionX * 16}px, ${trailY - trailSize / 2 - directionY * 16}px, 0)`
      trail.style.opacity = String(motionEnergy * intensity * 0.55)

      particleRefs.current.forEach((particle, index) => {
        if (!particle) return

        const distance = 24 + index * 13
        const offsetX = -directionX * distance + -directionY * (index % 2 === 0 ? 10 : -10)
        const offsetY = -directionY * distance + directionX * (index % 2 === 0 ? 10 : -10)
        const shimmer = Math.sin(time / 150 + index) * 3

        particle.style.transform = `translate3d(${currentX + offsetX + shimmer}px, ${currentY + offsetY - shimmer}px, 0)`
        particle.style.opacity = String(motionEnergy * intensity * (0.7 - index * 0.08))
      })
      frame = requestAnimationFrame(render)
    }

    window.addEventListener("pointermove", onPointerMove, { passive: true })
    document.addEventListener("pointerover", onPointerOver, { passive: true })
    document.addEventListener("pointerout", onPointerOut, { passive: true })
    frame = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("pointerover", onPointerOver)
      document.removeEventListener("pointerout", onPointerOut)
    }
  }, [mode])

  if (mode === "hidden") return null

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-0 h-[330px] w-[330px] rounded-full opacity-[0.92] blur-[160px] will-change-transform motion-reduce:left-1/2 motion-reduce:top-1/2 motion-reduce:-translate-x-1/2 motion-reduce:-translate-y-1/2 motion-reduce:opacity-70 max-md:hidden md:h-[240px] md:w-[240px] lg:h-[330px] lg:w-[330px]"
        style={{
          background:
            "radial-gradient(circle, rgba(236, 72, 153, 0.22) 0%, rgba(244, 114, 182, 0.15) 38%, rgba(244, 114, 182, 0.06) 62%, transparent 76%)",
        }}
      />
      {mode === "animated" && (
        <>
          <div
            ref={trailRef}
            aria-hidden="true"
            className="pointer-events-none fixed left-0 top-0 z-0 h-[205px] w-[205px] rounded-full opacity-0 blur-[100px] will-change-transform md:h-[150px] md:w-[150px] lg:h-[205px] lg:w-[205px]"
            style={{
              background:
                "radial-gradient(circle, rgba(244, 114, 182, 0.22), rgba(244, 114, 182, 0.08) 48%, transparent 74%)",
            }}
          />
          {Array.from({ length: 4 }, (_, index) => (
            <span
              key={index}
              ref={(element) => {
                particleRefs.current[index] = element
              }}
              aria-hidden="true"
              className="pointer-events-none fixed left-0 top-0 z-0 h-1.5 w-1.5 rounded-full bg-pink-300 opacity-0 blur-[1px] will-change-transform"
            />
          ))}
        </>
      )}
    </>
  )
}
