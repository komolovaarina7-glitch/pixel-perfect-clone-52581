import slivnicaHeroImg from "@/assets/sliv0.jpg";
import slivnicaDetailImg from "@/assets/sliv4.jpg";
import slivnicaInteriorImg from "@/assets/SLIV5.jpg";
import slivnicaSecondDetailImg from "@/assets/SLIV6.jpg";
import slivnicaUpperImg from "@/assets/SLIV7.jpg";
import slivnicaLowerImg from "@/assets/SLIV8.jpg";
import slivnicaAtmosphereImg from "@/assets/SLIV9.jpg";
import industrialImg from "@/assets/case-industrial.jpg";
import kekavaImg from "@/assets/Generated image 1.png";
import kekavaExteriorImg from "@/assets/photo_2026-07-23_19-00-40.jpg";
import kekavaInteriorImg from "@/assets/photo_2026-07-23_19-00-32.jpg";
import kekavaDetailImg from "@/assets/photo_2026-07-23_19-00-36.jpg";
import kekavaUpperImg from "@/assets/photo_2026-07-23_19-01-21.jpg";
import kekavaLowerImg from "@/assets/photo_2026-07-23_19-00-44.jpg";
import kekavaAtmosphereImg from "@/assets/photo_2026-07-23_19-00-49.jpg";
import apartmentsImg from "@/assets/entrance1.jpg";
import apartmentsExteriorImg from "@/assets/ins1.jpg";
import apartmentsInteriorImg from "@/assets/in2.jpg";
import apartmentsDetailImg from "@/assets/in3.jpg";
import apartmentsUpperImg from "@/assets/ins4.jpg";
import apartmentsLowerImg from "@/assets/ins6.jpg";
import apartmentsAtmosphereImg from "@/assets/ins7.jpg";
import turkeyImg from "@/assets/karag.jpg";
import turkeyInteriorImg from "@/assets/karag1.jpg";
import turkeyDetailImg from "@/assets/karag2.jpg";
import turkeyExteriorImg from "@/assets/karag3.jpg";
import turkeyUpperImg from "@/assets/karag5.jpg";
import turkeyLowerImg from "@/assets/karag6.jpg";
import turkeyAtmosphereImg from "@/assets/karag7.jpg";
import type { LocalizedString } from "@/i18n";

export interface CaseSection {
  eyebrow: LocalizedString;
  body: LocalizedString[];
}

export interface CaseAdvantage {
  title: LocalizedString;
  body: LocalizedString;
}

export type GalleryItemType = "exterior" | "interior" | "detail" | "upper" | "lower" | "atmosphere";

export interface GalleryItem {
  src: string;
  alt: string;
  caption?: string;
  type: GalleryItemType;
  span?: "full";
  objectPosition?: string;
}

export interface CaseStudy {
  slug: string;
  title: LocalizedString;
  theme: LocalizedString;
  img: string;
  imgPosition?: string;
  challenge: LocalizedString;
  logic: LocalizedString;
  direction: LocalizedString;
  subtitle?: LocalizedString;
  sections?: CaseSection[];
  advantages?: CaseAdvantage[];
  gallery?: GalleryItem[];
}

export const cases: CaseStudy[] = [
  {
    slug: "slovenia-castle",
    title: { en: "Slovenia Castle", ru: "Замок в Словении" },
    theme: { en: "Heritage Repositioning", ru: "Репозиционирование наследия" },
    img: slivnicaHeroImg,
    challenge: {
      en: "A historic castle trapped between the cost of total restoration and a market with neither an obvious buyer nor a convincing reason to acquire it.",
      ru: "Исторический замок оказался между стоимостью тотальной реставрации и рынком, на котором не было ни очевидного покупателя, ни убедительной причины для приобретения.",
    },
    logic: {
      en: "The project moved from a property-sale thesis to a multi-scenario platform where cinematic production, photography, education, cultural exchange and selective hospitality reinforce one another.",
      ru: "Проект перешёл от логики продажи недвижимости к мультисценарной платформе, где кино- и фотопроизводство, образование, культурный обмен и камерное гостеприимство усиливают друг друга.",
    },
    direction: {
      en: "Preserve the cinematic patina · activate before over-restoring · build an international creative and educational destination.",
      ru: "Сохранить кинематографичную патину · активировать объект без избыточной реставрации · создать международную творческую и образовательную платформу.",
    },
    subtitle: {
      en: "From an unmarketable restoration liability to an international platform whose unfinished character became its strongest asset.",
      ru: "От непродаваемого объекта с тяжёлым реставрационным бюджетом — к международной платформе, где незавершённость стала главным активом.",
    },
    sections: [
      {
        eyebrow: {
          en: "Starting Point — A Castle Without a Market",
          ru: "Отправная точка — замок без рынка",
        },
        body: [
          {
            en: "At the beginning, the asset was read in the most literal way: an old castle that had to be fully restored and then sold. That sequence looked logical on paper, but collapsed under scrutiny. Restoration required substantial capital before the project had a clear audience, operating model or buyer. The local market could not justify the scale of the investment, while an international buyer had no compelling reason to take on the risk.",
            ru: "В начале объект воспринимался буквально: старый замок, который нужно полностью отреставрировать, а затем продать. На бумаге такая последовательность выглядела логично, но не выдерживала проверки. Реставрация требовала значительного капитала ещё до появления понятной аудитории, операционной модели или покупателя. Локальный рынок не мог оправдать такой объём вложений, а у международного покупателя не было убедительной причины принимать на себя этот риск.",
          },
          {
            en: "The problem was therefore larger than the physical condition of the building. The castle was culturally valuable but commercially mute: expensive to recover, difficult to compare, and impossible to explain through the language of conventional residential or hospitality real estate.",
            ru: "Проблема заключалась не только в физическом состоянии здания. Замок обладал культурной ценностью, но коммерчески оставался «немым»: дорогим в восстановлении, сложным для сравнения и практически необъяснимым на языке обычной жилой или гостиничной недвижимости.",
          },
        ],
      },
      {
        eyebrow: {
          en: "First Reframe — From Sale to Use",
          ru: "Первый поворот — от продажи к использованию",
        },
        body: [
          {
            en: "The first strategic shift was to stop asking who might buy the castle and ask who could use it. This changed the object from a static property into infrastructure for activity. Instead of depending on one hypothetical purchaser, the project could address filmmakers, photographers, artists, educators, researchers, cultural institutions and small-format event operators.",
            ru: "Первый стратегический сдвиг состоял в том, чтобы перестать спрашивать, кто может купить замок, и спросить, кто может им пользоваться. Так статичная недвижимость превратилась в инфраструктуру для деятельности. Вместо зависимости от одного гипотетического покупателя проект получил сразу несколько реальных аудиторий: кинематографистов, фотографов, художников, преподавателей, исследователей, культурные институции и операторов камерных событий.",
          },
          {
            en: "Value no longer depended only on a future transaction. It could be produced gradually through access, programming, temporary occupation, partnerships and international visibility.",
            ru: "Ценность перестала зависеть только от будущей сделки: её стало возможно наращивать постепенно — через доступ к объекту, программирование, временное использование, партнёрства и международную видимость.",
          },
        ],
      },
      {
        eyebrow: { en: "Cinematic Platform", ru: "Кинематографическая платформа" },
        body: [
          {
            en: "The castle's worn surfaces, deep shadows, irregular rooms and traces of time were initially treated as evidence of work still to be done. Re-read through the lens of visual production, those same qualities became production value. The building already contained what set designers spend significant budgets trying to recreate: believable age, layered texture and an atmosphere that changes from room to room.",
            ru: "Потёртые поверхности, глубокие тени, нерегулярные помещения и следы времени сначала воспринимались как свидетельства незавершённых работ. Но в оптике визуального производства те же качества превратились в готовую художественную ценность. В здании уже было то, что художники-постановщики создают за значительные бюджеты: убедительный возраст, многослойная фактура и атмосфера, меняющаяся от комнаты к комнате.",
          },
          {
            en: "This opened practical scenarios for feature and period films, fashion editorials, music videos, advertising shoots, portfolio sessions and location-based creative residencies. Each activates the castle without requiring it to imitate a newly finished luxury property.",
            ru: "Отсюда возникли практические сценарии для полнометражного и исторического кино, fashion-съёмок, музыкальных клипов, рекламных кампаний, портфолио-сессий и творческих резиденций. Каждый из них активирует замок, не заставляя его имитировать новодельный люксовый объект.",
          },
        ],
      },
      {
        eyebrow: { en: "Educational and Cultural Layer", ru: "Образовательный и культурный слой" },
        body: [
          {
            en: "The second layer transformed the castle from a rentable backdrop into a place where knowledge is produced. Workshops in filmmaking, photography, restoration, architecture, heritage management and visual storytelling can use the building itself as a living case study. International summer schools, artist residencies, lectures and small conferences create longer stays and a reason for institutions to return.",
            ru: "Второй слой превращает замок из арендуемой декорации в место, где создаётся знание. Воркшопы по кино, фотографии, реставрации, архитектуре, работе с наследием и визуальному сторителлингу могут использовать само здание как живой учебный кейс. Международные летние школы, арт-резиденции, лекции и небольшие конференции формируют более длительное пребывание и дают институциям причину возвращаться.",
          },
          {
            en: "Education also gives the project continuity. A film crew may arrive for several days, while an academic or residency programme can build a seasonal rhythm. Together they create a platform that works across different calendars rather than relying on a single tourism peak.",
            ru: "Образование также даёт проекту непрерывность. Съёмочная группа может приехать на несколько дней, тогда как академическая программа или резиденция формирует сезонный ритм. Вместе эти форматы создают платформу, работающую по разным календарям и не зависящую от единственного туристического пика.",
          },
        ],
      },
      {
        eyebrow: {
          en: "The Critical Insight — Do Not Erase the Asset",
          ru: "Ключевой вывод — не стереть сам актив",
        },
        body: [
          {
            en: "The decisive insight was that total reconstruction could destroy the very quality that made the new scenarios credible. If every wall were perfected, every surface replaced and every irregularity corrected, the castle would become more conventional precisely when the strategy required it to remain singular.",
            ru: "Решающим стал вывод о том, что тотальная реконструкция способна уничтожить именно то качество, которое делает новые сценарии убедительными. Если выровнять каждую стену, заменить каждую поверхность и исправить каждую нерегулярность, замок станет более стандартным именно в тот момент, когда стратегии нужна его исключительность.",
          },
          {
            en: "The approach therefore changed from total restoration to selective stabilization and adaptive activation: secure the structure, provide safety and essential services, improve access and production logistics, but preserve the patina, spatial ambiguity and visible evidence of time. Intervention becomes precise and reversible where possible; authenticity remains visible rather than being polished away.",
            ru: "Поэтому вместо тотальной реставрации был выбран подход выборочной стабилизации и адаптивной активации: обеспечить конструктивную надёжность, безопасность, базовые инженерные системы, доступ и производственную логистику, но сохранить патину, пространственную неоднозначность и видимые следы времени. Вмешательство должно быть точным и по возможности обратимым, а подлинность — оставаться видимой, а не исчезать под новой отделкой.",
          },
        ],
      },
      {
        eyebrow: {
          en: "Final Position — An International Working Castle",
          ru: "Итоговая позиция — международный работающий замок",
        },
        body: [
          {
            en: "The final concept is not a museum frozen in one historical period, not a conventional hotel and not a property waiting passively for a buyer. It is an international working castle: a place for productions, creative residencies, learning, cultural exchange, curated events and selective hospitality.",
            ru: "Итоговая концепция — не музей, застывший в одном историческом периоде, не обычный отель и не недвижимость, пассивно ожидающая покупателя. Это международный работающий замок: место для съёмок, творческих резиденций, обучения, культурного обмена, кураторских событий и камерного гостеприимства.",
          },
          {
            en: "Its repositioning reverses the original equation. What first appeared to be a liability — age, incompleteness and the cost of reconstruction — becomes the source of differentiation. The project no longer needs to erase its past before it can have a future. It creates its future by making that past usable.",
            ru: "Сила репозиционирования в том, что оно разворачивает исходное уравнение. То, что сначала казалось обременением — возраст, незавершённость и стоимость реконструкции, — становится источником отличия. Проекту больше не нужно стирать прошлое, чтобы получить будущее. Он создаёт будущее, делая прошлое пригодным к использованию.",
          },
        ],
      },
    ],
    advantages: [
      {
        title: { en: "Lower capital pressure", ru: "Снижение капитальной нагрузки" },
        body: {
          en: "Selective stabilization replaces speculative total reconstruction and connects investment to real operating needs.",
          ru: "Выборочная стабилизация заменяет спекулятивную тотальную реконструкцию и связывает инвестиции с реальными операционными задачами.",
        },
      },
      {
        title: { en: "Multiple audiences", ru: "Несколько аудиторий" },
        body: {
          en: "Film, photography, education, culture and hospitality create complementary demand instead of dependence on one buyer.",
          ru: "Кино, фотография, образование, культура и гостеприимство создают взаимодополняющий спрос вместо зависимости от одного покупателя.",
        },
      },
      {
        title: {
          en: "Authenticity as production value",
          ru: "Подлинность как производственная ценность",
        },
        body: {
          en: "Age, patina and spatial irregularity become marketable qualities that new construction cannot reproduce.",
          ru: "Возраст, патина и пространственная нерегулярность становятся рыночными качествами, которые невозможно воспроизвести новым строительством.",
        },
      },
      {
        title: { en: "Phased activation", ru: "Поэтапная активация" },
        body: {
          en: "The castle can begin hosting selected uses while improvements continue, generating visibility, partnerships and evidence of demand.",
          ru: "Замок может принимать отдельные форматы параллельно с улучшениями, создавая видимость, партнёрства и подтверждённый спрос.",
        },
      },
    ],
    gallery: [
      {
        src: slivnicaDetailImg,
        alt: "Slivnica Castle architectural view",
        caption: "Architectural view",
        type: "exterior",
        objectPosition: "center center",
      },
      {
        src: slivnicaInteriorImg,
        alt: "Slivnica Castle interior",
        caption: "Castle interior",
        type: "interior",
        objectPosition: "center center",
      },
      {
        src: slivnicaSecondDetailImg,
        alt: "Slivnica Castle architectural detail",
        caption: "Architectural detail",
        type: "detail",
        objectPosition: "center center",
      },
      {
        src: slivnicaUpperImg,
        alt: "Slivnica Castle wide architectural view",
        caption: "Castle architectural view",
        type: "upper",
        objectPosition: "center center",
      },
      {
        src: slivnicaLowerImg,
        alt: "Slivnica Castle lower-level view",
        caption: "Lower-level view",
        type: "lower",
        objectPosition: "center center",
      },
      {
        src: slivnicaAtmosphereImg,
        alt: "Slivnica Castle atmosphere",
        caption: "Castle atmosphere",
        type: "atmosphere",
        objectPosition: "center center",
      },
    ],
  },
  {
    slug: "industrial-heritage-slovenia",
    title: { en: "Industrial Heritage, Slovenia", ru: "Индустриальное наследие, Словения" },
    theme: { en: "Adaptive Reuse", ru: "Адаптивное использование" },
    img: industrialImg,
    challenge: {
      en: "A historic pumpkin oil factory — culturally significant, structurally sound, commercially illegible.",
      ru: "Историческая фабрика тыквенного масла — культурно значимая и конструктивно сохранная, но с неясной коммерческой логикой.",
    },
    logic: {
      en: "Conversion thesis structured around boutique hospitality, creative-industry tenancy and a heritage-aware narrative for qualified operators.",
      ru: "Тезис конверсии, выстроенный вокруг бутик-гостеприимства, арендаторов креативной индустрии и бережной работы с наследием для квалифицированных операторов.",
    },
    direction: {
      en: "Industrial heritage repositioning · boutique hospitality · creative tenancy.",
      ru: "Репозиционирование индустриального наследия · бутик-гостеприимство · креативная аренда.",
    },
  },
  {
    slug: "bauskas-16a-riga",
    title: { en: "Bauskas 16A, Riga", ru: "Bauskas 16A, Рига" },
    theme: { en: "Urban Heritage", ru: "Городское наследие" },
    img: "/images/cases/bauskas-16a/case1.jpg",
    subtitle: {
      en: "Repositioning a historic Riga estate through cinematic identity, adaptive reuse and hospitality logic.",
      ru: "Репозиционирование исторической рижской усадьбы через кинематографичную идентичность, адаптивное использование и логику гостеприимства.",
    },
    challenge: {
      en: "The asset is difficult to interpret through conventional residential or commercial property categories because its heritage character, spatial complexity and possible uses do not align with a standard disposal narrative.",
      ru: "Объект сложно интерпретировать через стандартные категории жилой или коммерческой недвижимости: его исторический характер, пространственная сложность и возможные функции не укладываются в обычную логику продажи.",
    },
    logic: {
      en: "The working thesis prioritises operator-led heritage hospitality and private events, with cinematic identity as a differentiator and accommodation, wellness and production stays as supporting uses. It remains subject to legal, technical, demand and operator validation.",
      ru: "Рабочий тезис отдаёт приоритет историческому hospitality-объекту и частным событиям под управлением оператора; кинематографичная идентичность служит отличием, а размещение, wellness и production-проживание — поддерживающими функциями. Тезис требует юридической, технической, рыночной и операторской проверки.",
    },
    direction: {
      en: "Heritage repositioning · operator-led hospitality · cinematic and cultural platform · multi-scenario spatial ecosystem.",
      ru: "Репозиционирование наследия · операторское гостеприимство · кинематографическая и культурная платформа · пространственная экосистема.",
    },
    sections: [
      {
        eyebrow: { en: "Repositioning Thesis", ru: "Тезис репозиционирования" },
        body: [
          {
            en: "Bauskas 16A is presented not as a conventional real estate asset, but as a repositioning case. The value of the work lies in how the property is re-read: from a fragmented historic estate into a multi-scenario cultural, hospitality and cinematic environment with stronger marketability logic.",
            ru: "Bauskas 16A представлен не как стандартный объект недвижимости, а как кейс репозиционирования. Ценность работы заключается в новом прочтении объекта: от фрагментированной исторической усадьбы к мультисценарной культурной, гостиничной и кинематографичной среде с более сильной рыночной логикой.",
          },
          {
            en: "The concept reframes the building from an unusual and potentially difficult-to-read property into a hybrid heritage asset. Its repositioning logic is based on the combination of historic interiors, atmospheric spatial composition, residential flexibility, wellness and event infrastructure, and potential for curated cultural or hospitality use.",
            ru: "Концепция переосмысляет здание из необычного и потенциально сложного для рынка объекта в гибридный объект наследия. Его логика репозиционирования строится на сочетании исторических интерьеров, атмосферной пространственной композиции, жилой гибкости, wellness- и event-инфраструктуры, а также потенциала для культурного или гостиничного использования.",
          },
        ],
      },
      {
        eyebrow: {
          en: "Spatial Identity as Value Driver",
          ru: "Пространственная идентичность как фактор ценности",
        },
        body: [
          {
            en: "The property contains several distinct spatial layers: representative upper floors, independent residential apartments and a lower hospitality, wellness and event level. REPOSITION LAB's concept does not treat these as disconnected amenities, but as a functional ecosystem.",
            ru: "Объект содержит несколько отдельных пространственных слоёв: репрезентативные верхние этажи, независимые жилые апартаменты и нижний уровень для гостеприимства, wellness и событий. Концепция REPOSITION LAB рассматривает их не как разрозненные удобства, а как функциональную экосистему.",
          },
          {
            en: "The spatial composition allows the asset to support several complementary scenarios: private residence, creative residency, cinematic location, cultural programming, boutique hospitality, private events, wellness experience and curated destination use.",
            ru: "Пространственная композиция позволяет объекту поддерживать несколько взаимодополняющих сценариев: частная резиденция, творческая резиденция, кинематографичная локация, культурная программа, бутик-гостеприимство, частные события, wellness-опыт и кураторское использование как самостоятельного направления.",
          },
        ],
      },
      {
        eyebrow: { en: "Cinematic Upper Environment", ru: "Кинематографичная верхняя среда" },
        body: [
          {
            en: "The second and third floors are interpreted as the emotional and cinematic core of the estate. Library-like rooms, double-height perspectives, salon-style zones, attic architecture, textured interiors and natural light create a setting with strong visual identity.",
            ru: "Второй и третий этажи интерпретируются как эмоциональное и кинематографичное ядро усадьбы. Библиотечные комнаты, двойные высоты, салонные зоны, мансардная архитектура, фактурные интерьеры и естественный свет создают среду с сильной визуальной идентичностью.",
          },
          {
            en: "The upper environment gives the asset a visual identity that becomes part of its repositioning thesis: a historically textured, cinematically credible environment that cannot be replicated through new construction.",
            ru: "Верхняя среда даёт объекту визуальную идентичность, которая становится частью тезиса репозиционирования: исторически фактурная, кинематографически убедительная среда, которую невозможно воспроизвести новым строительством.",
          },
        ],
      },
      {
        eyebrow: { en: "Residential Flexibility", ru: "Жилая гибкость" },
        body: [
          {
            en: "The first floor is reported to contain two independent apartment configurations of approximately 125 square metres each, subject to confirmation. Within the repositioning logic, these spaces can support guest accommodation, creative residencies, private stays, long-term living or accommodation connected to events and productions on the upper floors.",
            ru: "Первый этаж, по предварительным данным, содержит две независимые квартирные конфигурации примерно по 125 квадратных метров каждая, что требует подтверждения. В логике репозиционирования эти пространства могут поддерживать гостевое размещение, творческие резиденции, частное проживание, долгосрочное использование или размещение, связанное с событиями и съёмками на верхних этажах.",
          },
          {
            en: "The estate can combine private, creative and hospitality use without being reduced to a single fixed operating model — an important quality for assets targeting non-standard audiences and non-conventional capital.",
            ru: "Усадьба может сочетать частное, творческое и гостиничное использование, не сводясь к одной фиксированной операционной модели — важное качество для объектов, ориентированных на нестандартные аудитории и нетипичный капитал.",
          },
        ],
      },
      {
        eyebrow: {
          en: "Lower Hospitality and Wellness Layer",
          ru: "Нижний wellness- и event-слой",
        },
        body: [
          {
            en: "The lower level, which may include wellness facilities, a professional kitchen, meeting rooms and event space subject to confirmation, is read within the concept as a supporting experiential layer.",
            ru: "Нижний уровень, который может включать wellness-зоны, профессиональную кухню, переговорные помещения и event-пространство при условии подтверждения, читается в концепции как поддерживающий опытный слой.",
          },
          {
            en: "The logic is to position it as an integrated component of a coherent multi-scenario environment — one that may enhance the estate's overall institutional readability and marketability.",
            ru: "Логика состоит в том, чтобы позиционировать его как интегрированный компонент цельной мультисценарной среды — компонент, который может сделать усадьбу более понятной для институционального и профессионального рынка.",
          },
        ],
      },
      {
        eyebrow: {
          en: "From Low-Liquidity Asset to Repositioned Concept",
          ru: "От низколиквидного объекта к новой рыночной концепции",
        },
        body: [
          {
            en: "The final strategic point is that Bauskas 16A's potential does not lie only in its physical features. Its potential lies in the concept that connects those features into a coherent market-facing story.",
            ru: "Финальная стратегическая мысль в том, что потенциал Bauskas 16A заключается не только в физических характеристиках. Он заключается в концепции, которая соединяет эти характеристики в цельную рыночную историю.",
          },
          {
            en: "Through repositioning, the asset can be presented as a rare Riga heritage environment with cinematic, cultural, hospitality and residential logic. The purpose is not to guarantee liquidity, investor interest or value uplift. The purpose is to create a more defensible and institutionally readable basis for the asset's future positioning.",
            ru: "Через репозиционирование объект может быть представлен как редкая рижская среда наследия с кинематографичной, культурной, гостиничной и жилой логикой. Цель — не гарантировать ликвидность, интерес инвесторов или рост стоимости. Цель — создать более обоснованную и понятную профессиональному рынку основу для будущего позиционирования объекта.",
          },
        ],
      },
    ],
    advantages: [
      {
        title: { en: "Operator-led clarity", ru: "Операторская ясность" },
        body: {
          en: "Transforms a fragmented estate into a coherent hospitality and private events proposition with a targeted operating profile.",
          ru: "Превращает фрагментированную усадьбу в понятное предложение для операторов гостеприимства и частных событий с четким целевым профилем.",
        },
      },
      {
        title: { en: "Spatial ecosystem", ru: "Пространственная экосистема" },
        body: {
          en: "Representative salons, independent accommodation and wellness infrastructure reinforce one another within a unified guest journey.",
          ru: "Репрезентативные залы, независимое жилое размещение и wellness-инфраструктура взаимно усиливают друг друга в рамках единого сценария.",
        },
      },
      {
        title: {
          en: "Authenticity as production value",
          ru: "Ценность подлинной атмосферы",
        },
        body: {
          en: "Historic patina, library rooms and attic architecture provide genuine cinematic character without speculative full-scale rebuild costs.",
          ru: "Историческая патина, библиотечные комнаты и мансардная архитектура дают выразительный характер для съемок и резиденций без затрат на новодельную перестройку.",
        },
      },
      {
        title: { en: "Phased market activation", ru: "Поэтапная активация" },
        body: {
          en: "Allows the asset to generate demand, visibility and partnerships across productions and residencies before extensive conversion.",
          ru: "Позволяет запускать съемки, резиденции и камерные события параллельно с подготовкой основной концепции, формируя доказательную базу спроса.",
        },
      },
    ],
    gallery: [
      {
        src: "/images/cases/bauskas-16a/bau1.jpg",
        alt: "Bauskas 16A exterior architectural view",
        caption: "Exterior architectural identity",
        type: "exterior",
        span: "full",
      },
      {
        src: "/images/cases/bauskas-16a/images12.jpg",
        alt: "Bauskas 16A interior atmosphere",
        caption: "Interior atmosphere",
        type: "interior",
      },
      {
        src: "/images/cases/bauskas-16a/images123.jpg",
        alt: "Bauskas 16A architectural detail",
        caption: "Architectural detail",
        type: "detail",
      },
      {
        src: "/images/cases/bauskas-16a/baus2.jpg",
        alt: "Bauskas 16A upper representative interior space",
        type: "upper",
        span: "full",
      },
      {
        src: "/images/cases/bauskas-16a/baus4.jpg",
        alt: "Bauskas 16A residential floor interior",
        type: "lower",
        objectPosition: "center 70%",
      },
      {
        src: "/images/cases/bauskas-16a/baus5.jpg",
        alt: "Bauskas 16A lower level hospitality and wellness space",
        type: "atmosphere",
      },
    ],
  },
  {
    slug: "distressed-prime-apartments",
    title: { en: "Two Apartments — One Address", ru: "Две квартиры — один адрес" },
    theme: { en: "Private Residence Repositioning", ru: "Репозиционирование частной резиденции" },
    img: apartmentsImg,
    subtitle: {
      en: "Re-reading two former communal apartments as one rare multi-level private residence in a prime urban location.",
      ru: "Переосмысление двух бывших коммунальных квартир как единой редкой многоуровневой резиденции в престижной городской локации.",
    },
    challenge: {
      en: "Two former communal apartments at one address were read by the market as separate distressed properties, despite their shared entrance, connecting staircase and prime location.",
      ru: "Две бывшие коммунальные квартиры по одному адресу воспринимались рынком как отдельные проблемные объекты, несмотря на общий подъезд, связывающую их лестницу и престижную локацию.",
    },
    logic: {
      en: "The two properties were repositioned as one vertically organised private residence, with public and private life distributed across separate but connected levels.",
      ru: "Два объекта были перепозиционированы как единая вертикально организованная частная резиденция, где общественные и приватные функции распределены между отдельными, но связанными уровнями.",
    },
    direction: {
      en: "Category shift · one prestigious address · vertical privacy · discreet access to qualified private buyers.",
      ru: "Смена категории · единый престижный адрес · вертикальная приватность · конфиденциальный доступ к квалифицированным частным покупателям.",
    },
    sections: [
      {
        eyebrow: { en: "Two Apartments — One Address", ru: "Две квартиры — один адрес" },
        body: [
          {
            en: "The original asset consisted of two former communal apartments located within the same entrance and connected by a common staircase. Sold separately, the market would have read them in familiar terms: two large apartments, each constrained by its condition, layout and historic use.",
            ru: "Исходный объект состоял из двух бывших коммунальных квартир, расположенных в одном подъезде и связанных общей лестницей. При раздельной продаже рынок воспринимал бы их привычно: как две большие квартиры, каждая из которых ограничена своим состоянием, планировкой и историей использования.",
          },
          {
            en: "Read together, they represented something materially rarer: the foundation for a private multi-level residence at a single address in a prime urban location.",
            ru: "Вместе они представляли значительно более редкую возможность: основу для частной многоуровневой резиденции по одному адресу в престижной городской локации.",
          },
        ],
      },
      {
        eyebrow: { en: "Before Repositioning", ru: "До перепозиционирования" },
        body: [
          {
            en: "The principal constraint was not the building itself, nor even the apartments' communal past. It was the way the asset was read. Each unit was judged separately through its floor area, physical condition, existing plan and the prevailing price per square metre in the district.",
            ru: "Главным ограничением было не само здание и даже не коммунальное прошлое квартир. Проблемой было то, как объект воспринимался рынком. Каждая квартира оценивалась отдельно — через площадь, физическое состояние, существующую планировку и среднюю стоимость квадратного метра в районе.",
          },
          {
            en: "That approach overlooked the most important asset: the ability to organise both properties as one coherent vertical home. The location already carried value, but the existing category prevented the market from recognising its full potential.",
            ru: "Такой подход не учитывал главный актив — возможность организовать обе квартиры как единый вертикальный дом. Локация уже создавала ценность, но существующая категория объекта не позволяла рынку увидеть его полный потенциал.",
          },
        ],
      },
      {
        eyebrow: { en: "The Hidden Opportunity", ru: "Скрытая возможность" },
        body: [
          {
            en: "The shared entrance and connecting staircase made it possible to create more than an enlarged apartment. They enabled a genuine multi-level residence in which each floor could carry a distinct role while remaining part of one private address.",
            ru: "Общий подъезд и связывающая лестница позволили создать не просто увеличенную квартиру, а полноценную многоуровневую резиденцию, в которой каждый этаж получает собственную функцию, оставаясь частью единого частного адреса.",
          },
          {
            en: "One level can accommodate reception rooms, dining, kitchen and entertaining. Another can be reserved for bedrooms, dressing rooms, a study and family life. Additional rooms may support guests, children or staff without compromising the owners' privacy.",
            ru: "Один уровень может быть отведён под гостиную, столовую, кухню и приём гостей. Другой — под спальни, гардеробные, кабинет и семейную жизнь. Дополнительные помещения могут использоваться для гостей, детей или персонала, не нарушая приватность владельцев.",
          },
        ],
      },
      {
        eyebrow: { en: "After Repositioning", ru: "После перепозиционирования" },
        body: [
          {
            en: "The former communal apartments are no longer presented as two compromised properties. They become one rare urban residence offering scale, functional separation and a degree of privacy usually associated with a private house.",
            ru: "Бывшие коммунальные квартиры больше не представлены как два сложных объекта. Они становятся единой редкой городской резиденцией, предлагающей масштаб, функциональное разделение и уровень приватности, обычно связанный с частным домом.",
          },
          {
            en: "The residence can support a large family, several generations, visiting guests or live-in staff. Its levels may operate as one continuous home while retaining enough autonomy to accommodate different patterns of daily life.",
            ru: "Резиденция может поддерживать сценарии жизни большой семьи, нескольких поколений, приезжающих гостей или персонала. Её уровни работают как единый дом, сохраняя достаточную автономность для разных ритмов повседневной жизни.",
          },
        ],
      },
      {
        eyebrow: {
          en: "Renovation Improved the Space — Repositioning Changed Its Value",
          ru: "Реконструкция улучшила пространство — репозиционирование изменило его ценность",
        },
        body: [
          {
            en: "The value uplift is not explained by finish quality alone. The decisive move is a category shift: from two former communal apartments into one differentiated premium residence that is difficult to compare with standard stock and difficult to reproduce in an established prime district.",
            ru: "Рост ценности объясняется не только качеством реконструкции. Решающим шагом стала смена категории: две бывшие коммунальные квартиры превратились в дифференцированную премиальную резиденцию, которую сложно сравнивать со стандартным предложением и практически невозможно воспроизвести в сформированном престижном районе.",
          },
          {
            en: "If sold separately, each apartment remains anchored to local comparables. Presented as one residence, the buyer is assessing a scarce configuration: substantial scale, vertical privacy and a single prestigious address. That scarcity can support a stronger perceived value than the simple sum of two conventional units.",
            ru: "При раздельной продаже каждая квартира остаётся привязана к локальным аналогам. В формате единой резиденции покупатель оценивает редкую конфигурацию: значительный масштаб, вертикальную приватность и единый престижный адрес. Эта редкость может поддерживать более высокую воспринимаемую ценность, чем простая сумма двух стандартных квартир.",
          },
        ],
      },
      {
        eyebrow: { en: "Not a Mass-Market Proposition", ru: "Не для массового рынка" },
        body: [
          {
            en: "An asset of this kind does not require broad public exposure. Its premium character can be reinforced through discreet, targeted presentation to qualified private buyers whose requirements include scale, privacy, family flexibility and a central location.",
            ru: "Такой объект не требует широкой публичной рекламы. Его премиальный характер может быть усилен конфиденциальной адресной подачей квалифицированным частным покупателям, для которых важны масштаб, приватность, семейная гибкость и центральная локация.",
          },
          {
            en: "The mass market prices square metres. The right private buyer recognises an opportunity that cannot easily be recreated.",
            ru: "Массовый рынок оценивает квадратные метры. Подходящий частный покупатель видит возможность, которую невозможно легко повторить.",
          },
        ],
      },
    ],
    advantages: [
      {
        title: { en: "Category shift", ru: "Смена категории" },
        body: {
          en: "Two separate apartments are re-read as one rare multi-level private residence.",
          ru: "Две отдельные квартиры переосмыслены как единая редкая многоуровневая резиденция.",
        },
      },
      {
        title: { en: "One prestigious address", ru: "Единый престижный адрес" },
        body: {
          en: "Both levels form one coherent private holding rather than two unrelated units.",
          ru: "Оба уровня образуют единое частное владение, а не два несвязанных объекта.",
        },
      },
      {
        title: { en: "Vertical privacy", ru: "Вертикальная приватность" },
        body: {
          en: "Reception, family, guest and staff functions can be separated across connected floors.",
          ru: "Общественные, семейные, гостевые и служебные функции можно разделить между связанными этажами.",
        },
      },
      {
        title: { en: "Rare urban scale", ru: "Редкий городской масштаб" },
        body: {
          en: "The residence delivers substantial space without sacrificing an established prime location.",
          ru: "Резиденция предлагает значительную площадь без отказа от сформированной престижной локации.",
        },
      },
      {
        title: { en: "Flexible living", ru: "Гибкие сценарии жизни" },
        body: {
          en: "The configuration can support a large family, several generations, guests or live-in staff.",
          ru: "Конфигурация подходит для большой семьи, нескольких поколений, гостей или проживания с персоналом.",
        },
      },
      {
        title: { en: "Scarcity premium", ru: "Премия за редкость" },
        body: {
          en: "A comparable residence is difficult to assemble or reproduce within a mature central district.",
          ru: "Сопоставимую резиденцию сложно собрать или воспроизвести в сформированном центральном районе.",
        },
      },
    ],
    gallery: [
      {
        src: apartmentsExteriorImg,
        alt: "Two Apartments — One Address entrance",
        type: "exterior",
        span: "full",
      },
      {
        src: apartmentsInteriorImg,
        alt: "Two Apartments — One Address interior atmosphere",
        type: "interior",
      },
      {
        src: apartmentsDetailImg,
        alt: "Two Apartments — One Address architectural detail",
        type: "detail",
      },
      {
        src: apartmentsUpperImg,
        alt: "Two Apartments — One Address upper representative space",
        type: "upper",
        span: "full",
      },
      {
        src: apartmentsLowerImg,
        alt: "Two Apartments — One Address residential floor interior",
        type: "lower",
      },
      {
        src: apartmentsAtmosphereImg,
        alt: "Two Apartments — One Address lower level atmosphere",
        type: "atmosphere",
      },
    ],
  },
  {
    slug: "turkey-lifestyle-repositioning",
    title: {
      en: "Two-Level Lifestyle Residence, Fethiye",
      ru: "Двухуровневая резиденция в Фетхие",
    },
    theme: { en: "Asset Category Shift", ru: "СМЕНА КАТЕГОРИИ АКТИВА" },
    img: turkeyImg,
    imgPosition: "center 72%",
    challenge: {
      en: "Two separate apartments carried uneven market logic: one lower unit was constrained by light, outlook and spatial limitations, while the upper unit was stronger but still conventional within the local market.",
      ru: "Две отдельные квартиры имели разную рыночную логику: нижний блок был ограничен светом, видом и пространственной конфигурацией, а верхний был сильнее, но всё ещё оставался обычным объектом для локального рынка.",
    },
    logic: {
      en: "The two units were connected vertically and re-read as one integrated two-level lifestyle residence, combining internal scale, dual terraces, direct pool access, guest/studio flexibility and a panoramic upper living layer.",
      ru: "Два блока были соединены вертикально и переосмыслены как единая двухуровневая резиденция, объединяющая внутренний масштаб, две террасы, прямой доступ к бассейну, гостевую или студийную логику и панорамный верхний жилой уровень.",
    },
    direction: {
      en: "Category shift · dual-terrace lifestyle logic · pool access · panoramic Fethiye Bay views · villa-like privacy within apartment infrastructure.",
      ru: "Смена категории · логика двухтеррасной резиденции · доступ к бассейну · панорамные виды на залив Фетхие · уединение уровня виллы внутри инфраструктуры апартаментов.",
    },
    subtitle: {
      en: "Spatial restructuring and category shift for a two-level lifestyle residence in Fethiye, Turkey.",
      ru: "Пространственная реструктуризация и смена категории для двухуровневой резиденции в Фетхие, Турция.",
    },
    sections: [
      {
        eyebrow: { en: "Original Configuration", ru: "Исходная конфигурация" },
        body: [
          {
            en: "Turkey Lifestyle Repositioning demonstrates how spatial restructuring can change the market logic of an asset. The original configuration consisted of two separate apartments with very different levels of appeal. The lower apartment had a terrace of approximately 25-30 square meters with views toward the pool and forest, but the interior was recessed into the building, with limited natural light and restricted outlook from most rooms.",
            ru: "Кейс в Фетхие показывает, как пространственная реструктуризация может изменить рыночную логику объекта. Исходная конфигурация состояла из двух отдельных апартаментов с разным уровнем привлекательности. Нижний апартамент имел террасу примерно 25-30 квадратных метров с видом к бассейну и лесу, но интерьер был заглублён в здание, с ограниченным естественным светом и слабым видом из большинства помещений.",
          },
          {
            en: "The upper apartment was stronger as a standalone property. It included three bedrooms, a large terrace of approximately 140 square meters and a significant sea-view orientation. However, within the local market, it remained a familiar type: a good apartment with a large terrace and view, but not a truly singular asset.",
            ru: "Верхний апартамент был сильнее как самостоятельный объект. Он включал три спальни, большую террасу примерно 140 квадратных метров и выраженную ориентацию на морской вид. Однако в локальном рынке он оставался знакомым типом: хороший апартамент с большой террасой и видом, но не по-настоящему уникальный объект.",
          },
        ],
      },
      {
        eyebrow: { en: "Repositioning Concept", ru: "Концепция репозиционирования" },
        body: [
          {
            en: "The repositioning concept connected the two apartments vertically through an internal staircase and transformed them into one integrated two-level residence. This created approximately 210 square meters of internal space and approximately 170 square meters of combined terraces, with two distinct outdoor identities.",
            ru: "Концепция репозиционирования вертикально соединила два апартамента внутренней лестницей и преобразовала их в единую двухуровневую резиденцию. Это создало примерно 210 квадратных метров внутреннего пространства и около 170 квадратных метров совмещённых террас с двумя разными сценариями использования на открытом воздухе.",
          },
          {
            en: "The lower level was reprogrammed as a flexible private suite with direct access from the residence to the pool area.",
            ru: "Нижний уровень был переосмыслен как гибкий приватный блок с прямым доступом из резиденции к зоне бассейна.",
          },
        ],
      },
      {
        eyebrow: { en: "Lower Guest and Studio Layer", ru: "Нижний гостевой и студийный уровень" },
        body: [
          {
            en: "The more constrained rear part of the lower unit was reinterpreted as a guest room with a full bathroom and additional wardrobe function. This converted a spatial disadvantage into a supporting private-use zone.",
            ru: "Более ограниченная задняя часть нижнего блока была переосмыслена как гостевая комната с полноценной ванной и дополнительной гардеробной функцией. Так пространственный недостаток был превращён в поддерживающую приватную зону.",
          },
        ],
      },
      {
        eyebrow: {
          en: "Upper Panoramic Residential Layer",
          ru: "Верхний панорамный жилой уровень",
        },
        body: [
          {
            en: "The upper level became the main panoramic residential layer. Two bedrooms were combined into one larger primary suite of approximately 25 square meters, while an adjoining room became a dressing and vanity area.",
            ru: "Верхний уровень стал главным панорамным жилым слоем. Две спальни были объединены в более крупный основной блок примерно 25 квадратных метров, а смежная комната стала гардеробной и зоной ухода.",
          },
          {
            en: "The upper terrace is the core value driver of the repositioned asset: approximately 140 square meters of outdoor space, including a covered zone, with views across Fethiye Bay, the marina, the nearby island, the sea and the mountain range.",
            ru: "Верхняя терраса — ключевой фактор ценности перепозиционированного объекта: примерно 140 квадратных метров открытого пространства, включая крытую зону, с видами на залив Фетхие, марину, близлежащий остров, море и горный хребет.",
          },
        ],
      },
      {
        eyebrow: { en: "Category Shift", ru: "Смена категории" },
        body: [
          {
            en: "The value of the repositioning was not created only by combining square meters. It was created by changing the asset category. Before repositioning, the units could be read as two separate apartments: one constrained and one conventional. After repositioning, the property could be read as a rare two-level lifestyle residence.",
            ru: "Ценность перепозиционирования была создана не только объединением квадратных метров. Она была создана сменой категории объекта. До репозиционирования блоки воспринимались как два отдельных апартамента: один ограниченный, другой стандартно сильный. После репозиционирования объект воспринимается как редкая двухуровневая резиденция.",
          },
          {
            en: "The repositioned asset may support a materially stronger market perception because the buyer is no longer comparing it only to standard apartments in the area, but to a differentiated lifestyle residence that is difficult to replicate in Fethiye.",
            ru: "Перепозиционированный объект может поддерживать существенно более сильное рыночное восприятие, потому что покупатель сравнивает его уже не только со стандартными апартаментами района, а с дифференцированной резиденцией, которую сложно воспроизвести в Фетхие.",
          },
        ],
      },
    ],
    gallery: [
      {
        src: turkeyExteriorImg,
        alt: "Fethiye residence panoramic terrace",
        caption: "Panoramic terrace and bay view",
        type: "exterior",
        objectPosition: "center 68%",
      },
      {
        src: turkeyInteriorImg,
        alt: "Fethiye residence interior atmosphere",
        caption: "Interior atmosphere",
        type: "interior",
        objectPosition: "center center",
      },
      {
        src: turkeyDetailImg,
        alt: "Fethiye residence architectural detail",
        caption: "Architectural detail",
        type: "detail",
        objectPosition: "center center",
      },
      {
        src: turkeyUpperImg,
        alt: "Fethiye two-level residence and terrace",
        caption: "Two-level residence and terrace",
        type: "upper",
        objectPosition: "center 68%",
      },
      {
        src: turkeyLowerImg,
        alt: "Fethiye residence lower-level dining area",
        caption: "Lower-level dining area",
        type: "lower",
        objectPosition: "center 68%",
      },
      {
        src: turkeyAtmosphereImg,
        alt: "Fethiye residence dining room atmosphere",
        caption: "Dining room atmosphere",
        type: "atmosphere",
        objectPosition: "center 68%",
      },
    ],
    advantages: [
      {
        title: { en: "Category shift", ru: "Смена категории" },
        body: {
          en: "From two apartments into one rare two-level lifestyle residence.",
          ru: "От двух апартаментов к редкой двухуровневой резиденции.",
        },
      },
      {
        title: { en: "Value integration", ru: "Интеграция стоимости" },
        body: {
          en: "The weaker lower apartment stopped being a liability and became a functional private suite with pool access.",
          ru: "Более слабый нижний апартамент перестал быть ограничением и стал функциональным приватным блоком с доступом к бассейну.",
        },
      },
      {
        title: { en: "Outdoor value expansion", ru: "Расширение ценности террас" },
        body: {
          en: "Two terraces were given separate identities: one pool-connected and one panoramic sea-view.",
          ru: "Две террасы получили разные идентичности: одна связана с бассейном, другая — с панорамным видом на море.",
        },
      },
      {
        title: { en: "Spatial differentiation", ru: "Пространственная дифференциация" },
        body: {
          en: "The residence gained lower guest/studio logic, upper primary-suite logic, open-plan living and multiple outdoor experiences.",
          ru: "Резиденция получила нижнюю гостевую и студийную логику, верхнюю логику основного жилого блока, открытую планировку гостиной и несколько сценариев жизни на террасах.",
        },
      },
      {
        title: { en: "Market uniqueness", ru: "Рыночная уникальность" },
        body: {
          en: "The final configuration combines apartment convenience, villa-like privacy, direct pool access and panoramic Fethiye Bay views.",
          ru: "Финальная конфигурация объединяет удобство апартаментов, приватность уровня виллы, прямой доступ к бассейну и панорамные виды на залив Фетхие.",
        },
      },
      {
        title: { en: "Stronger resale narrative", ru: "Более сильная история для перепродажи" },
        body: {
          en: "The property can be presented as one singular lifestyle asset rather than two separate units.",
          ru: "Объект может быть представлен как единая lifestyle-резиденция, а не как два отдельных блока.",
        },
      },
      {
        title: { en: "Higher perceived value", ru: "Более высокая воспринимаемая стоимость" },
        body: {
          en: "The repositioning may support stronger market perception than the two apartments sold separately.",
          ru: "Репозиционирование может поддержать более сильное рыночное восприятие, чем продажа двух апартаментов по отдельности.",
        },
      },
    ],
  },
  {
    slug: "kekava-production-campus",
    title: { en: "Ķekava Production Campus", ru: "Производственный кампус Ķekava" },
    theme: {
      en: "Industrial Asset Repositioning",
      ru: "Репозиционирование индустриального актива",
    },
    img: kekavaImg,
    subtitle: {
      en: "From a former factory competing as secondary industrial space to a flexible production, studio and event infrastructure.",
      ru: "От бывшей фабрики, конкурирующей в категории вторичной индустриальной недвижимости, — к гибкой производственной, студийной и событийной инфраструктуре.",
    },
    challenge: {
      en: "The former factory had substantial buildings, engineering capacity and an extensive yard, but the market could read it only as ageing warehouse and production space.",
      ru: "Бывшая фабрика обладала крупными корпусами, инженерным ресурсом и большой территорией, но рынок воспринимал её лишь как устаревающие складские и производственные площади.",
    },
    logic: {
      en: "Repositioning keeps the industrial character but changes the product: the buildings and yard become a multi-scenario campus for production, workshops, filming, fabrication, storage and temporary events.",
      ru: "Репозиционирование сохраняет индустриальную природу объекта, но меняет сам продукт: корпуса и территория становятся многосценарным кампусом для производства, мастерских, съёмок, изготовления декораций, хранения и временных событий.",
    },
    direction: {
      en: "Legacy industrial · production campus · project-based occupation · diversified income.",
      ru: "Индустриальное наследие · производственный кампус · проектное использование · диверсифицированный доход.",
    },
    gallery: [
      {
        src: kekavaExteriorImg,
        alt: "Ķekava industrial campus exterior",
        type: "exterior",
        span: "full",
        objectPosition: "center center",
      },
      {
        src: kekavaInteriorImg,
        alt: "Ķekava industrial campus interior",
        type: "interior",
        objectPosition: "center center",
      },
      {
        src: kekavaDetailImg,
        alt: "Ķekava industrial campus architectural detail",
        type: "detail",
        objectPosition: "center top",
      },
      {
        src: kekavaUpperImg,
        alt: "Ķekava industrial campus production space",
        type: "upper",
        span: "full",
        objectPosition: "center center",
      },
      {
        src: kekavaLowerImg,
        alt: "Ķekava industrial campus working environment",
        type: "lower",
        objectPosition: "center center",
      },
      {
        src: kekavaAtmosphereImg,
        alt: "Ķekava industrial campus atmosphere",
        type: "atmosphere",
        objectPosition: "center center",
      },
    ],
    sections: [
      {
        eyebrow: {
          en: "Starting Point — An Asset Defined by Its Past",
          ru: "Исходная точка — объект, определённый своим прошлым",
        },
        body: [
          {
            en: "The property entered the market as a former factory: useful in scale, but difficult to distinguish from other secondary industrial stock. Its value was reduced to condition, access and a conventional price per square metre.",
            ru: "Объект вышел на рынок как бывшая фабрика: масштабная и функционально пригодная, но почти неотличимая от другой вторичной индустриальной недвижимости. Её ценность сводилась к состоянию, доступу и стандартной цене квадратного метра.",
          },
        ],
      },
      {
        eyebrow: {
          en: "The Reframe — From Space to Infrastructure",
          ru: "Переоценка — от площади к инфраструктуре",
        },
        body: [
          {
            en: "The key shift was to stop treating the site as one undifferentiated volume. Large shells, service areas, loading access, power and open ground were re-read as a system capable of supporting different users and different occupation periods.",
            ru: "Ключевым изменением стал отказ от восприятия площадки как одного недифференцированного объёма. Большие корпуса, вспомогательные зоны, погрузочный доступ, инженерные мощности и открытая территория были переосмыслены как единая система для разных пользователей и сроков размещения.",
          },
        ],
      },
      {
        eyebrow: {
          en: "A Multi-Scenario Production Model",
          ru: "Многосценарная производственная модель",
        },
        body: [
          {
            en: "Longer workshop and storage leases create a stable base, while filming, installations, fabrication and events activate the property project by project. The yard becomes part of the commercial product rather than unused space around the buildings.",
            ru: "Долгосрочная аренда мастерских и складов формирует стабильную основу, а съёмки, инсталляции, изготовление конструкций и события активируют объект проект за проектом. Территория становится частью коммерческого продукта, а не неиспользуемым пространством вокруг корпусов.",
          },
        ],
      },
      {
        eyebrow: {
          en: "The New Investment Identity",
          ru: "Новая инвестиционная идентичность",
        },
        body: [
          {
            en: "After repositioning, the asset is no longer judged only against modern warehouses it cannot imitate. It is understood as specialised production infrastructure whose value comes from flexibility, intensity of use and several complementary income streams.",
            ru: "После репозиционирования объект больше не оценивается только в сравнении с современными складами, которым он не должен подражать. Он становится специализированной производственной инфраструктурой, ценность которой создают гибкость, интенсивность использования и несколько взаимодополняющих источников дохода.",
          },
        ],
      },
    ],
    advantages: [
      {
        title: { en: "Category shift", ru: "Смена категории" },
        body: {
          en: "From secondary industrial property to a specialised production campus.",
          ru: "От вторичной индустриальной недвижимости — к специализированному производственному кампусу.",
        },
      },
      {
        title: { en: "Multiple use cycles", ru: "Несколько циклов использования" },
        body: {
          en: "Long-term tenants and short project occupations can work alongside one another.",
          ru: "Долгосрочные арендаторы и краткосрочные проектные пользователи могут работать параллельно.",
        },
      },
      {
        title: { en: "The yard becomes productive", ru: "Территория начинает работать" },
        body: {
          en: "Open ground supports logistics, staging, outdoor production and temporary formats.",
          ru: "Открытая площадка поддерживает логистику, монтаж, наружное производство и временные форматы.",
        },
      },
      {
        title: { en: "Stronger income logic", ru: "Более сильная доходная модель" },
        body: {
          en: "Rent, project use and supporting services create a more resilient commercial structure.",
          ru: "Аренда, проектное использование и сопутствующие сервисы формируют более устойчивую коммерческую структуру.",
        },
      },
    ],
  },
  {
    slug: "flotes-8-community-infrastructure",
    title: { en: "Flotes 8, Riga", ru: "Flotes 8, Рига" },
    theme: {
      en: "Social Infrastructure Repositioning",
      ru: "Репозиционирование социальной инфраструктуры",
    },
    img: "/Generated image 2.png",
    subtitle: {
      en: "From a fragmented mixed-use property to a coherent community-services asset whose stable public and educational anchors create a credible basis for revaluation.",
      ru: "От фрагментированного mixed-use объекта — к цельному активу общественных сервисов, где устойчивые публичные и образовательные якоря создают убедительное основание для переоценки.",
    },
    challenge: {
      en: "The building already generated activity and income, but its apartments, offices, education, everyday services and auxiliary spaces formed a tenant mix without a clear hierarchy or investment identity.",
      ru: "Здание уже создавало активность и доход, однако квартиры, офисы, образовательные, бытовые и вспомогательные функции образовывали набор арендаторов без ясной иерархии и инвестиционной идентичности.",
    },
    logic: {
      en: "The repositioning identifies education, health and public-facing services as anchors, then curates supporting uses around them. This changes the valuation logic: income is no longer read as a collection of unrelated leases, but as cash flow generated by a coherent, locally relevant and harder-to-replace community-services asset.",
      ru: "Репозиционирование выделяет образование, здоровье и публичные сервисы в качестве якорей, а затем формирует вокруг них поддерживающие функции. Это меняет логику оценки: доход воспринимается уже не как сумма разрозненных договоров аренды, а как денежный поток цельного, востребованного районом и труднозаменимого объекта общественных сервисов.",
    },
    direction: {
      en: "Anchor-led tenancy · education and public services · community relevance · durable income.",
      ru: "Якорные арендаторы · образование и публичные сервисы · районная значимость · устойчивый доход.",
    },
    gallery: [
      {
        src: "/Generated image 4.png",
        alt: "Flotes 8 historic entrance exterior",
        type: "exterior",
        span: "full",
        objectPosition: "center center",
      },
      {
        src: "/Generated image 3.png",
        alt: "Flotes 8 courtyard and community-services building",
        type: "interior",
        objectPosition: "center center",
      },
      {
        src: "/Generated image 6.png",
        alt: "Flotes 8 neighbourhood café frontage",
        type: "detail",
        objectPosition: "center center",
      },
      {
        src: "/Generated image 10.png",
        alt: "Flotes 8 landscaped community grounds",
        type: "upper",
        span: "full",
        objectPosition: "center center",
      },
      {
        src: "/Generated image 12.png",
        alt: "Flotes 8 community-services entrance",
        type: "lower",
        objectPosition: "center center",
      },
      {
        src: "/Generated image 13.png",
        alt: "Flotes 8 neighbourhood atmosphere",
        type: "atmosphere",
        objectPosition: "center center",
      },
    ],
    sections: [
      {
        eyebrow: {
          en: "Starting Point — Mixed Use Without a Centre",
          ru: "Исходная точка — mixed-use без смыслового центра",
        },
        body: [
          {
            en: "Flotes 8 was not an empty or obsolete building. It already contained residential, office, educational and everyday-service functions. The weakness was not a lack of use, but the absence of a clear relationship between those uses.",
            ru: "Flotes 8 не был пустующим или утратившим функцию зданием. В нём уже сосуществовали жильё, офисы, образование и повседневные сервисы. Слабостью было не отсутствие использования, а отсутствие понятной связи между этими функциями.",
          },
        ],
      },
      {
        eyebrow: {
          en: "The Existing Strength — Public-Service Activity",
          ru: "Существующая сила — публично-сервисная функция",
        },
        body: [
          {
            en: "Educational and public-service activity already gave the address a role in the neighbourhood. Instead of treating it as one more line in the rent roll, the strategy makes this embedded social use the foundation of the asset's identity.",
            ru: "Образовательная и публично-сервисная деятельность уже придавала адресу реальную роль в районе. Вместо того чтобы считать её ещё одной строкой в арендной ведомости, стратегия превращает существующую социальную функцию в основу идентичности объекта.",
          },
        ],
      },
      {
        eyebrow: {
          en: "Tenant Curation — Anchors and Supporting Uses",
          ru: "Кураторский подбор арендаторов — якоря и поддерживающие функции",
        },
        body: [
          {
            en: "Education, health, youth and community operators become the anchors. Café, wellbeing, counselling and other convenience services remain valuable when they support the daily life of the hub rather than compete to define it.",
            ru: "Образовательные, медицинские, молодёжные и общественные операторы становятся якорями. Кафе, wellbeing-сервисы, консультационные и другие повседневные функции сохраняют ценность, когда поддерживают жизнь центра, а не конкурируют за определение его характера.",
          },
        ],
      },
      {
        eyebrow: {
          en: "Revaluation Logic — From Rent Roll to Durable Cash Flow",
          ru: "Логика переоценки — от арендной ведомости к устойчивому денежному потоку",
        },
        body: [
          {
            en: "Before repositioning, the asset is likely to be valued as a heterogeneous rent roll: every unit carries its own reletting risk, the tenant mix offers little strategic protection, and current occupancy does not automatically prove durable demand. This uncertainty limits the confidence that an investor can place in future NOI.",
            ru: "До репозиционирования объект, скорее всего, оценивается как неоднородная арендная ведомость: каждое помещение несёт отдельный риск повторной сдачи, состав арендаторов не создаёт стратегической защиты, а текущая заполняемость ещё не доказывает устойчивость спроса. Такая неопределённость ограничивает уверенность инвестора в будущем NOI.",
          },
          {
            en: "A clear social-infrastructure profile makes the same income more legible. Anchor operators generate regular footfall and longer occupation, supporting services benefit from that demand, and the building acquires a role that cannot be replicated simply by offering another generic office or apartment nearby.",
            ru: "Чёткий профиль социальной инфраструктуры делает тот же доход более понятным и качественным. Якорные операторы создают регулярный поток посетителей и склонны занимать помещения дольше, поддерживающие сервисы получают спрос от их аудитории, а здание приобретает роль, которую нельзя воспроизвести простым предложением ещё одного офиса или квартиры поблизости.",
          },
          {
            en: "The revaluation case therefore rests on a change in income quality rather than an assumed increase in rent alone. Lower expected vacancy, reduced tenant turnover, longer operating relationships and a clearer leasing proposition can improve the market's view of risk. If these effects are evidenced in leases and operating performance, they can support more stable NOI and a stronger valuation yield.",
            ru: "Поэтому основание для переоценки возникает не только из предполагаемого роста ставки аренды, а прежде всего из изменения качества дохода. Снижение ожидаемой вакантности, меньшая ротация арендаторов, более длинные операционные отношения и понятное предложение для новых пользователей способны улучшить восприятие риска рынком. Если эти эффекты подтверждены договорами и операционными показателями, они поддерживают более устойчивый NOI и более сильную ставку капитализации.",
          },
        ],
      },
      {
        eyebrow: {
          en: "Evidence Required for Revaluation",
          ru: "Что должно подтвердить переоценку",
        },
        body: [
          {
            en: "The new narrative should be verified through measurable evidence: lease duration and break options, renewal rates, arrears, occupancy by anchor and supporting uses, tenant acquisition costs, downtime between leases, operating costs and the stability of net income. The stronger these indicators become, the less the valuation depends on a conceptual story alone.",
            ru: "Новый инвестиционный нарратив необходимо подтвердить измеримыми данными: сроками аренды и условиями выхода, долей продлений, задолженностью, заполняемостью якорных и поддерживающих функций, стоимостью привлечения арендаторов, простоем между договорами, операционными расходами и стабильностью чистого дохода. Чем сильнее эти показатели, тем меньше переоценка зависит только от концептуальной истории.",
          },
          {
            en: "This creates a disciplined path to value: first establish the anchor-led operating model, then demonstrate retention and cash-flow resilience, and only then translate the reduced risk into a valuation premium. Repositioning becomes not a cosmetic relabelling of mixed use, but an evidence-based transition to a distinct social-infrastructure asset class.",
            ru: "Так формируется последовательный путь к росту стоимости: сначала выстроить операционную модель вокруг якорей, затем доказать удержание арендаторов и устойчивость денежного потока и только после этого переводить снижение риска в премию к оценке. Репозиционирование становится не косметическим переименованием mixed-use объекта, а подтверждённым данными переходом в отдельный класс актива социальной инфраструктуры.",
          },
        ],
      },
    ],
    advantages: [
      {
        title: { en: "Clear hierarchy", ru: "Понятная иерархия" },
        body: {
          en: "Public, educational and community uses form the core; other tenants support it.",
          ru: "Публичные, образовательные и общественные функции образуют ядро, остальные арендаторы его поддерживают.",
        },
      },
      {
        title: { en: "Lower vacancy risk", ru: "Снижение риска вакантности" },
        body: {
          en: "Relevant anchor tenants make the asset less dependent on constant reletting.",
          ru: "Значимые якорные арендаторы снижают зависимость объекта от постоянной смены пользователей.",
        },
      },
      {
        title: { en: "Neighbourhood relevance", ru: "Значимость для района" },
        body: {
          en: "The building becomes a recognisable place for services used in everyday life.",
          ru: "Здание становится узнаваемым местом для сервисов, востребованных в повседневной жизни.",
        },
      },
      {
        title: { en: "Durable investment story", ru: "Устойчивая инвестиционная история" },
        body: {
          en: "Tenant quality, social utility and longer operating relationships provide evidence for lower risk, more resilient NOI and asset revaluation.",
          ru: "Качество арендаторов, общественная полезность и более длительные операционные отношения подтверждают снижение риска, устойчивость NOI и основания для переоценки актива.",
        },
      },
    ],
  },
];
