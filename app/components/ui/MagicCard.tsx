"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface MagicCardProps {
  children: React.ReactNode;
  className?: string;
  gradientColor?: string;
  gradientOpacity?: number;
  gradientSize?: number;
}

export function MagicCard({
  children,
  className,
  gradientColor = "#D9D9D955",
  gradientOpacity = 0.8,
  gradientSize = 200,
}: MagicCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      cardRef.current.style.setProperty("--mouse-x", `${x}px`);
      cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    },
    []
  );

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    card.addEventListener("mousemove", handleMouseMove);
    return () => card.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      ref={cardRef}
      style={
        {
          "--gradient-color": gradientColor,
          "--gradient-opacity": gradientOpacity,
          "--gradient-size": `${gradientSize}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative overflow-hidden rounded-2xl",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]",
        "before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300",
        "before:bg-[radial-gradient(var(--gradient-size)_circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),var(--gradient-color),transparent_100%)]",
        className
      )}
    >
      {children}
    </div>
  );
}
