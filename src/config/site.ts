import type {
  SiteConfig,
  ThemeConfig,
  UmamiAnalyticsConfig,
  AnalyticsConfig,
} from "../types";

export const SITE: SiteConfig = {
  website: "https://duongtruongbinh.github.io",
  author: "Truong-Binh Duong",
  desc: "Truong-Binh Duong is an M.Sc. student at INRS working on world models, vision-language-action models, embodied AI, robot learning, and robust multimodal learning.",
  title: "Truong-Binh Duong | M.Sc. Student at INRS",
  ogImage: "/og-image.png",
  lastUpdated: "2026-11-06",
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

const umami: UmamiAnalyticsConfig = {
  websiteId: "",
  src: "https://cloud.umami.is/script.js",
};

export const ANALYTICS: AnalyticsConfig = {
  ga4Id: "",
  umami,
};
