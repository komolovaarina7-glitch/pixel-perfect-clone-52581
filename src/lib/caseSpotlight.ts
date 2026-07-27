import { useEffect } from "react";

const PROXIMITY_RADIUS = 180;

function setProximity(element: HTMLElement, proximity: number) {
  element.style.setProperty("--case-proximity", proximity.toFixed(3));
  element.dataset.spotlightActive = proximity > 0.01 ? "true" : "false";
}

export function useCaseSpotlightProximity() {
  useEffect(() => {
    let frame = 0;
    const getCards = () => Array.from(document.querySelectorAll<HTMLElement>(".case-spotlight"));

    const update = (event: MouseEvent) => {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(() => {
        getCards().forEach((card) => {
          const bounds = card.getBoundingClientRect();
          const horizontalDistance = Math.max(
            bounds.left - event.clientX,
            0,
            event.clientX - bounds.right,
          );
          const verticalDistance = Math.max(
            bounds.top - event.clientY,
            0,
            event.clientY - bounds.bottom,
          );
          const distance = Math.hypot(horizontalDistance, verticalDistance);
          const proximity = Math.max(0, 1 - distance / PROXIMITY_RADIUS);

          setProximity(card, proximity);
        });
      });
    };

    const clear = () => {
      window.cancelAnimationFrame(frame);
      getCards().forEach((card) => setProximity(card, 0));
    };

    window.addEventListener("mousemove", update, { passive: true });
    window.addEventListener("blur", clear);
    document.documentElement.dataset.caseSpotlightReady = "true";

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", update);
      window.removeEventListener("blur", clear);
      delete document.documentElement.dataset.caseSpotlightReady;
    };
  }, []);
}
