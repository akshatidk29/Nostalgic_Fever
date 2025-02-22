// First, add these styles to your global CSS or tailwind.config.js

// Add to tailwind.config.js:
/*
module.exports = {
  theme: {
    extend: {
      animation: {
        'float': 'float 10s ease-in-out infinite',
        'tilt': 'tilt 10s infinite linear',
        'gradient': 'gradient 15s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        tilt: {
          '0%, 50%, 100%': {
            transform: 'rotate(0deg)',
          },
          '25%': {
            transform: 'rotate(2deg)',
          },
          '75%': {
            transform: 'rotate(-2deg)',
          },
        },
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
};
*/

// HomePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Search, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UseCapsuleStore } from "../Store/UseCapsuleStore";

const HomePage = () => {
  const navigate = useNavigate();
  const { getPublicCapsules, getUserCapsules } = UseCapsuleStore();
  const [publicCapsules, setPublicCapsules] = useState([]);
  const [privateCapsules, setPrivateCapsules] = useState([]);
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [showPublic, setShowPublic] = useState(true);
  const [modalImage, setModalImage] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const DISPLAY_LIMIT = 6;

  const shuffleArray = (array) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  useEffect(() => {
    const fetchCapsules = async () => {
      const fetchedPublicCapsules = await getPublicCapsules();
      const fetchedPrivateCapsules = await getUserCapsules();

      setPublicCapsules(shuffleArray(fetchedPublicCapsules).slice(0, DISPLAY_LIMIT));
      setPrivateCapsules(shuffleArray(fetchedPrivateCapsules).slice(0, DISPLAY_LIMIT));
    };
    fetchCapsules();
  }, []);

  const filteredCapsules = (showPublic ? publicCapsules : privateCapsules).filter(
    capsule =>
      capsule.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capsule.content?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      capsule.username?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-900 via-blue-950 to-slate-900 overflow-x-hidden">
      {/* Animated background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-full h-full">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-blue-400/10 animate-float"
              style={{
                width: Math.random() * 15 + 5 + "px",
                height: Math.random() * 15 + 5 + "px",
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animationDelay: Math.random() * 5 + "s",
                animationDuration: Math.random() * 10 + 10 + "s",
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative min-h-screen">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 to-transparent" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 pt-32 px-6 max-w-7xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-8xl font-bold mb-8 py-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-sky-200 to-blue-300 animate-gradient">
              Nostalgic Fever
            </h1>
            <p className="text-2xl text-blue-200/80 mb-12 font-light">
              Preserve today's moments, unlock tomorrow's memories
            </p>

            {/* Search Bar */}
            <motion.div variants={itemVariants} className="max-w-2xl mx-auto mb-64">
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt blur"></div>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-300" />
                  <input
                    type="text"
                    placeholder="Search time capsules..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-12 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-blue-200/20 text-white placeholder-blue-200/50 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-200"
                    >
                      <X size={20} />
                    </button>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Toggle */}
            <motion.div variants={itemVariants}>
              <div className="relative w-150 h-15 mx-auto bg-white/5 backdrop-blur-sm rounded-full flex items-center cursor-pointer border border-blue-200/20"
                onClick={() => setShowPublic(!showPublic)}>
                <motion.div
                  layout
                  className={`absolute w-1/2 h-12  rounded-full ${showPublic ? " bg-gradient-to-r from-blue-600/80 to-sky-600/80 " : " bg-gradient-to-r from-yellow-600/80 to-red-600/80"}`}
                  animate={{ x: showPublic ? 8 : "calc(100% - 8px)" }}  // Adjusted movement
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
                <span className={`absolute px-4 left-30 text-xl transition-opacity duration-300 ${showPublic ? "text-white" : "text-blue-200/60"}`}>
                  Public
                </span>
                <span className={`absolute px-4 right-30 text-xl transition-opacity duration-300 ${!showPublic ? "text-white" : "text-blue-200/60"}`}>
                  Private
                </span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Timeline Section */}
      <div className="max-w-6xl mx-auto px-6 relative">
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl font-bold text-center mb-16 text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-sky-200"
        >
          {showPublic ? "Public" : "Private"} Time Capsules
        </motion.h2>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line with gradient */}
          <div className="absolute left-1/2 w-1 bg-gradient-to-b from-blue-400 via-sky-400 to-blue-500 h-full transform -translate-x-1/2">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-blue-400 animate-ping" />
          </div>

          <AnimatePresence mode="wait">
            {filteredCapsules.map((capsule, index) => {
              const isLocked = new Date(capsule.openDate) > new Date();
              return (
                <motion.div
                  key={capsule._id}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center mb-16 group ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  {/* Timeline dot with pulse effect */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-sky-400 rounded-full" />
                    <div className="absolute top-0 left-0 w-5 h-5 bg-blue-400 rounded-full animate-ping opacity-20" />
                  </div>

                  <div className={`w-5/12 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-blue-200/20 p-6 cursor-pointer transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20"
                      onClick={() => !isLocked && setSelectedCapsule(capsule)}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-sky-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <div className="relative h-48 mb-4 overflow-hidden rounded-xl">
                        <img
                          src={capsule.images[0] || "default-image.png"}
                          alt={capsule.title}
                          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 ${isLocked ? "blur-md" : ""
                            }`}
                        />
                        {isLocked && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 flex items-center justify-center bg-black/50"
                          >
                            <Lock className="w-12 h-12 text-white animate-pulse" />
                          </motion.div>
                        )}
                      </div>

                      <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-sky-200 mb-2">
                        {capsule.title}
                      </h3>
                      <p className="text-blue-200/70 text-sm line-clamp-2 mb-4">{capsule.content}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-blue-300/60">By: {capsule.username || "Unknown"}</p>
                        <ChevronRight className="w-5 h-5 text-blue-300/60 group-hover:text-blue-200 transform group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {filteredCapsules.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-blue-200/60 py-20"
            >
              No capsules found matching your search.
            </motion.div>
          )}
        </div>
      </div>

      {/* Create Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-8 right-8 z-20"
      >
        <div className="relative group">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-sky-500 rounded-full opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt blur-lg"></div>
          <button
            onClick={() => navigate("/CreateCapsule")}
            className="relative px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-sky-600 text-white font-medium group-hover:shadow-lg group-hover:shadow-blue-500/50 transform hover:scale-105 transition-all duration-300"
          >
            Create Time Capsule
          </button>
        </div>
      </motion.div>


      {/* Modal Code (same as before) */}
      <AnimatePresence>
        {selectedCapsule && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center bg-black/80 backdrop-blur-md z-50"
            onClick={() => !modalImage && setSelectedCapsule(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/20 shadow-xl text-white relative ${modalImage ? "max-w-[90vw] max-h-[90vh]" : "max-w-2xl"
                }`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => modalImage ? setModalImage(false) : setSelectedCapsule(null)}
                className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50"
              >
                <X size={24} />
              </button>

              <motion.img
                src={selectedCapsule.images[0]}
                alt={selectedCapsule.title}
                className={`object-contain rounded-xl mb-4 cursor-pointer ${modalImage ? "w-full h-full" : "w-full h-64 object-cover"
                  }`}
                onClick={() => setModalImage(!modalImage)}
                whileHover={{ scale: modalImage ? 1 : 1.02 }}
              />

              {!modalImage && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-purple-200">
                    {selectedCapsule.title}
                  </h2>
                  <p className="text-violet-200/90 mt-4">{selectedCapsule.content}</p>
                  <p className="text-sm text-violet-300/60 mt-4">By: {selectedCapsule.username || "Unknown"}</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;