"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { useLang } from "@/lib/lang";

type Tech = {
  name: string;
  icon: string;
  bg: string;
  border: string;
  invertInDark?: boolean;
};

const TECHS: Tech[] = [
  { name: "React",         icon: "/icons/react.svg",      bg: "#61dafb18", border: "#61dafb30" },
  { name: "Next.js",       icon: "/icons/nextjs.svg",     bg: "var(--surface2)", border: "var(--border2)", invertInDark: true },
  { name: "TypeScript",    icon: "/icons/typescript.svg", bg: "#3b82f618", border: "#3b82f630" },
  { name: "JavaScript",    icon: "/icons/javascript.svg", bg: "#f5c51818", border: "#f5c51830" },
  { name: "Tailwind CSS",  icon: "/icons/tailwind.svg",   bg: "#38bdf818", border: "#38bdf830" },
  { name: "HTML5",         icon: "/icons/html5.svg",      bg: "#e34f2618", border: "#e34f2630" },
  { name: "CSS3",          icon: "/icons/css3.svg",       bg: "#1572b618", border: "#1572b630" },
  { name: "Node.js",       icon: "/icons/nodejs.svg",     bg: "#2dc65318", border: "#2dc65330" },
  { name: "Git",           icon: "/icons/git.svg",        bg: "#f0503218", border: "#f0503230" },
  { name: "Figma",         icon: "/icons/figma.svg",      bg: "#ec489918", border: "#ec489930" },
  { name: "Framer Motion", icon: "/icons/framer.svg",     bg: "#a855f718", border: "#a855f730" },
  { name: "REST APIs",     icon: "/icons/api.svg",        bg: "#10b98118", border: "#10b98130" },
];

const TRACK = [...TECHS, ...TECHS];

function TechCard({ tech }: { tech: Tech }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-2 shrink-0 rounded-2xl border px-6 py-4 mx-2"
      style={{ background: tech.bg, borderColor: tech.border, minWidth: 108 }}
    >
      <img
        src={tech.icon}
        alt={tech.name}
        width={32}
        height={32}
        className="object-contain"
        style={tech.invertInDark ? { filter: "var(--icon-invert)" } : undefined}
      />
      <span className="text-xs font-medium whitespace-nowrap" style={{ color: "var(--text-2)" }}>
        {tech.name}
      </span>
    </div>
  );
}

const SPEED = 50; // px/s
const EASE  = 6;  // higher = snappier ease (exp decay)

function MarqueeTrack() {
  const trackRef    = useRef<HTMLDivElement>(null);
  const targetSpeed = useRef(SPEED);
  const curSpeed    = useRef(SPEED);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    let pos  = 0;
    let last = 0;
    let raf: number;

    function tick(t: number) {
      const delta = last ? (t - last) / 1000 : 0;
      last = t;

      // Exponential ease toward target speed
      curSpeed.current += (targetSpeed.current - curSpeed.current) * (1 - Math.exp(-EASE * delta));

      if (curSpeed.current > 0.05) {
        const half = el!.scrollWidth / 2;
        pos = (pos + curSpeed.current * delta) % half;
        el!.style.transform = `translateX(-${pos}px)`;
      }

      raf = requestAnimationFrame(tick);
    }

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{ overflow: "hidden" }}
      onMouseEnter={() => { targetSpeed.current = 0; }}
      onMouseLeave={() => { targetSpeed.current = SPEED; }}
    >
      <div ref={trackRef} style={{ display: "flex", width: "max-content" }}>
        {TRACK.map((tech, i) => (
          <TechCard key={i} tech={tech} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  const { tr }    = useLang();
  const titleRef  = useRef(null);
  const inView    = useInView(titleRef, { once: true });

  return (
    <section id="skills" className="py-16 sm:py-28 overflow-hidden">
      {/* Header */}
      <div className="px-6 sm:px-12 lg:px-24 mb-8 sm:mb-16">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="max-w-6xl mx-auto flex items-center gap-4"
        >
          <h2
            className="text-4xl sm:text-5xl font-black tracking-tight shrink-0"
            style={{ color: "var(--text)" }}
          >
            {tr.skills.title}<span style={{ color: "var(--green)" }}>.</span>
          </h2>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="text-xs font-mono shrink-0" style={{ color: "var(--text-3)" }}>
            {tr.skills.index}
          </span>
        </motion.div>
      </div>

      {/* Marquee */}
      <div
        className="max-w-6xl mx-auto px-6 sm:px-12 lg:px-24"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
        }}
      >
        <MarqueeTrack />
      </div>
    </section>
  );
}
