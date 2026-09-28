import React from "react";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export default function AnchorCase() {
  const { t } = useLanguage();
  return <section id="anchor-case" className="scroll-mt-24 border-b border-border/70"><div className="mx-auto max-w-7xl border-x border-border/60 px-6 py-24 md:px-10 lg:px-14 lg:py-32">
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .5 }} className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-b from-primary/[0.04] to-transparent p-px shadow-[0_0_60px_-12px_hsl(var(--primary)/0.2)]"><div className="relative rounded-[11px] bg-card p-6 sm:p-8 md:p-12 lg:p-16">
      <div className="inline-flex items-center gap-2 border border-accent-amber/50 bg-accent-amber/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-[.18em] text-accent-amber-foreground"><span className="h-1.5 w-1.5 rounded-full bg-accent-amber shadow-[0_0_10px_hsl(var(--accent-amber))]"/>{t("anchor.label")}</div>
      <div className="mt-8 grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7"><h2 className="text-3xl font-bold leading-tight tracking-[-.03em] text-foreground sm:text-4xl lg:text-5xl">{t("anchor.title")}</h2><p className="mt-4 text-sm font-semibold uppercase tracking-wider text-primary">{t("anchor.company")}</p><p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{t("anchor.challenge")}</p><div className="mt-10 space-y-5">{t("anchor.pillars").map(p => <div key={p.title} className="flex gap-4 border-l-2 border-border pl-5 transition-colors duration-300 hover:border-primary"><div><h3 className="text-base font-semibold text-foreground">{p.title}</h3><p className="mt-1.5 text-sm leading-6 text-muted-foreground">{p.text}</p></div></div>)}</div></div>
        <div className="lg:col-span-5"><div className="grid grid-cols-2 gap-px border border-border bg-border">{t("anchor.kpis").map(k => <div key={k.label} className="bg-card p-4 transition-colors hover:bg-muted/60 sm:p-6"><strong className="block text-3xl font-bold tracking-tight text-primary">{k.value}</strong><span className="mt-2 block text-xs uppercase tracking-wider text-muted-foreground">{k.label}</span></div>)}</div><Link to="/projetos#um-telecom" className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary/80">{t("anchor.action")}<ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"/></Link></div>
      </div>
    </div></motion.div>
  </div></section>;
}