import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import SectionLabel from "@/components/shared/SectionLabel";
import DirectContact from "@/components/contact/DirectContact";
import ResumeDownload from "@/components/contact/ResumeDownload";
import ContactForm from "@/components/contact/ContactForm";

export default function Contact() {
  const { t } = useLanguage();
  return <section className="mx-auto max-w-7xl border-x border-border/60 px-6 py-20 md:px-10 lg:px-14 lg:py-28">
    <SectionLabel>{t("contact.eyebrow")}</SectionLabel>
    <div className="grid gap-14 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <motion.h1 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl font-bold leading-[1.05] tracking-[-.04em] text-foreground sm:text-5xl lg:text-6xl">{t("contact.title")}</motion.h1>
        <p className="mt-7 text-base leading-7 text-muted-foreground">{t("contact.intro")}</p>
        <div className="mt-10 space-y-10"><DirectContact/><ResumeDownload/></div>
      </div>
      <div className="lg:col-span-7"><ContactForm/></div>
    </div>
  </section>;
}