import React, { useState } from "react";
import {
  Download,
  Eye,
  Printer,
  FileText,
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { resumeData } from "./resumeData";

export default function ResumeDownload() {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const preview =
    resumeData[
      lang === "en" ? "en" : "pt"
    ];

  return (
    <div>
      <h2 className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-muted-foreground">
        {t("contact.resumeLabel")}
      </h2>

      <div className="flex items-start gap-5 border border-border bg-card/40 p-6">
        <div className="flex h-16 w-12 shrink-0 items-center justify-center border border-border bg-background">
          <FileText className="h-6 w-6 text-primary" />
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-foreground">
            {t("contact.resumeTitle")}
          </h3>

          <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
            {t("contact.resumeText")}
          </p>
        </div>
      </div>

      <div className="mt-3 grid gap-2">
        {/* PDF PT-BR */}
        <a
          href="/cv/bruno-carvalho-cv-pt.pdf"
          download="Bruno_Marques_Carvalho_CV_Executivo_PT.pdf"
          className="flex items-center justify-between bg-foreground px-5 py-3.5 text-xs font-semibold text-background transition hover:bg-primary hover:text-primary-foreground"
        >
          <span>
            {t("contact.resumePt")}
          </span>

          <Download className="h-4 w-4" />
        </a>

        {/* PDF EN */}
        <a
          href="/cv/bruno-carvalho-resume-en.pdf"
          download="Bruno_Marques_Carvalho_Executive_Resume_EN.pdf"
          className="flex items-center justify-between border border-border px-5 py-3.5 text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary"
        >
          <span>
            {t("contact.resumeEn")}
          </span>

          <Download className="h-4 w-4" />
        </a>

        {/* Preview dinâmico */}
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex items-center justify-between border border-border px-5 py-3.5 text-xs font-semibold text-muted-foreground transition hover:border-foreground/40 hover:text-foreground"
        >
          <span>
            {t("contact.resumeView")}
          </span>

          <Eye className="h-4 w-4" />
        </button>
      </div>

      <Dialog
        open={open}
        onOpenChange={setOpen}
      >
        <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto bg-white p-0">
          <DialogHeader className="border-b border-slate-200 px-8 py-5">
            <DialogTitle className="text-lg font-bold text-slate-900">
              {preview.name}
            </DialogTitle>
          </DialogHeader>

          <div
            id="resume-print"
            className="px-8 py-8 text-slate-800 print:px-4"
          >
            <div className="border-b border-slate-200 pb-5">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {preview.name}
              </h1>

              <p className="mt-1 text-sm font-semibold text-blue-600">
                {preview.headline}
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                {preview.contact}
              </p>
            </div>

            <ResumeSection
              title={preview.summaryTitle}
            >
              <p>
                {preview.summary}
              </p>
            </ResumeSection>

            <ResumeSection
              title={preview.experienceTitle}
            >
              <div className="space-y-6">
                {preview.experiences.map(
                  (item) => (
                    <Experience
                      key={`${item.company}-${item.period}`}
                      item={item}
                    />
                  )
                )}
              </div>
            </ResumeSection>

            <ResumeSection
              title={preview.previousTitle}
            >
              <div className="space-y-6">
                {preview.previousExperiences.map(
                  (item) => (
                    <Experience
                      key={`${item.company}-${item.period}`}
                      item={item}
                    />
                  )
                )}
              </div>
            </ResumeSection>

            <ResumeSection
              title={preview.skillsTitle}
            >
              <ul className="space-y-2">
                {preview.skills.map(
                  (item) => (
                    <li key={item}>
                      • {item}
                    </li>
                  )
                )}
              </ul>
            </ResumeSection>

            <ResumeSection
              title={preview.educationTitle}
            >
              <ul className="space-y-2">
                {preview.education.map(
                  (item) => (
                    <li key={item}>
                      • {item}
                    </li>
                  )
                )}
              </ul>
            </ResumeSection>
          </div>

          <DialogFooter className="border-t border-slate-200 px-8 py-4 print:hidden">
            <Button
              variant="outline"
              onClick={() =>
                setOpen(false)
              }
            >
              {t("contact.resumeClose")}
            </Button>

            <Button
              onClick={() =>
                window.print()
              }
              className="gap-2"
            >
              <Printer className="h-4 w-4" />

              {t("contact.resumePrint")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

function ResumeSection({
  title,
  children,
}) {
  return (
    <section className="mt-7">
      <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400">
        {title}
      </h2>

      <div className="mt-3 text-sm leading-6 text-slate-700">
        {children}
      </div>
    </section>
  );
}

function Experience({
  item,
}) {
  return (
    <article>
      <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="font-semibold text-slate-900">
            {item.role}
          </h3>

          <p className="text-sm font-medium text-blue-600">
            {item.company}
          </p>
        </div>

        <p className="shrink-0 text-xs text-slate-500">
          {item.period}
        </p>
      </div>

      <ul className="mt-2 space-y-1.5">
        {item.bullets.map(
          (bullet) => (
            <li
              key={bullet}
              className="pl-3"
            >
              • {bullet}
            </li>
          )
        )}
      </ul>
    </article>
  );
}