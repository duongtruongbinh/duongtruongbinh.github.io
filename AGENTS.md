# AGENTS.md

This is a focused academic profile, not a generic CMS/blog. Prefer simple page-specific components over speculative generic abstractions.

## Commands

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run format` - Format files with Prettier
- `npm run format:check` - Check formatting
- `npm run check` - Run Astro and TypeScript diagnostics
- `npm run verify` - Run formatting, checks, and production build

## Requirements

- Node.js 24 LTS or newer

## Public Routes

- `/` - About, News, and Research Interests
- `/publications` - Year-grouped academic publication list
- `/cv` - Education and Research & Teaching Experience

Do not add public Blog, Tags, Projects, Talks, Teaching, News archive, RSS, or publication-detail routes unless explicitly requested.

## Architecture

- **Layout:** `src/layouts/BaseLayout.astro` with the two-column sidebar/main structure
- **Page-specific components:** `src/components/home/NewsList.astro`, `src/components/publications/PublicationItem.astro`
- **Shared components:** layout components, `ContentLinks.astro`, `Icon.astro`, and `Timeline.astro`
- **Content:** `src/content/bio.md`, `src/content/cv.md`, and frontmatter-only files in `src/content/publications/`
- **Data:** `src/data/news.ts`
- **Config:** `src/config/` for site, navigation, social, theme, and analytics settings
- **Styles:** `src/styles/global.css` for theme tokens and shared/page-specific styles

## Constraints

- Keep public navigation exactly About, Publications, CV unless requirements change.
- Keep News on the homepage; do not create news detail/archive pages.
- Publication titles are plain text. External resources use compact labeled links.
- Render publication authors structurally and bold exactly `Truong-Binh Duong`; do not inject raw HTML.
- Do not invent DOI, volume, pages, dates, or publication status.
- Do not add `<style>` blocks in `.astro` files; use `global.css` or Tailwind utilities.
- Preserve the clean two-column academic layout, responsive behavior, SEO, accessibility, and light/dark themes.
- Theme colors in `src/styles/global.css` are the single source of truth.
- Tailwind CSS 4 uses `@tailwindcss/vite` without `tailwind.config.js`.
