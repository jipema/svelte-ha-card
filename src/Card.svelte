<svelte:options
  customElement={{
    tag: "svelte-ha-test",
    extend: extendSvelteCustomElement(),
  }}
/>

<script lang="ts">
  import type { ChangeEventHandler } from "svelte/elements";
  import HaDialog from "./utils/HaDialog.svelte";
  import { extendSvelteCustomElement } from "./utils/svelteHaCustomElement";

  // props
  export let hass: Record<string, unknown>;
  export let isConfig: boolean;
  export let config: Record<string, unknown>;
  export let openMoreInfo: (entityId: string) => void;
  export let updateConfig: (newConfig: typeof config) => void;

  // state
  let showDialog = false;

  // config update
  const handleConfigChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    if (!isConfig || !e?.currentTarget || !updateConfig) return;
    try {
      const newConfigObj = JSON.parse(e.currentTarget.value);
      if (newConfigObj) updateConfig(newConfigObj);
    } catch (err) {
      //invalid config
    }
  };
</script>

{#if !isConfig}
  <ha-card class="demo">
    <h1>Svelte HA Card</h1>
    <p>
      HASS has {Object.keys(hass?.states || {}).length} entities.
    </p>

    <h3>Current card config:</h3>
    <pre>{JSON.stringify(config || {}, null, 2)}</pre>
    {#if hass}
      <h3>Actions:</h3>
      <button on:click={() => openMoreInfo?.("sun.sun")}>
        openMoreInfo("sun.sun")
      </button>
      <button on:click={() => (showDialog = !showDialog)}>Dialog</button>
    {/if}
  </ha-card>
{:else}
  <div class="config">
    <h2>Card config</h2>
    <p>
      This part should be displayed when <code>isConfig</code>, for editing the
      card: it could be any UI, and should trigger
      <code>updateConfig(newConfig)</code> on changes.
    </p>
    <h3>Update card config:</h3>
    <textarea on:change={handleConfigChange}
      >{JSON.stringify(config || {}, null, 2)}</textarea
    >
  </div>
{/if}

{#if showDialog}
  <HaDialog title="Demo Dialog" onClose={() => (showDialog = false)}>
    <p>This Dialog can have any content, even another lovelace card:</p>
    <hui-card
      {hass}
      config={{
        type: "entities",
        entities: [{ entity: "sun.sun" }, { entity: "sensor.moon_phase" }],
      }}
    />
  </HaDialog>
{/if}

<style lang="scss">
  h1,
  h2,
  h3 {
    margin: 0;
  }

  p {
    margin: 0.5rem 0;
  }

  textarea,
  pre {
    box-sizing: border-box;
    width: 100%;
    margin: 0.5rem 0;
    padding: 1rem;
    border-radius: var(--ha-card-border-radius, 12px);
  }

  .demo {
    padding: 2rem;

    pre {
      border: 1px solid var(--ha-card-border-color, #e0e0e0);
      background: var(--primary-background-color);
    }
  }
  .config {
    h2 {
      color: var(--accent-color);
    }
    textarea {
      min-height: 8lh;
      resize: vertical;
    }
  }
</style>
