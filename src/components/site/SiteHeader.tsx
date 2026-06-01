import { Link } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const nav = [
  { to: "/who-we-are", label: "Who We Are" },
  { to: "/services", label: "Services" },
  { to: "/cases", label: "Cases" },
  { to: "/approach", label: "Approach" },
  { to: "/selected-thinking", label: "Selected Thinking" },
  { to: "/contact", label: "Contact" },
] as const;

const mobileNav = [...nav, { to: "/submit", label: "Submit Asset" }] as const;

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="container-rl flex h-16 items-center justify-between">
        <Link
          to="/"
          className="flex items-baseline gap-2"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="serif text-lg tracking-wide">REPOSITION</span>
          <span className="eyebrow text-foreground/70">LAB</span>
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[13px] text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link
            to="/submit"
            className="hidden border border-foreground/40 px-4 py-2 text-[12px] uppercase tracking-[0.18em] transition-colors hover:bg-foreground hover:text-background lg:inline-flex"
          >
            Submit Asset
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-foreground/30 text-foreground/85 transition-colors hover:border-foreground hover:text-foreground lg:hidden"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
          >
            {isMobileMenuOpen ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </div>
      {isMobileMenuOpen && (
        <nav
          id="mobile-navigation"
          className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-border bg-background/95 backdrop-blur-md lg:hidden"
        >
          <div className="container-rl py-4">
            <div className="grid gap-px bg-border">
              {mobileNav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  className="bg-background px-4 py-4 text-[12px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
                  activeProps={{ className: "text-foreground" }}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
