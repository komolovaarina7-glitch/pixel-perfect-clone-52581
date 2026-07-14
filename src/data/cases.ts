import castleImg from "@/assets/case-castle.jpg";
import industrialImg from "@/assets/case-industrial.jpg";
import apartmentsImg from "@/assets/case-apartments.jpg";
import turkeyImg from "@/assets/case-turkey.jpg";
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
    img: castleImg,
    challenge: {
      en: "A forgotten heritage structure carrying cultural weight but no defensible commercial thesis.",
      ru: "Забытый объект наследия с культурной ценностью, но без убедительной коммерческой логики.",
    },
    logic: {
      en: "Cultural destination positioning combining boutique hospitality, educational integration and recreation zoning under a single recovery narrative.",
      ru: "Позиционирование культурного объекта, объединяющее камерное гостеприимство, образовательную функцию и рекреационное зонирование в единую рыночную историю.",
    },
    direction: {
      en: "Adaptive reuse · cultural destination · qualified hospitality capital.",
      ru: "Адаптивное использование · культурное направление · квалифицированный гостиничный капитал.",
    },
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
      en: "Bauskas 16A is a historically layered urban estate that the local market has consistently misread. Its spatial complexity, cultural depth and multi-function potential do not translate into conventional real estate disposal logic, leaving it under-read and difficult to place through standard channels.",
      ru: "Bauskas 16A — исторически многослойная городская усадьба, которую локальный рынок последовательно понимал слишком узко. Пространственная сложность, культурная глубина и многофункциональный потенциал плохо укладываются в стандартную логику продажи недвижимости, из-за чего объект остаётся недооценённым и сложным для вывода через обычные каналы.",
    },
    logic: {
      en: "REPOSITION LAB's concept repositions the estate from a fragmented and misunderstood asset into a coherent multi-scenario environment — readable by cultural operators, hospitality capital, creative industries and private-members concepts seeking heritage assets with strong spatial identity.",
      ru: "Концепция REPOSITION LAB переводит усадьбу из фрагментированного и неверно понятого объекта в цельную мультисценарную среду — понятную культурным операторам, гостиничному капиталу, креативным индустриям и закрытым клубным концепциям, которым нужны объекты наследия с сильной пространственной идентичностью.",
    },
    direction: {
      en: "Cinematic identity · adaptive reuse · hospitality and residential flexibility · cultural operator and lifestyle capital.",
      ru: "Кинематографичная идентичность · адаптивное использование · гостеприимство и жилая гибкость · культурный оператор и lifestyle-капитал.",
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
    gallery: [
      {
        src: "/images/cases/bauskas-16a/case12.jpg",
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
        src: "/images/cases/bauskas-16a/image3.jpg",
        alt: "Bauskas 16A upper representative interior space",
        type: "upper",
        span: "full",
      },
      {
        src: "/images/cases/bauskas-16a/page12.jpg",
        alt: "Bauskas 16A residential floor interior",
        type: "lower",
        objectPosition: "center 70%",
      },
      {
        src: "/images/cases/bauskas-16a/page123.jpg",
        alt: "Bauskas 16A lower level hospitality and wellness space",
        type: "atmosphere",
      },
    ],
  },
  {
    slug: "distressed-prime-apartments",
    title: { en: "Distressed Prime Apartments", ru: "Проблемные апартаменты в сильных локациях" },
    theme: { en: "Premium Conversion", ru: "Премиальная конверсия" },
    img: apartmentsImg,
    challenge: {
      en: "Communal apartment layouts in distressed condition, embedded in genuinely premium urban locations.",
      ru: "Коммунальные квартирные планировки в проблемном состоянии, расположенные в действительно сильных городских локациях.",
    },
    logic: {
      en: "Conversion thesis toward high-yield premium residential product — value driven by location release, not cosmetic finish.",
      ru: "Тезис конверсии в премиальный жилой продукт с высоким доходным потенциалом — ценность создаётся раскрытием локации, а не косметической отделкой.",
    },
    direction: {
      en: "Distressed location plays · communal-to-premium conversion · residential repositioning.",
      ru: "Проблемные объекты в сильных локациях · конверсия из коммунального формата в премиальный · жилое перепозиционирование.",
    },
  },
  {
    slug: "turkey-lifestyle-repositioning",
    title: {
      en: "Two-Level Lifestyle Residence, Fethiye",
      ru: "Двухуровневая резиденция в Фетхие",
    },
    theme: { en: "Asset Category Shift", ru: "СМЕНА КАТЕГОРИИ АКТИВА" },
    img: turkeyImg,
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
];
