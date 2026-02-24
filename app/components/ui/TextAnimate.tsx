"use client";

import { motion, Variants, HTMLMotionProps } from "motion/react";
import React from "react";

type AnimationType = "slideUp" | "fadeIn" | "wavyChar";
type SegmentType = "word" | "character" | "line";

interface TextAnimateProps {
  children: string;
  animation?: AnimationType;
  by?: SegmentType;
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  delay?: number;       // délai de départ global (en secondes)
  duration?: number;    // durée de chaque segment
  variants?: Variants;  // override complet si besoin
}

/* ── Variants prédéfinis ─────────────────────────────────── */
const VARIANTS: Record<AnimationType, Variants> = {
  /* Effet 1 – slide up par mot */
  slideUp: {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  },

  /* Effet 2 – fade in par ligne */
  fadeIn: {
    hidden: { opacity: 0, y: 8 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  },

  /* Effet 3 – wavy spring par caractère */
  wavyChar: {
    hidden: { opacity: 0, y: 30, rotate: 20, scale: 0.6 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      rotate: 0,
      scale: 1,
      transition: {
        delay: i * 0.04,
        duration: 0.4,
        y:      { type: "spring", damping: 12, stiffness: 200, mass: 0.8 },
        rotate: { type: "spring", damping: 8,  stiffness: 150 },
        scale:  { type: "spring", damping: 10, stiffness: 300 },
      },
    }),
  },
};

/* ── Segmentation du texte ───────────────────────────────── */
function splitText(text: string, by: SegmentType): string[] {
  if (by === "character") return text.split("");
  if (by === "line")      return text.split(/\n+/).filter(Boolean);
  // word — garde les espaces comme séparateurs visuels
  return text.split(/\s+/).filter(Boolean);
}

/* ── Composant principal ─────────────────────────────────── */
export function TextAnimate({
  children,
  animation = "slideUp",
  by = "word",
  as: Tag = "span",
  className,
  delay = 0,
  variants,
}: TextAnimateProps) {
  const resolvedVariants = variants ?? VARIANTS[animation];
  const segments = splitText(children, by);
  const isChar = by === "character";

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0 } },
  };

  return (
    <motion.span
      className={`inline ${className ?? ""}`}
      initial="hidden"
      animate="show"
      variants={container}
      style={{ display: "inline" }}
    >
      {segments.map((seg, i) => (
        <React.Fragment key={i}>
          <motion.span
            custom={i + delay / 0.08}
            variants={resolvedVariants}
            style={{
              display: isChar ? "inline-block" : "inline-block",
              whiteSpace: isChar ? "pre" : "normal",
            }}
          >
            {seg}
          </motion.span>
          {/* espace entre mots / caractères */}
          {!isChar && i < segments.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.span>
  );
}
