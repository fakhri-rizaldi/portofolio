/**
 * content/profile.ts
 * Single source of truth untuk data profil pemilik portofolio (content.md §1 & §3, CT-05)
 */

export interface ProfileData {
  displayName: string;
  fullName: string;
  tagline: string;
  roles: string[];
  location: string;
  coordinates: string;
  email: string;
  socials: {
    linkedin: string;
    instagram: string;
    github?: string;
  };
  status: string;
  resumes: {
    id: string;
    en: string;
  };
  academic: {
    university: string;
    program: string;
    gpa: string;
    relevantCourses: string[];
    focus: string[];
    hobbies: string[];
  };
  summary: {
    id: string;
    en: string;
  };
}

export const PROFILE: ProfileData = {
  displayName: "Fakhri",
  fullName: "Muhammad Fakhri Rizaldi",
  tagline:
    "Informatics Undergraduate at UNIKOM | Aspiring Data Scientist & Analyst | Full Stack Engineer | Machine Learning & NLP",
  roles: [
    "IT Support",
    "Data Analyst",
    "Full Stack Developer",
    "Data Science",
  ],
  location: "Bandung, Indonesia",
  coordinates: "107.6191° E, 6.9175° S",
  email: "muhamadfakhri06@gmail.com",
  socials: {
    linkedin: "https://www.linkedin.com/in/muhamad-fakhri-rizaldi-399193292/",
    instagram: "https://www.instagram.com/sobatfakhri/?hl=en",
    github: "https://github.com/fakhri-rizaldi",
  },
  status: "Terbuka untuk pekerjaan / magang",
  resumes: {
    id: "/Muhammad_Fakhri_Rizaldi_Resume__Ind_Ver_.pdf",
    en: "/Muhammad_Fakhri_Rizaldi_Resume.pdf",
  },
  academic: {
    university: "Universitas Komputer Indonesia (UNIKOM)",
    program: "S1 Teknik Informatika, 2023 – 2027",
    gpa: "3,48 / 4,00",
    relevantCourses: [
      "Sistem Operasi",
      "Jaringan Komputer",
      "Sistem Manajemen Basis Data",
      "Data Mining",
    ],
    focus: [
      "Infrastruktur TI",
      "Pengembangan Perangkat Lunak",
      "Data Science",
    ],
    hobbies: ["GYM", "Badminton", "Game"],
  },
  summary: {
    id: "Mahasiswa Teknik Informatika Universitas Komputer Indonesia yang adaptif dan serba bisa, dengan keahlian di Infrastruktur TI, Data Science, dan Pengembangan Perangkat Lunak. Terbiasa menangani pemecahan masalah perangkat keras, pengembangan sistem berbasis web, pengolahan data (Python, SQL, Machine Learning), dan visualisasi wawasan bisnis lewat Looker Studio. Sedang mencari peluang magang untuk menerapkan solusi teknis end-to-end.",
    en: "Informatics Engineering student at Universitas Komputer Indonesia with a dual focus on IT infrastructure maintenance and data-driven problem solving. Experienced in hardware troubleshooting, including printer repairs and PC assembly, plus data visualization with Looker Studio. Seeking an IT Support internship to apply technical and analytical skills.",
  },
};
