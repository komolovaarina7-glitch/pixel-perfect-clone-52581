import { createFileRoute } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { BackToHome } from "@/components/site/BackToHome";

export const Route = createFileRoute("/submit")({
  head: () => ({
    meta: [
      { title: "Submit an Asset — REPOSITION LAB" },
      { name: "description", content: "Submit an asset for confidential strategic review by REPOSITION LAB. Reviews are subject to mandate capacity." },
      { property: "og:title", content: "Submit an Asset — REPOSITION LAB" },
      { property: "og:description", content: "Confidential asset submission for strategic review." },
    ],
  }),
  component: Submit,
});

function Field({ label, name, type = "text", required, as, placeholder }: { label: string; name: string; type?: string; required?: boolean; as?: "textarea" | "select"; placeholder?: string }) {
  const base = "w-full bg-transparent border-b border-border focus:border-accent focus:outline-none py-3 text-foreground placeholder:text-muted-foreground/60";
  return (
    <label className="block">
      <span className="eyebrow block mb-3">{label}{required && " *"}</span>
      {as === "textarea" ? (
        <textarea name={name} required={required} rows={5} placeholder={placeholder} className={base} />
      ) : as === "select" ? (
        <select name={name} required={required} className={base} defaultValue="">
          <option value="" disabled>Select</option>
          <option>Email</option>
          <option>Encrypted channel</option>
          <option>Introduced by counterparty</option>
        </select>
      ) : type === "file" ? (
        <input type="file" name={name} multiple className="block text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:border file:border-border file:bg-transparent file:text-xs file:tracking-[0.18em] file:uppercase file:text-foreground hover:file:bg-foreground hover:file:text-background" />
      ) : (
        <input type={type} name={name} required={required} placeholder={placeholder} className={base} />
      )}
    </label>
  );
}

function Submit() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // [NEEDS CONFIRMATION] — wire to backend / CRM when available.
    setSent(true);
  }

  return (
    <article>
      <BackToHome />
      <header className="container-rl pt-8 pb-12">
        <p className="eyebrow">Submit an Asset</p>
        <h1 className="serif text-4xl md:text-6xl mt-6 max-w-3xl leading-[1.05]">
          Request a confidential strategic review.
        </h1>
        <p className="mt-8 max-w-2xl text-muted-foreground text-lg leading-relaxed">
          Submissions are read by a senior partner. We respond only to mandates we can credibly progress.
          All information is treated as confidential and held under non-disclosure as a matter of practice.
        </p>
      </header>

      <section className="border-t border-border">
        <div className="container-rl py-16 grid lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-4 space-y-8">
            <div>
              <p className="eyebrow mb-3">Confidentiality</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Material submitted is reviewed internally by REPOSITION LAB partners only.
                It is not shared with third parties without explicit written consent.
              </p>
            </div>
            <div>
              <p className="eyebrow mb-3">Capacity</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We accept a constrained number of mandates per year. Submitting an asset is
                not a guarantee of engagement.
              </p>
            </div>
            <div>
              <p className="eyebrow mb-3">Restrictions</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We do not provide retail brokerage, securities offerings or investment recommendations.
              </p>
            </div>
          </aside>

          <div className="lg:col-span-8">
            {sent ? (
              <div className="border border-border p-10">
                <p className="eyebrow">Received</p>
                <h2 className="serif text-3xl mt-4">Your submission has been logged.</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  A senior partner will respond within five business days where the mandate fits our practice.
                  Where it does not, we will say so directly.
                </p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="grid sm:grid-cols-2 gap-x-8 gap-y-10">
                <Field label="Asset type" name="asset_type" placeholder="e.g. heritage hotel, industrial, mixed-use" required />
                <Field label="Location" name="location" placeholder="City, country" required />
                <Field label="Current condition" name="condition" placeholder="Operational, stalled, distressed…" />
                <Field label="Ownership structure" name="ownership" placeholder="Single owner, JV, bank-held, fund…" />
                <div className="sm:col-span-2">
                  <Field label="Challenge description" name="challenge" as="textarea" placeholder="What is trapping value or recovery today?" required />
                </div>
                <div className="sm:col-span-2">
                  <Field label="Upload supporting materials" name="files" type="file" />
                </div>
                <Field label="Name" name="name" required />
                <Field label="Email" name="email" type="email" required />
                <Field label="Organization" name="organization" />
                <Field label="Preferred contact method" name="contact_method" as="select" required />

                <div className="sm:col-span-2 pt-4 flex flex-wrap items-center gap-6 justify-between">
                  <p className="text-xs text-muted-foreground max-w-md leading-relaxed">
                    By submitting, you acknowledge our confidentiality practice and that REPOSITION LAB
                    accepts mandates on a selective basis.
                  </p>
                  <button type="submit" className="px-7 py-3.5 bg-accent text-accent-foreground text-[12px] tracking-[0.18em] uppercase hover:bg-foreground hover:text-background transition-colors">
                    Request Confidential Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </article>
  );
}
