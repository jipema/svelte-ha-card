import Card from "./Card.svelte";
import { defineCard } from "./utils/svelteHaCustomElement";

// mount if target found, typically on local dev
const target = document.getElementById("app");
const app = !!target && new Card({ target });

// define the new card
defineCard("svelte-ha-test", Card);

export default app;
