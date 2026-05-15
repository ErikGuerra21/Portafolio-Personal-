"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { useLang } from "@/lib/lang";

type ViewMode = "web" | "mobile";

/* ── Mockup frames ────────────────────────────────────────── */
function WebMockup({ hex, screenshot, sizes = "(max-width: 768px) 100vw, 33vw" }: { hex: string; screenshot?: string; sizes?: string }) {
  return (
    <div className="p-3">
      <div className="rounded-xl overflow-hidden border" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-2 px-3 py-2" style={{ background: "var(--bg2)" }}>
          <div className="flex gap-1 shrink-0">
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--mac-red)" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--mac-yellow)" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: "var(--mac-green)" }} />
          </div>
          <div className="flex-1 h-3.5 rounded" style={{ background: "var(--surface2)", border: "1px solid var(--border)" }} />
        </div>
        {screenshot ? (
          <div className="relative w-full" style={{ aspectRatio: "16/9" }}>
            <Image src={screenshot} alt="Project screenshot" fill className="object-cover object-top" sizes={sizes} />
          </div>
        ) : (
          <div className="relative flex gap-3 p-3" style={{ aspectRatio: "16/9", background: `${hex}0e` }}>
            <div className="w-1/5 rounded-lg shrink-0" style={{ background: `${hex}22`, border: `1px solid ${hex}30` }} />
            <div className="flex-1 flex flex-col gap-2">
              <div className="h-4 w-1/2 rounded" style={{ background: `${hex}35` }} />
              <div className="flex gap-2 flex-1">
                <div className="flex-1 rounded-lg" style={{ background: `${hex}20` }} />
                <div className="flex-1 rounded-lg" style={{ background: `${hex}16` }} />
                <div className="flex-1 rounded-lg" style={{ background: `${hex}20` }} />
              </div>
              <div className="h-3 w-3/4 rounded" style={{ background: `${hex}18` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MobileMockup({ hex, screenshot }: { hex: string; screenshot?: string }) {
  return (
    <div className="flex justify-center py-4">
      <div
        className="relative rounded-[28px] overflow-hidden border-2 flex flex-col"
        style={{ width: 130, aspectRatio: "9/19", borderColor: "var(--border2)", background: "var(--bg2)" }}
      >
        <div className="flex justify-between items-center px-4 pt-3 pb-1 shrink-0" style={{ fontSize: 8, color: "var(--text-3)" }}>
          <span>9:41</span><span>●●●</span>
        </div>
        {screenshot ? (
          <div className="relative flex-1">
            <Image src={screenshot} alt="Mobile screenshot" fill className="object-cover object-top" sizes="130px" />
          </div>
        ) : (
          <div className="flex-1 flex flex-col gap-1.5 px-3 pb-2">
            <div className="h-3 w-2/3 rounded" style={{ background: `${hex}45` }} />
            <div className="h-2 w-full rounded" style={{ background: `${hex}22` }} />
            <div className="h-2 w-5/6 rounded" style={{ background: `${hex}22` }} />
            <div className="flex-1 rounded-xl mt-1" style={{ background: `${hex}28`, border: `1px solid ${hex}35` }} />
            <div className="h-8 w-full rounded-xl" style={{ background: `${hex}18` }} />
            <div className="h-8 w-full rounded-xl" style={{ background: `${hex}18` }} />
          </div>
        )}
        <div className="mx-auto mb-2 rounded-full shrink-0" style={{ width: 40, height: 3, background: "var(--border2)" }} />
      </div>
    </div>
  );
}

/* ── Private buttons ──────────────────────────────────────── */
function PrivateButtons({ labels, accent }: {
  labels: { demo: string; github: string; privateLabel: string };
  accent: string;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative flex gap-2" onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono whitespace-nowrap"
            style={{ background: "var(--bg2)", border: "1px solid var(--border2)", color: "var(--text-2)" }}
          >
            <svg width="10" height="11" viewBox="0 0 10 11" fill="none" aria-hidden="true">
              <rect x="1.5" y="4.5" width="7" height="6" rx="1" stroke="currentColor" strokeWidth="1.1"/>
              <path d="M3 4.5V3a2 2 0 1 1 4 0v1.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
            </svg>
            {labels.privateLabel}
          </motion.div>
        )}
      </AnimatePresence>
      <button disabled className="flex-1 py-1.5 text-xs font-bold text-center rounded-xl opacity-35 cursor-not-allowed"
        style={{ background: accent, color: "#000" }}>{labels.demo}</button>
      <button disabled className="flex-1 py-1.5 text-xs font-semibold text-center rounded-xl border opacity-35 cursor-not-allowed"
        style={{ color: "var(--text-2)", borderColor: "var(--border)" }}>{labels.github}</button>
    </div>
  );
}

/* ── Types ────────────────────────────────────────────────── */
type Project = {
  name: string;
  description: string;
  detail?: { role: string; challenge: string; impact: string };
  tech: readonly string[];
  github: string;
  demo: string;
  accent: string;
  accentHex: string;
  isPrivate?: boolean;
  screenshots?: { web?: string; mobile?: string };
};

type Labels = {
  demo: string;
  github: string;
  privateLabel: string;
  viewDetails: string;
  modalRole: string;
  modalChallenge: string;
  modalImpact: string;
  modalStack: string;
  modalClose: string;
};

/* ── Project modal ────────────────────────────────────────── */
function ProjectModal({ project, labels, onClose }: { project: Project; labels: Labels; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const { detail, screenshots, accentHex, accent } = project;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8"
      style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.25, ease: [0.25, 0.4, 0.25, 1] }}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl flex flex-col"
        style={{ background: "var(--bg2)", border: "1px solid var(--border2)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent bar + header */}
        <div className="h-1 w-full rounded-t-2xl shrink-0" style={{ background: accent }} />
        <div className="flex items-center justify-between px-6 py-4 shrink-0" style={{ borderBottom: "1px solid var(--border)" }}>
          <h3 className="text-lg font-black" style={{ color: "var(--text)" }}>{project.name}</h3>
          <button
            onClick={onClose}
            aria-label={labels.modalClose}
            className="flex items-center justify-center w-8 h-8 rounded-xl transition-colors"
            style={{ color: "var(--text-3)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "var(--text-3)"; }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Screenshots */}
        <div className="flex gap-4 p-5 shrink-0" style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}>
          <div className="flex-1">
            <WebMockup hex={accentHex} screenshot={screenshots?.web} sizes="(max-width: 640px) 90vw, 480px" />
          </div>
          <div className="hidden sm:block w-24 shrink-0">
            <MobileMockup hex={accentHex} screenshot={screenshots?.mobile} />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-5">
          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{project.description}</p>

          {detail && (
            <>
              {/* Role + Impact */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5 p-4 rounded-xl" style={{ background: `${accentHex}0d`, border: `1px solid ${accentHex}25` }}>
                  <span className="text-xs font-mono uppercase tracking-widest" style={{ color: accentHex }}>{labels.modalRole}</span>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{detail.role}</p>
                </div>
                <div className="flex flex-col gap-1.5 p-4 rounded-xl" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                  <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-3)" }}>{labels.modalImpact}</span>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{detail.impact}</p>
                </div>
              </div>

              {/* Challenge */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-3)" }}>{labels.modalChallenge}</span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-2)" }}>{detail.challenge}</p>
              </div>
            </>
          )}

          {/* Stack */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-mono uppercase tracking-widest" style={{ color: "var(--text-3)" }}>{labels.modalStack}</span>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span key={t} className="text-xs px-2.5 py-1 rounded-lg font-mono"
                  style={{ background: "var(--surface2)", color: "var(--text-2)", border: "1px solid var(--border)" }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          {project.isPrivate && (
            <PrivateButtons labels={labels} accent={accent} />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Project card ─────────────────────────────────────────── */
function ProjectCard({ project, index, view, labels, onOpenModal }: {
  project: Project;
  index: number;
  view: ViewMode;
  labels: Labels;
  onOpenModal: (p: Project) => void;
}) {
  const ref      = useRef(null);
  const cardRef  = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [tilt, setTilt]       = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setTilt({
      x: ((e.clientX - r.left) / r.width - 0.5) * 8,
      y: -((e.clientY - r.top) / r.height - 0.5) * 8,
    });
  }, []);

  const screenshot = view === "web" ? project.screenshots?.web : project.screenshots?.mobile;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number] }}
    >
      <div
        ref={cardRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
        style={{
          transform: `perspective(800px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`,
          transition: hovered ? "transform 0.08s linear" : "transform 0.5s ease",
        }}
      >
        <div
          className="rounded-2xl overflow-hidden flex flex-col"
          style={{
            background: "var(--card-bg)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
            border: `1px solid ${hovered ? project.accentHex + "70" : "var(--border)"}`,
            boxShadow: hovered
              ? `0 0 0 1px ${project.accentHex}25, 0 20px 50px rgba(0,0,0,0.5)`
              : "0 2px 20px rgba(0,0,0,0.35)",
            transition: "border 0.25s, box-shadow 0.25s",
          }}
        >
          {/* Mockup */}
          <div style={{ borderBottom: "1px solid var(--border)", background: "var(--bg)" }}>
            <AnimatePresence mode="wait">
              {view === "web" ? (
                <motion.div key="web" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <WebMockup hex={project.accentHex} screenshot={screenshot} />
                </motion.div>
              ) : (
                <motion.div key="mobile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                  <MobileMockup hex={project.accentHex} screenshot={screenshot} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="h-0.5 w-full" style={{ background: project.accent }} />

          {/* Info */}
          <div className="p-5 flex flex-col gap-3 flex-1">
            <h3 className="text-base font-bold" style={{ color: "var(--text)" }}>{project.name}</h3>
            <p className="text-sm leading-relaxed flex-1" style={{ color: "var(--text-2)" }}>{project.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {project.tech.map((t) => (
                <span key={t} className="text-xs px-2.5 py-0.5 rounded-lg font-mono"
                  style={{ background: "var(--surface2)", color: "var(--text-2)", border: "1px solid var(--border)" }}>
                  {t}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => onOpenModal(project)}
                className="w-full py-2 text-xs font-bold text-center rounded-xl transition-opacity hover:opacity-85"
                style={{ background: project.accent, color: "#000" }}
              >
                {labels.viewDetails}
              </button>
              {project.isPrivate && <PrivateButtons labels={labels} accent={project.accent} />}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Section ──────────────────────────────────────────────── */
export default function Projects() {
  const { tr }                      = useLang();
  const titleRef                    = useRef(null);
  const inView                      = useInView(titleRef, { once: true });
  const [view, setView]             = useState<ViewMode>("web");
  const [selected, setSelected]     = useState<Project | null>(null);

  const SCREENSHOTS: Record<number, { web?: string; mobile?: string }> = {
    0: { web: "/projects/agua-web.jpg",   mobile: "/projects/agua-mobile.jpg"   },
    1: { web: "/projects/gas-web.jpg",    mobile: "/projects/gas-mobile.jpg"    },
    2: { web: "/projects/hermes-web.jpg", mobile: "/projects/hermes-mobile.jpg" },
    3: { web: "/projects/chat-web.jpg",   mobile: "/projects/chat-mobile.jpg"   },
  };

  const PRIVATE = new Set([0, 1, 2, 3]);

  const projects: Project[] = tr.projects.items.map((p, i) => ({
    ...p,
    tech: [...p.tech],
    screenshots: SCREENSHOTS[i],
    isPrivate: PRIVATE.has(i),
  }));

  const labels: Labels = {
    demo:           tr.projects.demo,
    github:         tr.projects.github,
    privateLabel:   tr.projects.privateLabel,
    viewDetails:    tr.projects.viewDetails,
    modalRole:      tr.projects.modalRole,
    modalChallenge: tr.projects.modalChallenge,
    modalImpact:    tr.projects.modalImpact,
    modalStack:     tr.projects.modalStack,
    modalClose:     tr.projects.modalClose,
  };

  return (
    <section id="projects" className="py-28 px-6 sm:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div ref={titleRef} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }} className="flex items-center gap-4 mb-8">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight shrink-0" style={{ color: "var(--text)" }}>
            {tr.projects.title}<span style={{ color: "var(--red)" }}>.</span>
          </h2>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="text-xs font-mono shrink-0" style={{ color: "var(--text-3)" }}>{tr.projects.index}</span>
        </motion.div>

        {/* View toggle */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.1 }} className="flex items-center gap-3 mb-12">
          <span className="text-xs font-mono" style={{ color: "var(--text-3)" }}>{tr.projects.viewLabel}</span>
          <div className="flex gap-2">
            <button onClick={() => setView("web")} aria-pressed={view === "web"}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200"
              style={{ background: view === "web" ? "var(--yellow)" : "var(--surface2)", borderColor: view === "web" ? "var(--yellow)" : "var(--border)", color: view === "web" ? "#000" : "var(--text-2)" }}>
              <svg aria-hidden="true" width="16" height="14" viewBox="0 0 16 14" fill="none">
                <rect x="0.5" y="0.5" width="15" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M5 13h6M8 10.5V13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {tr.projects.viewWeb}
            </button>
            <button onClick={() => setView("mobile")} aria-pressed={view === "mobile"}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all duration-200"
              style={{ background: view === "mobile" ? "var(--yellow)" : "var(--surface2)", borderColor: view === "mobile" ? "var(--yellow)" : "var(--border)", color: view === "mobile" ? "#000" : "var(--text-2)" }}>
              <svg aria-hidden="true" width="10" height="16" viewBox="0 0 10 16" fill="none">
                <rect x="0.5" y="0.5" width="9" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                <circle cx="5" cy="13.5" r="0.75" fill="currentColor"/>
                <path d="M3.5 2h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {tr.projects.viewMobile}
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-5">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} view={view} labels={labels} onOpenModal={setSelected} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <ProjectModal project={selected} labels={labels} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
