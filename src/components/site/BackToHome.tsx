import { Link } from "@tanstack/react-router";
import { useLanguage } from "@/i18n";

export function BackToHome() {
  const { t, l } = useLanguage();

  return (
    <div className="back-to-home-wrap container-rl pt-24 md:pt-28">
      <Link
        to="/"
        className="page-reveal page-reveal-delay-1 mobile-safe-text inline-flex max-w-full items-center gap-2 text-[11px] tracking-[0.16em] uppercase text-muted-foreground hover:text-accent transition-colors border-b border-transparent hover:border-accent/40 pb-1 sm:tracking-[0.22em]"
      >
        <span aria-hidden>←</span>
        <span>{l(t.common.backToHome)}</span>
      </Link>
    </div>
  );
}
