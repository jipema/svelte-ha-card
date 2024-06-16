import type { HomeAssistant, Panel } from "custom-card-helpers";

type Entity = HomeAssistant["states"][number];
export type { HomeAssistant, Entity, Panel };

export type HassProps = {
  hass?: HomeAssistant;
  narrow?: boolean;
  panel?: Panel;
  lovelace?: Record<string, unknown>;
  route?: Record<string, unknown>;
  config?: Record<string, unknown>;
  isConfig?: boolean;
  updateConfig?: (newConfig: HassProps["config"]) => void;
};
