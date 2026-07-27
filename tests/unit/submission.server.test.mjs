import assert from "node:assert/strict";
import test from "node:test";

import {
  createRequestFingerprint,
  storeAssetSubmission,
  submissionSchema,
} from "../../src/lib/api/submission.server.ts";

const validSubmission = {
  assetType: "Heritage hotel",
  location: "Riga, Latvia",
  condition: "Operational",
  ownership: "Single owner",
  challenge: "The asset needs a clearer institutional strategy.",
  name: "Test Owner",
  email: "owner@example.com",
  organization: "Example Holdings",
  contactMethod: "Email",
  locale: "en",
  website: "",
};

const config = {
  supabaseUrl: "https://example.supabase.co/",
  supabaseSecretKey: "server-only-test-key",
};

test("server validation rejects a filled honeypot and oversized fields", () => {
  assert.equal(
    submissionSchema.safeParse({ ...validSubmission, website: "bot.example" }).success,
    false,
  );
  assert.equal(
    submissionSchema.safeParse({ ...validSubmission, challenge: "x".repeat(5_001) }).success,
    false,
  );
});

test("request fingerprints are stable, secret-dependent, and do not contain the IP", () => {
  const first = createRequestFingerprint("203.0.113.8", "a".repeat(32));
  const repeated = createRequestFingerprint("203.0.113.8", "a".repeat(32));
  const changedSecret = createRequestFingerprint("203.0.113.8", "b".repeat(32));

  assert.equal(first, repeated);
  assert.notEqual(first, changedSecret);
  assert.equal(first.length, 64);
  assert.equal(first.includes("203.0.113.8"), false);
});

test("storage sends normalized text fields and returns the database UUID", async () => {
  const submissionId = "ad8cddfa-c542-4435-b3e8-2f594fc60cbe";
  let capturedRequest;
  const fetcher = async (url, init) => {
    capturedRequest = { url, init };
    return Response.json(submissionId);
  };

  const result = await storeAssetSubmission({
    data: validSubmission,
    fingerprint: "f".repeat(64),
    config,
    fetcher,
  });

  assert.deepEqual(result, { ok: true, submissionId });
  assert.equal(
    capturedRequest.url,
    "https://example.supabase.co/rest/v1/rpc/accept_asset_submission",
  );
  const body = JSON.parse(capturedRequest.init.body);
  assert.equal(body.p_contact_email, "owner@example.com");
  assert.equal("attachments" in body, false);
  assert.equal(capturedRequest.init.headers.Authorization, "Bearer server-only-test-key");
});

test("storage maps the database rate-limit signal to a safe result", async () => {
  const result = await storeAssetSubmission({
    data: validSubmission,
    fingerprint: "f".repeat(64),
    config,
    fetcher: async () =>
      new Response(JSON.stringify({ message: "submission_rate_limited" }), { status: 400 }),
  });

  assert.deepEqual(result, { ok: false, code: "rate_limited" });
});

test("storage hides database errors from callers", async () => {
  const result = await storeAssetSubmission({
    data: validSubmission,
    fingerprint: "f".repeat(64),
    config,
    fetcher: async () =>
      new Response(JSON.stringify({ message: "sensitive database detail" }), { status: 500 }),
  });

  assert.deepEqual(result, { ok: false, code: "storage_failed" });
});

test("storage rejects an invalid database response instead of inventing an ID", async () => {
  const result = await storeAssetSubmission({
    data: validSubmission,
    fingerprint: "f".repeat(64),
    config,
    fetcher: async () => Response.json("not-a-uuid"),
  });

  assert.deepEqual(result, { ok: false, code: "storage_failed" });
});
