"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { useLang } from "@/lib/lang";
import { useTheme } from "@/lib/theme";
import type { Lang } from "@/lib/translations";

export default function Nav() {
  const { lang, setLang, tr } = useLang();
  const { theme, toggle: toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive]     = useState("hero");
  const { scrollYProgress }     = useScroll();
  const barWidth                = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const LINKS = [
    { label: tr.nav.home,     id: "hero"     },
    { label: tr.nav.about,    id: "about"    },
    { label: tr.nav.projects, id: "projects" },
    { label: tr.nav.stack,    id: "skills"   },
    { label: tr.nav.contact,  id: "contact"  },
  ];

  const SECTIONS = LINKS.map((l) => l.id);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setScrolled(v > 0.025));
    return unsub;
  }, [scrollYProgress]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    smoothScrollTo(id);
  };

  const activeLabel = LINKS.find((l) => l.id === active)?.label ?? "";

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 z-60 h-0.5"
        style={{ width: barWidth, background: "var(--yellow)" }}
      />

      {/* Nav */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-2 rounded-2xl"
        style={{
          background: scrolled ? "var(--nav-scrolled)" : "transparent",
          border: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.5)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        {/* Brand */}
        <a
          href="#hero"
          onClick={(e) => handleClick(e, "hero")}
          className="px-3 py-1.5 text-sm font-black rounded-xl shrink-0"
          style={{ color: "var(--text)" }}
        >
          EG<span style={{ color: "var(--yellow)" }}>.</span>
        </a>

        <div className="w-px h-4 mx-0.5 shrink-0" style={{ background: "var(--border)" }} />

        {/* Section links */}
        {LINKS.map(({ label, id }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => handleClick(e, id)}
              aria-current={isActive ? "true" : undefined}
              className="relative px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors duration-200 select-none"
              style={{ color: isActive ? "#000" : "var(--text-2)" }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text)";
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-2)";
              }}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "var(--yellow)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </a>
          );
        })}

        {/* Current section label */}
        <div className="hidden sm:flex items-center ml-1 mr-0.5">
          <div className="w-px h-4" style={{ background: "var(--border)" }} />
          <div className="ml-2 w-20 overflow-hidden h-5 flex items-center">
            <AnimatePresence mode="wait">
              <motion.span
                key={active + lang}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="text-xs font-mono whitespace-nowrap"
                style={{ color: "var(--text-3)" }}
              >
                / {activeLabel.toLowerCase()}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        {/* Lang toggle switch */}
        <div className="w-px h-4 shrink-0" style={{ background: "var(--border)" }} />
        <div
          className="flex items-center rounded-xl p-0.5 shrink-0"
          style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}
        >
          {(["es", "en"] as Lang[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className="relative px-2.5 py-1 text-xs font-bold rounded-lg font-mono uppercase"
              style={{ color: lang === l ? "#000" : "var(--text-3)" }}
              aria-label={`Switch to ${l.toUpperCase()}`}
            >
              {lang === l && (
                <motion.span
                  layoutId="lang-pill"
                  className="absolute inset-0 rounded-lg"
                  style={{ background: "var(--yellow)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative z-10">{l}</span>
            </button>
          ))}
        </div>

        {/* Theme toggle switch */}
        <button
          onClick={toggleTheme}
          aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          className="relative shrink-0 rounded-full transition-colors duration-300"
          style={{
            width: 44,
            height: 24,
            background: theme === "light" ? "var(--yellow)" : "var(--surface2)",
            border: `1px solid ${theme === "light" ? "var(--yellow)" : "var(--border)"}`,
          }}
        >
          <motion.span
            animate={{ left: theme === "light" ? 22 : 2 }}
            transition={{ type: "spring", stiffness: 500, damping: 38 }}
            className="absolute top-[2px] flex items-center justify-center rounded-full"
            style={{
              width: 19,
              height: 19,
              background: "#fff",
              boxShadow: "0 1px 4px rgba(0,0,0,0.35)",
            }}
          >
            {theme === "dark" ? (
              <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M8.5 5.5A4 4 0 0 1 4 1a4 4 0 1 0 4.5 4.5Z" stroke="#111" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg aria-hidden="true" width="10" height="10" viewBox="0 0 10 10" fill="none">
                <circle cx="5" cy="5" r="1.8" stroke="#111" strokeWidth="1.1"/>
                <path d="M5 1v.8M5 8.2V9M1 5h.8M8.2 5H9M2.17 2.17l.56.56M7.27 7.27l.56.56M7.27 2.73l.56-.56M2.17 7.83l.56-.56" stroke="#111" strokeWidth="1.1" strokeLinecap="round"/>
              </svg>
            )}
          </motion.span>
        </button>

        {/* CTA */}
        <a
          href="mailto:erik21guerra8@gmail.com"
          className="px-4 py-1.5 text-xs font-bold rounded-xl transition-opacity hover:opacity-85 shrink-0"
          style={{ background: "var(--surface2)", color: "var(--text-2)", border: "1px solid var(--border)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
        >
          {tr.nav.hire}
        </a>
      </motion.nav>
    </>
  );
}
