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
  const [scrolled, setScrolled]   = useState(false);
  const [active, setActive]       = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress }       = useScroll();
  const barWidth                  = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const LINKS = [
    { label: tr.nav.home,     id: "hero"     },
    { label: tr.nav.about,    id: "about"    },
    { label: tr.nav.projects, id: "projects" },
    { label: tr.nav.stack,    id: "skills"   },
    { label: tr.nav.contact,  id: "contact"  },
  ];

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v) => setScrolled(v > 0.025));
    return unsub;
  }, [scrollYProgress]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }); },
      { rootMargin: "-35% 0px -60% 0px" }
    );
    LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    smoothScrollTo(id);
  };

  const activeLabel = LINKS.find((l) => l.id === active)?.label ?? "";

  const ThemeToggle = ({ small }: { small?: boolean }) => (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
      className="relative shrink-0 rounded-full transition-colors duration-300"
      style={{
        width: small ? 36 : 44,
        height: small ? 20 : 24,
        background: theme === "light" ? "var(--yellow)" : "var(--surface2)",
        border: `1px solid ${theme === "light" ? "var(--yellow)" : "var(--border)"}`,
      }}
    >
      <motion.span
        animate={{ left: theme === "light" ? (small ? 17 : 22) : (small ? 1 : 2) }}
        transition={{ type: "spring", stiffness: 500, damping: 38 }}
        className="absolute flex items-center justify-center rounded-full"
        style={{
          top: small ? 1 : 2,
          width: small ? 16 : 19,
          height: small ? 16 : 19,
          background: "#fff",
          boxShadow: "0 1px 4px rgba(0,0,0,0.35)",
        }}
      >
        {theme === "dark" ? (
          <svg aria-hidden="true" width={small ? 8 : 10} height={small ? 8 : 10} viewBox="0 0 10 10" fill="none">
            <path d="M8.5 5.5A4 4 0 0 1 4 1a4 4 0 1 0 4.5 4.5Z" stroke="#111" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
        ) : (
          <svg aria-hidden="true" width={small ? 8 : 10} height={small ? 8 : 10} viewBox="0 0 10 10" fill="none">
            <circle cx="5" cy="5" r="1.8" stroke="#111" strokeWidth="1.1"/>
            <path d="M5 1v.8M5 8.2V9M1 5h.8M8.2 5H9M2.17 2.17l.56.56M7.27 7.27l.56.56M7.27 2.73l.56-.56M2.17 7.83l.56-.56" stroke="#111" strokeWidth="1.1" strokeLinecap="round"/>
          </svg>
        )}
      </motion.span>
    </button>
  );

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 z-60 h-0.5"
        style={{ width: barWidth, background: "var(--yellow)" }}
      />

      {/* ── Desktop nav (md+) ─────────────────────────────── */}
      <motion.nav
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="hidden md:flex fixed top-5 left-1/2 -translate-x-1/2 z-50 items-center gap-1 px-2 py-2 rounded-2xl"
        style={{
          background: scrolled ? "var(--nav-scrolled)" : "transparent",
          border: scrolled ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
          boxShadow: scrolled ? "0 4px 24px rgba(0,0,0,0.5)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <a href="#hero" onClick={(e) => handleClick(e, "hero")}
          className="px-3 py-1.5 text-sm font-black rounded-xl shrink-0"
          style={{ color: "var(--text)" }}>
          EG<span style={{ color: "var(--yellow)" }}>.</span>
        </a>

        <div className="w-px h-4 mx-0.5 shrink-0" style={{ background: "var(--border)" }} />

        {LINKS.map(({ label, id }) => {
          const isActive = active === id;
          return (
            <a key={id} href={`#${id}`} onClick={(e) => handleClick(e, id)}
              aria-current={isActive ? "true" : undefined}
              className="relative px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors duration-200 select-none"
              style={{ color: isActive ? "#000" : "var(--text-2)" }}
              onMouseEnter={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
              onMouseLeave={(e) => { if (!isActive) (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}
            >
              {isActive && (
                <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-xl"
                  style={{ background: "var(--yellow)" }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }} />
              )}
              <span className="relative z-10">{label}</span>
            </a>
          );
        })}

        <div className="hidden lg:flex items-center ml-1 mr-0.5">
          <div className="w-px h-4" style={{ background: "var(--border)" }} />
          <div className="ml-2 w-20 overflow-hidden h-5 flex items-center">
            <AnimatePresence mode="wait">
              <motion.span key={active + lang}
                initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="text-xs font-mono whitespace-nowrap" style={{ color: "var(--text-3)" }}>
                / {activeLabel.toLowerCase()}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <div className="w-px h-4 shrink-0" style={{ background: "var(--border)" }} />

        <div className="flex items-center rounded-xl p-0.5 shrink-0"
          style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
          {(["es", "en"] as Lang[]).map((l) => (
            <button key={l} onClick={() => setLang(l)}
              className="relative px-2.5 py-1 text-xs font-bold rounded-lg font-mono uppercase"
              style={{ color: lang === l ? "#000" : "var(--text-3)" }}
              aria-label={`Switch to ${l.toUpperCase()}`}>
              {lang === l && (
                <motion.span layoutId="lang-pill" className="absolute inset-0 rounded-lg"
                  style={{ background: "var(--yellow)" }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }} />
              )}
              <span className="relative z-10">{l}</span>
            </button>
          ))}
        </div>

        <ThemeToggle />

        <a href="mailto:erik21guerra8@gmail.com"
          className="px-4 py-1.5 text-xs font-bold rounded-xl transition-opacity hover:opacity-85 shrink-0"
          style={{ background: "var(--surface2)", color: "var(--text-2)", border: "1px solid var(--border)" }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-2)"; }}>
          {tr.nav.hire}
        </a>
      </motion.nav>

      {/* ── Mobile bar (< md) ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 h-14"
        style={{
          background: scrolled || mobileOpen ? "var(--nav-scrolled)" : "transparent",
          borderBottom: scrolled || mobileOpen ? "1px solid var(--border)" : "1px solid transparent",
          backdropFilter: scrolled || mobileOpen ? "blur(20px)" : "none",
          WebkitBackdropFilter: scrolled || mobileOpen ? "blur(20px)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <a href="#hero" onClick={(e) => handleClick(e, "hero")}
          className="text-sm font-black" style={{ color: "var(--text)" }}>
          EG<span style={{ color: "var(--yellow)" }}>.</span>
        </a>

        <div className="flex items-center gap-3">
          <ThemeToggle small />
          <button
            onClick={() => setMobileOpen((o) => !o)}
            aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            className="flex flex-col justify-center items-center w-9 h-9 gap-1.5"
          >
            <motion.span animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
              transition={{ duration: 0.22 }}
              className="block h-px w-5 rounded-full" style={{ background: "var(--text)" }} />
            <motion.span animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className="block h-px w-5 rounded-full" style={{ background: "var(--text)" }} />
            <motion.span animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
              transition={{ duration: 0.22 }}
              className="block h-px w-5 rounded-full" style={{ background: "var(--text)" }} />
          </button>
        </div>
      </motion.div>

      {/* ── Mobile drawer ─────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
            className="md:hidden fixed inset-0 z-40 flex flex-col pt-14"
            style={{
              background: "var(--nav-scrolled)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
            }}
          >
            {/* Links */}
            <nav className="flex flex-col px-6 pt-4">
              {LINKS.map(({ label, id }, i) => {
                const isActive = active === id;
                return (
                  <motion.a
                    key={id}
                    href={`#${id}`}
                    onClick={(e) => handleClick(e, id)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04, duration: 0.2 }}
                    className="flex items-center justify-between py-4 border-b text-xl font-black"
                    style={{ borderColor: "var(--border)", color: isActive ? "var(--yellow)" : "var(--text)" }}
                  >
                    {label}
                    {isActive && <span style={{ color: "var(--yellow)", fontSize: 16 }}>→</span>}
                  </motion.a>
                );
              })}
            </nav>

            {/* Bottom row */}
            <div className="flex items-center justify-between px-6 mt-auto pb-10 pt-6">
              <div className="flex items-center rounded-xl p-0.5"
                style={{ background: "var(--surface2)", border: "1px solid var(--border)" }}>
                {(["es", "en"] as Lang[]).map((l) => (
                  <button key={l} onClick={() => setLang(l)}
                    className="relative px-5 py-2.5 text-sm font-bold rounded-lg font-mono uppercase"
                    style={{ color: lang === l ? "#000" : "var(--text-3)" }}
                    aria-label={`Switch to ${l.toUpperCase()}`}>
                    {lang === l && (
                      <motion.span layoutId="lang-pill-m" className="absolute inset-0 rounded-lg"
                        style={{ background: "var(--yellow)" }}
                        transition={{ type: "spring", stiffness: 400, damping: 35 }} />
                    )}
                    <span className="relative z-10">{l}</span>
                  </button>
                ))}
              </div>

              <a href="mailto:erik21guerra8@gmail.com"
                className="px-6 py-2.5 text-sm font-bold rounded-xl"
                style={{ background: "var(--yellow)", color: "#000" }}>
                {tr.nav.hire}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
