import { createFileRoute, Link } from "@tanstack/react-router";
import { BackToHome } from "@/components/site/BackToHome";
import { useLanguage, withoutTerminalDots } from "@/i18n";

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
    ],
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
          <p className="eyebrow text-accent page-reveal page-reveal-delay-1">{l(t.who.eyebrow)}</p>
          <h1 className="standard-page-hero-title mobile-safe-text serif mt-6 max-w-4xl text-foreground page-reveal page-reveal-delay-2">
            {withoutTerminalDots(l(t.who.title))}
          </h1>
        </div>
      </header>

      <section className="who-paper-section paper py-24">
        <div className="container-rl">
          <div className="who-statement-copy max-w-4xl mx-auto space-y-7">
            {t.who.paragraphs.map((paragraph) => (
              <p key={paragraph.en}>{l(paragraph)}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="who-principles-section py-24 border-t border-rule">
        <div className="container-rl grid md:grid-cols-2 gap-16">
          <div>
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
          <div>
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
