# Truong-Binh Duong Personal Website

A focused academic profile for Truong-Binh Duong, built with Astro 7 and Tailwind CSS 4 and deployed with GitHub Pages.

Public content is intentionally limited to:

- About, research interests, and homepage news
- Publications grouped by year
- Curriculum vitae as a PDF, opened directly from navigation

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
| `npm test`             | Check the generated site after a build        |
| `npm run verify`       | Run formatting, type checks, build, and tests |

## Content

- `src/content/bio.md` — homepage biography and research interests, each with a title, description, and research context
- `src/data/news.ts` — compact homepage news entries, newest first
- `src/content/publications/` — frontmatter-only publication records
- `public/CV.pdf` — published curriculum vitae
- `src/content/cv.md` — retained education and experience notes; not rendered

Site, navigation, social, theme, and analytics settings live in `src/config/`. Theme tokens live in `src/styles/global.css` as the single source of truth.

## CV and update dates

Replace `public/CV.pdf` to update the CV. Navigation opens this PDF directly at
`/CV.pdf` in the browser, without a `download` attribute. Astro serves it as a
static file in development and copies it unchanged into the production build.
The old `/cv` route redirects to the same PDF, including on GitHub Pages.

Update `SITE.lastUpdated` in `src/config/site.ts` when editing the website or
replacing the PDF. This is an editorial date (`YYYY-MM-DD`), not a build timestamp.

## Visitor map

The public MapMyVisitors widget ID and verified statistics URL are configured in
`VISITOR_MAP` in `src/config/site.ts`. The map appears only below the About page
content. Production visits to HTML pages are still counted. On the production
domain, `duongtruongbinh.github.io`, it loads the live
provider image. Localhost and preview domains show a local snapshot. The About
page displays only the map, with no heading or caption; click it to open detailed
statistics. Preview information remains in the image's accessible description.

The [provider's image embed](https://mapmyvisitors.com/b/features) needs no map
library or third-party JavaScript. Its image loads at low priority without waiting
for scrolling, so visits can be counted even if readers never reach the footer.
Localhost and preview domains never request the production counter. The snapshot
is stored in `public/visitor-map-preview.png`. Blocked
images are hidden. Without JavaScript, the About page shows the linked snapshot.

Locations are approximate IP geolocation, not personal identities or GPS
positions. VPNs, blockers, caching, and the provider's refresh cycle can affect
coverage and freshness. Image colors follow the theme at page entry; changing
themes does not request another image or add a tracking hit.

The optimized portrait is cropped from `public/profile.jpg`; keep the original
when replacing the portrait. `public/og-image.png` is the dedicated social sharing
image (1200 × 630).

The local INRS logos (`public/inrs-logo.png` and `public/inrs-logo-white.png`)
come from the [official horizontal web logo package](https://inrs.ca/wp-content/uploads/2020/09/INRS-Logo-pour-le-web-horizontal.zip).
Only the INRS lettermark is cropped from the original lockup; its proportions and
colors are preserved, with the white version used in dark mode.
See the [INRS visual identity guidance](https://inrs.ca/linrs/directions-et-services/service-des-communications/logo-et-identite-visuelle/).

Astro's built-in client router keeps the profile sidebar in place during internal
navigation. Theme controls and the visitor map initialize after page changes;
the CV PDF uses ordinary browser navigation.

If a running dev server reports missing content after a collection schema change,
restart it to reload the schema (`nvm use`, then `npm run dev`). The repository
requires Node 24 or newer. `npm run test:dev` checks routes against the running dev
server; use `DEV_URL` if it is running somewhere other than localhost:4321.
