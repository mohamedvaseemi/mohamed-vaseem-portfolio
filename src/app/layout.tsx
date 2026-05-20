import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Mohamed Vaseem | Full-Stack Web Engineer",
  description:
    "Full-Stack Web Engineer based in Mumbai with 3+ years of experience building scalable web applications using React, Next.js, TypeScript, Node.js, FastAPI, PostgreSQL & Redis. Available for full-time and freelance roles.",
  keywords: [
    "Full-Stack Web Engineer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "FastAPI",
    "PostgreSQL",
    "Redis",
    "Web Development",
    "Mumbai Developer",
    "Mohamed Vaseem",
  ],
  authors: [{ name: "Mohamed Vaseem" }],
  openGraph: {
    title: "Mohamed Vaseem | Full-Stack Web Engineer",
    description:
      "Full-Stack Web Engineer specializing in React, Next.js, Node.js, FastAPI, PostgreSQL & Redis. Open to opportunities in Mumbai/Pune.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth ${inter.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
