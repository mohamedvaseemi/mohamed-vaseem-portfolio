"use client";
import { useRef, useEffect, useState } from "react";
import { education as staticEducation } from "../../data/portfolio";

const icons = ["🎓", "💻", "📚", "🏫"];

export default function EducationSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [education, setEducation] = useState<any[]>(staticEducation);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEducation = async () => {
      try {
        const res = await fetch("/api/education");
        const data = await res.json();
        if (data?.status && data?.data?.length > 0) {
          setEducation(data.data);
        } else {
          setEducation(staticEducation);
        }
      } catch (err) {
        console.error("Error fetching education:", err);
        setEducation(staticEducation);
      } finally {
        setLoading(false);
      }
    };
    fetchEducation();

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="education" ref={ref} className="section-gradient-1 py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-[#14a800] text-sm font-semibold uppercase tracking-widest mb-3">
          Academic Background
        </p>
        <h2
          className={`section-title text-3xl md:text-4xl font-bold text-white mb-16 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Education
        </h2>

        {loading ? (
          <p className="text-[#8b9eb7] animate-pulse">Loading education details...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {education.map((edu: any, i: number) => (
              <div
                key={i}
                className={`glass-card rounded-2xl p-7 hover:border-[rgba(20,168,0,0.3)] hover:scale-[1.02] transition-all duration-300
                           ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 text-2xl"
                  style={{ background: "rgba(20,168,0,0.1)", border: "1px solid rgba(20,168,0,0.2)" }}
                >
                  {icons[i % icons.length]}
                </div>

                <h3 className="text-xl font-bold text-white mb-1 font-heading">
                  {edu.degree || edu.title}
                </h3>
                <p className="text-[#14a800] text-sm font-semibold mb-1">
                  {edu.school || edu.institution}
                </p>
                <p className="text-xs text-[#4d6280] font-mono mb-4">
                  {edu.year || edu.duration}
                </p>
                <p className="text-[#8b9eb7] text-sm leading-relaxed">
                  {edu.desc || edu.description}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
