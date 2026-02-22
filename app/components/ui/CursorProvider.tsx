"use client"

import dynamic from "next/dynamic"

// Import dynamique pour éviter le SSR (accès à window/mouse)
const SmoothCursor = dynamic(
  () => import("./SmoothCursor").then((m) => ({ default: m.SmoothCursor })),
  { ssr: false }
)

export function CursorProvider() {
  return <SmoothCursor />
}
