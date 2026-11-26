// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const site = "https://duongtruongbinh.github.io";

export default defineConfig({
  site,

  build: {
    inlineStylesheets: "always",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  // `/cv/` only redirects to the PDF, so it is not an indexable page.
  integrations: [sitemap({ filter: (page) => page !== `${site}/cv/` })],
});
