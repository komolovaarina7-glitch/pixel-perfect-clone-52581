import type { AdminCaseStudy } from "./types";
import type { CaseStudy } from "@/data/cases";

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
