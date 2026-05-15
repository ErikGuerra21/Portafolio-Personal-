"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLang } from "@/lib/lang";
import { useModal } from "@/lib/modal";

const LINKS = [
  {
    label: "GitHub",
    sub: "github.com/Erik21guerra",
    href: "https://github.com/Erik21guerra",
    hoverColor: "#f0f0f0",
  },
  {
    label: "LinkedIn",
    sub: "linkedin.com/in/erikguerra",
    href: "https://linkedin.com/in/erikguerra",
    hoverColor: "#3b82f6",
  },
  {
    label: "Email",
    sub: "erik21guerra8@gmail.com",
    href: "mailto:erik21guerra8@gmail.com",
    hoverColor: "#f5c518",
  },
];

function ContactRow({
  link,
  index,
  inView,
}: {
  link: (typeof LINKS)[0];
  index: number;
  inView: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.a
      href={link.href}
      target={link.href.startsWith("http") ? "_blank" : undefined}
      rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 + index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-center justify-between py-5 border-b"
      style={{
        borderColor: hovered ? link.hoverColor : "var(--border)",
        textDecoration: "none",
        transition: "border-color 0.25s",
      }}
    >
      <span
        className="text-2xl sm:text-3xl font-black tracking-tight transition-colors duration-200"
        style={{ color: hovered ? link.hoverColor : "var(--text-2)" }}
      >
        {link.label}
      </span>
      <div className="flex items-center gap-3">
        <span
          className="hidden sm:block text-xs font-mono transition-colors duration-200"
          style={{ color: hovered ? link.hoverColor : "var(--text-3)" }}
        >
          {link.sub}
        </span>
        <motion.span
          animate={{ x: hovered ? 5 : 0, y: hovered ? -5 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ color: hovered ? link.hoverColor : "var(--text-3)" }}
        >
          ↗
        </motion.span>
      </div>
    </motion.a>
  );
}

const inputStyle: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: 10,
  color: "var(--text)",
  padding: "11px 14px",
  fontSize: 13,
  width: "100%",
  outline: "none",
  fontFamily: "inherit",
};

export default function Contact() {
  const { tr }  = useLang();
  const modal   = useModal();
  const ref     = useRef(null);
  const inView  = useInView(ref, { once: true, margin: "-60px" });

  const [form, setForm]   = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setForm({ name: "", email: "", message: "" });
        modal.show({
          type: "success",
          title: tr.contact.modals.successTitle,
          message: tr.contact.modals.successMsg,
          closeLabel: tr.contact.modals.close,
        });
      } else {
        modal.show({
          type: "error",
          title: tr.contact.modals.errorTitle,
          message: tr.contact.modals.errorMsg,
          closeLabel: tr.contact.modals.close,
        });
      }
    } catch {
      modal.show({
        type: "error",
        title: tr.contact.modals.errorTitle,
        message: tr.contact.modals.errorMsg,
        closeLabel: tr.contact.modals.close,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 px-6 sm:px-12 lg:px-24 pb-32" ref={ref}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55 }}
          className="flex items-center gap-4 mb-4"
        >
          <h2
            className="text-4xl sm:text-5xl font-black tracking-tight shrink-0"
            style={{ color: "var(--text)" }}
          >
            {tr.contact.title}<span style={{ color: "var(--purple)" }}>.</span>
          </h2>
          <div className="h-px flex-1" style={{ background: "var(--border)" }} />
          <span className="text-xs font-mono shrink-0" style={{ color: "var(--text-3)" }}>
            {tr.contact.index}
          </span>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.05, duration: 0.5 }}
          className="text-sm mb-12"
          style={{ color: "var(--text-3)" }}
        >
          {tr.contact.subtitle}
        </motion.p>

        {/* Two-column layout */}
        <div className="grid lg:grid-cols-2 gap-6 items-stretch">

          {/* Left — contact rows card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="rounded-2xl p-6 flex flex-col justify-between"
            style={{
              background: "var(--card-bg-lt)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <div>
              {LINKS.map((link, i) => (
                <ContactRow key={link.label} link={link} index={i} inView={inView} />
              ))}
            </div>

            {/* Response time pinned to bottom */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.45, duration: 0.5 }}
              className="flex items-center gap-2 mt-8"
            >
              <span className="w-2 h-2 rounded-full animate-pulse shrink-0" style={{ background: "var(--green)" }} />
              <span className="text-xs font-mono" style={{ color: "var(--text-3)" }}>
                {tr.contact.responseTime}
              </span>
            </motion.div>
          </motion.div>

          {/* Right — form card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="rounded-2xl p-6"
            style={{
              background: "var(--card-bg-lt)",
              border: "1px solid var(--border)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
            }}
          >
            <p className="text-xs font-mono mb-6" style={{ color: "var(--text-3)" }}>
              {tr.contact.formSeparator}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono" style={{ color: "var(--text-3)" }}>
                    {tr.contact.form.name}
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder={tr.contact.form.namePlaceholder}
                    required
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "var(--border2)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono" style={{ color: "var(--text-3)" }}>
                    {tr.contact.form.email}
                  </label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder={tr.contact.form.emailPlaceholder}
                    required
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "var(--border2)"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-mono" style={{ color: "var(--text-3)" }}>
                  {tr.contact.form.message}
                </label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder={tr.contact.form.messagePlaceholder}
                  required
                  rows={5}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={(e) => { e.currentTarget.style.borderColor = "var(--border2)"; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = "var(--border)"; }}
                />
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 text-sm font-bold rounded-xl transition-opacity hover:opacity-85 disabled:opacity-60"
                  style={{ background: "var(--yellow)", color: "#000" }}
                >
                  {loading ? tr.contact.form.sending : tr.contact.form.submit}
                </button>
              </div>
            </form>
          </motion.div>

        </div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-xs font-mono mt-16"
          style={{ color: "var(--text-3)" }}
        >
          {tr.contact.copyright}
        </motion.p>

      </div>
    </section>
  );
}
