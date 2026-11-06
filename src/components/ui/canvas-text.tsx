"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Aceternity canvas-text: the word is filled with a base colour and crossed by
 * slowly waving coloured lines, drawn on a <canvas> clipped to the glyphs.
 *
 * Adapted:
 * - The real text stays in the DOM (readable by screen readers and search
 *   engines, and visible until the canvas has drawn); the canvas is decorative.
 * - Measures after web fonts load, so the canvas matches the heading font.
 * - Animates only while on screen; draws one still frame under reduced motion.
 * - No theme observer (the site has one light theme).
 */

interface CanvasTextProps {
  text: string;
  className?: string;
  /** Classes that set the fill colour, e.g. "bg-primary". Read once from the DOM. */
  backgroundClassName?: string;
  /** Line colours, any canvas colour string (rgba recommended). */
  colors?: string[];
  /** Seconds for one full wave. */
  animationDuration?: number;
  lineWidth?: number;
  lineGap?: number;
  curveIntensity?: number;
}

export function CanvasText({
  text,
  className,
  backgroundClassName = "bg-primary",
  colors = ["rgba(255, 255, 255, 0.5)"],
  animationDuration = 20,
  lineWidth = 1.5,
  lineGap = 4,
  curveIntensity = 60,
}: CanvasTextProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const bgRef = useRef<HTMLSpanElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const textEl = textRef.current;
    const bgEl = bgRef.current;
    if (!canvas || !textEl || !bgEl) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fill = getComputedStyle(bgEl).backgroundColor;
    let width = 0;
    let height = 0;
    let font = "";
    let baselineY = 0;
    let frame = 0;
    let visible = true;
    let cancelled = false;
    const start = performance.now();

    const measure = () => {
      const rect = textEl.getBoundingClientRect();
      const style = getComputedStyle(textEl);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.ceil(rect.width);
      height = Math.ceil(rect.height);
      font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = font;
      const metrics = ctx.measureText(text);
      baselineY = (height + metrics.actualBoundingBoxAscent - metrics.actualBoundingBoxDescent) / 2;
    };

    const draw = (now: number) => {
      if (!width || !height) return;
      const phase = (((now - start) / 1000) / animationDuration) * Math.PI * 2;

      ctx.clearRect(0, 0, width, height);
      // 1. The glyphs, in the fill colour.
      ctx.globalCompositeOperation = "source-over";
      ctx.font = font;
      ctx.textBaseline = "alphabetic";
      ctx.textAlign = "left";
      ctx.fillStyle = fill;
      ctx.fillText(text, 0, baselineY);
      // 2. Waving lines, kept inside the glyphs.
      ctx.globalCompositeOperation = "source-atop";
      ctx.lineWidth = lineWidth;
      const curve1 = Math.sin(phase) * curveIntensity;
      const curve2 = Math.sin(phase + 0.5) * curveIntensity * 0.6;
      const lines = Math.floor(height / lineGap) + 10;
      for (let i = 0; i < lines; i++) {
        const y = i * lineGap;
        ctx.strokeStyle = colors[i % colors.length];
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(width * 0.33, y + curve1, width * 0.66, y + curve2, width, y);
        ctx.stroke();
      }
    };

    const loop = (now: number) => {
      draw(now);
      if (visible && !reducedMotion) frame = requestAnimationFrame(loop);
    };

    const startLoop = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(loop);
    };

    const resize = new ResizeObserver(() => {
      measure();
      draw(performance.now());
    });
    const onScreen = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) startLoop();
      else cancelAnimationFrame(frame);
    });

    // Wait for the heading font, or the canvas would draw in the fallback face.
    document.fonts.ready.then(() => {
      if (cancelled) return;
      measure();
      draw(performance.now());
      setReady(true);
      resize.observe(textEl);
      onScreen.observe(canvas);
      startLoop();
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      resize.disconnect();
      onScreen.disconnect();
    };
  }, [text, colors, animationDuration, lineWidth, lineGap, curveIntensity]);

  return (
    <span className={cn("relative inline-block", className)}>
      <span ref={bgRef} aria-hidden="true" className={cn("pointer-events-none absolute size-0 opacity-0", backgroundClassName)} />
      {/* Real text: visible until the canvas takes over, then transparent but still selectable and indexable. */}
      <span ref={textRef} className={cn("inline-block", ready ? "text-transparent" : "text-primary")}>
        {text}
      </span>
      <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none absolute top-0 left-0" />
    </span>
  );
}
