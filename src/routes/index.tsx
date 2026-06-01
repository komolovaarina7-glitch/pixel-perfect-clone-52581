import { createFileRoute, Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-distressed.jpg";
import castleImg from "@/assets/case-castle.jpg";
import industrialImg from "@/assets/case-industrial.jpg";
import rigaImg from "@/assets/case-riga.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "REPOSITION LAB — Strategic Real Estate Repositioning & Recovery Intelligence" },
      { name: "description", content: "Strategic recovery and real estate intelligence partner. We help banks, asset holders and institutional owners unlock hidden value in distressed and underutilized assets." },
      { property: "og:title", content: "REPOSITION LAB" },
      { property: "og:description", content: "Strategic repositioning and recovery intelligence for distressed and underutilized real estate." },
      { property: "og:image", content: heroImg },
    ],
  }),
  component: Home,
});

const directions = [
  { to: "/who-we-are", eyebrow: "01", title: "Who We Are", desc: "Philosophy, posture and institutional discipline." },
  { to: "/services", eyebrow: "02", title: "Services", desc: "Five disciplines of strategic recovery and packaging." },
  { to: "/cases", eyebrow: "03", title: "Transformation Intelligence Cases", desc: "Heritage, industrial and special-situation theses." },
  { to: "/approach", eyebrow: "04", title: "Approach", desc: "The five-stage institutional method." },
  { to: "/selected-thinking", eyebrow: "05", title: "Selected Thinking", desc: "Notes on hidden value and liquidity engineering." },
  { to: "/submit", eyebrow: "06", title: "Submit an Asset", desc: "Confidential intake for owners, banks and capital." },
  { to: "/contact", eyebrow: "07", title: "Contact", desc: "Discreet institutional channels for qualified counterparties." },
] as const;

const previewCases = [
  { slug: "slovenia-castle", title: "Slovenia Castle", theme: "Heritage Repositioning", img: castleImg, summary: "Cultural destination and adaptive reuse thesis for a forgotten heritage asset." },
  { slug: "industrial-heritage-slovenia", title: "Industrial Heritage, Slovenia", theme: "Adaptive Reuse", img: industrialImg, summary: "Historic factory repositioned as boutique hospitality and creative industry conversion." },
  { slug: "bauskas-16a-riga", title: "Bauskas 16A, Riga", theme: "Urban Heritage", img: rigaImg, summary: "Cinematic urban building studied as event destination and private club hospitality concept." },
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
          <div className="md:col-span-9">
            <p className="eyebrow">REPOSITION LAB — Est. RANTA LIMITED, London</p>
            <h1 className="serif text-4xl md:text-6xl lg:text-7xl mt-6 leading-[1.05]">
              Transforming distressed &amp; underutilized real estate into <em className="text-accent not-italic">investable opportunities</em>.
            </h1>
            <p className="mt-8 text-base md:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              A strategic recovery and real estate intelligence partner for banks, asset holders,
              special situations investors and institutional owners.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/submit" className="px-6 py-3.5 bg-foreground text-background text-[12px] tracking-[0.18em] uppercase hover:bg-accent hover:text-accent-foreground transition-colors">
                Request Confidential Review
              </Link>
              <Link to="/who-we-are" className="px-6 py-3.5 border border-foreground/40 text-[12px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors">
                Enter the Practice
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DIRECTIONAL NAVIGATION CARDS */}
      <section className="py-28 border-t border-border">
        <div className="container-rl">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <p className="eyebrow">Index</p>
              <h2 className="serif text-3xl md:text-5xl mt-4 max-w-2xl">Choose a direction.</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Each discipline is its own dedicated reading. Select the entry that matches your mandate.
            </p>
          </div>
          <div className="rule" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border mt-px">
            {directions.map((d) => (
              <Link
                key={d.to}
                to={d.to}
                className="group bg-background p-8 flex flex-col gap-4 min-h-[220px] hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{d.eyebrow}</span>
                  <span className="text-[12px] tracking-[0.18em] uppercase text-muted-foreground group-hover:text-accent transition-colors">Open →</span>
                </div>
                <h3 className="serif text-2xl group-hover:text-accent transition-colors">{d.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mt-auto">{d.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CREDIBILITY STATEMENT */}
      <section className="paper py-24">
        <div className="container-rl grid md:grid-cols-12 gap-10 items-start">
          <div className="md:col-span-4">
            <p className="eyebrow">Position</p>
            <div className="rule mt-4" />
          </div>
          <div className="md:col-span-8">
            <p className="serif text-2xl md:text-3xl leading-snug text-ink">
              We understand value where others only see problems. Most distressed assets are not worthless —
              they are misread, mispositioned, poorly packaged or trapped in illiquidity.
            </p>
            <p className="mt-6 text-ink/70 leading-relaxed max-w-2xl">
              Our work is the discipline of re-reading them: their structure, their narrative,
              and the capital they can attract.
            </p>
          </div>
        </div>
      </section>

      {/* 3 SELECTED CASES */}
      <section className="py-28">
        <div className="container-rl">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-14">
            <div>
              <p className="eyebrow">Selected Cases</p>
              <h2 className="serif text-3xl md:text-5xl mt-4 max-w-2xl">Three repositioning theses.</h2>
            </div>
            <Link to="/cases" className="text-[12px] tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground">
              View all cases →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {previewCases.map((c) => (
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

      {/* FINAL CTA */}
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
