import React, { useState } from "react";
import {
  Download,
  Eye,
  Printer,
  FileText,
} from "lucide-react";
import { jsPDF } from "jspdf";

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

  const buildCV = (cvLang) => {
    const data = resumeData[cvLang];
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
    });

    const PAGE_WIDTH = 210;
    const PAGE_HEIGHT = 297;

    const LEFT = 18;
    const RIGHT = 18;
    const CONTENT_WIDTH =
      PAGE_WIDTH - LEFT - RIGHT;

    const TOP = 18;
    const BOTTOM = 18;

    let y = TOP;

    const ensureSpace = (requiredHeight = 10) => {
      if (
        y + requiredHeight >
        PAGE_HEIGHT - BOTTOM
      ) {
        doc.addPage();
        y = TOP;
      }
    };

    const writeWrapped = (
      text,
      {
        fontSize = 9,
        fontStyle = "normal",
        color = [51, 65, 85],
        indent = 0,
        lineHeight = 4.7,
        spaceAfter = 2,
      } = {}
    ) => {
      doc.setFont(
        "helvetica",
        fontStyle
      );

      doc.setFontSize(fontSize);
      doc.setTextColor(...color);

      const availableWidth =
        CONTENT_WIDTH - indent;

      const lines =
        doc.splitTextToSize(
          text,
          availableWidth
        );

      const height =
        lines.length * lineHeight;

      ensureSpace(height + spaceAfter);

      doc.text(
        lines,
        LEFT + indent,
        y
      );

      y += height + spaceAfter;
    };

    const addSection = (title) => {
      ensureSpace(12);

      y += 2;

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(10);
      doc.setTextColor(
        37,
        99,
        235
      );

      doc.text(title, LEFT, y);

      y += 3;

      doc.setDrawColor(
        226,
        232,
        240
      );

      doc.line(
        LEFT,
        y,
        PAGE_WIDTH - RIGHT,
        y
      );

      y += 6;
    };

    const addExperience = (
      experience
    ) => {
      ensureSpace(18);

      doc.setFont(
        "helvetica",
        "bold"
      );

      doc.setFontSize(9.5);
      doc.setTextColor(
        15,
        23,
        42
      );

      const heading =
        `${experience.role} | ` +
        `${experience.company}`;

      const headingLines =
        doc.splitTextToSize(
          heading,
          CONTENT_WIDTH - 35
        );

      doc.text(
        headingLines,
        LEFT,
        y
      );

      doc.setFont(
        "helvetica",
        "normal"
      );

      doc.setFontSize(8);
      doc.setTextColor(
        100,
        116,
        139
      );

      doc.text(
        experience.period,
        PAGE_WIDTH - RIGHT,
        y,
        {
          align: "right",
        }
      );

      y +=
        Math.max(
          headingLines.length * 4.2,
          4.2
        ) + 2;

      experience.bullets.forEach(
        (bullet) => {
          writeWrapped(
            `- ${bullet}`,
            {
              fontSize: 8.4,
              color: [
                51,
                65,
                85,
              ],
              indent: 2,
              lineHeight: 4.3,
              spaceAfter: 1.5,
            }
          );
        }
      );

      y += 2;
    };

    // Header
    doc.setFont(
      "helvetica",
      "bold"
    );

    doc.setFontSize(19);
    doc.setTextColor(
      15,
      23,
      42
    );

    doc.text(
      data.name,
      LEFT,
      y
    );

    y += 7;

    writeWrapped(
      data.headline,
      {
        fontSize: 9.5,
        fontStyle: "bold",
        color: [
          37,
          99,
          235,
        ],
        lineHeight: 4.5,
        spaceAfter: 1,
      }
    );

    writeWrapped(
      data.contact,
      {
        fontSize: 8.2,
        color: [
          100,
          116,
          139,
        ],
        lineHeight: 4,
        spaceAfter: 3,
      }
    );

    doc.setDrawColor(
      203,
      213,
      225
    );

    doc.line(
      LEFT,
      y,
      PAGE_WIDTH - RIGHT,
      y
    );

    y += 6;

    // Summary
    addSection(
      data.summaryTitle
    );

    writeWrapped(
      data.summary,
      {
        fontSize: 8.8,
        lineHeight: 4.6,
        spaceAfter: 3,
      }
    );

    // Professional experience
    addSection(
      data.experienceTitle
    );

    data.experiences.forEach(
      addExperience
    );

    // Previous experience
    addSection(
      data.previousTitle
    );

    data.previousExperiences.forEach(
      addExperience
    );

    // Skills
    addSection(
      data.skillsTitle
    );

    data.skills.forEach(
      (item) => {
        writeWrapped(
          `- ${item}`,
          {
            fontSize: 8.5,
            indent: 2,
            lineHeight: 4.4,
          }
        );
      }
    );

    // Education
    addSection(
      data.educationTitle
    );

    data.education.forEach(
      (item) => {
        writeWrapped(
          `- ${item}`,
          {
            fontSize: 8.5,
            indent: 2,
            lineHeight: 4.4,
          }
        );
      }
    );

    return doc;
  };

  const download = (cvLang) => {
    const doc =
      buildCV(cvLang);

    doc.save(
      cvLang === "pt"
        ? "Bruno-Marques-Carvalho-CV-Executivo-PT.pdf"
        : "Bruno-Marques-Carvalho-Executive-Resume-EN.pdf"
    );
  };

  const preview =
    resumeData[
      lang === "en" ? "en" : "pt"
    ];

  return (
    <div>
      <h2 className="mb-5 text-xs font-bold uppercase tracking-[.2em] text-muted-foreground">
        {t(
          "contact.resumeLabel"
        )}
      </h2>

      <div className="flex items-start gap-5 border border-border bg-card/40 p-6">
        <div className="flex h-16 w-12 shrink-0 items-center justify-center border border-border bg-background">
          <FileText className="h-6 w-6 text-primary" />
        </div>

        <div className="flex-1">
          <h3 className="text-sm font-semibold text-foreground">
            {t(
              "contact.resumeTitle"
            )}
          </h3>

          <p className="mt-1.5 text-xs leading-5 text-muted-foreground">
            {t(
              "contact.resumeText"
            )}
          </p>
        </div>
      </div>

      <div className="mt-3 grid gap-2">
        <button
          onClick={() =>
            download("pt")
          }
          className="flex items-center justify-between bg-foreground px-5 py-3.5 text-xs font-semibold text-background transition hover:bg-primary hover:text-primary-foreground"
        >
          <span>
            {t(
              "contact.resumePt"
            )}
          </span>

          <Download className="h-4 w-4" />
        </button>

        <button
          onClick={() =>
            download("en")
          }
          className="flex items-center justify-between border border-border px-5 py-3.5 text-xs font-semibold text-foreground transition hover:border-primary hover:text-primary"
        >
          <span>
            {t(
              "contact.resumeEn"
            )}
          </span>

          <Download className="h-4 w-4" />
        </button>

        <button
          onClick={() =>
            setOpen(true)
          }
          className="flex items-center justify-between border border-border px-5 py-3.5 text-xs font-semibold text-muted-foreground transition hover:border-foreground/40 hover:text-foreground"
        >
          <span>
            {t(
              "contact.resumeView"
            )}
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
              {
                preview.name
              }
            </DialogTitle>
          </DialogHeader>

          <div
            id="resume-print"
            className="px-8 py-8 text-slate-800 print:px-4"
          >
            <div className="border-b border-slate-200 pb-5">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                {
                  preview.name
                }
              </h1>

              <p className="mt-1 text-sm font-semibold text-blue-600">
                {
                  preview.headline
                }
              </p>

              <p className="mt-2 text-xs leading-5 text-slate-500">
                {
                  preview.contact
                }
              </p>
            </div>

            <ResumeSection
              title={
                preview.summaryTitle
              }
            >
              <p>
                {
                  preview.summary
                }
              </p>
            </ResumeSection>

            <ResumeSection
              title={
                preview.experienceTitle
              }
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
              title={
                preview.previousTitle
              }
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
              title={
                preview.skillsTitle
              }
            >
              <ul className="space-y-2">
                {preview.skills.map(
                  (item) => (
                    <li
                      key={item}
                    >
                      • {item}
                    </li>
                  )
                )}
              </ul>
            </ResumeSection>

            <ResumeSection
              title={
                preview.educationTitle
              }
            >
              <ul className="space-y-2">
                {preview.education.map(
                  (item) => (
                    <li
                      key={item}
                    >
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
              {t(
                "contact.resumeClose"
              )}
            </Button>

            <Button
              onClick={() =>
                window.print()
              }
              className="gap-2"
            >
              <Printer className="h-4 w-4" />

              {t(
                "contact.resumePrint"
              )}
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
            {
              item.role
            }
          </h3>

          <p className="text-sm font-medium text-blue-600">
            {
              item.company
            }
          </p>
        </div>

        <p className="shrink-0 text-xs text-slate-500">
          {
            item.period
          }
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