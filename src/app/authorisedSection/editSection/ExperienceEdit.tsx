"use client";

import { useEffect, useState } from "react";
import HTTPWrapper from "@/app/utils/HTTPWrapper";
import Popup from "@/app/authorisedSection/components/Popup";

interface ExperienceDoc {
  _id: string;
  role: string;
  company: string;
  duration: string;
  description: string;
}

export default function ExperiencePage() {
  const [data, setData] = useState<ExperienceDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState("");
  const [editItem, setEditItem] = useState<ExperienceDoc | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  const showPopup = (msg: string) => setPopup(msg);
  const closePopup = () => setPopup("");

  // ----------------------------------------------------
  // GET EXPERIENCES
  // ----------------------------------------------------
  const fetchExperiences = async () => {
    setLoading(true);
    try {
      const res = await HTTPWrapper.get("/experience/get-experience");
      setData(res?.data || []);
    } catch (err) {
      showPopup("Failed to load experiences.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
  }, []);

  // ----------------------------------------------------
  // DELETE EXPERIENCE
  // ----------------------------------------------------
  const deleteExperience = async (id: string) => {
    try {
      const res = await HTTPWrapper.delete(`/experience/delete-experience?id=${id}`);
      if (res.status) {
        showPopup("Experience deleted successfully!");
        fetchExperiences();
      }
    } catch {
      showPopup("Failed to delete.");
    }
  };

  // ----------------------------------------------------
  // SAVE EDIT
  // ----------------------------------------------------
  const saveExperience = async () => {
    if (!editItem) return;
    setEditLoading(true);

    try {
      const res = await HTTPWrapper.put(
        `/experience/update-experience`,
        editItem
      );

      if (res.status) {
        showPopup("Updated successfully!");
        setEditItem(null);
        fetchExperiences();
      }
    } catch {
      showPopup("Failed to update experience.");
    } finally {
      setEditLoading(false);
    }
  };

  // ----------------------------------------------------
  // UI BELOW
  // ----------------------------------------------------

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8">
      <Popup message={popup} onClose={closePopup} />

      <h2 className="text-4xl font-bold text-center mb-10">Experience</h2>

      {/* LOADING */}
      {loading && <p className="text-center text-gray-300">Loading...</p>}

      {/* LIST */}
      <div className="grid gap-6 max-w-3xl mx-auto">
        {data.map((exp) => (
          <div
            key={exp._id}
            className="bg-white/10 backdrop-blur-xl p-5 rounded-xl shadow-lg border border-white/10"
          >
            <h3 className="text-2xl font-semibold">{exp.role}</h3>
            <p className="text-gray-300">{exp.company}</p>
            <p className="text-gray-400 text-sm">{exp.duration}</p>
            <p className="mt-2 text-gray-200">{exp.description}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setEditItem(exp)}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-semibold transition"
              >
                Edit
              </button>

              <button
                onClick={() => deleteExperience(exp._id)}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-semibold transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}
      {editItem && (
        <div className="fixed inset-0 bg-black/60 flex justify-center items-center z-50">
          <div className="bg-gray-800/90 backdrop-blur-xl p-6 rounded-xl w-[90%] sm:w-[450px] border border-white/20 shadow-xl">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Edit Experience
            </h3>

            <input
              type="text"
              value={editItem.role}
              onChange={(e) =>
                setEditItem({ ...editItem, role: e.target.value })
              }
              className="w-full p-3 bg-gray-900 rounded-md border border-gray-700 mb-3 outline-none"
              placeholder="Role"
            />

            <input
              type="text"
              value={editItem.company}
              onChange={(e) =>
                setEditItem({ ...editItem, company: e.target.value })
              }
              className="w-full p-3 bg-gray-900 rounded-md border border-gray-700 mb-3 outline-none"
              placeholder="Company"
            />

            <input
              type="text"
              value={editItem.duration}
              onChange={(e) =>
                setEditItem({ ...editItem, duration: e.target.value })
              }
              className="w-full p-3 bg-gray-900 rounded-md border border-gray-700 mb-3 outline-none"
              placeholder="Duration"
            />

            <textarea
              value={editItem.description}
              onChange={(e) =>
                setEditItem({ ...editItem, description: e.target.value })
              }
              rows={4}
              className="w-full p-3 bg-gray-900 rounded-md border border-gray-700 mb-3 outline-none"
              placeholder="Description"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setEditItem(null)}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={saveExperience}
                disabled={editLoading}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  editLoading
                    ? "bg-gray-600"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                {editLoading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
