"use client";
import { useRef, useEffect, useState } from "react";
import { heroData, aboutData as staticAboutData } from "../../data/portfolio";

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [aboutData, setAboutData] = useState<any>(null);
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
  const bioText = aboutData?.text || staticAboutData.bio;
  const stats: { label: string; value: string }[] = aboutData?.stats || staticAboutData.stats;

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

            {/* Upwork availability */}
            <div className="mt-6 flex items-start gap-3 p-4 rounded-xl glass-card border border-[rgba(20,168,0,0.2)]">
              <span className="mt-1 w-2.5 h-2.5 rounded-full bg-[#14a800] animate-pulse flex-shrink-0" />
              <p className="text-sm text-[#8b9eb7]">
                <span className="text-[#14a800] font-semibold">Available for freelance — </span>
                I am currently available for new opportunities and freelance contracts. Let's discuss how I can help your business grow.
              </p>
            </div>

            <div className="mt-6 flex gap-3">
              <a href={heroData.upworkUrl} target="_blank" rel="noopener noreferrer" className="btn-upwork text-sm py-2.5">
                View Upwork Profile
              </a>
              <a
                href={`mailto:${heroData.email}`}
                className="btn-outline text-sm py-2.5"
              >
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
                {["React", "Next.js", "TypeScript", "Node.js", "MongoDB", "TailwindCSS"].map((tech) => (
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
