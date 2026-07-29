export type AdminUser = {
  id: string;
  email: string;
  role: string;
  createdAt: string;
  lastSignInAt: string | null;
};

export type SiteContentItem = {
  id: string;
  group_name: string;
  content_key: string;
  label: string;
  value_en: string;
  value_ru: string;
  published: boolean;
  updated_at: string;
};

export type AdminCaseStudy = {
  id: string;
  slug: string;
  title_en: string;
  title_ru: string;
  theme_en: string;
  theme_ru: string;
  challenge_en: string;
  challenge_ru: string;
  logic_en: string;
  logic_ru: string;
  direction_en: string;
  direction_ru: string;
  image_url: string;
  published: boolean;
  sort_order: number;
  updated_at: string;
};

export type MediaAsset = {
  id: string;
  name: string;
  storage_path: string;
  public_url: string;
  mime_type: string;
  size_bytes: number;
  alt_en: string;
  alt_ru: string;
  created_at: string;
};

export type AssetSubmissionRow = {
  id: string;
  created_at: string;
  status: "new" | "reviewing" | "closed" | "rejected";
  asset_type: string;
  location: string;
  condition: string;
  ownership: string;
  challenge: string;
  contact_name: string;
  contact_email: string;
  organization: string;
  contact_method: string;
  locale: "en" | "ru";
};

export type SiteSetting = {
  setting_key: string;
  value: string;
  label: string;
  updated_at: string;
};

export type AdminPanelData = {
  configured: boolean;
  currentUser: { email: string };
  content: SiteContentItem[];
  cases: AdminCaseStudy[];
  media: MediaAsset[];
  submissions: AssetSubmissionRow[];
  settings: SiteSetting[];
  users: AdminUser[];
};
