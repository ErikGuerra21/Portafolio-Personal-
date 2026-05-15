"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { t, type Lang, type Translations } from "./translations";

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  tr: Translations;
};

const LangContext = createContext<LangCtx>({ lang: "es", setLang: () => {}, tr: t.es });

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, tr: t[lang] }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
