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
    date: "Aug 2026",
    datetime: "2026-08",
    segments: [
      { text: "Started my M.Sc. in Telecommunications at " },
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
        text: "Our paper “Counterfactual Reasoning for Robust Visual Question Answering” was accepted at ",
      },
      { text: "KES 2026", href: "https://kes2026.kesinternational.org/" },
      { text: ". Code is available " },
      {
        text: "here",
        href: "https://github.com/duongtruongbinh/robust-vqa-counterfactual",
      },
      { text: "." },
    ],
  },
  {
    date: "Jan 2026",
    datetime: "2026-01",
    segments: [
      { text: "Our paper “" },
      {
        text: "ViInfographicVQA",
        href: "https://arxiv.org/abs/2512.12424",
      },
      { text: "” was presented at the " },
      {
        text: "AAAI 2026 Workshop on AI for Scientific Research",
        href: "https://ai4research-workshop.github.io/",
      },
      { text: "." },
    ],
  },
  {
    date: "Nov 2025",
    datetime: "2025-11",
    segments: [
      { text: "Our paper “" },
      {
        text: "An Automated Pipeline for Constructing a Vietnamese VQA-NLE Dataset",
        href: "https://doi.org/10.1007/978-981-95-1746-6_18",
      },
      { text: "” was published online by Springer." },
    ],
  },
  {
    date: "Oct 2025",
    datetime: "2025-10",
    segments: [
      { text: "Our paper “" },
      {
        text: "Describe Anything Model for Visual Question Answering on Text-Rich Images",
        href: "https://openaccess.thecvf.com/content/ICCV2025W/VisionDocs/html/Vu_Describe_Anything_Model_for_Visual_Question_Answering_on_Text-rich_Images_ICCVW_2025_paper.html",
      },
      { text: "” was published at the ICCV 2025 VisionDocs Workshop." },
    ],
  },
];
