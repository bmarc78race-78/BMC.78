import React from "react";
import { Beer, Fish, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import SectionLabel from "@/components/shared/SectionLabel";

const icons = { beer: Beer, fish: Fish, heart: Heart };

export default function BeyondBadge() {
  const { t } = useLanguage();
  return <section className="mx-auto max-w-7xl border-x border-border/60 px-6 py-24 md:px-10 lg:px-14">
    <SectionLabel>{t("about.beyondTitle")}</SectionLabel>
    <blockquote className="max-w-4xl text-3xl font-semibold leading-tight tracking-[-.03em] text-foreground sm:text-4xl lg:text-5xl">“{t("about.beyondQuote")}”</blockquote>
    <div className="mt-14 grid gap-6 md:grid-cols-3">{t("about.beyond").map(item => {
      const Icon = icons[item.icon] || Heart;
      return <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="group border border-border/60 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_0_30px_-10px_hsl(var(--primary)/0.4)]"><div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary"><Icon className="h-5 w-5"/></div><h3 className="mt-6 text-lg font-semibold text-foreground">{item.title}</h3><p className="mt-3 text-sm leading-7 text-muted-foreground">{item.text}</p></motion.div>;
    })}</div>
  </section>;
}