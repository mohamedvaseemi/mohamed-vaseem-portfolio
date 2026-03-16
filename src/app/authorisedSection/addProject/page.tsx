"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import HTTPWrapper from "../../utils/HTTPWrapper";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Popup from "../components/Popup";

interface DecodedToken {
  authorised?: boolean;
  username?: string;
}

export default function AddProjectPage() {
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    project_url: "",
    image: "",
  });

  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState("");
  const [pageLoading, setPageLoading] = useState(true);

  const showPopup = (msg: string) => setPopup(msg);
  const closePopup = () => setPopup("");

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

  // --------------------------------------
  //   Input Change Handler
  // --------------------------------------
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --------------------------------------
  //   Image Change (Base64 same as Learning Page)
  // --------------------------------------
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, image: reader.result as string }));
    };

    reader.readAsDataURL(file);
  };

  // --------------------------------------
  //   Submit Form (Send JSON instead of FormData)
  // --------------------------------------
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.desc || !formData.project_url || !formData.image) {
      showPopup("⚠️ Please fill all fields!");
      return;
    }

    setLoading(true);

    try {
      await HTTPWrapper.post("/project/add-project", formData);

      setPopup("✅ Project added successfully!");

      setFormData({
        title: "",
        desc: "",
        project_url: "",
        image: "",
      });
    } catch (error: any) {
      showPopup(`Error founded : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  // --------------------------------------
  //   UI
  // --------------------------------------
  return (
    <section className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-blue-900 text-white">
      <Popup message={popup} onClose={closePopup} />

      <h2 className="text-4xl font-bold mb-8">Add Project</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-md p-8 rounded-lg shadow-lg w-[90%] sm:w-[500px] space-y-4"
      >
        {/* Project Title */}
        <div>
          <label className="block mb-1 font-medium">Project Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g., AI Chat Assistant"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Project URL */}
        <div>
          <label className="block mb-1 font-medium">Project URL</label>
          <input
            type="text"
            name="project_url"
            value={formData.project_url}
            onChange={handleChange}
            required
            placeholder="https://yourproject.com"
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Project Description */}
        <div>
          <label className="block mb-1 font-medium">Project Description</label>
          <textarea
            name="desc"
            value={formData.desc}
            onChange={handleChange}
            required
            placeholder="Short description about your project..."
            rows={4}
            className="w-full p-2 rounded bg-gray-800 text-white border border-gray-700 focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Project Image Upload */}
        <div>
          <label
            htmlFor="file-upload"
            className="block mb-1 font-medium cursor-pointer flex justify-center"
          >
            <img
              width="300px"
              src="/upload.png"
              alt="Upload"
              className="rounded-lg shadow-md hover:opacity-80 transition"
            />
          </label>

          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />

          {/* Image Preview */}
          {formData.image && (
            <div className="mt-3">
              <p className="text-sm text-gray-300 mb-1">Preview:</p>
              <img
                src={formData.image}
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
          className={`w-full py-2 rounded-lg font-semibold transition-colors ${loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          {loading ? "Saving..." : "Add Project"}
        </button>
      </form>
    </section>
  );
}
