import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import pckg from "./package.json";

const CARD_COMPONENT_NAME = process.env.CARD_COMPONENT_NAME || pckg.name || "unnamed-card";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isHass = !!process.env.IS_HASS;
  return {
    build: {
      sourcemap: isHass ? "inline" : false,
      rollupOptions: {
        output: {
          entryFileNames: `${CARD_COMPONENT_NAME}.js`,
        },
      },
    },
    plugins: [
      svelte({
        compilerOptions: { css: "injected" },
      }),
    ],
    define: {
      "import.meta.env.CARD_COMPONENT_NAME": `"${CARD_COMPONENT_NAME}"`,
    },
  };
});
