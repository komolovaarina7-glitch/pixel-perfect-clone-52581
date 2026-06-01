import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/who-we-are", label: "Who We Are" },
  { to: "/services", label: "Services" },
  { to: "/cases", label: "Cases" },
  { to: "/approach", label: "Approach" },
  { to: "/selected-thinking", label: "Selected Thinking" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/80 border-b border-border">
      <div className="container-rl flex items-center justify-between h-16">
        <Link to="/" className="flex items-baseline gap-2">
          <span className="serif text-lg tracking-wide">REPOSITION</span>
          <span className="eyebrow text-foreground/70">LAB</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/submit"
          className="text-[12px] tracking-[0.18em] uppercase border border-foreground/40 px-4 py-2 hover:bg-foreground hover:text-background transition-colors"
        >
          Submit Asset
        </Link>
      </div>
    </header>
  );
}
