import { createFileRoute, Link } from "@tanstack/react-router";
import plansImg from "@/assets/texture-plans.jpg";
import { BackToHome } from "@/components/site/BackToHome";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "Approach — REPOSITION LAB" },
      { name: "description", content: "A five-stage institutional method for distressed and underutilized real estate: diagnose, reposition, package, engage, recover." },
      { property: "og:title", content: "Approach — REPOSITION LAB" },
      { property: "og:description", content: "The five-stage method behind every REPOSITION LAB mandate." },
    ],
  }),
  component: Approach,
});

const stages = [
  { n: "01", t: "Diagnose", d: "We strip the asset to its structural reality — title, condition, zoning, narrative, capital fit. We separate the real problems from the inherited story." },
  { n: "02", t: "Reposition", d: "We rewrite the thesis around the value drivers the asset can actually defend. The repositioning logic becomes the spine of every downstream decision." },
  { n: "03", t: "Package", d: "We translate the thesis into institutional documentation: information memoranda, narrative, financial framing and discreet visual identity." },
  { n: "04", t: "Engage", d: "We engage qualified capital, operators and partners directly. Selective. Confidential. Written. No retail broadcast." },
  { n: "05", t: "Recover", d: "We execute the path that optimizes recovery, not headline price — disposal, joint venture, conversion or repositioning held by the original owner." },
];

function Approach() {
  return (
    <article>
      <BackToHome />
      <header className="container-rl pt-8 pb-16">
        <p className="eyebrow">Approach</p>
        <h1 className="serif text-4xl md:text-6xl mt-6 max-w-3xl leading-[1.05]">
          A five-stage institutional method.
        </h1>
      </header>

      <section className="relative overflow-hidden border-t border-border">
        <img src={plansImg} alt="" aria-hidden className="absolute inset-0 w-full h-full object-cover opacity-[0.05]" loading="lazy" />
        <div className="relative container-rl py-16">
          {stages.map((s) => (
            <div key={s.n} className="grid md:grid-cols-12 gap-8 py-10 border-b border-border">
              <div className="md:col-span-2 font-mono text-sm text-muted-foreground">{s.n}</div>
              <div className="md:col-span-4">
                <h2 className="serif text-3xl">{s.t}</h2>
              </div>
              <div className="md:col-span-6 text-muted-foreground leading-relaxed text-lg">{s.d}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="paper py-24">
        <div className="container-rl grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow">Discipline</p>
            <div className="rule mt-4" />
          </div>
          <div className="md:col-span-8 text-ink/85 leading-relaxed text-lg space-y-5">
            <p>
              Every stage is documented. Every recommendation is written.
              We will not move from one stage to the next without explicit owner alignment.
            </p>
            <p>
              We do not invent permits, valuations, returns or historical facts. Where information
              is missing or unverified, the deliverable says so. This is the only basis on which
              institutional capital can engage seriously.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-rl text-center">
          <Link to="/submit" className="px-7 py-3.5 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors">
            Begin with a Confidential Review
          </Link>
        </div>
      </section>
    </article>
  );
}
