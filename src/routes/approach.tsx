import { createFileRoute, Link } from "@tanstack/react-router";
import type { CSSProperties } from "react";
import { useState } from "react";
import { ApproachAurora } from "@/components/site/ApproachAurora";
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

function ApproachHeadline({ children }: { children: string }) {
  let letterIndex = 0;

  return (
    <span aria-label={children}>
      {children.split(/(\s+)/).map((part, partIndex) => {
        if (/^\s+$/.test(part)) return <span key={`space-${partIndex}`}> </span>;

        return (
          <span aria-hidden="true" className="home-hero-word" key={`${part}-${partIndex}`}>
            {Array.from(part).map((character) => {
              const currentIndex = letterIndex++;
              return (
                <span
                  className="home-hero-letter"
                  key={`${character}-${currentIndex}`}
                  style={{ "--letter-index": currentIndex } as CSSProperties}
                >
                  {character}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}

function Approach() {
  const [openStage, setOpenStage] = useState<string | null>(null);
  const { t, l } = useLanguage();

  return (
    <article className="approach-page">
      <BackToHome />
      <header className="approach-hero standard-page-hero standard-page-hero-content container-rl">
        <ApproachAurora />
        <div className="approach-hero-content">
          <p className="home-hero-eyebrow eyebrow text-accent">{l(t.approach.eyebrow)}</p>
          <h1 className="approach-hero-title mobile-safe-text serif text-foreground">
            <ApproachHeadline>{withoutTerminalDots(l(t.approach.title))}</ApproachHeadline>
          </h1>
        </div>
      </header>

      <section className="approach-process-section">
        <div className="approach-process-shell container-rl">
          {t.approach.stages.map((s, index) => (
            <div
              key={s.n}
              className={`approach-stage-block approach-stage-delay-${index + 1} grid gap-7 md:grid-cols-12 md:gap-8`}
            >
              <div className="approach-stage-title md:col-span-4">
                <h2 className="approach-stage-heading mobile-safe-text serif text-foreground">
                  {l(s.t)}
                </h2>
              </div>
              <div className="approach-stage-content md:col-span-7 md:col-start-6">
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

      <section className="approach-discipline paper">
        <div className="container-rl approach-discipline-grid">
          <div className="md:col-span-4">
            <h2 className="approach-discipline-title mobile-safe-text serif text-ink">
              {l(t.approach.disciplineTitle)}
            </h2>
          </div>
          <div className="approach-discipline-copy md:col-span-8">
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
