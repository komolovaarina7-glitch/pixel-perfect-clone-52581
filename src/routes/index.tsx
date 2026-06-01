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
      {/* HERO — short entry, not a scroll */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden">
        <img
          src={heroImg}
          alt="Cinematic facade of a distressed heritage industrial building at dusk"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/30" />
        <div className="relative container-rl pb-16 pt-32">
          <p className="eyebrow">REPOSITION LAB — RANTA LIMITED, London</p>
          <h1 className="serif text-3xl md:text-5xl lg:text-6xl mt-5 max-w-4xl leading-[1.05]">
            Transforming distressed &amp; underutilized real estate into <em className="text-accent not-italic">investable opportunities</em>.
          </h1>
          <p className="mt-6 text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
            A strategic recovery and real estate intelligence partner for banks,
            asset holders, special situations investors and institutional owners.
          </p>
        </div>
      </section>

      {/* DIRECTIONAL HUB — the homepage's primary job */}
      <section className="py-20 border-t border-border">
        <div className="container-rl">
          <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
            <div>
              <p className="eyebrow">Index</p>
              <h2 className="serif text-2xl md:text-4xl mt-3 max-w-2xl">Choose a strategic direction.</h2>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Each discipline opens as its own dedicated reading.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {directions.map((d) => (
              <Link
                key={d.to}
                to={d.to}
                className="group cursor-pointer border border-border bg-background p-7 flex flex-col gap-3 min-h-[190px] hover:border-accent/60 hover:bg-muted/30 transition-colors"
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{d.eyebrow}</span>
                  <span className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground group-hover:text-accent transition-colors">Open →</span>
                </div>
                <h3 className="serif text-xl group-hover:text-accent transition-colors">{d.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed mt-auto">{d.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CREDIBILITY — short positioning statement */}
      <section className="paper py-16">
        <div className="container-rl max-w-3xl">
          <p className="eyebrow">Position</p>
          <p className="serif text-xl md:text-2xl mt-4 leading-snug text-ink">
            We understand value where others only see problems. Most distressed assets
            are not worthless — they are misread, mispositioned, poorly packaged or
            trapped in illiquidity.
          </p>
        </div>
      </section>

      {/* 3 SELECTED CASES — preview only, full grid lives on /cases */}
      <section className="py-20">
        <div className="container-rl">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <p className="eyebrow">Selected Cases · Preview</p>
              <h2 className="serif text-2xl md:text-3xl mt-3">Three repositioning theses.</h2>
            </div>
            <Link to="/cases" className="text-[11px] tracking-[0.18em] uppercase border border-foreground/40 px-4 py-2 hover:bg-foreground hover:text-background transition-colors">
              View all cases →
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {previewCases.map((c) => (
              <Link to="/cases" key={c.slug} className="group block">
                <div className="aspect-[4/3] overflow-hidden bg-muted">
                  <img
                    src={c.img}
                    alt={c.title}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                  />
                </div>
                <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                  <h3 className="serif text-lg">{c.title}</h3>
                  <span className="eyebrow text-[10px]">{c.theme}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 border-t border-border">
        <div className="container-rl text-center max-w-2xl">
          <p className="eyebrow">Confidential</p>
          <h2 className="serif text-2xl md:text-3xl mt-5 leading-tight">
            Hold an asset others have failed to read?
          </h2>
          <div className="mt-8 flex justify-center gap-3 flex-wrap">
            <Link to="/submit" className="px-6 py-3 bg-accent text-accent-foreground text-[11px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors">
              Submit an Asset
            </Link>
            <Link to="/contact" className="px-6 py-3 border border-foreground/40 text-[11px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
