# Design Guide

## Purpose

This is a focused academic profile, not a generic CMS/blog. Prefer simple page-specific components over speculative generic abstractions.

The public experience consists only of About/Home, Publications, and CV. News belongs on the homepage. The design remains clean, minimal, content-first, and academic.

## Layout

- Preserve the two-column desktop layout: a 280px sticky profile sidebar and a scrollable main area.
- Collapse the sidebar into a compact header on smaller screens.
- Use `container-narrow` (maximum 800px) for every primary page.
- Keep page and section spacing compact and consistent.

## Typography and Color

- Use the self-hosted Inter variable font for all text.
- Page titles: 1.5rem/800; section headings: approximately 1.15rem/700.
- `src/styles/global.css` is the single source of truth for theme tokens.
- Both light and dark themes use the same blue academic accent family.
- Muted text must remain readable in both themes.

## Components

- `BaseLayout.astro` owns metadata, structured data, theme behavior, sidebar, navigation, and footer.
- `NewsList.astro` renders compact date/text rows on the homepage.
- `PublicationItem.astro` renders only title, structured authors, venue/publication/status, and external resources.
- `Timeline.astro` renders both Education and Research & Teaching Experience.
- `ContentLinks.astro` provides compact external resource links with the existing external-link icon.

Publication titles are plain text, never internal detail links. Publication rows use only a subtle bottom separator—no shadows, elevated cards, tags, descriptions, or summaries.

## Interaction and Accessibility

- Navigation contains exactly About, Publications, and CV.
- Active navigation uses a 2px underline and `aria-current="page"`.
- Social and resource links use color/opacity transitions only.
- Theme controls keep accessible labels and pressed state.
- Respect `prefers-reduced-motion`.
- Images require useful alt text; link text must describe its destination.
- Mobile layouts must allow metadata, dates, and timeline periods to wrap without overflow.

## Visual Constraints

- No shadows, glassmorphism, gradients, decorative animation, or excessive boxes.
- Use the accent color for active states and functional emphasis.
- Use `var(--border)` for subtle separators.
- Keep social icons at 22–24px and resource icons small.

## Content Rules

- Homepage order: About, News, Research Interests.
- Publications are grouped by year, newest first.
- Bold exactly `Truong-Binh Duong` in every author list through structured rendering.
- Do not invent academic metadata or links.
- Keep publication files frontmatter-only while no detail pages exist.
