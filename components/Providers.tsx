"use client";

import { LangProvider } from "@/lib/lang";
import { ModalProvider } from "@/lib/modal";
import { ThemeProvider } from "@/lib/theme";
import type { ReactNode } from "react";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LangProvider>
        <ModalProvider>
          {children}
        </ModalProvider>
      </LangProvider>
    </ThemeProvider>
  );
}
