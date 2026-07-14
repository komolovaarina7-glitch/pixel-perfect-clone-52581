import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const attachmentSchema = z.object({
  filename: z.string().min(1).max(160),
  content: z.string().min(1).max(3_000_000),
  contentType: z.enum(["application/pdf", "image/jpeg", "image/png", "image/webp", "text/plain"]),
});

const submissionSchema = z.object({
  assetType: z.string().trim().min(2).max(160),
  location: z.string().trim().min(2).max(160),
  condition: z.string().trim().max(300),
  ownership: z.string().trim().max(300),
  challenge: z.string().trim().min(10).max(5_000),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  organization: z.string().trim().max(180),
  contactMethod: z.string().trim().min(2).max(120),
  website: z.string().max(0),
  attachments: z.array(attachmentSchema).max(3),
});

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export const submitAsset = createServerFn({ method: "POST" })
  .inputValidator(submissionSchema)
  .handler(async ({ data }) => {
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.SUBMISSION_FROM_EMAIL;
    const to = process.env.SUBMISSION_TO_EMAIL ?? "office@repositionlab.com";

    if (!apiKey || !from) {
      console.error("Asset submission email is not configured.");
      return { ok: false as const, code: "not_configured" as const };
    }

    const rows = [
      ["Asset type", data.assetType],
      ["Location", data.location],
      ["Condition", data.condition],
      ["Ownership", data.ownership],
      ["Challenge", data.challenge],
      ["Name", data.name],
      ["Email", data.email],
      ["Organization", data.organization],
      ["Preferred contact", data.contactMethod],
    ];
    const html = rows
      .map(
        ([label, value]) =>
          `<p><strong>${escapeHtml(label)}:</strong><br>${escapeHtml(value || "—")}</p>`,
      )
      .join("");

    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          reply_to: data.email,
          subject: `Confidential asset submission — ${data.assetType}`,
          html,
          attachments: data.attachments.map((file) => ({
            filename: file.filename,
            content: file.content,
            content_type: file.contentType,
          })),
        }),
        signal: AbortSignal.timeout(15_000),
      });

      if (!response.ok) {
        console.error(`Asset submission delivery failed with status ${response.status}.`);
        return { ok: false as const, code: "delivery_failed" as const };
      }

      return { ok: true as const };
    } catch (error) {
      console.error("Asset submission delivery failed.", error);
      return { ok: false as const, code: "delivery_failed" as const };
    }
  });
