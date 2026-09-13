import type { SocialLink } from "../types";

export const SOCIALS: SocialLink[] = [
  {
    name: "GitHub",
    href: "https://github.com/duongtruongbinh",
    linkTitle: "Truong-Binh Duong on GitHub",
  },
  {
    name: "Mail",
    href: "mailto:duongtruongbinh2003@gmail.com",
    linkTitle: "Send an email to Truong-Binh Duong",
  },
  {
    name: "Google Scholar",
    href: "https://scholar.google.com/citations?user=GW6kjhEAAAAJ&hl=en",
    linkTitle: "Truong-Binh Duong on Google Scholar",
  },
  {
    name: "ORCID",
    href: "https://orcid.org/0009-0008-1184-300X",
    linkTitle: "Truong-Binh Duong on ORCID",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/duongtruongbinh/",
    linkTitle: "Truong-Binh Duong on LinkedIn",
  },
];

export const SOCIAL_ICONS: Record<string, string> = {
  GitHub: "Github",
  Mail: "Mail",
  "Google Scholar": "GoogleScholar",
  ORCID: "ORCID",
  LinkedIn: "LinkedIn",
};
