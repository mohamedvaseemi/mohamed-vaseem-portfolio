"use client";
import { useRef, useEffect, useState } from "react";
import { heroData, aboutData as staticAboutData } from "../../data/portfolio";

interface AboutRecord {
  heading?: string;
  text?: string;
  stats?: { label: string; value: string }[];
}

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [aboutData, setAboutData] = useState<AboutRecord | null>(null);
  const [loading, setLoading] = useState(false); // Default to false if we have static data

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await fetch("/api/about");
        const data = await res.json();
        if (data?.status && data?.data?.length > 0) {
          setAboutData(data.data[0]);
        }
      } catch (err) {
        console.error("Error fetching about section:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbout();

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Fallback text if DB is empty
  const heading = aboutData?.heading || staticAboutData.heading;
  const bioText = (aboutData?.text || staticAboutData.bio) as string;
  const stats = aboutData?.stats || staticAboutData.stats;
  const availabilityNote = staticAboutData.availabilityNote;

  return (
    <section
      id="about"
      ref={ref}
      className="section-gradient-2 py-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Label */}
        <p className="text-[#14a800] text-sm font-semibold uppercase tracking-widest mb-3">
          Who I Am
        </p>
        <h2
          className={`section-title text-3xl md:text-4xl font-bold text-white mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {heading}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <div
            className={`transition-all duration-700 delay-100 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {loading ? (
               <p className="text-[#8b9eb7] animate-pulse">Loading amazing details...</p>
            ) : (
                bioText.split("\n\n").map((para: string, i: number) => (
                  <p key={i} className="text-[#8b9eb7] leading-relaxed mb-4 text-base">
                    {para}
                  </p>
                ))
            )}

            {/* Availability note */}
            <div className="mt-6 flex items-start gap-3 p-4 rounded-xl glass-card border border-[rgba(20,168,0,0.2)]">
              <span className="mt-1 w-2.5 h-2.5 rounded-full bg-[#14a800] animate-pulse flex-shrink-0" />
              <p className="text-sm text-[#8b9eb7]">
                <span className="text-[#14a800] font-semibold">Open to opportunities — </span>
                {availabilityNote}
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <a
                href={heroData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-upwork text-sm py-2.5 inline-flex items-center gap-2"
              >
                {/* LinkedIn icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn Profile
              </a>
              <a
                href={`mailto:${heroData.email}`}
                className="btn-outline text-sm py-2.5 inline-flex items-center gap-2"
              >
                {/* Email icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Send Email
              </a>
            </div>
          </div>

          {/* Stats grid */}
          <div
            className={`transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat: { label: string; value: string }, i: number) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-6 text-center hover:border-[rgba(20,168,0,0.3)] transition-all duration-300 hover:scale-[1.03]"
                  style={{ borderColor: "rgba(255,255,255,0.08)" }}
                >
                  <p className="text-4xl font-bold text-[#14a800] font-heading mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[#8b9eb7]">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Tech stack preview */}
            <div className="mt-6 glass-card rounded-2xl p-5">
              <p className="text-xs text-[#4d6280] uppercase tracking-widest mb-3">
                Primary Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {["React", "Next.js", "TypeScript", "Node.js", "FastAPI", "PostgreSQL", "Redis", "MongoDB"].map((tech) => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
