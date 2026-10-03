/**
 * content/projects.ts
 * Single source of truth untuk data portofolio proyek (content.md §6)
 */

export interface Project {
  slug: string;
  title: string;
  category: "Web" | "Data";
  summary: string;
  description: string;
  technologies: string[];
  thumbnail: string;
  gallery: string[];
  liveUrl?: string;
  repoUrl?: string;
  year: string;
  features: string[];
  metrics?: { label: string; value: string }[];
}

export const PROJECTS: Project[] = [
  {
    slug: "restoran-pro",
    title: "Sistem Informasi Restoran (RestoranPro)",
    category: "Web",
    summary: "Sistem manajemen restoran multi-role dengan pemesanan digital, reservasi meja, dan pembayaran Midtrans.",
    description:
      "Sistem manajemen restoran multi-role (Admin, Kasir, Koki, Pelayan) dengan pemesanan digital, reservasi meja, integrasi pembayaran Midtrans, manajemen stok menu, verifikasi pesanan dapur, dan dashboard keuangan.",
    technologies: ["Laravel", "MySQL", "Midtrans API"],
    thumbnail: "/projects/rp-0.jpg",
    gallery: [
      "/projects/rp-0.jpg",
      "/projects/rp-1.jpg",
      "/projects/rp-2.jpg",
      "/projects/rp-3.jpg",
      "/projects/rp-4.jpg",
      "/projects/rp-5.jpg",
    ],
    liveUrl: "https://restoranproif7.my.id",
    year: "2025 – 2026",
    features: [
      "Autentikasi multi-role (Admin, Kasir, Koki, Pelayan)",
      "Pemesanan menu digital dan reservasi meja",
      "Integrasi payment gateway Midtrans API",
      "Manajemen stok bahan dan verifikasi status dapur real-time",
      "Laporan omzet dan pembukuan transaksi otomatis",
    ],
  },
  {
    slug: "bedas-lapor-ai",
    title: "BEDAS Lapor-AI (Diskominfo Kab. Bandung)",
    category: "Web",
    summary:
      "Sistem pelaporan aduan masyarakat berbasis kecerdasan buatan untuk mengotomatisasi klasifikasi tiket fasilitas lingkungan dan perutean dinas secara cerdas.",
    description:
      "Mencetuskan ide dan mengarsiteki sistem pelaporan aduan masyarakat berbasis kecerdasan buatan (BEDAS Lapor-AI) selama masa magang di Diskominfo Kabupaten Bandung. Mengotomatisasi klasifikasi tiket aduan fasilitas lingkungan dan perutean dinas cerdas dengan model NLP dual-layer (SVM + Gemini API), visualisasi spasial klaster aduan dengan Leaflet & Heatmap, serta integrasi full-stack Laravel 11, Inertia.js, Vue 3, dan real-time updates via Laravel Reverb.",
    technologies: [
      "Python",
      "NLP (TF-IDF, SVM)",
      "Gemini API",
      "Laravel 11",
      "Inertia.js",
      "Vue 3",
      "Leaflet Spatial",
      "Laravel Reverb",
    ],
    thumbnail: "", // Gambar dikosongkan sementara sesuai permintaan pemilik
    gallery: [],
    year: "2026",
    features: [
      "End-to-End NLP Modeling: Klasifikasi teks multiclass aduan warga ke dalam 4 kategori dengan pipeline preprocessing Bahasa Indonesia, ekstraksi fitur TF-IDF, dan algoritma klasifikasi (SVM / Naive Bayes)",
      "Dual-Layer Classification System: Arsitektur klasifikasi 2 lapis memvalidasi hasil zero-shot classification Gemini API secara paralel dengan model NLP mandiri berbasis Python, deteksi anomali, dan graceful fallback",
      "Spatial & Cluster Analytics: Integrasi reverse geocoding (Nominatim OpenStreetMap) dan visualisasi spasial interaktif Leaflet & Heatmap untuk memetakan klaster persebaran aduan warga bagi pimpinan dinas",
      "Full-Stack AI Integration: Aplikasi web responsif Laravel 11, Inertia.js, Vue 3 dengan sinkronisasi aduan real-time menggunakan Laravel Reverb WebSocket",
    ],
    metrics: [
      { label: "Klasifikasi NLP", value: "4 Kategori Multiclass" },
      { label: "Arsitektur AI", value: "Dual-Layer (Local + LLM)" },
      { label: "Analisis Geospasial", value: "Leaflet Heatmap & OSM" },
      { label: "Pembaruan Sistem", value: "Real-Time WebSocket" },
    ],
  },
  {
    slug: "startup-se-asia",
    title: "Analisis Strategis Startup (SE-Asia)",
    category: "Data",
    summary: "Dashboard analitik visual interaktif ekosistem modal ventura startup Asia Tenggara 2009–2013.",
    description:
      "Dashboard visualisasi yang menganalisis ekosistem startup Asia Tenggara (2009–2013): tren investasi, dominasi E-Commerce Indonesia, peluang B2B Software, dan perbandingan distribusi pendanaan regional.",
    technologies: ["Looker Studio", "Python", "Data Analytics"],
    thumbnail: "/projects/d1.jpg",
    gallery: ["/projects/d1.jpg"],
    liveUrl: "https://lookerstudio.google.com/s/l5Rtf3uRI1s",
    year: "2025",
    features: [
      "Ekstraksi, pembersihan data (cleaning), dan Exploratory Data Analysis (EDA)",
      "Dashboard analitik multi-dimensi interaktif di Google Looker Studio",
      "Pemetaan sektor dominan (E-Commerce, Marketplace, B2B Software)",
      "Analisis komparatif alokasi modal Singapura, Indonesia, Malaysia, Thailand",
    ],
    metrics: [
      { label: "Startup Dianalisis", value: "297" },
      { label: "Total Investasi", value: "$1,85 Miliar" },
      { label: "Pangsa Pasar ID", value: ">80% E-Commerce" },
      { label: "Rata-Rata Investasi", value: "$6,22 Juta" },
    ],
  },
];
