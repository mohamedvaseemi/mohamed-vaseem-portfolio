"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import Popup from "../../authorisedSection/components/Popup";
import Link from "next/link";

interface DecodedToken {
  authorised?: boolean;
  username?: string;
}

interface FeedbackRecord {
  _id: string;
  name: string;
  email: string;
  message: string;
  date: string;
  time: string;
}

export default function FeedbacksPage() {
  const router = useRouter();
  const [popup, setPopup] = useState("");
  const [pageLoading, setPageLoading] = useState(true);
  const [feedbacks, setFeedbacks] = useState<FeedbackRecord[]>([]);

  const closePopup = () => setPopup("");

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
      setPageLoading(false);
      fetchFeedbacks();
    } catch {
      router.replace("/authorisedSection/login");
    }
  }, [router]);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("/api/contact");
      const data = await res.json();
      if (data?.status) {
        setFeedbacks(data.data || []);
      } else {
        setPopup("Failed to load feedbacks.");
      }
    } catch (error) {
      setPopup("Error fetching feedbacks.");
    }
  };

  if (pageLoading) return <div className="min-h-screen bg-gray-900" />;

  return (
    <div className="min-h-screen bg-[#020617] text-[#f0f4ff] selection:bg-[#14a800]/30 p-6 relative">
      {popup && <Popup message={popup} onClose={closePopup} />}
      
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-4xl font-bold text-cyan-400 drop-shadow-lg">User Feedbacks</h1>
          <Link href="/authorisedSection/authorisedDashboard" className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded transition">
            Back to Dashboard
          </Link>
        </div>

        {feedbacks.length === 0 ? (
          <div className="text-gray-400 text-center py-20 bg-gray-800/50 rounded-xl border border-gray-700">
            No feedbacks received yet.
          </div>
        ) : (
          <div className="grid gap-6">
            {feedbacks.map((item) => (
              <div key={item._id} className="bg-gray-800/70 p-6 rounded-xl border border-gray-700 hover:border-cyan-500/50 transition">
                <div className="flex justify-between items-start mb-4 border-b border-gray-700 pb-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">{item.name}</h3>
                    {item.email && <a href={`mailto:${item.email}`} className="text-cyan-400 text-sm hover:underline">{item.email}</a>}
                  </div>
                  <div className="text-right text-xs text-gray-400 font-mono">
                    <p>{item.date}</p>
                    <p>{item.time}</p>
                  </div>
                </div>
                <p className="text-gray-300 whitespace-pre-wrap">{item.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
