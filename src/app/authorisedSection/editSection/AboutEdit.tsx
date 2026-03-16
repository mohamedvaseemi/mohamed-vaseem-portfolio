"use client";

import { useEffect, useState, FormEvent } from "react";
import HTTPWrapper from "../../utils/HTTPWrapper";
import Popup from "../components/Popup";

interface AboutData {
  _id: string;
  heading: string;
  text: string;
}

export default function AboutPage() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [popup, setPopup] = useState("");
  
  const showPopup = (msg: string) => setPopup(msg);
  const closePopup = () => setPopup("");

  const [editData, setEditData] = useState<AboutData>({
    _id: "",
    heading: "",
    text: "",
  });

  // ------------------------------------------------------
  // 1️⃣ GET - Fetch About Details
  // ------------------------------------------------------
  const fetchAbout = async () => {
    try {
      const res = await HTTPWrapper.get("/about/get-about");
      if (res?.status) {
        setAbout(res?.data[0]);
        return;
      } else {
        setAbout(null);
      }
    } catch (error: any) {
      showPopup(`Error founded : ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchAbout();
  }, []);

  // ------------------------------------------------------
  // 2️⃣ DELETE - Delete About Details
  // ------------------------------------------------------
  const handleDelete = async (id: string) => {
    if (!about) return;

    setDeleting(true);

    try {
      const res = await HTTPWrapper.delete(`/about/delete-about?id=${id}`);

      if (res?.status) {
        showPopup("About details deleted!");
        setAbout(null);
      }
    } catch (err) {
      showPopup("Failed to delete.");
    } finally {
      setDeleting(false);
    }
  };

  // ------------------------------------------------------
  // 3️⃣ EDIT - Enable Edit Mode
  // ------------------------------------------------------
  const enableEditMode = () => {
    if (!about) return;
    setEditData(about);
    setEditMode(true);
  };

  // ------------------------------------------------------
  // 4️⃣ UPDATE - PATCH About Details
  // ------------------------------------------------------
  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    setUpdating(true);

    try {
      const res = await HTTPWrapper.put("/about/update-about", editData);

      if (res?.status) {
        showPopup("Updated successfully!");

        setEditMode(false);
        fetchAbout();
      }
    } catch (err: any) {
      showPopup(`Error founded : ${err.message}`);
    } finally {
      setUpdating(false);
    }
  };

  // ------------------------------------------------------
  // UI
  // ------------------------------------------------------

  if (loading) return <p className="text-gray-400">Loading...</p>;

  return (
    <div className="p-6 space-y-6 text-white">
      {popup && <Popup message={popup} onClose={closePopup} />}

      {/* =================== VIEW MODE =================== */}
      {!editMode && (
        <>
          {about ? (
            <div className="space-y-4">
              <h3 className="text-3xl font-bold">{about.heading}</h3>
              <p className="text-gray-300 whitespace-pre-line">{about.text}</p>

              <div className="flex gap-4 mt-6">
                <button
                  onClick={enableEditMode}
                  className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(about._id)}
                  disabled={deleting}
                  className={`px-4 py-2 rounded-lg ${deleting
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-red-600 hover:bg-red-500"
                    }`}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-lg">No About details available.</p>
          )}
        </>
      )}

      {/* =================== EDIT MODE =================== */}
      {editMode && (
        <form
          onSubmit={handleUpdate}
          className="space-y-4 bg-white/10 p-6 rounded-lg backdrop-blur-md"
        >
          <h3 className="text-2xl font-bold mb-2">Edit About</h3>

          <div>
            <label className="block mb-1">Heading</label>
            <input
              type="text"
              name="heading"
              value={editData.heading}
              onChange={(e) =>
                setEditData({ ...editData, heading: e.target.value })
              }
              required
              className="w-full p-2 rounded bg-gray-900 border border-gray-600"
            />
          </div>

          <div>
            <label className="block mb-1">Text</label>
            <textarea
              name="text"
              rows={5}
              value={editData.text}
              onChange={(e) =>
                setEditData({ ...editData, text: e.target.value })
              }
              required
              className="w-full p-2 rounded bg-gray-900 border border-gray-600"
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={updating}
              className={`px-4 py-2 rounded-lg ${updating
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-500"
                }`}
            >
              {updating ? "Updating..." : "Save Changes"}
            </button>

            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="px-4 py-2 bg-gray-600 rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
