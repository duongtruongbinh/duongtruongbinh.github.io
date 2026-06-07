import type { SocialLink } from "../types";

export const SOCIALS: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/duongtruongbinh",
    linkTitle: "Truong-Binh Duong on GitHub",
    isActive: true,
  },
  {
    name: "Mail",
    href: "mailto:duongtruongbinh2003@gmail.com",
    linkTitle: "Send an email to Truong-Binh Duong",
    isActive: true,
  },
  {
    name: "Google Scholar",
    href: "https://scholar.google.com/citations?user=GW6kjhEAAAAJ&hl=en",
    linkTitle: "Truong-Binh Duong on Google Scholar",
    isActive: true,
  },
  {
    name: "ORCID",
    href: "https://orcid.org/0009-0008-1184-300X",
    linkTitle: "Truong-Binh Duong on ORCID",
    isActive: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/duongtruongbinh/",
    linkTitle: "Truong-Binh Duong on LinkedIn",
    isActive: true,
  },
  {
    name: "ResearchGate",
    href: "https://www.researchgate.net/profile/Truong-Binh-Duong",
    linkTitle: "Truong-Binh Duong on ResearchGate",
    isActive: false,
  },
];

export const SOCIAL_ICONS: Record<string, string> = {
  GitHub: "Github",
  Github: "Github",
  Mail: "Mail",
  "Google Scholar": "GoogleScholar",
  ORCID: "ORCID",
  LinkedIn: "LinkedIn",
  ResearchGate: "ExternalLink",
  RSS: "RSS",
};
