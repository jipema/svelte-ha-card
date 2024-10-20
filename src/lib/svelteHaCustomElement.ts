import type { ComponentType } from "svelte";

// types
declare global {
  interface Window {
    customCards?: CustomCard[];
  }
}
export type CustomCard = {
  type: string;
  name: string;
  description?: string;
  documentationURL?: string;
};
export type CardOptions = {
  layoutOptions?: {
    grid_rows?: number; //Default number of rows the card takes
    grid_min_rows?: number; // Minimal number of rows the card takes
    grid_max_rows?: number; //Maximal number of rows the card takes
    grid_columns?: number; //Default number of columns the card takes
    grid_min_columns?: number; //Minimal number of columns the card takes
    grid_max_columns?: number; //Maximal number of columns the card takes
  };
  cardSize?: number;
  stubConfig?: Record<string, unknown>;
};

export function extendSvelteCustomElement(options: CardOptions = {}) {
  return function extendedSvelteCustomElement(
    customElementConstructor: CustomElementConstructor
  ) {
    return class extends customElementConstructor {
      host?: HTMLElement;
      config: Record<string, unknown> = {};
      public lovelace: Record<string, unknown> = {};
      public narrow: boolean = false;
      public isConfig: boolean;

      constructor(isConfig?: boolean) {
        super();
        this.host = this;
        this.isConfig = isConfig || false;
        this.openMoreInfo = this.openMoreInfo.bind(this);
        this.closeMoreInfo = this.closeMoreInfo.bind(this);
        this.updateConfig = this.updateConfig.bind(this);
      }

      setConfig(config: Record<string, unknown>) {
        this.config = config;
      }

      static getCardSize() {
        return options.cardSize;
      }

      static getLayoutOptions() {
        return options.layoutOptions;
      }

      static getConfigElement() {
        return new this(true);
      }
      static getStubConfig() {
        return options.stubConfig;
      }

      public updateConfig(newConfig: typeof this.config) {
        if (!this) return;
        const event = new CustomEvent("config-changed", {
          bubbles: true,
          composed: true,
          detail: { config: newConfig },
        });
        this.dispatchEvent(event);
      }
      public openMoreInfo(entityId: string) {
        if (!this) return;
        const event = new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          detail: { entityId },
        });
        this.dispatchEvent(event);
      }
      public closeMoreInfo() {
        if (!this) return;
        const event = new CustomEvent("hass-more-info", {
          bubbles: true,
          composed: true,
          detail: { entityId: null },
        });
        this.dispatchEvent(event);
      }
    };
  };
}

export function defineCard(
  cardName: string,
  cardComponent: ComponentType,
  friendlyName?: string,
  description?: string,
  documentationURL?: string
) {
  if (!cardName || !cardComponent?.element) return;

  window.customCards = window.customCards || [];
  if (window.customCards.find((c) => c.type === cardName)) return;

  if (!customElements.get(cardName))
    customElements.define(cardName, cardComponent.element);

  window.customCards.push({
    type: cardName,
    name: friendlyName || cardName,
    description,
    documentationURL,
  });
}
