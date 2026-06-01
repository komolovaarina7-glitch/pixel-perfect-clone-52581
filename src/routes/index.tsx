import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-distressed.jpg";
import castleImg from "@/assets/case-castle.jpg";
import industrialImg from "@/assets/case-industrial.jpg";
import rigaImg from "@/assets/case-riga.jpg";
import apartmentsImg from "@/assets/case-apartments.jpg";
import turkeyImg from "@/assets/case-turkey.jpg";
import plansImg from "@/assets/texture-plans.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "REPOSITION LAB — Strategic Real Estate Repositioning & Recovery Intelligence" },
      { name: "description", content: "We help banks, asset holders, special situations investors and institutional owners unlock hidden value in distressed, misunderstood and illiquid real estate." },
      { property: "og:title", content: "REPOSITION LAB" },
      { property: "og:description", content: "Strategic repositioning and recovery intelligence for distressed and underutilized real estate." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const services = [
  { n: "01", t: "Rapid Asset Recovery Assessment", d: "Concentrated diagnostic of a single distressed or stalled asset — value drivers, structural inefficiencies and a defensible repositioning thesis." },
  { n: "02", t: "Portfolio Screening & Asset Prioritization", d: "Triage across non-core or REO portfolios. We isolate the assets where intervention compounds and those better released." },
  { n: "03", t: "Full Repositioning & Investment Packaging", d: "End-to-end repositioning strategy, institutional packaging and capital-ready narrative for selective transaction processes." },
  { n: "04", t: "Distressed Heritage & Special Assets", d: "Castles, industrial heritage, cinematic and culturally significant buildings — adaptive reuse and hospitality repositioning." },
  { n: "05", t: "Tokenization Readiness", d: "Selective digital structuring and tokenization readiness for suitable assets where additional liquidity mechanisms may enhance marketability." },
];

const cases = [
  { slug: "slovenia-castle", title: "Slovenia Castle", theme: "Heritage Repositioning", img: castleImg, summary: "Cultural destination, adaptive reuse and educational integration thesis for a forgotten heritage asset." },
  { slug: "industrial-heritage-slovenia", title: "Industrial Heritage, Slovenia", theme: "Adaptive Reuse", img: industrialImg, summary: "Historic pumpkin oil factory repositioned as boutique hospitality and creative industry conversion." },
  { slug: "bauskas-16a-riga", title: "Bauskas 16A, Riga", theme: "Urban Heritage", img: rigaImg, summary: "Cinematic urban building studied as event destination and private club hospitality concept." },
  { slug: "distressed-prime-apartments", title: "Distressed Prime Apartments", theme: "Premium Conversion", img: apartmentsImg, summary: "Communal layouts in distressed premium locations — conversion thesis toward high-yield residential product." },
  { slug: "turkey-lifestyle-repositioning", title: "Turkey Lifestyle Repositioning", theme: "Hospitality Strategy", img: turkeyImg, summary: "Coastal asset narrative restructured around lifestyle hospitality and slow-tourism positioning." },
];

const clients = [
  { t: "Banks & REO Divisions", d: "Non-core and distressed collateral exit strategies." },
  { t: "Family Offices", d: "Discreet access to mispositioned hidden-value assets." },
  { t: "Special Situations Capital", d: "Sourced opportunities with defensible recovery theses." },
  { t: "Developers", d: "Stalled or underperforming projects unlocked." },
  { t: "Asset Holders", d: "Misunderstood, illiquid or unusual real estate." },
  { t: "Heritage Owners", d: "Cultural, industrial and special-situation buildings." },
];

function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative min-h-[92vh] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Cinematic facade of a distressed heritage industrial building at dusk"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="relative container-rl pb-24 pt-40 grid gap-16 md:grid-cols-12 items-end">
          <div className="md:col-span-8">
            <p className="eyebrow">REPOSITION LAB — Est. RANTA LIMITED, London</p>
            <h1 className="serif text-4xl md:text-6xl lg:text-7xl mt-6 leading-[1.05]">
              Transforming distressed &amp; underutilized real estate into <em className="text-accent not-italic">investable opportunities</em>.
            </h1>
            <p className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              REPOSITION LAB is a strategic recovery and real estate intelligence partner. We help banks,
              asset holders, special situations investors and institutional owners unlock hidden value
              in distressed, misunderstood and illiquid assets.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/submit" className="px-6 py-3.5 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors">
                Request Confidential Review
              </Link>
              <Link to="/cases" className="px-6 py-3.5 border border-foreground/40 text-[12px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors">
                View Selected Cases
              </Link>
            </div>
          </div>
          <div className="md:col-span-4 md:text-right">
            <p className="eyebrow mb-3">Index</p>
            <ul className="space-y-1 text-sm font-mono text-muted-foreground">
              <li>I — Positioning</li>
              <li>II — Services</li>
              <li>III — Transformation Intelligence</li>
              <li>IV — Client Spectrum</li>
              <li>V — Submit an Asset</li>
            </ul>
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="paper py-28">
        <div className="container-rl grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <p className="eyebrow">I. Positioning</p>
            <div className="rule mt-4" />
          </div>
          <div className="md:col-span-8">
            <h2 className="serif text-3xl md:text-5xl leading-tight max-w-2xl">
              We understand value where others only see problems.
            </h2>
            <p className="mt-8 text-base md:text-lg leading-relaxed max-w-2xl text-ink/80">
              REPOSITION LAB acts as an external strategic repositioning and recovery partner.
              Most distressed assets are not worthless — they are misread, mispositioned,
              poorly packaged or trapped in illiquidity. Our work is the discipline of
              re-reading them: their structure, their narrative, and the capital they can attract.
            </p>
            <div className="mt-12 grid sm:grid-cols-3 gap-8 border-t border-ink/15 pt-10">
              {[
                ["Hidden value", "Identified beneath market mispricing."],
                ["Liquidity engineering", "Designed for institutional release."],
                ["Recovery thesis", "Defensible. Repeatable. Investable."],
              ].map(([t, d]) => (
                <div key={t}>
                  <p className="serif text-xl">{t}</p>
                  <p className="mt-2 text-sm text-ink/65">{d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28">
        <div className="container-rl">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <p className="eyebrow">II. Services</p>
              <h2 className="serif text-3xl md:text-5xl mt-4 max-w-xl">Five disciplines of strategic recovery.</h2>
            </div>
            <Link to="/services" className="text-[12px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground">
              Full services →
            </Link>
          </div>
          <div className="rule" />
          <div className="divide-y divide-border">
            {services.map((s) => (
              <div key={s.n} className="grid md:grid-cols-12 gap-8 py-8 group">
                <div className="md:col-span-1 font-mono text-sm text-muted-foreground">{s.n}</div>
                <div className="md:col-span-4">
                  <h3 className="serif text-2xl group-hover:text-accent transition-colors">{s.t}</h3>
                </div>
                <div className="md:col-span-7 text-muted-foreground leading-relaxed">{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section className="py-28 border-t border-border">
        <div className="container-rl">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <p className="eyebrow">III. Transformation Intelligence Cases</p>
              <h2 className="serif text-3xl md:text-5xl mt-4 max-w-2xl">
                Selected repositioning theses across heritage, industrial and special-situation real estate.
              </h2>
            </div>
            <Link to="/cases" className="text-[12px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground">
              All cases →
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cases.map((c) => (
              <article key={c.slug} className="group">
                <div className="aspect-[4/5] overflow-hidden bg-muted">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4">
                  <h3 className="serif text-xl">{c.title}</h3>
                  <span className="eyebrow whitespace-nowrap">{c.theme}</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{c.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* APPROACH PREVIEW WITH PLANS TEXTURE */}
      <section className="relative py-32 overflow-hidden border-t border-border">
        <img
          src={plansImg}
          alt=""
          aria-hidden
          className="absolute inset-0 w-full h-full object-cover opacity-[0.06]"
          loading="lazy"
        />
        <div className="relative container-rl grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="eyebrow">IV. Approach</p>
            <h2 className="serif text-3xl md:text-5xl mt-4 leading-tight">
              An institutional method, applied to assets others have written off.
            </h2>
            <Link to="/approach" className="mt-8 inline-block text-[12px] tracking-[0.18em] uppercase border-b border-foreground/40 pb-1 hover:border-accent hover:text-accent transition-colors">
              The five-stage method →
            </Link>
          </div>
          <ol className="md:col-span-7 space-y-px">
            {[
              ["Diagnose", "Strip the asset to its structural reality."],
              ["Reposition", "Rewrite the thesis around defensible value drivers."],
              ["Package", "Translate the thesis into institutional documentation."],
              ["Engage", "Direct outreach to qualified capital and operators."],
              ["Recover", "Execute the path that optimizes recovery, not headline price."],
            ].map(([t, d], i) => (
              <li key={t} className="grid grid-cols-12 gap-6 py-6 border-t border-border">
                <span className="col-span-2 font-mono text-sm text-muted-foreground">0{i + 1}</span>
                <span className="col-span-4 serif text-xl">{t}</span>
                <span className="col-span-6 text-sm text-muted-foreground leading-relaxed">{d}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* CLIENT SPECTRUM */}
      <section className="py-28 border-t border-border">
        <div className="container-rl">
          <p className="eyebrow">V. Client Spectrum</p>
          <h2 className="serif text-3xl md:text-5xl mt-4 max-w-2xl">Who we work with.</h2>
          <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {clients.map((c) => (
              <div key={c.t} className="bg-background p-8">
                <p className="serif text-xl">{c.t}</p>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 border-t border-border">
        <div className="container-rl text-center max-w-3xl">
          <p className="eyebrow">Confidential</p>
          <h2 className="serif text-3xl md:text-5xl mt-6 leading-tight">
            If you hold an asset others have failed to read, submit it for a confidential review.
          </h2>
          <div className="mt-10 flex justify-center gap-3 flex-wrap">
            <Link to="/submit" className="px-7 py-3.5 bg-accent text-accent-foreground text-[12px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors">
              Submit an Asset
            </Link>
            <Link to="/contact" className="px-7 py-3.5 border border-foreground/40 text-[12px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
