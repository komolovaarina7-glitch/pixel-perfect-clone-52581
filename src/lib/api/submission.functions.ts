import { createServerFn } from "@tanstack/react-start";
import { getRequestIP, setResponseStatus } from "@tanstack/react-start/server";
import {
  createRequestFingerprint,
  storeAssetSubmission,
  submissionSchema,
} from "./submission.server";

export const submitAsset = createServerFn({ method: "POST" })
  .inputValidator(submissionSchema)
  .handler(async ({ data }) => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
    const rateLimitSecret = process.env.SUBMISSION_RATE_LIMIT_SECRET;

    if (!supabaseUrl || !supabaseSecretKey || !rateLimitSecret) {
      console.error("Asset submission storage is not configured.");
      setResponseStatus(503);
      return { ok: false as const, code: "not_configured" as const };
    }

    try {
      const fingerprint = createRequestFingerprint(
        getRequestIP({ xForwardedFor: true }) ?? "unknown",
        rateLimitSecret,
      );
      const result = await storeAssetSubmission({
        data,
        fingerprint,
        config: { supabaseUrl, supabaseSecretKey },
      });

      if (!result.ok) {
        if (result.code === "rate_limited") {
          setResponseStatus(429);
          return result;
        }
        console.error("Asset submission storage failed.");
        setResponseStatus(503);
      }

      return result;
    } catch (error) {
      console.error("Asset submission storage failed.", error);
      setResponseStatus(503);
      return { ok: false as const, code: "storage_failed" as const };
    }
  });
