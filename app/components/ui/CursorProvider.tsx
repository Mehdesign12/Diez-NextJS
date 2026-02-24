"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

// Import dynamique pour éviter le SSR (accès à window/mouse)
const SmoothCursor = dynamic(
  () => import("./SmoothCursor").then((m) => ({ default: m.SmoothCursor })),
  { ssr: false }
)

export function CursorProvider() {
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    // "pointer: fine" = souris/trackpad | "pointer: coarse" = tactile/mobile
    const mq = window.matchMedia("(pointer: fine)")
    setIsPointer(mq.matches)
    const handler = (e: MediaQueryListEvent) => setIsPointer(e.matches)
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  if (!isPointer) return null

  return <SmoothCursor />
}
