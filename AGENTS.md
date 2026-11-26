# AGENTS.md

This is a focused academic profile, not a generic CMS/blog. Prefer simple page-specific components over speculative generic abstractions.

## Commands

- `npm run dev` - Start dev server
- `npm run build` - Production build
- `npm run preview` - Preview build
- `npm run format` - Format files with Prettier
- `npm run format:check` - Check formatting
- `npm run check` - Run Astro and TypeScript diagnostics
- `npm test` - Run site tests against `dist/` (build first)
- `npm run verify` - Run formatting, checks, production build, and site tests

## Requirements

- Node.js 24 LTS or newer
- TypeScript stays on 6.x: `astro check` (used by `npm run verify`) does not support TypeScript 7.0. Revisit once TypeScript 7.1 is stable and Astro's type checking supports it.

## Public Routes

- `/` - About, Research Interests, and News
- `/publications` - Year-grouped academic publication list
- `/cv` - Redirects to the PDF (excluded from the sitemap); the CV navigation link opens the PDF directly
- `/404` - Not-found page (`noindex`)

Do not add public Blog, Tags, Projects, Talks, Teaching, News archive, RSS, or publication-detail routes unless explicitly requested.

## Architecture

- **Layout:** `src/layouts/BaseLayout.astro` with the two-column sidebar/main structure, SEO tags, and the inline theme script
- **Page-specific components:** `src/components/home/NewsList.astro`, `src/components/home/ResearchLoop.astro`, `src/components/publications/PublicationItem.astro`
- **Shared components:** layout components (including `VisitorMap.astro`), `ContentLinks.astro`, and `Icon.astro` (SVGs in `src/assets/icons/`)
- **Content:** `src/content/bio.md` (biography and exactly three research interests) and frontmatter-only files in `src/content/publications/`
- **Data:** `src/data/news.ts`
- **Helpers:** `src/utils/publications.ts`
- **Config:** `src/config/` for site, navigation, social, theme, visitor map, and analytics settings
- **Styles:** `src/styles/global.css` for theme tokens and shared/page-specific styles

## Constraints

- Keep public navigation exactly Home, Publications, CV unless requirements change.
- CV opens `public/CV.pdf` at `/CV.pdf` as a static file, without forcing a download.
- Keep News on the homepage; do not create news detail/archive pages.
- Research interests render inside the Perceive → Model → Act diagram; do not add a second, separate interests list.
- The research illustrations are inline SVGs in `ResearchLoop.astro`, coloured only through `ri-*` classes in `global.css` (theme tokens), with motion disabled under `prefers-reduced-motion`.
- Publication titles are plain text. External resources use compact labeled links.
- Publication figures are the complete original figures from the highest-resolution source, trimmed of surrounding whitespace only; do not crop them to a sub-region. Record sources in `src/assets/publications/SOURCES.md`.
- Render publication authors structurally and bold exactly `Truong-Binh Duong` (a trailing `*` equal-contribution marker is allowed); do not inject raw HTML.
- Publications are grouped by year from the `date` frontmatter (conference date, `YYYY-MM` or `YYYY-MM-DD`); within a year, first-author papers come first, then newest date.
- BibTeX comes from the DOI record or the official proceedings; use arXiv BibTeX only when no other record exists.
- Do not invent DOI, volume, pages, dates, BibTeX fields, or publication status.
- `SITE.lastUpdated` is the latest git commit date at build time; do not hard-code it.
- Navigation uses native cross-document view transitions (`@view-transition`); do not reintroduce Astro's `ClientRouter`.
- The visitor map only contacts the live counter on the production host and keeps the counter's built-in pageview text.
- Do not add `<style>` blocks in `.astro` files; use `global.css` or Tailwind utilities.
- Element defaults in `global.css` stay inside `@layer base` so Tailwind utilities can override them.
- JSON-LD in `BaseLayout.astro` is one `@graph` (Person, WebSite, and the current page; the homepage is a `ProfilePage`). Person details come from `SITE` and `SOCIALS`; keep it factual.
- Preserve the clean two-column academic layout, responsive behavior, SEO, accessibility, and light/dark themes.
- Theme colors in `src/styles/global.css` are the single source of truth; do not hard-code colors in rules.
- Tailwind CSS 4 uses `@tailwindcss/vite` without `tailwind.config.js`.
- Keep original images out of `public/` (e.g. the original portrait is `src/assets/profile.jpg`), since everything in `public/` is published.
