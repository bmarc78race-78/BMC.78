import React, { useState } from "react";
import { Download, Eye, Printer, FileText } from "lucide-react";
import { jsPDF } from "jspdf";
import { useLanguage } from "@/context/LanguageContext";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function ResumeDownload() {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const buildCV = (cvLang) => {
    const doc = new jsPDF();
    const isPt = cvLang === "pt";
    let y = 24;
    doc.setFont("helvetica", "bold"); doc.setFontSize(22); doc.setTextColor(15, 23, 42); doc.text("BRUNO MARQUES CARVALHO", 20, y);
    y += 8; doc.setFontSize(10); doc.setTextColor(37, 99, 235); doc.text(isPt ? "Executivo de Operações | S&OP/S&OE | Inteligência Comercial | IA Aplicada" : "Operations Executive | S&OP/S&OE | Commercial Intelligence | Applied AI", 20, y);
    y += 10; doc.setFont("helvetica", "normal"); doc.setTextColor(100, 116, 139); doc.setFontSize(9); doc.text("Jaboatão dos Guararapes / Recife - PE, Brasil  |  +55 81 98132-5226  |  bmarc78@gmail.com  |  linkedin.com/in/bmarc78", 20, y);
    y += 12; doc.setDrawColor(226, 232, 240); doc.line(20, y, 190, y); y += 10;
    const section = (title) => { doc.setFont("helvetica", "bold"); doc.setFontSize(11); doc.setTextColor(15, 23, 42); doc.text(title, 20, y); y += 6; doc.setFont("helvetica", "normal"); doc.setFontSize(9); doc.setTextColor(51, 65, 85); };
    const line = (text) => { doc.text(text, 20, y); y += 5; };
    section(isPt ? "RESUMO EXECUTIVO" : "EXECUTIVE SUMMARY");
    line(isPt ? "27 anos transformando complexidade operacional em resultados mensuráveis." : "27 years turning operational complexity into measurable results.");
    line(isPt ? "Do chão de fábrica ao C-Level: governanca, dados e IA aplicada." : "From the factory floor to the C-Suite: governance, data and applied AI.");
    y += 4;
    section(isPt ? "DIFERENCIAIS" : "KEY STRENGTHS");
    line("- S&OP / S&OE  -  Lean Manufacturing  -  Metodologia RACE  -  SCOR");
    line("- Power BI  -  Agentes de IA  -  Python  -  SQL  -  Modelagem Financeira");
    line("- SAP (MM/B1)  -  Salesforce  -  Jira  -  OKRs  -  Balanced Scorecard");
    y += 4;
    section(isPt ? "CASES DE DESTAQUE" : "FLAGSHIP CASES");
    line(isPt ? "UM Telecom: +15% projetos, -12% lead time, -10% estoque, +5% FCR." : "UM Telecom: +15% projects, -12% lead time, -10% inventory, +5% FCR.");
    line(isPt ? "Solar Coca-Cola: CAPEX US$ 4M, ciclo 17->10 dias, +1,4 p.p. market share." : "Solar Coca-Cola: US$ 4M CAPEX, cycle 17->10 days, +1.4 pp market share.");
    line(isPt ? "Dolphin Noronha: -1% CMV, +3% margem, nota 9.5+ no Booking." : "Dolphin Noronha: -1% COGS, +3% margin, 9.5+ Booking score.");
    line(isPt ? "Bravi: ciclo de metas de 5 dias para 4h (-90%)." : "Bravi: target cycle 5 days to 4h (-90%).");
    return doc;
  };

  const download = (cvLang) => { const doc = buildCV(cvLang); doc.save(cvLang === "pt" ? "Bruno-Marques-Carvalho-CV-PT.pdf" : "Bruno-Marques-Carvalho-Resume-EN.pdf"); };

  return <div>
    <h2 className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-muted-foreground">{t("contact.resumeLabel")}</h2>
    <div className="flex items-start gap-5 border border-border bg-card/40 p-6">
      <div className="flex h-16 w-12 shrink-0 items-center justify-center border border-border bg-background"><FileText className="h-6 w-6 text-primary"/></div>
      <div className="flex-1"><h3 className="text-sm font-semibold text-foreground">{t("contact.resumeTitle")}</h3><p className="mt-1.5 text-xs leading-5 text-muted-foreground">{t("contact.resumeText")}</p></div>
    </div>
    <div className="mt-3 grid gap-2">
      <button onClick={() => download("pt")} className="flex items-center justify-between bg-foreground px-5 py-3.5 text-xs font-semibold text-background transition hover:bg-primary hover:text-primary-foreground"><span>{t("contact.resumePt")}</span><Download className="h-4 w-4"/></button>
      <button onClick={() => download("en")} className="flex items-center justify-between border border-border px-5 py-3.5 text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary"><span>{t("contact.resumeEn")}</span><Download className="h-4 w-4"/></button>
      <button onClick={() => setOpen(true)} className="flex items-center justify-between border border-border px-5 py-3.5 text-xs font-semibold text-muted-foreground transition hover:border-foreground/40 hover:text-foreground"><span>{t("contact.resumeView")}</span><Eye className="h-4 w-4"/></button>
    </div>

    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-white p-0">
        <DialogHeader className="border-b border-slate-200 px-8 py-5"><DialogTitle className="text-lg font-bold text-slate-900">{t("contact.resumeTitle")}</DialogTitle></DialogHeader>
        <div className="px-8 py-8 text-slate-800 print:px-4">
          <div className="border-b border-slate-200 pb-5">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">BRUNO MARQUES CARVALHO</h1>
            <p className="mt-1 text-sm font-semibold text-blue-600">{lang === "pt" ? "Executivo de Operações | S&OP/S&OE | Inteligência Comercial | IA Aplicada" : "Operations Executive | S&OP/S&OE | Commercial Intelligence | Applied AI"}</p>
            <p className="mt-2 text-xs text-slate-500">Jaboatão dos Guararapes / Recife - PE, Brasil · +55 81 98132-5226 · bmarc78@gmail.com · linkedin.com/in/bmarc78</p>
          </div>
          <div className="mt-6"><h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">{lang === "pt" ? "Resumo Executivo" : "Executive Summary"}</h2><p className="mt-2 text-sm leading-6 text-slate-700">{lang === "pt" ? "27 anos transformando complexidade operacional em resultados mensuráveis. Do chão de fábrica ao C-Level: governança de dados, S&OP/S&OE e IA aplicada à decisão executiva." : "27 years turning operational complexity into measurable results. From the factory floor to the C-Suite: data governance, S&OP/S&OE and AI applied to executive decision-making."}</p></div>
          <div className="mt-6"><h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">{lang === "pt" ? "Cases de Destaque" : "Flagship Cases"}</h2><ul className="mt-2 space-y-2 text-sm leading-6 text-slate-700"><li>• UM Telecom — +15% projetos, -12% lead time, -10% estoque, +5% FCR</li><li>• Solar Coca-Cola — CAPEX US$ 4M, ciclo 17→10 dias, +1,4 p.p. market share</li><li>• Dolphin Noronha — -1% CMV, +3% margem, nota 9.5+ no Booking</li><li>• Bravi — ciclo de metas de 5 dias para 4h (-90%)</li></ul></div>
          <div className="mt-6"><h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">{lang === "pt" ? "Tech Stack" : "Tech Stack"}</h2><p className="mt-2 text-sm leading-6 text-slate-700">S&OP/S&OE · Lean · RACE · SCOR · Power BI · Agentes de IA · Python · SQL · SAP (MM/B1) · Salesforce · Jira · OKRs · BSC</p></div>
        </div>
        <DialogFooter className="border-t border-slate-200 px-8 py-4 print:hidden">
          <Button variant="outline" onClick={() => setOpen(false)}>{t("contact.resumeClose")}</Button>
          <Button onClick={() => window.print()} className="gap-2"><Printer className="h-4 w-4"/>{t("contact.resumePrint")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>;
}