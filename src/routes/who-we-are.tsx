import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedHeroTitle } from "@/components/site/AnimatedHeroTitle";
import { BackToHome } from "@/components/site/BackToHome";
import { useLanguage, withoutTerminalDots, type LocalizedString } from "@/i18n";

const c = (en: string, ru: string): LocalizedString => ({ en, ru });

const institutionalProfile = [
  [
    c("Leadership", "Руководство"),
    c("Partner-led mandate structure", "Партнёрская структура мандатов"),
    c(
      "Named leadership profiles and verified professional biographies are being prepared for publication. No individual credentials are implied until confirmed.",
      "Именные профили руководителей и подтверждённые профессиональные биографии готовятся к публикации. До подтверждения конкретные персональные квалификации не подразумеваются.",
    ),
  ],
  [
    c("Legal entity", "Юридическое лицо"),
    c("RANTA LIMITED, London", "RANTA LIMITED, London"),
    c(
      "REPOSITION LAB operates under RANTA LIMITED. Registered-office, company-number and regulatory details will be published after formal verification.",
      "REPOSITION LAB работает в структуре RANTA LIMITED. Адрес регистрации, номер компании и регуляторные сведения будут опубликованы после формального подтверждения.",
    ),
  ],
  [
    c("Geographic coverage", "География"),
    c("Latvia · Slovenia · Turkey", "Латвия · Словения · Турция"),
    c(
      "Current strategic coverage stated by the practice. Asset-specific legal, technical and market work is commissioned in the relevant jurisdiction.",
      "Текущая география стратегической работы, заявленная практикой. Юридическая, техническая и рыночная работа по объекту выполняется в соответствующей юрисдикции.",
    ),
  ],
  [
    c("Specialist network", "Сеть специалистов"),
    c("Mandate-specific, independently scoped", "Формируется под конкретный мандат"),
    c(
      "Where required, the work can coordinate legal, planning, heritage, architecture, engineering, valuation, hospitality and operator perspectives. Appointments are confirmed per mandate.",
      "При необходимости работа может объединять юридическую, градостроительную, историко-культурную, архитектурную, инженерную, оценочную, гостиничную и операторскую экспертизу. Состав подтверждается для каждого мандата.",
    ),
  ],
] as const;

export const Route = createFileRoute("/who-we-are")({
  head: () => ({
    meta: [
      { title: "Who We Are — REPOSITION LAB" },
      {
        name: "description",
        content:
          "REPOSITION LAB works with banks, asset holders, institutional owners, family offices, investors and special-situation stakeholders on distressed, low-liquidity and misunderstood real estate.",
      },
      { property: "og:title", content: "Who We Are — REPOSITION LAB" },
      {
        property: "og:description",
        content:
          "Strategic recovery and repositioning logic for low-liquidity and distressed real estate.",
      },
      { property: "og:url", content: "https://reposition-lab.com/who-we-are" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://reposition-lab.com/who-we-are" }],
  }),
  component: WhoWeAre,
});

function WhoWeAre() {
  const { t, l } = useLanguage();

  return (
    <article className="who-page">
      <BackToHome />
      <header className="who-hero who-hero--designed standard-page-hero">
        <div className="who-hero-bg" aria-hidden="true">
          <span className="who-gradient-orb who-gradient-orb--1" />
          <span className="who-gradient-orb who-gradient-orb--2" />
          <span className="who-gradient-orb who-gradient-orb--3" />
          <span className="who-gradient-orb who-gradient-orb--4" />
          <span className="who-light-ribbon who-light-ribbon--1" />
          <span className="who-light-ribbon who-light-ribbon--2" />
          <span className="who-light-ribbon who-light-ribbon--3" />
          <span className="who-refraction-beam who-refraction-beam--1" />
          <span className="who-refraction-beam who-refraction-beam--2" />
          <span className="who-refraction-beam who-refraction-beam--3" />
          <span className="who-caustic-sheen" />
          <div className="who-architectural-lines">
            <svg viewBox="0 0 720 720" role="presentation" focusable="false">
              <circle cx="462" cy="328" r="216" />
              <circle cx="462" cy="328" r="134" />
              <path d="M462 112 A216 216 0 0 1 678 328" />
              <path d="M462 462 A134 134 0 0 0 596 328" />
              <path d="M86 546 C210 376 338 258 646 128" />
              <path d="M138 206 C284 292 418 340 676 346" />
              <path d="M246 694 L642 88" />
              <line x1="462" y1="58" x2="462" y2="678" />
              <line x1="104" y1="328" x2="704" y2="328" />
              <line x1="228" y1="104" x2="666" y2="542" />
              <line x1="598" y1="116" x2="598" y2="646" />
            </svg>
          </div>
        </div>
        <div className="who-hero-content container-rl">
          <p className="internal-hero-eyebrow eyebrow text-accent">{l(t.who.eyebrow)}</p>
          <h1 className="standard-page-hero-title mobile-safe-text serif mt-6 max-w-4xl text-foreground">
            <AnimatedHeroTitle>{withoutTerminalDots(l(t.who.title))}</AnimatedHeroTitle>
          </h1>
        </div>
      </header>

      <section className="who-paper-section paper py-24">
        <div className="container-rl">
          <div className="who-statement-copy max-w-4xl mx-auto">
            {t.who.paragraphs.map((paragraph, index) => (
              <p key={paragraph.en} className={index === 0 ? "who-statement-lead" : undefined}>
                {l(paragraph)}
              </p>
            ))}
          </div>
        </div>
      </section>

      <section className="who-principles-section py-24 border-t border-rule">
        <div className="container-rl grid md:grid-cols-2 gap-16">
          <div className="who-principles-column">
            <p className="eyebrow text-accent">{l(t.who.believeLabel)}</p>
            <ul className="mt-8 text-muted-foreground leading-relaxed">
              {t.who.believe.map((item) => (
                <li
                  key={item.en}
                  className="who-principle-item mobile-safe-text border-t border-rule/50 py-3"
                >
                  {l(item)}
                </li>
              ))}
            </ul>
          </div>
          <div className="who-principles-column">
            <p className="eyebrow text-accent">{l(t.who.workLabel)}</p>
            <ul className="mt-8 text-muted-foreground leading-relaxed">
              {t.who.work.map((item) => (
                <li
                  key={item.en}
                  className="who-principle-item mobile-safe-text border-t border-rule/50 py-3"
                >
                  {l(item)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-rule">
        <div className="container-rl">
          <p className="eyebrow text-accent">
            {l(c("Institutional Profile", "Институциональный профиль"))}
          </p>
          <h2 className="serif text-3xl md:text-5xl mt-5 max-w-3xl">
            {l(
              c(
                "Clear scope, explicit limits and accountable deliverables.",
                "Ясный объём работы, обозначенные ограничения и проверяемые результаты.",
              ),
            )}
          </h2>
          <div className="who-institutional-grid mt-12">
            {institutionalProfile.map(([label, title, body]) => (
              <article key={label.en}>
                <p className="eyebrow text-accent">{l(label)}</p>
                <h3>{l(title)}</h3>
                <p>{l(body)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-rule">
        <div className="container-rl grid lg:grid-cols-3 gap-12">
          <div>
            <p className="eyebrow text-accent">{l(c("Mandate Selection", "Отбор мандатов"))}</p>
            <h2 className="serif text-3xl mt-5">
              {l(c("Fit before engagement", "Сначала — соответствие задачи"))}
            </h2>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-[.14em]">
              {l(c("Selection principles", "Принципы отбора"))}
            </h3>
            <ul className="mt-5 text-muted-foreground leading-relaxed space-y-3">
              <li>
                {l(
                  c(
                    "A material strategic problem that standard disposal cannot resolve.",
                    "Существенная стратегическая проблема, которую не решает стандартная продажа.",
                  ),
                )}
              </li>
              <li>
                {l(
                  c(
                    "Sufficient owner access to facts and decision-makers.",
                    "Достаточный доступ владельца к данным и принимающим решения лицам.",
                  ),
                )}
              </li>
              <li>
                {l(
                  c(
                    "A credible route to verification and qualified counterparties.",
                    "Реалистичный путь к проверке и квалифицированным контрагентам.",
                  ),
                )}
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm uppercase tracking-[.14em]">
              {l(c("Institutional deliverables", "Институциональные результаты"))}
            </h3>
            <ul className="mt-5 text-muted-foreground leading-relaxed space-y-3">
              <li>
                {l(
                  c(
                    "Asset diagnosis and open-questions register.",
                    "Диагностика объекта и реестр открытых вопросов.",
                  ),
                )}
              </li>
              <li>
                {l(
                  c(
                    "Scenario hierarchy, dependencies and decision framing.",
                    "Иерархия сценариев, зависимости и рамка решения.",
                  ),
                )}
              </li>
              <li>
                {l(
                  c(
                    "Decision materials and selective engagement plan.",
                    "Материалы для решения и план выборочного вовлечения.",
                  ),
                )}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 border-t border-rule bg-muted/30">
        <div className="container-rl grid md:grid-cols-2 gap-10 items-start">
          <div>
            <p className="eyebrow text-accent">{l(c("Confidentiality", "Конфиденциальность"))}</p>
            <h2 className="serif text-3xl mt-5">
              {l(c("Discreet by default", "Конфиденциальность по умолчанию"))}
            </h2>
          </div>
          <p className="text-muted-foreground leading-relaxed">
            {l(
              c(
                "Information is requested on a need-to-know basis and used to assess mandate fit. Wider circulation, specialist access, counterparty outreach and any public case reference should be governed by the agreed mandate and the owner's consent. Formal confidentiality terms are confirmed before sensitive materials are exchanged.",
                "Информация запрашивается по принципу необходимого доступа и используется для оценки соответствия мандата. Более широкое распространение, доступ специалистов, обращение к контрагентам и любое публичное упоминание кейса должны регулироваться согласованным мандатом и согласием владельца. Формальные условия конфиденциальности подтверждаются до обмена чувствительными материалами.",
              ),
            )}
          </p>
        </div>
      </section>

      <section className="py-24 border-t border-rule">
        <div className="container-rl text-center">
          <Link
            to="/submit"
            className="premium-action px-7 py-3.5 text-[12px] tracking-[0.18em] uppercase"
          >
            {l(t.who.cta)}
          </Link>
        </div>
      </section>
    </article>
  );
}
