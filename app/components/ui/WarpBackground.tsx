"use client"

import React, { HTMLAttributes, useCallback, useMemo } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

interface WarpBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  perspective?: number
  beamsPerSide?: number
  beamSize?: number
  beamDelayMax?: number
  beamDelayMin?: number
  beamDuration?: number
  gridColor?: string
}

const Beam = ({
  width,
  x,
  delay,
  duration,
  color,
}: {
  width: string | number
  x: string | number
  delay: number
  duration: number
  color: string
}) => {
  const ar = Math.floor(Math.random() * 6) + 2

  return (
    <motion.div
      style={
        {
          "--x": `${x}`,
          "--width": `${width}`,
          "--aspect-ratio": `${ar}`,
          "--background": `linear-gradient(${color}, transparent)`,
        } as React.CSSProperties
      }
      className="absolute top-0 left-[var(--x)] [aspect-ratio:1/var(--aspect-ratio)] [width:var(--width)] [background:var(--background)] opacity-60"
      initial={{ y: "100cqmax", x: "-50%" }}
      animate={{ y: "-100%", x: "-50%" }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  )
}

// Palette sobre : orange atténué + blanc très discret
const BEAM_COLORS = [
  "rgba(255, 77, 41, 0.7)",
  "rgba(255, 120, 60, 0.5)",
  "rgba(255, 180, 100, 0.3)",
  "rgba(255, 255, 255, 0.15)",
]

export const WarpBackground: React.FC<WarpBackgroundProps> = ({
  children,
  perspective = 120,
  className,
  beamsPerSide = 2,
  beamSize = 8,
  beamDelayMax = 4,
  beamDelayMin = 0,
  beamDuration = 4,
  gridColor = "rgba(255, 77, 41, 0.08)",
  ...props
}) => {
  const generateBeams = useCallback(() => {
    const beams = []
    const cellsPerSide = Math.floor(100 / beamSize)
    const step = cellsPerSide / beamsPerSide

    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step)
      const delay = Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin
      const color = BEAM_COLORS[Math.floor(Math.random() * BEAM_COLORS.length)]
      beams.push({ x, delay, color })
    }
    return beams
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin])

  const topBeams    = useMemo(() => generateBeams(), [generateBeams])
  const rightBeams  = useMemo(() => generateBeams(), [generateBeams])
  const bottomBeams = useMemo(() => generateBeams(), [generateBeams])
  const leftBeams   = useMemo(() => generateBeams(), [generateBeams])

  const gridBg = `
    linear-gradient(${gridColor} 0 1px, transparent 1px var(--beam-size)) 50% -0.5px / var(--beam-size) var(--beam-size),
    linear-gradient(90deg, ${gridColor} 0 1px, transparent 1px var(--beam-size)) 50% 50% / var(--beam-size) var(--beam-size)
  `

  return (
    <div className={cn("relative", className)} {...props}>
      {/* Warp effect layer */}
      <div
        style={
          {
            "--perspective": `${perspective}px`,
            "--grid-color": gridColor,
            "--beam-size": `${beamSize}%`,
          } as React.CSSProperties
        }
        className="[container-type:size] pointer-events-none absolute top-0 left-0 size-full overflow-hidden rounded-2xl [clipPath:inset(0_round_1rem)] [perspective:var(--perspective)] [transform-style:preserve-3d]"
      >
        {/* top */}
        <div
          style={{ background: gridBg }}
          className="[container-type:inline-size] absolute z-20 [height:100cqmax] [width:100cqi] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [transform-style:preserve-3d]"
        >
          {topBeams.map((b, i) => (
            <Beam key={`top-${i}`} width={`${beamSize}%`} x={`${b.x * beamSize}%`} delay={b.delay} duration={beamDuration} color={b.color} />
          ))}
        </div>
        {/* bottom */}
        <div
          style={{ background: gridBg }}
          className="[container-type:inline-size] absolute top-full [height:100cqmax] [width:100cqi] [transform-origin:50%_0%] [transform:rotateX(-90deg)] [transform-style:preserve-3d]"
        >
          {bottomBeams.map((b, i) => (
            <Beam key={`bottom-${i}`} width={`${beamSize}%`} x={`${b.x * beamSize}%`} delay={b.delay} duration={beamDuration} color={b.color} />
          ))}
        </div>
        {/* left */}
        <div
          style={{ background: gridBg }}
          className="[container-type:inline-size] absolute top-0 left-0 [height:100cqmax] [width:100cqh] [transform-origin:0%_0%] [transform:rotate(90deg)_rotateX(-90deg)] [transform-style:preserve-3d]"
        >
          {leftBeams.map((b, i) => (
            <Beam key={`left-${i}`} width={`${beamSize}%`} x={`${b.x * beamSize}%`} delay={b.delay} duration={beamDuration} color={b.color} />
          ))}
        </div>
        {/* right */}
        <div
          style={{ background: gridBg }}
          className="[container-type:inline-size] absolute top-0 right-0 [height:100cqmax] [width:100cqh] [transform-origin:100%_0%] [transform:rotate(-90deg)_rotateX(-90deg)] [transform-style:preserve-3d]"
        >
          {rightBeams.map((b, i) => (
            <Beam key={`right-${i}`} width={`${beamSize}%`} x={`${b.x * beamSize}%`} delay={b.delay} duration={beamDuration} color={b.color} />
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
