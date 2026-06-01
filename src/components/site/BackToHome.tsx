import { Link } from "@tanstack/react-router";

export function BackToHome() {
  return (
    <div className="container-rl pt-24 md:pt-28">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground/40 pb-1"
      >
        <span aria-hidden>←</span>
        <span>Back to Main Hub</span>
      </Link>
    </div>
  );
}
