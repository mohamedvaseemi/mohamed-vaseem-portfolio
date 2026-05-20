"use client";
import { useEffect, useState } from "react";
import { heroData } from "../../data/portfolio";

const TITLE_TEXT = `Hi, I'm ${heroData.name}`;

export default function HeroSection() {
  const [litIndexes, setLitIndexes] = useState<number[]>([]);
  const [stable, setStable] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const flickerInterval = setInterval(() => {
      const count = Math.floor(Math.random() * 5) + 1; // Flicker 1-5 random letters at a time
      const indexes = Array.from({ length: count }, () =>
        Math.floor(Math.random() * TITLE_TEXT.length)
      );
      setLitIndexes(indexes);
    }, 150);

    const stableTimeout = setTimeout(() => {
      clearInterval(flickerInterval);
      setStable(true);
    }, 2400);

    return () => {
      clearInterval(flickerInterval);
      clearTimeout(stableTimeout);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 60% 40%, rgba(20,168,0,0.08) 0%, transparent 60%), linear-gradient(160deg, #020617 0%, #0a1628 60%, #020617 100%)",
      }}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #14a800, transparent)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-5 blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, #0057ff, transparent)" }} />

      <div className="relative z-10 px-6 max-w-4xl mx-auto">
        {/* Availability badge */}
        <div
          className={`inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-700 ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            background: "rgba(20,168,0,0.1)",
            borderColor: "rgba(20,168,0,0.3)",
            color: "#14a800",
          }}
        >
          <span className="w-2 h-2 rounded-full bg-[#14a800] animate-pulse" />
          {heroData.availableTagline}
        </div>

        {/* Neon title */}
        <h1 className={`tube-text mb-6 ${stable ? "stable" : ""}`}>
          {TITLE_TEXT.split("").map((char, i) => (
            <span
              key={i}
              className={stable || litIndexes.includes(i) ? "tube-on" : "tube-off"}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Title tag */}
        <p
          className={`tube-sub text-xl md:text-2xl font-semibold text-[#14a800] mb-3 ${
            stable ? "sub-visible" : "sub-hidden"
          }`}
        >
          {heroData.title}
        </p>

        {/* Subtitle */}
        <p
          className={`tube-sub text-base md:text-lg text-[#8b9eb7] max-w-2xl mx-auto mb-10 ${
            stable ? "sub-visible" : "sub-hidden"
          }`}
        >
          {heroData.subtitle}
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center ${
            stable ? "button-visible" : "button-hidden"
          }`}
        >
          <a
            href={heroData.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-upwork text-sm"
          >
            {/* LinkedIn icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
            LinkedIn Profile
          </a>
          <a
            href={heroData.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline text-sm"
          >
            {/* GitHub icon */}
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            View GitHub
          </a>
        </div>

        {/* Scroll indicator */}
        {stable && (
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#4d6280] text-xs scroll-bounce">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
            <span>scroll down</span>
          </div>
        )}
      </div>
    </section>
  );
}
