import React, { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import SectionLabel from "@/components/shared/SectionLabel";
import CaseCard from "@/components/projects/CaseCard";

export default function Projects() {
  const { t } = useLanguage();
  const [filter, setFilter] = useState(0);
  const filters = t("projects.filters");
  const cases = t("projects.cases");
  const visible = filter === 0 ? cases : cases.filter(c => c.category === filters[filter]);
  return <section className="mx-auto max-w-7xl border-x border-border/60 px-6 py-20 md:px-10 lg:px-14 lg:py-28">
    <SectionLabel>{t("projects.eyebrow")}</SectionLabel>
    <div className="grid gap-8 border-b border-border pb-12 lg:grid-cols-12"><motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl font-bold tracking-[-.05em] text-foreground sm:text-7xl lg:col-span-8">{t("projects.title")}</motion.h1><p className="self-end text-lg leading-8 text-muted-foreground lg:col-span-4">{t("projects.intro")}</p></div>
    <div className="mt-10 flex flex-wrap gap-2">{filters.map((f, i) => <button key={f} onClick={() => setFilter(i)} className={`border px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-colors ${filter === i ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"}`}>{f}</button>)}</div>
    <div className="mt-10 grid gap-6">{visible.map(item => <CaseCard key={item.id} item={item}/>)}</div>
  </section>;
}