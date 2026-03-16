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
  title: "Mohamed Vaseem | Full-Stack Developer & Upwork Freelancer",
  description:
    "Top-rated Full-Stack Developer on Upwork specializing in React, Next.js, TypeScript & Node.js. 30+ projects delivered. 5-star rated. Available for freelance projects.",
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript",
    "Node.js",
    "Upwork Freelancer",
    "Web Development",
    "Mohamed Vaseem",
  ],
  authors: [{ name: "Mohamed Vaseem" }],
  openGraph: {
    title: "Mohamed Vaseem | Full-Stack Developer",
    description:
      "Top-rated Upwork Freelancer. React, Next.js, Node.js specialist.",
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
