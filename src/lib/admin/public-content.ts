import type { AdminCaseStudy, SiteContentItem } from "./types";
import type { CaseStudy } from "@/data/cases";
import { cases } from "@/data/cases";
import type { LocalizedString } from "@/i18n";

type DefaultCaseContentItem = Omit<SiteContentItem, "id" | "updated_at">;
type MutableRecord = Record<string, unknown>;

function isLocalizedString(value: unknown): value is LocalizedString {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const localized = value as Record<string, unknown>;
  return typeof localized.en === "string" && typeof localized.ru === "string";
}

export function getDefaultCaseContent(): DefaultCaseContentItem[] {
  const rows: DefaultCaseContentItem[] = [];
  const editableKeys = ["subtitle", "sections", "advantages"] as const;

  const walk = (value: unknown, slug: string, path: string[]) => {
    if (isLocalizedString(value)) {
      const contentKey = path.join(".");
      rows.push({
        group_name: `case-${slug}`,
        content_key: contentKey,
        label: `Кейс ${slug}: ${contentKey.replace(/\.(\d+)(?=\.|$)/g, " [$1]")}`,
        value_en: value.en,
        value_ru: value.ru,
        published: true,
      });
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((item, index) => walk(item, slug, [...path, String(index)]));
      return;
    }
    if (value && typeof value === "object") {
      Object.entries(value).forEach(([key, item]) => walk(item, slug, [...path, key]));
    }
  };

  cases.forEach((caseStudy) => {
    editableKeys.forEach((key) => walk(caseStudy[key], caseStudy.slug, [key]));
  });
  return rows;
}

function setValue(target: MutableRecord, path: string[], value: LocalizedString) {
  let current: unknown = target;
  for (let index = 0; index < path.length - 1; index += 1) {
    const key = path[index];
    if (Array.isArray(current)) current = current[Number(key)];
    else if (current && typeof current === "object") current = (current as MutableRecord)[key];
    else return;
  }
  const finalKey = path.at(-1);
  if (!finalKey || !current) return;
  if (Array.isArray(current)) current[Number(finalKey)] = value;
  else if (typeof current === "object") (current as MutableRecord)[finalKey] = value;
}

export function applyManagedCaseContent(
  caseStudy: CaseStudy,
  content: SiteContentItem[],
): CaseStudy {
  const groupName = `case-${caseStudy.slug}`;
  const relevant = content.filter((item) => item.published && item.group_name === groupName);
  if (!relevant.length) return caseStudy;
  const managed = structuredClone(caseStudy) as unknown as MutableRecord;
  relevant.forEach((item) => {
    setValue(managed, item.content_key.split("."), {
      en: item.value_en,
      ru: item.value_ru,
    });
  });
  return managed as unknown as CaseStudy;
}

export function mergePublishedCases(
  staticCases: CaseStudy[],
  managedCases: AdminCaseStudy[],
): CaseStudy[] {
  if (!managedCases.length) return staticCases;

  const managedBySlug = new Map(
    managedCases.map((item) => [
      item.slug,
      {
        slug: item.slug,
        title: { en: item.title_en, ru: item.title_ru },
        theme: { en: item.theme_en, ru: item.theme_ru },
        img: item.image_url,
        challenge: { en: item.challenge_en, ru: item.challenge_ru },
        logic: { en: item.logic_en, ru: item.logic_ru },
        direction: { en: item.direction_en, ru: item.direction_ru },
      } satisfies CaseStudy,
    ]),
  );

  const merged = staticCases.map((item) => {
    const managed = managedBySlug.get(item.slug);
    return managed ? { ...item, ...managed } : item;
  });
  const existingSlugs = new Set(staticCases.map((item) => item.slug));
  managedCases.forEach((item) => {
    if (!existingSlugs.has(item.slug)) {
      const mapped = managedBySlug.get(item.slug);
      if (mapped) merged.push(mapped);
    }
  });
  return merged;
}
