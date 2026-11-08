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

- `src/content/bio.md` — biography and research interests.
- `src/content/publications/` — publication records and resource links.
- `src/data/news.ts` — homepage news.
- `public/CV.pdf` — CV opened directly from navigation.
- `src/config/` — site details, navigation, and social links.

After editing the website or replacing the CV, update `SITE.lastUpdated` in
`src/config/site.ts`. `src/content/cv.md` holds retained CV notes and is not displayed.

Institution logos use official brand assets. Keep `public/profile.jpg` as the
original when updating the optimized portrait.

## Check and publish

```sh
npm run verify
```

This checks formatting, types, the production build, and site tests.

Pushing to `main` deploys to GitHub Pages through the existing workflow.
