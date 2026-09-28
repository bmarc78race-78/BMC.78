import React, { createContext, useContext, useEffect, useState } from "react";
import { translations } from "@/context/translations";

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem("bmc-language") || "pt");
  useEffect(() => localStorage.setItem("bmc-language", lang), [lang]);
  const t = (path) => path.split(".").reduce((value, key) => value?.[key], translations[lang]);
  return <LanguageContext.Provider value={{ lang, setLang, t }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage requires LanguageProvider");
  return context;
}