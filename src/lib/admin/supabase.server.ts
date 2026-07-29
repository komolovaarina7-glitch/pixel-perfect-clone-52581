import type {
  AdminCaseStudy,
  AdminUser,
  AssetSubmissionRow,
  MediaAsset,
  SiteContentItem,
  SiteSetting,
} from "./types";

export type SupabaseAdminConfig = {
  url: string;
  secretKey: string;
};

type AuthUser = {
  id: string;
  email?: string;
  app_metadata?: Record<string, unknown>;
  created_at?: string;
  last_sign_in_at?: string | null;
};

type AuthSessionResponse = {
  access_token: string;
  refresh_token: string;
  user: AuthUser;
};

export function getSupabaseAdminConfig(): SupabaseAdminConfig | null {
  const url = process.env.SUPABASE_URL?.replace(/\/+$/, "");
  const secretKey = process.env.SUPABASE_SECRET_KEY;
  if (!url || !secretKey) return null;
  return { url, secretKey };
}

function getHeaders(config: SupabaseAdminConfig, extra?: HeadersInit) {
  return {
    apikey: config.secretKey,
    Authorization: `Bearer ${config.secretKey}`,
    "Content-Type": "application/json",
    ...extra,
  };
}

async function parseError(response: Response) {
  const body = await response.text();
  try {
    const parsed = JSON.parse(body) as { message?: string; msg?: string; error_description?: string };
    return parsed.message ?? parsed.msg ?? parsed.error_description ?? "Request failed.";
  } catch {
    return body || "Request failed.";
  }
}

async function assertOk(response: Response) {
  if (!response.ok) {
    throw new Error(await parseError(response));
  }
}

export async function signInWithPassword(
  config: SupabaseAdminConfig,
  email: string,
  password: string,
) {
  const response = await fetch(`${config.url}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: getHeaders(config),
    body: JSON.stringify({ email, password }),
    signal: AbortSignal.timeout(12_000),
  });
  await assertOk(response);
  return (await response.json()) as AuthSessionResponse;
}

export async function refreshAuthSession(
  config: SupabaseAdminConfig,
  refreshToken: string,
) {
  const response = await fetch(`${config.url}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: getHeaders(config),
    body: JSON.stringify({ refresh_token: refreshToken }),
    signal: AbortSignal.timeout(12_000),
  });
  await assertOk(response);
  return (await response.json()) as AuthSessionResponse;
}

export async function getAuthUser(config: SupabaseAdminConfig, accessToken: string) {
  const response = await fetch(`${config.url}/auth/v1/user`, {
    headers: {
      apikey: config.secretKey,
      Authorization: `Bearer ${accessToken}`,
    },
    signal: AbortSignal.timeout(10_000),
  });
  if (response.status === 401 || response.status === 403) return null;
  await assertOk(response);
  return (await response.json()) as AuthUser;
}

export function isAllowedAdmin(user: AuthUser) {
  const role = user.app_metadata?.role;
  if (role === "admin") return true;

  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
  return Boolean(user.email && allowlist.includes(user.email.toLowerCase()));
}

export async function restList<T>(
  config: SupabaseAdminConfig,
  path: string,
): Promise<T[]> {
  const response = await fetch(`${config.url}/rest/v1/${path}`, {
    headers: getHeaders(config),
    signal: AbortSignal.timeout(12_000),
  });
  await assertOk(response);
  return (await response.json()) as T[];
}

export async function restUpsert<T extends Record<string, unknown>>(
  config: SupabaseAdminConfig,
  table: string,
  payload: T,
  conflict: string,
) {
  const response = await fetch(
    `${config.url}/rest/v1/${table}?on_conflict=${encodeURIComponent(conflict)}`,
    {
      method: "POST",
      headers: getHeaders(config, {
        Prefer: "resolution=merge-duplicates,return=representation",
      }),
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(12_000),
    },
  );
  await assertOk(response);
  return (await response.json()) as T[];
}

export async function restDelete(
  config: SupabaseAdminConfig,
  table: string,
  filter: string,
) {
  const response = await fetch(`${config.url}/rest/v1/${table}?${filter}`, {
    method: "DELETE",
    headers: getHeaders(config),
    signal: AbortSignal.timeout(12_000),
  });
  await assertOk(response);
}

export async function callRpc<T>(
  config: SupabaseAdminConfig,
  name: string,
  payload: Record<string, unknown> = {},
) {
  const response = await fetch(`${config.url}/rest/v1/rpc/${name}`, {
    method: "POST",
    headers: getHeaders(config),
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(12_000),
  });
  await assertOk(response);
  return (await response.json()) as T;
}

export async function loadAdminPanelData(config: SupabaseAdminConfig) {
  const [content, cases, media, settings, submissions, users] = await Promise.all([
    restList<SiteContentItem>(
      config,
      "site_content?select=*&order=group_name.asc,content_key.asc",
    ),
    restList<AdminCaseStudy>(config, "case_studies?select=*&order=sort_order.asc,updated_at.desc"),
    restList<MediaAsset>(config, "media_assets?select=*&order=created_at.desc"),
    restList<SiteSetting>(config, "site_settings?select=*&order=setting_key.asc"),
    callRpc<AssetSubmissionRow[]>(config, "admin_list_asset_submissions"),
    listAdminUsers(config),
  ]);
  return { content, cases, media, settings, submissions, users };
}

export async function listAdminUsers(config: SupabaseAdminConfig): Promise<AdminUser[]> {
  const response = await fetch(`${config.url}/auth/v1/admin/users?page=1&per_page=100`, {
    headers: getHeaders(config),
    signal: AbortSignal.timeout(12_000),
  });
  await assertOk(response);
  const body = (await response.json()) as { users?: AuthUser[] } | AuthUser[];
  const users = Array.isArray(body) ? body : (body.users ?? []);
  return users
    .filter((user) => user.app_metadata?.role === "admin" || isAllowedAdmin(user))
    .map((user) => ({
      id: user.id,
      email: user.email ?? "Без email",
      role: "admin",
      createdAt: user.created_at ?? "",
      lastSignInAt: user.last_sign_in_at ?? null,
    }));
}

export async function inviteAdmin(config: SupabaseAdminConfig, email: string) {
  const inviteResponse = await fetch(`${config.url}/auth/v1/invite`, {
    method: "POST",
    headers: getHeaders(config),
    body: JSON.stringify({ email }),
    signal: AbortSignal.timeout(12_000),
  });
  await assertOk(inviteResponse);
  const user = (await inviteResponse.json()) as AuthUser;
  if (!user.id) throw new Error("The invitation did not return a user.");

  const roleResponse = await fetch(`${config.url}/auth/v1/admin/users/${user.id}`, {
    method: "PUT",
    headers: getHeaders(config),
    body: JSON.stringify({ app_metadata: { ...(user.app_metadata ?? {}), role: "admin" } }),
    signal: AbortSignal.timeout(12_000),
  });
  await assertOk(roleResponse);
}

export async function revokeAdmin(config: SupabaseAdminConfig, userId: string) {
  const userResponse = await fetch(`${config.url}/auth/v1/admin/users/${userId}`, {
    headers: getHeaders(config),
    signal: AbortSignal.timeout(12_000),
  });
  await assertOk(userResponse);
  const user = (await userResponse.json()) as AuthUser;

  const response = await fetch(`${config.url}/auth/v1/admin/users/${userId}`, {
    method: "PUT",
    headers: getHeaders(config),
    body: JSON.stringify({ app_metadata: { ...(user.app_metadata ?? {}), role: "user" } }),
    signal: AbortSignal.timeout(12_000),
  });
  await assertOk(response);
}

export async function uploadMediaObject(
  config: SupabaseAdminConfig,
  path: string,
  bytes: Uint8Array,
  mimeType: string,
) {
  const response = await fetch(`${config.url}/storage/v1/object/site-media/${path}`, {
    method: "POST",
    headers: {
      apikey: config.secretKey,
      Authorization: `Bearer ${config.secretKey}`,
      "Content-Type": mimeType,
      "x-upsert": "false",
    },
    body: bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer,
    signal: AbortSignal.timeout(20_000),
  });
  await assertOk(response);
  return `${config.url}/storage/v1/object/public/site-media/${path}`;
}

export async function deleteMediaObject(config: SupabaseAdminConfig, path: string) {
  const response = await fetch(`${config.url}/storage/v1/object/site-media/${path}`, {
    method: "DELETE",
    headers: getHeaders(config),
    signal: AbortSignal.timeout(12_000),
  });
  if (response.status !== 404) await assertOk(response);
}
