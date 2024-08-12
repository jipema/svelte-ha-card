<script lang="ts">
  export let title: HTMLElement | string | undefined = undefined;
  export let titleHover: string | undefined = undefined;
  export let fullScreenOnMobile: boolean = true;
  export let onClose: (() => void) | undefined = undefined;

  let dialogRef: HTMLElement;
  $: {
    if (dialogRef && dialogRef?.shadowRoot && !dialogRef.classList.contains("svc")) {
      dialogRef.addEventListener("closed", () => onClose?.());
      dialogRef.classList.add("svc");

      const styleEl = document.createElement("style");
      styleEl.innerHTML = `
      :host{
        --mdc-dialog-min-width: 400px;
        --mdc-dialog-max-width: min(600px, 95vw);
        --justify-action-buttons: space-between;
        --vertical-align-dialog: flex-start;
        --dialog-surface-margin-top: 40px;
        --dialog-surface-position: static;
        --dialog-content-position: static;
        --dialog-content-padding: 0;
        --chart-base-position: static;
      } 
      @media (max-width: 450px), (max-height: 500px){
        :host{
          ${
            fullScreenOnMobile
              ? `--mdc-dialog-min-width: calc( 100vw - env(safe-area-inset-right) - env(safe-area-inset-left) );
          --mdc-dialog-max-width: calc( 100vw - env(safe-area-inset-right) - env(safe-area-inset-left) );
          --mdc-dialog-min-height: 100%;
          --mdc-dialog-max-height: 100%;
          --vertical-align-dialog: flex-end;
          --ha-dialog-border-radius: 0;`
              : ``
          }
      }}`;

      dialogRef?.shadowRoot.appendChild(styleEl);
    }
  }
</script>

<ha-dialog open hideactions flexcontent bind:this={dialogRef}>
  <div class="dialog-wrapper" style={'display: "flex"; flex-direction: "column"; height: "100%"; overflow: "hidden"'}>
    {#if title || titleHover || onClose}
      <ha-dialog-header slot="heading">
        {#if onClose}
          <ha-icon-button slot="navigationIcon" dialogaction="cancel">
            <svg
              preserveAspectRatio="xMidYMid meet"
              focusable="false"
              role="img"
              aria-hidden="true"
              viewBox="0 0 24 24"
            >
              <g>
                <path
                  class="primary-path"
                  d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
                ></path>
              </g>
            </svg>
          </ha-icon-button>
        {/if}
        {#if title || titleHover}
          <span slot="title" title={titleHover || (typeof title === "string" ? title : undefined)}>
            {title || titleHover}
          </span>
        {/if}
      </ha-dialog-header>
    {/if}
    <div
      class="content"
      style={`padding: 16px; ${!!(title || titleHover) ? "padding-top: 0;" : undefined} flex-grow: 2; overflow-y: "auto"`}
    >
      <slot />
    </div>
  </div>
</ha-dialog>
