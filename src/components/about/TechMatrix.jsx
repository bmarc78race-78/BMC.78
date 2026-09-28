import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function TechMatrix() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const tabs = t("about.stackTabs");
  const items = t("about.stack")[active] || [];
  return <section className="border-b border-border/70"><div className="mx-auto max-w-7xl border-x border-border/60 px-6 py-24 md:px-10 lg:px-14">
    <div className="mb-10 flex items-center gap-3"><Cpu className="h-5 w-5 text-primary"/><h2 className="text-3xl font-bold tracking-tight text-foreground">{t("about.stackTitle")}</h2></div>
    <div className="flex gap-2 overflow-x-auto whitespace-nowrap border-b border-border pb-px [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">{tabs.map((tab, i) => <button key={tab} onClick={() => setActive(i)} className={`shrink-0 border-b-2 px-4 py-3 text-xs font-semibold uppercase tracking-wider transition-colors ${active === i ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{tab}</button>)}</div>
    <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4">{items.map((item, i) => <motion.div key={item} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .04 }} className="border border-border/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.4)]"><span className="text-[10px] font-mono text-muted-foreground/60">{String(i + 1).padStart(2, "0")}</span><p className="mt-8 text-sm font-semibold text-foreground">{item}</p></motion.div>)}</div>
  </div></section>;
}