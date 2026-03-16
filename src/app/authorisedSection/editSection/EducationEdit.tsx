"use client";

import { useEffect, useState } from "react";
import HTTPWrapper from "@/app/utils/HTTPWrapper";
import Popup from "@/app/authorisedSection/components/Popup";

interface EducationDoc {
  _id: string;
  degree: string;
  school: string;
  year: string;
  desc: string;
}

export default function EducationPage() {
  const [data, setData] = useState<EducationDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState("");
  const [editItem, setEditItem] = useState<EducationDoc | null>(null);
  const [editLoading, setEditLoading] = useState(false);

  const showPopup = (msg: string) => setPopup(msg);
  const closePopup = () => setPopup("");

  // --------------------------------------------
  // GET EDUCATION DATA
  // --------------------------------------------
  const fetchEducation = async () => {
    setLoading(true);
    try {
      const res = await HTTPWrapper.get("/education/get-education");
      setData(res?.data || []);
    } catch (err: any) {
      showPopup("Failed to load education data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  // ------------------------------------------------
  // DELETE EDUCATION
  // ------------------------------------------------
  const deleteEducation = async (id: string) => {
    try {
      await HTTPWrapper.delete(`/education/delete-education?id=${id}`);
      showPopup("Education deleted successfully!");
      fetchEducation();
    } catch {
      showPopup("Failed to delete item.");
    }
  };

  // ------------------------------------------------
  // EDIT SUBMIT
  // ------------------------------------------------
  const saveEducation = async () => {
    if (!editItem) return;
    setEditLoading(true);

    try {
      const res = await HTTPWrapper.put(
        `/education/update-education`,
        editItem  
      );
      if (!res?.status){
        showPopup("Failed to update education.");
        setEditLoading(false);
        return;
      };
      showPopup("Updated successfully!");
      setEditItem(null);
      fetchEducation();
    } catch {
      showPopup("Failed to update education.");
    } finally {
      setEditLoading(false);
    }
  };

  // ------------------------------------------------
  // UI BELOW
  // ------------------------------------------------

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 text-white p-8">
      <Popup message={popup} onClose={closePopup} />

      <h2 className="text-4xl font-bold text-center mb-10">Education</h2>

      {/* LOADING */}
      {loading && <p className="text-center text-gray-300">Loading...</p>}

      {/* LIST OF EDUCATIONS */}
      <div className="grid gap-6 max-w-3xl mx-auto">
        {data.map((edu) => (
          <div
            key={edu._id}
            className="bg-white/10 backdrop-blur-xl p-5 rounded-xl shadow-lg border border-white/10"
          >
            <h3 className="text-2xl font-semibold">{edu.degree}</h3>
            <p className="text-gray-300">{edu.school}</p>
            <p className="text-gray-400 text-sm">{edu.year}</p>
            <p className="mt-2 text-gray-200">{edu.desc}</p>

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => setEditItem(edu)}
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg font-semibold transition"
              >
                Edit
              </button>
              <button
                onClick={() => deleteEducation(edu._id)}
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
            <h3 className="text-2xl font-bold mb-4 text-center">Edit Item</h3>

            <input
              type="text"
              value={editItem.degree}
              onChange={(e) =>
                setEditItem({ ...editItem, degree: e.target.value })
              }
              className="w-full p-3 bg-gray-900 rounded-md border border-gray-700 mb-3 outline-none"
              placeholder="Degree"
            />

            <input
              type="text"
              value={editItem.school}
              onChange={(e) =>
                setEditItem({ ...editItem, school: e.target.value })
              }
              className="w-full p-3 bg-gray-900 rounded-md border border-gray-700 mb-3 outline-none"
              placeholder="School"
            />

            <input
              type="text"
              value={editItem.year}
              onChange={(e) =>
                setEditItem({ ...editItem, year: e.target.value })
              }
              className="w-full p-3 bg-gray-900 rounded-md border border-gray-700 mb-3 outline-none"
              placeholder="Year"
            />

            <textarea
              value={editItem.desc}
              onChange={(e) =>
                setEditItem({ ...editItem, desc: e.target.value })
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
                onClick={saveEducation}
                disabled={editLoading}
                className={`px-4 py-2 rounded-lg font-semibold transition 
                ${editLoading ? "bg-gray-600" : "bg-green-600 hover:bg-green-700"}
                `}
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
