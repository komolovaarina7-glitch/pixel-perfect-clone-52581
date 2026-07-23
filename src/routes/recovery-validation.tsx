import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { BackToHome } from "@/components/site/BackToHome";
import { useLanguage, withoutTerminalDots, type LocalizedString } from "@/i18n";

export const Route = createFileRoute("/recovery-validation")({
  head: () => ({
    meta: [
      { title: "Independent Recovery Validation Framework — REPOSITION LAB" },
      {
        name: "description",
        content:
          "Independent valuation logic for repositioning-adjusted recovery scenarios. How REPOSITION LAB helps banks and institutional asset holders compare distressed recovery models with repositioning-adjusted scenarios.",
      },
      {
        property: "og:title",
        content: "Independent Recovery Validation Framework — REPOSITION LAB",
      },
      {
        property: "og:description",
        content: "Independent valuation logic for repositioning-adjusted recovery scenarios.",
      },
    ],
  }),
  component: RecoveryValidation,
});

const page = {
  eyebrow: { en: "Recovery Validation", ru: "Оценка потенциала перепозиционирования" },
  title: {
    en: "Independent Recovery Validation Framework",
    ru: "Оценка потенциала перепозиционирования",
  },
  subtitle: {
    en: "Independent valuation logic for repositioning-adjusted recovery scenarios.",
    ru: "Анализируем текущее рыночное положение объекта и проверяем, может ли перепозиционирование создать более сильный сценарий ценности, ликвидности и восприятия.",
  },
  closing: {
    en: "From concept to recovery model.",
    ru: "От текущего положения объекта к более сильному рыночному сценарию.",
  },
} satisfies Record<string, LocalizedString>;

const paragraphs: LocalizedString[] = [
  {
    en: "REPOSITION LAB does not treat repositioning as a visual concept exercise. The work is designed to create a structured recovery argument: how an asset is read today, how its marketability may change after repositioning, and how that difference can be tested through institutional valuation logic.",
    ru: "REPOSITION LAB не рассматривает перепозиционирование как работу над визуальной концепцией. Задача — сформировать структурированный аргумент: как объект воспринимается сегодня, как его рыночная позиция может измениться после перепозиционирования и как эту разницу можно проверить через независимую оценочную логику.",
  },
  {
    en: "Traditional valuation can fail to fully capture repositionable potential. Unusual assets are often assessed through their current distress, vacancy, layout, condition or narrow comparable set, while their adaptive reuse logic, heritage value, experiential potential, future audience and market repositioning capacity remain under-read.",
    ru: "Традиционная оценка может не полностью отражать потенциал перепозиционирования. Нестандартные объекты часто рассматриваются через текущее проблемное состояние, вакантность, планировку, техническое состояние или узкий набор сопоставимых сделок, тогда как логика адаптивного использования, ценность наследия, пользовательский сценарий, будущая аудитория и возможность рыночного перепозиционирования остаются недооценёнными.",
  },
  {
    en: "This is especially relevant for heritage properties, distressed architecture, non-standard layouts, lifestyle or hospitality-led real estate and assets whose future use is not obvious under conventional disposal logic. REPOSITION LAB's role is to help make that repositionable potential legible before it is tested through valuation, recovery and disposal scenarios.",
    ru: "Это особенно важно для исторических объектов, проблемной архитектуры, нестандартных планировок, недвижимости с гостиничным, культурным или lifestyle-сценарием и объектов, чьё будущее использование не очевидно в рамках стандартной логики продажи. Роль REPOSITION LAB — сделать потенциал перепозиционирования понятным до того, как он будет проверен через оценку, сценарии вывода и возможную стратегию реализации.",
  },
  {
    en: "Where appropriate, REPOSITION LAB works alongside bank-approved or institutionally recognized independent valuation firms to help compare the asset's current distressed position with repositioning-adjusted recovery scenarios. This may include current distressed asset value, repositioned marketability, adaptive reuse impact, post-repositioning valuation scenarios and liquidity enhancement potential.",
    ru: "Где уместно, REPOSITION LAB работает рядом с одобренными банками или институционально признанными независимыми оценочными компаниями, чтобы помочь сравнить текущее проблемное положение объекта со сценариями после перепозиционирования. Такой анализ может учитывать текущую стоимость проблемного объекта, рыночную привлекательность после перепозиционирования, влияние адаптивного использования, возможные оценочные сценарии и потенциал повышения ликвидности.",
  },
  {
    en: "The review may bring together real estate repositioning strategists, adaptive reuse architects, heritage and conservation consultants, technical advisors, legal and zoning specialists, market analysts, feasibility specialists and independent valuers where appropriate.",
    ru: "Такой разбор может объединять стратегов по перепозиционированию недвижимости, архитекторов адаптивного использования, консультантов по наследию и сохранению, технических специалистов, юридических консультантов, специалистов по зонированию, рыночных аналитиков, экспертов по реализуемости и независимых оценщиков там, где это уместно.",
  },
  {
    en: "For banks and institutional asset holders, this matters because recovery decisions are not made on emotion, attractive imagery or speculative development ideas. They are connected to recoverability, collateral value, provisioning assumptions, liquidation improvement, hold/sell decisions, distressed disposal timing, restructuring options, portfolio strategy and balance-sheet effect.",
    ru: "Для банков и институциональных собственников это важно, потому что решения по сложным объектам не принимаются на эмоциях, привлекательной картинке или спекулятивных девелоперских идеях. Они связаны со стоимостью обеспечения, резервными допущениями, улучшением сценария ликвидации, решениями удерживать или продавать, сроками продажи проблемного объекта, вариантами реструктуризации, стратегией портфеля и влиянием на баланс.",
  },
  {
    en: "The purpose is not to replace formal valuation, provide investment advice or guarantee value uplift. The purpose is to help create a defensible basis for comparing current recovery assumptions with a repositioning-adjusted model.",
    ru: "Цель — не заменить формальную оценку, не предоставить инвестиционный совет и не гарантировать рост стоимости. Цель — помочь сформировать обоснованную основу для сравнения текущих допущений с моделью, скорректированной с учётом перепозиционирования.",
  },
  {
    en: "This is where repositioning becomes more than a concept: it becomes a recovery model that can be tested, discussed and compared.",
    ru: "Здесь перепозиционирование становится больше, чем концепцией: оно превращается в модель, которую можно проверять, обсуждать и сравнивать.",
  },
];

function RecoveryValidation() {
  const { t, l } = useLanguage();
  const heroRef = useRef<HTMLElement>(null);
  const chapterRefs = useRef<Array<HTMLElement | null>>([]);
  const closingRef = useRef<HTMLDivElement>(null);
  const [isPastHero, setIsPastHero] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  const lead = paragraphs[0];
  const conclusion = paragraphs[paragraphs.length - 1];
  const bodyParagraphs = paragraphs.slice(1, -1);
  const chapters = Array.from({ length: Math.ceil(bodyParagraphs.length / 2) }, (_, index) =>
    bodyParagraphs.slice(index * 2, index * 2 + 2),
  );

  useEffect(() => {
    const hero = heroRef.current;
    const chapterElements = chapterRefs.current.filter(
      (chapter): chapter is HTMLElement => chapter !== null,
    );
    const closing = closingRef.current;

    if (!hero || chapterElements.length === 0) return;

    const heroObserver = new IntersectionObserver(
      ([entry]) => setIsPastHero(!entry.isIntersecting),
      { rootMargin: "-18% 0px -70%", threshold: 0 },
    );

    const chapterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.chapterIndex);
          setActiveChapter(index);
          entry.target.classList.add("validation-chapter--revealed");
        });
      },
      { rootMargin: "-24% 0px -46%", threshold: 0.12 },
    );

    const closingObserver = closing
      ? new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting)
              entry.target.classList.add("validation-closing-wrap--revealed");
          },
          { rootMargin: "0px 0px -18%", threshold: 0.2 },
        )
      : null;

    heroObserver.observe(hero);
    chapterElements.forEach((chapter) => chapterObserver.observe(chapter));
    if (closing && closingObserver) closingObserver.observe(closing);

    return () => {
      heroObserver.disconnect();
      chapterObserver.disconnect();
      closingObserver?.disconnect();
    };
  }, []);

  return (
    <article className={`validation-page ${isPastHero ? "validation-page--reading" : ""}`}>
      <BackToHome />

      <header ref={heroRef} className="validation-hero standard-page-hero">
        <div className="container-rl validation-hero-content">
          <p className="eyebrow text-accent page-reveal page-reveal-delay-1">{l(page.eyebrow)}</p>
          <h1 className="standard-page-hero-title mobile-safe-text serif validation-title page-reveal page-reveal-delay-2">
            {withoutTerminalDots(l(page.title))}
          </h1>
          <p className="mobile-safe-text validation-subtitle page-reveal page-reveal-delay-3">
            {l(page.subtitle)}
          </p>
        </div>
      </header>

      <section className="validation-body">
        <div className="container-rl validation-memo">
          <div className="validation-copy">
            <p className="validation-copy-lead">{l(lead)}</p>

            <div className="validation-chapters">
              {chapters.map((chapter, index) => (
                <section
                  ref={(element) => {
                    chapterRefs.current[index] = element;
                  }}
                  data-chapter-index={index}
                  className={`validation-chapter ${activeChapter === index ? "validation-chapter--active" : ""}`}
                  key={chapter.map((paragraph) => paragraph.en).join("|")}
                >
                  {chapter.map((paragraph) => (
                    <p key={paragraph.en}>{l(paragraph)}</p>
                  ))}
                </section>
              ))}
            </div>

            <p className="validation-copy-conclusion">{l(conclusion)}</p>
          </div>
        </div>

        <div ref={closingRef} className="container-rl validation-closing-wrap">
          <p className="mobile-safe-text serif validation-closing">{l(page.closing)}</p>
          <Link to="/submit" className="validation-action premium-action">
            {l(t.common.submitAnAsset)}
          </Link>
        </div>
      </section>
    </article>
  );
}
