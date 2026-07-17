import { useEffect, useState } from "react"

export function useScrollDirection() {
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      // Ignore tiny jitters; hide going down, reveal going up
      if (Math.abs(y - lastY) > 6) {
        setHidden(y > lastY && y > 120)
        lastY = y
      }
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update)
        ticking = true
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return { hidden, scrolled }
}
