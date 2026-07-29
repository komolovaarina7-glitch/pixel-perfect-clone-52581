import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedHeroTitle } from "@/components/site/AnimatedHeroTitle";
import { BackToHome } from "@/components/site/BackToHome";
import { useLanguage, withoutTerminalDots, type LocalizedString } from "@/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — REPOSITION LAB" },
      {
        name: "description",
        content:
          "Confidential institutional contact for REPOSITION LAB. London office, strategic operations in Latvia, Slovenia and Turkey.",
      },
      { property: "og:title", content: "Contact — REPOSITION LAB" },
      { property: "og:description", content: "Confidential institutional contact." },
    ],
  }),
  component: Contact,
});

const page = {
  eyebrow: { en: "Contact", ru: "Контакт" },
  title: {
    en: "Discreet, institutional, written.",
    ru: "Закрытый профессиональный контакт. Только по существу.",
  },
  practice: { en: "Practice", ru: "Практика" },
  location: { en: "London, United Kingdom", ru: "Лондон, Великобритания" },
  operations: { en: "Strategic Operations", ru: "География работы" },
  channels: { en: "Channels", ru: "Каналы" },
  primaryChannel: {
    en: "Primary written contact channel.",
    ru: "Основной письменный канал связи.",
  },
  secure: { en: "Secure communication", ru: "Защищённая связь" },
  secureText: {
    en: "Secure communication can be arranged separately for qualified counterparties where appropriate.",
    ru: "Защищённая связь может быть организована отдельно для квалифицированных контрагентов там, где это уместно.",
  },
  note: { en: "Note", ru: "Важно" },
  noteText: {
    en: "REPOSITION LAB does not engage with retail enquiries, unsolicited listings or speculative investment offers. For asset submissions, use the confidential review form.",
    ru: "REPOSITION LAB не работает с розничными запросами, обычными объявлениями о продаже или спекулятивными инвестиционными предложениями. Чтобы предложить объект на предварительный разбор, используйте конфиденциальную форму.",
  },
} satisfies Record<string, LocalizedString>;

function Contact() {
  const { t, l } = useLanguage();

  return (
    <article className="contact-page">
      <BackToHome />
      <header className="contact-hero standard-page-hero standard-page-hero-content container-rl">
        <p className="internal-hero-eyebrow eyebrow text-accent">{l(page.eyebrow)}</p>
        <h1 className="standard-page-hero-title mobile-safe-text serif mt-6 max-w-4xl text-foreground">
          <AnimatedHeroTitle>{withoutTerminalDots(l(page.title))}</AnimatedHeroTitle>
        </h1>
      </header>

      <section className="contact-details">
        <div className="container-rl contact-details-grid">
          <div className="contact-detail contact-detail--practice">
            <p className="eyebrow text-accent">{l(page.practice)}</p>
            <p className="contact-practice-name serif">RANTA LIMITED</p>
            <p className="contact-secondary">{l(page.location)}</p>
          </div>
          <div className="contact-detail">
            <p className="eyebrow text-accent">{l(page.operations)}</p>
            <ul className="contact-locations">
              <li>Latvia</li>
              <li>Slovenia</li>
              <li>Turkey</li>
            </ul>
          </div>
          <div className="contact-detail contact-detail--channel">
            <p className="eyebrow text-accent">{l(page.channels)}</p>
            <ul className="contact-channels">
              <li>
                <a
                  href="mailto:office@repositionlab.com"
                  className="contact-email mobile-safe-text"
                >
                  office@repositionlab.com
                </a>
                <p className="contact-channel-caption">{l(page.primaryChannel)}</p>
              </li>
              <li className="contact-secure">
                <p className="contact-secure-title">{l(page.secure)}</p>
                <p className="contact-channel-caption">{l(page.secureText)}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="contact-note paper">
        <div className="container-rl contact-note-grid">
          <p className="eyebrow text-accent">{l(page.note)}</p>
          <div className="contact-note-content">
            <p className="mobile-safe-text serif contact-note-text">{l(page.noteText)}</p>
            <Link to="/submit" className="contact-submit premium-action">
              {l(t.common.submitAnAsset)}
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
