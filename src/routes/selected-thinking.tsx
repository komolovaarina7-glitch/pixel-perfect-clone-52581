import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatedHeroTitle } from "@/components/site/AnimatedHeroTitle";
import { BackToHome } from "@/components/site/BackToHome";
import { useLanguage, withoutTerminalDots, type LocalizedString } from "@/i18n";

export const Route = createFileRoute("/selected-thinking")({
  head: () => ({
    meta: [
      { title: "Selected Thinking — REPOSITION LAB" },
      {
        name: "description",
        content:
          "Notes on hidden value, liquidity engineering, heritage repositioning and recovery-focused real estate intelligence.",
      },
      { property: "og:title", content: "Selected Thinking — REPOSITION LAB" },
      {
        property: "og:description",
        content: "Notes on recovery, repositioning and real estate intelligence.",
      },
      { property: "og:url", content: "https://reposition-lab.com/selected-thinking" },
    ],
    links: [{ rel: "canonical", href: "https://reposition-lab.com/selected-thinking" }],
  }),
  component: Thinking,
});

const page = {
  eyebrow: { en: "Selected Thinking", ru: "ИЗБРАННЫЕ МАТЕРИАЛЫ" },
  title: {
    en: "Notes on recovery, repositioning and real estate intelligence.",
    ru: "Материалы о перепозиционировании, ликвидности и рыночной логике сложной недвижимости.",
  },
  intro: {
    en: "A running set of internal positions. Written for owners and capital who already recognise the problem. Full essays are released selectively under mandate.",
    ru: "Рабочий набор аналитических позиций для собственников и капитала, которые уже видят проблему объекта. Полные материалы раскрываются выборочно в рамках мандата.",
  },
} satisfies Record<string, LocalizedString>;

const pieces: Array<{ title: LocalizedString; excerpt: LocalizedString }> = [
  {
    title: {
      en: "Why distressed assets fail",
      ru: "Почему проблемные объекты теряют рыночную логику",
    },
    excerpt: {
      en: "Most distressed real estate does not fail because of the building. It fails because the thesis around the building collapsed and was never rewritten.",
      ru: "Большинство проблемных объектов теряют позицию не из-за самого здания. Проблема возникает тогда, когда рыночная логика вокруг здания разрушилась и не была переписана.",
    },
  },
  {
    title: { en: "Hidden value vs market value", ru: "Скрытая стоимость и рыночная стоимость" },
    excerpt: {
      en: "Market value reflects how the asset is read today. Hidden value reflects how it can be defensibly re-read. The gap is the discipline.",
      ru: "Рыночная стоимость отражает то, как объект воспринимается сегодня. Скрытый потенциал показывает, как его можно обоснованно переосмыслить. Работа начинается с разницы между этими двумя состояниями.",
    },
  },
  {
    title: {
      en: "Why banks misprice unusual real estate",
      ru: "Почему банки неверно оценивают нестандартную недвижимость",
    },
    excerpt: {
      en: "Institutional pricing models do not accommodate narrative-led assets. The result is systematic underpricing of heritage, industrial and special-situation collateral.",
      ru: "Институциональные модели ценообразования плохо учитывают объекты, чья ценность зависит от истории, сценария использования и восприятия. Результат — системное недооценивание наследия, индустриальных объектов и нестандартного обеспечения.",
    },
  },
  {
    title: { en: "Heritage repositioning economics", ru: "Экономика репозиционирования наследия" },
    excerpt: {
      en: "Heritage value is not a discount. It is a constraint with a yield profile. Treated as such, it becomes capital-attractive.",
      ru: "Ценность наследия — не дисконт. Это ограничение с собственным профилем доходности. Если обращаться с ним правильно, оно становится привлекательным для капитала.",
    },
  },
  {
    title: { en: "Hospitality conversion logic", ru: "Логика гостиничной конверсии" },
    excerpt: {
      en: "Conversion to hospitality is the most over-promised and under-engineered move in distressed real estate. The thesis must precede the floor plan.",
      ru: "Гостиничная конверсия — один из самых часто переобещанных и недоработанных ходов в проблемной недвижимости. Тезис должен предшествовать планировке.",
    },
  },
  {
    title: {
      en: "Liquidity engineering in real estate",
      ru: "Как формируется ликвидность недвижимости",
    },
    excerpt: {
      en: "Illiquidity is a design problem. The path to liquidity is structured before it is marketed.",
      ru: "Неликвидность часто связана не только с ценой, но и со структурой предложения. Путь к ликвидности формируется до того, как объект выводится на рынок.",
    },
  },
  {
    title: {
      en: "Narrative-driven asset repositioning",
      ru: "Репозиционирование через новую рыночную историю",
    },
    excerpt: {
      en: "An asset is the story qualified capital can defend about it. Repositioning is the deliberate authorship of that story.",
      ru: "Объект становится понятнее рынку, когда вокруг него можно обоснованно сформулировать новую историю. Перепозиционирование — сознательная работа с этой историей.",
    },
  },
  {
    title: { en: "Adaptive reuse strategies", ru: "Стратегии адаптивного использования" },
    excerpt: {
      en: "Adaptive reuse succeeds where the new use respects the structural logic of the building — and fails where it fights it.",
      ru: "Адаптивное использование работает там, где новая функция уважает структурную логику здания, и проваливается там, где борется с ней.",
    },
  },
  {
    title: {
      en: "Recovery-focused real estate intelligence",
      ru: "Аналитика недвижимости для сложных объектов",
    },
    excerpt: {
      en: "Recovery is not the opposite of growth. It is the discipline that determines whether growth is defensible.",
      ru: "Рост стоимости имеет смысл только тогда, когда его можно объяснить. Для сложных объектов аналитика должна показывать, какой сценарий действительно можно защитить.",
    },
  },
];

function Thinking() {
  const { l } = useLanguage();
  const entryRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeEntry, setActiveEntry] = useState(0);
  const [effectsReady, setEffectsReady] = useState(false);

  useEffect(() => {
    const entries = entryRefs.current.filter((entry): entry is HTMLElement => entry !== null);
    if (entries.length === 0) return;

    setEffectsReady(true);

    const observer = new IntersectionObserver(
      (observedEntries) => {
        observedEntries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number((entry.target as HTMLElement).dataset.thinkingIndex);
          setActiveEntry(index);
          entry.target.classList.add("thinking-entry--revealed");
        });
      },
      { rootMargin: "-22% 0px -48%", threshold: 0.08 },
    );

    entries.forEach((entry) => observer.observe(entry));
    return () => observer.disconnect();
  }, []);

  return (
    <article className="thinking-page">
      <BackToHome />
      <header className="container-rl thinking-hero standard-page-hero standard-page-hero-content">
        <p className="internal-hero-eyebrow eyebrow text-accent">{l(page.eyebrow)}</p>
        <h1 className="standard-page-hero-title mobile-safe-text serif mt-6 max-w-4xl text-foreground">
          <AnimatedHeroTitle>{withoutTerminalDots(l(page.title))}</AnimatedHeroTitle>
        </h1>
        <p className="internal-hero-subtitle thinking-hero-intro">{l(page.intro)}</p>
      </header>

      <section>
        <div className="container-rl">
          <article className={`thinking-essay ${effectsReady ? "thinking-essay--ready" : ""}`}>
            <div
              ref={(element) => {
                entryRefs.current[0] = element;
              }}
              data-thinking-index="0"
              className={`thinking-essay-opening thinking-entry ${activeEntry === 0 ? "thinking-entry--active" : ""}`}
            >
              <h2 className="mobile-safe-text serif thinking-essay-title">{l(pieces[0].title)}</h2>
              <p className="thinking-essay-opening-copy">{l(pieces[0].excerpt)}</p>
            </div>

            <div className="thinking-essay-flow">
              {pieces.slice(1).map((piece, index) => (
                <p
                  ref={(element) => {
                    entryRefs.current[index + 1] = element;
                  }}
                  data-thinking-index={index + 1}
                  className={`thinking-essay-paragraph thinking-entry ${activeEntry === index + 1 ? "thinking-entry--active" : ""}`}
                  key={piece.title.en}
                >
                  <span className="serif thinking-essay-lead">{l(piece.title)}</span>{" "}
                  {l(piece.excerpt)}
                </p>
              ))}
            </div>
          </article>
        </div>
      </section>
    </article>
  );
}
