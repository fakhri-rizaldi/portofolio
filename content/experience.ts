/**
 * content/experience.ts
 * Single source of truth untuk linimasa pengalaman & pendidikan (content.md §4)
 */

export interface ExperienceItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  type: "internship" | "project" | "education" | "volunteer";
  typeLabel: string;
  featured?: boolean;
  points: string[];
  skills?: string[];
}

export const EXPERIENCES: ExperienceItem[] = [
  {
    id: "diskominfo-soreang",
    role: "Data Science & Software Engineering Intern",
    organization: "Diskominfo Kabupaten Bandung",
    location: "Soreang, Jawa Barat (Hybrid)",
    period: "Agu 2026 – Sep 2026 · 2 bln",
    type: "internship",
    typeLabel: "Magang Kedinasan",
    featured: true,
    points: [
      "Mencetuskan ide dan membuat sistem pelaporan aduan masyarakat berbasis AI, BEDAS Lapor-AI, untuk mengotomatisasi klasifikasi tiket fasilitas lingkungan dan perutean dinas secara cerdas di Kabupaten Bandung.",
      "End-to-End NLP Modeling: Membangun dan melatih model klasifikasi teks multiclass 4 kategori aduan warga dengan preprocessing Bahasa Indonesia, TF-IDF, dan SVM / Naive Bayes.",
      "Dual-Layer Classification System: Mengarsiteki sistem klasifikasi 2 lapis yang memvalidasi hasil zero-shot classification Gemini API secara paralel dengan model NLP lokal Python, dilengkapi deteksi anomali & fallback.",
      "Spatial & Cluster Analytics: Mengintegrasikan reverse geocoding (Nominatim OpenStreetMap) dan visualisasi spasial interaktif Leaflet & Heatmap untuk klaster persebaran aduan warga bagi pimpinan dinas.",
      "Full-Stack AI Integration: Mengintegrasikan model NLP dan LLM ke dalam aplikasi web Laravel 11, Inertia.js, dan Vue 3 dengan real-time updates via Laravel Reverb WebSocket.",
    ],
    skills: [
      "NLP (TF-IDF, SVM)",
      "Machine Learning",
      "Python",
      "Gemini API",
      "Laravel 11",
      "Vue 3",
      "Leaflet Spatial",
      "Laravel Reverb",
    ],
  },
  {
    id: "fullstack-developer",
    role: "Pengembang Full Stack (Berbasis Proyek)",
    organization: "Proyek Independen",
    location: "Bandung, Indonesia",
    period: "Des 2025 – Jan 2026",
    type: "project",
    typeLabel: "Proyek Rekayasa Web",
    points: [
      "Mengembangkan beberapa aplikasi web (DonasiYuk, RestoranPro, TB.SumberAlam 2) dengan Laravel dan PHP.",
      "Merancang skema basis data MySQL dan mengimplementasikan SQL Triggers untuk otomatisasi proses bisnis.",
      "Menyusun dokumentasi sistem dengan diagram UML (Use Case Diagram, Activity Diagram).",
      "Mengintegrasikan autentikasi pengguna dan pelaporan transaksi real-time.",
      "Menyelesaikan bug lewat pengujian untuk menjaga keandalan performa platform.",
    ],
    skills: ["Laravel", "PHP", "MySQL", "Midtrans API", "Tailwind CSS", "UML"],
  },
  {
    id: "data-analyst-scientist",
    role: "Data Analyst & Data Scientist (Berbasis Proyek)",
    organization: "Proyek Independen",
    location: "Bandung, Indonesia",
    period: "Jan – Feb 2026",
    type: "project",
    typeLabel: "Proyek Analitik Data",
    points: [
      "Ekstraksi, pembersihan data (cleaning), dan Exploratory Data Analysis (EDA) memakai Python dan SQL.",
      "Membangun dan membandingkan model klasifikasi (KNN) serta reduksi dimensi (PCA).",
      "Membangun dashboard startup Asia Tenggara di Google Looker Studio: 297 startup, total investasi $1,85 miliar.",
      "Menganalisis dominasi pasar lebih dari 80% pada sektor E-Commerce Indonesia.",
      "Visualisasi alokasi permodalan di Singapura, Indonesia, Malaysia, dan Thailand pada sektor Marketplace ($6,22 juta rata-rata).",
    ],
    skills: ["Python", "SQL", "Looker Studio", "EDA", "Machine Learning", "PCA / KNN"],
  },
  {
    id: "volunteer-gamatif",
    role: "Volunteer Divisi P3K",
    organization: "GAMATIF (Keluarga Mahasiswa TI UNIKOM)",
    location: "Bandung, Indonesia",
    period: "2024",
    type: "volunteer",
    typeLabel: "Volunteer Kampus",
    points: [
      "Bertanggung jawab atas kesehatan dan keselamatan peserta serta panitia selama acara.",
      "Menangani prosedur pertolongan pertama untuk kecelakaan ringan.",
    ],
    skills: ["First Aid", "Manajemen Keselamatan", "Koordinasi Tim"],
  },
  {
    id: "pkl-graphic-design",
    role: "PKL Divisi Desain Grafis",
    organization: "PT Inti Optima Teknologi",
    location: "Bandung, Indonesia",
    period: "2022",
    type: "internship",
    typeLabel: "Magang Desain",
    points: [
      "Membuat materi visual dan desain grafis untuk kebutuhan komunikasi perusahaan.",
      "Merancang aset model dan karakter maskot 3D menggunakan Blender.",
    ],
    skills: ["Blender 3D", "Adobe Photoshop", "Adobe Illustrator", "Desain Visual"],
  },
];
