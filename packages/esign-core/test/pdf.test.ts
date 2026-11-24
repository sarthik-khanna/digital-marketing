import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { PDFDocument } from "pdf-lib";
import { buildAgreement } from "../src/agreement.ts";
import { signedAgreementEmail } from "../src/email.ts";
import { contentHash, renderAgreementPdf, type SignatureRecord } from "../src/pdf.ts";
import { TINY_PNG, agreementInput } from "./fixtures.ts";

const signedAt = new Date("2026-11-24T10:00:00Z");

function signature(overrides: Partial<SignatureRecord> = {}): SignatureRecord {
  return {
    signerName: "Asha Rao",
    email: "asha@example.com",
    username: "asha.rao",
    signedAt,
    ip: "203.0.113.7",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0 Safari/537.36",
    contentHash: "a".repeat(64),
    image: TINY_PNG,
    ...overrides,
  };
}

describe("contentHash", () => {
  test("is a stable SHA-256 of the agreement text", () => {
    const doc = buildAgreement(agreementInput({ signedAt }));
    assert.match(contentHash(doc), /^[0-9a-f]{64}$/);
    assert.equal(contentHash(doc), contentHash(buildAgreement(agreementInput({ signedAt }))));
  });

  test("changes when any detail changes", () => {
    const base = contentHash(buildAgreement(agreementInput({ signedAt })));
    const otherPrice = agreementInput({ signedAt });
    otherPrice.plan = { ...otherPrice.plan, priceCents: 15_000 };
    assert.notEqual(contentHash(buildAgreement(otherPrice)), base);
  });
});

describe("renderAgreementPdf", () => {
  test("produces a readable PDF with the reference in its title", async () => {
    const bytes = await renderAgreementPdf(buildAgreement(agreementInput({ signedAt })), signature());
    assert.equal(Buffer.from(bytes.subarray(0, 5)).toString(), "%PDF-");

    const pdf = await PDFDocument.load(bytes);
    assert.ok(pdf.getPageCount() >= 1);
    assert.equal(pdf.getTitle(), "Digital Marketing Services Agreement TDM-ES-000042");
    assert.equal(pdf.getCreationDate()?.toISOString(), signedAt.toISOString());
  });

  test("copes with names outside the standard PDF character set", async () => {
    const input = agreementInput({ signedAt, client: { name: "Łukasz Żółć 李雷", username: "lukasz", email: "l@example.com" } });
    const bytes = await renderAgreementPdf(buildAgreement(input), signature({ signerName: "Łukasz Żółć 李雷", userAgent: null, ip: null }));
    assert.ok(bytes.length > 1000);
  });

  test("flows long content onto more pages", async () => {
    const input = agreementInput({ signedAt });
    input.plan = { ...input.plan, services: Array.from({ length: 80 }, (_, i) => `Service line ${i + 1} with a reasonably long description to wrap`) };
    const pdf = await PDFDocument.load(await renderAgreementPdf(buildAgreement(input), signature()));
    assert.ok(pdf.getPageCount() > 2);
  });

  test("rejects a signature that is not a PNG", async () => {
    await assert.rejects(renderAgreementPdf(buildAgreement(agreementInput({ signedAt })), signature({ image: new Uint8Array([1, 2, 3]) })));
  });
});

describe("signedAgreementEmail", () => {
  test("escapes the client's name in the HTML", () => {
    const doc = buildAgreement(agreementInput({ signedAt }));
    const email = signedAgreementEmail(doc, "<script>alert(1)</script> Rao", signedAt);
    assert.ok(!email.html.includes("<script>"));
    assert.ok(email.html.includes("&lt;script&gt;"));
    assert.match(email.subject, /TDM-ES-000042/);
    assert.match(email.text, /Signed: 24 Nov 2026, 10:00 UTC/);
  });
});
