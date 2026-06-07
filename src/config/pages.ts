import type { PagesConfig } from "../types";

export const PAGES: PagesConfig = {
  home: {
    title: "About Me",
    subtitle: "",
    isActive: true,
  },

  publications: {
    title: "Publications",
    subtitle:
      "Peer-reviewed papers and preprints in multimodal learning, visual question answering, and vision-language models.",
    isActive: true,
  },

  projects: {
    title: "Research Projects",
    subtitle:
      "Selected research projects, datasets, benchmarks, and open-source implementations.",
    isActive: true,
  },

  blog: {
    title: "Blog",
    subtitle:
      "Research notes, technical tutorials, and reflections on artificial intelligence.",
    isActive: false,
  },

  talks: {
    title: "Talks & Presentations",
    subtitle: "Conference presentations, seminars, and invited talks.",
    isActive: false,
  },

  teaching: {
    title: "Teaching",
    subtitle: "Courses, lectures, workshops, and educational materials.",
    isActive: false,
  },

  tags: {
    title: "Tags",
    subtitle: "Explore content by topic.",
    isActive: true,
  },

  cv: {
    title: "Curriculum Vitae",
    subtitle:
      "Research experience, education, publications, and technical background.",
    isActive: true,
  },
};
