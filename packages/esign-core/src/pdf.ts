// Renders the signed agreement as an A4 PDF with pdf-lib (pure JavaScript, no
// headless browser), so it runs in a Server Action and in unit tests alike.
import { createHash } from "node:crypto";
import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFImage, type PDFPage } from "pdf-lib";
import { agreementText, type AgreementDocument } from "./agreement.ts";
import { formatDateTime } from "./format.ts";

export type SignatureRecord = {
  signerName: string;
  email: string;
  username: string;
  signedAt: Date;
  ip: string | null;
  userAgent: string | null;
  /** SHA-256 of the agreement text; see contentHash(). */
  contentHash: string;
  /** The drawn or typed signature, as PNG bytes. */
  image: Uint8Array;
};

/** SHA-256 (hex) of the agreement text the client saw and signed. */
export function contentHash(doc: AgreementDocument): string {
  return createHash("sha256").update(agreementText(doc), "utf8").digest("hex");
}

const PAGE: [number, number] = [595.28, 841.89]; // A4 in points
const MARGIN = 56;
const FOOTER_SPACE = 40;
const WIDTH = PAGE[0] - MARGIN * 2;

// Brand colours from the TDM logo.
const INK = rgb(0.008, 0.039, 0.157); // #020A28
const BLUE = rgb(0, 0.282, 0.973); // #0048F8
const MUTED = rgb(0.29, 0.318, 0.439); // #4A5170
const RULE = rgb(0.89, 0.9, 0.94);
const TINT = rgb(0.957, 0.961, 0.984);

type Fonts = { regular: PDFFont; bold: PDFFont };
type TextStyle = { size: number; font?: "regular" | "bold"; color?: ReturnType<typeof rgb>; indent?: number; lineGap?: number };

/**
 * The standard PDF fonts only cover Western European characters (WinAnsi).
 * Anything else is first reduced to its base letter ("ő" -> "o") and, failing
 * that, replaced with "?", so an unusual name can never break the PDF.
 */
function makeSanitiser(font: PDFFont) {
  const known = new Map<string, boolean>();
  const encodable = (char: string) => {
    let ok = known.get(char);
    if (ok === undefined) {
      try {
        font.encodeText(char);
        ok = true;
      } catch {
        ok = false;
      }
      known.set(char, ok);
    }
    return ok;
  };

  return (text: string) =>
    Array.from(text.replace(/[\u0000-\u0009\u000b-\u001f\u007f]/g, ""))
      .map((char) => {
        if (char === "\n" || encodable(char)) return char;
        const base = char.normalize("NFKD").replace(/\p{M}/gu, "");
        return base && Array.from(base).every(encodable) ? base : "?";
      })
      .join("");
}

/** Greedy word wrap; words longer than a line (hashes, user agents) are split by character. */
function wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const fits = (value: string) => font.widthOfTextAtSize(value, size) <= maxWidth;
  const lines: string[] = [];

  for (const paragraph of text.split("\n")) {
    let line = "";
    for (const word of paragraph.split(/\s+/).filter(Boolean)) {
      const candidate = line ? `${line} ${word}` : word;
      if (fits(candidate)) {
        line = candidate;
        continue;
      }
      if (line) lines.push(line);
      let rest = word;
      while (!fits(rest)) {
        let cut = rest.length - 1;
        while (cut > 1 && !fits(rest.slice(0, cut))) cut--;
        lines.push(rest.slice(0, cut));
        rest = rest.slice(cut);
      }
      line = rest;
    }
    lines.push(line);
  }
  return lines;
}

/** A cursor that writes top to bottom and starts a new page when it runs out of room. */
function createWriter(pdf: PDFDocument, fonts: Fonts) {
  let page: PDFPage = pdf.addPage(PAGE);
  let y = PAGE[1] - MARGIN;
  const safe = makeSanitiser(fonts.regular);

  const ensure = (height: number) => {
    if (y - height < MARGIN + FOOTER_SPACE) {
      page = pdf.addPage(PAGE);
      y = PAGE[1] - MARGIN;
    }
  };

  const text = (value: string, style: TextStyle) => {
    const font = fonts[style.font ?? "regular"];
    const indent = style.indent ?? 0;
    const lineHeight = style.size * 1.45;
    for (const line of wrap(safe(value), font, style.size, WIDTH - indent)) {
      ensure(lineHeight);
      page.drawText(line, { x: MARGIN + indent, y: y - style.size, size: style.size, font, color: style.color ?? INK });
      y -= lineHeight;
    }
    y -= style.lineGap ?? 0;
  };

  const rule = (gapBefore = 8, gapAfter = 14) => {
    y -= gapBefore;
    page.drawLine({ start: { x: MARGIN, y }, end: { x: MARGIN + WIDTH, y }, thickness: 0.75, color: RULE });
    y -= gapAfter;
  };

  return {
    safe,
    text,
    rule,
    ensure,
    space: (points: number) => {
      y -= points;
    },
    get page() {
      return page;
    },
    get y() {
      return y;
    },
    moveTo: (value: number) => {
      y = value;
    },
  };
}

type Writer = ReturnType<typeof createWriter>;

function writeHeader(w: Writer, doc: AgreementDocument) {
  w.text(doc.provider.name.toUpperCase(), { size: 9, font: "bold", color: BLUE, lineGap: 4 });
  w.text(doc.title, { size: 20, font: "bold", lineGap: 2 });
  w.text(`Reference ${doc.reference}  ·  Terms version ${doc.termsVersion}`, { size: 9, color: MUTED });
  w.rule();
}

/** Provider and client side by side. */
function writeParties(w: Writer, doc: AgreementDocument, fonts: Fonts) {
  const columnWidth = (WIDTH - 24) / 2;
  const columns = [
    { label: "SERVICE PROVIDER", party: doc.provider, x: MARGIN },
    { label: "CLIENT", party: doc.client, x: MARGIN + columnWidth + 24 },
  ];
  w.ensure(90);
  const top = w.y;
  let lowest = top;

  for (const { label, party, x } of columns) {
    let y = top;
    const draw = (value: string, size: number, font: PDFFont, color = INK) => {
      for (const line of wrap(w.safe(value), font, size, columnWidth)) {
        w.page.drawText(line, { x, y: y - size, size, font, color });
        y -= size * 1.45;
      }
    };
    draw(label, 8, fonts.bold, MUTED);
    y -= 3;
    draw(party.name, 11, fonts.bold);
    for (const line of party.lines) draw(line, 9.5, fonts.regular, MUTED);
    lowest = Math.min(lowest, y);
  }
  w.moveTo(lowest - 14);
}

/** The plan summary as a tinted label/value table. */
function writeSummary(w: Writer, doc: AgreementDocument, fonts: Fonts) {
  const labelWidth = 110;
  const size = 10;
  const rows = doc.summary.map((row) => ({
    label: w.safe(row.label),
    lines: wrap(w.safe(row.value), fonts.regular, size, WIDTH - labelWidth - 28),
  }));
  const height = rows.reduce((sum, row) => sum + row.lines.length * size * 1.45 + 6, 0) + 18;

  w.ensure(height);
  w.page.drawRectangle({ x: MARGIN, y: w.y - height, width: WIDTH, height, color: TINT });
  let y = w.y - 12;
  for (const row of rows) {
    w.page.drawText(row.label, { x: MARGIN + 14, y: y - size, size, font: fonts.bold, color: INK });
    for (const line of row.lines) {
      w.page.drawText(line, { x: MARGIN + 14 + labelWidth, y: y - size, size, font: fonts.regular, color: INK });
      y -= size * 1.45;
    }
    y -= 6;
  }
  w.moveTo(w.y - height - 18);
}

function writeBody(w: Writer, doc: AgreementDocument) {
  w.text("Schedule A: Included services", { size: 12, font: "bold", lineGap: 4 });
  for (const service of doc.services) {
    w.ensure(16);
    w.page.drawCircle({ x: MARGIN + 4, y: w.y - 6.5, size: 1.6, color: BLUE });
    w.text(service, { size: 10, indent: 14, lineGap: 2 });
  }
  w.space(10);

  w.text("Terms and conditions", { size: 12, font: "bold", lineGap: 4 });
  doc.sections.forEach((section, i) => {
    w.ensure(40);
    w.text(`${i + 1}. ${section.heading}`, { size: 10.5, font: "bold", lineGap: 2 });
    for (const paragraph of section.paragraphs) w.text(paragraph, { size: 9.5, color: INK, lineGap: 4 });
    w.space(4);
  });
}

function writeSignature(w: Writer, signature: SignatureRecord, image: PDFImage) {
  const box = { width: 220, height: 80 };
  const scale = Math.min(box.width / image.width, box.height / image.height, 1);
  const size = { width: image.width * scale, height: image.height * scale };

  w.ensure(box.height + 120);
  w.rule(4, 16);
  w.text("Signed by the Client", { size: 12, font: "bold", lineGap: 8 });
  w.page.drawImage(image, { x: MARGIN, y: w.y - size.height, width: size.width, height: size.height });
  w.space(box.height + 6);
  w.page.drawLine({ start: { x: MARGIN, y: w.y }, end: { x: MARGIN + box.width, y: w.y }, thickness: 0.75, color: MUTED });
  w.space(6);
  w.text(signature.signerName, { size: 10.5, font: "bold" });
  w.text(`Signed electronically on ${formatDateTime(signature.signedAt)}`, { size: 9, color: MUTED, lineGap: 14 });
}

function writeAuditTrail(w: Writer, signature: SignatureRecord) {
  const rows: [string, string][] = [
    ["Signer", signature.signerName],
    ["Email", signature.email],
    ["Username", signature.username],
    ["Signed at", formatDateTime(signature.signedAt)],
    ["IP address", signature.ip ?? "Not recorded"],
    ["Device", signature.userAgent ?? "Not recorded"],
    ["Document fingerprint (SHA-256)", signature.contentHash],
  ];

  w.ensure(150);
  w.text("Electronic signature record", { size: 10.5, font: "bold", lineGap: 4 });
  for (const [label, value] of rows) {
    w.text(label, { size: 8, font: "bold", color: MUTED });
    w.text(value, { size: 8.5, lineGap: 3 });
  }
  w.text(
    "The fingerprint is a SHA-256 hash of the full text of this agreement as signed, including the details above. Any change to the text produces a different fingerprint.",
    { size: 8, color: MUTED },
  );
}

function writeFooters(pdf: PDFDocument, doc: AgreementDocument, fonts: Fonts) {
  const pages = pdf.getPages();
  const safe = makeSanitiser(fonts.regular);
  const left = safe(`${doc.provider.name}  ·  ${doc.title}  ·  ${doc.reference}`);
  pages.forEach((page, i) => {
    const right = `Page ${i + 1} of ${pages.length}`;
    page.drawText(left, { x: MARGIN, y: MARGIN - 16, size: 8, font: fonts.regular, color: MUTED });
    page.drawText(right, {
      x: MARGIN + WIDTH - fonts.regular.widthOfTextAtSize(right, 8),
      y: MARGIN - 16,
      size: 8,
      font: fonts.regular,
      color: MUTED,
    });
  });
}

/** The signed agreement as PDF bytes: content, signature and the signature record. */
export async function renderAgreementPdf(doc: AgreementDocument, signature: SignatureRecord): Promise<Uint8Array> {
  const pdf = await PDFDocument.create();
  const fonts: Fonts = {
    regular: await pdf.embedFont(StandardFonts.Helvetica),
    bold: await pdf.embedFont(StandardFonts.HelveticaBold),
  };
  const image = await pdf.embedPng(signature.image);

  pdf.setTitle(`${doc.title} ${doc.reference}`);
  pdf.setAuthor(doc.provider.name);
  pdf.setSubject(`Signed by ${signature.signerName}`);
  pdf.setCreator(`${doc.provider.name} E-Sign`);
  pdf.setProducer(`${doc.provider.name} E-Sign`);
  pdf.setCreationDate(signature.signedAt);
  pdf.setModificationDate(signature.signedAt);

  const w = createWriter(pdf, fonts);
  writeHeader(w, doc);
  writeParties(w, doc, fonts);
  writeSummary(w, doc, fonts);
  writeBody(w, doc);
  writeSignature(w, signature, image);
  writeAuditTrail(w, signature);
  writeFooters(pdf, doc, fonts);

  return pdf.save();
}
