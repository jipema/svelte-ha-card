import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

const IS_DEV = process.env.IS_DEV === "true";

export default defineConfig({
  build: {
    sourcemap: IS_DEV,
    lib: IS_DEV
      ? undefined
      : {
          entry: "./src/lib/index.ts",
          name: "svelte-ha-card",
        },
    rollupOptions: {
      output: {
        entryFileNames: `svelte-ha-card.js`,
      },
    },
  },
  plugins: [
    svelte({
      compilerOptions: {
        customElement: true,
        css: "injected",
      },
    }),
  ],
});
