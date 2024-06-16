import type { SvelteComponent } from "svelte";

// utils
import { getSvelteHaCustomElement } from "./utils/getSvelteHaCustomElement";

//components
import Card from "./Card.svelte";

//config
const CARD_COMPONENT_NAME = import.meta.env.CARD_COMPONENT_NAME || process.env.CARD_COMPONENT_NAME || "unname-card";

let app: SvelteComponent | undefined;
const target = document.getElementById("app");
if (!target) {
  console.log(">>> No App target: Exporting as CustomElement", { Card, CARD_COMPONENT_NAME });
  customElements.define(CARD_COMPONENT_NAME, getSvelteHaCustomElement(CARD_COMPONENT_NAME, Card));

  // @ts-ignore
  window.customCards = window.customCards || [];
  // @ts-ignore
  window.customCards.push({
    type: CARD_COMPONENT_NAME,
    name: "Svelte Demo Card",
    preview: false, // Optional - defaults to false
    description: "A custom svelte card",
    documentationURL: "https://developers.home-assistant.io/docs/frontend/custom-ui/custom-card/",
  });
} else {
  console.log(">>> App target found: Mounting", { Card, target });
  app = new Card({ target });
}

export default app;
