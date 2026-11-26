import { execFileSync } from "node:child_process";
import type { SiteConfig, ThemeConfig, AnalyticsConfig } from "../types";

function getLastCommitDate(): string {
  try {
    const date = execFileSync("git", ["log", "-1", "--format=%cs"], {
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  } catch {}
  return new Date().toISOString().slice(0, 10);
}

export const SITE: SiteConfig = {
  website: "https://duongtruongbinh.github.io",
  author: "Truong-Binh Duong",
  desc: "Truong-Binh Duong is an M.Sc. student at INRS working on world models, vision-language-action models, embodied AI, robot learning, and robust multimodal learning.",
  title: "Truong-Binh Duong | M.Sc. Student at INRS",
  ogImage: "/og-image.png",
  profileImage: "/profile-portrait.webp",
  knowsAbout: [
    "World Models",
    "Vision-Language-Action Models",
    "Embodied AI",
    "Robot Learning",
    "Robust Multimodal Reasoning",
    "Visual Question Answering",
  ],
  lastUpdated: getLastCommitDate(),
  favicon: "/favicon.svg",
  lang: "en",
};

export const THEME_CONFIG: ThemeConfig = {
  lightAndDark: true,
};

export const VISITOR_MAP = {
  widgetId: "Fj41EQW4zT0Jm1z8_PXs15124rtk-Hrs01vZxgbUoMo",
  statsUrl: "https://mapmyvisitors.com/web/1c98s",
};

export const ANALYTICS: AnalyticsConfig = {
  ga4Id: "",
  umami: {
    websiteId: "",
    src: "https://cloud.umami.is/script.js",
  },
};
