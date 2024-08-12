<script lang="ts">
  import { setContext, SvelteComponent } from "svelte";
  import type { HassSvelteCardProps } from "../types";
  import HaDialog from "./HaDialog.svelte";
  import LovelaceCard from "./LovelaceCard.svelte";

  export let CardComponent: SvelteComponent;
  export let hass: HassSvelteCardProps["hass"];
  export let config: HassSvelteCardProps["config"];
  export let isConfig: HassSvelteCardProps["isConfig"];
  export let lovelace: HassSvelteCardProps["lovelace"];
  export let narrow: HassSvelteCardProps["narrow"];
  export let panel: HassSvelteCardProps["panel"];
  export let route: HassSvelteCardProps["route"];
  export let updateConfig: HassSvelteCardProps["updateConfig"];
  export let wrapInHaCard: HassSvelteCardProps["wrapInHaCard"];

  function openEntityMoreInfo(entityId: string) {
    const haEl = document.querySelector("home-assistant");
    if (!haEl) return;

    const event = new CustomEvent("hass-more-info", {
      detail: { entityId: entityId },
    });
    haEl.dispatchEvent(event);
  }
  function closeEntityMoreInfo() {}

  const props: HassSvelteCardProps = {
    hass,
    config,
    isConfig,
    lovelace,
    narrow,
    panel,
    route,
    updateConfig,
    components: { HaDialog, LovelaceCard },
    openEntityMoreInfo,
    closeEntityMoreInfo,
  };

  $: {
    setContext("hass", hass);
  }
</script>

{#if hass && CardComponent}
  {#if !wrapInHaCard}
    <svelte:component this={CardComponent} {...props} />
  {:else}
    <ha-card>
      <div class="background" aria-labelledby="info" role="button" tabindex="0">
        <ha-ripple aria-hidden="true"></ha-ripple>
      </div>
      <div class="content">
        <svelte:component this={CardComponent} {...props} />
      </div>
    </ha-card>
  {/if}
{/if}
