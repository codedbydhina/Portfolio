import { useEffect } from "react"

export function ResumePage() {
  useEffect(() => {
    document.title = "Dhinakaran's CV"
  }, [])

  return (
    <iframe
      src="/Dhinakarann.pdf"
      title="Dhinakaran's CV"
      className="h-screen w-full border-0"
    />
  )
}
