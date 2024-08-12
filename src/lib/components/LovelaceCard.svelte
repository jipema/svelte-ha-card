<script lang="ts">
  import { getContext } from "svelte";
  import type { HassProps } from "../types";

  export let config: HassProps["config"] & { type: string };

  const hass = getContext("hass");

  let el: HTMLElement & { hass: typeof hass; config: typeof config };
  $: {
    if (el && hass && !el?.hass) {
      el.config = config;
      el.hass = hass;
    }
  }
</script>

{#if config?.type}
  <hui-card bind:this={el} />
{/if}
