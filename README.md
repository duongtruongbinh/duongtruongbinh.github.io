# Truong-Binh Duong Personal Website

Personal academic website for Truong-Binh Duong, built with Astro, Tailwind CSS v4, Markdown content collections, RSS, sitemap generation, and KaTeX math rendering.

## Requirements

- Node.js >= 22.12.0
- npm

## Commands

| Command           | Action                                 |
| :---------------- | :------------------------------------- |
| `npm run dev`     | Start the local development server     |
| `npm run build`   | Build the production site into `dist/` |
| `npm run preview` | Preview the production build locally   |
| `npm run format`  | Format files with Prettier             |

## Content

Site content is Markdown-driven:

- `src/content/bio.md`
- `src/content/cv.md`
- `src/content/publications/`
- `src/content/projects/`
- `src/content/posts/`
- `src/content/talks/`
- `src/content/teaching/`

Global site, page, navigation, social, theme, and analytics settings live in `src/config/`.
