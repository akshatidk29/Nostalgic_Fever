import React, { useState } from "react";
import { UseCapsuleStore } from "../Store/UseCapsuleStore";
import { useNavigate } from "react-router-dom";

const CreateCapsulePage = () => {
  const { createCapsule } = UseCapsuleStore();
  const navigate = useNavigate();

  // ✅ State management
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [isPrivate, setIsPrivate] = useState(true);
  const [openDate, setOpenDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ✅ Handle file selection
  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  // ✅ Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Separate images and videos before uploading
    const imageFiles = files.filter(file => file.type.startsWith("image/"));
    const videoFiles = files.filter(file => file.type.startsWith("video/"));

    try {
      await createCapsule({ title, content, images: imageFiles, videos: videoFiles, isPrivate, openDate });
      navigate("/Timeline"); // Redirect after success
    } catch (err) {
      setError("Failed to create capsule. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-32 flex flex-col items-center justify-center bg-gradient-to-b from-gray-900 to-indigo-900 text-white px-6">
      <h1 className="text-4xl font-bold text-indigo-300 mb-8">Create a Time Capsule</h1>

      {error && <p className="text-red-400">{error}</p>}

      {/* ✅ Capsule Creation Form */}
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        
        {/* ✅ Title Input */}
        <InputField label="Title" value={title} setValue={setTitle} required />

        {/* ✅ Description Input */}
        <TextareaField label="Description" value={content} setValue={setContent} required />

        {/* ✅ File Upload */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Upload Files</label>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            accept="image/*,video/*,.txt,.pdf"
            className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white cursor-pointer"
          />
        </div>

        {/* ✅ Privacy Selection */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Privacy</label>
          <div className="flex space-x-6">
            <RadioOption label="Private" checked={isPrivate} onChange={() => setIsPrivate(true)} />
            <RadioOption label="Community" checked={!isPrivate} onChange={() => setIsPrivate(false)} />
          </div>
        </div>

        {/* ✅ Open Date Selection */}
        <InputField label="Open Date" type="date" value={openDate} setValue={setOpenDate} required />

        {/* ✅ Submit Button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 rounded-lg text-lg font-medium transition-transform transform hover:scale-105 shadow-lg"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Capsule"}
        </button>
      </form>
    </div>
  );
};

// ✅ Reusable Input Field Component
const InputField = ({ label, type = "text", value, setValue, required = false }) => (
  <div className="mb-6">
    <label className="block text-lg font-medium mb-2">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
      required={required}
    />
  </div>
);

// ✅ Reusable Textarea Component
const TextareaField = ({ label, value, setValue, required = false }) => (
  <div className="mb-6">
    <label className="block text-lg font-medium mb-2">{label}</label>
    <textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
      rows="4"
      required={required}
    />
  </div>
);

// ✅ Reusable Radio Button Component
const RadioOption = ({ label, checked, onChange }) => (
  <label className="flex items-center space-x-2 cursor-pointer">
    <input type="radio" className="hidden peer" checked={checked} onChange={onChange} />
    <span className="w-5 h-5 border border-white/50 rounded-full peer-checked:bg-indigo-500"></span>
    <span>{label}</span>
  </label>
);

export default CreateCapsulePage;
