import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useLanguage, type Language } from "@/i18n";

function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const languages: Language[] = ["en", "ru"];

  return (
    <div
      className={`inline-flex min-h-9 items-center gap-1.5 text-[11px] uppercase tracking-[0.14em] sm:gap-2 sm:tracking-[0.16em] ${
        compact ? "self-start" : ""
      }`}
      aria-label="Language"
    >
      {languages.map((item, index) => (
        <span key={item} className="inline-flex items-center gap-2">
          {index > 0 ? <span className="text-muted-foreground/45">·</span> : null}
          <button
            type="button"
            className={`min-h-9 border-b transition-colors ${
              language === item
                ? "border-accent text-foreground font-medium"
                : "border-transparent text-muted-foreground hover:text-accent"
            }`}
            aria-pressed={language === item}
            onClick={() => setLanguage(item)}
          >
            {item.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const { t, l } = useLanguage();
  const nav = t.header.nav;
  const mobileNav = [...nav, { to: "/submit", label: t.common.submitAsset }] as const;

  useEffect(() => {
    if (!isMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (isMenuOpen) {
      setIsHidden(false);
      return;
    }

    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = currentScrollY - lastScrollY;

      if (currentScrollY <= 64) {
        setIsHidden(false);
      } else if (delta > 4) {
        setIsHidden(true);
      } else if (delta < -4) {
        setIsHidden(false);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40">
      {isMenuOpen ? (
        <div
          className="fixed inset-0 top-16 z-30 lg:hidden"
          aria-hidden="true"
          onClick={() => setIsMenuOpen(false)}
        />
      ) : null}
      <div
        className={`relative z-40 border-b border-rule bg-background/95 backdrop-blur-sm transition-transform duration-300 ease-out ${
          isHidden ? "-translate-y-full" : "translate-y-0"
        }`}
      >
        <div className="container-rl flex items-center justify-between gap-2 h-16 sm:gap-4">
          <Link to="/" className="flex min-w-0 shrink-0 items-baseline gap-2">
            <span className="serif text-[17px] tracking-wide text-foreground sm:text-lg">
              REPOSITION
            </span>
            <span className="brand-lab eyebrow text-accent">LAB</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-5 xl:gap-6">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
                activeProps={{ className: "text-accent font-semibold" }}
              >
                {l(n.label)}
              </Link>
            ))}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <Link
              to="/submit"
              className="premium-action px-4 py-2 text-[12px] uppercase tracking-[0.18em]"
            >
              {l(t.common.submitAsset)}
            </Link>
          </div>
          <div className="flex min-w-0 items-center gap-1.5 sm:gap-2 lg:hidden">
            <LanguageSwitcher />
            <button
              type="button"
              className="premium-action inline-flex min-h-11 shrink-0 items-center px-3 text-[11px] uppercase tracking-[0.14em] sm:px-4 sm:text-[12px] sm:tracking-[0.18em]"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? l(t.header.close) : l(t.header.menu)}
            </button>
          </div>
        </div>
        {isMenuOpen ? (
          <nav
            id="mobile-navigation"
            className="container-rl max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-rule bg-background py-3 lg:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col">
              {mobileNav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="mobile-safe-text min-h-12 border-b border-rule/70 px-1 py-4 text-[13px] uppercase tracking-[0.14em] text-foreground transition-colors hover:text-accent sm:tracking-[0.16em]"
                  activeProps={{ className: "text-accent font-semibold" }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {l(n.label)}
                </Link>
              ))}
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
