export function extendSvelteCustomElement(options = {}) {
    return function extendedSvelteCustomElement(customElementConstructor) {
        return class extends customElementConstructor {
            host;
            config = {};
            lovelace = {};
            narrow = false;
            isConfig;
            constructor(isConfig) {
                super();
                this.host = this;
                this.isConfig = isConfig || false;
                this.openMoreInfo = this.openMoreInfo.bind(this);
                this.closeMoreInfo = this.closeMoreInfo.bind(this);
                this.updateConfig = this.updateConfig.bind(this);
            }
            setConfig(config) {
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
            updateConfig(newConfig) {
                if (!this)
                    return;
                const event = new CustomEvent("config-changed", {
                    bubbles: true,
                    composed: true,
                    detail: { config: newConfig },
                });
                this.dispatchEvent(event);
            }
            openMoreInfo(entityId) {
                if (!this)
                    return;
                const event = new CustomEvent("hass-more-info", {
                    bubbles: true,
                    composed: true,
                    detail: { entityId },
                });
                this.dispatchEvent(event);
            }
            closeMoreInfo() {
                if (!this)
                    return;
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
export function defineCard(cardName, cardComponent, friendlyName, description, documentationURL) {
    if (!cardName || !cardComponent?.element)
        return;
    window.customCards = window.customCards || [];
    if (window.customCards.find((c) => c.type === cardName))
        return;
    if (!customElements.get(cardName))
        customElements.define(cardName, cardComponent.element);
    window.customCards.push({
        type: cardName,
        name: friendlyName || cardName,
        description,
        documentationURL,
    });
}
