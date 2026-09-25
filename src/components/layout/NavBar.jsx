import React, { useState } from "react";
import { Globe2, Menu, Moon, Sun, X } from "lucide-react";
import { motion } from "framer-motion";
import { Link, NavLink } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const links = [["/", "home"], ["/sobre", "about"], ["/projetos", "projects"], ["/contato", "contact"]];
  return <motion.header initial={{ y: -80 }} animate={{ y: 0 }} className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
    <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8" aria-label="Principal">
      <Link to="/" className="leading-none"><strong className="block text-lg tracking-[-.04em] text-foreground">{t("brand.name")}</strong><span className="mt-1 block text-[9px] font-semibold uppercase tracking-[.22em] text-primary">{t("brand.subtitle")}</span></Link>
      <div className="hidden items-center gap-9 md:flex">{links.map(([to, key]) => <NavLink key={to} to={to} className={({ isActive }) => `text-xs font-semibold uppercase tracking-[.16em] transition-colors ${isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}>{t(`nav.${key}`)}</NavLink>)}</div>
      <div className="flex items-center gap-3">
        <div className="relative flex items-center rounded-full border border-border bg-card p-1 text-[11px] font-bold"><Globe2 className="mx-1.5 h-3.5 w-3.5 text-primary"/><button onClick={() => setLang("pt")} className={`rounded-full px-2.5 py-1 transition-colors ${lang === "pt" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>PT</button><button onClick={() => setLang("en")} className={`rounded-full px-2.5 py-1 transition-colors ${lang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>EN</button></div>
        <button onClick={toggleTheme} aria-label={t("theme.toggle")} title={theme === "dark" ? t("theme.light") : t("theme.dark")} className="flex items-center justify-center rounded-full border border-border bg-card p-2 text-muted-foreground transition-colors duration-200 hover:border-primary hover:text-primary">{theme === "dark" ? <Moon className="h-4 w-4"/> : <Sun className="h-4 w-4"/>}</button>
        <Link to="/contato" className="hidden rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition hover:bg-primary/90 lg:inline-block">{t("brand.cta")}</Link>
        <button onClick={() => setOpen(!open)} className="p-2 text-foreground md:hidden" aria-label="Menu">{open ? <X/> : <Menu/>}</button>
      </div>
    </nav>
    {open && <div className="border-t border-border bg-background px-5 py-2 md:hidden">{links.map(([to, key]) => <Link onClick={() => setOpen(false)} key={to} to={to} className="block border-b border-border py-4 text-sm uppercase tracking-widest text-muted-foreground">{t(`nav.${key}`)}</Link>)}<Link onClick={() => setOpen(false)} to="/contato" className="mt-4 block rounded-full bg-primary py-3 text-center text-sm font-semibold text-primary-foreground">{t("brand.cta")}</Link></div>}
  </motion.header>;
}