import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — REPOSITION LAB" },
      { name: "description", content: "Rapid Asset Recovery, Portfolio Screening, Full Repositioning & Packaging, Distressed Heritage and Tokenization Readiness." },
      { property: "og:title", content: "Services — REPOSITION LAB" },
      { property: "og:description", content: "Five disciplines of strategic real estate recovery." },
    ],
  }),
  component: Services,
});

const services = [
  {
    n: "01",
    title: "Rapid Asset Recovery Assessment",
    short: "Concentrated diagnostic of a single asset.",
    body: "A focused engagement on one distressed, stalled or underutilized asset. We strip it to its structural reality — title, condition, zoning, narrative and capital fit — and return a defensible repositioning thesis with a recommended recovery path. Designed for owners who need direction before they commit further capital or release the asset.",
    deliverables: ["Asset-level diagnostic", "Repositioning thesis", "Recommended recovery path", "Indicative capital fit"],
  },
  {
    n: "02",
    title: "Portfolio Screening & Asset Prioritization",
    short: "Triage across non-core and REO portfolios.",
    body: "We work with banks, REO divisions and institutional holders to triage portfolios of distressed or non-core real estate. Each asset is scored on recoverability, repositioning potential, capital intensity and release readiness — so management can concentrate effort where intervention compounds.",
    deliverables: ["Portfolio-level screen", "Asset prioritization matrix", "Intervention vs release recommendation", "Sequencing plan"],
  },
  {
    n: "03",
    title: "Full Repositioning & Investment Packaging",
    short: "End-to-end thesis, narrative and institutional packaging.",
    body: "For mandates where the thesis is clear and the path is committed. We build the full repositioning strategy, the institutional narrative, the documentation suite and the capital-ready packaging — and run a selective process to qualified investors and operators on a discreet basis.",
    deliverables: ["Repositioning strategy", "Institutional information memorandum", "Capital narrative", "Selective investor process"],
  },
  {
    n: "04",
    title: "Distressed Heritage & Special Assets",
    short: "Castles, industrial heritage and cinematic buildings.",
    body: "A specialist track for assets that resist conventional valuation: castles, forgotten industrial structures, culturally significant buildings, hospitality-convertible heritage and properties whose value is partly narrative. We design adaptive reuse, cultural hospitality and destination repositioning theses calibrated to qualified capital.",
    deliverables: ["Adaptive reuse thesis", "Cultural hospitality positioning", "Heritage-aware capital narrative", "Operator and partner mapping"],
  },
  {
    n: "05",
    title: "Tokenization Readiness",
    short: "Selective digital structuring where it genuinely enhances liquidity.",
    body: "Selective digital structuring and tokenization readiness for suitable assets where additional liquidity mechanisms may enhance marketability. We do not present tokenization as an investment product and we do not operate as a securities platform. We assess fit, structure readiness and prepare assets for compliant downstream partners only where the underlying repositioning thesis already stands on its own merits.",
    deliverables: ["Fit assessment", "Readiness structuring", "Partner mapping", "Risk framing"],
  },
];

function Services() {
  return (
    <article>
      <header className="container-rl pt-32 pb-20">
        <p className="eyebrow">Services</p>
        <h1 className="serif text-4xl md:text-6xl mt-6 max-w-3xl leading-[1.05]">
          Five disciplines of strategic recovery.
        </h1>
        <p className="mt-8 max-w-2xl text-muted-foreground text-lg leading-relaxed">
          Each engagement is scoped against the asset, not against a template.
          We accept a constrained number of mandates per year.
        </p>
      </header>

      <section>
        <div className="container-rl">
          <div className="rule" />
          {services.map((s) => (
            <div key={s.n} className="grid md:grid-cols-12 gap-10 py-16 border-b border-border">
              <div className="md:col-span-3">
                <div className="font-mono text-sm text-muted-foreground">{s.n}</div>
                <h2 className="serif text-2xl md:text-3xl mt-3">{s.title}</h2>
                <p className="eyebrow mt-4">{s.short}</p>
              </div>
              <div className="md:col-span-6 text-muted-foreground leading-relaxed text-base md:text-lg">
                {s.body}
              </div>
              <div className="md:col-span-3">
                <p className="eyebrow mb-4">Deliverables</p>
                <ul className="space-y-2 text-sm">
                  {s.deliverables.map((d) => (
                    <li key={d} className="text-foreground/80">— {d}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-rl text-center">
          <Link to="/submit" className="px-7 py-3.5 bg-accent text-accent-foreground text-[12px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors">
            Submit an Asset
          </Link>
        </div>
      </section>
    </article>
  );
}
