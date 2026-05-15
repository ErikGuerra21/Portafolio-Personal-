"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function MenuBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("es-MX", {
          weekday: "short",
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-7 select-none"
      style={{
        background: "var(--menubar-bg)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "1px solid var(--surface-border)",
        fontSize: "13px",
        fontWeight: 500,
      }}
    >
      {/* Left */}
      <div
        className="flex items-center gap-5"
        style={{ color: "var(--text-primary)" }}
      >
        {/* Apple mark */}
        <span className="text-sm leading-none" style={{ fontWeight: 700 }}>

        </span>
        <span className="font-semibold">Portfolio</span>
        <nav className="hidden sm:flex items-center gap-4">
          {[
            ["Inicio", "#hero"],
            ["Proyectos", "#projects"],
            ["Habilidades", "#skills"],
            ["Contacto", "#contact"],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="transition-opacity hover:opacity-60"
              style={{ color: "var(--text-primary)", fontWeight: 400 }}
            >
              {label}
            </a>
          ))}
        </nav>
      </div>

      {/* Right */}
      <div
        className="flex items-center gap-3"
        style={{ color: "var(--text-primary)" }}
      >
        <span style={{ color: "var(--text-secondary)", fontWeight: 400 }}>
          {time}
        </span>
      </div>
    </motion.header>
  );
}
