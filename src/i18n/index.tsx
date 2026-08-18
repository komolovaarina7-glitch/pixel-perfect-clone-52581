import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { SiteContentItem } from "@/lib/admin/types";

export type Language = "en" | "ru";

export type LocalizedString = {
  readonly en: string;
  readonly ru: string;
};

export function withoutTerminalDots(value: string) {
  return value.replace(/[.。]+$/u, "");
}

const STORAGE_KEY = "reposition-lab-language";

export const copy = {
  common: {
    backToHome: { en: "Back to Main Hub", ru: "Назад к главной" },
    backToCases: { en: "Back to Cases", ru: "Назад к кейсам" },
    open: { en: "Open →", ru: "Открыть →" },
    readCase: { en: "Read case →", ru: "Читать кейс →" },
    viewAllCases: { en: "View all cases →", ru: "Смотреть все кейсы →" },
    submitAsset: { en: "Submit Asset", ru: "Предложить объект" },
    submitAnAsset: { en: "Submit an Asset", ru: "Предложить объект" },
    contact: { en: "Contact", ru: "Контакт" },
  },
  header: {
    nav: [
      { to: "/who-we-are", label: { en: "Who We Are", ru: "Кто мы" } },
      { to: "/services", label: { en: "Services", ru: "Услуги" } },
      { to: "/cases", label: { en: "Cases", ru: "Кейсы" } },
      { to: "/approach", label: { en: "Approach", ru: "Подход" } },
      { to: "/recovery-validation", label: { en: "Potential Review", ru: "Оценка потенциала" } },
      { to: "/selected-thinking", label: { en: "Selected Thinking", ru: "Избранные материалы" } },
      { to: "/contact", label: { en: "Contact", ru: "Контакт" } },
    ],
    menu: { en: "Menu", ru: "Меню" },
    close: { en: "Close", ru: "Закрыть" },
  },
  footer: {
    tagline: {
      en: "Strategic Recovery · Real Estate Intelligence",
      ru: "Стратегическое перепозиционирование · Аналитика недвижимости",
    },
    description: {
      en: "REPOSITION LAB is a strategic repositioning and recovery intelligence partner for distressed, underutilized and misunderstood real estate assets. We work with institutional owners, banks, family offices and special situations capital.",
      ru: "REPOSITION LAB — стратегическая практика по перепозиционированию сложных, недоиспользуемых и неверно понятых рынком объектов недвижимости. Мы работаем с институциональными собственниками, банками, семейными офисами и капиталом в специальных ситуациях.",
    },
    navigate: { en: "Navigate", ru: "Навигация" },
    operations: { en: "Operations", ru: "Операции" },
    transformationCases: { en: "Transformation Cases", ru: "Кейсы" },
    selectedThinking: { en: "Selected Thinking", ru: "Избранные материалы" },
  },
  home: {
    eyebrow: {
      en: "REPOSITION LAB — RANTA LIMITED, London",
      ru: "REPOSITION LAB — RANTA LIMITED, LONDON",
    },
    headlineStart: {
      en: "Transforming distressed & underutilized real estate into",
      ru: "Повышаем ценность и ликвидность сложных объектов недвижимости через стратегическое перепозиционирование",
    },
    headlineEm: { en: "investable opportunities", ru: "" },
    intro: {
      en: "A strategic recovery and real estate intelligence partner for banks, asset holders, special situations investors and institutional owners.",
      ru: "REPOSITION LAB работает с банками, владельцами объектов, инвесторами и институциональными собственниками, которым нужно переосмыслить сложный объект и подготовить его к более сильному рыночному сценарию.",
    },
    valueProof: {
      thesis: {
        en: "Most complex assets are not without prospects. They are misread, mispositioned or trapped in an ineffective market logic",
        ru: "Большинство сложных объектов не являются бесперспективными. Они неверно поняты, неправильно позиционированы или заблокированы в неэффективной рыночной логике",
      },
      explanation: {
        en: "REPOSITION LAB helps owners, banks and institutional capital redefine the logic of an asset, test possible use scenarios and prepare a more defensible path toward value recovery and liquidity.",
        ru: "REPOSITION LAB помогает собственникам, банкам и институциональному капиталу заново определить логику объекта, проверить возможные сценарии использования и подготовить более обоснованный путь к восстановлению стоимости и ликвидности.",
      },
      directions: [
        {
          title: { en: "Re-read the asset", ru: "Переосмыслить объект" },
          text: {
            en: "Identify hidden potential and constraints.",
            ru: "Выявить скрытый потенциал и ограничения.",
          },
        },
        {
          title: { en: "Shape the scenario", ru: "Сформировать сценарий" },
          text: {
            en: "Define a defensible future use and market position.",
            ru: "Определить обоснованную будущую функцию и рыночную позицию.",
          },
        },
        {
          title: { en: "Prepare for a decision", ru: "Подготовить к решению" },
          text: {
            en: "Structure the asset for holding, partnership, conversion or exit.",
            ru: "Структурировать объект для удержания, партнёрства, конверсии или выхода.",
          },
        },
      ],
    },
    directionTitle: {
      en: "Choose a strategic direction.",
      ru: "Перейдите к нужному разделу.",
    },
    directions: [
      {
        to: "/who-we-are",
        title: { en: "Who We Are", ru: "Кто мы" },
        desc: {
          en: "Philosophy, posture and institutional discipline.",
          ru: "Философия, позиция и институциональная дисциплина.",
        },
      },
      {
        to: "/services",
        title: { en: "Services", ru: "Услуги" },
        desc: {
          en: "Five disciplines of strategic recovery and packaging.",
          ru: "Пять направлений стратегического перепозиционирования и подготовки объекта.",
        },
      },
      {
        to: "/cases",
        title: {
          en: "Transformation Intelligence Cases",
          ru: "Кейсы",
        },
        desc: {
          en: "Heritage, industrial and special-situation theses.",
          ru: "Примеры перепозиционирования сложных объектов.",
        },
      },
      {
        to: "/approach",
        title: { en: "Approach", ru: "Подход" },
        desc: {
          en: "The five-stage institutional method.",
          ru: "Пятиэтапный институциональный метод.",
        },
      },
      {
        to: "/selected-thinking",
        title: { en: "Selected Thinking", ru: "Избранные материалы" },
        desc: {
          en: "Notes on hidden value and liquidity engineering.",
          ru: "Материалы о скрытом потенциале, ликвидности и перепозиционировании.",
        },
      },
      {
        to: "/submit",
        title: { en: "Submit an Asset", ru: "Предложить объект" },
        desc: {
          en: "Confidential intake for owners, banks and capital.",
          ru: "Конфиденциальная заявка на предварительный разбор объекта.",
        },
      },
      {
        to: "/contact",
        title: { en: "Contact", ru: "Контакт" },
        desc: {
          en: "Discreet institutional channels for qualified counterparties.",
          ru: "Закрытые институциональные каналы для квалифицированных контрагентов.",
        },
      },
      {
        to: "/recovery-validation",
        title: { en: "Recovery Validation", ru: "Оценка потенциала перепозиционирования" },
        desc: {
          en: "Independent valuation logic for repositioning-adjusted recovery scenarios.",
          ru: "Анализируем текущее рыночное положение объекта и проверяем, может ли перепозиционирование создать более сильный сценарий ценности, ликвидности и восприятия.",
        },
      },
    ],
    positionLabel: { en: "Position", ru: "Позиция" },
    position: {
      en: "We understand value where others only see problems. Most distressed assets are not worthless — they are misread, mispositioned, poorly packaged or trapped in illiquidity.",
      ru: "Мы видим ценность там, где другие видят только проблему. Большинство сложных объектов не являются бесперспективными — они неверно поняты, неправильно позиционированы, слабо подготовлены или заблокированы в неликвидности.",
    },
    selectedCasesLabel: { en: "Selected Cases · Preview", ru: "Избранные кейсы" },
    selectedCasesTitle: {
      en: "Three repositioning theses.",
      ru: "Три тезиса перепозиционирования.",
    },
    confidential: { en: "Confidential", ru: "Конфиденциально" },
    ctaTitle: {
      en: "Hold an asset others have failed to read?",
      ru: "У вас есть объект, который рынок не смог правильно оценить?",
    },
  },
  who: {
    eyebrow: { en: "Who We Are", ru: "КТО МЫ" },
    title: {
      en: "A senior repositioning and recovery practice. Deliberately small. Deliberately discreet.",
      ru: "Партнёрская практика стратегического перепозиционирования. Намеренно небольшая. Намеренно закрытая.",
    },
    paragraphs: [
      {
        en: "REPOSITION LAB operates under RANTA LIMITED, London, with strategic operations across Latvia, Slovenia and Turkey. We were established to work where conventional brokerage, asset management and advisory typically disengage: distressed collateral, mispositioned heritage, stalled developments and assets whose narrative has collapsed faster than their underlying value.",
        ru: "REPOSITION LAB работает в структуре RANTA LIMITED, London, со стратегическим присутствием в Латвии, Словении и Турции. Практика создана для ситуаций, где стандартная продажа, управление объектом или классический консалтинг уже не дают нужной логики: проблемное обеспечение, неверно позиционированные исторические объекты, остановленные девелоперские проекты и недвижимость, чья рыночная история стала слабее её базового потенциала.",
      },
      {
        en: "We are not a brokerage and we are not an agency. We do not represent inventory. We accept a constrained number of mandates per year and decline far more than we accept.",
        ru: "Мы не брокерская компания и не агентство. Мы не представляем каталог объектов. Мы берём ограниченное количество мандатов в год и отклоняем значительно больше проектов, чем принимаем.",
      },
      {
        en: "The objective is to help low-liquidity or misunderstood assets become more defensible to evaluate, reposition, hold, release, restructure or present to qualified counterparties.",
        ru: "Цель — сделать низколиквидные или неверно понятые рынком объекты более ясными для оценки, перепозиционирования, удержания, вывода на рынок, реструктуризации или представления квалифицированным контрагентам.",
      },
    ],
    believeLabel: { en: "What we believe", ru: "Во что мы верим" },
    believe: [
      {
        en: "Most distressed assets are mispriced because they are misread.",
        ru: "Большинство проблемных объектов неверно оценены, потому что рынок неправильно понимает их потенциал.",
      },
      {
        en: "A defensible repositioning thesis is worth more than an aggressive headline price.",
        ru: "Обоснованный тезис перепозиционирования часто важнее агрессивно заявленной цены.",
      },
      {
        en: "Heritage, industrial and unusual assets respond to narrative engineering, not discounting.",
        ru: "Объекты наследия, индустриальные здания и нестандартная недвижимость требуют ясной рыночной истории, а не простого дисконта.",
      },
      {
        en: "Liquidity is a design problem, not a marketing problem.",
        ru: "Ликвидность — это задача структуры и позиционирования, а не только маркетинга.",
      },
      {
        en: "Discretion compounds. Speed without discipline does not.",
        ru: "Закрытый и дисциплинированный процесс создаёт доверие. Скорость без дисциплины — нет.",
      },
    ],
    workLabel: { en: "How we work", ru: "Как мы работаем" },
    work: [
      {
        en: "Single mandate, single thesis. No standing inventory.",
        ru: "Один мандат — один тезис. Без постоянного склада объектов.",
      },
      {
        en: "Direct senior engagement throughout. No layered handoffs.",
        ru: "Прямое участие старших партнёров на всём протяжении. Без каскадной передачи между командами.",
      },
      {
        en: "Institutional documentation standards on every deliverable.",
        ru: "Институциональный стандарт документации в каждом результате работы.",
      },
      {
        en: "Selective disclosure to qualified capital only.",
        ru: "Выборочное раскрытие только квалифицированному капиталу.",
      },
      {
        en: "We work in writing. We are accountable for what we put in writing.",
        ru: "Мы работаем письменно. Мы отвечаем за то, что фиксируем в документах.",
      },
    ],
    cta: { en: "Request Confidential Review", ru: "Запросить конфиденциальный анализ" },
  },
  services: {
    eyebrow: { en: "Services", ru: "УСЛУГИ" },
    title: {
      en: "Five disciplines of strategic recovery.",
      ru: "Пять направлений стратегического перепозиционирования.",
    },
    intro: [
      {
        en: "REPOSITION LAB works where conventional disposal, brokerage or development logic no longer explains the asset. Our services are designed for banks, asset holders, family offices, developers, heritage owners and special-situation stakeholders who need a clearer recovery thesis before committing capital, releasing an asset or approaching qualified counterparties.",
        ru: "REPOSITION LAB работает там, где логика стандартной продажи, брокериджа или девелопмента уже не объясняет объект. Наши услуги предназначены для банков, владельцев объектов, семейных офисов, девелоперов, владельцев исторической недвижимости и участников специальных ситуаций, которым нужен более ясный тезис перепозиционирования перед вложением капитала, выводом объекта на рынок или обращением к квалифицированным контрагентам.",
      },
      {
        en: "The work is most relevant when an asset is distressed, stalled, underused, misread by the market, constrained by its condition or trapped between possible future uses. We do not operate as a retail brokerage or listing platform. We help clarify whether a defensible repositioning path exists, what that path would require and how it can be communicated to institutional audiences.",
        ru: "Работа особенно уместна, когда объект находится в проблемном состоянии, остановлен, недоиспользован, неверно понят рынком, ограничен физическим состоянием или застрял между возможными сценариями будущего использования. Мы не являемся розничным брокером или площадкой объявлений. Мы помогаем понять, существует ли обоснованный путь перепозиционирования, что он потребует и как его можно представить институциональной аудитории.",
      },
    ],
    items: [
      {
        title: {
          en: "Rapid Asset Recovery Assessment",
          ru: "Экспресс-оценка потенциала объекта",
        },
        support: {
          en: "Concentrated diagnostic of a single distressed, stalled or underutilized asset.",
          ru: "Сфокусированная диагностика одного проблемного, остановленного или недоиспользованного объекта.",
        },
        body: {
          en: "A focused assessment for owners, banks or asset holders who need a disciplined first reading before committing further capital or releasing the asset. The work strips the asset back to its structural reality, including title, condition, zoning, narrative, capital fit and the practical obstacles preventing recovery.",
          ru: "Сфокусированная оценка для собственников, банков и владельцев объектов, которым нужен дисциплинированный первичный разбор до вложения дополнительного капитала или вывода объекта на рынок. Работа возвращает объект к его структурной реальности: правам, состоянию, зонированию, рыночной истории, соответствию капиталу и практическим препятствиям для усиления ценности.",
        },
        detail: {
          en: "The outcome is an asset-level diagnostic, repositioning thesis, recommended recovery path and indicative capital fit. It is designed to help the owner decide whether the asset should be held, released, repositioned or prepared for a deeper mandate.",
          ru: "Результат — диагностика объекта, тезис перепозиционирования, рекомендуемый путь действий и ориентировочное соответствие капиталу. Это помогает собственнику решить, удерживать объект, выводить его на рынок, перепозиционировать или готовить к более глубокому мандату.",
        },
      },
      {
        title: {
          en: "Portfolio Screening & Asset Prioritization",
          ru: "Скрининг портфеля и приоритизация объектов",
        },
        support: {
          en: "Triage across non-core, distressed or underperforming portfolios.",
          ru: "Первичный разбор непрофильных, проблемных или недоэффективных портфелей.",
        },
        body: {
          en: "Designed for banks, REO divisions, family offices or institutional holders managing multiple assets that cannot all receive the same level of attention. Each asset is read against recoverability, repositioning potential, capital intensity, timing and release readiness.",
          ru: "Для банков, REO-подразделений, семейных офисов и институциональных собственников, управляющих несколькими объектами, которым невозможно уделить одинаковое внимание. Каждый объект рассматривается через потенциал возврата ценности, возможность перепозиционирования, капиталоёмкость, сроки и готовность к выводу.",
        },
        detail: {
          en: "The work produces a portfolio-level screen, asset prioritization logic, intervention-versus-release recommendation and sequencing plan. It helps management identify where intervention may compound value and where disposal or release may be the more disciplined option.",
          ru: "Работа формирует скрининг портфеля, логику приоритизации, рекомендацию по вмешательству или выводу объекта и последовательность действий. Это помогает управлению понять, где вмешательство может усилить ценность, а где более дисциплинированным решением будет продажа или вывод.",
        },
      },
      {
        title: {
          en: "Full Repositioning & Investment Packaging",
          ru: "Полное перепозиционирование и институциональная подготовка",
        },
        support: {
          en: "End-to-end thesis, institutional narrative and capital-facing documentation.",
          ru: "Полный тезис, институциональная история и документация для капитала.",
        },
        body: {
          en: "For owners, banks and capital-side stakeholders whose asset already has a possible direction but needs to be translated into a defensible institutional story. We build the repositioning strategy, structure the recovery narrative, define the use logic and prepare the documentation needed for selective institutional dialogue.",
          ru: "Для собственников, банков и участников со стороны капитала, у которых объект уже имеет возможное направление, но его нужно перевести в понятную институциональную историю. Мы выстраиваем стратегию перепозиционирования, структурируем логику повышения ценности, определяем сценарий использования и готовим документацию для выборочного институционального диалога.",
        },
        detail: {
          en: "Where appropriate, this work can support baseline valuation analysis, coordination with approved independent valuers, repositioned value scenario modelling, recovery enhancement benchmarking and pre- / post-repositioning valuation alignment. The purpose is not decoration or concept development. It is to help institutional stakeholders compare the current recovery model with a repositioning-adjusted scenario and understand whether the asset can support a stronger recovery argument.",
          ru: "Где уместно, эта работа может поддерживать базовый оценочный анализ, координацию с утверждёнными независимыми оценщиками, сценарное моделирование ценности после перепозиционирования и сопоставление текущего и возможного рыночного сценария. Цель — не декор и не красивая концепция. Цель — помочь институциональным участникам сравнить текущее положение объекта со сценарием после перепозиционирования и понять, может ли новая логика усилить аргумент в пользу объекта.",
        },
      },
      {
        title: {
          en: "Distressed Heritage & Special Assets",
          ru: "Проблемное наследие и нестандартные объекты",
        },
        support: {
          en: "Specialist repositioning for cultural, architectural and narrative-value assets.",
          ru: "Специализированное перепозиционирование объектов с культурной, архитектурной и рыночной ценностью.",
        },
        body: {
          en: "For heritage owners, cultural asset holders, families, municipalities or institutions dealing with assets whose value cannot be understood through conventional valuation or disposal logic alone. Castles, industrial heritage, culturally significant buildings and unusual properties often require a different reading of use, stewardship, constraints and audience.",
          ru: "Для владельцев исторических и культурных объектов, семей, муниципалитетов и институций, работающих с недвижимостью, чья стоимость не может быть понята только через стандартную оценку или логику продажи. Замки, индустриальное наследие, культурно значимые здания и нестандартные объекты требуют иного прочтения использования, ответственного управления, ограничений и аудитории.",
        },
        detail: {
          en: "The work develops an adaptive reuse thesis, heritage-aware positioning logic, cultural hospitality or destination strategy where appropriate, and operator or partner mapping. The objective is to reconcile cultural meaning, physical reality and market relevance without turning the asset into a generic development concept.",
          ru: "Работа формирует тезис адаптивного использования, логику позиционирования с учётом наследия, культурную или гостиничную стратегию там, где это уместно, а также карту возможных операторов или партнёров. Цель — согласовать культурный смысл, физическую реальность и рыночную применимость, не превращая объект в стандартную девелоперскую концепцию.",
        },
      },
      {
        title: {
          en: "Digital Structuring Readiness",
          ru: "Готовность к цифровому структурированию",
        },
        support: {
          en: "Selective assessment of downstream structuring potential where the asset thesis already stands on its own merits.",
          ru: "Выборочная оценка возможного цифрового или ликвидностного структурирования там, где базовый тезис объекта уже самостоятелен.",
        },
        body: {
          en: "For asset holders considering whether digital or liquidity structuring may become relevant after the core repositioning thesis has been clarified. This is not presented as a regulated investment product or substitute for the underlying asset logic.",
          ru: "Для владельцев объектов, которые рассматривают, может ли цифровое или ликвидностное структурирование стать уместным после прояснения базового тезиса перепозиционирования. Это не представляется как регулируемый инвестиционный продукт или замена логики самого объекта.",
        },
        detail: {
          en: "The work may assess fit, structuring readiness, partner requirements and risk framing. Any such path would require separate legal, regulatory and partner review, and is considered only where it supports marketability without replacing the asset's fundamental recovery thesis.",
          ru: "Работа может оценивать соответствие объекта, готовность к структурированию, требования к партнёрам и рамку рисков. Любой такой путь требует отдельной юридической, регуляторной и партнёрской проверки и рассматривается только там, где он поддерживает рыночную привлекательность, не заменяя базовый тезис перепозиционирования.",
        },
      },
    ],
    valuationTitle: { en: "Independent Valuation Logic", ru: "Логика независимой оценки" },
    valuation: [
      {
        en: "Where appropriate, REPOSITION LAB works alongside bank-approved or institutionally recognized independent valuation firms to help assess the difference between the asset's current distressed position and its repositioning-adjusted recovery potential.",
        ru: "Где уместно, REPOSITION LAB работает рядом с одобренными банками или институционально признанными независимыми оценочными компаниями, чтобы помочь оценить разницу между текущим проблемным положением объекта и его потенциалом после перепозиционирования.",
      },
      {
        en: "This may include current distressed asset value, repositioned marketability, adaptive reuse impact, post-repositioning valuation scenarios and liquidity enhancement potential. The objective is not to replace formal valuation or provide investment advice. The objective is to create a structured basis for comparing current recovery assumptions, repositioning-adjusted value potential and strategic disposal alternatives.",
        ru: "Это может включать текущую стоимость проблемного объекта, рыночную привлекательность после перепозиционирования, влияние адаптивного использования, оценочные сценарии после перепозиционирования и потенциал повышения ликвидности. Цель — не заменить формальную оценку и не предоставить инвестиционный совет. Цель — создать структурированную основу для сравнения текущих допущений, потенциала после перепозиционирования и стратегических альтернатив вывода.",
      },
      {
        en: "For banks and institutional asset holders, this matters because recovery decisions are not made on emotion or visual concepts. They are connected to recoverability, collateral value, provisioning assumptions, liquidation improvement, hold/sell decisions, distressed disposal timing, restructuring options, portfolio strategy and balance-sheet impact.",
        ru: "Для банков и институциональных собственников это важно, потому что решения о сложных объектах не принимаются на эмоциях или визуальных концепциях. Они связаны со стоимостью обеспечения, резервными допущениями, улучшением сценария ликвидации, решением удерживать или продавать, сроками продажи проблемного объекта, вариантами реструктуризации, стратегией портфеля и влиянием на баланс.",
      },
      {
        en: "This is what separates the work from creative concept development. The repositioning thesis is tested against recovery logic, valuation scenarios and institutional decision-making.",
        ru: "Именно это отличает работу от разработки красивой концепции. Тезис перепозиционирования проверяется через оценочную логику, сценарии вывода и институциональное принятие решений.",
      },
    ],
    mandateTitle: { en: "Mandate fit", ru: "Соответствие мандату" },
    mandate: [
      {
        en: "REPOSITION LAB is most relevant where an asset is constrained, misunderstood, underused or difficult to release through conventional disposal logic. Typical situations include bank-held or non-core collateral, stalled developments, special-situation portfolios, heritage assets, family-held real estate and properties whose future use requires a clearer repositioning thesis.",
        ru: "REPOSITION LAB наиболее уместен там, где объект ограничен, неверно понят, недоиспользован или сложен для вывода через стандартную логику продажи. Типичные ситуации включают банковское или непрофильное обеспечение, остановленные девелоперские проекты, портфели специальных ситуаций, исторические объекты, семейную недвижимость и объекты, будущее использование которых требует более ясного тезиса перепозиционирования.",
      },
      {
        en: "We are not positioned as a retail brokerage, listing platform or speculative sales campaign. Work is considered where a disciplined recovery, adaptive reuse or institutional repositioning logic can be credibly examined.",
        ru: "Мы не позиционируемся как розничный брокер, площадка объявлений или спекулятивная кампания продаж. Работа рассматривается там, где можно достоверно изучить дисциплинированную логику перепозиционирования, адаптивного использования или институционального вывода объекта.",
      },
    ],
  },
  cases: {
    eyebrow: {
      en: "Transformation Intelligence Cases",
      ru: "КЕЙСЫ ПЕРЕПОЗИЦИОНИРОВАНИЯ",
    },
    title: {
      en: "Selected repositioning theses. These are not listings.",
      ru: "Избранные кейсы перепозиционирования. Это не объявления о продаже.",
    },
    intro: {
      en: "Each entry illustrates how an asset was re-read — its challenge, the repositioning logic and the strategic direction the recovery thesis pointed toward. Confidential commercial detail is held under mandate. Public case notes remain intentionally limited during this structural content phase.",
      ru: "Каждый кейс показывает, как объект был прочитан заново: его исходная проблема, логика перепозиционирования и стратегическое направление, к которому привёл новый рыночный тезис. Конфиденциальные коммерческие детали остаются в рамках мандата. Публичные материалы по кейсам намеренно ограничены на этапе формирования структуры.",
    },
    assetChallenge: { en: "Asset challenge", ru: "Проблема объекта" },
    logic: { en: "Repositioning logic", ru: "Логика перепозиционирования" },
    direction: { en: "Strategic direction", ru: "Стратегическое направление" },
    notFoundLabel: { en: "Case not found", ru: "Кейс не найден" },
    notFoundTitle: { en: "This case page is not available.", ru: "Эта страница кейса недоступна." },
    evidenceLabel: { en: "Evidence layer", ru: "Слой подтверждающих материалов" },
    evidenceText: {
      en: "Asset-specific documentation, visual records, maps, constraints, stakeholder context and supporting analysis are prepared during the next content phase. This section is reserved for verified materials only, not speculative claims.",
      ru: "Документация по объекту, визуальные материалы, карты, ограничения, контекст заинтересованных сторон и поддерживающий анализ готовятся на следующем этапе контента. Этот раздел зарезервирован только для проверенных материалов, а не для спекулятивных утверждений.",
    },
    advantagesLabel: {
      en: "Key repositioning advantages",
      ru: "Ключевые преимущества репозиционирования",
    },
    submit: { en: "Submit an Asset for Review", ru: "Предложить объект для анализа" },
  },
  approach: {
    eyebrow: { en: "Approach", ru: "ПОДХОД" },
    title: { en: "A five-stage institutional method.", ru: "Пятиэтапный институциональный метод." },
    disciplineTitle: {
      en: "Written discipline at every stage",
      ru: "Письменная дисциплина на каждом этапе",
    },
    discipline: [
      {
        en: "Every stage is documented. Every recommendation is written. We do not move from one stage to the next without explicit owner alignment.",
        ru: "Каждый этап документируется. Каждая рекомендация фиксируется письменно. Мы не переходим от одного этапа к следующему без явного согласования с владельцем.",
      },
      {
        en: "We do not invent permits, valuations, returns or historical facts. Where information is missing or unverified, the deliverable states it clearly. This is the basis on which institutional capital can engage seriously.",
        ru: "Мы не выдумываем разрешения, оценки, доходность или исторические факты. Если информация отсутствует или не подтверждена, итоговый материал прямо это фиксирует. Именно на такой основе институциональный капитал может вести серьёзный диалог.",
      },
    ],
    cta: { en: "Begin with a Confidential Review", ru: "Начать с конфиденциального анализа" },
    stages: [
      {
        n: "01",
        t: { en: "Diagnose", ru: "Диагностика" },
        trigger: { en: "View diagnostic scope", ru: "Показать объём диагностики" },
        d: {
          en: "We strip the asset to its structural reality — title, condition, zoning, narrative, capital fit. We separate the real problems from the inherited story.",
          ru: "Мы возвращаем объект к его структурной реальности — правам, состоянию, зонированию, рыночной истории и соответствию капиталу. Мы отделяем реальные проблемы от унаследованного восприятия.",
        },
        note: [
          {
            en: "Diagnostics reads the asset together with its setting. Alongside title, condition, zoning, physical limitations and capital fit, we examine the district around the asset: access, transport, social infrastructure, adjacent uses, municipal or city development plans and the direction in which the surrounding area may evolve.",
            ru: "Диагностика рассматривает объект вместе с его окружением. Наряду с правами, состоянием, зонированием, физическими ограничениями и соответствием капиталу мы изучаем район вокруг объекта: доступность, транспорт, социальную инфраструктуру, соседние функции, муниципальные или городские планы развития и направление возможной эволюции территории.",
          },
          {
            en: "This allows the asset to be tested against possible future users, likely audiences and relevant counterparties. The result is not a design idea, but an initial opportunity map: viable functions, constraints, liquidity factors and the conditions under which the asset could become relevant again.",
            ru: "Это позволяет проверить объект через возможных будущих пользователей, вероятные аудитории и подходящих контрагентов. Результат — не дизайн-идея, а первичная карта возможностей: жизнеспособные функции, ограничения, факторы ликвидности и условия, при которых объект может снова стать рыночно понятным.",
          },
        ],
      },
      {
        n: "02",
        t: { en: "Reposition", ru: "Репозиционирование" },
        trigger: { en: "View specialist consensus", ru: "Показать экспертный консенсус" },
        d: {
          en: "We rewrite the thesis around the value drivers the asset can actually defend. The repositioning logic becomes the spine of every downstream decision.",
          ru: "Мы перестраиваем тезис вокруг факторов ценности, которые объект действительно способен подтвердить. Логика перепозиционирования становится основой всех последующих решений.",
        },
        note: [
          {
            en: "Repositioning is formed through coordinated specialist review, not a single opinion. Depending on the asset, the work may involve strategic, architectural, heritage, technical, legal, zoning, market, valuation, hospitality, investor-packaging and narrative perspectives.",
            ru: "Перепозиционирование формируется через координированный экспертный разбор, а не через одно мнение. В зависимости от объекта работа может включать стратегическую, архитектурную, историко-культурную, техническую, юридическую, градостроительную, рыночную, оценочную, гостиничную, презентационную и смысловую перспективы.",
          },
          {
            en: "The findings are consolidated into a defensible repositioning thesis. This thesis reformulates the existing asset narrative into a clearer future-use logic: what the property can credibly become, which audiences it can serve, how its market perception can change, and where liquidity potential may be strengthened without unsupported claims.",
            ru: "Выводы консолидируются в обоснованный тезис перепозиционирования. Он преобразует существующую историю объекта в более ясную логику будущего использования: чем объект может убедительно стать, какие аудитории обслуживать, как может измениться его рыночное восприятие и где может усилиться потенциал ликвидности без неподтверждённых заявлений.",
          },
        ],
      },
      {
        n: "03",
        t: { en: "Package", ru: "Упаковка" },
        trigger: { en: "View packaging scope", ru: "Показать объём упаковки" },
        d: {
          en: "We translate the thesis into institutional documentation: information memoranda, narrative, financial framing and discreet visual identity.",
          ru: "Мы переводим тезис в институциональную документацию: информационный меморандум, рыночную историю, финансовую рамку и сдержанную визуальную идентичность.",
        },
        note: [
          {
            en: "Packaging translates the repositioning thesis into a form that institutional audiences can read, test and discuss. This may include a memorandum, asset logic, visual direction, use scenarios, positioning narrative, financial framing and supporting presentation materials.",
            ru: "Упаковка переводит тезис перепозиционирования в форму, которую институциональная аудитория может прочитать, проверить и обсудить. Это может включать меморандум, логику объекта, визуальное направление, сценарии использования, позиционирующую историю, финансовую рамку и поддерживающие презентационные материалы.",
          },
          {
            en: "The goal is not cosmetic marketing. It is professional legibility. A distressed or misunderstood asset often fails because its logic is not visible to the right counterparties. Packaging makes the recovery thesis structured, credible and communicable without overstating facts or promising outcomes.",
            ru: "Цель — не косметический маркетинг. Цель — сделать логику объекта профессионально понятной. Проблемный или неверно понятый объект часто проваливается потому, что его потенциал не виден нужным контрагентам. Упаковка делает тезис перепозиционирования структурированным, достоверным и передаваемым без преувеличения фактов и обещания результатов.",
          },
        ],
      },
      {
        n: "04",
        t: { en: "Engage", ru: "Вовлечение" },
        trigger: { en: "View engagement logic", ru: "Показать логику вовлечения" },
        d: {
          en: "We engage qualified capital, operators and partners directly. Selective. Confidential. Written. No retail broadcast.",
          ru: "Мы напрямую работаем с квалифицированным капиталом, операторами и партнёрами. Выборочно. Конфиденциально. Письменно. Без массового рыночного продвижения.",
        },
        note: [
          {
            en: "Engagement begins only when the asset has a defensible logic and a clear future-use scenario. Communication is directed toward relevant counterparties: qualified capital, operators, strategic partners, cultural or hospitality actors, institutions or owners whose interests match the repositioning path.",
            ru: "Вовлечение начинается только тогда, когда у объекта есть обоснованная логика и ясный сценарий будущего использования. Коммуникация направляется к подходящим контрагентам: квалифицированному капиталу, операторам, стратегическим партнёрам, культурным или гостиничным операторам, институциям или собственникам, чьи интересы совпадают с путём перепозиционирования.",
          },
          {
            en: "This stage avoids mass-market sales language and broad speculative exposure. The objective is selective, confidential dialogue with parties capable of understanding the asset's transformed logic and testing whether a mandate, partnership, acquisition, lease, operation or recovery route is realistic.",
            ru: "Этот этап избегает массового языка продаж и широкого спекулятивного раскрытия. Цель — выборочный конфиденциальный диалог со сторонами, способными понять обновлённую логику объекта и проверить, реалистичен ли мандат, партнёрство, приобретение, аренда, операционная модель или иной путь вывода объекта.",
          },
        ],
      },
      {
        n: "05",
        t: { en: "Recover", ru: "Восстановление" },
        trigger: { en: "View recovery path", ru: "Показать возможный путь" },
        d: {
          en: "We execute the path that optimizes recovery, not headline price — disposal, joint venture, conversion or repositioning held by the original owner.",
          ru: "Мы реализуем путь, который усиливает позицию собственника, а не просто заголовочную цену: продажу, совместное предприятие, конверсию или перепозиционирование с сохранением у первоначального владельца.",
        },
        note: [
          {
            en: "Recovery is treated as an owner-outcome path, not a quick sale at any price. Depending on the asset, the route may involve holding, phased repositioning, operator alignment, adaptive reuse, partnership, conversion, controlled exit or preparation for a more suitable investor audience.",
            ru: "Финальный этап рассматривается как путь к результату для собственника, а не как быстрая продажа любой ценой. В зависимости от объекта маршрут может включать удержание, поэтапное перепозиционирование, согласование с оператором, адаптивное использование, партнёрство, конверсию, контролируемый выход или подготовку к более подходящей инвесторской аудитории.",
          },
          {
            en: "The selected path should fit the asset's condition, constraints, market, future function and owner interests. The aim is to improve the quality of options available to the owner and support a more defensible recovery process, without implying guaranteed liquidity, value creation or investor response.",
            ru: "Выбранный путь должен соответствовать состоянию объекта, ограничениям, рынку, будущей функции и интересам владельца. Цель — улучшить качество доступных собственнику вариантов и поддержать более обоснованный процесс вывода или удержания объекта без обещаний гарантированной ликвидности, роста стоимости или реакции инвесторов.",
          },
        ],
      },
    ],
  },
} as const;

export type Copy = typeof copy;

type MutableRecord = Record<string, unknown>;

function isLocalizedString(value: unknown): value is LocalizedString {
  if (!value || typeof value !== "object" || Array.isArray(value)) return false;
  const localized = value as Record<string, unknown>;
  return typeof localized.en === "string" && typeof localized.ru === "string";
}

function contentLabel(group: string, path: string) {
  const pageNames: Record<string, string> = {
    common: "Общие элементы",
    header: "Шапка и меню",
    footer: "Подвал сайта",
    home: "Главная",
    who: "Кто мы",
    services: "Услуги",
    cases: "Кейсы",
    approach: "Подход",
  };
  return `${pageNames[group] ?? group}: ${path.replace(/\.(\d+)(?=\.|$)/g, " [$1]")}`;
}

export type DefaultSiteContentItem = Omit<SiteContentItem, "id" | "updated_at">;

export function getDefaultSiteContent(): DefaultSiteContentItem[] {
  const rows: DefaultSiteContentItem[] = [];

  const walk = (value: unknown, group: string, path: string[]) => {
    if (isLocalizedString(value)) {
      const contentKey = path.join(".");
      rows.push({
        group_name: group,
        content_key: contentKey,
        label: contentLabel(group, contentKey),
        value_en: value.en,
        value_ru: value.ru,
        published: true,
      });
      return;
    }

    if (Array.isArray(value)) {
      value.forEach((item, index) => walk(item, group, [...path, String(index)]));
      return;
    }

    if (value && typeof value === "object") {
      Object.entries(value).forEach(([key, item]) => walk(item, group, [...path, key]));
    }
  };

  Object.entries(copy).forEach(([group, value]) => walk(value, group, []));
  return rows;
}

function setCopyValue(target: MutableRecord, path: string[], value: LocalizedString) {
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

export function applyManagedCopy(content: SiteContentItem[]): Copy {
  if (!content.length) return copy;
  const managed = structuredClone(copy) as unknown as MutableRecord;
  content.forEach((item) => {
    if (!item.published || !(item.group_name in managed)) return;
    setCopyValue(managed[item.group_name] as MutableRecord, item.content_key.split("."), {
      en: item.value_en,
      ru: item.value_ru,
    });
  });
  return managed as unknown as Copy;
}

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
  t: Copy;
  l: (value: LocalizedString) => string;
} | null>(null);

function getInitialLanguage(): Language {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem(STORAGE_KEY) === "ru" ? "ru" : "en";
}

export function LanguageProvider({
  children,
  content = [],
}: {
  children: ReactNode;
  content?: SiteContentItem[];
}) {
  const [language, setLanguageState] = useState<Language>("en");

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  };

  useEffect(() => {
    setLanguageState(getInitialLanguage());
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const managedCopy = useMemo(() => applyManagedCopy(content), [content]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t: managedCopy,
      l: (localized: LocalizedString) => localized[language],
    }),
    [language, managedCopy],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
