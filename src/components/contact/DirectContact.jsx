import React from "react";
import { MessageCircle, Mail, Linkedin, MapPin } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function DirectContact() {
  const { t } = useLanguage();
  const waMsg = encodeURIComponent(t("contact.whatsappMsg"));
  const mailSubject = encodeURIComponent(t("contact.emailSubject"));
  const links = [
    { label: t("contact.whatsapp"), icon: MessageCircle, href: `https://wa.me/5581981325226?text=${waMsg}`, accent: "hover:border-primary hover:text-primary" },
    { label: t("contact.email"), icon: Mail, href: `mailto:bmarc78@gmail.com?subject=${mailSubject}`, accent: "hover:border-primary hover:text-primary" },
    { label: t("contact.linkedin"), icon: Linkedin, href: "https://linkedin.com/in/bmarc78", accent: "hover:border-primary hover:text-primary" }
  ];
  return <div>
    <h2 className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-muted-foreground">{t("contact.directLabel")}</h2>
    <div className="space-y-3">{links.map(({ label, icon: Icon, href, accent }) => <a key={label} href={href} target="_blank" rel="noreferrer" className={`flex items-center justify-between border border-border p-4 text-sm font-semibold text-foreground transition-colors ${accent}`}><span className="flex items-center gap-3"><Icon className="h-4 w-4"/>{label}</span><span className="font-mono text-[10px] text-muted-foreground/60">↗</span></a>)}</div>
    <div className="mt-4 flex items-center gap-3 border border-border/60 bg-card/40 p-4 text-xs text-muted-foreground"><MapPin className="h-4 w-4 shrink-0 text-muted-foreground/60"/><span>{t("contact.city")}</span></div>
  </div>;
}