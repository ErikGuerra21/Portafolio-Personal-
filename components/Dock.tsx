"use client";

import { motion } from "framer-motion";

const DOCK_ITEMS = [
  { id: "home", label: "Inicio", href: "#hero", icon: "🏠" },
  { id: "projects", label: "Proyectos", href: "#projects", icon: "📁" },
  { id: "skills", label: "Habilidades", href: "#skills", icon: "⚡" },
  { id: "contact", label: "Contacto", href: "#contact", icon: "✉️" },
  {
    id: "github",
    label: "GitHub",
    href: "https://github.com/Erik21guerra",
    icon: "🐙",
    external: true,
  },
];

function DockItem({
  label,
  href,
  icon,
  external,
}: {
  label: string;
  href: string;
  icon: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group relative flex flex-col items-center gap-1"
    >
      <motion.div
        whileHover={{ scale: 1.35, y: -10 }}
        whileTap={{ scale: 0.92 }}
        transition={{ type: "spring", stiffness: 380, damping: 16 }}
        className="w-12 h-12 flex items-center justify-center rounded-[14px] text-2xl cursor-pointer"
        style={{
          background: "var(--surface)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          boxShadow:
            "0 4px 20px rgba(0,0,0,0.14), 0 1px 0 rgba(255,255,255,0.12) inset",
          border: "1px solid var(--surface-border)",
        }}
      >
        {icon}
      </motion.div>

      {/* Tooltip */}
      <span
        className="absolute -top-10 px-2.5 py-1 rounded-lg text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
        style={{
          background: "var(--surface)",
          backdropFilter: "blur(20px)",
          border: "1px solid var(--surface-border)",
          color: "var(--text-primary)",
          boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
        }}
      >
        {label}
      </span>

      {/* Dot indicator */}
      <div
        className="w-1 h-1 rounded-full"
        style={{ background: "var(--text-secondary)", opacity: 0.35 }}
      />
    </a>
  );
}

export default function Dock() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
        className="flex items-end gap-2 px-3 py-2.5 rounded-2xl"
        style={{
          background: "var(--dock-bg)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid var(--surface-border)",
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.18), 0 1px 0 rgba(255,255,255,0.08) inset",
        }}
      >
        {DOCK_ITEMS.map((item) => (
          <DockItem key={item.id} {...item} />
        ))}
      </motion.div>
    </div>
  );
}
