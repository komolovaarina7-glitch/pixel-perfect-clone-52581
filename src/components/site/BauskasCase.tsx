import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatedHeroTitle } from "@/components/site/AnimatedHeroTitle";
import { BackToHome } from "@/components/site/BackToHome";
import { CastleLineDrawing } from "@/components/site/CastleLineDrawing";
import { useLanguage, type LocalizedString } from "@/i18n";

const c = (en: string, ru: string): LocalizedString => ({ en, ru });

const facts = [
  [
    c("Location", "Локация"),
    c("Bauskas iela 16A, Riga, Latvia", "Bauskas iela 16A, Рига, Латвия"),
    "verified",
  ],
  [
    c("Asset type", "Тип объекта"),
    c("Historically layered urban estate", "Исторически многослойная городская усадьба"),
    "interpretation",
  ],
  [
    c("Heritage character", "Характер наследия"),
    c(
      "Visible historic interiors and architectural detailing — formal status to be verified",
      "Сохранившиеся исторические интерьеры и архитектурные детали — официальный статус требует проверки",
    ),
    "open",
  ],
  [
    c("Current condition", "Текущее состояние"),
    c(
      "Requires independent technical and building-services review",
      "Требует независимого технического обследования здания и инженерных систем",
    ),
    "open",
  ],
  [
    c("Spatial composition", "Пространственная структура"),
    c(
      "Representative upper spaces, reported residential areas and lower-level support infrastructure",
      "Репрезентативные верхние пространства, заявленные жилые площади и инфраструктура нижнего уровня",
    ),
    "reported",
  ],
  [
    c("Reported residential areas", "Заявленные жилые площади"),
    c(
      "Two independent configurations of approximately 125 m² each — subject to confirmation",
      "Две независимые конфигурации примерно по 125 м² каждая — требуется подтверждение",
    ),
    "reported",
  ],
  [
    c("Lower-level infrastructure", "Инфраструктура нижнего уровня"),
    c(
      "Reported wellness, professional kitchen, meeting and event functions — requires technical review",
      "Заявлены wellness-зоны, профессиональная кухня, переговорные и event-функции — требуется техническая проверка",
    ),
    "reported",
  ],
  [
    c("Case status", "Статус кейса"),
    c(
      "Strategic repositioning hypothesis; verification and operator validation outstanding",
      "Стратегическая гипотеза репозиционирования; проверки и валидация с операторами не завершены",
    ),
    "interpretation",
  ],
  [
    c("Information status", "Статус информации"),
    c(
      "Case information reviewed August 2026; no technical, legal or commercial reliance intended",
      "Информация по кейсу актуализирована в августе 2026 года; не предназначена для технических, юридических или коммерческих решений",
    ),
    "open",
  ],
] as const;

const scenarios = [
  {
    level: c("Primary scenario", "Основной сценарий"),
    title: c(
      "Operator-led heritage hospitality and private events",
      "Исторический hospitality-объект и частные события под управлением оператора",
    ),
    role: c(
      "Anchor operating model and principal route to a coherent market proposition.",
      "Опорная операционная модель и основной путь к цельному рыночному предложению.",
    ),
    audience: c(
      "Boutique hotel groups, independent hospitality operators, venue operators and experienced owner-operators.",
      "Бутик-отельные группы, независимые гостиничные и event-операторы, опытные собственники-операторы.",
    ),
    fit: c(
      "Representative rooms, independent accommodation and reported support infrastructure may work as one guest journey.",
      "Репрезентативные залы, независимое размещение и заявленная вспомогательная инфраструктура могут формировать единый гостевой маршрут.",
    ),
    dependencies: c(
      "Permitted use, fire and accessibility compliance, servicing, capex and a credible operating plan.",
      "Разрешённое использование, пожарная безопасность, доступность, инженерное обеспечение, capex и подтверждённая операционная модель.",
    ),
    risks: c(
      "Conversion cost, heritage constraints, operating complexity and demand depth.",
      "Стоимость конверсии, ограничения наследия, операционная сложность и глубина спроса.",
    ),
    verify: c(
      "Operator demand, planning position, measured areas, technical feasibility and preliminary capital requirements.",
      "Спрос операторов, градостроительный статус, обмеры, техническая реализуемость и предварительная потребность в капитале.",
    ),
    recovery: c(
      "Creates a defined operator and capital audience and a basis for hold, partnership or controlled exit decisions.",
      "Формирует определённую аудиторию операторов и капитала и основу для решения об удержании, партнёрстве или контролируемом выходе.",
    ),
  },
  {
    level: c("Supporting uses", "Поддерживающие функции"),
    title: c(
      "Residential accommodation, wellness, residencies and production stays",
      "Жилое размещение, wellness, резиденции и проживание съёмочных команд",
    ),
    role: c(
      "Supports occupancy, extends stays and gives the primary scenario operational flexibility.",
      "Поддерживает загрузку, продлевает пребывание и добавляет основной модели операционную гибкость.",
    ),
    audience: c(
      "Guests, production teams, artists, visiting faculty, programme partners and long-stay residents.",
      "Гости, съёмочные команды, художники, приглашённые преподаватели, партнёры программ и долгосрочные резиденты.",
    ),
    fit: c(
      "Reported independent residential configurations and lower-level facilities could separate private and public use.",
      "Заявленные независимые жилые конфигурации и нижний уровень могут разделить частное и публичное использование.",
    ),
    dependencies: c(
      "Acoustic and circulation separation, residential permissions, servicing standards and operator integration.",
      "Акустическое и потоковое разделение, разрешения на проживание, стандарты обслуживания и интеграция с оператором.",
    ),
    risks: c(
      "Conflicting user flows, over-complex programming and unverified infrastructure.",
      "Конфликт потоков, избыточно сложная программа и неподтверждённая инфраструктура.",
    ),
    verify: c(
      "Layout, egress, building services, accommodation standards and use compatibility.",
      "Планировки, эвакуация, инженерные системы, стандарты размещения и совместимость функций.",
    ),
    recovery: c(
      "Broadens practical use without asking the asset to support unrelated standalone concepts.",
      "Расширяет практическое использование без превращения объекта в набор несвязанных самостоятельных концепций.",
    ),
  },
  {
    level: c("Optional activation", "Опциональная активация"),
    title: c(
      "Filming, cultural programming, members formats and selective destination events",
      "Съёмки, культурные программы, клубные форматы и выборочные destination-события",
    ),
    role: c(
      "Builds visibility and tests the estate before or alongside deeper conversion.",
      "Формирует видимость и тестирует усадьбу до или параллельно с более глубокой конверсией.",
    ),
    audience: c(
      "Location managers, production companies, cultural institutions, curators and specialist event producers.",
      "Локейшн-менеджеры, продакшн-компании, культурные институции, кураторы и специализированные event-продюсеры.",
    ),
    fit: c(
      "Atmospheric interiors and differentiated rooms provide the proposed cinematic and cultural identity.",
      "Атмосферные интерьеры и различающиеся пространства формируют предлагаемую кинематографичную и культурную идентичность.",
    ),
    dependencies: c(
      "Safe access, neighbour impact, temporary-event permissions, insurance and professional production logistics.",
      "Безопасный доступ, влияние на соседей, разрешения на временные события, страхование и профессиональная производственная логистика.",
    ),
    risks: c(
      "Irregular demand, wear, reputational mismatch and distraction from the primary model.",
      "Нерегулярный спрос, износ, репутационное несоответствие и отвлечение от основной модели.",
    ),
    verify: c(
      "Location demand, event capacity, curatorial fit, logistics and restrictions on temporary use.",
      "Спрос на локацию, вместимость, кураторское соответствие, логистика и ограничения временного использования.",
    ),
    recovery: c(
      "Can generate evidence of demand and counterparties; it should not be treated as guaranteed income.",
      "Может дать доказательства спроса и сформировать круг контрагентов; не должна рассматриваться как гарантированный доход.",
    ),
  },
];

const evidence = [
  [
    "/images/cases/bauskas-16a/bau1.jpg",
    c(
      "Street-facing exterior and historic architectural composition",
      "Уличный фасад и историческая архитектурная композиция",
    ),
    c("Evidence", "Факт наблюдения"),
    c(
      "The exterior presents a distinct historic identity rather than a standard commercial frontage.",
      "Фасад обладает выраженной исторической идентичностью и не выглядит как стандартный коммерческий объект.",
    ),
    c("Interpretation", "Интерпретация"),
    c(
      "A generic disposal narrative may not explain the building's differentiated character.",
      "Стандартная логика продажи может не раскрывать отличительные качества здания.",
    ),
    c("Strategic implication", "Стратегический вывод"),
    c(
      "Lead with a heritage operating thesis and verify formal heritage constraints before defining interventions.",
      "Начать с операторского тезиса, основанного на наследии, и проверить формальные ограничения до определения вмешательств.",
    ),
  ],
  [
    "/images/cases/bauskas-16a/images12.jpg",
    c("Layered interior atmosphere", "Многослойная атмосфера интерьера"),
    c("Evidence", "Факт наблюдения"),
    c(
      "Historic finishes, objects and spatial depth create a visually specific setting.",
      "Историческая отделка, предметы и глубина пространства создают визуально специфическую среду.",
    ),
    c("Interpretation", "Интерпретация"),
    c(
      "The interior has potential relevance to boutique hospitality and visual production.",
      "Интерьер потенциально релевантен для бутик-гостеприимства и визуального производства.",
    ),
    c("Strategic implication", "Стратегический вывод"),
    c(
      "Test operators who can retain character while meeting safety and service standards.",
      "Проверить операторов, способных сохранить характер и одновременно обеспечить безопасность и сервисные стандарты.",
    ),
  ],
  [
    "/images/cases/bauskas-16a/images123.jpg",
    c("Historic architectural detailing", "Исторические архитектурные детали"),
    c("Evidence", "Факт наблюдения"),
    c(
      "Decorative elements and material patina remain visible.",
      "Сохранились декоративные элементы и патина материалов.",
    ),
    c("Interpretation", "Интерпретация"),
    c(
      "Selective conservation may be more strategically relevant than visual standardisation.",
      "Выборочная консервация может быть стратегически уместнее визуальной стандартизации.",
    ),
    c("Strategic implication", "Стратегический вывод"),
    c(
      "Commission heritage and technical reviews before setting a refurbishment scope.",
      "Провести историко-культурную и техническую экспертизу до определения объёма ремонта.",
    ),
  ],
  [
    "/images/cases/bauskas-16a/baus2.jpg",
    c("Representative upper-level room", "Репрезентативное помещение верхнего уровня"),
    c("Evidence", "Факт наблюдения"),
    c(
      "The upper area provides scale, natural light and a strong spatial sequence.",
      "Верхний уровень обладает масштабом, естественным светом и выразительной последовательностью пространств.",
    ),
    c("Interpretation", "Интерпретация"),
    c(
      "It may serve as the public and emotional core of an operator-led proposition.",
      "Он может стать публичным и эмоциональным ядром операторского предложения.",
    ),
    c("Strategic implication", "Стратегический вывод"),
    c(
      "Validate guest circulation, event capacity, acoustic separation and compliant egress.",
      "Проверить гостевые потоки, вместимость, акустическое разделение и нормативную эвакуацию.",
    ),
  ],
  [
    "/images/cases/bauskas-16a/baus4.jpg",
    c("Reported residential-area interior", "Интерьер заявленной жилой зоны"),
    c("Evidence", "Факт наблюдения"),
    c(
      "A distinct domestic-scale layer is visible within the estate.",
      "В усадьбе присутствует отдельный слой жилого масштаба.",
    ),
    c("Interpretation", "Интерпретация"),
    c(
      "Independent accommodation could support the primary hospitality scenario.",
      "Независимое размещение может поддерживать основной гостиничный сценарий.",
    ),
    c("Strategic implication", "Стратегический вывод"),
    c(
      "Confirm measured areas, legal configuration and separation from event circulation.",
      "Подтвердить обмеры, юридическую конфигурацию и отделение от event-потоков.",
    ),
  ],
  [
    "/images/cases/bauskas-16a/baus5.jpg",
    c(
      "Reported lower-level support space",
      "Заявленное вспомогательное пространство нижнего уровня",
    ),
    c("Evidence", "Факт наблюдения"),
    c(
      "The lower level appears capable of accommodating supporting functions.",
      "Нижний уровень выглядит потенциально пригодным для вспомогательных функций.",
    ),
    c("Interpretation", "Интерпретация"),
    c(
      "Wellness, kitchen or event support could strengthen a unified guest proposition.",
      "Wellness, кухня или event-инфраструктура могут усилить единое гостевое предложение.",
    ),
    c("Strategic implication", "Стратегический вывод"),
    c(
      "Treat all functions as reported until ventilation, drainage, fire safety and permissions are reviewed.",
      "Считать все функции заявленными до проверки вентиляции, водоотведения, пожарной безопасности и разрешений.",
    ),
  ],
  [
    "/images/cases/bauskas-16a/image3.jpg",
    c("Interior circulation record", "Документальный кадр внутренней циркуляции"),
    c("Evidence", "Факт наблюдения"),
    c(
      "The photographic record indicates transitions between differently scaled rooms.",
      "Фотоархив показывает переходы между помещениями разного масштаба.",
    ),
    c("Interpretation", "Интерпретация"),
    c(
      "Guest, staff and event flows may require deliberate separation.",
      "Гостевые, служебные и event-потоки могут требовать продуманного разделения.",
    ),
    c("Strategic implication", "Стратегический вывод"),
    c(
      "Map circulation, accessibility and egress before confirming capacity.",
      "Составить схему потоков, доступности и эвакуации до подтверждения вместимости.",
    ),
  ],
  [
    "/images/cases/bauskas-16a/page12.jpg",
    c(
      "Additional historic interior record",
      "Дополнительный документальный кадр исторического интерьера",
    ),
    c("Evidence", "Факт наблюдения"),
    c(
      "The supplied archive records further variation in finishes and room character.",
      "Переданный архив фиксирует дополнительное разнообразие отделки и характера помещений.",
    ),
    c("Interpretation", "Интерпретация"),
    c(
      "A room-by-room conservation and use strategy may be necessary.",
      "Может потребоваться отдельная стратегия сохранения и использования для каждого помещения.",
    ),
    c("Strategic implication", "Стратегический вывод"),
    c(
      "Create a condition and significance schedule before design work.",
      "До проектирования подготовить ведомость состояния и значимости помещений.",
    ),
  ],
  [
    "/images/cases/bauskas-16a/case12.jpg",
    c("Documented room condition", "Зафиксированное состояние помещения"),
    c("Evidence", "Факт наблюдения"),
    c(
      "Visible condition varies across the supplied photographic record.",
      "В переданном фотоархиве состояние разных помещений визуально различается.",
    ),
    c("Interpretation", "Интерпретация"),
    c(
      "Intervention may need to be phased rather than uniform.",
      "Вмешательства могут требовать поэтапного, а не единого подхода.",
    ),
    c("Strategic implication", "Стратегический вывод"),
    c(
      "Link capital priorities to safety, operator requirements and heritage significance.",
      "Связать приоритеты капитальных работ с безопасностью, требованиями оператора и значимостью наследия.",
    ),
  ],
  [
    "/images/cases/bauskas-16a/page123.jpg",
    c("Additional spatial documentary record", "Дополнительный документальный кадр пространства"),
    c("Evidence", "Факт наблюдения"),
    c(
      "The archive shows another spatial layer not fully explained by a single-use label.",
      "Архив показывает ещё один пространственный слой, который нельзя полноценно описать одной функцией.",
    ),
    c("Interpretation", "Интерпретация"),
    c(
      "Supporting uses should remain subordinate to one operating model.",
      "Поддерживающие функции должны оставаться подчинёнными одной операционной модели.",
    ),
    c("Strategic implication", "Стратегический вывод"),
    c(
      "Test each space against the primary scenario before adding optional programmes.",
      "Проверять каждое пространство на соответствие основному сценарию до добавления опциональных программ.",
    ),
  ],
] as const;

const phases = [
  [
    c("Phase 1", "Этап 1"),
    c("Verification", "Проверка"),
    c(
      "Confirm title and legal configuration, planning and heritage position, measured areas, building condition, services, access and life-safety constraints.",
      "Подтвердить титул и юридическую конфигурацию, градостроительный и охранный статус, обмеры, состояние здания, инженерные системы, доступ и ограничения безопасности.",
    ),
  ],
  [
    c("Phase 2", "Этап 2"),
    c("Scenario Validation", "Валидация сценария"),
    c(
      "Hold structured operator conversations, test local and destination demand, confirm use compatibility and frame preliminary capital requirements.",
      "Провести структурированные разговоры с операторами, проверить локальный и destination-спрос, подтвердить совместимость функций и определить предварительную потребность в капитале.",
    ),
  ],
  [
    c("Phase 3", "Этап 3"),
    c("Institutional Packaging", "Институциональная упаковка"),
    c(
      "Consolidate confirmed facts, selected thesis, scenario documentation, visual evidence, dependencies and risk framing into decision materials.",
      "Собрать подтверждённые факты, выбранный тезис, сценарную документацию, визуальные доказательства, зависимости и риски в материалы для принятия решения.",
    ),
  ],
  [
    c("Phase 4", "Этап 4"),
    c("Selective Engagement", "Выборочное вовлечение"),
    c(
      "Approach qualified hospitality operators, cultural and production partners, private capital and special-situation counterparties whose capabilities fit the thesis.",
      "Обратиться к квалифицированным гостиничным операторам, культурным и production-партнёрам, частному капиталу и контрагентам специальных ситуаций, соответствующим тезису.",
    ),
  ],
  [
    c("Phase 5", "Этап 5"),
    c("Owner Decision", "Решение владельца"),
    c(
      "Compare hold, phased activation, operator partnership, conversion, controlled exit or a deeper repositioning mandate using verified evidence.",
      "Сопоставить удержание, поэтапную активацию, партнёрство с оператором, конверсию, контролируемый выход или углублённый мандат на основе проверенных данных.",
    ),
  ],
] as const;

const archive = [
  "image3.jpg",
  "page12.jpg",
  "case12.jpg",
  "page123.jpg",
  "images123.jpg",
  "images12.jpg",
  "bau1.jpg",
  "baus2.jpg",
  "baus4.jpg",
  "baus5.jpg",
];

export function BauskasCase() {
  const { l, language } = useLanguage();
  const [archiveOpen, setArchiveOpen] = useState(false);
  const statusLabel = (status: string) =>
    ({
      verified: l(c("Verified", "Подтверждено")),
      reported: l(c("Reported — subject to confirmation", "Заявлено — требует подтверждения")),
      interpretation: l(c("Strategic interpretation", "Стратегическая интерпретация")),
      open: l(c("To be verified", "Требует проверки")),
    })[status];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Bauskas 16A, Riga — Heritage Asset Repositioning Case",
    description:
      "A strategic recovery case setting out verified facts, scenario hierarchy, evidence, dependencies and an owner decision path for a historic Riga estate.",
    inLanguage: language,
    author: { "@type": "Organization", name: "REPOSITION LAB", url: "https://reposition-lab.com/" },
    publisher: {
      "@type": "Organization",
      name: "REPOSITION LAB",
      url: "https://reposition-lab.com/",
    },
    mainEntityOfPage: "https://reposition-lab.com/cases/bauskas-16a-riga",
    image: "https://reposition-lab.com/images/cases/bauskas-16a/case1.jpg",
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Cases", item: "https://reposition-lab.com/cases" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Bauskas 16A, Riga",
        item: "https://reposition-lab.com/cases/bauskas-16a-riga",
      },
    ],
  };

  return (
    <article className="bauskas-case">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      <BackToHome />
      <header className="case-detail-hero line-art-case-hero container-rl pt-8 pb-16">
        <CastleLineDrawing variant="bauskas" />
        <div className="relative z-10">
          <Link
            to="/cases"
            className="page-reveal page-reveal-delay-1 inline-flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-muted-foreground hover:text-accent"
          >
            <span aria-hidden>←</span>
            {l(c("Back to Cases", "Назад к кейсам"))}
          </Link>
          <p className="internal-hero-eyebrow eyebrow mt-10 text-accent">
            {l(
              c(
                "Strategic Recovery Case · Urban Heritage",
                "Кейс стратегического восстановления · Городское наследие",
              ),
            )}
          </p>
          <h1 className="mobile-safe-text serif text-4xl md:text-6xl mt-6 max-w-4xl leading-[1.05]">
            <AnimatedHeroTitle>Bauskas 16A, Riga</AnimatedHeroTitle>
          </h1>
          <p className="internal-hero-subtitle mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
            {l(
              c(
                "A decision framework for repositioning a complex Riga heritage estate around an operator-led hospitality thesis, with cinematic identity as its strategic differentiator.",
                "Система принятия решений по репозиционированию сложной рижской усадьбы вокруг операторской hospitality-модели, где кинематографичная идентичность служит стратегическим отличием.",
              ),
            )}
          </p>
        </div>
      </header>

      <nav
        className="bauskas-subnav border-y border-rule"
        aria-label={l(c("Case sections", "Разделы кейса"))}
      >
        <div className="container-rl">
          <div className="bauskas-subnav-track">
            {[
              ["summary", c("Summary", "Резюме")],
              ["facts", c("Facts", "Факты")],
              ["thesis", c("Thesis", "Тезис")],
              ["scenarios", c("Scenarios", "Сценарии")],
              ["evidence", c("Evidence", "Доказательства")],
              ["path", c("Recovery path", "Путь восстановления")],
              ["status", c("Status", "Статус")],
            ].map(([id, label]) => (
              <a key={id as string} href={`#${id}`} className="bauskas-subnav-link">
                {l(label as LocalizedString)}
              </a>
            ))}
          </div>
        </div>
      </nav>

      <section id="summary" className="bauskas-summary border-b border-rule">
        <div className="container-rl py-14 md:py-20 grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <figure className="lg:col-span-5">
            <img
              src="/images/cases/bauskas-16a/case1.jpg"
              alt={l(
                c(
                  "Bauskas 16A historic interior showing the estate's layered character",
                  "Исторический интерьер Bauskas 16A, показывающий многослойный характер усадьбы",
                ),
              )}
              width="800"
              height="889"
              fetchPriority="high"
              className="w-full aspect-[4/5] object-cover border border-rule"
            />
          </figure>
          <div className="lg:col-span-7">
            <p className="eyebrow text-accent">{l(c("Case Summary", "Резюме кейса"))}</p>
            <h2 className="serif text-3xl md:text-4xl mt-5">
              {l(
                c(
                  "The asset needs a primary operating logic—not a catalogue of possible uses.",
                  "Объекту нужна основная операционная логика, а не каталог возможных функций.",
                ),
              )}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-foreground/80">
              {l(
                c(
                  "The estate is difficult to interpret through conventional residential or commercial property categories because its heritage character, spatial complexity and possible uses do not align with a standard disposal narrative. The working response is to test it first as an operator-led heritage hospitality and private-events asset. Cinematic and cultural identity differentiates that model; accommodation, wellness, residencies and production stays support it.",
                  "Усадьбу сложно интерпретировать через стандартные категории жилой или коммерческой недвижимости: её исторический характер, пространственная сложность и возможные функции не укладываются в обычную логику продажи. Рабочий ответ — в первую очередь проверить модель исторического hospitality-объекта и частных событий под управлением оператора. Кинематографичная и культурная идентичность отличает эту модель; размещение, wellness, резиденции и проживание съёмочных команд её поддерживают.",
                ),
              )}
            </p>
            <div
              className="bauskas-process mt-10"
              aria-label="Diagnose, Reposition, Package, Engage, Recover"
            >
              {["Diagnose", "Reposition", "Package", "Engage", "Recover"].map((x, i) => (
                <span key={x}>
                  <b>0{i + 1}</b>
                  {x}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="facts" className="py-16 md:py-24">
        <div className="container-rl">
          <p className="eyebrow text-accent">{l(c("Asset at a Glance", "Объект кратко"))}</p>
          <h2 className="serif text-3xl md:text-5xl mt-5 max-w-3xl">
            {l(
              c(
                "What is known, what is reported, and what still needs specialist confirmation.",
                "Что известно, что заявлено и что ещё требует профессионального подтверждения.",
              ),
            )}
          </h2>
          <div className="bauskas-facts mt-12">
            {facts.map(([label, value, status]) => (
              <div className="bauskas-fact" key={label.en}>
                <div>
                  <p className="eyebrow">{l(label)}</p>
                  <span className={`bauskas-status bauskas-status--${status}`}>
                    {statusLabel(status)}
                  </span>
                </div>
                <p>{l(value)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bauskas-dark py-16 md:py-24">
        <div className="container-rl grid lg:grid-cols-2 gap-12 lg:gap-20">
          <div>
            <p className="eyebrow text-accent">
              {l(
                c(
                  "Why conventional categories struggle",
                  "Почему стандартные категории не работают",
                ),
              )}
            </p>
            <h2 className="serif text-3xl md:text-5xl mt-5">
              {l(
                c(
                  "One address contains several spatial and operational layers.",
                  "Один адрес объединяет несколько пространственных и операционных слоёв.",
                ),
              )}
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-white/70">
            <p>
              {l(
                c(
                  "A residential reading does not account for representative rooms or reported event infrastructure. An event-venue reading does not explain independent accommodation. A visual-location reading captures atmosphere but leaves the owner's long-term operating decision unresolved.",
                  "Жилая интерпретация не учитывает репрезентативные залы и заявленную event-инфраструктуру. Формат event-площадки не объясняет независимое размещение. Прочтение как съёмочной локации отражает атмосферу, но не решает долгосрочную операционную задачу владельца.",
                ),
              )}
            </p>
            <p>
              {l(
                c(
                  "The strategic task is therefore to establish hierarchy: one primary model, complementary uses that improve it, and optional activations that can test demand without being mistaken for a complete business plan.",
                  "Стратегическая задача — установить иерархию: одна основная модель, дополняющие её функции и опциональные активации, которые позволяют проверять спрос, не выдавая их за готовый бизнес-план.",
                ),
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-rule">
        <div className="container-rl">
          <p className="eyebrow text-accent">
            {l(c("Verified Facts and Open Questions", "Подтверждённые факты и открытые вопросы"))}
          </p>
          <div className="bauskas-two-col mt-10">
            <div>
              <h3>{l(c("Documented or directly observable", "Документировано или наблюдаемо"))}</h3>
              <ul>
                <li>
                  {l(
                    c(
                      "The property is located at Bauskas iela 16A in Riga.",
                      "Объект расположен по адресу Bauskas iela 16A в Риге.",
                    ),
                  )}
                </li>
                <li>
                  {l(
                    c(
                      "The supplied photographic record shows differentiated historic interiors and architectural detail.",
                      "Переданный фотоархив показывает различные исторические интерьеры и архитектурные детали.",
                    ),
                  )}
                </li>
                <li>
                  {l(
                    c(
                      "The case materials identify several spatial layers within the estate.",
                      "Материалы кейса выделяют несколько пространственных слоёв усадьбы.",
                    ),
                  )}
                </li>
              </ul>
            </div>
            <div>
              <h3>
                {l(c("Specialist confirmation required", "Требуется подтверждение специалистов"))}
              </h3>
              <ul>
                <li>
                  {l(
                    c(
                      "Title, easements, permitted use, planning and formal heritage status.",
                      "Титул, сервитуты, разрешённое использование, градостроительный и официальный охранный статус.",
                    ),
                  )}
                </li>
                <li>
                  {l(
                    c(
                      "Measured areas, structural condition, services, fire strategy and accessibility.",
                      "Обмеры, конструктивное состояние, инженерные системы, пожарная стратегия и доступность.",
                    ),
                  )}
                </li>
                <li>
                  {l(
                    c(
                      "Operator demand, event capacity, capex, operating costs and commercial viability.",
                      "Спрос операторов, вместимость, capex, операционные расходы и коммерческая жизнеспособность.",
                    ),
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="thesis" className="py-16 md:py-24">
        <div className="container-rl">
          <p className="eyebrow text-accent">
            {l(c("Repositioning Thesis", "Тезис репозиционирования"))}
          </p>
          <div className="bauskas-thesis mt-10">
            <div className="bauskas-thesis-primary">
              <span>{l(c("Primary scenario", "Основной сценарий"))}</span>
              <h2>
                {l(
                  c(
                    "Operator-led heritage hospitality and private-events asset",
                    "Исторический hospitality-объект и частные события под управлением оператора",
                  ),
                )}
              </h2>
            </div>
            <div>
              <span>{l(c("Strategic differentiator", "Стратегическое отличие"))}</span>
              <h3>
                {l(
                  c(
                    "Cinematic and cultural identity",
                    "Кинематографичная и культурная идентичность",
                  ),
                )}
              </h3>
            </div>
            <div>
              <span>{l(c("Supporting uses", "Поддерживающие функции"))}</span>
              <p>
                {l(
                  c(
                    "Independent residential accommodation, wellness, creative residencies and production-related stays.",
                    "Независимое жилое размещение, wellness, творческие резиденции и проживание, связанное со съёмками.",
                  ),
                )}
              </p>
            </div>
            <div>
              <span>{l(c("Optional activation", "Опциональная активация"))}</span>
              <p>
                {l(
                  c(
                    "Filming, cultural programming, private-members formats and selective destination events.",
                    "Съёмки, культурные программы, закрытые клубные форматы и выборочные destination-события.",
                  ),
                )}
              </p>
            </div>
          </div>
          <p className="bauskas-caveat mt-8">
            {l(
              c(
                "This is a strategic hypothesis, not an established development or investment conclusion. Selection of the primary scenario depends on demand validation, permissions, technical feasibility, capital requirements and an executable operator model.",
                "Это стратегическая гипотеза, а не установленный девелоперский или инвестиционный вывод. Выбор основного сценария зависит от проверки спроса, разрешений, технической реализуемости, потребности в капитале и исполнимой операторской модели.",
              ),
            )}
          </p>
        </div>
      </section>

      <section id="scenarios" className="py-16 md:py-24 border-y border-rule bg-muted/30">
        <div className="container-rl">
          <p className="eyebrow text-accent">{l(c("Scenario Hierarchy", "Иерархия сценариев"))}</p>
          <h2 className="serif text-3xl md:text-5xl mt-5">
            {l(c("Scenario matrix", "Сценарная матрица"))}
          </h2>
          <div className="bauskas-scenarios mt-12">
            {scenarios.map((s, i) => (
              <article className="bauskas-scenario" key={s.level.en}>
                <header>
                  <span>0{i + 1}</span>
                  <p>{l(s.level)}</p>
                  <h3>{l(s.title)}</h3>
                </header>
                {[
                  [c("Strategic role", "Стратегическая роль"), s.role],
                  [c("Target audience", "Целевая аудитория"), s.audience],
                  [c("Spatial fit", "Пространственное соответствие"), s.fit],
                  [c("Dependencies", "Зависимости"), s.dependencies],
                  [c("Principal risks", "Основные риски"), s.risks],
                  [c("Required verification", "Необходимая проверка"), s.verify],
                  [
                    c(
                      "Contribution to marketability and recovery",
                      "Вклад в рыночную ясность и восстановление",
                    ),
                    s.recovery,
                  ],
                ].map(([k, v]) => (
                  <div className="bauskas-scenario-row" key={(k as LocalizedString).en}>
                    <dt>{l(k as LocalizedString)}</dt>
                    <dd>{l(v as LocalizedString)}</dd>
                  </div>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="evidence" className="py-16 md:py-24">
        <div className="container-rl">
          <p className="eyebrow text-accent">
            {l(c("Evidence Behind the Thesis", "Доказательства тезиса"))}
          </p>
          <h2 className="serif text-3xl md:text-5xl mt-5 max-w-3xl">
            {l(
              c(
                "Every image supports a decision question.",
                "Каждое изображение связано с вопросом для принятия решения.",
              ),
            )}
          </h2>
          <div className="bauskas-evidence mt-12">
            {evidence.map((e, i) => (
              <figure className="bauskas-evidence-item" key={e[0]}>
                <div className="bauskas-evidence-image">
                  <img src={e[0]} alt={l(e[1])} loading="lazy" width="1280" height="960" />
                </div>
                <figcaption>
                  <span className="bauskas-evidence-number">0{i + 1}</span>
                  {[
                    [e[2], e[3]],
                    [e[4], e[5]],
                    [e[6], e[7]],
                  ].map(([k, v]) => (
                    <div key={k.en}>
                      <b>{l(k)}</b>
                      <p>{l(v)}</p>
                    </div>
                  ))}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="path" className="bauskas-dark py-16 md:py-24">
        <div className="container-rl">
          <p className="eyebrow text-accent">
            {l(c("Activation and Recovery Path", "Путь активации и восстановления"))}
          </p>
          <h2 className="serif text-3xl md:text-5xl mt-5 max-w-3xl">
            {l(
              c(
                "A staged route from uncertainty to an owner decision.",
                "Поэтапный путь от неопределённости к решению владельца.",
              ),
            )}
          </h2>
          <div className="bauskas-phases mt-14">
            {phases.map(([n, title, body]) => (
              <div className="bauskas-phase" key={n.en}>
                <span>{l(n)}</span>
                <h3>{l(title)}</h3>
                <p>{l(body)}</p>
              </div>
            ))}
          </div>
          <p className="mt-10 text-sm text-white/55 max-w-3xl">
            {l(
              c(
                "The sequence describes a possible professional process. It does not promise planning consent, operator interest, financing, liquidity or a transaction.",
                "Последовательность описывает возможный профессиональный процесс. Она не обещает получение разрешений, интерес оператора, финансирование, ликвидность или сделку.",
              ),
            )}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 border-b border-rule">
        <div className="container-rl grid lg:grid-cols-2 gap-14">
          <div>
            <p className="eyebrow text-accent">
              {l(c("Risks and Dependencies", "Риски и зависимости"))}
            </p>
            <h2 className="serif text-3xl md:text-4xl mt-5">
              {l(
                c(
                  "The thesis strengthens only as uncertainty is removed.",
                  "Тезис усиливается только по мере снятия неопределённости.",
                ),
              )}
            </h2>
          </div>
          <div className="bauskas-risk-list">
            {[
              c(
                "Legal and planning: title, permitted use, heritage obligations and event permissions.",
                "Юридические и градостроительные: титул, разрешённое использование, охранные обязательства и разрешения на события.",
              ),
              c(
                "Technical: structure, moisture, services, fire safety, accessibility and acoustic separation.",
                "Технические: конструктив, влажность, инженерные системы, пожарная безопасность, доступность и акустическое разделение.",
              ),
              c(
                "Commercial: demand depth, seasonality, achievable operating model and preliminary capex.",
                "Коммерческие: глубина спроса, сезонность, реализуемая операционная модель и предварительный capex.",
              ),
              c(
                "Execution: availability of a qualified operator, neighbour impact, sequencing and conservation quality.",
                "Реализация: наличие квалифицированного оператора, влияние на соседей, этапность и качество консервации.",
              ),
            ].map((x, i) => (
              <div key={x.en}>
                <span>0{i + 1}</span>
                <p>{l(x)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="status" className="py-16 md:py-24">
        <div className="container-rl">
          <div className="bauskas-status-panel">
            <div>
              <p className="eyebrow text-accent">{l(c("Current Status", "Текущий статус"))}</p>
              <h2>
                {l(
                  c(
                    "Strategic thesis prepared. Verification and market validation remain outstanding.",
                    "Стратегический тезис подготовлен. Проверка и рыночная валидация ещё не завершены.",
                  ),
                )}
              </h2>
            </div>
            <div>
              <p>
                {l(
                  c(
                    "The present case separates observed and reported asset information from REPOSITION LAB's strategic interpretation. No final operating model, capital programme, valuation or transaction route is represented as confirmed.",
                    "Настоящий кейс отделяет наблюдаемую и заявленную информацию об объекте от стратегической интерпретации REPOSITION LAB. Ни одна финальная операционная модель, капитальная программа, оценка или структура сделки не представлены как подтверждённые.",
                  ),
                )}
              </p>
              <span>
                {l(c("Information status · August 2026", "Статус информации · август 2026"))}
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 border-y border-rule">
        <div className="container-rl">
          <button
            type="button"
            className="bauskas-archive-toggle"
            aria-expanded={archiveOpen}
            aria-controls="bauskas-archive"
            onClick={() => setArchiveOpen((x) => !x)}
          >
            <span>
              <b>{l(c("Documentary Archive", "Документальный архив"))}</b>
              <small>
                {l(
                  c(
                    "Original supplied imagery · 10 records",
                    "Исходные предоставленные материалы · 10 файлов",
                  ),
                )}
              </small>
            </span>
            <i aria-hidden>{archiveOpen ? "−" : "+"}</i>
          </button>
          {archiveOpen && (
            <div id="bauskas-archive" className="bauskas-archive-grid">
              {archive.map((name, i) => (
                <figure key={name}>
                  <img
                    src={`/images/cases/bauskas-16a/${name}`}
                    alt={l(
                      c(
                        `Documentary record ${i + 1} of Bauskas 16A`,
                        `Документальный материал ${i + 1} по Bauskas 16A`,
                      ),
                    )}
                    loading="lazy"
                  />
                  <figcaption>
                    {String(i + 1).padStart(2, "0")} · {name}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bauskas-cta py-20 md:py-28">
        <div className="container-rl text-center">
          <p className="eyebrow text-accent">
            {l(c("Confidential Mandate Review", "Конфиденциальное рассмотрение мандата"))}
          </p>
          <h2 className="serif text-4xl md:text-6xl mt-6 max-w-4xl mx-auto">
            {l(
              c(
                "Hold an asset whose next decision is not yet clear?",
                "У вас есть объект, следующий шаг по которому пока неясен?",
              ),
            )}
          </h2>
          <p className="mt-6 text-muted-foreground max-w-2xl mx-auto">
            {l(
              c(
                "Submit the available facts, constraints and owner objective for an initial fit review.",
                "Передайте доступные факты, ограничения и задачу владельца для первичной оценки соответствия.",
              ),
            )}
          </p>
          <Link
            to="/submit"
            className="premium-action inline-flex mt-10 px-8 py-4 text-[12px] tracking-[0.18em] uppercase"
          >
            {l(c("Submit an Asset", "Предложить объект"))}
          </Link>
        </div>
      </section>
    </article>
  );
}
