import type { FocusEvent, PointerEvent } from "react";

type SpotlightElement = HTMLElement & {
  dataset: DOMStringMap & { spotlightActive?: string };
};

export function updateCaseSpotlight(event: PointerEvent<SpotlightElement>) {
  if (event.pointerType === "touch") return;

  const element = event.currentTarget;
  const bounds = element.getBoundingClientRect();
  const x = ((event.clientX - bounds.left) / bounds.width) * 100;
  const y = ((event.clientY - bounds.top) / bounds.height) * 100;

  element.style.setProperty("--case-spotlight-x", `${x.toFixed(2)}%`);
  element.style.setProperty("--case-spotlight-y", `${y.toFixed(2)}%`);
  element.dataset.spotlightActive = "true";
}

export function clearCaseSpotlight(event: PointerEvent<SpotlightElement>) {
  event.currentTarget.dataset.spotlightActive = "false";
}

export function focusCaseSpotlight(event: FocusEvent<SpotlightElement>) {
  const element = event.currentTarget;
  element.style.setProperty("--case-spotlight-x", "50%");
  element.style.setProperty("--case-spotlight-y", "50%");
  element.dataset.spotlightActive = "true";
}

export function blurCaseSpotlight(event: FocusEvent<SpotlightElement>) {
  event.currentTarget.dataset.spotlightActive = "false";
}
