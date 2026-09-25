import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Metrics() {
  const { t } = useLanguage();
  return <section className="border-b border-border/70"><div className="mx-auto grid max-w-7xl grid-cols-1 border-x border-border/60 sm:grid-cols-2 lg:grid-cols-3">{t("metrics").map((item, i) => <motion.div key={item.value} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .06 }} className="group border-b border-r border-border/60 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_30px_-8px_hsl(var(--primary)/0.45)] lg:p-9"><div className="flex items-baseline gap-2"><strong className="text-3xl font-bold tracking-tight text-primary">{item.value}</strong><span className="text-xs uppercase tracking-wider text-muted-foreground">{item.label}</span></div><p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p></motion.div>)}</div></section>;
}