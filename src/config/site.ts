import type {
  SiteConfig,
  ThemeConfig,
  SettingsConfig,
  UmamiAnalyticsConfig,
  AnalyticsConfig,
} from "../types";

export const SITE: SiteConfig = {
  website: "https://duongtruongbinh.github.io",
  author: "Truong-Binh Duong",
  desc: "Personal academic website of Truong-Binh Duong, an AI researcher working on multimodal learning, vision-language models, robust visual reasoning, and generalizable AI systems.",
  title: "Truong-Binh Duong | AI Researcher",
  ogImage: "/profile.jpg",
  postPerPage: 6,
  favicon: "/favicon.svg",
  lang: "en",
};

export const THEME_CONFIG: ThemeConfig = {
  lightAndDark: true,
  themeLight: "light_default",
  themeDark: "dark_default",
};

export const SETTINGS: SettingsConfig = {
  showTagsInNavbar: false,
  showRSSInFooter: true,
};

const umami: UmamiAnalyticsConfig = {
  websiteId: "",
  src: "https://cloud.umami.is/script.js",
};

export const ANALYTICS: AnalyticsConfig = {
  ga4Id: "",
  umami,
};
