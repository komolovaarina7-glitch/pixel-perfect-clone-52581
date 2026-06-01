import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/thinking")({
  head: () => ({
    meta: [
      { title: "Selected Thinking — REPOSITION LAB" },
      { name: "description", content: "Notes on hidden value, liquidity engineering, heritage repositioning and recovery-focused real estate intelligence." },
      { property: "og:title", content: "Selected Thinking — REPOSITION LAB" },
      { property: "og:description", content: "Notes on recovery, repositioning and real estate intelligence." },
    ],
  }),
  component: Thinking,
});

const pieces = [
  { tag: "Note 01", title: "Why distressed assets fail", excerpt: "Most distressed real estate does not fail because of the building. It fails because the thesis around the building collapsed and was never rewritten." },
  { tag: "Note 02", title: "Hidden value vs market value", excerpt: "Market value reflects how the asset is read today. Hidden value reflects how it can be defensibly re-read. The gap is the discipline." },
  { tag: "Note 03", title: "Why banks misprice unusual real estate", excerpt: "Institutional pricing models do not accommodate narrative-led assets. The result is systematic underpricing of heritage, industrial and special-situation collateral." },
  { tag: "Note 04", title: "Heritage repositioning economics", excerpt: "Heritage value is not a discount. It is a constraint with a yield profile. Treated as such, it becomes capital-attractive." },
  { tag: "Note 05", title: "Hospitality conversion logic", excerpt: "Conversion to hospitality is the most over-promised and under-engineered move in distressed real estate. The thesis must precede the floor plan." },
  { tag: "Note 06", title: "Liquidity engineering in real estate", excerpt: "Illiquidity is a design problem. The path to liquidity is structured before it is marketed." },
  { tag: "Note 07", title: "Narrative-driven asset repositioning", excerpt: "An asset is the story qualified capital can defend about it. Repositioning is the deliberate authorship of that story." },
  { tag: "Note 08", title: "Adaptive reuse strategies", excerpt: "Adaptive reuse succeeds where the new use respects the structural logic of the building — and fails where it fights it." },
  { tag: "Note 09", title: "Recovery-focused real estate intelligence", excerpt: "Recovery is not the opposite of growth. It is the discipline that determines whether growth is defensible." },
];

function Thinking() {
  return (
    <article>
      <header className="container-rl pt-32 pb-16">
        <p className="eyebrow">Selected Thinking</p>
        <h1 className="serif text-4xl md:text-6xl mt-6 max-w-3xl leading-[1.05]">
          Notes on recovery, repositioning and real estate intelligence.
        </h1>
        <p className="mt-8 max-w-2xl text-muted-foreground text-lg leading-relaxed">
          A running set of internal positions. Written for owners and capital who already
          recognise the problem. Full essays are released selectively under mandate.
        </p>
      </header>

      <section>
        <div className="container-rl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-border">
            {pieces.map((p) => (
              <article key={p.title} className="bg-background p-8 flex flex-col gap-4 min-h-[260px]">
                <p className="eyebrow">{p.tag}</p>
                <h2 className="serif text-2xl leading-snug">{p.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mt-auto">{p.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 mt-16">
        <div className="container-rl text-center text-muted-foreground text-sm max-w-xl">
          Full essays and internal briefings are shared only with qualified counterparties under mandate.
        </div>
      </section>
    </article>
  );
}
