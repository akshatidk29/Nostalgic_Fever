import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Search, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { UseCapsuleStore } from "../Store/UseCapsuleStore";
import Timeline from "../Components/Timeline"
import AnimatedOrb from "../Components/AnimateOrbit";
import { NeuralNetwork } from "../Components/NeuralNetwork";

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

  const text = "Preserve Your Memories";
  const [visibleText, setVisibleText] = useState("");
  const [showCursor, setShowCursor] = useState(true); // For blinking "_"
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleText((prev) => text.slice(0, (index % text.length) + 1));
      setIndex((prevIndex) => prevIndex + 1);
    }, 200); // Speed of letter appearance

    return () => clearInterval(interval);
  }, [index]);
  // Blinking effect for the underscore
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 200); // Blink every 500ms

    return () => clearInterval(cursorInterval);
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
    <div className="min-h-screen  overflow-x-hidden">
      <div className="relative min-h-screen">
        <div className="absolute inset-0" />
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 pt-32  max-w-7xl  mx-15"
        >
          <motion.div variants={itemVariants} className="text-left">
            <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-40 mb-25">
              {/* Left Side - Text */}
              <div className="text-center lg:text-left">
                <h1 className="text-6xl md:text-9xl font-bold mb-4 py-6 text-blue-900 animate-gradient font-[Cinzel Decorative]">
                  Nostalgic Fever
                </h1>
                <p className="text-xl md:text-3xl text-blue-800  font-light font-[Great Vibes]">
                  Preserve today's moments, unlock tomorrow's memories
                </p>
              </div>

              {/* Right Side - Animated Orb */}
              <div className="flex justify-center">
                <AnimatedOrb />
              </div>
            </div>

            <div className="text-left mb-20">
              <motion.h2
                className="text-7xl font-bold text-blue-400 mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {visibleText}
                <motion.span
                  animate={{ opacity: showCursor ? 1 : 0 }} // Blinking cursor effect
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  _
                </motion.span>
              </motion.h2>
              <button
                onClick={() => navigate("/CreateCapsule")}
                className="px-6  h-20 mt-12 mb-24 py-3 text-2xl font-semibold text-blue-900 border border-black rounded-3xl hover:scale-105 transition-all "
              >
                Create a Time Capsule
              </button>

            </div>
            <div className="flex flex-col lg:flex-row items-center  gap-10 lg:gap-0 mb-16">
              {/* Left Side - Text */}
              <div className="text-left lg:w-1/2">
                <h2 className="text-9xl pb-12 font-bold text-transparent bg-clip-text bg-blue-900 mb-6 font-[Playfair Display]">
                  Your <br />
                  <span className="block">Nostalgia</span>
                </h2>
              </div>

              {/* Right Side - Neural Network Component */}
              <div className="flex justify-center lg:w-3/4">
                <NeuralNetwork />
              </div>
            </div>

            <button
              onClick={() => navigate("/Timeline")}
              className="relative px-8 py-4 m-4 mb-44 border  border-black rounded-3xl text-3xl text-blue-900  font-bold hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
            >
              Teleport
            </button>

            <div
              className="relative w-full h-[500px] flex flex-col items-center justify-center bg-cover bg-center mb-60"
              style={{ backgroundImage: "url('About_BG.jpg')" }}
            >
              {/* Dark Overlay for Contrast */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Heading */}
              <h2 className="relative text-8xl font-bold text-white text-center font-[Playfair Display] px-6">
                Relive Memories, <br /> One Frame at a Time
              </h2>

              {/* Explore Button (Centered Below Heading) */}
              <button
                onClick={() => navigate("/All")}
                className="relative px-8 py-4 mt-6 bg-white border border-black rounded-3xl text-3xl text-blue-900 font-bold hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
              >
                Explore
              </button>
            </div>



            <div
              className="relative w-full h-[500px] flex flex-col items-center justify-center bg-cover bg-center"
              style={{ backgroundImage: "url('About_BG.jpg')" }}
            >
              {/* Dark Overlay for Contrast */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Heading */}
              <h2 className="relative text-8xl font-bold text-white text-center font-[Playfair Display] px-6">
                Leaderboard
              </h2>

              {/* Check Button (Centered Below Heading) */}
              <button
                onClick={() => navigate("/Leaderboard")}
                className="relative px-8 py-4 mt-6 border border-black rounded-3xl text-3xl text-blue-900 font-bold bg-white hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
              >
                Check
              </button>
            </div>


            <h2 className="text-6xl mt-50  ml-80 mb-24 font-bold text-blue-900 text-left font-[Playfair Display]">
              A Glimpse Into the Past
            </h2>


            <div className="flex justify-center gap-8 mt-12">
              <button
                onClick={() => setShowPublic(true)}
                className={`px-10 py-4 text-xl font-semibold rounded-3xl shadow-lg 
      ${showPublic ? "border border-blue-900 scale-125 transition-all" : ""}`}
              >
                Public
              </button>

              <button
                onClick={() => setShowPublic(false)}
                className={`px-10 py-4 text-xl font-semibold rounded-3xl shadow-lg 
      ${!showPublic ? "border border-blue-900 scale-125 transition-all" : ""}`}
              >
                Private
              </button>
            </div>


          </motion.div>
        </motion.div>

      </div>

      {/* Timeline Section */}
      <Timeline capsules={filteredCapsules} showPublic={showPublic} setSelectedCapsule={setSelectedCapsule} show={true} />



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

              {selectedCapsule.images[0] ? (
                <motion.img
                  src={selectedCapsule.images[0]}
                  alt={selectedCapsule.title}
                  className={`object-contain rounded-xl mb-4 cursor-pointer ${modalImage ? "w-full h-full" : "w-full h-64 object-cover"}`}
                  onClick={() => setModalImage(!modalImage)}
                  whileHover={{ scale: modalImage ? 1 : 1.02 }}
                />
              ) : selectedCapsule.videos[0] ? (
                <motion.video
                  src={selectedCapsule.videos[0]}
                  className={`object-contain rounded-xl mb-4 cursor-pointer ${modalImage ? "w-full h-full" : "w-full h-64 object-cover"}`}
                  onClick={() => setModalImage(!modalImage)}
                  whileHover={{ scale: modalImage ? 1 : 1.02 }}
                  autoPlay
                  loop
                  muted
                  controls // Enables video controls
                />
              ) : (
                <motion.img
                  src="Profile.png"
                  alt="Default"
                  className="w-full h-64 object-cover rounded-xl mb-4 cursor-pointer"
                  whileHover={{ scale: 1.02 }}
                />
              )}


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