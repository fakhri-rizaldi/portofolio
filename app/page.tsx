"use client";

/**
 * app/page.tsx — Halaman Utama Portofolio
 * Merangkai semua section sesuai FR-01.
 * Preloader (T-036) + placeholder section dengan useReveal (T-031).
 */
import { useState, useEffect } from "react";
import { Preloader } from "@/components/layout/Preloader";
import { Navbar } from "@/components/layout/Navbar";
import { Hero, About, Skills, Projects, Experience, Contact } from "@/components/sections";
import { HeroMarqueeStrip } from "@/components/sections/HeroMarqueeStrip";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
  const [preloaded, setPreloaded] = useState(false);

  useEffect(() => {
    // Matikan auto scroll restoration browser agar reload selalu mulai dari atas (Hero)
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (!window.location.hash) {
        window.scrollTo(0, 0);
      }
    }
  }, []);

  return (
    <main className="flex flex-col min-h-[100dvh]">
      {/* T-036: Preloader — muncul saat pertama kali dimuat */}
      <Preloader onComplete={() => setPreloaded(true)} />

      {/* T-040: Navbar utama */}
      <Navbar />

      {/* ── Hero (T-042) — Selalu ter-render di DOM agar tidak ada layout shift ── */}
      <Hero ready={preloaded} />

      {/* ── Motion Graphic Transition Strip ── */}
      <HeroMarqueeStrip />

      {/* ── About (T-043) ── */}
      <About />

      {/* ── Skills (T-044) ── */}
      <Skills />

      {/* ── Projects (T-045) ── */}
      <Projects />

      {/* ── Experience (T-047) ── */}
      <Experience />

      {/* ── Contact (T-048) ── */}
      <Contact />

      {/* ── Footer (T-049) ── */}
      <Footer />
    </main>
  );
}
