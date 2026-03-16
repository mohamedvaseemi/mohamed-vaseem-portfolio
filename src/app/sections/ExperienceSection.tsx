"use client";
import { useRef, useEffect, useState } from "react";
import { experiences as staticExperiences } from "../../data/portfolio";

export default function ExperienceSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [experiences, setExperiences] = useState<any[]>(staticExperiences);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("/api/experience");
        const data = await res.json();
        if (data?.status && data?.data?.length > 0) {
          setExperiences(data.data);
        } else {
          setExperiences(staticExperiences); // Fallback
        }
      } catch (err) {
        console.error("Error fetching experiences:", err);
        setExperiences(staticExperiences); // Fallback
      } finally {
        setLoading(false);
      }
    };
    fetchExperiences();

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="experience" ref={ref} className="section-gradient-2 py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <p className="text-[#14a800] text-sm font-semibold uppercase tracking-widest mb-3">
          Where I've Worked
        </p>
        <h2
          className={`section-title text-3xl md:text-4xl font-bold text-white mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Experience
        </h2>

        {/* Timeline */}
        <div className="relative pl-14">
          {/* Vertical line */}
          <div className="timeline-line" />

          <div className="flex flex-col gap-12">
            {loading ? (
               <p className="text-[#8b9eb7] animate-pulse">Loading professional history...</p>
            ) : (
                experiences.map((exp: any, i: number) => (
                  <div
                    key={i}
                    className={`relative transition-all duration-700 ${
                      visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
                    }`}
                    style={{ transitionDelay: `${i * 150}ms` }}
                  >
                    {/* Timeline dot */}
                    <div className="timeline-dot absolute -left-[42px] top-6" />

                    <div className="glass-card rounded-2xl p-6 hover:border-[rgba(20,168,0,0.25)] transition-all duration-300">
                      {/* Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white font-heading">
                            {exp.role}
                          </h3>
                          <p className="text-[#14a800] text-sm font-semibold mt-0.5">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-xs font-mono text-[#4d6280] bg-white/5 px-3 py-1 rounded-full whitespace-nowrap">
                          {exp.duration}
                        </span>
                      </div>

                      <p className="text-[#8b9eb7] text-sm leading-relaxed mb-4">
                        {exp.description}
                      </p>

                      {/* Highlights */}
                      <ul className="flex flex-col gap-2">
                        {exp.highlights?.map((h: string, j: number) => (
                          <li key={j} className="flex items-start gap-2 text-sm text-[#8b9eb7]">
                            <span className="mt-1 text-[#14a800] flex-shrink-0">✓</span>
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
