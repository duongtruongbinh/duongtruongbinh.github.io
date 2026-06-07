import { getCollection } from "astro:content";
import { PAGES } from "../config";

const tagCollections = [
  { key: "publications", isActive: PAGES.publications.isActive },
  { key: "talks", isActive: PAGES.talks.isActive },
  { key: "projects", isActive: PAGES.projects.isActive },
  { key: "posts", isActive: PAGES.blog.isActive },
  { key: "teaching", isActive: PAGES.teaching.isActive },
] as const;

export function getTagSlug(tag: string) {
  const slug = tag
    .trim()
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || encodeURIComponent(tag.trim().toLowerCase());
}

async function getActiveTaggedEntries() {
  const entries = await Promise.all(
    tagCollections
      .filter((collection) => collection.isActive !== false)
      .map(async (collection) => ({
        collection: collection.key,
        entries: await getCollection(collection.key),
      })),
  );

  return entries.flatMap(({ collection, entries }) =>
    entries.map((entry) => ({ ...entry, collection })),
  );
}

export async function getAllTags() {
  const allEntries = await getActiveTaggedEntries();
  const tags: Record<string, number> = {};

  allEntries.forEach((entry) => {
    const entryTags = (entry.data as any).tags || [];
    entryTags.forEach((tag: string) => {
      const normalizedTag = tag.trim().toLowerCase();
      if (normalizedTag) {
        tags[normalizedTag] = (tags[normalizedTag] || 0) + 1;
      }
    });
  });

  return Object.entries(tags)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export async function getContentByTag(tag: string) {
  const normalizedSearchTag = tag.toLowerCase();
  const allEntries = await getActiveTaggedEntries();

  const filterFn = (entry: any) => {
    const entryTags = (entry.data as any).tags || [];
    return entryTags.some(
      (t: string) => t.toLowerCase() === normalizedSearchTag,
    );
  };

  return allEntries.filter(filterFn).sort((a, b) => {
    const dateA = new Date((a.data as any).date || 0);
    const dateB = new Date((b.data as any).date || 0);
    return dateB.getTime() - dateA.getTime();
  });
}
