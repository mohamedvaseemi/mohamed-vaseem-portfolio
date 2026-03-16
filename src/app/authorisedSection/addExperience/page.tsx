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

export default function ExperiencePage() {
  const [formData, setFormData] = useState({
    role: "",
    company: "",
    duration: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);

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
    } catch {
      // ❌ DECODE FAILED
      router.replace("/authorisedSection/login");
    }
  }, [router]);

  if (pageLoading) return <div className="text-white"></div>;


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await HTTPWrapper.post("/experience/add-experience", formData);
      if (response?.status === 200 || response?.status) {
        showPopup("✅ Experience added successfully!");
      }
      else{
        showPopup("❌ Failed to add experience.");
      }

      setFormData({
        role: "",
        company: "",
        duration: "",
        description: "",
      });
    } catch (err: unknown) {
      showPopup(`Error founded : ${(err as Error).message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-indigo-900 text-white">
      <Popup message={popup} onClose={closePopup} />
      <h2 className="text-4xl font-bold mb-8">Add Experience</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-[90%] sm:w-[500px] space-y-4"
      >
        <div>
          <label className="block mb-1 font-medium">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Company</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Duration</label>
          <input
            type="text"
            name="duration"
            placeholder="e.g., Jan 2023 - Present"
            value={formData.duration}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            required
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-indigo-500"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg font-semibold transition-colors ${loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
            }`}
        >
          {loading ? "Saving..." : "Add Experience"}
        </button>
      </form>
    </section>
  );
}
