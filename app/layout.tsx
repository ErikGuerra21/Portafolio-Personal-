import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "@/components/Providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://erikguerra.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Erik Guerra — Frontend Developer",
  description:
    "Portafolio personal de Erik Guerra, Frontend Developer especializado en React, Next.js y TypeScript. Construyo interfaces que combinan rendimiento y diseño.",
  openGraph: {
    type: "website",
    url: BASE_URL,
    siteName: "Erik Guerra — Portfolio",
    title: "Erik Guerra — Frontend Developer",
    description:
      "Frontend Developer especializado en React, Next.js y TypeScript. Disponible para proyectos freelance y posiciones remotas.",
    locale: "es_MX",
  },
  twitter: {
    card: "summary_large_image",
    title: "Erik Guerra — Frontend Developer",
    description:
      "Frontend Developer especializado en React, Next.js y TypeScript. Disponible para proyectos freelance y posiciones remotas.",
  },
  robots: {
    index: true,
    follow: true,
  },
  authors: [{ name: "Erik Guerra", url: BASE_URL }],
  keywords: [
    "Frontend Developer",
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "UI/UX",
    "Portafolio",
    "Desarrollador Frontend",
    "México",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        {/* Runs before paint to avoid theme flash */}
        <script dangerouslySetInnerHTML={{ __html: `
          try {
            var t = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark');
            document.documentElement.setAttribute('data-theme', t);
          } catch(e) {}
        `}} />
      </head>
      <body className="min-h-full flex flex-col overflow-x-hidden">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
