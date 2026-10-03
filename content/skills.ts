/**
 * content/skills.ts
 * Single source of truth untuk keahlian & teknologi (content.md §5 & CT-05)
 */

export interface SkillCategory {
  id: string;
  category: string;
  icon: string;
  description: string;
  skills: string[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "web",
    category: "Pengembangan Web",
    icon: "</>",
    description: "Membangun aplikasi web full-stack yang fungsional, aman, dan responsif.",
    skills: [
      "PHP",
      "Laravel",
      "Tailwind CSS",
      "MySQL",
      "PostgreSQL",
      "REST API",
      "Payment Gateway",
      "Responsive Design",
    ],
  },
  {
    id: "data",
    category: "Data & Machine Learning",
    icon: "∑",
    description: "Eksplorasi data, pemodelan statistik, dan dashboard analitik bisnis.",
    skills: [
      "Python",
      "SQL",
      "Looker Studio",
      "EDA",
      "Machine Learning",
      "Rekayasa Fitur",
    ],
  },
  {
    id: "infra",
    category: "Infrastruktur TI & Hardware",
    icon: "⚡",
    description: "Perawatan hardware, perakitan unit komputer, dan diagnosa teknis perangkat.",
    skills: [
      "Perakitan PC Custom",
      "Instalasi Hardware",
      "Troubleshooting",
      "Pemeliharaan",
      "Instalasi Windows 11",
    ],
  },
  {
    id: "design",
    category: "Desain & Multimedia",
    icon: "◈",
    description: "Aset visual digital, antarmuka pengguna, dan kebutuhan multimedia.",
    skills: [
      "Figma",
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Adobe Premiere Pro",
      "Canva",
      "CapCut",
    ],
  },
  {
    id: "soft",
    category: "Keahlian Analitis & Metodologi",
    icon: "★",
    description: "Pendekatan terstruktur dalam menyelesaikan masalah teknis yang kompleks.",
    skills: [
      "Critical Thinking",
      "Technical Troubleshooting",
      "System Architecture (UML)",
    ],
  },
];

export const MARQUEE_ITEMS: string[] = [
  "PHP",
  "Laravel",
  "Livewire",
  "Tailwind CSS",
  "MySQL",
  "PostgreSQL",
  "Python",
  "SQL",
  "Looker Studio",
  "Machine Learning",
  "PC Hardware Assembly",
  "Technical Troubleshooting",
  "Figma",
  "Midtrans API",
  "REST API",
  "EDA",
  "Gemini API",
];
