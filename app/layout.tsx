import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SmoothScrollProvider } from "@/components/layout/SmoothScrollProvider";
import { CustomCursor } from "@/components/layout/CustomCursor";
import { Toaster } from "sonner";

/* ─── T-021: Font via next/font (tanpa layout shift) ─── */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

/* ─── SEO — T-061: Metadata Lengkap & Open Graph (SE-01) ─── */
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0b0e12" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7f5" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://fakhridev.vercel.app"),
  title: {
    default: "Muhammad Fakhri Rizaldi — Full Stack Engineer & Data Science",
    template: "%s | Muhammad Fakhri Rizaldi",
  },
  description:
    "Portofolio resmi Muhammad Fakhri Rizaldi — Mahasiswa S1 Teknik Informatika UNIKOM Bandung. Menguasai rekayasa sistem web modern (Laravel, PHP, MySQL), analisis data & Machine Learning (Python, NLP), dan infrastruktur TI.",
  keywords: [
    "Muhammad Fakhri Rizaldi",
    "Fakhri",
    "Portofolio",
    "Full Stack Engineer",
    "Data Scientist",
    "Data Analyst",
    "Machine Learning",
    "NLP",
    "Laravel",
    "Python",
    "UNIKOM",
    "Bandung",
    "Web Developer",
  ],
  authors: [{ name: "Muhammad Fakhri Rizaldi", url: "https://fakhridev.vercel.app" }],
  creator: "Muhammad Fakhri Rizaldi",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://fakhridev.vercel.app",
    siteName: "Muhammad Fakhri Rizaldi Portfolio",
    title: "Muhammad Fakhri Rizaldi — Full Stack Engineer & Data Science",
    description:
      "Portofolio resmi Muhammad Fakhri Rizaldi — Mahasiswa S1 Teknik Informatika UNIKOM Bandung. Menguasai rekayasa sistem web modern, analisis data, dan Machine Learning.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Fakhri Rizaldi — Full Stack Engineer & Data Science",
    description:
      "Portofolio resmi Muhammad Fakhri Rizaldi — Mahasiswa S1 Teknik Informatika UNIKOM Bandung. Menguasai rekayasa sistem web modern, analisis data, dan Machine Learning.",
    creator: "@sobatfakhri",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
  verification: {
    google: "JvmDbomssz5XfbmihvhhWWJteNIwfJKO4gMIkO7aya0",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable}`}
    >
      <body className="min-h-full antialiased">
        {/* T-076: Fallback jika JS dinonaktifkan / gagal dimuat */}
        <noscript>
          <style>{`#preloader-overlay, [data-preloader-overlay] { display: none !important; }`}</style>
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          {/* T-035: Kursor kustom — hanya pointer:fine, render di luar scroll context */}
          <CustomCursor />

          {/* T-030: Lenis smooth scroll + ScrollTrigger sync */}
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>

          {/* CF-03 / CF-04: Toast notifications */}
          <Toaster richColors position="bottom-right" closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}

