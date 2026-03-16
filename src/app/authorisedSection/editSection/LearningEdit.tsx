import React, { useEffect, useState } from "react";
import HTTPWrapper from "@/app/utils/HTTPWrapper";
import Popup from "@/app/authorisedSection/components/Popup";

interface Learning {
    _id: string;
    name: string;
    logo: string;
}

const LearningsPage: React.FC = () => {
    const [learnings, setLearnings] = useState<Learning[]>([]);
    const [editMode, setEditMode] = useState(false);
    const [currentItem, setCurrentItem] = useState<Learning>({
        _id: "",
        name: "",
        logo: "",
    });
    const [base64Logo, setBase64Logo] = useState<string>("");

    const [popup, setPopup] = useState("");

  const showPopup = (msg: string) => setPopup(msg);
  const closePopup = () => setPopup("");

    // --------------------------
    // Convert File → Base64
    // --------------------------
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setBase64Logo(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    // --------------------------
    // GET Learnings API
    // --------------------------
    const fetchLearnings = async () => {
        try {
            const res = await HTTPWrapper.get("/learning/get-learning");
            if (res?.status) {
                setLearnings(res.data || []);
            }
        } catch (error: any) {
            showPopup(`GET learnings failed : ${error.message}`);
        }
    };

    useEffect(() => {
        fetchLearnings();
    }, []);

    // --------------------------
    // CREATE
    // --------------------------
    const handleCreate = async () => {
        try {
            const payload = {
                name: currentItem.name,
                logo: base64Logo, // base64 image
            };

            const res = await HTTPWrapper.post("/learning/add-learning", payload);

            if (res.status) {
                showPopup("✅ Learning added successfully!");
                fetchLearnings();
                resetForm();
            }
        } catch (error: any) {
            showPopup(`Create failed : ${error.message}`);
        }
    };

    // --------------------------
    // UPDATE
    // --------------------------
    const handleUpdate = async () => {
        try {
            const payload = {
                _id: currentItem._id,
                name: currentItem.name,
                logo: base64Logo || currentItem.logo,
            };

            const res = await HTTPWrapper.put(`/learning/update-learning`, payload);

            if (res.status) {
                showPopup("✅ Learning updated successfully!");
                fetchLearnings();
                resetForm();
            }
        } catch (error: any) {
            showPopup(`Update failed : ${error.message}`);
        }
    };

    // --------------------------
    // DELETE
    // --------------------------
    const handleDelete = async (id: string) => {
        try {
            const res = await HTTPWrapper.delete(`/learning/delete-learning?id=${id}`);
            if (res.status) {
                showPopup("✅ Learning deleted successfully!");
                fetchLearnings();
            }
        } catch (error: any) {
            showPopup(`Failed to delete learning : ${error.message}`);
        }
    };

    // --------------------------
    // Edit Mode Handler
    // --------------------------
    const handleEditClick = (item: Learning) => {
        setEditMode(true);
        setCurrentItem(item);
        setBase64Logo("");
    };

    const resetForm = () => {
        setEditMode(false);
        setCurrentItem({ _id: "", name: "", logo: "" });
        setBase64Logo("");
    };

    return (
        <div className="p-6 w-full max-w-3xl mx-auto">
            {popup && <Popup message={popup} onClose={closePopup} />}
            <h1 className="text-2xl font-bold mb-4">Learnings</h1>

            {/* FORM */}
            <div className="p-4 border rounded-xl mb-6 bg-gray-800 text-white space-y-4">
                <input
                    type="text"
                    placeholder="Learning Name"
                    className="w-full p-3 rounded bg-gray-700 border border-gray-500"
                    value={currentItem.name}
                    onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                />

                {/* Image Upload */}
                <div className="space-y-3">
                    <label className="text-sm font-semibold">Upload Logo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="w-full text-white"
                    />

                    {/* Preview */}
                    {base64Logo || currentItem.logo ? (
                        <img
                            src={base64Logo || currentItem.logo}
                            alt="preview"
                            className="w-32 h-32 object-cover rounded border"
                        />
                    ) : null}
                </div>

                {/* ACTION BUTTON */}
                {editMode ? (
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-blue-600 rounded text-white"
                    >
                        Update Learning
                    </button>
                ) : (
                    <button
                        onClick={handleCreate}
                        className="px-4 py-2 bg-green-600 rounded text-white"
                    >
                        Add Learning
                    </button>
                )}

                {editMode && (
                    <button
                        onClick={resetForm}
                        className="ml-3 px-4 py-2 bg-gray-600 rounded text-white"
                    >
                        Cancel
                    </button>
                )}
            </div>

            {/* LIST */}
            <div className="space-y-4">
                {learnings.map((item) => (
                    <div
                        key={item._id}
                        className="p-4 border rounded-xl flex items-center justify-between bg-gray-900 text-white"
                    >
                        <div className="flex items-center space-x-4">
                            <img
                                src={item.logo}
                                alt="logo"
                                className="w-16 h-16 object-cover rounded"
                            />
                            <p className="text-lg font-medium">{item.name}</p>
                        </div>

                        <div className="space-x-3">
                            <button
                                onClick={() => handleEditClick(item)}
                                className="px-3 py-1 bg-yellow-600 rounded"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(item._id!)}
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
};

export default LearningsPage;
