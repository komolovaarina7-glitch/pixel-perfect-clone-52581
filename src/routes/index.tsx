import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedHeroBackground } from "@/components/site/AnimatedHeroBackground";
import { cases, type CaseStudy } from "@/data/cases";
import { useLanguage } from "@/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "REPOSITION LAB — Strategic Real Estate Repositioning & Recovery Intelligence" },
      {
        name: "description",
        content:
          "Strategic recovery and real estate intelligence partner. We help banks, asset holders and institutional owners unlock hidden value in distressed and underutilized assets.",
      },
      { property: "og:title", content: "REPOSITION LAB" },
      {
        property: "og:description",
        content:
          "Strategic repositioning and recovery intelligence for distressed and underutilized real estate.",
      },
    ],
  }),
  component: Home,
});

const previewSlugs = ["slovenia-castle", "industrial-heritage-slovenia", "bauskas-16a-riga"];
const directionOrder = [
  "/who-we-are",
  "/services",
  "/cases",
  "/approach",
  "/recovery-validation",
  "/selected-thinking",
  "/contact",
  "/submit",
] as const;

function Home() {
  const { t, l } = useLanguage();
  const previewCases = previewSlugs
    .map((slug) => cases.find((caseStudy) => caseStudy.slug === slug))
    .filter((caseStudy): caseStudy is CaseStudy => Boolean(caseStudy));
  const directions = directionOrder
    .map((path) => t.home.directions.find((direction) => direction.to === path))
    .filter((direction): direction is (typeof t.home.directions)[number] => Boolean(direction));

  return (
    <div>
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-background">
        <AnimatedHeroBackground />
        <div className="relative container-rl pb-16 pt-32">
          <p className="eyebrow text-accent hero-text-reveal hero-text-reveal-eyebrow page-reveal page-reveal-delay-1">
            {l(t.home.eyebrow)}
          </p>
          <h1 className="mobile-safe-text serif text-3xl md:text-5xl lg:text-6xl mt-5 max-w-4xl leading-[1.05] text-foreground hero-text-reveal hero-text-reveal-headline page-reveal page-reveal-delay-2">
            {l(t.home.headlineStart)}{" "}
            <em className="text-accent not-italic">{l(t.home.headlineEm)}</em>
          </h1>
          <p className="mt-6 text-sm md:text-base text-foreground/75 max-w-xl leading-relaxed hero-text-reveal hero-text-reveal-subtitle page-reveal page-reveal-delay-3">
            {l(t.home.intro)}
          </p>
        </div>
      </section>

      <section className="py-20 border-t border-rule">
        <div className="container-rl">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <h2 className="serif text-2xl md:text-4xl mt-3 max-w-2xl text-foreground">
                {l(t.home.directionTitle)}
              </h2>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {directions.map((d) => {
              const title =
                d.to === "/recovery-validation"
                  ? { en: "Potential Review", ru: "Оценка потенциала" }
                  : d.title;

              return (
                <Link
                  key={d.to}
                  to={d.to}
                  className="homepage-hub-card group flex min-h-[190px] flex-col p-6 sm:min-h-[210px] md:p-7"
                >
                  <div className="flex items-start justify-between gap-5">
                    <h3 className="mobile-safe-text min-w-0 serif text-2xl text-foreground transition-colors group-hover:text-accent md:text-[30px] md:leading-tight">
                      {l(title)}
                    </h3>
                    <span className="shrink-0 pt-1 text-[10px] uppercase tracking-[0.18em] text-accent/80 transition-colors group-hover:text-accent">
                      {l(t.common.open)}
                    </span>
                  </div>
                  <p className="mobile-safe-text mt-auto pt-8 text-base leading-relaxed text-muted-foreground md:text-[17px]">
                    {l(d.desc)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="paper py-16">
        <div className="container-rl max-w-3xl">
          <p className="serif text-xl md:text-2xl leading-snug text-ink">{l(t.home.position)}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-rl">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="eyebrow text-accent">{l(t.home.selectedCasesLabel)}</p>
              <h2 className="mobile-safe-text serif text-2xl md:text-3xl mt-3 text-foreground">
                {l(t.home.selectedCasesTitle)}
              </h2>
            </div>
            <Link
              to="/cases"
              className="premium-action text-[11px] tracking-[0.18em] uppercase px-4 py-2"
            >
              {l(t.common.viewAllCases)}
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {previewCases.map((c) => (
              <Link
                to="/cases/$slug"
                params={{ slug: c.slug }}
                key={c.slug}
                className="group block"
              >
                <div className="aspect-[4/3] overflow-hidden bg-muted border border-rule">
                  <img
                    src={c.img}
                    alt={l(c.title)}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="mobile-safe-text serif text-lg text-foreground">{l(c.title)}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-rule">
        <div className="container-rl text-center max-w-2xl">
          <p className="eyebrow text-accent">{l(t.home.confidential)}</p>
          <h2 className="serif text-2xl md:text-3xl mt-5 leading-tight text-foreground">
            {l(t.home.ctaTitle)}
          </h2>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Link
              to="/submit"
              className="premium-action px-6 py-3 text-[11px] tracking-[0.18em] uppercase"
            >
              {l(t.common.submitAnAsset)}
            </Link>
            <Link
              to="/contact"
              className="premium-action px-6 py-3 text-[11px] tracking-[0.18em] uppercase"
            >
              {l(t.common.contact)}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
