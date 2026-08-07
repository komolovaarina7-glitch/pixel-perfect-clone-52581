import type { LocalizedString } from "@/i18n";
import { useLanguage } from "@/i18n";

type DocumentaryPhoto = {
  filename: string;
  caption: LocalizedString;
  variant?: "wide" | "standard" | "compact" | "descent" | "finale";
};

type DocumentarySectionProps = {
  title: LocalizedString;
  paragraphs: readonly LocalizedString[];
  children: React.ReactNode;
};

const photoLabel: LocalizedString = {
  en: "Photo placeholder",
  ru: "Фотошаблон",
};

const chapterIntro: readonly LocalizedString[] = [
  {
    en: "The documentary photographs record Bauskas 16A before the formation of a coherent repositioning concept. They reveal the property not as an empty architectural shell, but as a complex system of historic façades, courtyard spaces, residential rooms, lower levels and surviving technical infrastructure.",
    ru: "Документальные фотографии фиксируют Bauskas 16A до формирования цельной концепции репозиционирования. Они показывают объект не как пустую архитектурную оболочку, а как сложную систему исторических фасадов, дворовых пространств, жилых помещений, нижних уровней и сохранившейся технической инфраструктуры.",
  },
  {
    en: "The condition of the building exposes both its constraints and its potential. Its architectural expression, spatial complexity and traces of different periods of use provide the basis for a new reading of the asset — not through superficial renovation, but through identifying and connecting the qualities already embedded within it.",
    ru: "Состояние здания одновременно раскрывает его ограничения и объясняет его потенциал. Архитектурная выразительность, пространственная многослойность и следы разных периодов использования создают основу для нового прочтения объекта — не через поверхностное обновление, а через выявление и соединение уже существующих качеств.",
  },
];

const architecturalIdentity: readonly LocalizedString[] = [
  {
    en: "The principal façade retains a strong and immediately recognisable composition. Decorative gables, the tower volume, the vertical rhythm of the windows, balconies and architectural detailing create a distinct visual identity.",
    ru: "Главный фасад сохраняет сильную и легко узнаваемую композицию: декоративные фронтоны, башенный объём, вертикальный ритм окон, балконы и многочисленные архитектурные детали формируют самостоятельный визуальный образ.",
  },
  {
    en: "Even in an imperfect condition, the building possesses qualities that cannot be replicated through standard new construction. This historic expression is not treated as a decorative background, but as one of the central drivers of its future positioning.",
    ru: "Даже в несовершенном состоянии здание обладает качествами, которые невозможно воспроизвести стандартным новым строительством. Эта историческая выразительность становится не фоном проекта, а одним из центральных факторов будущего позиционирования.",
  },
];

const fragmentedSite: readonly LocalizedString[] = [
  {
    en: "The courtyard reflects one of the central challenges of the property’s inherited condition: architecturally significant parts of the building are perceived separately from service structures, technical areas and the surrounding site.",
    ru: "Дворовая территория отражает одну из ключевых проблем исходного состояния объекта: архитектурно значимые части здания воспринимаются отдельно от хозяйственных построек, технических зон и прилегающего пространства.",
  },
  {
    en: "Repositioning therefore cannot be limited to individual rooms or façades. It requires a coherent logic of movement, use and perception across the entire property, allowing the courtyard to become part of the estate’s overall scenario rather than remaining residual space.",
    ru: "Задача репозиционирования заключается не только в работе с отдельными комнатами или фасадами. Необходимо сформировать единую логику движения, использования и восприятия всей территории, чтобы двор перестал быть остаточным пространством и стал частью общего сценария усадьбы.",
  },
];

const lowerLevel: readonly LocalizedString[] = [
  {
    en: "The descent to the lower level reveals another dimension of the property. Vaulted ceilings, exposed brickwork, substantial structural elements and surviving equipment demonstrate the building’s technical and functional depth.",
    ru: "Спуск на нижний уровень открывает другую сторону объекта. Сводчатые перекрытия, кирпичная кладка, массивные конструктивные элементы и сохранившееся оборудование свидетельствуют о технической и функциональной глубине здания.",
  },
  {
    en: "In their existing condition, these spaces may be perceived as a difficult and low-liquidity part of the asset. Yet their scale, material character and separation from the representative floors create the basis for a distinct experiential scenario: wellness, private events, kitchen facilities, intimate gatherings or specialised hospitality infrastructure.",
    ru: "В существующем состоянии эти помещения могут восприниматься как сложная и низколиквидная часть объекта. Однако их масштаб, материальность и отделённость от представительских этажей создают основу для самостоятельного experiential-сценария: wellness, частных событий, кухни, камерных встреч или специализированной hospitality-инфраструктуры.",
  },
  {
    en: "Any future use would remain subject to technical assessment and confirmation of the permitted functions of the spaces.",
    ru: "Все будущие функции должны рассматриваться только после технического обследования и подтверждения допустимого использования помещений.",
  },
];

const spaceInTransition: readonly LocalizedString[] = [
  {
    en: "Some rooms are recorded in a transitional condition: the historic shell has been exposed and later layers have been partially removed, while the final function and atmosphere remain undefined.",
    ru: "Отдельные помещения зафиксированы уже в переходном состоянии: историческая оболочка раскрыта, поздние слои частично удалены, однако окончательная функция и атмосфера ещё не определены.",
  },
  {
    en: "This is the stage at which strategy becomes particularly important. Without a coherent concept, construction works may produce only a collection of refurbished rooms. Repositioning must instead connect the architecture, history, site and potential functions into a consistent user and market-facing scenario.",
    ru: "Именно на этом этапе особенно важна стратегия. Без единой концепции работы могут привести лишь к набору обновлённых помещений. Репозиционирование, напротив, должно связать архитектуру, историю, территорию и возможные функции в последовательный пользовательский и рыночный сценарий.",
  },
];

const closingCopy: readonly LocalizedString[] = [
  {
    en: "The documentary record demonstrates that the value of Bauskas 16A does not lie in a single room, architectural detail or proposed function. It emerges from the combination of the property’s historic, spatial and technical layers.",
    ru: "Документальная фиксация показывает, что ценность Bauskas 16A заключена не в одном помещении, архитектурной детали или предполагаемой функции. Она возникает из совокупности исторических, пространственных и технических слоёв объекта.",
  },
  {
    en: "The role of REPOSITION LAB is to transform this fragmented collection of qualities into a coherent concept that can make the asset more legible to cultural operators, hospitality capital, creative industries and other professional audiences.",
    ru: "Задача REPOSITION LAB — превратить эту фрагментированную совокупность в цельную концепцию, способную сделать объект более понятным для культурных операторов, hospitality-капитала, креативных индустрий и других профессиональных аудиторий.",
  },
];

const photos = {
  opening: {
    filename: "WhatsApp Image 2026-08-04 at 18.03.44 (1).jpeg",
    caption: {
      en: "Historic principal façade. Documentary record of the asset’s condition.",
      ru: "Общий вид исторического фасада. Документальная фиксация состояния объекта.",
    },
    variant: "wide",
  },
  facade: {
    filename: "WhatsApp Image 2026-08-04 at 18.03.44.jpeg",
    caption: {
      en: "Principal façade and surviving architectural composition.",
      ru: "Главный фасад и сохранившаяся архитектурная композиция.",
    },
  },
  terrace: {
    filename: "WhatsApp Image 2026-08-04 at 18.03.45 (3).jpeg",
    caption: {
      en: "Architectural detail, terrace and relationship with the surrounding urban fabric.",
      ru: "Архитектурный фрагмент, терраса и связь здания с городским окружением.",
    },
  },
  sideVolume: {
    filename: "WhatsApp Image 2026-08-04 at 18.03.45 (1).jpeg",
    caption: {
      en: "Side volume and the surviving rhythm of the historic windows.",
      ru: "Боковой объём и сохранившийся ритм исторических окон.",
    },
    variant: "compact",
  },
  layeredVolumes: {
    filename: "WhatsApp Image 2026-08-04 at 18.03.45.jpeg",
    caption: {
      en: "The relationship between volumes associated with different stages of the building’s development.",
      ru: "Сочетание объёмов, относящихся к разным этапам развития здания.",
    },
    variant: "compact",
  },
  courtyard: {
    filename: "WhatsApp Image 2026-08-04 at 18.03.45 (2).jpeg",
    caption: {
      en: "Courtyard and the fragmented structure of the property.",
      ru: "Дворовая территория и фрагментированная структура объекта.",
    },
    variant: "wide",
  },
  descent: {
    filename: "WhatsApp Image 2026-08-04 at 18.03.46 (2).jpeg",
    caption: {
      en: "Transition from the representative floors to the lower functional level.",
      ru: "Переход от представительских этажей к нижнему функциональному уровню.",
    },
    variant: "descent",
  },
  vault: {
    filename: "WhatsApp Image 2026-08-04 at 18.03.45 (4).jpeg",
    caption: {
      en: "Vaulted space within the lower level.",
      ru: "Сводчатое пространство нижнего уровня.",
    },
  },
  brickwork: {
    filename: "WhatsApp Image 2026-08-04 at 18.03.45 (5).jpeg",
    caption: {
      en: "Brickwork and surviving structural elements.",
      ru: "Кирпичная кладка и сохранившиеся конструктивные элементы.",
    },
  },
  infrastructure: {
    filename: "WhatsApp Image 2026-08-04 at 18.03.46 (1).jpeg",
    caption: {
      en: "Detail of the surviving technical infrastructure.",
      ru: "Фрагмент сохранившейся технической инфраструктуры.",
    },
    variant: "compact",
  },
  transition: {
    filename: "WhatsApp Image 2026-08-04 at 18.03.46 (4).jpeg",
    caption: {
      en: "Interior in transition before the definition of its final use scenario.",
      ru: "Интерьер в переходном состоянии до определения окончательного сценария использования.",
    },
    variant: "finale",
  },
} satisfies Record<string, DocumentaryPhoto>;

function Paragraphs({ copy }: { copy: readonly LocalizedString[] }) {
  const { l } = useLanguage();

  return (
    <div className="bauskas-documentary-copy">
      {copy.map((paragraph) => (
        <p key={paragraph.en}>{l(paragraph)}</p>
      ))}
    </div>
  );
}

function PhotoPlaceholder({ photo }: { photo: DocumentaryPhoto }) {
  const { l } = useLanguage();
  const variant = photo.variant ?? "standard";

  return (
    <figure className={`bauskas-documentary-photo bauskas-documentary-photo--${variant}`}>
      <div
        className="bauskas-documentary-photo__frame case-photo-reveal case-photo-reveal-light"
        role="img"
        aria-label={`${l(photoLabel)}: ${photo.filename}`}
      >
        <span className="bauskas-documentary-photo__index">{l(photoLabel)}</span>
        <span className="bauskas-documentary-photo__filename">{photo.filename}</span>
      </div>
      <figcaption>{l(photo.caption)}</figcaption>
    </figure>
  );
}

function DocumentarySection({ title, paragraphs, children }: DocumentarySectionProps) {
  const { l } = useLanguage();

  return (
    <section className="bauskas-documentary-section">
      <header className="bauskas-documentary-section__header">
        <h3 className="serif">{l(title)}</h3>
        <Paragraphs copy={paragraphs} />
      </header>
      {children}
    </section>
  );
}

export function BauskasDocumentaryChapter() {
  const { l } = useLanguage();

  return (
    <section
      className="bauskas-documentary border-t border-rule"
      aria-labelledby="bauskas-as-found"
    >
      <div className="container-rl max-w-6xl">
        <header className="bauskas-documentary-intro">
          <p className="eyebrow text-accent">
            {l({ en: "Documentary Record", ru: "Документальная фиксация" })}
          </p>
          <h2 id="bauskas-as-found" className="serif">
            {l({ en: "The Estate as Found", ru: "Усадьба в исходном состоянии" })}
          </h2>
          <Paragraphs copy={chapterIntro} />
        </header>

        <PhotoPlaceholder photo={photos.opening} />

        <DocumentarySection
          title={{ en: "Architectural Identity", ru: "Архитектурная идентичность" }}
          paragraphs={architecturalIdentity}
        >
          <div className="bauskas-documentary-pair">
            <PhotoPlaceholder photo={photos.facade} />
            <PhotoPlaceholder photo={photos.terrace} />
          </div>
          <div className="bauskas-documentary-pair bauskas-documentary-pair--compact">
            <PhotoPlaceholder photo={photos.sideVolume} />
            <PhotoPlaceholder photo={photos.layeredVolumes} />
          </div>
        </DocumentarySection>

        <DocumentarySection
          title={{ en: "Courtyard and Fragmented Site", ru: "Двор и фрагментированная территория" }}
          paragraphs={fragmentedSite}
        >
          <PhotoPlaceholder photo={photos.courtyard} />
        </DocumentarySection>

        <DocumentarySection
          title={{
            en: "Lower Level: A Hidden Spatial Resource",
            ru: "Нижний уровень: скрытый пространственный ресурс",
          }}
          paragraphs={lowerLevel}
        >
          <PhotoPlaceholder photo={photos.descent} />
          <div className="bauskas-documentary-pair">
            <PhotoPlaceholder photo={photos.vault} />
            <PhotoPlaceholder photo={photos.brickwork} />
          </div>
          <div className="bauskas-documentary-detail-row">
            <PhotoPlaceholder photo={photos.infrastructure} />
            <blockquote>
              {l({
                en: "Their scale, material character and separation from the representative floors create the basis for a distinct experiential scenario.",
                ru: "Их масштаб, материальность и отделённость от представительских этажей создают основу для самостоятельного experiential-сценария.",
              })}
            </blockquote>
          </div>
        </DocumentarySection>

        <DocumentarySection
          title={{ en: "Space in Transition", ru: "Пространство в переходном состоянии" }}
          paragraphs={spaceInTransition}
        >
          <PhotoPlaceholder photo={photos.transition} />
        </DocumentarySection>

        <div className="bauskas-documentary-transition">
          <Paragraphs copy={closingCopy} />
        </div>
      </div>
    </section>
  );
}
