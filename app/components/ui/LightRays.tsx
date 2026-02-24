"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface LightRaysProps {
  className?: string;
  rayCount?: number;
  rayColor?: string;
  rayOpacityMax?: number;
}

export function LightRays({
  className,
  rayCount = 12,
  rayColor = "#FF4D29",
  rayOpacityMax = 0.13,
}: LightRaysProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const timeRef   = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ─── Resize ─── */
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    /* ─── Rayons : données fixes (position, largeur, vitesse) ─── */
    const rays = Array.from({ length: rayCount }, (_, i) => ({
      x:     (i / (rayCount - 1)) * 1.2 - 0.1,
      width: 0.03 + Math.random() * 0.06,
      speed: 0.18 + Math.random() * 0.28,          // smooth & slow
      phase: Math.random() * Math.PI * 2,
      drift: 0.06 + Math.random() * 0.09,          // mouvement doux
    }));

    /* ─── Draw loop ─── */
    const draw = (ts: number) => {
      const dt = (ts - timeRef.current) / 1000;
      timeRef.current = ts;

      const w = canvas.width;
      const h = canvas.height;

      ctx.clearRect(0, 0, w, h);

      rays.forEach((ray) => {
        // oscillation latérale douce
        const cx = (ray.x + Math.sin(ts * 0.0007 * ray.speed + ray.phase) * ray.drift) * w;
        const halfW = ray.width * w;

        const grad = ctx.createLinearGradient(cx, 0, cx, h);

        // Parse hex → rgb
        const hex = rayColor.replace("#", "");
        const r   = parseInt(hex.slice(0, 2), 16);
        const g   = parseInt(hex.slice(2, 4), 16);
        const b   = parseInt(hex.slice(4, 6), 16);

        const opacity = rayOpacityMax * (0.55 + 0.45 * Math.sin(ts * 0.0007 * ray.speed + ray.phase));

        grad.addColorStop(0,    `rgba(${r},${g},${b},${opacity})`);
        grad.addColorStop(0.4,  `rgba(${r},${g},${b},${opacity * 0.5})`);
        grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);

        ctx.save();
        // forme en triangle partant du haut-centre
        ctx.beginPath();
        ctx.moveTo(cx, 0);
        ctx.lineTo(cx - halfW * 0.5, 0);
        ctx.lineTo(cx - halfW * 6,   h);
        ctx.lineTo(cx + halfW * 6,   h);
        ctx.lineTo(cx + halfW * 0.5, 0);
        ctx.closePath();

        ctx.fillStyle = grad;
        ctx.globalCompositeOperation = "screen";
        ctx.fill();
        ctx.restore();
      });

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [rayCount, rayColor, rayOpacityMax]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full",
        className
      )}
    />
  );
}
