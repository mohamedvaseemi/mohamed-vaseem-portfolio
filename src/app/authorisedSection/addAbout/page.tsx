"use client";

import { useState, useEffect } from "react";
import HTTPWrapper from "../../utils/HTTPWrapper";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Popup from "../components/Popup";

interface DecodedToken {
  authorised?: boolean;
  username?: string;
}

export default function AddAboutPage() {
  const [form, setForm] = useState({
    heading: "",
    text: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [popup, setPopup] = useState("");

  const showPopup = (msg: string) => setPopup(msg);
  const closePopup = () => setPopup("");

  const [pageLoading, setPageLoading] = useState(true);

  const router = useRouter();

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
    } catch (error) {
      // ❌ DECODE FAILED
      router.replace("/authorisedSection/login");
    }
  }, [router]);

  if (pageLoading) return <div className="text-white"></div>;


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await HTTPWrapper.post("/about/add-about", form);
      if (response?.status === 200 || response?.status) {
        setMessage("✅ About details added successfully!");
        setPopup("✅ About details added successfully!");
        setForm({ heading: "", text: "" });
      } else {
        setMessage("❌ Failed to add details.");
      }
    } catch (err: any) {
      setMessage("⚠️ Error occurred while submitting form.");
      showPopup(`Error founded : ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <Popup message={popup} onClose={closePopup} />
      <h1 className="text-4xl font-bold mb-8">Add About Details</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/70 p-8 rounded-2xl shadow-lg w-full max-w-lg flex flex-col gap-5"
      >
        <div>
          <label className="block text-gray-300 mb-2">Heading</label>
          <input
            type="text"
            value={form.heading}
            onChange={(e) => setForm({ ...form, heading: e.target.value })}
            placeholder="Enter heading"
            required
            className="w-full p-3 rounded-md bg-gray-900 border border-gray-600 outline-none text-white"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-2">Text</label>
          <textarea
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            placeholder="Enter about text"
            required
            className="w-full p-3 h-32 rounded-md bg-gray-900 border border-gray-600 outline-none text-white resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-cyan-600 hover:bg-cyan-500"
            }`}
        >
          {loading ? "Submitting..." : "Add About"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-300 mt-4">{message}</p>
        )}
      </form>
    </main>
  );
}
