// @ts-check
import { defineConfig } from "astro/config";
import { unified } from "@astrojs/markdown-remark";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

const inactiveSitemapPaths = ["/posts/", "/talks/", "/teaching/"];

export default defineConfig({
  site: "https://duongtruongbinh.github.io",

  markdown: {
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [rehypeKatex],
    }),
  },

  build: {
    inlineStylesheets: "always",
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      filter(page) {
        const { pathname } = new URL(page);
        return !inactiveSitemapPaths.some((path) => pathname.startsWith(path));
      },
    }),
  ],
});
