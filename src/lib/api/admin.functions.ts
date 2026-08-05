import { randomUUID } from "node:crypto";
import { createServerFn } from "@tanstack/react-start";
import { setResponseStatus } from "@tanstack/react-start/server";
import { z } from "zod";
import {
  callRpc,
  deleteMediaObject,
  getAuthUser,
  getSupabaseAdminConfig,
  inviteAdmin,
  isAllowedAdmin,
  loadAdminPanelData,
  refreshAuthSession,
  restDelete,
  restList,
  restUpsert,
  revokeAdmin,
  signInWithPassword,
  uploadMediaObject,
} from "@/lib/admin/supabase.server";
import { getAdminSessionStore } from "@/lib/admin/session.server";
import type {
  AdminCaseStudy,
  AdminPanelData,
  MediaAsset,
  SiteContentItem,
} from "@/lib/admin/types";

const loginSchema = z.object({
  email: z.string().trim().email().max(254),
  password: z.string().min(8).max(200),
});

const contentSchema = z.object({
  id: z.string().uuid(),
  groupName: z.string().trim().min(2).max(80),
  contentKey: z.string().trim().min(2).max(120),
  label: z.string().trim().min(2).max(160),
  valueEn: z.string().max(20_000),
  valueRu: z.string().max(20_000),
  published: z.boolean(),
});

const caseSchema = z.object({
  id: z.string().uuid().optional(),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  titleEn: z.string().trim().min(2).max(300),
  titleRu: z.string().trim().min(2).max(300),
  themeEn: z.string().trim().max(300),
  themeRu: z.string().trim().max(300),
  challengeEn: z.string().trim().max(5_000),
  challengeRu: z.string().trim().max(5_000),
  logicEn: z.string().trim().max(5_000),
  logicRu: z.string().trim().max(5_000),
  directionEn: z.string().trim().max(5_000),
  directionRu: z.string().trim().max(5_000),
  imageUrl: z.string().trim().max(2_000),
  published: z.boolean(),
  sortOrder: z.number().int().min(0).max(10_000),
});

const settingSchema = z.object({
  key: z
    .string()
    .trim()
    .min(2)
    .max(120)
    .regex(/^[a-z0-9_]+$/),
  label: z.string().trim().min(2).max(160),
  value: z.string().max(5_000),
});

const submissionStatusSchema = z.object({
  id: z.string().uuid(),
  status: z.enum(["new", "reviewing", "closed", "rejected"]),
});

const idSchema = z.object({ id: z.string().uuid() });
const emailSchema = z.object({ email: z.string().trim().email().max(254) });
const mediaDeleteSchema = z.object({
  id: z.string().uuid(),
  storagePath: z.string().min(3).max(500),
});
const mediaUploadSchema = z.object({
  name: z.string().trim().min(1).max(180),
  mimeType: z.enum(["image/jpeg", "image/png", "image/webp"]),
  base64: z.string().min(20).max(14_500_000),
  altEn: z.string().trim().max(500),
  altRu: z.string().trim().max(500),
});

function matchesImageSignature(
  bytes: Uint8Array,
  mimeType: "image/jpeg" | "image/png" | "image/webp",
) {
  if (mimeType === "image/jpeg") {
    return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (mimeType === "image/png") {
    return (
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a
    );
  }
  return (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  );
}

async function verifyAdmin() {
  const config = getSupabaseAdminConfig();
  if (!config) return { ok: false as const, code: "not_configured" as const };

  let session;
  try {
    session = await getAdminSessionStore();
  } catch {
    return { ok: false as const, code: "not_configured" as const };
  }

  if (!session.data.accessToken) {
    return { ok: false as const, code: "unauthorized" as const };
  }

  let user = await getAuthUser(config, session.data.accessToken);
  if (!user && session.data.refreshToken) {
    try {
      const refreshed = await refreshAuthSession(config, session.data.refreshToken);
      user = refreshed.user;
      await session.update({
        accessToken: refreshed.access_token,
        refreshToken: refreshed.refresh_token,
        email: refreshed.user.email,
        userId: refreshed.user.id,
      });
    } catch {
      await session.clear();
      return { ok: false as const, code: "unauthorized" as const };
    }
  }

  if (!user || !isAllowedAdmin(user) || !user.email) {
    await session.clear();
    return { ok: false as const, code: "forbidden" as const };
  }

  return { ok: true as const, config, session, user };
}

function forbiddenResponse(code: "not_configured" | "unauthorized" | "forbidden") {
  setResponseStatus(code === "not_configured" ? 503 : code === "unauthorized" ? 401 : 403);
  return { ok: false as const, code };
}

export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const result = await verifyAdmin();
  if (!result.ok) {
    return {
      configured: result.code !== "not_configured",
      authenticated: false as const,
      email: null,
    };
  }
  return {
    configured: true,
    authenticated: true as const,
    email: result.user.email ?? null,
  };
});

export const loginAdmin = createServerFn({ method: "POST" })
  .inputValidator(loginSchema)
  .handler(async ({ data }) => {
    const config = getSupabaseAdminConfig();
    if (!config) return forbiddenResponse("not_configured");

    try {
      const auth = await signInWithPassword(config, data.email.toLowerCase(), data.password);
      if (!auth.user.email || !isAllowedAdmin(auth.user)) {
        return forbiddenResponse("forbidden");
      }
      const session = await getAdminSessionStore();
      await session.update({
        accessToken: auth.access_token,
        refreshToken: auth.refresh_token,
        email: auth.user.email,
        userId: auth.user.id,
      });
      return { ok: true as const };
    } catch {
      setResponseStatus(401);
      return { ok: false as const, code: "invalid_credentials" as const };
    }
  });

export const logoutAdmin = createServerFn({ method: "POST" }).handler(async () => {
  try {
    const session = await getAdminSessionStore();
    await session.clear();
  } catch {
    // A missing session secret is already surfaced on the login screen.
  }
  return { ok: true as const };
});

export const getAdminPanelData = createServerFn({ method: "GET" }).handler(async () => {
  const auth = await verifyAdmin();
  if (!auth.ok) return forbiddenResponse(auth.code);

  try {
    const data = await loadAdminPanelData(auth.config);
    return {
      ok: true as const,
      data: {
        configured: true,
        currentUser: { email: auth.user.email ?? "" },
        ...data,
      } satisfies AdminPanelData,
    };
  } catch (error) {
    console.error("Admin panel data could not be loaded.", error);
    setResponseStatus(503);
    return { ok: false as const, code: "storage_failed" as const };
  }
});

export const saveContentItem = createServerFn({ method: "POST" })
  .inputValidator(contentSchema)
  .handler(async ({ data }) => {
    const auth = await verifyAdmin();
    if (!auth.ok) return forbiddenResponse(auth.code);
    await restUpsert(
      auth.config,
      "site_content",
      {
        id: data.id,
        group_name: data.groupName,
        content_key: data.contentKey,
        label: data.label,
        value_en: data.valueEn,
        value_ru: data.valueRu,
        published: data.published,
        updated_at: new Date().toISOString(),
      },
      "group_name,content_key",
    );
    return { ok: true as const };
  });

export const saveCaseStudy = createServerFn({ method: "POST" })
  .inputValidator(caseSchema)
  .handler(async ({ data }) => {
    const auth = await verifyAdmin();
    if (!auth.ok) return forbiddenResponse(auth.code);
    const payload = {
      ...(data.id ? { id: data.id } : {}),
      slug: data.slug,
      title_en: data.titleEn,
      title_ru: data.titleRu,
      theme_en: data.themeEn,
      theme_ru: data.themeRu,
      challenge_en: data.challengeEn,
      challenge_ru: data.challengeRu,
      logic_en: data.logicEn,
      logic_ru: data.logicRu,
      direction_en: data.directionEn,
      direction_ru: data.directionRu,
      image_url: data.imageUrl,
      published: data.published,
      sort_order: data.sortOrder,
      updated_at: new Date().toISOString(),
    };
    await restUpsert(auth.config, "case_studies", payload, data.id ? "id" : "slug");
    return { ok: true as const };
  });

export const deleteCaseStudy = createServerFn({ method: "POST" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => {
    const auth = await verifyAdmin();
    if (!auth.ok) return forbiddenResponse(auth.code);
    await restDelete(auth.config, "case_studies", `id=eq.${encodeURIComponent(data.id)}`);
    return { ok: true as const };
  });

export const saveSiteSetting = createServerFn({ method: "POST" })
  .inputValidator(settingSchema)
  .handler(async ({ data }) => {
    const auth = await verifyAdmin();
    if (!auth.ok) return forbiddenResponse(auth.code);
    await restUpsert(
      auth.config,
      "site_settings",
      {
        setting_key: data.key,
        label: data.label,
        value: data.value,
        updated_at: new Date().toISOString(),
      },
      "setting_key",
    );
    return { ok: true as const };
  });

export const updateSubmissionStatus = createServerFn({ method: "POST" })
  .inputValidator(submissionStatusSchema)
  .handler(async ({ data }) => {
    const auth = await verifyAdmin();
    if (!auth.ok) return forbiddenResponse(auth.code);
    await callRpc(auth.config, "admin_update_asset_submission_status", {
      p_id: data.id,
      p_status: data.status,
    });
    return { ok: true as const };
  });

export const deleteSubmission = createServerFn({ method: "POST" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => {
    const auth = await verifyAdmin();
    if (!auth.ok) return forbiddenResponse(auth.code);
    await callRpc(auth.config, "admin_delete_asset_submission", { p_id: data.id });
    return { ok: true as const };
  });

export const uploadMedia = createServerFn({ method: "POST" })
  .inputValidator(mediaUploadSchema)
  .handler(async ({ data }) => {
    const auth = await verifyAdmin();
    if (!auth.ok) return forbiddenResponse(auth.code);

    const bytes = Uint8Array.from(Buffer.from(data.base64, "base64"));
    if (bytes.byteLength > 10 * 1024 * 1024) {
      setResponseStatus(413);
      return { ok: false as const, code: "file_too_large" as const };
    }
    if (!matchesImageSignature(bytes, data.mimeType)) {
      setResponseStatus(415);
      return { ok: false as const, code: "invalid_file" as const };
    }

    const extension =
      data.mimeType === "image/jpeg" ? "jpg" : data.mimeType === "image/png" ? "png" : "webp";
    const safeStem =
      data.name
        .replace(/\.[^.]+$/, "")
        .normalize("NFKD")
        .replace(/[^a-zA-Z0-9_-]+/g, "-")
        .replace(/^-+|-+$/g, "")
        .slice(0, 80) || "image";
    const storagePath = `${new Date().toISOString().slice(0, 10)}/${safeStem}-${randomUUID()}.${extension}`;
    const publicUrl = await uploadMediaObject(auth.config, storagePath, bytes, data.mimeType);

    await restUpsert(
      auth.config,
      "media_assets",
      {
        name: data.name,
        storage_path: storagePath,
        public_url: publicUrl,
        mime_type: data.mimeType,
        size_bytes: bytes.byteLength,
        alt_en: data.altEn,
        alt_ru: data.altRu,
      },
      "storage_path",
    );
    return { ok: true as const, publicUrl };
  });

export const deleteMedia = createServerFn({ method: "POST" })
  .inputValidator(mediaDeleteSchema)
  .handler(async ({ data }) => {
    const auth = await verifyAdmin();
    if (!auth.ok) return forbiddenResponse(auth.code);
    await deleteMediaObject(auth.config, data.storagePath);
    await restDelete(auth.config, "media_assets", `id=eq.${encodeURIComponent(data.id)}`);
    return { ok: true as const };
  });

export const inviteAdminUser = createServerFn({ method: "POST" })
  .inputValidator(emailSchema)
  .handler(async ({ data }) => {
    const auth = await verifyAdmin();
    if (!auth.ok) return forbiddenResponse(auth.code);
    await inviteAdmin(auth.config, data.email.toLowerCase());
    return { ok: true as const };
  });

export const revokeAdminUser = createServerFn({ method: "POST" })
  .inputValidator(idSchema)
  .handler(async ({ data }) => {
    const auth = await verifyAdmin();
    if (!auth.ok) return forbiddenResponse(auth.code);
    if (data.id === auth.user.id) {
      setResponseStatus(400);
      return { ok: false as const, code: "cannot_revoke_self" as const };
    }
    await revokeAdmin(auth.config, data.id);
    return { ok: true as const };
  });

export const getPublishedContent = createServerFn({ method: "GET" }).handler(async () => {
  const config = getSupabaseAdminConfig();
  if (!config) return [] as SiteContentItem[];
  try {
    return await restList<SiteContentItem>(
      config,
      "site_content?select=*&published=eq.true&order=group_name.asc,content_key.asc",
    );
  } catch {
    return [] as SiteContentItem[];
  }
});

export const getPublishedMedia = createServerFn({ method: "GET" }).handler(async () => {
  const config = getSupabaseAdminConfig();
  if (!config) return [] as MediaAsset[];
  try {
    return await restList<MediaAsset>(config, "media_assets?select=*&order=created_at.desc");
  } catch {
    return [] as MediaAsset[];
  }
});

export const getPublishedCases = createServerFn({ method: "GET" }).handler(async () => {
  const config = getSupabaseAdminConfig();
  if (!config) return [] as AdminCaseStudy[];
  try {
    return await restList<AdminCaseStudy>(
      config,
      "case_studies?select=*&published=eq.true&order=sort_order.asc,updated_at.desc",
    );
  } catch {
    return [] as AdminCaseStudy[];
  }
});
