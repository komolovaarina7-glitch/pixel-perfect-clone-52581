import { expect, test, type Page } from "@playwright/test";

const primaryRoutes = [
  "/",
  "/who-we-are",
  "/services",
  "/cases",
  "/approach",
  "/recovery-validation",
  "/selected-thinking",
  "/submit",
  "/contact",
] as const;

function captureRuntimeErrors(page: Page) {
  const errors: string[] = [];

  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  return errors;
}

async function waitForHydration(page: Page) {
  await expect(page.locator("html")).toHaveAttribute("data-hydrated", "true");
}

test("mobile menu opens and its link performs navigation", async ({ page }) => {
  const runtimeErrors = captureRuntimeErrors(page);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await waitForHydration(page);

  await page.getByRole("button", { name: "Menu" }).click();
  const navigation = page.getByRole("navigation", { name: "Mobile navigation" });
  await expect(navigation).toBeVisible();

  await navigation.getByRole("link", { name: "Cases", exact: true }).click();

  await expect(page).toHaveURL(/\/cases$/);
  await expect(page.locator("h1")).toContainText("Selected repositioning theses");
  expect(runtimeErrors).toEqual([]);
});

test("every primary route returns a page with one main heading", async ({ page }) => {
  const runtimeErrors = captureRuntimeErrors(page);

  for (const route of primaryRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), `${route} should return HTTP 200`).toBe(200);
    await waitForHydration(page);
    await expect(page.locator("main h1"), `${route} should render one h1`).toHaveCount(1);
    await expect(page.locator("main h1")).not.toHaveText("");
  }

  expect(runtimeErrors).toEqual([]);
});

test("language switch updates the document and survives reload", async ({ page }) => {
  const runtimeErrors = captureRuntimeErrors(page);
  await page.goto("/");
  await waitForHydration(page);

  await page.getByRole("button", { name: "RU" }).first().click();

  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.locator("main h1")).toContainText("Повышаем ценность");

  await page.reload();
  await waitForHydration(page);

  await expect(page.locator("html")).toHaveAttribute("lang", "ru");
  await expect(page.locator("main h1")).toContainText("Повышаем ценность");
  expect(runtimeErrors).toEqual([]);
});

test("homepage FAQ switches language and opens an answer", async ({ page }) => {
  const runtimeErrors = captureRuntimeErrors(page);
  await page.goto("/");
  await waitForHydration(page);

  const faq = page.getByTestId("home-faq");
  await expect(
    faq.getByRole("button", { name: "What types of assets do you work with?" }),
  ).toBeVisible();

  await page.getByRole("button", { name: "RU" }).first().click();

  const question = faq.getByRole("button", { name: "С какими объектами вы работаете?" });
  await expect(question).toBeVisible();
  await question.click();

  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(
    faq.getByText(
      "Мы рассматриваем сложные, недооценённые, проблемные и недоиспользуемые объекты недвижимости",
      { exact: false },
    ),
  ).toBeVisible();
  expect(runtimeErrors).toEqual([]);
});

test("value-proof divider animation activates when the section enters view", async ({ page }) => {
  const runtimeErrors = captureRuntimeErrors(page);
  await page.goto("/");
  await waitForHydration(page);

  const valueProof = page.locator(".home-value-proof");
  await valueProof.scrollIntoViewIfNeeded();

  await expect(valueProof).toHaveAttribute("data-lines-visible", "true");
  expect(runtimeErrors).toEqual([]);
});

test("case cards open a detail page and an unknown case returns 404", async ({ page }) => {
  const runtimeErrors = captureRuntimeErrors(page);
  await page.goto("/cases");
  await waitForHydration(page);

  const firstCase = page.locator('a[href="/cases/slovenia-castle"]').first();
  await expect(firstCase).toBeVisible();
  await firstCase.click();

  await expect(page).toHaveURL(/\/cases\/slovenia-castle$/);
  await expect(page.locator("main h1")).toHaveText("Slovenia Castle");
  await expect(page).toHaveTitle("Slovenia Castle — REPOSITION LAB");
  expect(runtimeErrors).toEqual([]);

  const missingResponse = await page.goto("/cases/not-a-real-case");
  expect(missingResponse?.status()).toBe(404);
  await expect(page.locator("main")).toContainText("Page not found");
});

test("cases hero remains complete when reduced motion is enabled", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/cases");

  await expect(page.locator(".cases-hero-title")).toBeVisible();
  await expect(page.locator(".cases-hero-bg")).toHaveCSS("opacity", "1");
  await expect(page.locator(".cases-hero-letter").first()).toHaveCSS("animation-name", "none");
});

test("cases hero finishes its title before revealing the supporting copy", async ({ page }) => {
  await page.goto("/cases");
  await waitForHydration(page);

  await expect(page.locator(".cases-hero-intro")).toHaveCSS("opacity", "0");
  await expect(page.locator(".cases-hero-intro")).not.toHaveClass(/global-scroll-reveal/);

  const timing = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll<HTMLElement>(".cases-hero-letter"));
    const lastLetter = letters.at(-1);
    const intro = document.querySelector<HTMLElement>(".cases-hero-intro");
    if (!lastLetter || !intro) return null;

    const letterStyle = getComputedStyle(lastLetter);
    const introStyle = getComputedStyle(intro);
    return {
      titleEnd:
        Number.parseFloat(letterStyle.animationDelay) +
        Number.parseFloat(letterStyle.animationDuration),
      introStart: Number.parseFloat(introStyle.animationDelay),
    };
  });

  expect(timing).not.toBeNull();
  expect(timing!.introStart).toBeGreaterThan(timing!.titleEnd);
});

test("internal heroes keep their copy and reveal it in sequence", async ({ page }) => {
  await page.goto("/services");
  await waitForHydration(page);

  const eyebrow = page.locator(".internal-hero-eyebrow");
  const title = page.locator(".standard-page-hero-title");
  const subtitle = page.locator(".internal-hero-subtitle");

  await expect(eyebrow).toContainText("Services");
  await expect(title).toContainText("Five disciplines of strategic recovery");
  await expect(subtitle).toContainText("REPOSITION LAB works where");
  await expect(eyebrow).toHaveCSS("animation-name", "homeHeroSideReveal");

  const timing = await page.evaluate(() => {
    const letters = Array.from(document.querySelectorAll<HTMLElement>(".internal-hero-letter"));
    const lastLetter = letters.at(-1);
    const supportingCopy = document.querySelector<HTMLElement>(".internal-hero-subtitle");
    if (!lastLetter || !supportingCopy) return null;

    const letterStyle = getComputedStyle(lastLetter);
    const copyStyle = getComputedStyle(supportingCopy);
    return {
      titleEnd:
        Number.parseFloat(letterStyle.animationDelay) +
        Number.parseFloat(letterStyle.animationDuration),
      subtitleStart: Number.parseFloat(copyStyle.animationDelay),
    };
  });

  expect(timing).not.toBeNull();
  expect(timing!.subtitleStart).toBeGreaterThan(timing!.titleEnd);
});

test("internal hero titles stay centered and preserve whole words on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/selected-thinking");
  await waitForHydration(page);

  const title = page.locator(".standard-page-hero-title");
  await expect(title).toHaveCSS("text-align", "center");

  const layout = await page.evaluate(() => {
    const words = Array.from(document.querySelectorAll<HTMLElement>(".internal-hero-word"));
    const titleElement = document.querySelector<HTMLElement>(".standard-page-hero-title");
    return {
      pageOverflows: document.documentElement.scrollWidth > document.documentElement.clientWidth,
      fontSize: titleElement ? Number.parseFloat(getComputedStyle(titleElement).fontSize) : 0,
      wordsFit: words.every((word) => word.getBoundingClientRect().width <= window.innerWidth),
    };
  });

  expect(layout.pageOverflows).toBe(false);
  expect(layout.fontSize).toBeGreaterThanOrEqual(38);
  expect(layout.wordsFit).toBe(true);
});

test("case image reveals its edge-color glow on hover without decorating the case container", async ({
  page,
}) => {
  await page.goto("/cases");
  await waitForHydration(page);

  const card = page.locator('a[href^="/cases/"]').first();
  await card.scrollIntoViewIfNeeded();
  const image = card.locator(".case-image-glow");

  await image.hover();

  await expect
    .poll(() => image.evaluate((element) => getComputedStyle(element).boxShadow))
    .not.toBe("none");
  await expect(card).not.toHaveClass(/case-spotlight/);
});

test("asset form blocks an empty submission and focuses the first invalid field", async ({
  page,
}) => {
  const runtimeErrors = captureRuntimeErrors(page);
  await page.goto("/submit");
  await waitForHydration(page);

  await page.getByRole("button", { name: "Submit Request" }).click();

  await expect(page.locator('[role="alert"]')).toHaveCount(6);
  await expect(page.locator('[name="asset_type"]')).toBeFocused();
  await expect(page.locator(".submission-success")).toHaveCount(0);
  expect(runtimeErrors).toEqual([]);
});
