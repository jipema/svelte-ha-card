import type { SvelteComponent } from "svelte";

// utils
import { defineSvelteHaCard } from "./lib/haSvelteCard";

// svelte component
import DemoCard from "./examples/DemoCard.svelte";

//config
const CARD_COMPONENT_NAME = import.meta.env.CARD_COMPONENT_NAME || process.env.CARD_COMPONENT_NAME || "unname-card";

let app: SvelteComponent | undefined;
const target = document.getElementById("app");

// no mounting target: define new custom card
if (!target) {
  defineSvelteHaCard(CARD_COMPONENT_NAME, DemoCard);

  // mounting target found: render card for localhost dev
} else {
  app = new DemoCard({ target });
}

export default app;
