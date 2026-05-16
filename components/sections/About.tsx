"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { useLang } from "@/lib/lang";

export default function About() {
  const { tr } = useLang();
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="about" className="py-16 sm:py-28 px-6 sm:px-12 lg:px-24" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex items-center gap-4 mb-10"
        >
          <h2
            className="text-4xl sm:text-5xl font-black tracking-tight shrink-0"
            style={{ color: "var(--text)" }}
          >
            {tr.about.title}<span style={{ color: "var(--blue)" }}>.</span>
          </h2>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="text-xs font-mono shrink-0" style={{ color: "var(--text-3)" }}>
            {tr.about.index}
          </span>
        </motion.div>

        {/* Content grid */}
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-start">

          {/* Bio — 3 cols */}
          <div className="lg:col-span-3 flex flex-col gap-8">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="text-lg leading-relaxed"
              style={{ color: "var(--text-2)" }}
            >
              {tr.about.bio1a}
              <span style={{ color: "var(--text)" }}>{tr.about.bio1hl}</span>
              {tr.about.bio1b}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.18, duration: 0.5 }}
              className="text-base leading-relaxed"
              style={{ color: "var(--text-2)" }}
            >
              {tr.about.bio2}
            </motion.p>

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.28, duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse shrink-0"
                style={{ background: "var(--green)" }}
              />
              <span className="text-sm font-mono" style={{ color: "var(--text-3)" }}>
                {tr.about.available}
              </span>
            </motion.div>

            {/* Experience list */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="flex flex-col mt-2"
            >
              <span
                className="text-xs font-mono uppercase tracking-widest mb-4"
                style={{ color: "var(--text-3)" }}
              >
                {tr.about.expLabel}
              </span>
              {tr.about.experience.map((exp) => (
                <div
                  key={exp.org}
                  className="flex items-start gap-4 py-4 border-b"
                  style={{ borderColor: "var(--border)" }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0"
                    style={{ background: exp.dot }}
                  />
                  <div className="flex flex-col gap-0.5">
                    <span className="text-sm font-semibold" style={{ color: "var(--text)" }}>
                      {exp.org}
                    </span>
                    <span className="text-xs font-mono" style={{ color: "var(--text-3)" }}>
                      {exp.desc}
                    </span>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — photo */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2, duration: 0.55 }}
              className="relative rounded-3xl overflow-hidden"
              style={{
                aspectRatio: "3/4",
                border: "1px solid var(--border2)",
              }}
            >
              <Image
                src="/erik.jpg"
                alt="Erik Guerra"
                fill
                className="object-cover"
                style={{ objectPosition: "center 20%" }}
                sizes="(max-width: 1024px) 100vw, 40vw"
                priority
              />
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
