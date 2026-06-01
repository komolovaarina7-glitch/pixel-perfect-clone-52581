import { createFileRoute, Link } from "@tanstack/react-router";
import castleImg from "@/assets/case-castle.jpg";
import industrialImg from "@/assets/case-industrial.jpg";
import rigaImg from "@/assets/case-riga.jpg";
import apartmentsImg from "@/assets/case-apartments.jpg";
import turkeyImg from "@/assets/case-turkey.jpg";

export const Route = createFileRoute("/cases")({
  head: () => ({
    meta: [
      { title: "Transformation Intelligence Cases — REPOSITION LAB" },
      { name: "description", content: "Selected repositioning theses across heritage, industrial, urban and lifestyle real estate." },
      { property: "og:title", content: "Transformation Intelligence Cases" },
      { property: "og:description", content: "Selected repositioning theses across heritage, industrial and special-situation real estate." },
      { property: "og:image", content: castleImg },
    ],
  }),
  component: Cases,
});

const cases = [
  {
    title: "Slovenia Castle",
    theme: "Heritage Repositioning",
    img: castleImg,
    challenge: "A forgotten heritage structure carrying cultural weight but no defensible commercial thesis.",
    logic: "Cultural destination positioning combining boutique hospitality, educational integration and recreation zoning under a single recovery narrative.",
    direction: "Adaptive reuse · cultural destination · qualified hospitality capital.",
  },
  {
    title: "Industrial Heritage, Slovenia",
    theme: "Adaptive Reuse",
    img: industrialImg,
    challenge: "A historic pumpkin oil factory — culturally significant, structurally sound, commercially illegible.",
    logic: "Conversion thesis structured around boutique hospitality, creative-industry tenancy and a heritage-aware narrative for qualified operators.",
    direction: "Industrial heritage repositioning · boutique hospitality · creative tenancy.",
  },
  {
    title: "Bauskas 16A, Riga",
    theme: "Urban Heritage",
    img: rigaImg,
    challenge: "A cinematic urban building under-read by the local market and miscast for conventional uses.",
    logic: "Reframed as event destination and private-club hospitality concept — a narrative-led repositioning calibrated to lifestyle capital.",
    direction: "Cinematic asset · hospitality repositioning · private club concept.",
  },
  {
    title: "Distressed Prime Apartments",
    theme: "Premium Conversion",
    img: apartmentsImg,
    challenge: "Communal apartment layouts in distressed condition, embedded in genuinely premium urban locations.",
    logic: "Conversion thesis toward high-yield premium residential product — value driven by location release, not cosmetic finish.",
    direction: "Distressed location plays · communal-to-premium conversion · residential repositioning.",
  },
  {
    title: "Turkey Lifestyle Repositioning",
    theme: "Hospitality Strategy",
    img: turkeyImg,
    challenge: "A coastal asset trapped in a generic holiday-rental narrative that capped both yield and exit optionality.",
    logic: "Reframed around lifestyle hospitality and slow-tourism positioning — narrative engineered to attract qualified operators rather than retail buyers.",
    direction: "Lifestyle hospitality · slow tourism · operator-led capital fit.",
  },
];

function Cases() {
  return (
    <article>
      <header className="container-rl pt-32 pb-16">
        <p className="eyebrow">Transformation Intelligence Cases</p>
        <h1 className="serif text-4xl md:text-6xl mt-6 max-w-4xl leading-[1.05]">
          Selected repositioning theses. These are not listings.
        </h1>
        <p className="mt-8 max-w-2xl text-muted-foreground text-lg leading-relaxed">
          Each entry illustrates how an asset was re-read — its challenge, the repositioning logic
          and the strategic direction the recovery thesis pointed toward. Confidential commercial
          detail is held under mandate. [NEEDS CONFIRMATION] markers indicate facts intentionally
          withheld from public presentation.
        </p>
      </header>

      <section>
        <div className="container-rl space-y-px">
          {cases.map((c, i) => (
            <div key={c.title} className="grid md:grid-cols-12 gap-10 py-12 border-t border-border items-start">
              <div className={`md:col-span-6 ${i % 2 ? "md:order-2" : ""}`}>
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={c.img} alt={c.title} loading="lazy" width={1280} height={960} className="w-full h-full object-cover" />
                </div>
              </div>
              <div className="md:col-span-6 space-y-6">
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="serif text-2xl md:text-3xl">{c.title}</h2>
                  <span className="eyebrow whitespace-nowrap">{c.theme}</span>
                </div>
                <div>
                  <p className="eyebrow">Asset challenge</p>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{c.challenge}</p>
                </div>
                <div>
                  <p className="eyebrow">Repositioning logic</p>
                  <p className="mt-2 text-muted-foreground leading-relaxed">{c.logic}</p>
                </div>
                <div>
                  <p className="eyebrow">Strategic direction</p>
                  <p className="mt-2 text-foreground/85 leading-relaxed">{c.direction}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24">
        <div className="container-rl text-center">
          <Link to="/submit" className="px-7 py-3.5 bg-accent text-accent-foreground text-[12px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors">
            Submit an Asset for Review
          </Link>
        </div>
      </section>
    </article>
  );
}
