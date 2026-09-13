# Truong-Binh Duong Personal Website

A focused academic profile for Truong-Binh Duong, built with Astro 7 and Tailwind CSS 4 and deployed with GitHub Pages.

Public content is intentionally limited to:

- About, research interests, and homepage news
- Publications grouped by year
- Curriculum vitae

This is a focused academic profile, not a generic CMS/blog. Prefer simple page-specific components over speculative generic abstractions.

## Requirements

- Node.js 24 LTS or newer
- npm

## Commands

| Command                | Action                                        |
| :--------------------- | :-------------------------------------------- |
| `npm run dev`          | Start the local development server            |
| `npm run build`        | Build the production site into `dist/`        |
| `npm run preview`      | Preview the production build locally          |
| `npm run format`       | Format files with Prettier                    |
| `npm run format:check` | Check formatting without changing files       |
| `npm run check`        | Run Astro and TypeScript diagnostics          |
| `npm run verify`       | Run formatting, type checks, and a full build |

## Content

- `src/content/bio.md` — homepage biography and research interests
- `src/data/news.ts` — compact homepage news entries, newest first
- `src/content/publications/` — frontmatter-only publication records
- `src/content/cv.md` — education and research/teaching experience

Site, navigation, social, theme, and analytics settings live in `src/config/`. Theme tokens live in `src/styles/global.css` as the single source of truth.
