import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { AnimatedHeroTitle } from "@/components/site/AnimatedHeroTitle";
import { BackToHome } from "@/components/site/BackToHome";
import { BeforeAfterReveal } from "@/components/site/BeforeAfterReveal";
import { CastleLineDrawing } from "@/components/site/CastleLineDrawing";
import { FallingLeaves } from "@/components/site/FallingLeaves";
import { MountainLineDrawing } from "@/components/site/MountainLineDrawing";
import { cases } from "@/data/cases";
import { useLanguage } from "@/i18n";
import { getPublishedCases, getPublishedContent } from "@/lib/api/admin.functions";
import { applyManagedCaseContent, mergePublishedCases } from "@/lib/admin/public-content";

export const Route = createFileRoute("/cases_/$slug")({
  loader: async ({ params }) => {
    const [managedCases, managedContent] = await Promise.all([
      getPublishedCases(),
      getPublishedContent(),
    ]);
    const baseCaseStudy = mergePublishedCases(cases, managedCases).find(
      (item) => item.slug === params.slug,
    );
    if (!baseCaseStudy) throw notFound();
    return applyManagedCaseContent(baseCaseStudy, managedContent);
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title.en} — REPOSITION LAB` },
          { name: "description", content: loaderData.challenge.en },
          { property: "og:title", content: `${loaderData.title.en} — REPOSITION LAB` },
          { property: "og:description", content: loaderData.challenge.en },
          { property: "og:type", content: "article" },
          { property: "og:url", content: `https://reposition-lab.com/cases/${loaderData.slug}` },
          {
            property: "og:image",
            content: loaderData.img.startsWith("/")
              ? `https://reposition-lab.com${loaderData.img}`
              : "https://reposition-lab.com/",
          },
          { name: "twitter:card", content: "summary_large_image" },
        ]
      : [],
    links: loaderData
      ? [{ rel: "canonical", href: `https://reposition-lab.com/cases/${loaderData.slug}` }]
      : [],
  }),
  component: CaseDetail,
});

function CaseDetail() {
  const articleRef = useRef<HTMLElement | null>(null);
  const { slug } = Route.useParams();
  const caseStudy = Route.useLoaderData();
  const { t, l } = useLanguage();
  const hasArchitecturalDrawing = slug === "slovenia-castle" || slug === "bauskas-16a-riga";
  const hasMountainDrawing = slug === "turkey-lifestyle-repositioning";
  const hasFallingLeaves = slug === "distressed-prime-apartments";
  const hasEditorialGallery =
    slug === "slovenia-castle" ||
    slug === "bauskas-16a-riga" ||
    slug === "turkey-lifestyle-repositioning" ||
    slug === "distressed-prime-apartments" ||
    slug === "kekava-production-campus" ||
    slug === "flotes-8-community-infrastructure";

  useEffect(() => {
    const article = articleRef.current;
    if (!article) {
      return;
    }

    const items = Array.from(article.querySelectorAll<HTMLElement>(".case-photo-reveal"));
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      items.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    article.classList.add("case-photo-reveal-ready");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -4% 0px" },
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [slug]);

  return (
    <article ref={articleRef}>
      <BackToHome />
      <header
        className={`case-detail-hero container-rl pt-8 pb-16 ${
          hasArchitecturalDrawing || hasMountainDrawing || hasFallingLeaves
            ? "line-art-case-hero"
            : ""
        }`}
      >
        {caseStudy.slug === "slovenia-castle" && <CastleLineDrawing variant="slivnica" />}
        {caseStudy.slug === "bauskas-16a-riga" && <CastleLineDrawing variant="bauskas" />}
        {hasMountainDrawing && <MountainLineDrawing />}
        {hasFallingLeaves && <FallingLeaves />}
        <div className="relative z-10">
          <Link
            to="/cases"
            className="page-reveal page-reveal-delay-1 mobile-safe-text inline-flex max-w-full items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-muted-foreground hover:text-accent transition-colors border-b border-transparent hover:border-accent/40 pb-1 sm:tracking-[0.22em]"
          >
            <span aria-hidden>←</span>
            <span>{l(t.common.backToCases)}</span>
          </Link>
          <p className="internal-hero-eyebrow eyebrow mt-10 text-accent">{l(caseStudy.theme)}</p>
          <h1 className="mobile-safe-text serif text-4xl md:text-6xl mt-6 max-w-4xl leading-[1.05] text-foreground">
            <AnimatedHeroTitle>{l(caseStudy.title)}</AnimatedHeroTitle>
          </h1>
          {caseStudy.subtitle && (
            <p className="internal-hero-subtitle mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {l(caseStudy.subtitle)}
            </p>
          )}
        </div>
      </header>

      <section className="case-file-intro border-t border-rule">
        <div className="container-rl py-12 grid gap-10 items-start lg:grid-cols-12 lg:gap-14 lg:py-16">
          <div className="case-file-visual lg:col-span-5">
            <div className="case-file-image case-photo-reveal case-photo-reveal-light case-photo-reveal-zoom aspect-[4/3] overflow-hidden bg-muted border border-rule">
              <img
                src={caseStudy.img}
                alt={l(caseStudy.title)}
                loading="lazy"
                width={1280}
                height={960}
                className="w-full h-full object-cover"
                style={
                  caseStudy.imgPosition ? { objectPosition: caseStudy.imgPosition } : undefined
                }
              />
            </div>
          </div>

          <div className="case-file-dossier lg:col-span-7">
            <div className="case-file-finding">
              <p className="eyebrow text-accent">{l(t.cases.assetChallenge)}</p>
              <p className="mt-3 text-muted-foreground leading-relaxed text-lg">
                {l(caseStudy.challenge)}
              </p>
            </div>
            <div className="case-file-finding">
              <p className="eyebrow text-accent">{l(t.cases.logic)}</p>
              <p className="mt-3 text-muted-foreground leading-relaxed text-lg">
                {l(caseStudy.logic)}
              </p>
            </div>
            <div className="case-file-finding">
              <p className="eyebrow text-accent">{l(t.cases.direction)}</p>
              <p className="mt-3 text-foreground/85 leading-relaxed text-lg">
                {l(caseStudy.direction)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {caseStudy.sections && caseStudy.sections.length > 0 && (
        <section className="case-file-sections border-t border-rule py-16 md:py-20">
          <div className="container-rl max-w-5xl space-y-14 md:space-y-20">
            {caseStudy.sections.map((s, i) => {
              const gl = caseStudy.gallery ?? [];
              const extItem = gl.find((g) => g.type === "exterior");
              const upperItem = gl.find((g) => g.type === "upper");
              const intItem = gl.find((g) => g.type === "interior");
              const detailItem = gl.find((g) => g.type === "detail");
              const lowerItem = gl.find((g) => g.type === "lower");
              const atmItem = gl.find((g) => g.type === "atmosphere");

              return (
                <div key={s.eyebrow.en} className="case-file-chapter">
                  <p className="eyebrow text-accent">{l(s.eyebrow)}</p>
                  <div className="mt-6 max-w-4xl space-y-5 text-lg leading-relaxed text-foreground/80">
                    {s.body.map((para, j) => (
                      <p key={j}>{l(para)}</p>
                    ))}
                  </div>

                  {/* After "Repositioning Thesis" — wide exterior slot */}
                  {hasEditorialGallery && i === 0 && (
                    <div className="case-file-evidence-zone mt-12">
                      {extItem ? (
                        <div className="case-file-evidence-plate case-file-evidence-plate-wide case-photo-reveal case-photo-reveal-panorama aspect-[16/9] overflow-hidden border border-rule">
                          <img
                            src={extItem.src}
                            alt={extItem.alt}
                            loading="lazy"
                            width={1280}
                            height={720}
                            className="w-full h-full object-cover"
                            style={
                              extItem.objectPosition
                                ? { objectPosition: extItem.objectPosition }
                                : undefined
                            }
                          />
                        </div>
                      ) : (
                        <div className="case-file-photo-slot aspect-[16/9]">
                          <span className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50">
                            Image slot — exterior
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* After "Spatial Identity as Value Driver" — 2-col interior row */}
                  {hasEditorialGallery && i === 1 && (
                    <div className="case-file-evidence-zone mt-12 grid sm:grid-cols-2 gap-5">
                      {intItem ? (
                        <div className="case-file-evidence-plate case-photo-reveal case-photo-reveal-light case-photo-reveal-zoom aspect-[4/3] overflow-hidden border border-rule">
                          <img
                            src={intItem.src}
                            alt={intItem.alt}
                            loading="lazy"
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                            style={
                              intItem.objectPosition
                                ? { objectPosition: intItem.objectPosition }
                                : undefined
                            }
                          />
                        </div>
                      ) : (
                        <div className="case-file-photo-slot aspect-[4/3]">
                          <span className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50">
                            Image slot — interior atmosphere
                          </span>
                        </div>
                      )}
                      {detailItem ? (
                        <div className="case-file-evidence-plate case-photo-reveal case-photo-reveal-light case-photo-reveal-zoom aspect-[4/3] overflow-hidden border border-rule">
                          <img
                            src={detailItem.src}
                            alt={detailItem.alt}
                            loading="lazy"
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                            style={
                              detailItem.objectPosition
                                ? { objectPosition: detailItem.objectPosition }
                                : undefined
                            }
                          />
                        </div>
                      ) : (
                        <div className="case-file-photo-slot aspect-[4/3]">
                          <span className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50">
                            Image slot — architectural detail
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* After "Cinematic Upper Environment" — wide upper space slot */}
                  {hasEditorialGallery && i === 2 && (
                    <div className="case-file-evidence-zone mt-12">
                      {upperItem ? (
                        <div className="case-file-evidence-plate case-file-evidence-plate-wide case-photo-reveal case-photo-reveal-panorama aspect-[16/9] overflow-hidden border border-rule">
                          <img
                            src={upperItem.src}
                            alt={upperItem.alt}
                            loading="lazy"
                            width={1280}
                            height={720}
                            className="w-full h-full object-cover"
                            style={
                              upperItem.objectPosition
                                ? { objectPosition: upperItem.objectPosition }
                                : undefined
                            }
                          />
                        </div>
                      ) : (
                        <div className="case-file-photo-slot aspect-[16/9]">
                          <span className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50">
                            Image slot — upper representative space
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* After "Residential Flexibility" — 2-col lower level row */}
                  {hasEditorialGallery && i === 3 && (
                    <div className="case-file-evidence-zone mt-12 grid sm:grid-cols-2 gap-5">
                      {lowerItem ? (
                        <div className="case-file-evidence-plate case-photo-reveal case-photo-reveal-light case-photo-reveal-zoom aspect-[4/3] overflow-hidden border border-rule">
                          <img
                            src={lowerItem.src}
                            alt={lowerItem.alt}
                            loading="lazy"
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                            style={
                              lowerItem.objectPosition
                                ? { objectPosition: lowerItem.objectPosition }
                                : undefined
                            }
                          />
                        </div>
                      ) : (
                        <div className="case-file-photo-slot aspect-[4/3]">
                          <span className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50">
                            Image slot — residential floor
                          </span>
                        </div>
                      )}
                      {atmItem ? (
                        <div className="case-file-evidence-plate case-photo-reveal case-photo-reveal-light case-photo-reveal-zoom aspect-[4/3] overflow-hidden border border-rule">
                          <img
                            src={atmItem.src}
                            alt={atmItem.alt}
                            loading="lazy"
                            width={800}
                            height={600}
                            className="w-full h-full object-cover"
                            style={
                              atmItem.objectPosition
                                ? { objectPosition: atmItem.objectPosition }
                                : undefined
                            }
                          />
                        </div>
                      ) : (
                        <div className="case-file-photo-slot aspect-[4/3]">
                          <span className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground/50">
                            Image slot — lower level
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {caseStudy.advantages && caseStudy.advantages.length > 0 && (
        <section className="border-t border-rule py-20">
          <div className="container-rl max-w-4xl">
            <p className="case-file-advantages-label eyebrow text-accent">
              {l(t.cases.advantagesLabel)}
            </p>
            <div className="mt-8 grid gap-7 md:grid-cols-2">
              {caseStudy.advantages.map((advantage) => (
                <div key={advantage.title.en}>
                  <h2 className="serif text-2xl text-foreground">{l(advantage.title)}</h2>
                  <p className="mt-3 text-muted-foreground leading-relaxed">{l(advantage.body)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {caseStudy.slug === "slovenia-castle" && (
        <section className="case-file-chapter border-t border-rule py-16 md:py-20">
          <div className="container-rl max-w-5xl">
            <p className="eyebrow text-accent">
              {l({ en: "Repositioning in Motion", ru: "Репозиционирование в движении" })}
            </p>
            <div className="mt-8">
              <BeforeAfterReveal
                beforeSrc="/sliv1.jpg"
                afterSrc="/sliv2.jpg"
                beforeAlt={l({
                  en: "Slivnica Castle before repositioning — underutilized heritage structure",
                  ru: "Замок Сливница до перепозиционирования — недоиспользуемый объект наследия",
                })}
                afterAlt={l({
                  en: "Slivnica Castle after repositioning — cultural destination",
                  ru: "Замок Сливница после перепозиционирования — культурное направление",
                })}
                beforeLabel={{
                  eyebrow: l({ en: "Before", ru: "До" }),
                  caption: l({ en: "Underutilized Heritage", ru: "Недоиспользуемое наследие" }),
                }}
                afterLabel={{
                  eyebrow: l({ en: "After", ru: "После" }),
                  caption: l({ en: "Cultural Destination", ru: "Культурное направление" }),
                }}
                replayLabel={l({ en: "Replay transformation", ru: "Повторить трансформацию" })}
                replayLabelShort={l({ en: "Replay", ru: "Повтор" })}
                conceptEyebrow={l({
                  en: "Repositioning strategy",
                  ru: "Стратегия репозиционирования",
                })}
                conceptTitle={l({
                  en: "From a static heritage asset to an international working platform",
                  ru: "От статичного объекта наследия к международной работающей платформе",
                })}
                conceptItems={[
                  l({ en: "Creative production", ru: "Креативное производство" }),
                  l({ en: "Education & exchange", ru: "Образование и обмен" }),
                  l({ en: "Selective hospitality", ru: "Камерное гостеприимство" }),
                ]}
              />
            </div>
          </div>
        </section>
      )}

      {caseStudy.slug === "bauskas-16a-riga" && (
        <>
          <section className="case-file-chapter border-t border-rule py-16 md:py-20">
            <div className="container-rl max-w-5xl">
              <p className="eyebrow text-accent">
                {l({ en: "Repositioning in Motion", ru: "Репозиционирование в движении" })}
              </p>
              <div className="mt-8">
                <BeforeAfterReveal
                  beforeSrc="/images/cases/bauskas-16a/case12.jpg"
                  afterSrc="/images/cases/bauskas-16a/baus2.jpg"
                  beforeAlt={l({
                    en: "Bauskas 16A interior before repositioning — unintegrated heritage structure without operating logic",
                    ru: "Усадьба Bauskas 16A до перепозиционирования — фрагментированный объект наследия без операционной логики",
                  })}
                  afterAlt={l({
                    en: "Bauskas 16A grand representative salon after repositioning — operator-led cultural and hospitality platform",
                    ru: "Парадный зал Bauskas 16A после перепозиционирования — операторская платформа гостеприимства и съемок",
                  })}
                  beforeLabel={{
                    eyebrow: l({ en: "Before", ru: "До" }),
                    caption: l({ en: "Unintegrated Estate", ru: "Фрагментированная усадьба" }),
                  }}
                  afterLabel={{
                    eyebrow: l({ en: "After", ru: "После" }),
                    caption: l({ en: "Operator Platform", ru: "Операторская платформа" }),
                  }}
                  replayLabel={l({ en: "Replay transformation", ru: "Повторить трансформацию" })}
                  replayLabelShort={l({ en: "Replay", ru: "Повтор" })}
                  conceptEyebrow={l({
                    en: "Professional Re-Evaluation",
                    ru: "Профессиональная переоценка",
                  })}
                  conceptTitle={l({
                    en: "From an illiquid property stalemate to an operator-led hospitality and production ecosystem",
                    ru: "От неликвидного тупика — к операторской платформе гостеприимства, съемок и событий",
                  })}
                  conceptItems={[
                    l({ en: "Operator-led hospitality", ru: "Операторское гостеприимство" }),
                    l({ en: "Cinematic production", ru: "Кино- и фотопроизводство" }),
                    l({ en: "Adaptive residencies", ru: "Адаптивные резиденции" }),
                  ]}
                />
              </div>
            </div>
          </section>

          <section className="border-t border-rule py-16 md:py-20 bg-muted/20">
            <div className="container-rl max-w-5xl">
              <div className="max-w-3xl">
                <p className="eyebrow text-accent">
                  {l({
                    en: "Condition Assessment & Documentary Evidence",
                    ru: "Оценка исходного состояния и документальный архив",
                  })}
                </p>
                <h2 className="serif text-3xl md:text-4xl mt-4 text-foreground">
                  {l({
                    en: "Photographic record behind the strategic re-evaluation",
                    ru: "Фотофиксация исходного состояния как основа переоценки",
                  })}
                </h2>
                <p className="mt-4 text-muted-foreground leading-relaxed text-base md:text-lg">
                  {l({
                    en: "Before defining the repositioning thesis, the estate was audited room-by-room. The archival record revealed that physical patina and architectural layeredness—previously perceived as renovation liabilities—were the core assets needed for a differentiated operator model.",
                    ru: "До формирования стратегии перепозиционирования объект прошел детальный аудит каждого помещения. Архивные кадры подтвердили: историческая патина и многослойность пространства, ранее считавшиеся затратным обременением, стали главным фактором привлекательности для профильных операторов.",
                  })}
                </p>
              </div>

              <div className="mt-12 grid gap-8 sm:grid-cols-2">
                {[
                  {
                    src: "/images/cases/bauskas-16a/case12.jpg",
                    title: {
                      en: "Raw Interior Condition",
                      ru: "Исходное состояние помещений",
                    },
                    note: {
                      en: "Observed state: Worn authentic finishes and unprogrammed rooms. Strategic re-evaluation: Preserve genuine patina for cinematic value instead of speculative full-scale rebuild.",
                      ru: "Факт наблюдения: Неоднородная историческая отделка без функционального назначения. Вывод переоценки: Сохранение патины для съемочных сценариев вместо дорогой новодельной отделки.",
                    },
                  },
                  {
                    src: "/images/cases/bauskas-16a/image3.jpg",
                    title: {
                      en: "Circulation & Flow Separation",
                      ru: "Внутренняя циркуляция и потоки",
                    },
                    note: {
                      en: "Observed state: Complex multi-level transitions. Strategic re-evaluation: Structure independent circulation between private apartments, public salon and service zones.",
                      ru: "Факт наблюдения: Сложные межуровневые переходы. Вывод переоценки: Разделение маршрутов частного проживания, парадных приемов и бэк-офиса.",
                    },
                  },
                  {
                    src: "/images/cases/bauskas-16a/page12.jpg",
                    title: {
                      en: "Upper Level Historic Atmosphere",
                      ru: "Историческая атмосфера верхних залов",
                    },
                    note: {
                      en: "Observed state: Double-height proportions and library spaces. Strategic re-evaluation: Forms the emotional anchor for curated events and film productions.",
                      ru: "Факт наблюдения: Двусветные пропорции и библиотечные залы. Вывод переоценки: Эмоциональное ядро для закрытых событий и кинопроизводства.",
                    },
                  },
                  {
                    src: "/images/cases/bauskas-16a/page123.jpg",
                    title: {
                      en: "Multi-Layered Spatial Scale",
                      ru: "Многослойный масштаб пространства",
                    },
                    note: {
                      en: "Observed state: Varied ceiling heights and room volumes. Strategic re-evaluation: Enables complementary multi-scenario operation across all seasons.",
                      ru: "Факт наблюдения: Разновысотные помещения и контрастные объемы. Вывод переоценки: Возможность круглогодичной мультисценарной загрузки.",
                    },
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="border border-rule bg-background p-5 flex flex-col justify-between"
                  >
                    <div className="aspect-[4/3] overflow-hidden border border-rule/60 bg-muted">
                      <img
                        src={item.src}
                        alt={l(item.title)}
                        loading="lazy"
                        width={800}
                        height={600}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="mt-5 space-y-2">
                      <h3 className="serif text-xl text-foreground">{l(item.title)}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {l(item.note)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {!hasEditorialGallery && (
        <section className="paper py-20">
          <div className="container-rl">
            <p className="case-file-evidence-label eyebrow text-accent">
              {l(t.cases.evidenceLabel)}
            </p>
            <div className="mt-6 border border-rule min-h-[220px] flex items-center justify-center px-6 text-center">
              <p className="text-sm text-ink/65 max-w-xl leading-relaxed">
                {l(t.cases.evidenceText)}
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="py-24">
        <div className="container-rl text-center">
          <Link
            to="/submit"
            className="premium-action px-7 py-3.5 text-[12px] tracking-[0.18em] uppercase"
          >
            {l(t.cases.submit)}
          </Link>
        </div>
      </section>
    </article>
  );
}
