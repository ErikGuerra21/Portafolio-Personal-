"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.left = `${e.clientX}px`;
      ref.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed z-0 -translate-x-1/2 -translate-y-1/2"
      style={{
        width: 500,
        height: 500,
        background:
          "radial-gradient(circle, rgba(245, 197, 24, 0.04) 0%, transparent 70%)",
        borderRadius: "50%",
        transition: "left 0.1s linear, top 0.1s linear",
      }}
    />
  );
}
