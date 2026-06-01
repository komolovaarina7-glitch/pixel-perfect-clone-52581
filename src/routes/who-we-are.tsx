import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/who-we-are")({
  head: () => ({
    meta: [
      { title: "Who We Are — REPOSITION LAB" },
      { name: "description", content: "A small, senior repositioning and recovery practice working with banks, family offices and special situations capital on distressed and misunderstood real estate." },
      { property: "og:title", content: "Who We Are — REPOSITION LAB" },
      { property: "og:description", content: "A senior repositioning and recovery practice for distressed and misunderstood real estate." },
    ],
  }),
  component: WhoWeAre,
});

function WhoWeAre() {
  return (
    <article>
      <header className="container-rl pt-32 pb-20">
        <p className="eyebrow">Who We Are</p>
        <h1 className="serif text-4xl md:text-6xl mt-6 max-w-3xl leading-[1.05]">
          A senior repositioning and recovery practice. Deliberately small. Deliberately discreet.
        </h1>
      </header>

      <section className="paper py-24">
        <div className="container-rl grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Practice</p>
            <div className="rule mt-4" />
          </div>
          <div className="md:col-span-8 space-y-6 text-ink/85 leading-relaxed text-lg">
            <p>
              REPOSITION LAB operates under RANTA LIMITED, London, with strategic operations across
              Latvia, Slovenia and Turkey. We were established to work where conventional brokerage,
              asset management and advisory typically disengage: distressed collateral, mispositioned
              heritage, stalled developments and assets whose narrative has collapsed faster than
              their underlying value.
            </p>
            <p>
              We are not a brokerage and we are not an agency. We do not represent inventory.
              We accept a constrained number of mandates per year and decline far more than we accept.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border">
        <div className="container-rl grid md:grid-cols-2 gap-16">
          <div>
            <p className="eyebrow">What we believe</p>
            <ul className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
              <li><span className="text-foreground">— </span>Most distressed assets are mispriced because they are misread.</li>
              <li><span className="text-foreground">— </span>A defensible repositioning thesis is worth more than an aggressive headline price.</li>
              <li><span className="text-foreground">— </span>Heritage, industrial and unusual assets respond to narrative engineering, not discounting.</li>
              <li><span className="text-foreground">— </span>Liquidity is a design problem, not a marketing problem.</li>
              <li><span className="text-foreground">— </span>Discretion compounds. Speed without discipline does not.</li>
            </ul>
          </div>
          <div>
            <p className="eyebrow">How we work</p>
            <ul className="mt-8 space-y-5 text-muted-foreground leading-relaxed">
              <li><span className="text-foreground">— </span>Single mandate, single thesis. No standing inventory.</li>
              <li><span className="text-foreground">— </span>Direct senior engagement throughout. No layered handoffs.</li>
              <li><span className="text-foreground">— </span>Institutional documentation standards on every deliverable.</li>
              <li><span className="text-foreground">— </span>Selective disclosure to qualified capital only.</li>
              <li><span className="text-foreground">— </span>We work in writing. We are accountable for what we put in writing.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 border-t border-border">
        <div className="container-rl text-center">
          <Link to="/submit" className="px-7 py-3.5 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors">
            Request Confidential Review
          </Link>
        </div>
      </section>
    </article>
  );
}
