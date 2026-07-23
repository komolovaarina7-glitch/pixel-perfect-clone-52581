import { T as TSS_SERVER_FUNCTION, a as createServerFn } from "./server-wYDH_eUB.mjs";
import "../_libs/seroval.mjs";
import "../_libs/react.mjs";
import { o as objectType, e as enumType, s as stringType, a as arrayType } from "../_libs/zod.mjs";
import "node:async_hooks";
import "../_libs/h3-v2.mjs";
import "../_libs/rou3.mjs";
import "../_libs/srvx.mjs";
import "node:stream";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
var createServerRpc = (serverFnMeta, splitImportFn) => {
  const url = "/_serverFn/" + serverFnMeta.id;
  return Object.assign(splitImportFn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const attachmentSchema = objectType({
  filename: stringType().min(1).max(160),
  content: stringType().min(1).max(3e6),
  contentType: enumType(["application/pdf", "image/jpeg", "image/png", "image/webp", "text/plain"])
});
const submissionSchema = objectType({
  assetType: stringType().trim().min(2).max(160),
  location: stringType().trim().min(2).max(160),
  condition: stringType().trim().max(300),
  ownership: stringType().trim().max(300),
  challenge: stringType().trim().min(10).max(5e3),
  name: stringType().trim().min(2).max(120),
  email: stringType().trim().email().max(254),
  organization: stringType().trim().max(180),
  contactMethod: stringType().trim().min(2).max(120),
  website: stringType().max(0),
  attachments: arrayType(attachmentSchema).max(3)
});
function escapeHtml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}
const submitAsset_createServerFn_handler = createServerRpc({
  id: "3c64988934d7bd1d0cd30dfde5cd832298947c4e0ce9234ab57b3581bd2d61f7",
  name: "submitAsset",
  filename: "src/lib/api/submission.functions.ts"
}, (opts) => submitAsset.__executeServer(opts));
const submitAsset = createServerFn({
  method: "POST"
}).inputValidator(submissionSchema).handler(submitAsset_createServerFn_handler, async ({
  data
}) => {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.SUBMISSION_FROM_EMAIL;
  const to = process.env.SUBMISSION_TO_EMAIL ?? "office@repositionlab.com";
  if (!apiKey || !from) {
    console.error("Asset submission email is not configured.");
    return {
      ok: false,
      code: "not_configured"
    };
  }
  const rows = [["Asset type", data.assetType], ["Location", data.location], ["Condition", data.condition], ["Ownership", data.ownership], ["Challenge", data.challenge], ["Name", data.name], ["Email", data.email], ["Organization", data.organization], ["Preferred contact", data.contactMethod]];
  const html = rows.map(([label, value]) => `<p><strong>${escapeHtml(label)}:</strong><br>${escapeHtml(value || "—")}</p>`).join("");
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json"
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
          content_type: file.contentType
        }))
      }),
      signal: AbortSignal.timeout(15e3)
    });
    if (!response.ok) {
      console.error(`Asset submission delivery failed with status ${response.status}.`);
      return {
        ok: false,
        code: "delivery_failed"
      };
    }
    return {
      ok: true
    };
  } catch (error) {
    console.error("Asset submission delivery failed.", error);
    return {
      ok: false,
      code: "delivery_failed"
    };
  }
});
export {
  submitAsset_createServerFn_handler
};
