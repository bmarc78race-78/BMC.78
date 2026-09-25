import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

export default function Authority() {
  const { t } = useLanguage();
  return <section className="border-y border-border bg-muted py-12"><p className="mb-10 text-center text-[10px] font-bold uppercase tracking-[.25em] text-muted-foreground/70">{t("authority.label")}</p><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-10 gap-y-6 px-6">{t("authority.items").map((item, i) => <motion.span key={item} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * .04 }} className="text-sm font-bold tracking-[.04em] text-muted-foreground/70 transition hover:text-foreground">{item}</motion.span>)}</div></section>;
}