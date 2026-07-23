import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
const appCss = "/assets/styles-BVqQli0u.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function withoutTerminalDots(value) {
  return value.replace(/[.。]+$/u, "");
}
const STORAGE_KEY = "reposition-lab-language";
const copy = {
  common: {
    backToHome: { en: "Back to Main Hub", ru: "Назад к главной" },
    backToCases: { en: "Back to Cases", ru: "Назад к кейсам" },
    open: { en: "Open →", ru: "Открыть →" },
    readCase: { en: "Read case →", ru: "Читать кейс →" },
    viewAllCases: { en: "View all cases →", ru: "Смотреть все кейсы →" },
    submitAsset: { en: "Submit Asset", ru: "Предложить объект" },
    submitAnAsset: { en: "Submit an Asset", ru: "Предложить объект" },
    contact: { en: "Contact", ru: "Контакт" }
  },
  header: {
    nav: [
      { to: "/who-we-are", label: { en: "Who We Are", ru: "Кто мы" } },
      { to: "/services", label: { en: "Services", ru: "Услуги" } },
      { to: "/cases", label: { en: "Cases", ru: "Кейсы" } },
      { to: "/approach", label: { en: "Approach", ru: "Подход" } },
      { to: "/recovery-validation", label: { en: "Potential Review", ru: "Оценка потенциала" } },
      { to: "/selected-thinking", label: { en: "Selected Thinking", ru: "Избранные материалы" } },
      { to: "/contact", label: { en: "Contact", ru: "Контакт" } }
    ],
    menu: { en: "Menu", ru: "Меню" },
    close: { en: "Close", ru: "Закрыть" }
  },
  footer: {
    tagline: {
      en: "Strategic Recovery · Real Estate Intelligence",
      ru: "Стратегическое перепозиционирование · Аналитика недвижимости"
    },
    description: {
      en: "REPOSITION LAB is a strategic repositioning and recovery intelligence partner for distressed, underutilized and misunderstood real estate assets. We work with institutional owners, banks, family offices and special situations capital.",
      ru: "REPOSITION LAB — стратегическая практика по перепозиционированию сложных, недоиспользуемых и неверно понятых рынком объектов недвижимости. Мы работаем с институциональными собственниками, банками, семейными офисами и капиталом в специальных ситуациях."
    },
    navigate: { en: "Navigate", ru: "Навигация" },
    operations: { en: "Operations", ru: "Операции" },
    transformationCases: { en: "Transformation Cases", ru: "Кейсы" },
    selectedThinking: { en: "Selected Thinking", ru: "Избранные материалы" }
  },
  home: {
    eyebrow: {
      en: "REPOSITION LAB — RANTA LIMITED, London",
      ru: "REPOSITION LAB — RANTA LIMITED, LONDON"
    },
    headlineStart: {
      en: "Transforming distressed & underutilized real estate into",
      ru: "Повышаем ценность и ликвидность сложных объектов недвижимости через стратегическое перепозиционирование"
    },
    headlineEm: { en: "investable opportunities", ru: "" },
    intro: {
      en: "A strategic recovery and real estate intelligence partner for banks, asset holders, special situations investors and institutional owners.",
      ru: "REPOSITION LAB работает с банками, владельцами объектов, инвесторами и институциональными собственниками, которым нужно переосмыслить сложный объект и подготовить его к более сильному рыночному сценарию."
    },
    valueProof: {
      thesis: {
        en: "Most complex assets are not without prospects. They are misread, mispositioned or trapped in an ineffective market logic",
        ru: "Большинство сложных объектов не являются бесперспективными. Они неверно поняты, неправильно позиционированы или заблокированы в неэффективной рыночной логике"
      },
      explanation: {
        en: "REPOSITION LAB helps owners, banks and institutional capital redefine the logic of an asset, test possible use scenarios and prepare a more defensible path toward value recovery and liquidity.",
        ru: "REPOSITION LAB помогает собственникам, банкам и институциональному капиталу заново определить логику объекта, проверить возможные сценарии использования и подготовить более обоснованный путь к восстановлению стоимости и ликвидности."
      },
      directions: [
        {
          title: { en: "Re-read the asset", ru: "Переосмыслить объект" },
          text: {
            en: "Identify hidden potential and constraints.",
            ru: "Выявить скрытый потенциал и ограничения."
          }
        },
        {
          title: { en: "Shape the scenario", ru: "Сформировать сценарий" },
          text: {
            en: "Define a defensible future use and market position.",
            ru: "Определить обоснованную будущую функцию и рыночную позицию."
          }
        },
        {
          title: { en: "Prepare for a decision", ru: "Подготовить к решению" },
          text: {
            en: "Structure the asset for holding, partnership, conversion or exit.",
            ru: "Структурировать объект для удержания, партнёрства, конверсии или выхода."
          }
        }
      ]
    },
    directionTitle: {
      en: "Choose a strategic direction.",
      ru: "Перейдите к нужному разделу."
    },
    directions: [
      {
        to: "/who-we-are",
        title: { en: "Who We Are", ru: "Кто мы" },
        desc: {
          en: "Philosophy, posture and institutional discipline.",
          ru: "Философия, позиция и институциональная дисциплина."
        }
      },
      {
        to: "/services",
        title: { en: "Services", ru: "Услуги" },
        desc: {
          en: "Five disciplines of strategic recovery and packaging.",
          ru: "Пять направлений стратегического перепозиционирования и подготовки объекта."
        }
      },
      {
        to: "/cases",
        title: {
          en: "Transformation Intelligence Cases",
          ru: "Кейсы"
        },
        desc: {
          en: "Heritage, industrial and special-situation theses.",
          ru: "Примеры перепозиционирования сложных объектов."
        }
      },
      {
        to: "/approach",
        title: { en: "Approach", ru: "Подход" },
        desc: {
          en: "The five-stage institutional method.",
          ru: "Пятиэтапный институциональный метод."
        }
      },
      {
        to: "/selected-thinking",
        title: { en: "Selected Thinking", ru: "Избранные материалы" },
        desc: {
          en: "Notes on hidden value and liquidity engineering.",
          ru: "Материалы о скрытом потенциале, ликвидности и перепозиционировании."
        }
      },
      {
        to: "/submit",
        title: { en: "Submit an Asset", ru: "Предложить объект" },
        desc: {
          en: "Confidential intake for owners, banks and capital.",
          ru: "Конфиденциальная заявка на предварительный разбор объекта."
        }
      },
      {
        to: "/contact",
        title: { en: "Contact", ru: "Контакт" },
        desc: {
          en: "Discreet institutional channels for qualified counterparties.",
          ru: "Закрытые институциональные каналы для квалифицированных контрагентов."
        }
      },
      {
        to: "/recovery-validation",
        title: { en: "Recovery Validation", ru: "Оценка потенциала перепозиционирования" },
        desc: {
          en: "Independent valuation logic for repositioning-adjusted recovery scenarios.",
          ru: "Анализируем текущее рыночное положение объекта и проверяем, может ли перепозиционирование создать более сильный сценарий ценности, ликвидности и восприятия."
        }
      }
    ],
    positionLabel: { en: "Position", ru: "Позиция" },
    position: {
      en: "We understand value where others only see problems. Most distressed assets are not worthless — they are misread, mispositioned, poorly packaged or trapped in illiquidity.",
      ru: "Мы видим ценность там, где другие видят только проблему. Большинство сложных объектов не являются бесперспективными — они неверно поняты, неправильно позиционированы, слабо подготовлены или заблокированы в неликвидности."
    },
    selectedCasesLabel: { en: "Selected Cases · Preview", ru: "Избранные кейсы" },
    selectedCasesTitle: {
      en: "Three repositioning theses.",
      ru: "Три тезиса перепозиционирования."
    },
    confidential: { en: "Confidential", ru: "Конфиденциально" },
    ctaTitle: {
      en: "Hold an asset others have failed to read?",
      ru: "У вас есть объект, который рынок не смог правильно оценить?"
    }
  },
  who: {
    eyebrow: { en: "Who We Are", ru: "КТО МЫ" },
    title: {
      en: "A senior repositioning and recovery practice. Deliberately small. Deliberately discreet.",
      ru: "Партнёрская практика стратегического перепозиционирования. Намеренно небольшая. Намеренно закрытая."
    },
    paragraphs: [
      {
        en: "REPOSITION LAB operates under RANTA LIMITED, London, with strategic operations across Latvia, Slovenia and Turkey. We were established to work where conventional brokerage, asset management and advisory typically disengage: distressed collateral, mispositioned heritage, stalled developments and assets whose narrative has collapsed faster than their underlying value.",
        ru: "REPOSITION LAB работает в структуре RANTA LIMITED, London, со стратегическим присутствием в Латвии, Словении и Турции. Практика создана для ситуаций, где стандартная продажа, управление объектом или классический консалтинг уже не дают нужной логики: проблемное обеспечение, неверно позиционированные исторические объекты, остановленные девелоперские проекты и недвижимость, чья рыночная история стала слабее её базового потенциала."
      },
      {
        en: "We are not a brokerage and we are not an agency. We do not represent inventory. We accept a constrained number of mandates per year and decline far more than we accept.",
        ru: "Мы не брокерская компания и не агентство. Мы не представляем каталог объектов. Мы берём ограниченное количество мандатов в год и отклоняем значительно больше проектов, чем принимаем."
      },
      {
        en: "The objective is to help low-liquidity or misunderstood assets become more defensible to evaluate, reposition, hold, release, restructure or present to qualified counterparties.",
        ru: "Цель — сделать низколиквидные или неверно понятые рынком объекты более ясными для оценки, перепозиционирования, удержания, вывода на рынок, реструктуризации или представления квалифицированным контрагентам."
      }
    ],
    believeLabel: { en: "What we believe", ru: "Во что мы верим" },
    believe: [
      {
        en: "Most distressed assets are mispriced because they are misread.",
        ru: "Большинство проблемных объектов неверно оценены, потому что рынок неправильно понимает их потенциал."
      },
      {
        en: "A defensible repositioning thesis is worth more than an aggressive headline price.",
        ru: "Обоснованный тезис перепозиционирования часто важнее агрессивно заявленной цены."
      },
      {
        en: "Heritage, industrial and unusual assets respond to narrative engineering, not discounting.",
        ru: "Объекты наследия, индустриальные здания и нестандартная недвижимость требуют ясной рыночной истории, а не простого дисконта."
      },
      {
        en: "Liquidity is a design problem, not a marketing problem.",
        ru: "Ликвидность — это задача структуры и позиционирования, а не только маркетинга."
      },
      {
        en: "Discretion compounds. Speed without discipline does not.",
        ru: "Закрытый и дисциплинированный процесс создаёт доверие. Скорость без дисциплины — нет."
      }
    ],
    workLabel: { en: "How we work", ru: "Как мы работаем" },
    work: [
      {
        en: "Single mandate, single thesis. No standing inventory.",
        ru: "Один мандат — один тезис. Без постоянного склада объектов."
      },
      {
        en: "Direct senior engagement throughout. No layered handoffs.",
        ru: "Прямое участие старших партнёров на всём протяжении. Без каскадной передачи между командами."
      },
      {
        en: "Institutional documentation standards on every deliverable.",
        ru: "Институциональный стандарт документации в каждом результате работы."
      },
      {
        en: "Selective disclosure to qualified capital only.",
        ru: "Выборочное раскрытие только квалифицированному капиталу."
      },
      {
        en: "We work in writing. We are accountable for what we put in writing.",
        ru: "Мы работаем письменно. Мы отвечаем за то, что фиксируем в документах."
      }
    ],
    cta: { en: "Request Confidential Review", ru: "Запросить конфиденциальный анализ" }
  },
  services: {
    eyebrow: { en: "Services", ru: "УСЛУГИ" },
    title: {
      en: "Five disciplines of strategic recovery.",
      ru: "Пять направлений стратегического перепозиционирования."
    },
    intro: [
      {
        en: "REPOSITION LAB works where conventional disposal, brokerage or development logic no longer explains the asset. Our services are designed for banks, asset holders, family offices, developers, heritage owners and special-situation stakeholders who need a clearer recovery thesis before committing capital, releasing an asset or approaching qualified counterparties.",
        ru: "REPOSITION LAB работает там, где логика стандартной продажи, брокериджа или девелопмента уже не объясняет объект. Наши услуги предназначены для банков, владельцев объектов, семейных офисов, девелоперов, владельцев исторической недвижимости и участников специальных ситуаций, которым нужен более ясный тезис перепозиционирования перед вложением капитала, выводом объекта на рынок или обращением к квалифицированным контрагентам."
      },
      {
        en: "The work is most relevant when an asset is distressed, stalled, underused, misread by the market, constrained by its condition or trapped between possible future uses. We do not operate as a retail brokerage or listing platform. We help clarify whether a defensible repositioning path exists, what that path would require and how it can be communicated to institutional audiences.",
        ru: "Работа особенно уместна, когда объект находится в проблемном состоянии, остановлен, недоиспользован, неверно понят рынком, ограничен физическим состоянием или застрял между возможными сценариями будущего использования. Мы не являемся розничным брокером или площадкой объявлений. Мы помогаем понять, существует ли обоснованный путь перепозиционирования, что он потребует и как его можно представить институциональной аудитории."
      }
    ],
    items: [
      {
        title: {
          en: "Rapid Asset Recovery Assessment",
          ru: "Экспресс-оценка потенциала объекта"
        },
        support: {
          en: "Concentrated diagnostic of a single distressed, stalled or underutilized asset.",
          ru: "Сфокусированная диагностика одного проблемного, остановленного или недоиспользованного объекта."
        },
        body: {
          en: "A focused assessment for owners, banks or asset holders who need a disciplined first reading before committing further capital or releasing the asset. The work strips the asset back to its structural reality, including title, condition, zoning, narrative, capital fit and the practical obstacles preventing recovery.",
          ru: "Сфокусированная оценка для собственников, банков и владельцев объектов, которым нужен дисциплинированный первичный разбор до вложения дополнительного капитала или вывода объекта на рынок. Работа возвращает объект к его структурной реальности: правам, состоянию, зонированию, рыночной истории, соответствию капиталу и практическим препятствиям для усиления ценности."
        },
        detail: {
          en: "The outcome is an asset-level diagnostic, repositioning thesis, recommended recovery path and indicative capital fit. It is designed to help the owner decide whether the asset should be held, released, repositioned or prepared for a deeper mandate.",
          ru: "Результат — диагностика объекта, тезис перепозиционирования, рекомендуемый путь действий и ориентировочное соответствие капиталу. Это помогает собственнику решить, удерживать объект, выводить его на рынок, перепозиционировать или готовить к более глубокому мандату."
        }
      },
      {
        title: {
          en: "Portfolio Screening & Asset Prioritization",
          ru: "Скрининг портфеля и приоритизация объектов"
        },
        support: {
          en: "Triage across non-core, distressed or underperforming portfolios.",
          ru: "Первичный разбор непрофильных, проблемных или недоэффективных портфелей."
        },
        body: {
          en: "Designed for banks, REO divisions, family offices or institutional holders managing multiple assets that cannot all receive the same level of attention. Each asset is read against recoverability, repositioning potential, capital intensity, timing and release readiness.",
          ru: "Для банков, REO-подразделений, семейных офисов и институциональных собственников, управляющих несколькими объектами, которым невозможно уделить одинаковое внимание. Каждый объект рассматривается через потенциал возврата ценности, возможность перепозиционирования, капиталоёмкость, сроки и готовность к выводу."
        },
        detail: {
          en: "The work produces a portfolio-level screen, asset prioritization logic, intervention-versus-release recommendation and sequencing plan. It helps management identify where intervention may compound value and where disposal or release may be the more disciplined option.",
          ru: "Работа формирует скрининг портфеля, логику приоритизации, рекомендацию по вмешательству или выводу объекта и последовательность действий. Это помогает управлению понять, где вмешательство может усилить ценность, а где более дисциплинированным решением будет продажа или вывод."
        }
      },
      {
        title: {
          en: "Full Repositioning & Investment Packaging",
          ru: "Полное перепозиционирование и институциональная подготовка"
        },
        support: {
          en: "End-to-end thesis, institutional narrative and capital-facing documentation.",
          ru: "Полный тезис, институциональная история и документация для капитала."
        },
        body: {
          en: "For owners, banks and capital-side stakeholders whose asset already has a possible direction but needs to be translated into a defensible institutional story. We build the repositioning strategy, structure the recovery narrative, define the use logic and prepare the documentation needed for selective institutional dialogue.",
          ru: "Для собственников, банков и участников со стороны капитала, у которых объект уже имеет возможное направление, но его нужно перевести в понятную институциональную историю. Мы выстраиваем стратегию перепозиционирования, структурируем логику повышения ценности, определяем сценарий использования и готовим документацию для выборочного институционального диалога."
        },
        detail: {
          en: "Where appropriate, this work can support baseline valuation analysis, coordination with approved independent valuers, repositioned value scenario modelling, recovery enhancement benchmarking and pre- / post-repositioning valuation alignment. The purpose is not decoration or concept development. It is to help institutional stakeholders compare the current recovery model with a repositioning-adjusted scenario and understand whether the asset can support a stronger recovery argument.",
          ru: "Где уместно, эта работа может поддерживать базовый оценочный анализ, координацию с утверждёнными независимыми оценщиками, сценарное моделирование ценности после перепозиционирования и сопоставление текущего и возможного рыночного сценария. Цель — не декор и не красивая концепция. Цель — помочь институциональным участникам сравнить текущее положение объекта со сценарием после перепозиционирования и понять, может ли новая логика усилить аргумент в пользу объекта."
        }
      },
      {
        title: {
          en: "Distressed Heritage & Special Assets",
          ru: "Проблемное наследие и нестандартные объекты"
        },
        support: {
          en: "Specialist repositioning for cultural, architectural and narrative-value assets.",
          ru: "Специализированное перепозиционирование объектов с культурной, архитектурной и рыночной ценностью."
        },
        body: {
          en: "For heritage owners, cultural asset holders, families, municipalities or institutions dealing with assets whose value cannot be understood through conventional valuation or disposal logic alone. Castles, industrial heritage, culturally significant buildings and unusual properties often require a different reading of use, stewardship, constraints and audience.",
          ru: "Для владельцев исторических и культурных объектов, семей, муниципалитетов и институций, работающих с недвижимостью, чья стоимость не может быть понята только через стандартную оценку или логику продажи. Замки, индустриальное наследие, культурно значимые здания и нестандартные объекты требуют иного прочтения использования, ответственного управления, ограничений и аудитории."
        },
        detail: {
          en: "The work develops an adaptive reuse thesis, heritage-aware positioning logic, cultural hospitality or destination strategy where appropriate, and operator or partner mapping. The objective is to reconcile cultural meaning, physical reality and market relevance without turning the asset into a generic development concept.",
          ru: "Работа формирует тезис адаптивного использования, логику позиционирования с учётом наследия, культурную или гостиничную стратегию там, где это уместно, а также карту возможных операторов или партнёров. Цель — согласовать культурный смысл, физическую реальность и рыночную применимость, не превращая объект в стандартную девелоперскую концепцию."
        }
      },
      {
        title: {
          en: "Digital Structuring Readiness",
          ru: "Готовность к цифровому структурированию"
        },
        support: {
          en: "Selective assessment of downstream structuring potential where the asset thesis already stands on its own merits.",
          ru: "Выборочная оценка возможного цифрового или ликвидностного структурирования там, где базовый тезис объекта уже самостоятелен."
        },
        body: {
          en: "For asset holders considering whether digital or liquidity structuring may become relevant after the core repositioning thesis has been clarified. This is not presented as a regulated investment product or substitute for the underlying asset logic.",
          ru: "Для владельцев объектов, которые рассматривают, может ли цифровое или ликвидностное структурирование стать уместным после прояснения базового тезиса перепозиционирования. Это не представляется как регулируемый инвестиционный продукт или замена логики самого объекта."
        },
        detail: {
          en: "The work may assess fit, structuring readiness, partner requirements and risk framing. Any such path would require separate legal, regulatory and partner review, and is considered only where it supports marketability without replacing the asset's fundamental recovery thesis.",
          ru: "Работа может оценивать соответствие объекта, готовность к структурированию, требования к партнёрам и рамку рисков. Любой такой путь требует отдельной юридической, регуляторной и партнёрской проверки и рассматривается только там, где он поддерживает рыночную привлекательность, не заменяя базовый тезис перепозиционирования."
        }
      }
    ],
    valuationTitle: { en: "Independent Valuation Logic", ru: "Логика независимой оценки" },
    valuation: [
      {
        en: "Where appropriate, REPOSITION LAB works alongside bank-approved or institutionally recognized independent valuation firms to help assess the difference between the asset's current distressed position and its repositioning-adjusted recovery potential.",
        ru: "Где уместно, REPOSITION LAB работает рядом с одобренными банками или институционально признанными независимыми оценочными компаниями, чтобы помочь оценить разницу между текущим проблемным положением объекта и его потенциалом после перепозиционирования."
      },
      {
        en: "This may include current distressed asset value, repositioned marketability, adaptive reuse impact, post-repositioning valuation scenarios and liquidity enhancement potential. The objective is not to replace formal valuation or provide investment advice. The objective is to create a structured basis for comparing current recovery assumptions, repositioning-adjusted value potential and strategic disposal alternatives.",
        ru: "Это может включать текущую стоимость проблемного объекта, рыночную привлекательность после перепозиционирования, влияние адаптивного использования, оценочные сценарии после перепозиционирования и потенциал повышения ликвидности. Цель — не заменить формальную оценку и не предоставить инвестиционный совет. Цель — создать структурированную основу для сравнения текущих допущений, потенциала после перепозиционирования и стратегических альтернатив вывода."
      },
      {
        en: "For banks and institutional asset holders, this matters because recovery decisions are not made on emotion or visual concepts. They are connected to recoverability, collateral value, provisioning assumptions, liquidation improvement, hold/sell decisions, distressed disposal timing, restructuring options, portfolio strategy and balance-sheet impact.",
        ru: "Для банков и институциональных собственников это важно, потому что решения о сложных объектах не принимаются на эмоциях или визуальных концепциях. Они связаны со стоимостью обеспечения, резервными допущениями, улучшением сценария ликвидации, решением удерживать или продавать, сроками продажи проблемного объекта, вариантами реструктуризации, стратегией портфеля и влиянием на баланс."
      },
      {
        en: "This is what separates the work from creative concept development. The repositioning thesis is tested against recovery logic, valuation scenarios and institutional decision-making.",
        ru: "Именно это отличает работу от разработки красивой концепции. Тезис перепозиционирования проверяется через оценочную логику, сценарии вывода и институциональное принятие решений."
      }
    ],
    mandateTitle: { en: "Mandate fit", ru: "Соответствие мандату" },
    mandate: [
      {
        en: "REPOSITION LAB is most relevant where an asset is constrained, misunderstood, underused or difficult to release through conventional disposal logic. Typical situations include bank-held or non-core collateral, stalled developments, special-situation portfolios, heritage assets, family-held real estate and properties whose future use requires a clearer repositioning thesis.",
        ru: "REPOSITION LAB наиболее уместен там, где объект ограничен, неверно понят, недоиспользован или сложен для вывода через стандартную логику продажи. Типичные ситуации включают банковское или непрофильное обеспечение, остановленные девелоперские проекты, портфели специальных ситуаций, исторические объекты, семейную недвижимость и объекты, будущее использование которых требует более ясного тезиса перепозиционирования."
      },
      {
        en: "We are not positioned as a retail brokerage, listing platform or speculative sales campaign. Work is considered where a disciplined recovery, adaptive reuse or institutional repositioning logic can be credibly examined.",
        ru: "Мы не позиционируемся как розничный брокер, площадка объявлений или спекулятивная кампания продаж. Работа рассматривается там, где можно достоверно изучить дисциплинированную логику перепозиционирования, адаптивного использования или институционального вывода объекта."
      }
    ]
  },
  cases: {
    eyebrow: {
      en: "Transformation Intelligence Cases",
      ru: "КЕЙСЫ ПЕРЕПОЗИЦИОНИРОВАНИЯ"
    },
    title: {
      en: "Selected repositioning theses. These are not listings.",
      ru: "Избранные кейсы перепозиционирования. Это не объявления о продаже."
    },
    intro: {
      en: "Each entry illustrates how an asset was re-read — its challenge, the repositioning logic and the strategic direction the recovery thesis pointed toward. Confidential commercial detail is held under mandate. Public case notes remain intentionally limited during this structural content phase.",
      ru: "Каждый кейс показывает, как объект был прочитан заново: его исходная проблема, логика перепозиционирования и стратегическое направление, к которому привёл новый рыночный тезис. Конфиденциальные коммерческие детали остаются в рамках мандата. Публичные материалы по кейсам намеренно ограничены на этапе формирования структуры."
    },
    assetChallenge: { en: "Asset challenge", ru: "Проблема объекта" },
    logic: { en: "Repositioning logic", ru: "Логика перепозиционирования" },
    direction: { en: "Strategic direction", ru: "Стратегическое направление" },
    notFoundLabel: { en: "Case not found", ru: "Кейс не найден" },
    notFoundTitle: { en: "This case page is not available.", ru: "Эта страница кейса недоступна." },
    evidenceLabel: { en: "Evidence layer", ru: "Слой подтверждающих материалов" },
    evidenceText: {
      en: "Asset-specific documentation, visual records, maps, constraints, stakeholder context and supporting analysis are prepared during the next content phase. This section is reserved for verified materials only, not speculative claims.",
      ru: "Документация по объекту, визуальные материалы, карты, ограничения, контекст заинтересованных сторон и поддерживающий анализ готовятся на следующем этапе контента. Этот раздел зарезервирован только для проверенных материалов, а не для спекулятивных утверждений."
    },
    advantagesLabel: {
      en: "Key repositioning advantages",
      ru: "Ключевые преимущества репозиционирования"
    },
    submit: { en: "Submit an Asset for Review", ru: "Предложить объект для анализа" }
  },
  approach: {
    eyebrow: { en: "Approach", ru: "ПОДХОД" },
    title: { en: "A five-stage institutional method.", ru: "Пятиэтапный институциональный метод." },
    disciplineTitle: {
      en: "Written discipline at every stage",
      ru: "Письменная дисциплина на каждом этапе"
    },
    discipline: [
      {
        en: "Every stage is documented. Every recommendation is written. We do not move from one stage to the next without explicit owner alignment.",
        ru: "Каждый этап документируется. Каждая рекомендация фиксируется письменно. Мы не переходим от одного этапа к следующему без явного согласования с владельцем."
      },
      {
        en: "We do not invent permits, valuations, returns or historical facts. Where information is missing or unverified, the deliverable states it clearly. This is the basis on which institutional capital can engage seriously.",
        ru: "Мы не выдумываем разрешения, оценки, доходность или исторические факты. Если информация отсутствует или не подтверждена, итоговый материал прямо это фиксирует. Именно на такой основе институциональный капитал может вести серьёзный диалог."
      }
    ],
    cta: { en: "Begin with a Confidential Review", ru: "Начать с конфиденциального анализа" },
    stages: [
      {
        n: "01",
        t: { en: "Diagnose", ru: "Диагностика" },
        trigger: { en: "View diagnostic scope", ru: "Показать объём диагностики" },
        d: {
          en: "We strip the asset to its structural reality — title, condition, zoning, narrative, capital fit. We separate the real problems from the inherited story.",
          ru: "Мы возвращаем объект к его структурной реальности — правам, состоянию, зонированию, рыночной истории и соответствию капиталу. Мы отделяем реальные проблемы от унаследованного восприятия."
        },
        note: [
          {
            en: "Diagnostics reads the asset together with its setting. Alongside title, condition, zoning, physical limitations and capital fit, we examine the district around the asset: access, transport, social infrastructure, adjacent uses, municipal or city development plans and the direction in which the surrounding area may evolve.",
            ru: "Диагностика рассматривает объект вместе с его окружением. Наряду с правами, состоянием, зонированием, физическими ограничениями и соответствием капиталу мы изучаем район вокруг объекта: доступность, транспорт, социальную инфраструктуру, соседние функции, муниципальные или городские планы развития и направление возможной эволюции территории."
          },
          {
            en: "This allows the asset to be tested against possible future users, likely audiences and relevant counterparties. The result is not a design idea, but an initial opportunity map: viable functions, constraints, liquidity factors and the conditions under which the asset could become relevant again.",
            ru: "Это позволяет проверить объект через возможных будущих пользователей, вероятные аудитории и подходящих контрагентов. Результат — не дизайн-идея, а первичная карта возможностей: жизнеспособные функции, ограничения, факторы ликвидности и условия, при которых объект может снова стать рыночно понятным."
          }
        ]
      },
      {
        n: "02",
        t: { en: "Reposition", ru: "Репозиционирование" },
        trigger: { en: "View specialist consensus", ru: "Показать экспертный консенсус" },
        d: {
          en: "We rewrite the thesis around the value drivers the asset can actually defend. The repositioning logic becomes the spine of every downstream decision.",
          ru: "Мы перестраиваем тезис вокруг факторов ценности, которые объект действительно способен подтвердить. Логика перепозиционирования становится основой всех последующих решений."
        },
        note: [
          {
            en: "Repositioning is formed through coordinated specialist review, not a single opinion. Depending on the asset, the work may involve strategic, architectural, heritage, technical, legal, zoning, market, valuation, hospitality, investor-packaging and narrative perspectives.",
            ru: "Перепозиционирование формируется через координированный экспертный разбор, а не через одно мнение. В зависимости от объекта работа может включать стратегическую, архитектурную, историко-культурную, техническую, юридическую, градостроительную, рыночную, оценочную, гостиничную, презентационную и смысловую перспективы."
          },
          {
            en: "The findings are consolidated into a defensible repositioning thesis. This thesis reformulates the existing asset narrative into a clearer future-use logic: what the property can credibly become, which audiences it can serve, how its market perception can change, and where liquidity potential may be strengthened without unsupported claims.",
            ru: "Выводы консолидируются в обоснованный тезис перепозиционирования. Он преобразует существующую историю объекта в более ясную логику будущего использования: чем объект может убедительно стать, какие аудитории обслуживать, как может измениться его рыночное восприятие и где может усилиться потенциал ликвидности без неподтверждённых заявлений."
          }
        ]
      },
      {
        n: "03",
        t: { en: "Package", ru: "Упаковка" },
        trigger: { en: "View packaging scope", ru: "Показать объём упаковки" },
        d: {
          en: "We translate the thesis into institutional documentation: information memoranda, narrative, financial framing and discreet visual identity.",
          ru: "Мы переводим тезис в институциональную документацию: информационный меморандум, рыночную историю, финансовую рамку и сдержанную визуальную идентичность."
        },
        note: [
          {
            en: "Packaging translates the repositioning thesis into a form that institutional audiences can read, test and discuss. This may include a memorandum, asset logic, visual direction, use scenarios, positioning narrative, financial framing and supporting presentation materials.",
            ru: "Упаковка переводит тезис перепозиционирования в форму, которую институциональная аудитория может прочитать, проверить и обсудить. Это может включать меморандум, логику объекта, визуальное направление, сценарии использования, позиционирующую историю, финансовую рамку и поддерживающие презентационные материалы."
          },
          {
            en: "The goal is not cosmetic marketing. It is professional legibility. A distressed or misunderstood asset often fails because its logic is not visible to the right counterparties. Packaging makes the recovery thesis structured, credible and communicable without overstating facts or promising outcomes.",
            ru: "Цель — не косметический маркетинг. Цель — сделать логику объекта профессионально понятной. Проблемный или неверно понятый объект часто проваливается потому, что его потенциал не виден нужным контрагентам. Упаковка делает тезис перепозиционирования структурированным, достоверным и передаваемым без преувеличения фактов и обещания результатов."
          }
        ]
      },
      {
        n: "04",
        t: { en: "Engage", ru: "Вовлечение" },
        trigger: { en: "View engagement logic", ru: "Показать логику вовлечения" },
        d: {
          en: "We engage qualified capital, operators and partners directly. Selective. Confidential. Written. No retail broadcast.",
          ru: "Мы напрямую работаем с квалифицированным капиталом, операторами и партнёрами. Выборочно. Конфиденциально. Письменно. Без массового рыночного продвижения."
        },
        note: [
          {
            en: "Engagement begins only when the asset has a defensible logic and a clear future-use scenario. Communication is directed toward relevant counterparties: qualified capital, operators, strategic partners, cultural or hospitality actors, institutions or owners whose interests match the repositioning path.",
            ru: "Вовлечение начинается только тогда, когда у объекта есть обоснованная логика и ясный сценарий будущего использования. Коммуникация направляется к подходящим контрагентам: квалифицированному капиталу, операторам, стратегическим партнёрам, культурным или гостиничным операторам, институциям или собственникам, чьи интересы совпадают с путём перепозиционирования."
          },
          {
            en: "This stage avoids mass-market sales language and broad speculative exposure. The objective is selective, confidential dialogue with parties capable of understanding the asset's transformed logic and testing whether a mandate, partnership, acquisition, lease, operation or recovery route is realistic.",
            ru: "Этот этап избегает массового языка продаж и широкого спекулятивного раскрытия. Цель — выборочный конфиденциальный диалог со сторонами, способными понять обновлённую логику объекта и проверить, реалистичен ли мандат, партнёрство, приобретение, аренда, операционная модель или иной путь вывода объекта."
          }
        ]
      },
      {
        n: "05",
        t: { en: "Recover", ru: "Восстановление" },
        trigger: { en: "View recovery path", ru: "Показать возможный путь" },
        d: {
          en: "We execute the path that optimizes recovery, not headline price — disposal, joint venture, conversion or repositioning held by the original owner.",
          ru: "Мы реализуем путь, который усиливает позицию собственника, а не просто заголовочную цену: продажу, совместное предприятие, конверсию или перепозиционирование с сохранением у первоначального владельца."
        },
        note: [
          {
            en: "Recovery is treated as an owner-outcome path, not a quick sale at any price. Depending on the asset, the route may involve holding, phased repositioning, operator alignment, adaptive reuse, partnership, conversion, controlled exit or preparation for a more suitable investor audience.",
            ru: "Финальный этап рассматривается как путь к результату для собственника, а не как быстрая продажа любой ценой. В зависимости от объекта маршрут может включать удержание, поэтапное перепозиционирование, согласование с оператором, адаптивное использование, партнёрство, конверсию, контролируемый выход или подготовку к более подходящей инвесторской аудитории."
          },
          {
            en: "The selected path should fit the asset's condition, constraints, market, future function and owner interests. The aim is to improve the quality of options available to the owner and support a more defensible recovery process, without implying guaranteed liquidity, value creation or investor response.",
            ru: "Выбранный путь должен соответствовать состоянию объекта, ограничениям, рынку, будущей функции и интересам владельца. Цель — улучшить качество доступных собственнику вариантов и поддержать более обоснованный процесс вывода или удержания объекта без обещаний гарантированной ликвидности, роста стоимости или реакции инвесторов."
          }
        ]
      }
    ]
  }
};
const LanguageContext = reactExports.createContext(null);
function getInitialLanguage() {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem(STORAGE_KEY) === "ru" ? "ru" : "en";
}
function LanguageProvider({ children }) {
  const [language, setLanguageState] = reactExports.useState("en");
  const setLanguage = (nextLanguage) => {
    setLanguageState(nextLanguage);
    window.localStorage.setItem(STORAGE_KEY, nextLanguage);
  };
  reactExports.useEffect(() => {
    setLanguageState(getInitialLanguage());
  }, []);
  reactExports.useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);
  const value = reactExports.useMemo(
    () => ({
      language,
      setLanguage,
      t: copy,
      l: (localized) => localized[language]
    }),
    [language]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageContext.Provider, { value, children });
}
function useLanguage() {
  const context = reactExports.useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used inside LanguageProvider");
  }
  return context;
}
function LanguageSwitcher({ compact = false }) {
  const { language, setLanguage } = useLanguage();
  const languages = ["en", "ru"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: `inline-flex min-h-9 items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] sm:gap-2 sm:tracking-[0.16em] ${compact ? "self-start" : ""}`,
      "aria-label": "Language",
      children: languages.map((item, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-2", children: [
        index > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/45", children: "·" }) : null,
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: `min-h-9 border-b transition-colors ${language === item ? "border-accent text-foreground font-medium" : "border-transparent text-muted-foreground hover:text-accent"}`,
            "aria-pressed": language === item,
            onClick: () => setLanguage(item),
            children: item.toUpperCase()
          }
        )
      ] }, item))
    }
  );
}
function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = reactExports.useState(false);
  const { t, l } = useLanguage();
  const nav = t.header.nav;
  const mobileNav = [...nav, { to: "/submit", label: t.common.submitAsset }];
  reactExports.useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-rule", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl flex items-center justify-between gap-2 h-16 sm:gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex min-w-0 shrink-0 items-baseline gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "serif text-[17px] tracking-wide text-foreground sm:text-lg", children: "REPOSITION" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "brand-lab eyebrow text-accent", children: "LAB" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-5 xl:gap-6", children: nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: n.to,
          className: "text-[13px] text-muted-foreground hover:text-foreground transition-colors",
          activeProps: { className: "text-accent font-semibold" },
          children: l(n.label)
        },
        n.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden items-center gap-3 lg:flex", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSwitcher, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/submit",
            className: "premium-action px-4 py-2 text-[12px] uppercase tracking-[0.18em]",
            children: l(t.common.submitAsset)
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 items-center gap-1.5 sm:gap-2 lg:hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageSwitcher, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            className: "premium-action inline-flex min-h-11 shrink-0 items-center px-3 text-[11px] uppercase tracking-[0.14em] sm:px-4 sm:text-[12px] sm:tracking-[0.18em]",
            "aria-expanded": isMenuOpen,
            "aria-controls": "mobile-navigation",
            onClick: () => setIsMenuOpen((open) => !open),
            children: isMenuOpen ? l(t.header.close) : l(t.header.menu)
          }
        )
      ] })
    ] }),
    isMenuOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "nav",
      {
        id: "mobile-navigation",
        className: "container-rl max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-rule bg-background py-3 lg:hidden",
        "aria-label": "Mobile navigation",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col", children: mobileNav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: n.to,
            className: "mobile-safe-text min-h-12 border-b border-rule/70 px-1 py-4 text-[13px] uppercase tracking-[0.14em] text-foreground transition-colors hover:text-accent sm:tracking-[0.16em]",
            activeProps: { className: "text-accent font-semibold" },
            onClick: () => setIsMenuOpen(false),
            children: l(n.label)
          },
          n.to
        )) })
      }
    ) : null
  ] });
}
function SiteFooter() {
  const { t, l } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("footer", { className: "site-footer border-t border-rule mt-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-rl py-16 grid gap-12 md:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2 max-w-md", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "serif text-2xl text-foreground", children: "REPOSITION LAB" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mt-2 text-accent", children: l(t.footer.tagline) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mobile-safe-text mt-6 text-sm text-muted-foreground leading-relaxed", children: l(t.footer.description) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-4 text-accent", children: l(t.footer.navigate) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services", className: "hover:text-accent text-muted-foreground", children: l(t.header.nav[1].label) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/cases", className: "hover:text-accent text-muted-foreground", children: l(t.footer.transformationCases) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/approach", className: "hover:text-accent text-muted-foreground", children: l(t.header.nav[3].label) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/selected-thinking", className: "hover:text-accent text-muted-foreground", children: l(t.footer.selectedThinking) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "eyebrow mb-4 text-accent", children: l(t.footer.operations) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2 text-sm text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "mobile-safe-text", children: "London · RANTA LIMITED" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "mobile-safe-text", children: "Latvia · Slovenia · Turkey" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-rule", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-rl py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "mobile-safe-text", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " REPOSITION LAB · RANTA LIMITED"
    ] }) }) })
  ] });
}
function getStoredLanguage() {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem("reposition-lab-language") === "ru" ? "ru" : "en";
}
function NotFoundComponent() {
  const language = getStoredLanguage();
  const copy2 = {
    title: language === "ru" ? "Страница не найдена" : "Page not found",
    body: language === "ru" ? "Страница, которую вы ищете, не существует или была перемещена." : "The page you're looking for doesn't exist or has been moved.",
    home: language === "ru" ? "На главную" : "Go home"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: copy2.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: copy2.body }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: copy2.home
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  const language = getStoredLanguage();
  const copy2 = {
    title: language === "ru" ? "Страница не загрузилась" : "This page didn't load",
    body: language === "ru" ? "Что-то пошло не так. Можно попробовать обновить страницу или вернуться на главную." : "Something went wrong on our end. You can try refreshing or head back home.",
    retry: language === "ru" ? "Попробовать снова" : "Try again",
    home: language === "ru" ? "На главную" : "Go home"
  };
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: copy2.title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: copy2.body }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "premium-action inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
          children: copy2.retry
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "premium-action inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium",
          children: copy2.home
        }
      )
    ] })
  ] }) });
}
const Route$b = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "REPOSITION LAB — Strategic Real Estate Repositioning & Recovery Intelligence" },
      {
        name: "description",
        content: "Strategic repositioning and recovery intelligence for distressed, underutilized and misunderstood real estate. For banks, family offices, special situations capital and institutional owners."
      },
      { name: "author", content: "REPOSITION LAB" },
      { property: "og:title", content: "REPOSITION LAB" },
      {
        property: "og:description",
        content: "Strategic Real Estate Repositioning & Recovery Intelligence."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
      }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$b.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(LanguageProvider, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(GlobalScrollReveal, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteHeader, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SiteFooter, {})
  ] }) });
}
function GlobalScrollReveal() {
  reactExports.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const observed = /* @__PURE__ */ new WeakSet();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("global-scroll-reveal--visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" }
    );
    const register = (root = document) => {
      const textItems = root.querySelectorAll(
        "main h1, main h2, main h3, main h4, main p, main blockquote, main li"
      );
      const imageItems = root.querySelectorAll("main img");
      const targets = /* @__PURE__ */ new Set();
      textItems.forEach((item) => {
        if (item.closest(".castle-line-drawing") || item.closest('[role="slider"]') || item.classList.contains("page-reveal") || item.classList.contains("hero-text-reveal")) {
          return;
        }
        targets.add(item);
      });
      imageItems.forEach((image) => {
        if (image.closest(".castle-line-drawing") || image.closest('[role="slider"]') || image.closest(".case-photo-reveal")) {
          return;
        }
        targets.add(image.parentElement ?? image);
      });
      targets.forEach((target) => {
        if (observed.has(target)) return;
        observed.add(target);
        target.classList.add("global-scroll-reveal");
        observer.observe(target);
      });
    };
    register();
    const mutationObserver = new MutationObserver(() => register());
    const main = document.querySelector("main");
    if (main) {
      mutationObserver.observe(main, { childList: true, subtree: true });
    }
    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);
  return null;
}
const $$splitComponentImporter$9 = () => import("./who-we-are-CILvUDyj.mjs");
const Route$a = createFileRoute("/who-we-are")({
  head: () => ({
    meta: [{
      title: "Who We Are — REPOSITION LAB"
    }, {
      name: "description",
      content: "REPOSITION LAB works with banks, asset holders, institutional owners, family offices, investors and special-situation stakeholders on distressed, low-liquidity and misunderstood real estate."
    }, {
      property: "og:title",
      content: "Who We Are — REPOSITION LAB"
    }, {
      property: "og:description",
      content: "Strategic recovery and repositioning logic for low-liquidity and distressed real estate."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./submit-ogFjavAz.mjs");
const Route$9 = createFileRoute("/submit")({
  head: () => ({
    meta: [{
      title: "Submit an Asset — REPOSITION LAB"
    }, {
      name: "description",
      content: "Submit an asset for confidential strategic review by REPOSITION LAB. Reviews are subject to mandate capacity."
    }, {
      property: "og:title",
      content: "Submit an Asset — REPOSITION LAB"
    }, {
      property: "og:description",
      content: "Confidential asset submission for strategic review."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const BASE_URL = "https://repositionlab.com";
const Route$8 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/who-we-are", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/cases", changefreq: "monthly", priority: "0.9" },
          { path: "/approach", changefreq: "monthly", priority: "0.8" },
          { path: "/recovery-validation", changefreq: "monthly", priority: "0.8" },
          { path: "/selected-thinking", changefreq: "monthly", priority: "0.7" },
          { path: "/submit", changefreq: "yearly", priority: "0.8" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" }
        ];
        const urls = entries.map(
          (e) => `  <url><loc>${BASE_URL}${e.path}</loc>${e.changefreq ? `<changefreq>${e.changefreq}</changefreq>` : ""}${e.priority ? `<priority>${e.priority}</priority>` : ""}</url>`
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" }
        });
      }
    }
  }
});
const $$splitComponentImporter$7 = () => import("./services-BgWCfb8x.mjs");
const Route$7 = createFileRoute("/services")({
  head: () => ({
    meta: [{
      title: "Services - REPOSITION LAB"
    }, {
      name: "description",
      content: "Rapid Asset Recovery, Portfolio Screening, Full Repositioning & Packaging, Distressed Heritage and Digital Structuring Readiness."
    }, {
      property: "og:title",
      content: "Services - REPOSITION LAB"
    }, {
      property: "og:description",
      content: "Five disciplines of strategic real estate recovery."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./selected-thinking-OjjENIna.mjs");
const Route$6 = createFileRoute("/selected-thinking")({
  head: () => ({
    meta: [{
      title: "Selected Thinking — REPOSITION LAB"
    }, {
      name: "description",
      content: "Notes on hidden value, liquidity engineering, heritage repositioning and recovery-focused real estate intelligence."
    }, {
      property: "og:title",
      content: "Selected Thinking — REPOSITION LAB"
    }, {
      property: "og:description",
      content: "Notes on recovery, repositioning and real estate intelligence."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./recovery-validation-DClRzDU2.mjs");
const Route$5 = createFileRoute("/recovery-validation")({
  head: () => ({
    meta: [{
      title: "Independent Recovery Validation Framework — REPOSITION LAB"
    }, {
      name: "description",
      content: "Independent valuation logic for repositioning-adjusted recovery scenarios. How REPOSITION LAB helps banks and institutional asset holders compare distressed recovery models with repositioning-adjusted scenarios."
    }, {
      property: "og:title",
      content: "Independent Recovery Validation Framework — REPOSITION LAB"
    }, {
      property: "og:description",
      content: "Independent valuation logic for repositioning-adjusted recovery scenarios."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./contact-MXGgCQcz.mjs");
const Route$4 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — REPOSITION LAB"
    }, {
      name: "description",
      content: "Confidential institutional contact for REPOSITION LAB. London office, strategic operations in Latvia, Slovenia and Turkey."
    }, {
      property: "og:title",
      content: "Contact — REPOSITION LAB"
    }, {
      property: "og:description",
      content: "Confidential institutional contact."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const slivnicaHeroImg = "/assets/sliv0-Bgf8BaFt.jpg";
const slivnicaDetailImg = "/assets/sliv4-CJf8gCaS.jpg";
const slivnicaInteriorImg = "/assets/SLIV5-Duj_rcEx.jpg";
const slivnicaSecondDetailImg = "/assets/SLIV6-BaHmD6WI.jpg";
const slivnicaUpperImg = "/assets/SLIV7-B7j-D0-0.jpg";
const slivnicaLowerImg = "/assets/SLIV8-rie6jFpX.jpg";
const slivnicaAtmosphereImg = "/assets/SLIV9-IU2pham-.jpg";
const industrialImg = "/assets/case-industrial-ujo5_okl.jpg";
const flotesImg = "/assets/case-riga-DoTp3arb.jpg";
const kekavaImg = "/assets/Generated%20image%201-OwJ21RF6.png";
const kekavaExteriorImg = "/assets/photo_2026-07-23_19-00-40-NcDWVTwT.jpg";
const kekavaInteriorImg = "/assets/photo_2026-07-23_19-00-32-Bv-S66Py.jpg";
const kekavaDetailImg = "/assets/photo_2026-07-23_19-00-36-Dio0Obcf.jpg";
const kekavaUpperImg = "/assets/photo_2026-07-23_19-01-21-69mTz7gC.jpg";
const kekavaLowerImg = "/assets/photo_2026-07-23_19-00-44-CTENtXba.jpg";
const kekavaAtmosphereImg = "/assets/photo_2026-07-23_19-00-49-B8G_3eaY.jpg";
const apartmentsImg = "/assets/entrance1-CxymO6c0.jpg";
const apartmentsExteriorImg = "/assets/ins1-CjU5ILO6.jpg";
const apartmentsInteriorImg = "/assets/in2-DzbL8F_I.jpg";
const apartmentsDetailImg = "/assets/in3-mDcdEeCt.jpg";
const apartmentsUpperImg = "/assets/ins4-xzfs0SLu.jpg";
const apartmentsLowerImg = "/assets/ins6-DPA41B4t.jpg";
const apartmentsAtmosphereImg = "/assets/ins7-BO-AQAvY.jpg";
const turkeyImg = "/assets/karag-vcgzrzls.jpg";
const turkeyInteriorImg = "/assets/karag1-BpMVLUeF.jpg";
const turkeyDetailImg = "/assets/karag2-Cejwuoyj.jpg";
const turkeyExteriorImg = "/assets/karag3-D6n-4exR.jpg";
const turkeyUpperImg = "/assets/karag5-sEYzjJLc.jpg";
const turkeyLowerImg = "/assets/karag6-7lv4IyKj.jpg";
const turkeyAtmosphereImg = "/assets/karag7-HCJXG0ej.jpg";
const cases = [
  {
    slug: "slovenia-castle",
    title: { en: "Slovenia Castle", ru: "Замок в Словении" },
    theme: { en: "Heritage Repositioning", ru: "Репозиционирование наследия" },
    img: slivnicaHeroImg,
    challenge: {
      en: "A historic castle trapped between the cost of total restoration and a market with neither an obvious buyer nor a convincing reason to acquire it.",
      ru: "Исторический замок оказался между стоимостью тотальной реставрации и рынком, на котором не было ни очевидного покупателя, ни убедительной причины для приобретения."
    },
    logic: {
      en: "The project moved from a property-sale thesis to a multi-scenario platform where cinematic production, photography, education, cultural exchange and selective hospitality reinforce one another.",
      ru: "Проект перешёл от логики продажи недвижимости к мультисценарной платформе, где кино- и фотопроизводство, образование, культурный обмен и камерное гостеприимство усиливают друг друга."
    },
    direction: {
      en: "Preserve the cinematic patina · activate before over-restoring · build an international creative and educational destination.",
      ru: "Сохранить кинематографичную патину · активировать объект без избыточной реставрации · создать международную творческую и образовательную платформу."
    },
    subtitle: {
      en: "From an unmarketable restoration liability to an international platform whose unfinished character became its strongest asset.",
      ru: "От непродаваемого объекта с тяжёлым реставрационным бюджетом — к международной платформе, где незавершённость стала главным активом."
    },
    sections: [
      {
        eyebrow: { en: "Starting Point — A Castle Without a Market", ru: "Отправная точка — замок без рынка" },
        body: [
          {
            en: "At the beginning, the asset was read in the most literal way: an old castle that had to be fully restored and then sold. That sequence looked logical on paper, but collapsed under scrutiny. Restoration required substantial capital before the project had a clear audience, operating model or buyer. The local market could not justify the scale of the investment, while an international buyer had no compelling reason to take on the risk.",
            ru: "В начале объект воспринимался буквально: старый замок, который нужно полностью отреставрировать, а затем продать. На бумаге такая последовательность выглядела логично, но не выдерживала проверки. Реставрация требовала значительного капитала ещё до появления понятной аудитории, операционной модели или покупателя. Локальный рынок не мог оправдать такой объём вложений, а у международного покупателя не было убедительной причины принимать на себя этот риск."
          },
          {
            en: "The problem was therefore larger than the physical condition of the building. The castle was culturally valuable but commercially mute: expensive to recover, difficult to compare, and impossible to explain through the language of conventional residential or hospitality real estate.",
            ru: "Проблема заключалась не только в физическом состоянии здания. Замок обладал культурной ценностью, но коммерчески оставался «немым»: дорогим в восстановлении, сложным для сравнения и практически необъяснимым на языке обычной жилой или гостиничной недвижимости."
          }
        ]
      },
      {
        eyebrow: { en: "First Reframe — From Sale to Use", ru: "Первый поворот — от продажи к использованию" },
        body: [
          {
            en: "The first strategic shift was to stop asking who might buy the castle and ask who could use it. This changed the object from a static property into infrastructure for activity. Instead of depending on one hypothetical purchaser, the project could address filmmakers, photographers, artists, educators, researchers, cultural institutions and small-format event operators.",
            ru: "Первый стратегический сдвиг состоял в том, чтобы перестать спрашивать, кто может купить замок, и спросить, кто может им пользоваться. Так статичная недвижимость превратилась в инфраструктуру для деятельности. Вместо зависимости от одного гипотетического покупателя проект получил сразу несколько реальных аудиторий: кинематографистов, фотографов, художников, преподавателей, исследователей, культурные институции и операторов камерных событий."
          },
          {
            en: "Value no longer depended only on a future transaction. It could be produced gradually through access, programming, temporary occupation, partnerships and international visibility.",
            ru: "Ценность перестала зависеть только от будущей сделки: её стало возможно наращивать постепенно — через доступ к объекту, программирование, временное использование, партнёрства и международную видимость."
          }
        ]
      },
      {
        eyebrow: { en: "Cinematic Platform", ru: "Кинематографическая платформа" },
        body: [
          {
            en: "The castle's worn surfaces, deep shadows, irregular rooms and traces of time were initially treated as evidence of work still to be done. Re-read through the lens of visual production, those same qualities became production value. The building already contained what set designers spend significant budgets trying to recreate: believable age, layered texture and an atmosphere that changes from room to room.",
            ru: "Потёртые поверхности, глубокие тени, нерегулярные помещения и следы времени сначала воспринимались как свидетельства незавершённых работ. Но в оптике визуального производства те же качества превратились в готовую художественную ценность. В здании уже было то, что художники-постановщики создают за значительные бюджеты: убедительный возраст, многослойная фактура и атмосфера, меняющаяся от комнаты к комнате."
          },
          {
            en: "This opened practical scenarios for feature and period films, fashion editorials, music videos, advertising shoots, portfolio sessions and location-based creative residencies. Each activates the castle without requiring it to imitate a newly finished luxury property.",
            ru: "Отсюда возникли практические сценарии для полнометражного и исторического кино, fashion-съёмок, музыкальных клипов, рекламных кампаний, портфолио-сессий и творческих резиденций. Каждый из них активирует замок, не заставляя его имитировать новодельный люксовый объект."
          }
        ]
      },
      {
        eyebrow: { en: "Educational and Cultural Layer", ru: "Образовательный и культурный слой" },
        body: [
          {
            en: "The second layer transformed the castle from a rentable backdrop into a place where knowledge is produced. Workshops in filmmaking, photography, restoration, architecture, heritage management and visual storytelling can use the building itself as a living case study. International summer schools, artist residencies, lectures and small conferences create longer stays and a reason for institutions to return.",
            ru: "Второй слой превращает замок из арендуемой декорации в место, где создаётся знание. Воркшопы по кино, фотографии, реставрации, архитектуре, работе с наследием и визуальному сторителлингу могут использовать само здание как живой учебный кейс. Международные летние школы, арт-резиденции, лекции и небольшие конференции формируют более длительное пребывание и дают институциям причину возвращаться."
          },
          {
            en: "Education also gives the project continuity. A film crew may arrive for several days, while an academic or residency programme can build a seasonal rhythm. Together they create a platform that works across different calendars rather than relying on a single tourism peak.",
            ru: "Образование также даёт проекту непрерывность. Съёмочная группа может приехать на несколько дней, тогда как академическая программа или резиденция формирует сезонный ритм. Вместе эти форматы создают платформу, работающую по разным календарям и не зависящую от единственного туристического пика."
          }
        ]
      },
      {
        eyebrow: { en: "The Critical Insight — Do Not Erase the Asset", ru: "Ключевой вывод — не стереть сам актив" },
        body: [
          {
            en: "The decisive insight was that total reconstruction could destroy the very quality that made the new scenarios credible. If every wall were perfected, every surface replaced and every irregularity corrected, the castle would become more conventional precisely when the strategy required it to remain singular.",
            ru: "Решающим стал вывод о том, что тотальная реконструкция способна уничтожить именно то качество, которое делает новые сценарии убедительными. Если выровнять каждую стену, заменить каждую поверхность и исправить каждую нерегулярность, замок станет более стандартным именно в тот момент, когда стратегии нужна его исключительность."
          },
          {
            en: "The approach therefore changed from total restoration to selective stabilization and adaptive activation: secure the structure, provide safety and essential services, improve access and production logistics, but preserve the patina, spatial ambiguity and visible evidence of time. Intervention becomes precise and reversible where possible; authenticity remains visible rather than being polished away.",
            ru: "Поэтому вместо тотальной реставрации был выбран подход выборочной стабилизации и адаптивной активации: обеспечить конструктивную надёжность, безопасность, базовые инженерные системы, доступ и производственную логистику, но сохранить патину, пространственную неоднозначность и видимые следы времени. Вмешательство должно быть точным и по возможности обратимым, а подлинность — оставаться видимой, а не исчезать под новой отделкой."
          }
        ]
      },
      {
        eyebrow: { en: "Final Position — An International Working Castle", ru: "Итоговая позиция — международный работающий замок" },
        body: [
          {
            en: "The final concept is not a museum frozen in one historical period, not a conventional hotel and not a property waiting passively for a buyer. It is an international working castle: a place for productions, creative residencies, learning, cultural exchange, curated events and selective hospitality.",
            ru: "Итоговая концепция — не музей, застывший в одном историческом периоде, не обычный отель и не недвижимость, пассивно ожидающая покупателя. Это международный работающий замок: место для съёмок, творческих резиденций, обучения, культурного обмена, кураторских событий и камерного гостеприимства."
          },
          {
            en: "Its repositioning reverses the original equation. What first appeared to be a liability — age, incompleteness and the cost of reconstruction — becomes the source of differentiation. The project no longer needs to erase its past before it can have a future. It creates its future by making that past usable.",
            ru: "Сила репозиционирования в том, что оно разворачивает исходное уравнение. То, что сначала казалось обременением — возраст, незавершённость и стоимость реконструкции, — становится источником отличия. Проекту больше не нужно стирать прошлое, чтобы получить будущее. Он создаёт будущее, делая прошлое пригодным к использованию."
          }
        ]
      }
    ],
    advantages: [
      {
        title: { en: "Lower capital pressure", ru: "Снижение капитальной нагрузки" },
        body: {
          en: "Selective stabilization replaces speculative total reconstruction and connects investment to real operating needs.",
          ru: "Выборочная стабилизация заменяет спекулятивную тотальную реконструкцию и связывает инвестиции с реальными операционными задачами."
        }
      },
      {
        title: { en: "Multiple audiences", ru: "Несколько аудиторий" },
        body: {
          en: "Film, photography, education, culture and hospitality create complementary demand instead of dependence on one buyer.",
          ru: "Кино, фотография, образование, культура и гостеприимство создают взаимодополняющий спрос вместо зависимости от одного покупателя."
        }
      },
      {
        title: { en: "Authenticity as production value", ru: "Подлинность как производственная ценность" },
        body: {
          en: "Age, patina and spatial irregularity become marketable qualities that new construction cannot reproduce.",
          ru: "Возраст, патина и пространственная нерегулярность становятся рыночными качествами, которые невозможно воспроизвести новым строительством."
        }
      },
      {
        title: { en: "Phased activation", ru: "Поэтапная активация" },
        body: {
          en: "The castle can begin hosting selected uses while improvements continue, generating visibility, partnerships and evidence of demand.",
          ru: "Замок может принимать отдельные форматы параллельно с улучшениями, создавая видимость, партнёрства и подтверждённый спрос."
        }
      }
    ],
    gallery: [
      {
        src: slivnicaDetailImg,
        alt: "Slivnica Castle architectural view",
        caption: "Architectural view",
        type: "exterior",
        objectPosition: "center center"
      },
      {
        src: slivnicaInteriorImg,
        alt: "Slivnica Castle interior",
        caption: "Castle interior",
        type: "interior",
        objectPosition: "center center"
      },
      {
        src: slivnicaSecondDetailImg,
        alt: "Slivnica Castle architectural detail",
        caption: "Architectural detail",
        type: "detail",
        objectPosition: "center center"
      },
      {
        src: slivnicaUpperImg,
        alt: "Slivnica Castle wide architectural view",
        caption: "Castle architectural view",
        type: "upper",
        objectPosition: "center center"
      },
      {
        src: slivnicaLowerImg,
        alt: "Slivnica Castle lower-level view",
        caption: "Lower-level view",
        type: "lower",
        objectPosition: "center center"
      },
      {
        src: slivnicaAtmosphereImg,
        alt: "Slivnica Castle atmosphere",
        caption: "Castle atmosphere",
        type: "atmosphere",
        objectPosition: "center center"
      }
    ]
  },
  {
    slug: "industrial-heritage-slovenia",
    title: { en: "Industrial Heritage, Slovenia", ru: "Индустриальное наследие, Словения" },
    theme: { en: "Adaptive Reuse", ru: "Адаптивное использование" },
    img: industrialImg,
    challenge: {
      en: "A historic pumpkin oil factory — culturally significant, structurally sound, commercially illegible.",
      ru: "Историческая фабрика тыквенного масла — культурно значимая и конструктивно сохранная, но с неясной коммерческой логикой."
    },
    logic: {
      en: "Conversion thesis structured around boutique hospitality, creative-industry tenancy and a heritage-aware narrative for qualified operators.",
      ru: "Тезис конверсии, выстроенный вокруг бутик-гостеприимства, арендаторов креативной индустрии и бережной работы с наследием для квалифицированных операторов."
    },
    direction: {
      en: "Industrial heritage repositioning · boutique hospitality · creative tenancy.",
      ru: "Репозиционирование индустриального наследия · бутик-гостеприимство · креативная аренда."
    }
  },
  {
    slug: "bauskas-16a-riga",
    title: { en: "Bauskas 16A, Riga", ru: "Bauskas 16A, Рига" },
    theme: { en: "Urban Heritage", ru: "Городское наследие" },
    img: "/images/cases/bauskas-16a/case1.jpg",
    subtitle: {
      en: "Repositioning a historic Riga estate through cinematic identity, adaptive reuse and hospitality logic.",
      ru: "Репозиционирование исторической рижской усадьбы через кинематографичную идентичность, адаптивное использование и логику гостеприимства."
    },
    challenge: {
      en: "Bauskas 16A is a historically layered urban estate that the local market has consistently misread. Its spatial complexity, cultural depth and multi-function potential do not translate into conventional real estate disposal logic, leaving it under-read and difficult to place through standard channels.",
      ru: "Bauskas 16A — исторически многослойная городская усадьба, которую локальный рынок последовательно понимал слишком узко. Пространственная сложность, культурная глубина и многофункциональный потенциал плохо укладываются в стандартную логику продажи недвижимости, из-за чего объект остаётся недооценённым и сложным для вывода через обычные каналы."
    },
    logic: {
      en: "REPOSITION LAB's concept repositions the estate from a fragmented and misunderstood asset into a coherent multi-scenario environment — readable by cultural operators, hospitality capital, creative industries and private-members concepts seeking heritage assets with strong spatial identity.",
      ru: "Концепция REPOSITION LAB переводит усадьбу из фрагментированного и неверно понятого объекта в цельную мультисценарную среду — понятную культурным операторам, гостиничному капиталу, креативным индустриям и закрытым клубным концепциям, которым нужны объекты наследия с сильной пространственной идентичностью."
    },
    direction: {
      en: "Cinematic identity · adaptive reuse · hospitality and residential flexibility · cultural operator and lifestyle capital.",
      ru: "Кинематографичная идентичность · адаптивное использование · гостеприимство и жилая гибкость · культурный оператор и lifestyle-капитал."
    },
    sections: [
      {
        eyebrow: { en: "Repositioning Thesis", ru: "Тезис репозиционирования" },
        body: [
          {
            en: "Bauskas 16A is presented not as a conventional real estate asset, but as a repositioning case. The value of the work lies in how the property is re-read: from a fragmented historic estate into a multi-scenario cultural, hospitality and cinematic environment with stronger marketability logic.",
            ru: "Bauskas 16A представлен не как стандартный объект недвижимости, а как кейс репозиционирования. Ценность работы заключается в новом прочтении объекта: от фрагментированной исторической усадьбы к мультисценарной культурной, гостиничной и кинематографичной среде с более сильной рыночной логикой."
          },
          {
            en: "The concept reframes the building from an unusual and potentially difficult-to-read property into a hybrid heritage asset. Its repositioning logic is based on the combination of historic interiors, atmospheric spatial composition, residential flexibility, wellness and event infrastructure, and potential for curated cultural or hospitality use.",
            ru: "Концепция переосмысляет здание из необычного и потенциально сложного для рынка объекта в гибридный объект наследия. Его логика репозиционирования строится на сочетании исторических интерьеров, атмосферной пространственной композиции, жилой гибкости, wellness- и event-инфраструктуры, а также потенциала для культурного или гостиничного использования."
          }
        ]
      },
      {
        eyebrow: {
          en: "Spatial Identity as Value Driver",
          ru: "Пространственная идентичность как фактор ценности"
        },
        body: [
          {
            en: "The property contains several distinct spatial layers: representative upper floors, independent residential apartments and a lower hospitality, wellness and event level. REPOSITION LAB's concept does not treat these as disconnected amenities, but as a functional ecosystem.",
            ru: "Объект содержит несколько отдельных пространственных слоёв: репрезентативные верхние этажи, независимые жилые апартаменты и нижний уровень для гостеприимства, wellness и событий. Концепция REPOSITION LAB рассматривает их не как разрозненные удобства, а как функциональную экосистему."
          },
          {
            en: "The spatial composition allows the asset to support several complementary scenarios: private residence, creative residency, cinematic location, cultural programming, boutique hospitality, private events, wellness experience and curated destination use.",
            ru: "Пространственная композиция позволяет объекту поддерживать несколько взаимодополняющих сценариев: частная резиденция, творческая резиденция, кинематографичная локация, культурная программа, бутик-гостеприимство, частные события, wellness-опыт и кураторское использование как самостоятельного направления."
          }
        ]
      },
      {
        eyebrow: { en: "Cinematic Upper Environment", ru: "Кинематографичная верхняя среда" },
        body: [
          {
            en: "The second and third floors are interpreted as the emotional and cinematic core of the estate. Library-like rooms, double-height perspectives, salon-style zones, attic architecture, textured interiors and natural light create a setting with strong visual identity.",
            ru: "Второй и третий этажи интерпретируются как эмоциональное и кинематографичное ядро усадьбы. Библиотечные комнаты, двойные высоты, салонные зоны, мансардная архитектура, фактурные интерьеры и естественный свет создают среду с сильной визуальной идентичностью."
          },
          {
            en: "The upper environment gives the asset a visual identity that becomes part of its repositioning thesis: a historically textured, cinematically credible environment that cannot be replicated through new construction.",
            ru: "Верхняя среда даёт объекту визуальную идентичность, которая становится частью тезиса репозиционирования: исторически фактурная, кинематографически убедительная среда, которую невозможно воспроизвести новым строительством."
          }
        ]
      },
      {
        eyebrow: { en: "Residential Flexibility", ru: "Жилая гибкость" },
        body: [
          {
            en: "The first floor is reported to contain two independent apartment configurations of approximately 125 square metres each, subject to confirmation. Within the repositioning logic, these spaces can support guest accommodation, creative residencies, private stays, long-term living or accommodation connected to events and productions on the upper floors.",
            ru: "Первый этаж, по предварительным данным, содержит две независимые квартирные конфигурации примерно по 125 квадратных метров каждая, что требует подтверждения. В логике репозиционирования эти пространства могут поддерживать гостевое размещение, творческие резиденции, частное проживание, долгосрочное использование или размещение, связанное с событиями и съёмками на верхних этажах."
          },
          {
            en: "The estate can combine private, creative and hospitality use without being reduced to a single fixed operating model — an important quality for assets targeting non-standard audiences and non-conventional capital.",
            ru: "Усадьба может сочетать частное, творческое и гостиничное использование, не сводясь к одной фиксированной операционной модели — важное качество для объектов, ориентированных на нестандартные аудитории и нетипичный капитал."
          }
        ]
      },
      {
        eyebrow: {
          en: "Lower Hospitality and Wellness Layer",
          ru: "Нижний wellness- и event-слой"
        },
        body: [
          {
            en: "The lower level, which may include wellness facilities, a professional kitchen, meeting rooms and event space subject to confirmation, is read within the concept as a supporting experiential layer.",
            ru: "Нижний уровень, который может включать wellness-зоны, профессиональную кухню, переговорные помещения и event-пространство при условии подтверждения, читается в концепции как поддерживающий опытный слой."
          },
          {
            en: "The logic is to position it as an integrated component of a coherent multi-scenario environment — one that may enhance the estate's overall institutional readability and marketability.",
            ru: "Логика состоит в том, чтобы позиционировать его как интегрированный компонент цельной мультисценарной среды — компонент, который может сделать усадьбу более понятной для институционального и профессионального рынка."
          }
        ]
      },
      {
        eyebrow: {
          en: "From Low-Liquidity Asset to Repositioned Concept",
          ru: "От низколиквидного объекта к новой рыночной концепции"
        },
        body: [
          {
            en: "The final strategic point is that Bauskas 16A's potential does not lie only in its physical features. Its potential lies in the concept that connects those features into a coherent market-facing story.",
            ru: "Финальная стратегическая мысль в том, что потенциал Bauskas 16A заключается не только в физических характеристиках. Он заключается в концепции, которая соединяет эти характеристики в цельную рыночную историю."
          },
          {
            en: "Through repositioning, the asset can be presented as a rare Riga heritage environment with cinematic, cultural, hospitality and residential logic. The purpose is not to guarantee liquidity, investor interest or value uplift. The purpose is to create a more defensible and institutionally readable basis for the asset's future positioning.",
            ru: "Через репозиционирование объект может быть представлен как редкая рижская среда наследия с кинематографичной, культурной, гостиничной и жилой логикой. Цель — не гарантировать ликвидность, интерес инвесторов или рост стоимости. Цель — создать более обоснованную и понятную профессиональному рынку основу для будущего позиционирования объекта."
          }
        ]
      }
    ],
    gallery: [
      {
        src: "/images/cases/bauskas-16a/bau1.jpg",
        alt: "Bauskas 16A exterior architectural view",
        caption: "Exterior architectural identity",
        type: "exterior",
        span: "full"
      },
      {
        src: "/images/cases/bauskas-16a/images12.jpg",
        alt: "Bauskas 16A interior atmosphere",
        caption: "Interior atmosphere",
        type: "interior"
      },
      {
        src: "/images/cases/bauskas-16a/images123.jpg",
        alt: "Bauskas 16A architectural detail",
        caption: "Architectural detail",
        type: "detail"
      },
      {
        src: "/images/cases/bauskas-16a/baus2.jpg",
        alt: "Bauskas 16A upper representative interior space",
        type: "upper",
        span: "full"
      },
      {
        src: "/images/cases/bauskas-16a/baus4.jpg",
        alt: "Bauskas 16A residential floor interior",
        type: "lower",
        objectPosition: "center 70%"
      },
      {
        src: "/images/cases/bauskas-16a/baus5.jpg",
        alt: "Bauskas 16A lower level hospitality and wellness space",
        type: "atmosphere"
      }
    ]
  },
  {
    slug: "distressed-prime-apartments",
    title: { en: "Two Apartments — One Address", ru: "Две квартиры — один адрес" },
    theme: { en: "Private Residence Repositioning", ru: "Репозиционирование частной резиденции" },
    img: apartmentsImg,
    subtitle: {
      en: "Re-reading two former communal apartments as one rare multi-level private residence in a prime urban location.",
      ru: "Переосмысление двух бывших коммунальных квартир как единой редкой многоуровневой резиденции в престижной городской локации."
    },
    challenge: {
      en: "Two former communal apartments at one address were read by the market as separate distressed properties, despite their shared entrance, connecting staircase and prime location.",
      ru: "Две бывшие коммунальные квартиры по одному адресу воспринимались рынком как отдельные проблемные объекты, несмотря на общий подъезд, связывающую их лестницу и престижную локацию."
    },
    logic: {
      en: "The two properties were repositioned as one vertically organised private residence, with public and private life distributed across separate but connected levels.",
      ru: "Два объекта были перепозиционированы как единая вертикально организованная частная резиденция, где общественные и приватные функции распределены между отдельными, но связанными уровнями."
    },
    direction: {
      en: "Category shift · one prestigious address · vertical privacy · discreet access to qualified private buyers.",
      ru: "Смена категории · единый престижный адрес · вертикальная приватность · конфиденциальный доступ к квалифицированным частным покупателям."
    },
    sections: [
      {
        eyebrow: { en: "Two Apartments — One Address", ru: "Две квартиры — один адрес" },
        body: [
          {
            en: "The original asset consisted of two former communal apartments located within the same entrance and connected by a common staircase. Sold separately, the market would have read them in familiar terms: two large apartments, each constrained by its condition, layout and historic use.",
            ru: "Исходный объект состоял из двух бывших коммунальных квартир, расположенных в одном подъезде и связанных общей лестницей. При раздельной продаже рынок воспринимал бы их привычно: как две большие квартиры, каждая из которых ограничена своим состоянием, планировкой и историей использования."
          },
          {
            en: "Read together, they represented something materially rarer: the foundation for a private multi-level residence at a single address in a prime urban location.",
            ru: "Вместе они представляли значительно более редкую возможность: основу для частной многоуровневой резиденции по одному адресу в престижной городской локации."
          }
        ]
      },
      {
        eyebrow: { en: "Before Repositioning", ru: "До перепозиционирования" },
        body: [
          {
            en: "The principal constraint was not the building itself, nor even the apartments' communal past. It was the way the asset was read. Each unit was judged separately through its floor area, physical condition, existing plan and the prevailing price per square metre in the district.",
            ru: "Главным ограничением было не само здание и даже не коммунальное прошлое квартир. Проблемой было то, как объект воспринимался рынком. Каждая квартира оценивалась отдельно — через площадь, физическое состояние, существующую планировку и среднюю стоимость квадратного метра в районе."
          },
          {
            en: "That approach overlooked the most important asset: the ability to organise both properties as one coherent vertical home. The location already carried value, but the existing category prevented the market from recognising its full potential.",
            ru: "Такой подход не учитывал главный актив — возможность организовать обе квартиры как единый вертикальный дом. Локация уже создавала ценность, но существующая категория объекта не позволяла рынку увидеть его полный потенциал."
          }
        ]
      },
      {
        eyebrow: { en: "The Hidden Opportunity", ru: "Скрытая возможность" },
        body: [
          {
            en: "The shared entrance and connecting staircase made it possible to create more than an enlarged apartment. They enabled a genuine multi-level residence in which each floor could carry a distinct role while remaining part of one private address.",
            ru: "Общий подъезд и связывающая лестница позволили создать не просто увеличенную квартиру, а полноценную многоуровневую резиденцию, в которой каждый этаж получает собственную функцию, оставаясь частью единого частного адреса."
          },
          {
            en: "One level can accommodate reception rooms, dining, kitchen and entertaining. Another can be reserved for bedrooms, dressing rooms, a study and family life. Additional rooms may support guests, children or staff without compromising the owners' privacy.",
            ru: "Один уровень может быть отведён под гостиную, столовую, кухню и приём гостей. Другой — под спальни, гардеробные, кабинет и семейную жизнь. Дополнительные помещения могут использоваться для гостей, детей или персонала, не нарушая приватность владельцев."
          }
        ]
      },
      {
        eyebrow: { en: "After Repositioning", ru: "После перепозиционирования" },
        body: [
          {
            en: "The former communal apartments are no longer presented as two compromised properties. They become one rare urban residence offering scale, functional separation and a degree of privacy usually associated with a private house.",
            ru: "Бывшие коммунальные квартиры больше не представлены как два сложных объекта. Они становятся единой редкой городской резиденцией, предлагающей масштаб, функциональное разделение и уровень приватности, обычно связанный с частным домом."
          },
          {
            en: "The residence can support a large family, several generations, visiting guests or live-in staff. Its levels may operate as one continuous home while retaining enough autonomy to accommodate different patterns of daily life.",
            ru: "Резиденция может поддерживать сценарии жизни большой семьи, нескольких поколений, приезжающих гостей или персонала. Её уровни работают как единый дом, сохраняя достаточную автономность для разных ритмов повседневной жизни."
          }
        ]
      },
      {
        eyebrow: {
          en: "Renovation Improved the Space — Repositioning Changed Its Value",
          ru: "Реконструкция улучшила пространство — репозиционирование изменило его ценность"
        },
        body: [
          {
            en: "The value uplift is not explained by finish quality alone. The decisive move is a category shift: from two former communal apartments into one differentiated premium residence that is difficult to compare with standard stock and difficult to reproduce in an established prime district.",
            ru: "Рост ценности объясняется не только качеством реконструкции. Решающим шагом стала смена категории: две бывшие коммунальные квартиры превратились в дифференцированную премиальную резиденцию, которую сложно сравнивать со стандартным предложением и практически невозможно воспроизвести в сформированном престижном районе."
          },
          {
            en: "If sold separately, each apartment remains anchored to local comparables. Presented as one residence, the buyer is assessing a scarce configuration: substantial scale, vertical privacy and a single prestigious address. That scarcity can support a stronger perceived value than the simple sum of two conventional units.",
            ru: "При раздельной продаже каждая квартира остаётся привязана к локальным аналогам. В формате единой резиденции покупатель оценивает редкую конфигурацию: значительный масштаб, вертикальную приватность и единый престижный адрес. Эта редкость может поддерживать более высокую воспринимаемую ценность, чем простая сумма двух стандартных квартир."
          }
        ]
      },
      {
        eyebrow: { en: "Not a Mass-Market Proposition", ru: "Не для массового рынка" },
        body: [
          {
            en: "An asset of this kind does not require broad public exposure. Its premium character can be reinforced through discreet, targeted presentation to qualified private buyers whose requirements include scale, privacy, family flexibility and a central location.",
            ru: "Такой объект не требует широкой публичной рекламы. Его премиальный характер может быть усилен конфиденциальной адресной подачей квалифицированным частным покупателям, для которых важны масштаб, приватность, семейная гибкость и центральная локация."
          },
          {
            en: "The mass market prices square metres. The right private buyer recognises an opportunity that cannot easily be recreated.",
            ru: "Массовый рынок оценивает квадратные метры. Подходящий частный покупатель видит возможность, которую невозможно легко повторить."
          }
        ]
      }
    ],
    advantages: [
      {
        title: { en: "Category shift", ru: "Смена категории" },
        body: {
          en: "Two separate apartments are re-read as one rare multi-level private residence.",
          ru: "Две отдельные квартиры переосмыслены как единая редкая многоуровневая резиденция."
        }
      },
      {
        title: { en: "One prestigious address", ru: "Единый престижный адрес" },
        body: {
          en: "Both levels form one coherent private holding rather than two unrelated units.",
          ru: "Оба уровня образуют единое частное владение, а не два несвязанных объекта."
        }
      },
      {
        title: { en: "Vertical privacy", ru: "Вертикальная приватность" },
        body: {
          en: "Reception, family, guest and staff functions can be separated across connected floors.",
          ru: "Общественные, семейные, гостевые и служебные функции можно разделить между связанными этажами."
        }
      },
      {
        title: { en: "Rare urban scale", ru: "Редкий городской масштаб" },
        body: {
          en: "The residence delivers substantial space without sacrificing an established prime location.",
          ru: "Резиденция предлагает значительную площадь без отказа от сформированной престижной локации."
        }
      },
      {
        title: { en: "Flexible living", ru: "Гибкие сценарии жизни" },
        body: {
          en: "The configuration can support a large family, several generations, guests or live-in staff.",
          ru: "Конфигурация подходит для большой семьи, нескольких поколений, гостей или проживания с персоналом."
        }
      },
      {
        title: { en: "Scarcity premium", ru: "Премия за редкость" },
        body: {
          en: "A comparable residence is difficult to assemble or reproduce within a mature central district.",
          ru: "Сопоставимую резиденцию сложно собрать или воспроизвести в сформированном центральном районе."
        }
      }
    ],
    gallery: [
      {
        src: apartmentsExteriorImg,
        alt: "Two Apartments — One Address entrance",
        type: "exterior",
        span: "full"
      },
      {
        src: apartmentsInteriorImg,
        alt: "Two Apartments — One Address interior atmosphere",
        type: "interior"
      },
      {
        src: apartmentsDetailImg,
        alt: "Two Apartments — One Address architectural detail",
        type: "detail"
      },
      {
        src: apartmentsUpperImg,
        alt: "Two Apartments — One Address upper representative space",
        type: "upper",
        span: "full"
      },
      {
        src: apartmentsLowerImg,
        alt: "Two Apartments — One Address residential floor interior",
        type: "lower"
      },
      {
        src: apartmentsAtmosphereImg,
        alt: "Two Apartments — One Address lower level atmosphere",
        type: "atmosphere"
      }
    ]
  },
  {
    slug: "turkey-lifestyle-repositioning",
    title: {
      en: "Two-Level Lifestyle Residence, Fethiye",
      ru: "Двухуровневая резиденция в Фетхие"
    },
    theme: { en: "Asset Category Shift", ru: "СМЕНА КАТЕГОРИИ АКТИВА" },
    img: turkeyImg,
    imgPosition: "center 72%",
    challenge: {
      en: "Two separate apartments carried uneven market logic: one lower unit was constrained by light, outlook and spatial limitations, while the upper unit was stronger but still conventional within the local market.",
      ru: "Две отдельные квартиры имели разную рыночную логику: нижний блок был ограничен светом, видом и пространственной конфигурацией, а верхний был сильнее, но всё ещё оставался обычным объектом для локального рынка."
    },
    logic: {
      en: "The two units were connected vertically and re-read as one integrated two-level lifestyle residence, combining internal scale, dual terraces, direct pool access, guest/studio flexibility and a panoramic upper living layer.",
      ru: "Два блока были соединены вертикально и переосмыслены как единая двухуровневая резиденция, объединяющая внутренний масштаб, две террасы, прямой доступ к бассейну, гостевую или студийную логику и панорамный верхний жилой уровень."
    },
    direction: {
      en: "Category shift · dual-terrace lifestyle logic · pool access · panoramic Fethiye Bay views · villa-like privacy within apartment infrastructure.",
      ru: "Смена категории · логика двухтеррасной резиденции · доступ к бассейну · панорамные виды на залив Фетхие · уединение уровня виллы внутри инфраструктуры апартаментов."
    },
    subtitle: {
      en: "Spatial restructuring and category shift for a two-level lifestyle residence in Fethiye, Turkey.",
      ru: "Пространственная реструктуризация и смена категории для двухуровневой резиденции в Фетхие, Турция."
    },
    sections: [
      {
        eyebrow: { en: "Original Configuration", ru: "Исходная конфигурация" },
        body: [
          {
            en: "Turkey Lifestyle Repositioning demonstrates how spatial restructuring can change the market logic of an asset. The original configuration consisted of two separate apartments with very different levels of appeal. The lower apartment had a terrace of approximately 25-30 square meters with views toward the pool and forest, but the interior was recessed into the building, with limited natural light and restricted outlook from most rooms.",
            ru: "Кейс в Фетхие показывает, как пространственная реструктуризация может изменить рыночную логику объекта. Исходная конфигурация состояла из двух отдельных апартаментов с разным уровнем привлекательности. Нижний апартамент имел террасу примерно 25-30 квадратных метров с видом к бассейну и лесу, но интерьер был заглублён в здание, с ограниченным естественным светом и слабым видом из большинства помещений."
          },
          {
            en: "The upper apartment was stronger as a standalone property. It included three bedrooms, a large terrace of approximately 140 square meters and a significant sea-view orientation. However, within the local market, it remained a familiar type: a good apartment with a large terrace and view, but not a truly singular asset.",
            ru: "Верхний апартамент был сильнее как самостоятельный объект. Он включал три спальни, большую террасу примерно 140 квадратных метров и выраженную ориентацию на морской вид. Однако в локальном рынке он оставался знакомым типом: хороший апартамент с большой террасой и видом, но не по-настоящему уникальный объект."
          }
        ]
      },
      {
        eyebrow: { en: "Repositioning Concept", ru: "Концепция репозиционирования" },
        body: [
          {
            en: "The repositioning concept connected the two apartments vertically through an internal staircase and transformed them into one integrated two-level residence. This created approximately 210 square meters of internal space and approximately 170 square meters of combined terraces, with two distinct outdoor identities.",
            ru: "Концепция репозиционирования вертикально соединила два апартамента внутренней лестницей и преобразовала их в единую двухуровневую резиденцию. Это создало примерно 210 квадратных метров внутреннего пространства и около 170 квадратных метров совмещённых террас с двумя разными сценариями использования на открытом воздухе."
          },
          {
            en: "The lower level was reprogrammed as a flexible private suite with direct access from the residence to the pool area.",
            ru: "Нижний уровень был переосмыслен как гибкий приватный блок с прямым доступом из резиденции к зоне бассейна."
          }
        ]
      },
      {
        eyebrow: { en: "Lower Guest and Studio Layer", ru: "Нижний гостевой и студийный уровень" },
        body: [
          {
            en: "The more constrained rear part of the lower unit was reinterpreted as a guest room with a full bathroom and additional wardrobe function. This converted a spatial disadvantage into a supporting private-use zone.",
            ru: "Более ограниченная задняя часть нижнего блока была переосмыслена как гостевая комната с полноценной ванной и дополнительной гардеробной функцией. Так пространственный недостаток был превращён в поддерживающую приватную зону."
          }
        ]
      },
      {
        eyebrow: {
          en: "Upper Panoramic Residential Layer",
          ru: "Верхний панорамный жилой уровень"
        },
        body: [
          {
            en: "The upper level became the main panoramic residential layer. Two bedrooms were combined into one larger primary suite of approximately 25 square meters, while an adjoining room became a dressing and vanity area.",
            ru: "Верхний уровень стал главным панорамным жилым слоем. Две спальни были объединены в более крупный основной блок примерно 25 квадратных метров, а смежная комната стала гардеробной и зоной ухода."
          },
          {
            en: "The upper terrace is the core value driver of the repositioned asset: approximately 140 square meters of outdoor space, including a covered zone, with views across Fethiye Bay, the marina, the nearby island, the sea and the mountain range.",
            ru: "Верхняя терраса — ключевой фактор ценности перепозиционированного объекта: примерно 140 квадратных метров открытого пространства, включая крытую зону, с видами на залив Фетхие, марину, близлежащий остров, море и горный хребет."
          }
        ]
      },
      {
        eyebrow: { en: "Category Shift", ru: "Смена категории" },
        body: [
          {
            en: "The value of the repositioning was not created only by combining square meters. It was created by changing the asset category. Before repositioning, the units could be read as two separate apartments: one constrained and one conventional. After repositioning, the property could be read as a rare two-level lifestyle residence.",
            ru: "Ценность перепозиционирования была создана не только объединением квадратных метров. Она была создана сменой категории объекта. До репозиционирования блоки воспринимались как два отдельных апартамента: один ограниченный, другой стандартно сильный. После репозиционирования объект воспринимается как редкая двухуровневая резиденция."
          },
          {
            en: "The repositioned asset may support a materially stronger market perception because the buyer is no longer comparing it only to standard apartments in the area, but to a differentiated lifestyle residence that is difficult to replicate in Fethiye.",
            ru: "Перепозиционированный объект может поддерживать существенно более сильное рыночное восприятие, потому что покупатель сравнивает его уже не только со стандартными апартаментами района, а с дифференцированной резиденцией, которую сложно воспроизвести в Фетхие."
          }
        ]
      }
    ],
    gallery: [
      {
        src: turkeyExteriorImg,
        alt: "Fethiye residence panoramic terrace",
        caption: "Panoramic terrace and bay view",
        type: "exterior",
        objectPosition: "center 68%"
      },
      {
        src: turkeyInteriorImg,
        alt: "Fethiye residence interior atmosphere",
        caption: "Interior atmosphere",
        type: "interior",
        objectPosition: "center center"
      },
      {
        src: turkeyDetailImg,
        alt: "Fethiye residence architectural detail",
        caption: "Architectural detail",
        type: "detail",
        objectPosition: "center center"
      },
      {
        src: turkeyUpperImg,
        alt: "Fethiye two-level residence and terrace",
        caption: "Two-level residence and terrace",
        type: "upper",
        objectPosition: "center 68%"
      },
      {
        src: turkeyLowerImg,
        alt: "Fethiye residence lower-level dining area",
        caption: "Lower-level dining area",
        type: "lower",
        objectPosition: "center 68%"
      },
      {
        src: turkeyAtmosphereImg,
        alt: "Fethiye residence dining room atmosphere",
        caption: "Dining room atmosphere",
        type: "atmosphere",
        objectPosition: "center 68%"
      }
    ],
    advantages: [
      {
        title: { en: "Category shift", ru: "Смена категории" },
        body: {
          en: "From two apartments into one rare two-level lifestyle residence.",
          ru: "От двух апартаментов к редкой двухуровневой резиденции."
        }
      },
      {
        title: { en: "Value integration", ru: "Интеграция стоимости" },
        body: {
          en: "The weaker lower apartment stopped being a liability and became a functional private suite with pool access.",
          ru: "Более слабый нижний апартамент перестал быть ограничением и стал функциональным приватным блоком с доступом к бассейну."
        }
      },
      {
        title: { en: "Outdoor value expansion", ru: "Расширение ценности террас" },
        body: {
          en: "Two terraces were given separate identities: one pool-connected and one panoramic sea-view.",
          ru: "Две террасы получили разные идентичности: одна связана с бассейном, другая — с панорамным видом на море."
        }
      },
      {
        title: { en: "Spatial differentiation", ru: "Пространственная дифференциация" },
        body: {
          en: "The residence gained lower guest/studio logic, upper primary-suite logic, open-plan living and multiple outdoor experiences.",
          ru: "Резиденция получила нижнюю гостевую и студийную логику, верхнюю логику основного жилого блока, открытую планировку гостиной и несколько сценариев жизни на террасах."
        }
      },
      {
        title: { en: "Market uniqueness", ru: "Рыночная уникальность" },
        body: {
          en: "The final configuration combines apartment convenience, villa-like privacy, direct pool access and panoramic Fethiye Bay views.",
          ru: "Финальная конфигурация объединяет удобство апартаментов, приватность уровня виллы, прямой доступ к бассейну и панорамные виды на залив Фетхие."
        }
      },
      {
        title: { en: "Stronger resale narrative", ru: "Более сильная история для перепродажи" },
        body: {
          en: "The property can be presented as one singular lifestyle asset rather than two separate units.",
          ru: "Объект может быть представлен как единая lifestyle-резиденция, а не как два отдельных блока."
        }
      },
      {
        title: { en: "Higher perceived value", ru: "Более высокая воспринимаемая стоимость" },
        body: {
          en: "The repositioning may support stronger market perception than the two apartments sold separately.",
          ru: "Репозиционирование может поддержать более сильное рыночное восприятие, чем продажа двух апартаментов по отдельности."
        }
      }
    ]
  },
  {
    slug: "kekava-production-campus",
    title: { en: "Ķekava Production Campus", ru: "Производственный кампус Ķekava" },
    theme: {
      en: "Industrial Asset Repositioning",
      ru: "Репозиционирование индустриального актива"
    },
    img: kekavaImg,
    subtitle: {
      en: "From a former factory competing as secondary industrial space to a flexible production, studio and event infrastructure.",
      ru: "От бывшей фабрики, конкурирующей в категории вторичной индустриальной недвижимости, — к гибкой производственной, студийной и событийной инфраструктуре."
    },
    challenge: {
      en: "The former factory had substantial buildings, engineering capacity and an extensive yard, but the market could read it only as ageing warehouse and production space.",
      ru: "Бывшая фабрика обладала крупными корпусами, инженерным ресурсом и большой территорией, но рынок воспринимал её лишь как устаревающие складские и производственные площади."
    },
    logic: {
      en: "Repositioning keeps the industrial character but changes the product: the buildings and yard become a multi-scenario campus for production, workshops, filming, fabrication, storage and temporary events.",
      ru: "Репозиционирование сохраняет индустриальную природу объекта, но меняет сам продукт: корпуса и территория становятся многосценарным кампусом для производства, мастерских, съёмок, изготовления декораций, хранения и временных событий."
    },
    direction: {
      en: "Legacy industrial · production campus · project-based occupation · diversified income.",
      ru: "Индустриальное наследие · производственный кампус · проектное использование · диверсифицированный доход."
    },
    gallery: [
      {
        src: kekavaExteriorImg,
        alt: "Ķekava industrial campus exterior",
        type: "exterior",
        span: "full",
        objectPosition: "center center"
      },
      {
        src: kekavaInteriorImg,
        alt: "Ķekava industrial campus interior",
        type: "interior",
        objectPosition: "center center"
      },
      {
        src: kekavaDetailImg,
        alt: "Ķekava industrial campus architectural detail",
        type: "detail",
        objectPosition: "center top"
      },
      {
        src: kekavaUpperImg,
        alt: "Ķekava industrial campus production space",
        type: "upper",
        span: "full",
        objectPosition: "center center"
      },
      {
        src: kekavaLowerImg,
        alt: "Ķekava industrial campus working environment",
        type: "lower",
        objectPosition: "center center"
      },
      {
        src: kekavaAtmosphereImg,
        alt: "Ķekava industrial campus atmosphere",
        type: "atmosphere",
        objectPosition: "center center"
      }
    ],
    sections: [
      {
        eyebrow: {
          en: "Starting Point — An Asset Defined by Its Past",
          ru: "Исходная точка — объект, определённый своим прошлым"
        },
        body: [
          {
            en: "The property entered the market as a former factory: useful in scale, but difficult to distinguish from other secondary industrial stock. Its value was reduced to condition, access and a conventional price per square metre.",
            ru: "Объект вышел на рынок как бывшая фабрика: масштабная и функционально пригодная, но почти неотличимая от другой вторичной индустриальной недвижимости. Её ценность сводилась к состоянию, доступу и стандартной цене квадратного метра."
          }
        ]
      },
      {
        eyebrow: {
          en: "The Reframe — From Space to Infrastructure",
          ru: "Переоценка — от площади к инфраструктуре"
        },
        body: [
          {
            en: "The key shift was to stop treating the site as one undifferentiated volume. Large shells, service areas, loading access, power and open ground were re-read as a system capable of supporting different users and different occupation periods.",
            ru: "Ключевым изменением стал отказ от восприятия площадки как одного недифференцированного объёма. Большие корпуса, вспомогательные зоны, погрузочный доступ, инженерные мощности и открытая территория были переосмыслены как единая система для разных пользователей и сроков размещения."
          }
        ]
      },
      {
        eyebrow: {
          en: "A Multi-Scenario Production Model",
          ru: "Многосценарная производственная модель"
        },
        body: [
          {
            en: "Longer workshop and storage leases create a stable base, while filming, installations, fabrication and events activate the property project by project. The yard becomes part of the commercial product rather than unused space around the buildings.",
            ru: "Долгосрочная аренда мастерских и складов формирует стабильную основу, а съёмки, инсталляции, изготовление конструкций и события активируют объект проект за проектом. Территория становится частью коммерческого продукта, а не неиспользуемым пространством вокруг корпусов."
          }
        ]
      },
      {
        eyebrow: {
          en: "The New Investment Identity",
          ru: "Новая инвестиционная идентичность"
        },
        body: [
          {
            en: "After repositioning, the asset is no longer judged only against modern warehouses it cannot imitate. It is understood as specialised production infrastructure whose value comes from flexibility, intensity of use and several complementary income streams.",
            ru: "После репозиционирования объект больше не оценивается только в сравнении с современными складами, которым он не должен подражать. Он становится специализированной производственной инфраструктурой, ценность которой создают гибкость, интенсивность использования и несколько взаимодополняющих источников дохода."
          }
        ]
      }
    ],
    advantages: [
      {
        title: { en: "Category shift", ru: "Смена категории" },
        body: {
          en: "From secondary industrial property to a specialised production campus.",
          ru: "От вторичной индустриальной недвижимости — к специализированному производственному кампусу."
        }
      },
      {
        title: { en: "Multiple use cycles", ru: "Несколько циклов использования" },
        body: {
          en: "Long-term tenants and short project occupations can work alongside one another.",
          ru: "Долгосрочные арендаторы и краткосрочные проектные пользователи могут работать параллельно."
        }
      },
      {
        title: { en: "The yard becomes productive", ru: "Территория начинает работать" },
        body: {
          en: "Open ground supports logistics, staging, outdoor production and temporary formats.",
          ru: "Открытая площадка поддерживает логистику, монтаж, наружное производство и временные форматы."
        }
      },
      {
        title: { en: "Stronger income logic", ru: "Более сильная доходная модель" },
        body: {
          en: "Rent, project use and supporting services create a more resilient commercial structure.",
          ru: "Аренда, проектное использование и сопутствующие сервисы формируют более устойчивую коммерческую структуру."
        }
      }
    ]
  },
  {
    slug: "flotes-8-community-infrastructure",
    title: { en: "Flotes 8, Riga", ru: "Flotes 8, Рига" },
    theme: {
      en: "Social Infrastructure Repositioning",
      ru: "Репозиционирование социальной инфраструктуры"
    },
    img: flotesImg,
    subtitle: {
      en: "From a fragmented mixed-use property to a coherent community-services asset whose stable public and educational anchors create a credible basis for revaluation.",
      ru: "От фрагментированного mixed-use объекта — к цельному активу общественных сервисов, где устойчивые публичные и образовательные якоря создают убедительное основание для переоценки."
    },
    challenge: {
      en: "The building already generated activity and income, but its apartments, offices, education, everyday services and auxiliary spaces formed a tenant mix without a clear hierarchy or investment identity.",
      ru: "Здание уже создавало активность и доход, однако квартиры, офисы, образовательные, бытовые и вспомогательные функции образовывали набор арендаторов без ясной иерархии и инвестиционной идентичности."
    },
    logic: {
      en: "The repositioning identifies education, health and public-facing services as anchors, then curates supporting uses around them. This changes the valuation logic: income is no longer read as a collection of unrelated leases, but as cash flow generated by a coherent, locally relevant and harder-to-replace community-services asset.",
      ru: "Репозиционирование выделяет образование, здоровье и публичные сервисы в качестве якорей, а затем формирует вокруг них поддерживающие функции. Это меняет логику оценки: доход воспринимается уже не как сумма разрозненных договоров аренды, а как денежный поток цельного, востребованного районом и труднозаменимого объекта общественных сервисов."
    },
    direction: {
      en: "Anchor-led tenancy · education and public services · community relevance · durable income.",
      ru: "Якорные арендаторы · образование и публичные сервисы · районная значимость · устойчивый доход."
    },
    sections: [
      {
        eyebrow: {
          en: "Starting Point — Mixed Use Without a Centre",
          ru: "Исходная точка — mixed-use без смыслового центра"
        },
        body: [
          {
            en: "Flotes 8 was not an empty or obsolete building. It already contained residential, office, educational and everyday-service functions. The weakness was not a lack of use, but the absence of a clear relationship between those uses.",
            ru: "Flotes 8 не был пустующим или утратившим функцию зданием. В нём уже сосуществовали жильё, офисы, образование и повседневные сервисы. Слабостью было не отсутствие использования, а отсутствие понятной связи между этими функциями."
          }
        ]
      },
      {
        eyebrow: {
          en: "The Existing Strength — Public-Service Activity",
          ru: "Существующая сила — публично-сервисная функция"
        },
        body: [
          {
            en: "Educational and public-service activity already gave the address a role in the neighbourhood. Instead of treating it as one more line in the rent roll, the strategy makes this embedded social use the foundation of the asset's identity.",
            ru: "Образовательная и публично-сервисная деятельность уже придавала адресу реальную роль в районе. Вместо того чтобы считать её ещё одной строкой в арендной ведомости, стратегия превращает существующую социальную функцию в основу идентичности объекта."
          }
        ]
      },
      {
        eyebrow: {
          en: "Tenant Curation — Anchors and Supporting Uses",
          ru: "Кураторский подбор арендаторов — якоря и поддерживающие функции"
        },
        body: [
          {
            en: "Education, health, youth and community operators become the anchors. Café, wellbeing, counselling and other convenience services remain valuable when they support the daily life of the hub rather than compete to define it.",
            ru: "Образовательные, медицинские, молодёжные и общественные операторы становятся якорями. Кафе, wellbeing-сервисы, консультационные и другие повседневные функции сохраняют ценность, когда поддерживают жизнь центра, а не конкурируют за определение его характера."
          }
        ]
      },
      {
        eyebrow: {
          en: "Revaluation Logic — From Rent Roll to Durable Cash Flow",
          ru: "Логика переоценки — от арендной ведомости к устойчивому денежному потоку"
        },
        body: [
          {
            en: "Before repositioning, the asset is likely to be valued as a heterogeneous rent roll: every unit carries its own reletting risk, the tenant mix offers little strategic protection, and current occupancy does not automatically prove durable demand. This uncertainty limits the confidence that an investor can place in future NOI.",
            ru: "До репозиционирования объект, скорее всего, оценивается как неоднородная арендная ведомость: каждое помещение несёт отдельный риск повторной сдачи, состав арендаторов не создаёт стратегической защиты, а текущая заполняемость ещё не доказывает устойчивость спроса. Такая неопределённость ограничивает уверенность инвестора в будущем NOI."
          },
          {
            en: "A clear social-infrastructure profile makes the same income more legible. Anchor operators generate regular footfall and longer occupation, supporting services benefit from that demand, and the building acquires a role that cannot be replicated simply by offering another generic office or apartment nearby.",
            ru: "Чёткий профиль социальной инфраструктуры делает тот же доход более понятным и качественным. Якорные операторы создают регулярный поток посетителей и склонны занимать помещения дольше, поддерживающие сервисы получают спрос от их аудитории, а здание приобретает роль, которую нельзя воспроизвести простым предложением ещё одного офиса или квартиры поблизости."
          },
          {
            en: "The revaluation case therefore rests on a change in income quality rather than an assumed increase in rent alone. Lower expected vacancy, reduced tenant turnover, longer operating relationships and a clearer leasing proposition can improve the market's view of risk. If these effects are evidenced in leases and operating performance, they can support more stable NOI and a stronger valuation yield.",
            ru: "Поэтому основание для переоценки возникает не только из предполагаемого роста ставки аренды, а прежде всего из изменения качества дохода. Снижение ожидаемой вакантности, меньшая ротация арендаторов, более длинные операционные отношения и понятное предложение для новых пользователей способны улучшить восприятие риска рынком. Если эти эффекты подтверждены договорами и операционными показателями, они поддерживают более устойчивый NOI и более сильную ставку капитализации."
          }
        ]
      },
      {
        eyebrow: {
          en: "Evidence Required for Revaluation",
          ru: "Что должно подтвердить переоценку"
        },
        body: [
          {
            en: "The new narrative should be verified through measurable evidence: lease duration and break options, renewal rates, arrears, occupancy by anchor and supporting uses, tenant acquisition costs, downtime between leases, operating costs and the stability of net income. The stronger these indicators become, the less the valuation depends on a conceptual story alone.",
            ru: "Новый инвестиционный нарратив необходимо подтвердить измеримыми данными: сроками аренды и условиями выхода, долей продлений, задолженностью, заполняемостью якорных и поддерживающих функций, стоимостью привлечения арендаторов, простоем между договорами, операционными расходами и стабильностью чистого дохода. Чем сильнее эти показатели, тем меньше переоценка зависит только от концептуальной истории."
          },
          {
            en: "This creates a disciplined path to value: first establish the anchor-led operating model, then demonstrate retention and cash-flow resilience, and only then translate the reduced risk into a valuation premium. Repositioning becomes not a cosmetic relabelling of mixed use, but an evidence-based transition to a distinct social-infrastructure asset class.",
            ru: "Так формируется последовательный путь к росту стоимости: сначала выстроить операционную модель вокруг якорей, затем доказать удержание арендаторов и устойчивость денежного потока и только после этого переводить снижение риска в премию к оценке. Репозиционирование становится не косметическим переименованием mixed-use объекта, а подтверждённым данными переходом в отдельный класс актива социальной инфраструктуры."
          }
        ]
      }
    ],
    advantages: [
      {
        title: { en: "Clear hierarchy", ru: "Понятная иерархия" },
        body: {
          en: "Public, educational and community uses form the core; other tenants support it.",
          ru: "Публичные, образовательные и общественные функции образуют ядро, остальные арендаторы его поддерживают."
        }
      },
      {
        title: { en: "Lower vacancy risk", ru: "Снижение риска вакантности" },
        body: {
          en: "Relevant anchor tenants make the asset less dependent on constant reletting.",
          ru: "Значимые якорные арендаторы снижают зависимость объекта от постоянной смены пользователей."
        }
      },
      {
        title: { en: "Neighbourhood relevance", ru: "Значимость для района" },
        body: {
          en: "The building becomes a recognisable place for services used in everyday life.",
          ru: "Здание становится узнаваемым местом для сервисов, востребованных в повседневной жизни."
        }
      },
      {
        title: { en: "Durable investment story", ru: "Устойчивая инвестиционная история" },
        body: {
          en: "Tenant quality, social utility and longer operating relationships provide evidence for lower risk, more resilient NOI and asset revaluation.",
          ru: "Качество арендаторов, общественная полезность и более длительные операционные отношения подтверждают снижение риска, устойчивость NOI и основания для переоценки актива."
        }
      }
    ]
  }
];
const $$splitComponentImporter$3 = () => import("./cases-D3AdV89F.mjs");
const Route$3 = createFileRoute("/cases")({
  head: () => ({
    meta: [{
      title: "Transformation Intelligence Cases — REPOSITION LAB"
    }, {
      name: "description",
      content: "Selected repositioning theses across heritage, industrial, urban and lifestyle real estate."
    }, {
      property: "og:title",
      content: "Transformation Intelligence Cases"
    }, {
      property: "og:description",
      content: "Selected repositioning theses across heritage, industrial and special-situation real estate."
    }, {
      property: "og:image",
      content: cases[0].img
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./approach-CBKrB8h9.mjs");
const Route$2 = createFileRoute("/approach")({
  head: () => ({
    meta: [{
      title: "Approach — REPOSITION LAB"
    }, {
      name: "description",
      content: "A five-stage institutional method for distressed and underutilized real estate: diagnose, reposition, package, engage, recover."
    }, {
      property: "og:title",
      content: "Approach — REPOSITION LAB"
    }, {
      property: "og:description",
      content: "The five-stage method behind every REPOSITION LAB mandate."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-f4x3GGyo.mjs");
const Route$1 = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "REPOSITION LAB — Strategic Real Estate Repositioning & Recovery Intelligence"
    }, {
      name: "description",
      content: "Strategic recovery and real estate intelligence partner. We help banks, asset holders and institutional owners unlock hidden value in distressed and underutilized assets."
    }, {
      property: "og:title",
      content: "REPOSITION LAB"
    }, {
      property: "og:description",
      content: "Strategic repositioning and recovery intelligence for distressed and underutilized real estate."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./cases_._slug-Bp2U40gx.mjs");
const Route = createFileRoute("/cases_/$slug")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const WhoWeAreRoute = Route$a.update({
  id: "/who-we-are",
  path: "/who-we-are",
  getParentRoute: () => Route$b
});
const SubmitRoute = Route$9.update({
  id: "/submit",
  path: "/submit",
  getParentRoute: () => Route$b
});
const SitemapDotxmlRoute = Route$8.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$b
});
const ServicesRoute = Route$7.update({
  id: "/services",
  path: "/services",
  getParentRoute: () => Route$b
});
const SelectedThinkingRoute = Route$6.update({
  id: "/selected-thinking",
  path: "/selected-thinking",
  getParentRoute: () => Route$b
});
const RecoveryValidationRoute = Route$5.update({
  id: "/recovery-validation",
  path: "/recovery-validation",
  getParentRoute: () => Route$b
});
const ContactRoute = Route$4.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$b
});
const CasesRoute = Route$3.update({
  id: "/cases",
  path: "/cases",
  getParentRoute: () => Route$b
});
const ApproachRoute = Route$2.update({
  id: "/approach",
  path: "/approach",
  getParentRoute: () => Route$b
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$b
});
const CasesSlugRoute = Route.update({
  id: "/cases_/$slug",
  path: "/cases/$slug",
  getParentRoute: () => Route$b
});
const rootRouteChildren = {
  IndexRoute,
  ApproachRoute,
  CasesRoute,
  ContactRoute,
  RecoveryValidationRoute,
  SelectedThinkingRoute,
  ServicesRoute,
  SitemapDotxmlRoute,
  SubmitRoute,
  WhoWeAreRoute,
  CasesSlugRoute
};
const routeTree = Route$b._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route as R,
  cases as c,
  router as r,
  useLanguage as u,
  withoutTerminalDots as w
};
