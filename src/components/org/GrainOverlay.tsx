"use client";
import { useEffect, useRef } from "react";

export function GrainOverlay() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const W = (canvas.width = window.innerWidth);
    const H = (canvas.height = window.innerHeight);

    const render = () => {
      const imageData = ctx.createImageData(W, H);
      const buf = imageData.data;
      for (let i = 0; i < buf.length; i += 4) {
        const v = (Math.random() * 40) | 0;
        buf[i] = buf[i + 1] = buf[i + 2] = v;
        buf[i + 3] = 18;
      }
      ctx.putImageData(imageData, 0, 0);
      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <>
      {/* Film grain */}
      <canvas
        ref={canvasRef}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9998,
          mixBlendMode: "overlay",
          opacity: 0.35,
        }}
      />
      {/* Scanlines */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9997,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 2px, rgba(0,0,0,0.07) 3px)",
        }}
      />
      {/* Vignette */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 9996,
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.75) 100%)",
        }}
      />
    </>
  );
}
