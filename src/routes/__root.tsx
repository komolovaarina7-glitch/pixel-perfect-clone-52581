import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { LanguageProvider } from "@/i18n";

function getStoredLanguage() {
  if (typeof window === "undefined") return "en";
  return window.localStorage.getItem("reposition-lab-language") === "ru" ? "ru" : "en";
}

function NotFoundComponent() {
  const language = getStoredLanguage();
  const copy = {
    title: language === "ru" ? "Страница не найдена" : "Page not found",
    body:
      language === "ru"
        ? "Страница, которую вы ищете, не существует или была перемещена."
        : "The page you're looking for doesn't exist or has been moved.",
    home: language === "ru" ? "На главную" : "Go home",
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{copy.title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{copy.body}</p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {copy.home}
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const language = getStoredLanguage();
  const copy = {
    title: language === "ru" ? "Страница не загрузилась" : "This page didn't load",
    body:
      language === "ru"
        ? "Что-то пошло не так. Можно попробовать обновить страницу или вернуться на главную."
        : "Something went wrong on our end. You can try refreshing or head back home.",
    retry: language === "ru" ? "Попробовать снова" : "Try again",
    home: language === "ru" ? "На главную" : "Go home",
  };

  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">{copy.title}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{copy.body}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="premium-action inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium"
          >
            {copy.retry}
          </button>
          <a
            href="/"
            className="premium-action inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium"
          >
            {copy.home}
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "REPOSITION LAB — Strategic Real Estate Repositioning & Recovery Intelligence" },
      {
        name: "description",
        content:
          "Strategic repositioning and recovery intelligence for distressed, underutilized and misunderstood real estate. For banks, family offices, special situations capital and institutional owners.",
      },
      { name: "author", content: "REPOSITION LAB" },
      { property: "og:title", content: "REPOSITION LAB" },
      {
        property: "og:description",
        content: "Strategic Real Estate Repositioning & Recovery Intelligence.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <GlobalScrollReveal />
        <SiteHeader />
        <main>
          <Outlet />
        </main>
        <SiteFooter />
      </LanguageProvider>
    </QueryClientProvider>
  );
}

function GlobalScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const observed = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("global-scroll-reveal--visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );

    const register = (root: ParentNode = document) => {
      const textItems = root.querySelectorAll<HTMLElement>(
        "main h1, main h2, main h3, main h4, main p, main blockquote, main li, main fieldset",
      );
      const imageItems = root.querySelectorAll<HTMLImageElement>("main img");
      const targets = new Set<HTMLElement>();

      textItems.forEach((item) => {
        if (
          item.closest(".castle-line-drawing") ||
          item.closest('[role="slider"]') ||
          item.classList.contains("page-reveal") ||
          item.classList.contains("hero-text-reveal")
        ) {
          return;
        }
        targets.add(item);
      });

      imageItems.forEach((image) => {
        if (
          image.closest(".castle-line-drawing") ||
          image.closest('[role="slider"]') ||
          image.closest(".case-photo-reveal")
        ) {
          return;
        }
        targets.add(image.parentElement ?? image);
      });

      targets.forEach((target) => {
        if (observed.has(target)) return;
        observed.add(target);
        target.classList.add("global-scroll-reveal");
        observer.observe(target);
      });
    };

    const mutationObserver = new MutationObserver(() => register());
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      secondFrame = window.requestAnimationFrame(() => {
        register();
        document.documentElement.dataset.hydrated = "true";

        const main = document.querySelector("main");
        if (main) {
          mutationObserver.observe(main, { childList: true, subtree: true });
        }
      });
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
      delete document.documentElement.dataset.hydrated;
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, []);

  return null;
}
