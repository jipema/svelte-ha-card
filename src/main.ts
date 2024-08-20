import ExampleCard from "./example/ExampleCard.svelte";
import { defineCard } from "./lib/index";

// mount if target found, typically on local dev
const target = document.getElementById("app");
const app = !!target && new ExampleCard({ target });

// define the new card
defineCard("svelte-ha-card", ExampleCard);

export default app;
