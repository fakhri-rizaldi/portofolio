import type { MetadataRoute } from "next";
import { PROJECTS } from "@/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://portofolio-seven-mu-45.vercel.app";

  // Rute statis utama
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // Rute detail proyek dinamis dari Single Source of Truth
  const projectRoutes: MetadataRoute.Sitemap = PROJECTS.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...projectRoutes];
}
