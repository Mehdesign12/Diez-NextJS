"use client";

import { motion, useInView, Variants } from "motion/react";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  inView?: boolean;       // si true, déclenche seulement quand visible
  inViewMargin?: string;  // marge pour l'IntersectionObserver
}

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.5,
  yOffset = 10,
  blur = "8px",
  inView: triggerOnView = false,
  inViewMargin = "-50px",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, {
    once: true,
  });

  const shouldAnimate = triggerOnView ? isInView : true;

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      filter: `blur(${blur})`,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={shouldAnimate ? "visible" : "hidden"}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
