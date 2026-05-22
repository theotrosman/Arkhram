"use client";

import { useEffect, useRef } from "react";

export function GothicCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x - 3}px, ${posRef.current.y - 3}px)`;
      }
      // Ring follows with lag
      ringPosRef.current.x += (posRef.current.x - ringPosRef.current.x) * 0.12;
      ringPosRef.current.y += (posRef.current.y - ringPosRef.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringPosRef.current.x - 12}px, ${ringPosRef.current.y - 12}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafRef.current = requestAnimationFrame(animate);

    // Scale on hover
    const onEnter = () => {
      if (ringRef.current) {
        ringRef.current.style.transform += " scale(1.8)";
        ringRef.current.style.borderColor = "rgba(139,26,26,0.8)";
      }
    };
    const onLeave = () => {
      if (ringRef.current) {
        ringRef.current.style.borderColor = "rgba(139,26,26,0.4)";
      }
    };

    document.querySelectorAll("a, button, [role='button']").forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#8b1a1a",
          boxShadow: "0 0 8px rgba(139,26,26,0.8)",
          zIndex: 9999,
          top: 0,
          left: 0,
          willChange: "transform",
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none"
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          border: "1px solid rgba(139,26,26,0.4)",
          zIndex: 9998,
          top: 0,
          left: 0,
          willChange: "transform",
          transition: "border-color 0.2s ease",
        }}
      />
    </>
  );
}
