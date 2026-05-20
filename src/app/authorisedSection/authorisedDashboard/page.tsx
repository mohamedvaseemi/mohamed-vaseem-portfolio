"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Popup from "../components/Popup";

interface DecodedToken {
  authorised?: boolean;
  username?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [popup, setPopup] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const closePopup = () => setPopup("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      router.replace("/authorisedSection/login");
      return;
    }

    try {
      const decoded = jwtDecode<DecodedToken>(token);

      // ❌ INVALID TOKEN DATA
      if (!decoded?.authorised || !decoded?.username) {
        router.replace("/authorisedSection/login");
        return;
      }

      // ✅ AUTH OK
      setPageLoading(false);
    } catch {
      // ❌ DECODE FAILED
      router.replace("/authorisedSection/login");
    }
  }, [router]);

  // ⏳ Block render while checking auth
  if (pageLoading) {
    return <div className="min-h-screen bg-gray-900" />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center
                    bg-[#020617] text-[#f0f4ff] selection:bg-[#14a800]/30
                    text-white px-6">
      {popup && <Popup message={popup} onClose={closePopup} />}

      <h1 className="text-4xl font-bold mb-10 text-cyan-400 drop-shadow-lg">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3
                      gap-8 w-full max-w-5xl">
        {[
          { name: "About", route: "/authorisedSection/addAbout" },
          { name: "Education", route: "/authorisedSection/addEducation" },
          { name: "Experience", route: "/authorisedSection/addExperience" },
          { name: "Learning", route: "/authorisedSection/addLearning" },
          { name: "Projects", route: "/authorisedSection/addProject" },
          { name: "Edit Section", route: "/authorisedSection/editSection" },
          { name: "Feedbacks", route: "/authorisedSection/feedbacks" },
        ].map((item) => (
          <div
            key={item.name}
            onClick={() => router.push(item.route)}
            className="cursor-pointer bg-gray-800/70 hover:bg-cyan-600
                       hover:text-white p-8 rounded-2xl shadow-lg
                       hover:shadow-cyan-600/40 transition-all
                       transform hover:scale-105 text-center
                       font-semibold text-gray-200 backdrop-blur-md
                       border border-gray-700 hover:border-cyan-500"
          >
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
}
