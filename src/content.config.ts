import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const link = z.object({
  label: z.string(),
  href: z.string(),
});

const publications = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/publications" }),
  schema: z.object({
    title: z.string(),
    authors: z.array(z.string()),
    year: z.number(),
    venue: z.string().optional(),
    publication: z.string().optional(),
    status: z.string().optional(),
    links: z.array(link).optional(),
  }),
});

const bio = defineCollection({
  loader: glob({ pattern: "bio.md", base: "./src/content" }),
  schema: z.object({
    name: z.string(),
    avatar: z.string(),
    shortBio: z.string().optional(),
    institution: z.string().optional(),
    researchInterests: z.array(z.string()),
  }),
});

const cv = defineCollection({
  loader: glob({ pattern: "cv.md", base: "./src/content" }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    experience: z
      .array(
        z.object({
          role: z.string(),
          institution: z.string(),
          period: z.string(),
          description: z.string(),
        }),
      )
      .optional(),
    education: z
      .array(
        z.object({
          degree: z.string(),
          institution: z.string(),
          period: z.string(),
          thesis: z.string().optional(),
          description: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

export const collections = { publications, bio, cv };
