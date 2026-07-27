import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatedHeroBackground } from "@/components/site/AnimatedHeroBackground";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cases, type CaseStudy } from "@/data/cases";
import { useLanguage, type LocalizedString } from "@/i18n";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "REPOSITION LAB — Strategic Real Estate Repositioning & Recovery Intelligence",
      },
      {
        name: "description",
        content:
          "Strategic recovery and real estate intelligence partner. We help banks, asset holders and institutional owners unlock hidden value in distressed and underutilized assets.",
      },
      {
        property: "og:title",
        content: "REPOSITION LAB",
      },
      {
        property: "og:description",
        content:
          "Strategic repositioning and recovery intelligence for distressed and underutilized real estate.",
      },
    ],
  }),
  component: Home,
});

const previewSlugs = ["slovenia-castle", "bauskas-16a-riga", "turkey-lifestyle-repositioning"];

const directionOrder = [
  "/who-we-are",
  "/services",
  "/cases",
  "/approach",
  "/recovery-validation",
  "/selected-thinking",
] as const;

const faqHeading = {
  eyebrow: { en: "Frequently asked questions", ru: "Частые вопросы" },
  title: { en: "Before you submit an asset.", ru: "Перед отправкой объекта." },
} satisfies Record<string, LocalizedString>;

const faqItems = [
  {
    question: {
      en: "What types of assets do you work with?",
      ru: "С какими объектами вы работаете?",
    },
    answer: {
      en: "We review complex, undervalued, distressed and underutilized real estate assets, including heritage buildings, hospitality, industrial and mixed-use properties, substantial residences, income-producing assets and properties without a clear future-use scenario.",
      ru: "Мы рассматриваем сложные, недооценённые, проблемные и недоиспользуемые объекты недвижимости: исторические здания, гостиницы, индустриальные и mixed-use объекты, крупные резиденции, доходную недвижимость и активы с неочевидным сценарием использования.",
    },
  },
  {
    question: {
      en: "Who can approach REPOSITION LAB?",
      ru: "Кто может обратиться в REPOSITION LAB?",
    },
    answer: {
      en: "We primarily work with owners, banks, family offices, funds, institutional asset holders and special-situations participants seeking a stronger logic for holding, recovery, conversion or exit.",
      ru: "Мы работаем преимущественно с собственниками, банками, семейными офисами, фондами, институциональными держателями активов и участниками специальных ситуаций, которым требуется более сильная логика удержания, восстановления, конверсии или выхода.",
    },
  },
  {
    question: {
      en: "Which countries do you work in?",
      ru: "В каких странах вы работаете?",
    },
    answer: {
      en: "The practice is based in London and considers international projects. Particular experience spans the United Kingdom, the Baltic states, Slovenia and Turkey, although the work is not limited to these markets.",
      ru: "Практика базируется в Лондоне и рассматривает международные проекты. Особый опыт связан с Великобританией, странами Балтии, Словенией и Турцией, однако география не ограничивается этими рынками.",
    },
  },
  {
    question: {
      en: "What does the initial asset review cover?",
      ru: "Что входит в первичный разбор объекта?",
    },
    answer: {
      en: "The initial review considers whether the asset is being read correctly by the market, which constraints are genuinely material, which future-use scenarios merit investigation and whether strategic repositioning could create a more defensible path toward value and liquidity.",
      ru: "Первичный разбор помогает определить, правильно ли рынок понимает объект, какие ограничения действительно существенны, какие сценарии использования заслуживают проверки и может ли стратегическое перепозиционирование создать более убедительный путь к стоимости и ликвидности.",
    },
  },
  {
    question: {
      en: "What information is needed at the first stage?",
      ru: "Какие материалы нужны на первом этапе?",
    },
    answer: {
      en: "An initial submission only requires a concise description of the asset, its location, current condition, ownership structure and principal challenge. Documents, photographs and technical materials may be requested later through an agreed secure channel.",
      ru: "Для начала достаточно краткого описания объекта, его местоположения, текущего состояния, структуры владения и основной проблемы. Дополнительные документы, фотографии и технические материалы могут быть запрошены позже через согласованный защищённый канал.",
    },
  },
  {
    question: {
      en: "Is submitted information confidential?",
      ru: "Является ли отправленная информация конфиденциальной?",
    },
    answer: {
      en: "Submitted information is used for an internal initial review and is not published. The form does not replace a formal NDA or a dedicated secure process for highly sensitive materials.",
      ru: "Информация используется для внутреннего первичного рассмотрения и не публикуется. При этом отправка формы не заменяет формальный NDA или специализированный защищённый процесс передачи особо чувствительных материалов.",
    },
  },
  {
    question: {
      en: "What happens after a submission?",
      ru: "Что происходит после отправки заявки?",
    },
    answer: {
      en: "The submission is considered in relation to asset type, available information, strategic fit and current mandate capacity. If the asset is relevant to the practice, we will contact the submitter through the preferred channel and arrange the next exchange.",
      ru: "Заявка оценивается с учётом типа объекта, доступной информации, стратегического соответствия и текущей возможности принять новый мандат. Если объект соответствует профилю практики, мы свяжемся с заявителем предпочтительным способом и согласуем следующий обмен.",
    },
  },
  {
    question: {
      en: "Does submitting an asset guarantee an engagement?",
      ru: "Гарантирует ли заявка начало сотрудничества?",
    },
    answer: {
      en: "No. Submitting an asset is not an offer of services, an investment recommendation or a guarantee of engagement. Any decision to continue follows the initial review and depends on the asset’s relevance to the practice.",
      ru: "Нет. Отправка объекта не является предложением услуг, инвестиционной рекомендацией или гарантией начала работы. Решение о дальнейшем обсуждении принимается после первичного рассмотрения и зависит от соответствия объекта профилю практики.",
    },
  },
] satisfies Array<{ question: LocalizedString; answer: LocalizedString }>;

function Home() {
  const { t, l } = useLanguage();
  const valueProofRef = useRef<HTMLElement>(null);
  const [valueProofLinesVisible, setValueProofLinesVisible] = useState(false);

  useEffect(() => {
    const section = valueProofRef.current;
    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValueProofLinesVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setValueProofLinesVisible(true);
        observer.disconnect();
      },
      { threshold: 0.3, rootMargin: "0px 0px -15% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const previewCases = previewSlugs
    .map((slug) => cases.find((caseStudy) => caseStudy.slug === slug))
    .filter((caseStudy): caseStudy is CaseStudy => Boolean(caseStudy));

  const directions = directionOrder
    .map((path) => t.home.directions.find((direction) => direction.to === path))
    .filter((direction): direction is (typeof t.home.directions)[number] => Boolean(direction));

  return (
    <div>
      <section className="relative flex min-h-[70vh] items-end overflow-hidden bg-background">
        <AnimatedHeroBackground />

        <div className="container-rl relative pb-16 pt-32">
          <p className="eyebrow hero-text-reveal hero-text-reveal-eyebrow page-reveal page-reveal-delay-1 text-accent">
            {l(t.home.eyebrow)}
          </p>

          <h1 className="mobile-safe-text serif hero-text-reveal hero-text-reveal-headline page-reveal page-reveal-delay-2 mt-5 max-w-4xl text-3xl leading-[1.05] text-foreground md:text-5xl lg:text-6xl">
            {l(t.home.headlineStart)}{" "}
            <em className="not-italic text-accent">{l(t.home.headlineEm)}</em>
          </h1>

          <p className="hero-text-reveal hero-text-reveal-subtitle page-reveal page-reveal-delay-3 mt-6 max-w-xl text-sm leading-relaxed text-foreground/75 md:text-base">
            {l(t.home.intro)}
          </p>
        </div>
      </section>

      <section
        ref={valueProofRef}
        className="home-value-proof"
        data-lines-visible={valueProofLinesVisible}
      >
        <div className="container-rl home-value-proof-shell">
          <div className="home-value-proof-intro">
            <h2 className="mobile-safe-text serif home-value-proof-thesis">
              {l(t.home.valueProof.thesis)}
            </h2>
            <p className="mobile-safe-text home-value-proof-explanation">
              {l(t.home.valueProof.explanation)}
            </p>
          </div>

          <div className="home-value-proof-directions">
            {t.home.valueProof.directions.map((direction) => (
              <div className="home-value-proof-direction" key={direction.title.en}>
                <h3 className="mobile-safe-text serif">{l(direction.title)}</h3>
                <p className="mobile-safe-text">{l(direction.text)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-rule py-20">
        <div className="container-rl">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <h2 className="serif mt-3 max-w-2xl text-2xl text-foreground md:text-4xl">
                {l(t.home.directionTitle)}
              </h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {directions.map((direction) => {
              const title =
                direction.to === "/recovery-validation"
                  ? {
                      en: "Potential Review",
                      ru: "Оценка потенциала",
                    }
                  : direction.title;

              return (
                <Link
                  key={direction.to}
                  to={direction.to}
                  className="homepage-hub-card group flex min-h-[190px] flex-col p-6 sm:min-h-[210px] md:p-7"
                >
                  <div className="flex items-start justify-between gap-5">
                    <h3 className="mobile-safe-text serif min-w-0 text-2xl text-foreground transition-colors group-hover:text-accent md:text-[30px] md:leading-tight">
                      {l(title)}
                    </h3>

                    <span className="shrink-0 pt-1 text-[10px] uppercase tracking-[0.18em] text-accent transition-colors group-hover:text-accent">
                      {l(t.common.open)}
                    </span>
                  </div>

                  <p className="mobile-safe-text mt-auto pt-8 text-base leading-relaxed text-muted-foreground md:text-[17px]">
                    {l(direction.desc)}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="paper py-16">
        <div className="container-rl max-w-3xl">
          <p className="serif text-xl leading-snug text-ink md:text-2xl">{l(t.home.position)}</p>
        </div>
      </section>

      <section className="py-20">
        <div className="container-rl">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-accent">{l(t.home.selectedCasesLabel)}</p>

              <h2 className="mobile-safe-text serif mt-3 text-2xl text-foreground md:text-3xl">
                {l(t.home.selectedCasesTitle)}
              </h2>
            </div>

            <Link
              to="/cases"
              className="premium-action px-4 py-2 text-[11px] uppercase tracking-[0.18em]"
            >
              {l(t.common.viewAllCases)}
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {previewCases.map((caseStudy) => (
              <Link
                key={caseStudy.slug}
                to="/cases/$slug"
                params={{ slug: caseStudy.slug }}
                className="group block"
              >
                <div className="aspect-[4/3] overflow-hidden border border-rule bg-muted">
                  <img
                    src={caseStudy.img}
                    alt={l(caseStudy.title)}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>

                <div className="mt-4 flex items-baseline justify-between gap-3">
                  <h3 className="mobile-safe-text serif text-lg text-foreground">
                    {l(caseStudy.title)}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        className="border-t border-rule py-20"
        aria-labelledby="home-faq-title"
        data-testid="home-faq"
      >
        <div className="container-rl max-w-4xl">
          <p className="eyebrow text-accent">{l(faqHeading.eyebrow)}</p>
          <h2
            id="home-faq-title"
            className="mobile-safe-text serif mt-3 text-2xl text-foreground md:text-4xl"
          >
            {l(faqHeading.title)}
          </h2>

          <Accordion type="single" collapsible className="mt-10 border-t border-rule">
            {faqItems.map((item, index) => (
              <AccordionItem
                value={`faq-${index + 1}`}
                key={item.question.en}
                className="border-rule"
              >
                <AccordionTrigger className="mobile-safe-text py-6 text-base font-normal leading-snug text-foreground hover:text-accent hover:no-underline md:text-lg">
                  {l(item.question)}
                </AccordionTrigger>
                <AccordionContent className="mobile-safe-text max-w-3xl pb-6 pr-8 text-sm leading-relaxed text-muted-foreground md:text-base">
                  {l(item.answer)}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="border-t border-rule py-20">
        <div className="container-rl max-w-2xl text-center">
          <p className="eyebrow text-accent">{l(t.home.confidential)}</p>

          <h2 className="serif mt-5 text-2xl leading-tight text-foreground md:text-3xl">
            {l(t.home.ctaTitle)}
          </h2>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/submit"
              className="premium-action px-6 py-3 text-[11px] uppercase tracking-[0.18em]"
            >
              {l(t.common.submitAnAsset)}
            </Link>

            <Link
              to="/contact"
              className="premium-action px-6 py-3 text-[11px] uppercase tracking-[0.18em]"
            >
              {l(t.common.contact)}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
