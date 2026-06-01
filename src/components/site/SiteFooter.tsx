import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="border-t border-border mt-32">
      <div className="container-rl py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 max-w-md">
          <div className="serif text-2xl">REPOSITION LAB</div>
          <p className="eyebrow mt-2">Strategic Recovery · Real Estate Intelligence</p>
          <p className="mt-6 text-sm text-muted-foreground leading-relaxed">
            REPOSITION LAB is a strategic repositioning and recovery intelligence partner
            for distressed, underutilized and misunderstood real estate assets. We work
            with institutional owners, banks, family offices and special situations capital.
          </p>
        </div>
        <div>
          <p className="eyebrow mb-4">Navigate</p>
          <ul className="space-y-2 text-sm">
            <li><Link to="/services" className="hover:text-foreground text-muted-foreground">Services</Link></li>
            <li><Link to="/cases" className="hover:text-foreground text-muted-foreground">Transformation Cases</Link></li>
            <li><Link to="/approach" className="hover:text-foreground text-muted-foreground">Approach</Link></li>
            <li><Link to="/selected-thinking" className="hover:text-foreground text-muted-foreground">Selected Thinking</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow mb-4">Operations</p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>London · RANTA LIMITED</li>
            <li>Latvia · Slovenia · Turkey</li>
            <li><Link to="/contact" className="hover:text-foreground">Confidential contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-rl py-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} REPOSITION LAB · RANTA LIMITED</span>
          <span className="eyebrow">Discretion · Discipline · Recovery</span>
        </div>
      </div>
    </footer>
  );
}
