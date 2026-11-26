import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const link = z.object({
  label: z.string(),
  href: z.string(),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      authors: z.array(z.string()),
      date: z.string().regex(/^\d{4}-\d{2}(-\d{2})?$/),
      venue: z.string().optional(),
      image: z
        .object({
          src: image(),
          alt: z.string(),
        })
        .optional(),
      status: z.string().optional(),
      links: z.array(link).optional(),
      bibtex: z.string().optional(),
    }),
});

const bio = defineCollection({
  loader: glob({ pattern: "bio.md", base: "./src/content" }),
  schema: z.object({
    name: z.string(),
    avatar: z.string(),
    role: z.string(),
    shortBio: z.string().optional(),
    institution: z.string().optional(),
    researchInterests: z
      .array(
        z.object({
          stage: z.string(),
          title: z.string(),
          description: z.string(),
        }),
      )
      .length(3),
  }),
});

export const collections = { publications, bio };
