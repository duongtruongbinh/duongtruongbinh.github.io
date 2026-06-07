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

export const ICONS: Record<string, string> = Object.keys(rawIcons).reduce(
  (acc, filePath) => {
    const fileName = filePath.replace("./icons/", "").replace(".svg", "");

    acc[fileName] = getSvgChildren(rawIcons[filePath]);
    return acc;
  },
  {} as Record<string, string>,
);

export type IconName = keyof typeof ICONS;
