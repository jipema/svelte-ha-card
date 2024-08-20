import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
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
