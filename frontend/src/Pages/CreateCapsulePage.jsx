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
      console.log("Failed to create capsule. Try again.", error)
      setError("Failed to create capsule. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen pt-32 flex flex-col lg:flex-row items-center mt-3 justify-center px-12"
      style={{
        backgroundImage: "url('CreateCapsule_BG.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* ✅ Left Section - Heading */}
      <div className="lg:w-1/2 flex flex-col ml-12 text-left">
        <h1 className="text-8xl font-bold text-white mb-8">Create <h1>
          A
        </h1>
          <h1 className="italic">

            Time
          </h1>
          Capsule.</h1>

        {error && <p className="text-red-400">{error}</p>}
      </div>

      {/* ✅ Right Section - Form */}
      <div className="lg:w-1/2  mt-10 mb-10 flex justify-center">
        <form
          onSubmit={handleSubmit}
          className="bg-white/50 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl w-3/4 p-8 max-w-2xl 
               transition-transform transform hover:scale-[1.02] duration-300 text-xl"
        >
          {/* ✅ Title Input */}
          <InputField
            label="Title"
            value={title}
            setValue={setTitle}
            required
            className="bg-white/10 border border-white/30 focus:ring-2 focus:ring-blue-500 rounded-xl"
          />

          {/* ✅ Description Input */}
          <TextareaField
            label="Description"
            value={content}
            setValue={setContent}
            required
            className="bg-white/10 border border-white/30 focus:ring-2 focus:ring-blue-500 rounded-xl"
          />

          {/* ✅ File Upload */}
          <div className="mb-6">
            <label className="block text-lg font-medium  mb-2">Upload Files</label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              accept="image/*,video/*,.txt,.pdf"
              className="w-full bg-white/10 border border-white/30 rounded-xl p-3 text-white cursor-pointer 
                   file:bg-blue-600 file:border-none file:text-white file:py-2 file:px-4 
                   file:rounded-xl hover:file:bg-blue-700 transition-all duration-300"
            />
          </div>

          {/* ✅ Privacy Selection */}
          <div className="mb-6">
            <label className="block text-lg font-medium  mb-2">Privacy</label>
            <div className="flex space-x-6">
              <RadioOption
                label="Private"
                checked={isPrivate}
                onChange={() => setIsPrivate(true)}
                className="hover:bg-white/10 transition-all duration-300 rounded-xl px-3 py-2"
              />
              <RadioOption
                label="Community"
                checked={!isPrivate}
                onChange={() => setIsPrivate(false)}
                className="hover:bg-white/10 transition-all duration-300 rounded-xl px-3 py-2"
              />
            </div>
          </div>

          {/* ✅ Open Date Selection */}
          <InputField
            label="Unlock Date"
            type="date"
            value={openDate}
            setValue={setOpenDate}
            required
            className="bg-white/10 border border-white/30 focus:ring-2 focus:ring-blue-500 rounded-xl"
          />

          {/* ✅ Submit Button */}
          <button
            type="submit"
            className="w-2/5 bg-blue-500 hover:from-indigo-700 hover:to-blue-700 
                 text-white py-4 rounded-2xl text-lg font-medium transition-transform transform 
                 hover:scale-105 shadow-lg hover:shadow-blue-500/50 duration-300"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Capsule"}
          </button>
        </form>
      </div>

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
