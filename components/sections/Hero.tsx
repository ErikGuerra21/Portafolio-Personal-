"use client";

import { motion, type Variants } from "framer-motion";
import { smoothScrollTo } from "@/lib/smoothScroll";
import { useLang } from "@/lib/lang";
import { useModal } from "@/lib/modal";

const stagger: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const up: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] },
  },
};

export default function Hero() {
  const { tr }  = useLang();
  const modal   = useModal();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-24 pt-28 pb-20"
    >
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="max-w-6xl w-full mx-auto"
      >
        {/* Index + status */}
        <motion.div variants={up} className="flex items-center gap-4 mb-10">
          <span className="text-xs font-mono" style={{ color: "var(--text-3)" }}>
            {tr.hero.index}
          </span>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span
            className="flex items-center gap-1.5 text-xs font-mono"
            style={{ color: "var(--green)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full animate-pulse"
              style={{ background: "var(--green)" }}
            />
            {tr.hero.status}
          </span>
        </motion.div>

        {/* Name */}
        <motion.div variants={up} className="mb-6">
          <h1
            className="font-black leading-[0.88] tracking-tighter"
            style={{ fontSize: "clamp(3rem, 10vw, 9rem)", color: "var(--text)" }}
          >
            Erik
            <br />
            <span style={{ color: "var(--yellow)" }}>Guerra</span>
            <span style={{ color: "var(--text-3)" }}>.</span>
          </h1>
        </motion.div>

        {/* Role + description */}
        <motion.div
          variants={up}
          className="flex flex-col sm:flex-row sm:items-end gap-6 sm:gap-12 mb-12"
        >
          <div className="flex flex-col gap-1">
            <span
              className="text-xs font-mono uppercase tracking-widest"
              style={{ color: "var(--text-3)" }}
            >
              {tr.hero.roleLabel}
            </span>
            <span className="text-xl font-semibold" style={{ color: "var(--text)" }}>
              {tr.hero.role}
              <span className="cursor-blink ml-0.5" style={{ color: "var(--yellow)" }}>|</span>
            </span>
          </div>

          <div
            className="hidden sm:block w-px self-stretch"
            style={{ background: "var(--border)" }}
          />

          <p className="max-w-sm text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>
            {tr.hero.bio}
          </p>
        </motion.div>

        {/* CTAs */}
        <motion.div variants={up} className="flex flex-wrap gap-3">
          <a
            href="#projects"
            onClick={(e) => { e.preventDefault(); smoothScrollTo("projects"); }}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold rounded-xl transition-opacity duration-150 hover:opacity-85"
            style={{ background: "var(--yellow)", color: "#000" }}
          >
            {tr.hero.ctaProjects}
          </a>
          <a
            href="#contact"
            onClick={(e) => { e.preventDefault(); smoothScrollTo("contact"); }}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl border transition-all duration-150"
            style={{ color: "var(--text-2)", borderColor: "var(--border)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--text)";
              el.style.borderColor = "var(--border2)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--text-2)";
              el.style.borderColor = "var(--border)";
            }}
          >
            {tr.hero.ctaContact}
          </a>
          <a
            href={tr.hero.cvFile}
            download
            onClick={() => modal.show({
              type: "download",
              title: tr.contact.modals.cvTitle,
              message: tr.contact.modals.cvMsg,
              closeLabel: tr.contact.modals.close,
            })}
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl border transition-all duration-150"
            style={{ color: "var(--text-2)", borderColor: "var(--border)" }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--green)";
              el.style.borderColor = "var(--green)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLElement;
              el.style.color = "var(--text-2)";
              el.style.borderColor = "var(--border)";
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M7 1v8M4 6l3 3 3-3M2 11h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {tr.hero.ctaCv}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={up}
          className="flex flex-wrap gap-10 mt-16 pt-8 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {tr.hero.stats.map(({ value, label, color }) => (
            <div key={label} className="flex flex-col gap-1">
              <span className="text-3xl font-black" style={{ color, fontVariantNumeric: "tabular-nums" }}>
                {value}
              </span>
              <span className="text-xs font-mono" style={{ color: "var(--text-3)" }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 right-8 flex items-center gap-2"
        style={{ color: "var(--text-3)" }}
      >
        <span className="text-xs font-mono">{tr.hero.scroll}</span>
        <motion.span
          animate={{ x: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ color: "var(--yellow)" }}
          className="text-xs"
        >
          →
        </motion.span>
      </motion.div>
    </section>
  );
}
