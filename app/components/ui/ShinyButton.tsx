"use client"

import React from "react"
import { motion, type MotionProps } from "motion/react"
import { cn } from "@/lib/utils"

const animationProps: MotionProps = {
  initial: { "--x": "100%", scale: 0.8 } as never,
  animate: { "--x": "-100%", scale: 1 } as never,
  whileTap: { scale: 0.95 },
  transition: {
    repeat: Infinity,
    repeatType: "loop",
    repeatDelay: 1.5,
    type: "spring",
    stiffness: 20,
    damping: 15,
    mass: 2,
    scale: {
      type: "spring",
      stiffness: 200,
      damping: 5,
      mass: 0.5,
    },
  },
}

interface ShinyButtonProps
  extends Omit<React.HTMLAttributes<HTMLElement>, keyof MotionProps>,
    MotionProps {
  children: React.ReactNode
  className?: string
}

export const ShinyButton = React.forwardRef<HTMLButtonElement, ShinyButtonProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        className={cn(
          "relative cursor-pointer rounded-full border border-[#FF4D29] bg-transparent px-5 py-2 font-bold backdrop-blur-xl transition-all duration-300 hover:bg-[#FF4D29]/5 hover:shadow-[0_0_16px_rgba(255,77,41,0.25)]",
          className
        )}
        style={{ "--primary": "255 77 41" } as React.CSSProperties}
        {...animationProps}
        {...props}
      >
        {/* Texte orange avec effet shimmer */}
        <span
          className="relative block size-full text-sm font-bold tracking-wide text-[#FF4D29]"
          style={{
            maskImage:
              "linear-gradient(-75deg, rgb(255,77,41) calc(var(--x) + 20%), transparent calc(var(--x) + 30%), rgb(255,77,41) calc(var(--x) + 100%))",
          }}
        >
          {children}
        </span>

        {/* Bordure shiny orange */}
        <span
          style={{
            mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            WebkitMask:
              "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box exclude, linear-gradient(rgb(0,0,0), rgb(0,0,0))",
            backgroundImage:
              "linear-gradient(-75deg, rgba(255,77,41,0.1) calc(var(--x) + 20%), rgba(255,77,41,0.6) calc(var(--x) + 25%), rgba(255,77,41,0.1) calc(var(--x) + 100%))",
          }}
          className="absolute inset-0 z-10 block rounded-[inherit] p-px"
        />
      </motion.button>
    )
  }
)

ShinyButton.displayName = "ShinyButton"
