import { createFileRoute } from "@tanstack/react-router";
import { BackToHome } from "@/components/site/BackToHome";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — REPOSITION LAB" },
      { name: "description", content: "Confidential institutional contact for REPOSITION LAB. London office, strategic operations in Latvia, Slovenia and Turkey." },
      { property: "og:title", content: "Contact — REPOSITION LAB" },
      { property: "og:description", content: "Confidential institutional contact." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <article>
      <BackToHome />
      <header className="container-rl pt-8 pb-16">
        <p className="eyebrow">Contact</p>
        <h1 className="serif text-4xl md:text-6xl mt-6 max-w-3xl leading-[1.05]">
          Discreet, institutional, written.
        </h1>
      </header>

      <section className="border-t border-border">
        <div className="container-rl py-20 grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <p className="eyebrow mb-3">Practice</p>
            <p className="serif text-2xl">RANTA LIMITED</p>
            <p className="text-muted-foreground mt-1">London, United Kingdom</p>
          </div>
          <div className="md:col-span-4">
            <p className="eyebrow mb-3">Strategic Operations</p>
            <ul className="space-y-1 text-muted-foreground">
              <li>Latvia</li>
              <li>Slovenia</li>
              <li>Turkey</li>
            </ul>
          </div>
          <div className="md:col-span-4">
            <p className="eyebrow mb-3">Channels</p>
            <ul className="space-y-2">
              <li>
                <a href="mailto:office@repositionlab.com" className="text-foreground hover:text-accent transition-colors">office@repositionlab.com</a>
                <p className="text-xs text-muted-foreground mt-1">[NEEDS CONFIRMATION]</p>
              </li>
              <li className="pt-4">
                <p className="text-foreground">Encrypted channel</p>
                <p className="text-xs text-muted-foreground mt-1">Available on request for qualified counterparties.</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="paper py-20">
        <div className="container-rl max-w-3xl">
          <p className="eyebrow">Note</p>
          <p className="serif text-2xl md:text-3xl mt-4 leading-snug">
            REPOSITION LAB does not engage with retail enquiries, unsolicited listings or
            speculative investment offers. For asset submissions, use the confidential review form.
          </p>
        </div>
      </section>
    </article>
  );
}
