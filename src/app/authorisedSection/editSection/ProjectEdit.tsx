"use client";

import { useEffect, useState, useCallback } from "react";
import HTTPWrapper from "../../utils/HTTPWrapper";
import Popup from "../components/Popup";

interface Project {
  _id?: string;
  title: string;
  desc: string;
  project_url: string;
  image: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [current, setCurrent] = useState<Project>({
    title: "",
    desc: "",
    project_url: "",
    image: "",
  });

  const [base64Image, setBase64Image] = useState<string>("");

  const [popup, setPopup] = useState("");

  const showPopup = (msg: string) => setPopup(msg);
  const closePopup = () => setPopup("");

  // ---------------------------
  // FILE → BASE64
  // ---------------------------
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64Image(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  // ---------------------------
  // GET
  // ---------------------------
  const fetchProjects = useCallback(async () => {
    try {
      const res = await HTTPWrapper.get("/project/get-project");
      if (res?.status) {
        setProjects(res.data || []);
      }
    } catch (err: unknown) {
      showPopup(`GET projects failed : ${(err as Error).message}`);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  // ---------------------------
  // CREATE
  // ---------------------------
  const handleCreate = async () => {
    try {
      const payload = {
        title: current.title,
        desc: current.desc,
        project_url: current.project_url,
        image: base64Image,
      };

      const res = await HTTPWrapper.post("/project/add-project", payload);

      if (res.status) {
        showPopup("✅ Project added successfully!");
        fetchProjects();
        resetForm();
      }
    } catch (err: unknown) {
      showPopup(`Create failed : ${(err as Error).message}`);
    }
  };

  // ---------------------------
  // UPDATE
  // ---------------------------
  const handleUpdate = async () => {
    try {
      const payload = {
        _id: current._id,
        title: current.title,
        desc: current.desc,
        project_url: current.project_url,
        image: base64Image || current.image,
      };

      const res = await HTTPWrapper.put(
        `/project/update-project`,
        payload
      );

      if (res.status) {
        showPopup("Project updated successfully!");
        fetchProjects();
        resetForm();
      }
    } catch (err: unknown) {
      showPopup(`Update failed : ${(err as Error).message}`);
    }
  };

  // ---------------------------
  // DELETE
  // ---------------------------
  const handleDelete = async (id: string) => {
    try {
      const res = await HTTPWrapper.delete(`/project/delete-project?id=${id}`);
      if (res.status) {
        showPopup("Project deleted successfully!");
        fetchProjects();
      }
    } catch (err: unknown) {
      showPopup(`Failed to delete project : ${(err as Error).message}`);
    }
  };

  // ---------------------------
  // EDIT MODE
  // ---------------------------
  const handleEdit = (item: Project) => {
    setEditMode(true);
    setCurrent(item);
    setBase64Image("");
  };

  const resetForm = () => {
    setEditMode(false);
    setCurrent({
      title: "",
      desc: "",
      project_url: "",
      image: "",
    });
    setBase64Image("");
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-white">
      {popup && <Popup message={popup} onClose={closePopup} />}
      <h1 className="text-2xl font-bold mb-6">Projects</h1>

      {/* FORM */}
      <div className="bg-gray-800 p-6 rounded-xl mb-8 space-y-4">
        <input
          type="text"
          placeholder="Project Title"
          className="w-full p-3 bg-gray-700 rounded"
          value={current.title}
          onChange={(e) => setCurrent({ ...current, title: e.target.value })}
        />

        <input
          type="text"
          placeholder="Project URL"
          className="w-full p-3 bg-gray-700 rounded"
          value={current.project_url}
          onChange={(e) =>
            setCurrent({ ...current, project_url: e.target.value })
          }
        />

        <textarea
          placeholder="Description"
          className="w-full p-3 bg-gray-700 rounded"
          rows={4}
          value={current.desc}
          onChange={(e) => setCurrent({ ...current, desc: e.target.value })}
        />

        {/* IMAGE */}
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="text-white"
          />

          {(base64Image || current.image) && (
            <img
              src={base64Image || current.image}
              alt="preview"
              className="w-40 h-40 object-cover rounded border"
            />
          )}
        </div>

        {/* ACTION */}
        {editMode ? (
          <div className="space-x-3">
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 rounded"
            >
              Update
            </button>
            <button
              onClick={resetForm}
              className="px-4 py-2 bg-gray-600 rounded"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-600 rounded"
          >
            Add Project
          </button>
        )}
      </div>

      {/* LIST */}
      <div className="space-y-4">
        {projects.map((p) => (
          <div
            key={p._id}
            className="bg-gray-900 p-4 rounded-xl flex justify-between items-center"
          >
            <div className="flex items-center space-x-4">
              <img
                src={p.image}
                alt={p.title || "Project preview"}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h2 className="text-lg font-semibold">{p.title}</h2>
                <p className="text-sm text-gray-300">{p.desc}</p>
                <a
                  href={p.project_url}
                  target="_blank"
                  className="text-blue-400 text-sm"
                >
                  Visit Project
                </a>
              </div>
            </div>

            <div className="space-x-3">
              <button
                onClick={() => handleEdit(p)}
                className="px-3 py-1 bg-yellow-600 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(p._id!)}
                className="px-3 py-1 bg-red-600 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
