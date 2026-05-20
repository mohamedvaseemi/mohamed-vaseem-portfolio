"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import HTTPWrapper from "../../utils/HTTPWrapper";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Popup from "../components/Popup";
import { getTechIcon } from "../../utils/techIcons";

interface LearningForm {
  name: string;
  logo: string;
}

interface DecodedToken {
  authorised?: boolean;
  username?: string;
}

export default function AddLearningPage() {
  const [formData, setFormData] = useState<LearningForm>({
    name: "",
    logo: "",
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
    } catch {
      // ❌ DECODE FAILED
      router.replace("/authorisedSection/login");
    }
  }, [router]);

  if (pageLoading) return <div className="text-white"></div>;


  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, logo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  // ✅ Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit handler
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const Icon = getTechIcon(formData.name);
    
    if (!formData.name || (!formData.logo && !Icon)) {
      setPopup("⚠️ Please fill the name and either upload a logo or use a known tech name for icons!");
      setMessage("⚠️ Please fill the name and either upload a logo or use a known tech name for icons!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      await HTTPWrapper.post("/learning/add-learning", formData);
      setPopup("✅ Learning added successfully!");
      setMessage("✅ Learning added successfully!");
      setFormData({ name: "", logo: "" });
    } catch (error: unknown) {
      showPopup(`Error founded : ${(error as Error).message}`);
      setMessage("❌ Failed to add learning.");
    } finally {
      setLoading(false);
    }
  };

  const PreviewIcon = getTechIcon(formData.name);

  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-[#020617] text-[#f0f4ff] selection:bg-[#14a800]/30 p-8">
      <Popup message={popup} onClose={closePopup} />
      <h2 className="text-4xl font-bold mb-8 text-cyan-400 drop-shadow-lg">
        Add Learning
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-gray-800/70 backdrop-blur-md p-8 rounded-2xl shadow-lg w-[90%] sm:w-[480px] space-y-5"
      >
        {/* Technology Name */}
        <div>
          <label className="block mb-2 text-gray-300 font-medium font-bold">
            Technology Name
          </label>
          <div className="flex items-center gap-4">
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., React, Next.js"
              required
              className="flex-1 p-3 rounded-md bg-gray-900 border border-gray-700 text-white outline-none focus:ring-2 focus:ring-cyan-500"
            />
            {PreviewIcon && (
              <div className="bg-gray-900 p-2 rounded-lg border border-cyan-500/50">
                <PreviewIcon className="text-4xl text-cyan-400" />
              </div>
            )}
          </div>
          <p className="text-[10px] text-gray-400 mt-1">
            Tip: Modern icons are automatically detected from the name.
          </p>
        </div>

        {/* Logo Upload */}
        <div className={PreviewIcon ? "opacity-50" : ""}>
          <label className="block mb-2 text-gray-300 font-medium">
            Logo Image (Optional if icon found)
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-sm text-gray-400
              file:mr-4 file:py-3 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-cyan-600 file:text-white
              hover:file:bg-cyan-500 cursor-pointer"
          />

          {/* ✅ Image Preview */}
          {formData.logo && (
            <div className="mt-3">
              <p className="text-sm text-gray-300 mb-1">Preview:</p>
              <img
                src={formData.logo}
                alt="Preview"
                className="w-full max-h-60 object-cover rounded shadow-md border border-gray-700"
              />
            </div>
          )}
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
          {loading ? "Saving..." : "Add Learning"}
        </button>

        {/* Message */}
        {message && (
          <p className="text-center text-sm text-gray-300 mt-4">{message}</p>
        )}
      </form>
    </section>
  );
}
