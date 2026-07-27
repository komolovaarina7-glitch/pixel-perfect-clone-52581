import { createHmac } from "node:crypto";
import { z } from "zod";

export const submissionSchema = z.object({
  assetType: z.string().trim().min(2).max(160),
  location: z.string().trim().min(2).max(160),
  condition: z.string().trim().max(300),
  ownership: z.string().trim().max(300),
  challenge: z.string().trim().min(10).max(5_000),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  organization: z.string().trim().max(180),
  contactMethod: z.string().trim().min(2).max(120),
  locale: z.enum(["en", "ru"]),
  website: z.string().max(0),
});

export type AssetSubmission = z.infer<typeof submissionSchema>;

type StorageConfig = {
  supabaseUrl: string;
  supabaseSecretKey: string;
};

type StoreSubmissionOptions = {
  data: AssetSubmission;
  fingerprint: string;
  config: StorageConfig;
  fetcher?: typeof fetch;
};

export type StoreSubmissionResult =
  | { ok: true; submissionId: string }
  | { ok: false; code: "rate_limited" | "storage_failed" };

const submissionIdSchema = z.string().uuid();

export function createRequestFingerprint(ipAddress: string, secret: string) {
  if (secret.length < 32) {
    throw new Error("SUBMISSION_RATE_LIMIT_SECRET must contain at least 32 characters.");
  }

  return createHmac("sha256", secret)
    .update(ipAddress || "unknown")
    .digest("hex");
}

export async function storeAssetSubmission({
  data,
  fingerprint,
  config,
  fetcher = fetch,
}: StoreSubmissionOptions): Promise<StoreSubmissionResult> {
  const endpoint = `${config.supabaseUrl.replace(/\/+$/, "")}/rest/v1/rpc/accept_asset_submission`;
  const response = await fetcher(endpoint, {
    method: "POST",
    headers: {
      apikey: config.supabaseSecretKey,
      Authorization: `Bearer ${config.supabaseSecretKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      p_fingerprint: fingerprint,
      p_asset_type: data.assetType,
      p_location: data.location,
      p_condition: data.condition,
      p_ownership: data.ownership,
      p_challenge: data.challenge,
      p_contact_name: data.name,
      p_contact_email: data.email,
      p_organization: data.organization,
      p_contact_method: data.contactMethod,
      p_locale: data.locale,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    if (errorBody.includes("submission_rate_limited")) {
      return { ok: false, code: "rate_limited" };
    }
    return { ok: false, code: "storage_failed" };
  }

  const submissionId = submissionIdSchema.safeParse(await response.json());
  if (!submissionId.success) {
    return { ok: false, code: "storage_failed" };
  }

  return { ok: true, submissionId: submissionId.data };
}
