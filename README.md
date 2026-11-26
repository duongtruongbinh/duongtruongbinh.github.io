# Truong-Binh Duong

Personal academic website: biography, research interests, news, publications, and CV.
Built with Astro and Tailwind CSS; published at [duongtruongbinh.github.io](https://duongtruongbinh.github.io).

## Run locally

Requires Node.js 24 or newer and npm.

```sh
npm ci
npm run dev
```

## Update content

- `src/content/bio.md` — biography and the three research interests shown in the diagram.
- `src/content/publications/` — publication records: `date` (conference date, orders the list),
  resource links, and `bibtex` (from the DOI or official proceedings; arXiv only as a fallback).
- `src/assets/publications/` — publication figures: complete original figures with whitespace
  trimmed; sources are listed in `SOURCES.md`.
- `src/data/news.ts` — homepage news.
- `public/CV.pdf` — CV opened directly from navigation.
- `src/config/` — site details, navigation, and social links.

"Last updated" in the footer is the date of the latest git commit, so it updates on its own.

Institution logos use official brand assets. The original portrait is kept at
`src/assets/profile.jpg` (not published); `public/profile-portrait.webp` is the optimized copy.
`public/og-image.png`, `public/favicon.*`, and `public/apple-touch-icon.png` are generated images.

## Check and publish

```sh
npm run verify
```

This checks formatting, types, the production build, and site tests.

Pushing to `main` deploys to GitHub Pages through the existing workflow.
