"use client";
import { useState, useEffect, useCallback } from "react";
import { heroData } from "@/data/portfolio";

const sections = [
  "home",
  "about",
  "skills",
  "experience",
  "projects",
  "education",
  "contact",
];

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 40);
    const scrollY = window.scrollY + window.innerHeight / 3;
    let current = "home";
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.offsetTop <= scrollY) current = id;
    }
    setActive(current);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#020617]/90 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollTo("home")}
            className="font-heading text-lg font-bold text-white tracking-wide"
          >
            <span className="text-[#14a800]">M</span>V
          </button>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {sections.map((sec) => (
              <button
                key={sec}
                onClick={() => scrollTo(sec)}
                className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-300 ${
                  active === sec
                    ? "text-[#14a800] bg-[rgba(20,168,0,0.1)]"
                    : "text-[#8b9eb7] hover:text-white hover:bg-white/5"
                }`}
              >
                {sec}
              </button>
            ))}
          </div>

          {/* Hire Me CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={heroData.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-upwork text-sm py-2 px-5"
            >
              <span>Hire Me</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M14 3l7 7-7 7v-4H3V7h11z" />
              </svg>
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition"
            aria-label="Toggle menu"
          >
            <div
              className={`w-5 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <div
              className={`w-5 h-0.5 bg-white mb-1.5 transition-all ${menuOpen ? "opacity-0" : ""}`}
            />
            <div
              className={`w-5 h-0.5 bg-white transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 bottom-0 w-72 bg-[#0a1628] border-l border-white/10 p-8 flex flex-col gap-3 pt-24">
            {sections.map((sec) => (
              <button
                key={sec}
                onClick={() => scrollTo(sec)}
                className={`text-left px-4 py-3 rounded-xl capitalize font-medium transition-all ${
                  active === sec
                    ? "text-[#14a800] bg-[rgba(20,168,0,0.1)]"
                    : "text-[#8b9eb7] hover:text-white hover:bg-white/5"
                }`}
              >
                {sec}
              </button>
            ))}
            <a
              href={heroData.upworkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-upwork mt-4 justify-center"
            >
              Hire Me on Upwork
            </a>
          </div>
        </div>
      )}
    </>
  );
}
