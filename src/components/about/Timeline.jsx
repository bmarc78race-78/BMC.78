import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import SectionLabel from "@/components/shared/SectionLabel";

export default function Timeline() {
  const { t } = useLanguage();
  return <section className="border-y border-border bg-muted"><div className="mx-auto max-w-7xl border-x border-border/60 px-6 py-24 md:px-10 lg:px-14">
    <SectionLabel>{t("about.title")}</SectionLabel>
    <div className="relative mt-10 border-l border-border">{t("about.timeline").map((item, i) => <motion.div key={item.year} initial={{ opacity: 0, x: 18, y: 20 }} whileInView={{ opacity: 1, x: 0, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }} className="relative border-b border-border py-9 pl-8">
      <span className="absolute -left-1.5 top-12 h-3 w-3 rounded-full border-2 border-muted bg-primary shadow-[0_0_16px_hsl(var(--primary)/0.8)]"/>
      <span className="text-[10px] font-bold uppercase tracking-[.2em] text-primary">{item.year}</span>
      <h3 className="mt-2 text-xl font-semibold text-foreground">{item.role}</h3>
      <p className="mt-1 text-sm font-medium text-foreground/80">{item.company}</p>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{item.text}</p>
      {item.items && <div className="mt-5 space-y-3">{item.items.map(sub => <div key={sub.company} className="border-l border-border pl-4"><p className="text-sm font-semibold text-foreground">{sub.company}</p><p className="mt-1 text-sm leading-6 text-muted-foreground/80">{sub.text}</p></div>)}</div>}
    </motion.div>)}
    </div>
  </div></section>;
}