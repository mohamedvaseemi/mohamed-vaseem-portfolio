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
  const professionalSummary = staticAboutData.professionalSummary;

  return (
    <section
      id="about"
      ref={ref}
      className="section-gradient-2 py-24 px-6"
    >
      <div className="max-w-3xl mx-auto text-center">
        {/* Section Label */}
        <p className="text-[#14a800] text-sm font-semibold uppercase tracking-widest mb-3">
          Who I Am
        </p>
<h2
          className={`section-title text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {heading}
        </h2> 
        <div
          className={`transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {loading ? (
             <p className="text-[#8b9eb7] animate-pulse">Loading amazing details...</p>
          ) : (
              bioText.split("\n\n").map((para: string, i: number) => (
                <p key={i} className="text-[#e2e8f0] text-base md:text-lg leading-relaxed mb-6 font-light">
                  {para}
                </p>
              ))
          )}

{/* Tech stack preview - centered */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {["React", "Next.js", "TypeScript", "Node.js", "FastAPI", "PostgreSQL", "Redis", "MongoDB"].map((tech) => (
              <span key={tech} className="tech-badge px-3 py-1.5 text-sm">{tech}</span>
            ))}
          </div>
{/* Stats grid */}
          {/* <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 max-w-3xl mx-auto">
            {stats.map((s: { label: string; value: string }, i: number) => (
              <div key={i} className="glass-card rounded-xl p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#14a800] font-heading">{s.value}</div>
                <div className="text-xs text-[#8b9eb7] mt-1">{s.label}</div>
              </div>
            ))}
          </div> */}

          {/* Availability note - centered */}
          <div className="mt-8 inline-flex items-center gap-3 p-4 rounded-xl glass-card border border-[rgba(20,168,0,0.2)] text-left max-w-xl mx-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-[#14a800] animate-pulse flex-shrink-0" />
            <p className="text-sm text-[#8b9eb7]">
              <span className="text-[#14a800] font-semibold">Open to opportunities — </span>
              {availabilityNote}
            </p>
          </div>

          {/* Links/Buttons - centered */}
          <div className="mt-8 flex justify-center gap-4">
            <a
              href={heroData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-upwork text-sm py-2.5 px-6 inline-flex items-center gap-2"
            >
              {/* LinkedIn icon */}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn Profile
            </a>
            <a
              href={`mailto:${heroData.email}`}
              className="btn-outline text-sm py-2.5 px-6 inline-flex items-center gap-2"
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
      </div>
    </section>
  );
}
