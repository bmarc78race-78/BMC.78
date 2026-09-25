import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import SectionLabel from "@/components/shared/SectionLabel";
import Timeline from "@/components/about/Timeline";
import TechMatrix from "@/components/about/TechMatrix";
import BeyondBadge from "@/components/about/BeyondBadge";

export default function About() {
  const { t } = useLanguage();
  return <>
    <section className="mx-auto max-w-7xl border-x border-border/60 px-6 py-20 md:px-10 lg:px-14 lg:py-28">
      <div className="md:grid md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7"><SectionLabel>{t("about.eyebrow")}</SectionLabel><motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-5xl font-bold tracking-[-.05em] text-foreground sm:text-6xl lg:text-7xl">{t("about.title")}</motion.h1><p className="mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">{t("about.intro")}</p></div>
        <div className="mt-10 md:col-span-5 md:mt-0 md:border-l md:border-border/60 md:pl-12"><blockquote className="border-l-2 border-primary pl-5 text-2xl font-semibold leading-snug tracking-[-.02em] text-foreground sm:text-3xl">“{t("about.guidingQuote")}”</blockquote><p className="mt-4 text-xs font-bold uppercase tracking-[.2em] text-primary">Bruno Carvalho</p></div>
      </div>
    </section>
    <Timeline/>
    <TechMatrix/>
    <BeyondBadge/>
  </>;
}