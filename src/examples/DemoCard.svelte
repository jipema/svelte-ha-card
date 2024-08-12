<script lang="ts">
  import type { HassSvelteCardProps } from "../lib/types";

  export let hass: HassSvelteCardProps["hass"];
  export let config: HassSvelteCardProps["config"];
  export let isConfig: HassSvelteCardProps["isConfig"];
  export let components: HassSvelteCardProps["components"];
  export let updateConfig: HassSvelteCardProps["updateConfig"];
  export let openEntityMoreInfo: HassSvelteCardProps["openEntityMoreInfo"];

  const { HaDialog, LovelaceCard } = components;

  let newConfig = JSON.stringify(config || {}, null, 2);
  let isDialogOpen: boolean = false;
  $: {
    if (isConfig) {
      try {
        const configObj = JSON.parse(newConfig);
        if (configObj && updateConfig) updateConfig(configObj);
      } catch (err) {
        //ignores invalid config obj
      }
    }
  }
  $: entitiesCount = Object.keys(hass?.states || {})?.length;
</script>

{#if !isConfig}
  <div class="content">
    <div class="header">
      <h2>{import.meta.env.CARD_COMPONENT_NAME}</h2>
      <p>I am a Svelte component Card, usable in Home Assistant.</p>
      <p>I also have a "config" view, that can be used when editing the dashboard.</p>
      <p>HA currently has {entitiesCount} entities.</p>
    </div>

    {#if !!hass}
      <div>
        <h4>Example of an embedded Lovelace Card:</h4>
        <LovelaceCard config={{ type: "energy-usage-graph" }} />
      </div>
      <div>
        <h4>Example of HA Actions:</h4>
        <button on:click={() => (isDialogOpen = true)}>Dialog</button>
        <button on:click={() => openEntityMoreInfo("sun.sun")}>More info (sun.sun)</button>
      </div>
    {/if}
  </div>

  {#if HaDialog && isDialogOpen}
    <HaDialog title="Demo dialog?" fullScreenOnMobile onClose={() => (isDialogOpen = false)}>
      <p>A card with some custom content. It could even be a lovelace card (eg sun.sun entity):</p>
      <LovelaceCard config={{ type: "entity", entity: "sun.sun" }} />
    </HaDialog>
  {/if}
{:else}
  <ha-card>
    <div class="content config">
      <p>
        Here could come any UI for the card configuration, to be updated using the <code>updateConfig()</code> prop callback:
      </p>
      <textarea bind:value={newConfig} />
    </div>
  </ha-card>
{/if}

<style>
  .content {
    padding: 1rem;

    & .header > h2 {
      margin: 0;
    }

    &.config textarea {
      width: 100%;
      resize: vertical;
      min-height: 8lh;
    }
  }
</style>
