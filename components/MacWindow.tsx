"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MacWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function MacWindow({
  title,
  children,
  className = "",
  delay = 0,
}: MacWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={`rounded-xl overflow-hidden border ${className}`}
      style={{
        background: "var(--surface)",
        borderColor: "var(--surface-border)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        boxShadow:
          "0 24px 64px rgba(0, 0, 0, 0.14), 0 1px 0 rgba(255, 255, 255, 0.08) inset",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b select-none"
        style={{ borderColor: "var(--surface-border)" }}
      >
        <div className="flex gap-1.5">
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "var(--mac-red)" }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "var(--mac-yellow)" }}
          />
          <div
            className="w-3 h-3 rounded-full"
            style={{ background: "var(--mac-green)" }}
          />
        </div>
        {title && (
          <span
            className="text-xs font-medium mx-auto"
            style={{ color: "var(--text-secondary)" }}
          >
            {title}
          </span>
        )}
      </div>

      <div className="p-6">{children}</div>
    </motion.div>
  );
}
