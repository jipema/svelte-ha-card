<script lang="ts">
  import type { HassProps } from "./types/hass";

  export let hass: HassProps["hass"];
  export let config: HassProps["config"];
  export let lovelace: HassProps["lovelace"];
  export let panel: HassProps["panel"];
  export let route: HassProps["route"];
  export let narrow: HassProps["narrow"];
  export let isConfig: HassProps["isConfig"];
  export let updateConfig: HassProps["updateConfig"];
  console.log(">> I am a mounted svelte component", route, hass, panel, lovelace, narrow, config, isConfig);

  $: {
    console.log(">> upd config", config);
  }
  $: {
    console.log(">> upd lovelace", lovelace);
  }
  $: {
    console.log(">> upd isConfig", isConfig);
  }
</script>

{#if !isConfig}
  <ha-card>
    <div class="background" aria-labelledby="info" role="button" tabindex="0">
      <ha-ripple aria-hidden="true"></ha-ripple>
    </div>
    <div class="content">
      <h2>{import.meta.env.CARD_COMPONENT_NAME}</h2>
      <p>I am a Svelte component Card, HA has {Object.keys(hass?.states || {})?.length} entities</p>

      <pre>{JSON.stringify(config, null, 2)}</pre>
      {#if lovelace?.editMode}
        <button>Add Card</button>
      {/if}
    </div>
  </ha-card>
{:else}
  <ha-card>
    <div class="content">
      <h2>CONFIG: {import.meta.env.CARD_COMPONENT_NAME}</h2>
      <button on:click={() => updateConfig?.({ ...(config || {}), updated: new Date().getTime() })}
        >Update Config</button
      >
    </div>
  </ha-card>
{/if}

<style>
  .content > h2 {
    color: purple !important;
  }
</style>
