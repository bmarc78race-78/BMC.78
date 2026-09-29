import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { jsPDF } from "jspdf";
import { resumeData } from "../src/components/contact/resumeData.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const outputDir = path.resolve(__dirname, "../public/cv");

fs.mkdirSync(outputDir, {
  recursive: true,
});

function cleanText(value = "") {
  return String(value)
    .replace(/\u00a0/g, " ")
    .replace(/→/g, "->")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/…/g, "...")
    .trim();
}

function generateResume(language) {
  const data = resumeData[language];

  if (!data) {
    throw new Error(
      `Currículo não encontrado para o idioma: ${language}`,
    );
  }

  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const PAGE_WIDTH = 210;
  const PAGE_HEIGHT = 297;

  const LEFT = 17;
  const RIGHT = 17;
  const TOP = 16;
  const BOTTOM = 17;

  const CONTENT_WIDTH =
    PAGE_WIDTH - LEFT - RIGHT;

  let y = TOP;

  function ensureSpace(requiredHeight = 10) {
    if (
      y + requiredHeight >
      PAGE_HEIGHT - BOTTOM
    ) {
      addPageNumber();

      doc.addPage();

      y = TOP;
    }
  }

  function addPageNumber() {
    const currentPage =
      doc.getNumberOfPages();

    doc.setFont(
      "helvetica",
      "normal",
    );

    doc.setFontSize(7);
    doc.setTextColor(
      148,
      163,
      184,
    );

    doc.text(
      String(currentPage),
      PAGE_WIDTH - RIGHT,
      PAGE_HEIGHT - 8,
      {
        align: "right",
      },
    );
  }

  function writeWrapped(
    text,
    {
      fontSize = 8.5,
      fontStyle = "normal",
      color = [51, 65, 85],
      indent = 0,
      lineHeight = 4.3,
      spaceAfter = 2,
    } = {},
  ) {
    const safeText =
      cleanText(text);

    doc.setFont(
      "helvetica",
      fontStyle,
    );

    doc.setFontSize(fontSize);
    doc.setTextColor(...color);

    const availableWidth =
      CONTENT_WIDTH - indent;

    const lines =
      doc.splitTextToSize(
        safeText,
        availableWidth,
      );

    const height =
      lines.length * lineHeight;

    ensureSpace(
      height + spaceAfter,
    );

    doc.text(
      lines,
      LEFT + indent,
      y,
    );

    y +=
      height + spaceAfter;
  }

  function addSection(title) {
    ensureSpace(12);

    y += 2;

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.setFontSize(9.5);

    doc.setTextColor(
      37,
      99,
      235,
    );

    doc.text(
      cleanText(title),
      LEFT,
      y,
    );

    y += 3;

    doc.setDrawColor(
      226,
      232,
      240,
    );

    doc.line(
      LEFT,
      y,
      PAGE_WIDTH - RIGHT,
      y,
    );

    y += 5;
  }

  function addExperience(
    experience,
  ) {
    ensureSpace(18);

    doc.setFont(
      "helvetica",
      "bold",
    );

    doc.setFontSize(9);

    doc.setTextColor(
      15,
      23,
      42,
    );

    const heading =
      `${cleanText(experience.role)} | ` +
      `${cleanText(experience.company)}`;

    const headingLines =
      doc.splitTextToSize(
        heading,
        CONTENT_WIDTH - 38,
      );

    doc.text(
      headingLines,
      LEFT,
      y,
    );

    doc.setFont(
      "helvetica",
      "normal",
    );

    doc.setFontSize(7.5);

    doc.setTextColor(
      100,
      116,
      139,
    );

    doc.text(
      cleanText(
        experience.period,
      ),
      PAGE_WIDTH - RIGHT,
      y,
      {
        align: "right",
      },
    );

    y +=
      Math.max(
        headingLines.length *
          4.1,
        4.1,
      ) + 1;

    for (
      const bullet of
      experience.bullets
    ) {
      writeWrapped(
        `- ${bullet}`,
        {
          fontSize: 8.1,
          color: [
            51,
            65,
            85,
          ],
          indent: 2,
          lineHeight: 4.15,
          spaceAfter: 1.1,
        },
      );
    }

    y += 1.5;
  }

  // Header
  doc.setFont(
    "helvetica",
    "bold",
  );

  doc.setFontSize(18);

  doc.setTextColor(
    15,
    23,
    42,
  );

  doc.text(
    cleanText(data.name),
    LEFT,
    y,
  );

  y += 6;

  writeWrapped(
    data.headline,
    {
      fontSize: 9,
      fontStyle: "bold",
      color: [
        37,
        99,
        235,
      ],
      lineHeight: 4.3,
      spaceAfter: 1,
    },
  );

  writeWrapped(
    data.contact,
    {
      fontSize: 7.7,
      color: [
        100,
        116,
        139,
      ],
      lineHeight: 3.8,
      spaceAfter: 3,
    },
  );

  doc.setDrawColor(
    203,
    213,
    225,
  );

  doc.line(
    LEFT,
    y,
    PAGE_WIDTH - RIGHT,
    y,
  );

  y += 5;

  // Summary
  addSection(
    data.summaryTitle,
  );

  writeWrapped(
    data.summary,
    {
      fontSize: 8.3,
      lineHeight: 4.35,
      spaceAfter: 2,
    },
  );

  // Experience
  addSection(
    data.experienceTitle,
  );

  for (
    const experience of
    data.experiences
  ) {
    addExperience(experience);
  }

  // Previous experience
  addSection(
    data.previousTitle,
  );

  for (
    const experience of
    data.previousExperiences
  ) {
    addExperience(experience);
  }

  // Skills
  addSection(
    data.skillsTitle,
  );

  for (
    const item of data.skills
  ) {
    writeWrapped(
      `- ${item}`,
      {
        fontSize: 8.1,
        indent: 2,
        lineHeight: 4.15,
        spaceAfter: 1,
      },
    );
  }

  // Education
  addSection(
    data.educationTitle,
  );

  for (
    const item of
    data.education
  ) {
    writeWrapped(
      `- ${item}`,
      {
        fontSize: 8.1,
        indent: 2,
        lineHeight: 4.15,
        spaceAfter: 1,
      },
    );
  }

  addPageNumber();

  return doc;
}

function writePdf(
  language,
  filename,
) {
  const doc =
    generateResume(language);

  const arrayBuffer =
    doc.output("arraybuffer");

  const outputPath =
    path.join(
      outputDir,
      filename,
    );

  fs.writeFileSync(
    outputPath,
    Buffer.from(arrayBuffer),
  );

  const stats =
    fs.statSync(outputPath);

  console.log(
    `✓ ${filename} (${Math.round(stats.size / 1024)} KB)`,
  );
}

console.log(
  "\nGerando currículos executivos...\n",
);

writePdf(
  "pt",
  "bruno-carvalho-cv-pt.pdf",
);

writePdf(
  "en",
  "bruno-carvalho-resume-en.pdf",
);

console.log(
  "\n✓ Currículos gerados em public/cv/\n",
);