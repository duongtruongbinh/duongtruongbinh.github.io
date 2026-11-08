const rawIcons = import.meta.glob("./icons/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function getSvgChildren(svg: string) {
  return svg
    .replace(/^\s*(?:<\?xml[^>]*>\s*)?<svg\b[^>]*>/i, "")
    .replace(/<\/svg>\s*$/i, "")
    .trim();
}

export const ICONS: Record<string, string> = Object.fromEntries(
  Object.entries(rawIcons).map(([filePath, svg]) => [
    filePath.replace("./icons/", "").replace(".svg", ""),
    getSvgChildren(svg),
  ]),
);
