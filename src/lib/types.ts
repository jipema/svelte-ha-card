import type { HomeAssistant, Panel } from "custom-card-helpers";

import HaDialog from "../components/HaDialog.svelte";
import LovelaceCard from "../components/LovelaceCard.svelte";

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

export type HassSvelteCardProps = HassProps & {
  wrapInHaCard?: boolean;
  components: { HaDialog: typeof HaDialog; LovelaceCard: typeof LovelaceCard };
  openEntityMoreInfo: (entityId: string) => void;
  closeEntityMoreInfo: () => void;
};
