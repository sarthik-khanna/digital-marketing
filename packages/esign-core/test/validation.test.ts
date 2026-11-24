import assert from "node:assert/strict";
import { describe, test } from "node:test";
import { MAX_SIGNATURE_BYTES, parseSignature, validateSignUp } from "../src/validation.ts";
import { TINY_PNG, TINY_PNG_DATA_URL } from "./fixtures.ts";

const valid = {
  name: "  Asha   Rao ",
  username: " Asha.Rao ",
  email: " Asha@Example.COM ",
  password: "correct horse battery",
  confirm: "correct horse battery",
};

describe("validateSignUp", () => {
  test("accepts a valid sign-up and normalises the fields", () => {
    const result = validateSignUp(valid);
    assert.deepEqual(result, {
      ok: true,
      value: { name: "Asha Rao", username: "asha.rao", email: "asha@example.com", password: "correct horse battery" },
    });
  });

  test("rejects a password shorter than 10 characters", () => {
    const result = validateSignUp({ ...valid, password: "short", confirm: "short" });
    assert.equal(result.ok, false);
    assert.match(!result.ok ? result.errors.password ?? "" : "", /at least 10/);
  });

  test("rejects passwords that don't match", () => {
    const result = validateSignUp({ ...valid, confirm: "something else entirely" });
    assert.equal(!result.ok && result.errors.confirm, "The two passwords don't match.");
  });

  for (const username of ["28sarthik@28", "-asha_", "asha..rao", "@asha", "ASHA#1", "a".repeat(30)]) {
    test(`accepts the username "${username}"`, () => {
      const result = validateSignUp({ ...valid, username });
      assert.equal(result.ok && result.value.username, username.toLowerCase());
    });
  }

  for (const username of ["ab", "asha rao", "a".repeat(31), "asha@example.com"]) {
    test(`rejects the username "${username}"`, () => {
      const result = validateSignUp({ ...valid, username });
      assert.equal(result.ok, false);
      assert.ok(!result.ok && result.errors.username);
    });
  }

  test("rejects an invalid email and a missing name", () => {
    const result = validateSignUp({ ...valid, email: "not-an-email", name: " " });
    assert.equal(result.ok, false);
    assert.ok(!result.ok && result.errors.email && result.errors.name);
  });

  for (const email of ["a,b@example.com", "<a@example.com>", "a@example.com;b@example.com"]) {
    test(`rejects the email "${email}"`, () => {
      const result = validateSignUp({ ...valid, email });
      assert.ok(!result.ok && result.errors.email);
    });
  }

  test("rejects names with control characters", () => {
    const result = validateSignUp({ ...valid, name: "Asha\u0007Rao" });
    assert.equal(result.ok, false);
  });
});

describe("parseSignature", () => {
  test("accepts a PNG data URL and returns its bytes", () => {
    const result = parseSignature(TINY_PNG_DATA_URL);
    assert.equal(result.ok, true);
    assert.equal(result.ok && result.png[1], 0x50); // "P" of the PNG signature
  });

  test("rejects an empty signature", () => {
    assert.deepEqual(parseSignature(""), { ok: false, error: "Add your signature first." });
  });

  test("rejects other image types", () => {
    assert.equal(parseSignature("data:image/jpeg;base64,/9j/4AAQ").ok, false);
  });

  test("rejects data that is not a PNG", () => {
    const notPng = `data:image/png;base64,${Buffer.from("<svg onload=alert(1)>").toString("base64")}`;
    assert.equal(parseSignature(notPng).ok, false);
  });

  test("rejects malformed base64", () => {
    assert.equal(parseSignature("data:image/png;base64,abc$%^").ok, false);
  });

  test("rejects an oversized image", () => {
    const huge = `data:image/png;base64,${"A".repeat(Math.ceil(MAX_SIGNATURE_BYTES / 3) * 4 + 4)}`;
    assert.match(!parseSignature(huge).ok ? (parseSignature(huge) as { error: string }).error : "", /too large/);
  });

  test("rejects a PNG that declares huge pixel dimensions (decompression bomb)", () => {
    const bomb = new Uint8Array(TINY_PNG);
    const view = new DataView(bomb.buffer);
    view.setUint32(16, 10_000); // width
    view.setUint32(20, 10_000); // height
    const result = parseSignature(`data:image/png;base64,${Buffer.from(bomb).toString("base64")}`);
    assert.match(!result.ok ? result.error : "", /too large/);
  });
});
