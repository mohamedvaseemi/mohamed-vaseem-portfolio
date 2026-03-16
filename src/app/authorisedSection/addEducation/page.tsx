"use client";

import { useState, useEffect } from "react";
import HTTPWrapper from "../../utils/HTTPWrapper";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Popup from "../components/Popup";

interface EducationForm {
  degree: string;
  school: string;
  year: string;
  desc: string;
}

interface DecodedToken {
  authorised?: boolean;
  username?: string;
}

export default function AddEducationPage() {
  const [form, setForm] = useState<EducationForm>({
    degree: "",
    school: "",
    year: "",
    desc: "",
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
      const response = await HTTPWrapper.post("/education/add-education", form);
      if (response?.status === 200 || response?.status) {
        setMessage("✅ Education details added successfully!");
        setForm({ degree: "", school: "", year: "", desc: "" });
      } else {
        setMessage("❌ Failed to add education details.");
      }
    } catch (err: any) {
      showPopup(`Error founded : ${err.message}`);
      setMessage("⚠️ Error occurred while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8">
      <Popup message={popup} onClose={closePopup} />
      <h1 className="text-4xl font-bold mb-8">Add Education Details</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-lg flex flex-col gap-6"
      >
        {/* Degree */}
        <div>
          <label className="block text-gray-300 mb-2">Degree</label>
          <input
            type="text"
            value={form.degree}
            onChange={(e) => setForm({ ...form, degree: e.target.value })}
            placeholder="Enter degree"
            required
            className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-white outline-none"
          />
        </div>

        {/* School */}
        <div>
          <label className="block text-gray-300 mb-2">School</label>
          <input
            type="text"
            value={form.school}
            onChange={(e) => setForm({ ...form, school: e.target.value })}
            placeholder="Enter school name"
            required
            className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-white outline-none"
          />
        </div>

        {/* Year */}
        <div>
          <label className="block text-gray-300 mb-2">Year</label>
          <input
            type="text"
            value={form.year}
            onChange={(e) => setForm({ ...form, year: e.target.value })}
            placeholder="Enter year range (e.g., 2022 – 2025)"
            required
            className="w-full p-3 rounded-md bg-gray-900 border border-gray-700 text-white outline-none"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-300 mb-2">Description</label>
          <textarea
            value={form.desc}
            onChange={(e) => setForm({ ...form, desc: e.target.value })}
            placeholder="Enter description"
            required
            className="w-full p-3 h-32 rounded-md bg-gray-900 border border-gray-700 text-white outline-none resize-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg text-white font-semibold transition-all ${loading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-cyan-600 hover:bg-cyan-500"
            }`}
        >
          {loading ? "Submitting..." : "Add Education"}
        </button>

        {message && (
          <p className="text-center text-sm text-gray-300 mt-4">{message}</p>
        )}
      </form>
    </main>
  );
}
