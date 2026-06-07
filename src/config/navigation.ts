import type { NavLink } from "../types";

export const NAV_LINKS: NavLink[] = [
  { href: "/", label: "About", isActive: true },
  { href: "/publications", label: "Publications", isActive: true },
  { href: "/projects", label: "Research", isActive: true },
  { href: "/posts", label: "Blog", isActive: false },
  { href: "/talks", label: "Talks", isActive: false },
  { href: "/teaching", label: "Teaching", isActive: false },
  { href: "/tags", label: "Tags", isActive: false },
  { href: "/cv", label: "CV", isActive: true },
];
