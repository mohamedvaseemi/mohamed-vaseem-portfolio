"use client";
import { useRef, useEffect, useState } from "react";
import { projects as staticProjects } from "../../data/portfolio";

interface ProjectRecord {
  title?: string;
  name?: string;
  desc?: string;
  description?: string;
  tech?: string | string[];
  projectUrl?: string;
  link?: string;
  image?: string;
  category?: string;
}

type Category = "All" | "Full-Stack" | "Frontend";
const tabs: Category[] = ["All", "Full-Stack", "Frontend"];

const projectColors = [
  "from-blue-900/40 to-indigo-900/20",
  "from-teal-900/40 to-cyan-900/20",
  "from-purple-900/40 to-indigo-900/20",
  "from-green-900/30 to-teal-900/20",
];




export default function ProjectsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [activeTab, setActiveTab] = useState<Category>("All");
  const [projects, setProjects] = useState<ProjectRecord[]>(staticProjects);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch("/api/projects");
        const data = await res.json();
        if (data?.status && data?.data?.length > 0) {
          setProjects(data.data);
        } else {
          setProjects(staticProjects);
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setProjects(staticProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();

    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const filtered =
    activeTab === "All"
      ? projects
      : projects.filter((p: ProjectRecord) => p.category === activeTab);

  return (
    <section id="projects" ref={ref} className="section-gradient-3 py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="text-[#14a800] text-sm font-semibold uppercase tracking-widest mb-3">
          What I&apos;ve Built
        </p>
        <h2
          className={`section-title text-3xl md:text-4xl font-bold text-white mb-10 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Projects
        </h2>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-2 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#14a800] text-white"
                  : "glass-card text-[#8b9eb7] hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        {loading ? (
          <p className="text-[#8b9eb7] animate-pulse">Loading projects...</p>
        ) : (
          <div className="grid sm:grid-cols-2 gap-6">
            {filtered.map((proj: ProjectRecord, i: number) => (
              <div
                key={i}
                className={`group glass-card rounded-2xl overflow-hidden hover:border-[rgba(20,168,0,0.3)] hover:scale-[1.02] transition-all duration-300
                           ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {/* Project Image */}
                <div
                  className={`relative h-44 overflow-hidden ${
                    proj.image ? "bg-[#0a1628]" : `bg-gradient-to-br ${projectColors[i % projectColors.length]}`
                  } flex items-center justify-center`}
                >
                  {proj.image ? (
                    <img
                      src={proj.image}
                      alt={proj.title || proj.name || "Project screenshot"}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                        (e.currentTarget.parentElement as HTMLElement).classList.add(
                          "bg-gradient-to-br",
                          projectColors[i % projectColors.length]
                        );
                      }}
                    />
                  ) : (
                    <>
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
                          backgroundSize: "20px 20px",
                        }}
                      />
                      {/* Placeholder code icon */}
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white opacity-20">
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </>
                  )}
                  {proj.category && (
                    <span
                      className="absolute top-3 right-3 text-xs font-semibold px-3 py-1 rounded-full"
                      style={{
                        background: "rgba(20,168,0,0.2)",
                        border: "1px solid rgba(20,168,0,0.4)",
                        color: "#14a800",
                      }}
                    >
                      {proj.category}
                    </span>
                  )}
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 font-heading">
                    {proj.title || proj.name}
                  </h3>
                  <p className="text-[#8b9eb7] text-sm leading-relaxed mb-4">
                    {proj.desc || proj.description}
                  </p>

                  {/* Tech Badges */}
                  {proj.tech && (
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {(Array.isArray(proj.tech) ? proj.tech : proj.tech.split(",")).map((t: string, ti: number) => (
                        <span key={ti} className="tech-badge">{t.trim()}</span>
                      ))}
                    </div>
                  )}

                  {/* CTA */}
                  {(proj.projectUrl || proj.link) && (
                    <a
                      href={proj.projectUrl || proj.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#14a800] hover:text-[#1dbd00] transition-colors"
                    >
                      View Project
                      {/* External link icon */}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
