import React, { useState } from "react";
import { UseCapsuleStore } from "../Store/UseCapsuleStore";
import { useNavigate } from "react-router-dom";

const CreateCapsulePage = () => {
  const { createCapsule } = UseCapsuleStore();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState([]);
  const [isPrivate, setIsPrivate] = useState(true);
  const [openDate, setOpenDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    setFiles([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Separate images and videos before uploading
    const imageFiles = files.filter(file => file.type.startsWith("image/"));
    const videoFiles = files.filter(file => file.type.startsWith("video/"));

    try {
      await createCapsule({ title, content, images: imageFiles, videos: videoFiles, isPrivate, openDate });
      navigate("/Timeline");
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

      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Description</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            rows="4"
            required
          />
        </div>

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

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Privacy</label>
          <div className="flex space-x-6">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="private"
                checked={isPrivate}
                onChange={() => setIsPrivate(true)}
                className="hidden peer"
              />
              <span className="w-5 h-5 border border-white/50 rounded-full peer-checked:bg-indigo-500"></span>
              <span>Private</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value="community"
                checked={!isPrivate}
                onChange={() => setIsPrivate(false)}
                className="hidden peer"
              />
              <span className="w-5 h-5 border border-white/50 rounded-full peer-checked:bg-indigo-500"></span>
              <span>Community</span>
            </label>
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium mb-2">Open Date</label>
          <input
            type="date"
            value={openDate}
            onChange={(e) => setOpenDate(e.target.value)}
            className="w-full bg-white/10 border border-white/30 rounded-lg p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none"
            required
          />
        </div>

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

export default CreateCapsulePage;