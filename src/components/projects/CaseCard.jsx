import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function CaseCard({ item }) {
  const { t } = useLanguage();
  const [tab, setTab] = useState(0);
  const carTabs = ["context", "action", "result"];
  const isFeatured = !!item.tabs;
  return <motion.article id={item.anchorId} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={`group scroll-mt-24 border p-6 transition-all duration-300 hover:-translate-y-1 sm:p-8 ${isFeatured ? "border-primary/40 bg-gradient-to-b from-primary/[0.05] to-transparent shadow-[0_0_60px_-18px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_80px_-14px_hsl(var(--primary)/0.45)]" : "border-border bg-card/40 hover:border-primary/40 hover:shadow-[0_0_30px_-8px_hsl(var(--primary)/0.4)]"}`}>
    <div className="flex flex-wrap items-start justify-between gap-3">
      <div className="flex items-center gap-3"><span className="font-mono text-xs text-primary">{item.id}</span>{isFeatured && <span className="inline-flex items-center gap-1.5 border border-accent-amber/50 bg-accent-amber/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[.16em] text-accent-amber-foreground"><Sparkles className="h-3 w-3"/>{t("projects.filters")[1]}</span>}</div>
      <span className="text-[9px] font-bold uppercase tracking-[.16em] text-muted-foreground/70">{item.tag}</span>
    </div>
    <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{item.title}</h2>
    <p className="mt-2 text-sm text-muted-foreground">{item.subtitle}</p>

    {isFeatured ? (
      <>
        <div className="mt-8 flex gap-1 overflow-x-auto whitespace-nowrap border-b border-border [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">{item.tabs.map((label, i) => <button key={label} onClick={() => setTab(i)} className={`shrink-0 border-b-2 px-3 py-3 text-[10px] font-bold uppercase tracking-wider transition ${tab === i ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{label}</button>)}</div>
        <motion.p key={tab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className={`min-h-28 py-7 text-base leading-7 ${tab === 3 ? "text-primary" : "text-muted-foreground"}`}>{item.tabContent[tab]}</motion.p>
      </>
    ) : (
      <>
        <div className="mt-8 flex gap-1 overflow-x-auto whitespace-nowrap border-b border-border [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">{carTabs.map(key => <span key={key} className="shrink-0 border-b-2 border-transparent px-3 py-3 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/70">{t(`projects.carLabels.${key}`)}</span>)}</div>
        <div className="py-7 space-y-5">
          <div><p className="text-[10px] font-bold uppercase tracking-wider text-primary">{t("projects.carLabels.context")}</p><p className="mt-2 text-base leading-7 text-muted-foreground">{item.context}</p></div>
          <div><p className="text-[10px] font-bold uppercase tracking-wider text-primary">{t("projects.carLabels.action")}</p>{Array.isArray(item.action) ? <ul className="mt-2 space-y-2">{item.action.map(a => <li key={a} className="flex gap-3 text-base leading-7 text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary"/><span>{a}</span></li>)}</ul> : <p className="mt-2 text-base leading-7 text-muted-foreground">{item.action}</p>}</div>
          <div><p className="text-[10px] font-bold uppercase tracking-wider text-primary">{t("projects.carLabels.result")}</p><p className="mt-2 text-base leading-7 text-primary">{item.result}</p></div>
        </div>
      </>
    )}

    {item.kpis && <div className="mt-2 grid grid-cols-2 gap-px border border-border bg-border sm:grid-cols-4">{item.kpis.map(k => <div key={k.label} className="bg-card p-4"><strong className="block text-xl font-bold tracking-tight text-primary">{k.value}</strong><span className="mt-1 block text-[10px] uppercase tracking-wider text-muted-foreground">{k.label}</span></div>)}</div>}
  </motion.article>;
}