import { SITE } from "../config";

export const isSiteAuthor = (author: string) =>
  author.replace(/\*$/, "") === SITE.author;

export const publicationYear = (date: string) => Number(date.slice(0, 4));
