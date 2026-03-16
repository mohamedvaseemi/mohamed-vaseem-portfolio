"use client";
import { useRef, useEffect, useState } from "react";
import { contactData } from "../../data/portfolio";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="contact" ref={ref} className="section-gradient-2 py-24 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-[#14a800] text-sm font-semibold uppercase tracking-widest mb-3">
          Get In Touch
        </p>
        <h2
          className={`section-title text-3xl md:text-4xl font-bold text-white mb-8 transition-all duration-700 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          Let&apos;s Work Together
        </h2>

        <p className={`text-[#8b9eb7] text-lg max-w-2xl mx-auto mb-12 transition-all duration-700 delay-100 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          Currently accepting new freelance projects. If you have an idea or a project that needs a professional touch, I&apos;d love to hear from you.
        </p>

        <div className={`grid sm:grid-cols-2 gap-6 transition-all duration-700 delay-200 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {/* Email Card */}
          <a
            href={`mailto:${contactData.email}`}
            className="glass-card rounded-2xl p-8 group hover:border-[rgba(20,168,0,0.4)] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#14a800]/10 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#14a800]">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <h3 className="text-white font-bold mb-1">Email Me</h3>
            <p className="text-[#8b9eb7] text-sm">{contactData.email}</p>
          </a>

          {/* Upwork Card */}
          <a
            href={contactData.upworkUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="glass-card rounded-2xl p-8 group hover:border-[rgba(20,168,0,0.4)] transition-all duration-300"
          >
            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#14a800]/10 transition-colors">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="text-[#14a800]">
                <path d="M18.61 11.776c-1.037 0-1.806-.801-2.197-1.523l-1.28 5.81c1.33.635 2.86 1.073 4.467 1.073 3.178 0 5.4-1.98 5.4-5.12 0-3.5-2.93-5.52-6.39-4.24zm0 6.972c-1.188 0-2.34-.32-3.24-.834l-1.48 6.71c-1.76.34-3.56.34-5.32 0l-1.17-5.31C5.57 20.428 3.44 21.21 1 21.21c0-1.737.18-3.415.534-5.045l3.01-13.68C3.84 2.085 3.18 1.67 3.18 1.11c0-1.103 1.31-1.11 1.31-1.11H6.3c.63 0 1.14.42 1.29.99l2.35 10.68c.73.785 1.62 1.362 2.61 1.362z" />
              </svg>
            </div>
            <h3 className="text-white font-bold mb-1">Upwork</h3>
            <p className="text-[#8b9eb7] text-sm">Hire me on Upwork</p>
          </a>
        </div>

        {/* Social Links */}
        <div className={`mt-12 flex justify-center gap-6 transition-all duration-700 delay-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <a href={contactData.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#8b9eb7] hover:text-white transition-colors">
            GitHub
          </a>
          <a href={contactData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[#8b9eb7] hover:text-white transition-colors">
            LinkedIn
          </a>
        </div>

        <p className="mt-16 text-[#4d6280] text-xs">
          © {new Date().getFullYear()} {contactData.email.split('@')[0]}. All rights reserved. Built with Next.js & Tailwind.
        </p>
      </div>
    </section>
  );
}
