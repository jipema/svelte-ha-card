// @ts-nocheck
import type { SvelteComponent } from "svelte";
import type { HassProps } from "../types/hass";

export function getSvelteHaCustomElement(cardName: string, Component: Partial<SvelteComponent>) {
  return class SvelteHaCustomElement extends HTMLElement {
    _element: HTMLElement | undefined = undefined;
    _haProps: HassProps = {
      hass: undefined,
      lovelace: undefined,
      panel: undefined,
      route: undefined,
      narrow: undefined,
      config: undefined,
      isConfig: false,
      updateConfig: undefined,
    };
    _ready: boolean = false;

    connectedCallback() {
      if (!Component) return console.error("Invalid/empty Svelte Component passed to constructor", Component);
      this._element = new Component({ target: this });
      if (!this._element?.$set)
        return console.error("Unable to instantiate Svelte Component as Custom Element", this._element);
      this._element.$set(this._haProps);
    }
    disconnectedCallback() {
      if (this._element) this._element.$destroy();
    }

    set hass(hass: Record<string, unknown>) {
      this.updateHassProp("hass", hass);
    }
    set panel(panel: Record<string, unknown>) {
      this.updateHassProp("panel", panel);
    }
    set narrow(narrow: boolean) {
      this.updateHassProp("narrow", narrow);
    }
    set route(route: Record<string, unknown>) {
      this.updateHassProp("route", route);
    }
    set lovelace(lovelace: Record<string, unknown>) {
      this.updateHassProp("lovelace", lovelace);
    }
    set isConfig(isConfig: boolean) {
      this.updateHassProp("isConfig", isConfig);
    }
    set updateConfig(updateConfig: (newConfig: Record<string, unknown>) => void) {
      this.updateHassProp("updateConfig", updateConfig);
    }
    setConfig(config: Record<string, unknown>) {
      this.updateHassProp("config", config);
    }

    // card config
    static getStubConfig() {
      return { entity: "sun.sun", updated: null };
    }
    static getConfigElement() {
      const configCard = document.createElement(`${cardName}`);
      configCard.isConfig = true;
      configCard.updateConfig = (newConfig: typeof this._haProps.config) => {
        configCard?.setConfig?.(newConfig);
        const event = new Event("config-changed", {
          bubbles: true,
          composed: true,
        });
        event.detail = { config: newConfig };
        configCard?.dispatchEvent?.(event);
      };
      return configCard;
    }

    updateHassProp(propName: string, value: unknown) {
      if (!propName) return;
      this._haProps[propName] = value;
      if (this._element?.$set) {
        if (!this._ready) {
          this._ready = true;
          this._element?.$set(this._haProps);
          console.log(">>> init", this._haProps);
        } else {
          this._element.$set({ [propName]: value });
        }
      }
    }
  };
}
