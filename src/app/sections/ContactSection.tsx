"use client";
import { useRef, useEffect, useState } from "react";
import { contactData } from "../../data/portfolio";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (err) {
      setFormStatus('error');
    }
  };

  return (
    <section id="contact" ref={ref} className="section-gradient-2 py-24 px-6">
      <div className="max-w-6xl mx-auto text-center">
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

        <p className={`text-[#8b9eb7] text-lg max-w-2xl mx-auto mb-16 transition-all duration-700 delay-100 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          Open to full-time engineering roles in Mumbai & Pune, as well as freelance engagements. If you have an exciting opportunity or a project that needs professional execution, I&apos;d love to connect.
        </p>

        <div className="grid md:grid-cols-2 gap-12 text-left">
          {/* Left Side: Contact Cards */}
          <div className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}>
            <h3 className="text-2xl font-bold text-white mb-6">Connect with me</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {/* LinkedIn Card */}
              <a
                href={contactData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-6 group hover:border-[rgba(20,168,0,0.4)] transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#14a800]/10 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#14a800]">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </div>
                <h4 className="text-white font-bold mb-1">LinkedIn</h4>
              </a>

              {/* GitHub Card */}
              <a
                href={contactData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-6 group hover:border-[rgba(20,168,0,0.4)] transition-all duration-300 flex flex-col items-center text-center"
              >
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#14a800]/10 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#14a800]">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                </div>
                <h4 className="text-white font-bold mb-1">GitHub</h4>
              </a>

              {/* Indeed Card */}
              <a
                href={contactData.indeedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-card rounded-2xl p-6 group hover:border-[rgba(20,168,0,0.4)] transition-all duration-300 flex flex-col items-center text-center sm:col-span-2"
              >
                <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#14a800]/10 transition-colors">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-[#14a800]">
                    <path d="M20 7h-4V5a3 3 0 00-3-3h-2a3 3 0 00-3 3v2H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm-9-2h2a1 1 0 011 1v2h-4V5a1 1 0 011-1zm1 10a2 2 0 110-4 2 2 0 010 4z" />
                  </svg>
                </div>
                <h4 className="text-white font-bold mb-1">Indeed</h4>
              </a>
            </div>

            {/* Social icon row */}
            <div className="mt-8 flex justify-center sm:justify-start gap-4">
              <a
                href={contactData.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-[#8b9eb7] hover:text-white hover:border-[rgba(20,168,0,0.4)] transition-all duration-300"
                aria-label="GitHub"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
              <a
                href={contactData.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-[#8b9eb7] hover:text-white hover:border-[rgba(20,168,0,0.4)] transition-all duration-300"
                aria-label="LinkedIn"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href={contactData.indeedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 glass-card rounded-full flex items-center justify-center text-[#8b9eb7] hover:text-white hover:border-[rgba(20,168,0,0.4)] transition-all duration-300"
                aria-label="Indeed"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 7h-4V5a3 3 0 00-3-3h-2a3 3 0 00-3 3v2H4a2 2 0 00-2 2v11a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zm-9-2h2a1 1 0 011 1v2h-4V5a1 1 0 011-1zm1 10a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right Side: Feedback Form */}
          <div className={`glass-card rounded-2xl p-8 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <h3 className="text-2xl font-bold text-white mb-6">Leave Feedback</h3>
            
            {formStatus === 'success' ? (
              <div className="bg-[#14a800]/10 border border-[#14a800]/30 text-[#14a800] p-4 rounded-xl text-center">
                <svg className="w-8 h-8 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <p className="font-medium">Message sent successfully!</p>
                <p className="text-sm mt-1 opacity-80">Thank you for your feedback.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm text-[#8b9eb7] mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#14a800]/50 transition-colors"
                    placeholder="Your Name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm text-[#8b9eb7] mb-1">Email (Optional)</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#14a800]/50 transition-colors"
                    placeholder="Your Email"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-[#8b9eb7] mb-1">Feedback / Message</label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#14a800]/50 transition-colors resize-none"
                    placeholder="What do you think about my project?"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={formStatus === 'loading'}
                  className="mt-2 w-full bg-[#14a800] hover:bg-[#118f00] text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {formStatus === 'loading' ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : 'Send Message'}
                </button>
                {formStatus === 'error' && (
                  <p className="text-red-400 text-sm mt-2 text-center">Something went wrong. Please try again.</p>
                )}
              </form>
            )}
          </div>
        </div>

        <p className="mt-16 text-[#4d6280] text-xs text-center">
          © {new Date().getFullYear()} Mohamed Vaseem. All rights reserved. Built with Next.js & Tailwind.
        </p>
      </div>
    </section>
  );
}
