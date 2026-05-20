"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import AboutPage from "@/app/authorisedSection/editSection/AboutEdit";
import EducationPage from "@/app/authorisedSection/editSection/EducationEdit";
import ExperiencePage from "@/app/authorisedSection/editSection/ExperienceEdit";
import LearningPage from "@/app/authorisedSection/editSection/LearningEdit";
import ProjectsPage from "@/app/authorisedSection/editSection/ProjectEdit";
import { jwtDecode } from "jwt-decode";

interface DecodedToken {
  authorised?: boolean;
  username?: string;
}

const tabs = [
  { id: 1, label: "About" },
  { id: 2, label: "Education" },
  { id: 3, label: "Experience" },
  { id: 4, label: "Learning" },
  { id: 5, label: "Projects" },
];

export default function AdminSwitcherPage() {
  const [active, setActive] = useState<number>(1);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/authorisedSection/login");
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);

      if (!decoded?.authorised || !decoded?.username) {
        router.replace("/authorisedSection/login");
        return;
      }
    } catch {
      router.replace("/authorisedSection/login");
    }
  }, [router]);

  const renderPage = () => {
    switch (active) {
      case 1:
        return <AboutPage />;

      case 2:
        return <EducationPage />;

      case 3:
        return <ExperiencePage />;

      case 4:
        return <LearningPage />;

      case 5:
        return <ProjectsPage />;

      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen bg-[#020617] p-10 text-[#f0f4ff] selection:bg-[#14a800]/30 flex flex-col items-center">

      {/* Top Tabs */}
      <div className="flex gap-4 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all
              ${active === tab.id
                ? "bg-blue-500 scale-105"
                : "bg-gray-700 hover:bg-gray-600"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Animated Content */}
      <div className="w-full max-w-6xl bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg min-h-[450px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.3 }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
