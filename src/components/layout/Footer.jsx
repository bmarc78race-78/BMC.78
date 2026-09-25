import React from "react";
import { ArrowUpRight, Linkedin, Mail, MapPin, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  const links = [
    { label: "linkedin", icon: Linkedin, href: "https://linkedin.com/in/bmarc78" },
    { label: "email", icon: Mail, href: "mailto:bmarc78@gmail.com" },
    { label: "whatsapp", icon: MessageCircle, href: "https://wa.me/5581981325226" }
  ];
  return <footer className="border-t border-border/70 bg-muted">
    <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">
      <p className="max-w-3xl text-lg leading-8 text-foreground/80">{t("footer.summary")}</p>
      <div className="mt-12 grid gap-10 md:grid-cols-12">
        <div className="md:col-span-5"><div className="mb-5 text-lg font-bold tracking-tight text-foreground">BMC<span className="text-primary">.78</span></div><div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="h-4 w-4 text-primary"/>{t("footer.location")}</div></div>
        <div className="md:col-span-3"><p className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground/70">{t("footer.explore")}</p><div className="space-y-3 text-sm text-muted-foreground"><Link className="block transition-colors hover:text-primary" to="/sobre">{t("nav.about")}</Link><Link className="block transition-colors hover:text-primary" to="/projetos">{t("nav.projects")}</Link></div></div>
        <div className="md:col-span-4"><p className="mb-4 text-[10px] font-bold uppercase tracking-[.2em] text-muted-foreground/70">{t("footer.connect")}</p><div className="space-y-3">{links.map(({ label, icon: Icon, href }) => <a key={label} href={href} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-muted-foreground transition-colors hover:text-primary"><Icon className="h-4 w-4"/>{t(`footer.${label}`)}<ArrowUpRight className="ml-auto h-3.5 w-3.5 text-muted-foreground/40"/></a>)}</div></div>
      </div>
    </div>
    <div className="border-t border-border/60"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-[11px] uppercase tracking-widest text-muted-foreground/70 sm:flex-row sm:justify-between lg:px-8"><span>© {new Date().getFullYear()} Bruno Marques Carvalho. {t("footer.rights")}</span><span className="text-primary/80">{t("footer.method")}</span></div></div>
  </footer>;
}