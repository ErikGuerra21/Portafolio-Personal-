"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";

export type ModalType = "success" | "error" | "download";

type ModalState = {
  type: ModalType;
  title: string;
  message?: string;
  closeLabel: string;
};

type ModalCtx = { show: (m: ModalState) => void };

const Ctx = createContext<ModalCtx>({ show: () => {} });

const CONFIG: Record<ModalType, { icon: string; color: string; bg: string }> = {
  success:  { icon: "✓", color: "var(--green)",  bg: "#2dc65322" },
  error:    { icon: "✕", color: "var(--red)",    bg: "#e6394622" },
  download: { icon: "↓", color: "var(--blue)",   bg: "#3b82f622" },
};

export function ModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState | null>(null);

  const show = useCallback((m: ModalState) => setModal(m), []);
  const close = useCallback(() => setModal(null), []);

  const cfg = modal ? CONFIG[modal.type] : null;

  return (
    <Ctx.Provider value={{ show }}>
      {children}

      <AnimatePresence>
        {modal && cfg && (
          <>
            {/* Overlay */}
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={close}
              className="fixed inset-0"
              style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)", zIndex: 200 }}
            />

            {/* Modal card */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.90, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 12 }}
              transition={{ duration: 0.3, ease: [0.25, 0.4, 0.25, 1] as [number,number,number,number] }}
              className="fixed inset-0 flex items-center justify-center px-6"
              style={{ zIndex: 201, pointerEvents: "none" }}
            >
              <div
                className="flex flex-col items-center gap-6 text-center p-8 rounded-3xl"
                style={{
                  pointerEvents: "auto",
                  width: "100%",
                  maxWidth: 380,
                  background: "rgba(10,10,20,0.98)",
                  border: "1px solid var(--border2)",
                  backdropFilter: "blur(24px)",
                  WebkitBackdropFilter: "blur(24px)",
                  boxShadow: "0 32px 80px rgba(0,0,0,0.8)",
                }}
              >
                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black"
                  style={{ background: cfg.bg, color: cfg.color }}
                >
                  {cfg.icon}
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2">
                  <h3 className="text-xl font-black" style={{ color: "var(--text)" }}>
                    {modal.title}
                  </h3>
                  {modal.message && (
                    <p className="text-sm font-mono leading-relaxed" style={{ color: "var(--text-3)" }}>
                      {modal.message}
                    </p>
                  )}
                </div>

                {/* Close button */}
                <button
                  onClick={close}
                  className="px-8 py-2.5 text-sm font-bold rounded-xl transition-opacity hover:opacity-85"
                  style={{ background: "var(--yellow)", color: "#000" }}
                >
                  {modal.closeLabel}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </Ctx.Provider>
  );
}

export function useModal() {
  return useContext(Ctx);
}
