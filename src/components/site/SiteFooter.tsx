import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/i18n";

export function SiteFooter() {
  const { t, l } = useLanguage();

  return (
    <footer className="site-footer border-t border-rule mt-32">
      <div className="container-rl py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 max-w-md">
          <div className="serif text-2xl text-foreground">REPOSITION LAB</div>
          <p className="eyebrow mt-2 text-accent">{l(t.footer.tagline)}</p>
          <p className="mobile-safe-text mt-6 text-sm text-muted-foreground leading-relaxed">
            {l(t.footer.description)}
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4 text-accent">{l(t.footer.navigate)}</p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/services" className="hover:text-accent text-muted-foreground">
                {l(t.header.nav[1].label)}
              </Link>
            </li>
            <li>
              <Link to="/cases" className="hover:text-accent text-muted-foreground">
                {l(t.footer.transformationCases)}
              </Link>
            </li>
            <li>
              <Link to="/approach" className="hover:text-accent text-muted-foreground">
                {l(t.header.nav[3].label)}
              </Link>
            </li>
            <li>
              <Link to="/selected-thinking" className="hover:text-accent text-muted-foreground">
                {l(t.footer.selectedThinking)}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4 text-accent">{l(t.footer.operations)}</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="mobile-safe-text">London · RANTA LIMITED</li>
            <li className="mobile-safe-text">Latvia · Slovenia · Turkey</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-rule">
        <div className="container-rl py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span className="mobile-safe-text">
            © {new Date().getFullYear()} REPOSITION LAB · RANTA LIMITED
          </span>
        </div>
      </div>
    </footer>
  );
}
