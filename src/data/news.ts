export interface NewsSegment {
  text: string;
  href?: string;
}

export interface NewsItem {
  date: string;
  datetime: string;
  segments: NewsSegment[];
}

export const NEWS: NewsItem[] = [
  {
    date: "Sep 2026",
    datetime: "2026-09",
    segments: [
      { text: "Started my M.Sc. at " },
      { text: "INRS", href: "https://inrs.ca/" },
      { text: " under the supervision of " },
      { text: "Prof. Long Bao Le", href: "https://longbaole.github.io/" },
      { text: "." },
    ],
  },
  {
    date: "May 2026",
    datetime: "2026-05",
    segments: [
      {
        text: "Counterfactual Reasoning for Robust VQA accepted at KES 2026. ",
      },
      {
        text: "Code",
        href: "https://github.com/duongtruongbinh/robust-vqa-counterfactual",
      },
      { text: "." },
    ],
  },
  {
    date: "Jan 2026",
    datetime: "2026-01",
    segments: [
      {
        text: "ViInfographicVQA",
        href: "https://arxiv.org/abs/2512.12424",
      },
      {
        text: " presented at the AAAI 2026 Workshop on AI for Scientific Research.",
      },
    ],
  },
  {
    date: "Nov 2025",
    datetime: "2025-11",
    segments: [
      {
        text: "ViVQA-X",
        href: "https://doi.org/10.1007/978-981-95-1746-6_18",
      },
      {
        text: ": our Vietnamese VQA-NLE dataset paper published online by Springer.",
      },
    ],
  },
  {
    date: "Oct 2025",
    datetime: "2025-10",
    segments: [
      {
        text: "DAM-QA",
        href: "https://openaccess.thecvf.com/content/ICCV2025W/VisionDocs/html/Vu_Describe_Anything_Model_for_Visual_Question_Answering_on_Text-rich_Images_ICCVW_2025_paper.html",
      },
      { text: " published at the ICCV 2025 VisionDocs Workshop." },
    ],
  },
];
