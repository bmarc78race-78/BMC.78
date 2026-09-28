import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import SectionLabel from "@/components/shared/SectionLabel";

export default function HomeCTA() {
  const { t } = useLanguage();
  return <section className="mx-auto max-w-7xl border-x border-border/60 px-6 py-24 md:px-10 lg:px-14"><SectionLabel>{t("cta.label")}</SectionLabel><div className="flex flex-col justify-between gap-8 md:flex-row md:items-end"><motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl text-4xl font-bold tracking-[-.04em] text-foreground sm:text-6xl">{t("cta.title")}</motion.h2><Link to="/contato" className="inline-flex shrink-0 items-center gap-3 bg-foreground px-6 py-4 text-sm font-semibold text-background transition hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_30px_-6px_hsl(var(--primary)/0.5)]">{t("cta.action")}<ArrowRight className="h-4 w-4"/></Link></div></section>;
}