import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { BackToHome } from "@/components/site/BackToHome";
import { useLanguage, withoutTerminalDots } from "@/i18n";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "Approach — REPOSITION LAB" },
      {
        name: "description",
        content:
          "A five-stage institutional method for distressed and underutilized real estate: diagnose, reposition, package, engage, recover.",
      },
      { property: "og:title", content: "Approach — REPOSITION LAB" },
      {
        property: "og:description",
        content: "The five-stage method behind every REPOSITION LAB mandate.",
      },
    ],
  }),
  component: Approach,
});

function Approach() {
  const [openStage, setOpenStage] = useState<string | null>(null);
  const { t, l } = useLanguage();

  return (
    <article className="approach-page">
      <div className="approach-page-lightfield" aria-hidden="true">
        <span className="approach-lightfield-orb approach-lightfield-orb--1" />
        <span className="approach-lightfield-orb approach-lightfield-orb--2" />
        <span className="approach-lightfield-orb approach-lightfield-orb--3" />
        <span className="approach-lightfield-orb approach-lightfield-orb--4" />
        <span className="approach-lightfield-orb approach-lightfield-orb--5" />
        <span className="approach-lightfield-ribbon approach-lightfield-ribbon--1" />
        <span className="approach-lightfield-ribbon approach-lightfield-ribbon--2" />
        <span className="approach-lightfield-ribbon approach-lightfield-ribbon--3" />
        <span className="approach-lightfield-highlight approach-lightfield-highlight--1" />
        <span className="approach-lightfield-highlight approach-lightfield-highlight--2" />
        <span className="approach-lightfield-highlight approach-lightfield-highlight--3" />
        <span className="approach-lightfield-highlight approach-lightfield-highlight--4" />
      </div>
      <BackToHome />
      <header className="approach-hero standard-page-hero standard-page-hero-content container-rl">
        <p className="eyebrow text-accent page-reveal page-reveal-delay-1">
          {l(t.approach.eyebrow)}
        </p>
        <h1 className="standard-page-hero-title mobile-safe-text serif mt-6 max-w-4xl text-foreground page-reveal page-reveal-delay-2">
          {withoutTerminalDots(l(t.approach.title))}
        </h1>
      </header>

      <section className="approach-process-section">
        <div className="approach-process-shell container-rl py-14 md:py-20">
          {t.approach.stages.map((s, index) => (
            <div
              key={s.n}
              className={`approach-stage-block approach-stage-delay-${index + 1} grid gap-7 px-5 py-10 md:grid-cols-12 md:gap-8 md:px-8 md:py-14`}
            >
              <div className="approach-stage-title md:col-span-4">
                <h2 className="approach-stage-heading mobile-safe-text serif text-foreground">
                  {l(s.t)}
                </h2>
              </div>
              <div className="approach-stage-content md:col-span-7 md:col-start-6 text-muted-foreground leading-relaxed text-lg md:text-xl">
                <p>{l(s.d)}</p>
                <div className="mt-6">
                  <button
                    type="button"
                    className="approach-stage-trigger group inline-flex min-h-10 max-w-full items-center gap-2 text-left text-[11px] uppercase tracking-[0.14em] text-accent transition-colors hover:text-foreground sm:tracking-[0.18em]"
                    aria-expanded={openStage === s.n}
                    aria-controls={`approach-note-${s.n}`}
                    onClick={() => setOpenStage((current) => (current === s.n ? null : s.n))}
                  >
                    <span className="mobile-safe-text">{l(s.trigger)}</span>
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">
                      {openStage === s.n ? "↑" : "↓"}
                    </span>
                  </button>
                  <div
                    className={`approach-memo-frame ${openStage === s.n ? "approach-memo-frame-open" : ""}`}
                    aria-hidden={openStage !== s.n}
                  >
                    <div
                      id={`approach-note-${s.n}`}
                      className="approach-memo mt-4 max-w-2xl space-y-3 text-base leading-7 text-muted-foreground"
                    >
                      {s.note.map((paragraph, index) => (
                        <p
                          key={paragraph.en}
                          className={index === s.note.length - 1 ? "text-foreground/85" : undefined}
                        >
                          {l(paragraph)}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="paper py-24">
        <div className="container-rl grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="mobile-safe-text serif text-2xl md:text-3xl text-ink">
              {l(t.approach.disciplineTitle)}
            </h2>
            <div className="rule mt-4" />
          </div>
          <div className="md:col-span-8 text-ink/85 leading-relaxed text-lg space-y-5">
            {t.approach.discipline.map((paragraph) => (
              <p key={paragraph.en}>{l(paragraph)}</p>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-rl text-center">
          <Link
            to="/submit"
            className="premium-action px-7 py-3.5 text-[12px] tracking-[0.18em] uppercase"
          >
            {l(t.approach.cta)}
          </Link>
        </div>
      </section>
    </article>
  );
}
