"use client";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { skills as staticSkills } from "../../data/portfolio";
import { getTechIcon } from "../utils/techIcons";

interface SkillRecord {
  name: string;
  logo?: string;
  icon?: string;
  category?: string;
}

type Category = "All" | "Frontend" | "Backend" | "Tools";
const categories: Category[] = ["All", "Frontend", "Backend", "Tools"];

export default function SkillsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<Category>("All");
  const [skills, setSkills] = useState<SkillRecord[]>(staticSkills);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await fetch("/api/learnings");
        const data = await res.json();
        if (data?.status && data?.data?.length > 0) {
          setSkills(data.data);
        } else {
          setSkills(staticSkills);
        }
      } catch (err) {
        console.error("Error fetching skills:", err);
        setSkills(staticSkills);
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Support both logo (new) and icon (old DB field) field names
  const filtered = active === "All" ? skills : skills.filter((s: SkillRecord) => s.category === active);

  return (
    <section id="skills" ref={ref} className="section-gradient-1 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#14a800] text-sm font-semibold uppercase tracking-widest mb-3">
          What I Work With
        </p>
        <h2
          className={`section-title text-3xl md:text-4xl font-bold text-white mb-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Skills &amp; Tech Stack
        </h2>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                active === cat
                  ? "bg-[#14a800] text-white shadow-lg"
                  : "glass-card text-[#8b9eb7] hover:text-white hover:border-[rgba(20,168,0,0.4)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        {loading ? (
          <p className="text-[#8b9eb7] animate-pulse">Loading tech stack...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {filtered.map((tech: SkillRecord, i: number) => {
              const Icon = getTechIcon(tech.name);
              const logoUrl = tech.logo || tech.icon || null;
              
              return (
                <div
                  key={`${tech.name}-${i}`}
                  className={`glass-card rounded-2xl p-5 flex flex-col items-center gap-3 cursor-default
                             hover:border-[rgba(20,168,0,0.4)] hover:scale-105 transition-all duration-300
                             ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                  style={{ transitionDelay: `${i * 40}ms` }}
                >
                  <div className="w-12 h-12 relative flex items-center justify-center">
                    {Icon ? (
                      <Icon className="text-4xl text-[#14a800] drop-shadow-md" />
                    ) : logoUrl && !imgErrors[i] ? (
                      <Image
                        src={logoUrl}
                        alt={tech.name}
                        fill
                        className="object-contain drop-shadow-md"
                        onError={() => setImgErrors((p) => ({ ...p, [i]: true }))}
                        unoptimized
                      />
                    ) : (
                      <span className="text-2xl font-bold text-[#14a800]">
                        {tech.name?.[0] || "?"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-[#8b9eb7] text-center leading-tight">
                    {tech.name}
                  </p>
                  {tech.category && (
                    <span
                      className="text-[10px] font-semibold px-2 py-0.5 rounded-full"
                      style={{
                        background:
                          tech.category === "Frontend"
                            ? "rgba(59,130,246,0.15)"
                            : tech.category === "Backend"
                            ? "rgba(20,168,0,0.15)"
                            : "rgba(168,85,247,0.15)",
                        color:
                          tech.category === "Frontend"
                            ? "#60a5fa"
                            : tech.category === "Backend"
                            ? "#14a800"
                            : "#c084fc",
                      }}
                    >
                      {tech.category}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
