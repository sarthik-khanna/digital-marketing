import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { agreementStamp, agreementText, buildAgreement, provider } from "../src/agreement.ts";
import { addDays, agreementReference, formatDate, formatDateTime, formatMoney, formatPrice } from "../src/format.ts";
import { getPlan, plans } from "../src/plans.ts";
import { isAgreementStatus } from "../src/types.ts";
import { agreementInput } from "./fixtures.ts";

const summaryValue = (doc: ReturnType<typeof buildAgreement>, label: string) =>
  doc.summary.find((row) => row.label === label)?.value;

describe("format", () => {
  test("prints contract amounts with the currency code", () => {
    assert.equal(formatMoney(129_900, "USD"), "USD 1,299.00");
  });

  test("prints card prices without empty cents", () => {
    assert.equal(formatPrice(14_900, "USD"), "$149");
    assert.equal(formatPrice(14_950, "USD"), "$149.50");
  });

  test("formats dates in UTC", () => {
    const late = new Date("2026-11-24T23:30:00Z");
    assert.equal(formatDate(late), "24 Nov 2026");
    assert.equal(formatDateTime(late), "24 Nov 2026, 23:30 UTC");
    assert.equal(formatDate(addDays(late, 6)), "30 Nov 2026");
  });

  test("pads agreement references", () => {
    assert.equal(agreementReference(42), "TDM-ES-000042");
    assert.equal(agreementReference("1234567"), "TDM-ES-1234567");
  });
});

describe("plans", () => {
  test("offers weekly, monthly and quarterly plans with prices and services", () => {
    assert.deepEqual(
      plans.map((plan) => plan.id),
      ["weekly", "monthly", "quarterly"],
    );
    for (const plan of plans) {
      assert.ok(plan.priceCents > 0 && Number.isInteger(plan.priceCents));
      assert.ok(plan.durationDays > 0);
      assert.ok(plan.services.length > 0);
    }
  });

  test("finds a plan by id and ignores unknown ids", () => {
    assert.equal(getPlan("monthly")?.durationDays, 30);
    assert.equal(getPlan("yearly"), undefined);
  });

  test("recognises agreement statuses", () => {
    assert.ok(isAgreementStatus("completed"));
    assert.ok(!isAgreementStatus("toString"));
    assert.ok(!isAgreementStatus("deleted"));
  });
});

describe("buildAgreement", () => {
  test("a pending agreement starts on signing", () => {
    const doc = buildAgreement(agreementInput());
    assert.equal(doc.reference, "TDM-ES-000042");
    assert.match(summaryValue(doc, "Term") ?? "", /starting on the date this agreement is signed/);
    assert.equal(summaryValue(doc, "Agreement date"), "Set when signed");
  });

  test("a signed agreement shows its dates, with the last day included", () => {
    const doc = buildAgreement(agreementInput({ signedAt: new Date("2026-11-24T10:00:00Z") }));
    assert.equal(summaryValue(doc, "Term"), "7 days: 24 Nov 2026 to 30 Nov 2026");
    assert.equal(summaryValue(doc, "Agreement date"), "24 Nov 2026");
  });

  test("includes the client, fee and services", () => {
    const doc = buildAgreement(agreementInput());
    assert.equal(doc.client.name, "Asha Rao");
    assert.deepEqual(doc.client.lines, ["asha@example.com", "Username: asha.rao"]);
    assert.deepEqual(doc.services, ["Technical SEO health check", "Keyword research"]);
    const fees = doc.sections.find((section) => section.heading === "Fees and payment");
    assert.match(fees?.paragraphs[0] ?? "", /USD 149\.00 for the full term/);
  });

  test("leaves out the governing-law sentence until it is set", () => {
    const general = buildAgreement(agreementInput()).sections.at(-1);
    assert.equal(provider.governingLaw === "", !/governed by/.test(general?.paragraphs[0] ?? ""));
  });

  test("the plain text covers every part of the document", () => {
    const text = agreementText(buildAgreement(agreementInput()));
    for (const expected of ["Digital Marketing Services Agreement", "Asha Rao", "Schedule A", "Keyword research", "1. Services", "No guaranteed results"]) {
      assert.ok(text.includes(expected), `missing "${expected}"`);
    }
  });
});

describe("agreementStamp", () => {
  const base = { plan_id: "weekly", price_cents: 14_900, currency: "USD", duration_days: 7, terms_version: "2026-11", services: ["A", "B"] };
  test("is the same for the same agreement", () => {
    assert.equal(agreementStamp(base), agreementStamp({ ...base, services: ["A", "B"] }));
  });
  test("changes when the plan, price, services or terms change", () => {
    for (const change of [{ plan_id: "monthly" }, { price_cents: 15_000 }, { services: ["A"] }, { terms_version: "2027-01" }]) {
      assert.notEqual(agreementStamp({ ...base, ...change }), agreementStamp(base));
    }
  });
});
