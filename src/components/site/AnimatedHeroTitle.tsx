import type { CSSProperties } from "react";

export function AnimatedHeroTitle({ children }: { children: string }) {
  let letterIndex = 0;

  return (
    <span aria-label={children}>
      {children.split(/(\s+)/).map((part, partIndex) => {
        if (/^\s+$/.test(part)) return <span key={`space-${partIndex}`}> </span>;

        return (
          <span aria-hidden="true" className="internal-hero-word" key={`${part}-${partIndex}`}>
            {Array.from(part).map((character) => {
              const currentIndex = letterIndex++;
              return (
                <span
                  className="internal-hero-letter"
                  key={`${character}-${currentIndex}`}
                  style={{ "--letter-index": currentIndex } as CSSProperties}
                >
                  {character}
                </span>
              );
            })}
          </span>
        );
      })}
    </span>
  );
}
