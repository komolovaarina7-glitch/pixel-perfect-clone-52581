import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  nitro: {
    preset: "vercel",
    output: {
      dir: ".vercel/output",
    },
  },

  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});