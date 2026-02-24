"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children: React.ReactNode;
}

export const ShimmerButton = React.forwardRef<HTMLButtonElement, ShimmerButtonProps>(
  (
    {
      shimmerColor = "rgba(255,255,255,0.18)",
      shimmerSize = "0.1em",
      shimmerDuration = "1.6s",
      borderRadius = "9999px",
      background = "#FF4D29",
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        style={
          {
            "--shimmer-color": shimmerColor,
            "--shimmer-size": shimmerSize,
            "--shimmer-duration": shimmerDuration,
            "--border-radius": borderRadius,
            "--background": background,
            borderRadius,
          } as React.CSSProperties
        }
        className={cn(
          // base
          "group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap",
          // sizing — légèrement plus compact que before
          "px-5 py-3 md:px-7 md:py-3.5",
          // couleurs
          "bg-[var(--background)] text-white",
          // ombre orange
          "shadow-lg shadow-[#FF4D29]/30 hover:shadow-[#FF4D29]/50",
          // transition
          "transition-all duration-300 hover:-translate-y-0.5 active:scale-95",
          className
        )}
      >
        {/* Shimmer layer */}
        <div
          className={cn(
            "absolute inset-0 overflow-hidden",
          )}
          style={{ borderRadius }}
        >
          <div
            className="absolute inset-0 -translate-x-full"
            style={{
              background: `linear-gradient(105deg, transparent 40%, var(--shimmer-color) 50%, transparent 60%)`,
              animation: `shimmer-slide var(--shimmer-duration) linear infinite`,
              width: "200%",
            }}
          />
        </div>

        {/* Contenu */}
        <span className="relative z-10 flex items-center gap-2 text-sm font-bold md:text-base">
          {children}
        </span>

        <style>{`
          @keyframes shimmer-slide {
            0%   { transform: translateX(-100%); }
            100% { transform: translateX(100%);  }
          }
        `}</style>
      </button>
    );
  }
);

ShimmerButton.displayName = "ShimmerButton";
