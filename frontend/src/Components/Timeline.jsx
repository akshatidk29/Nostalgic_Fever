import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, ChevronRight } from "lucide-react";

const Timeline = ({ capsules, showPublic, setSelectedCapsule, show = true }) => {
  return (
    <div>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`mt-60 text-6xl font-bold text-center mb-16 text-blue-700 bg-clip-text  font-[Playfair Display] transition-all duration-500`} >
        {show ? `${showPublic ? "Public" : "Private"} Vault` : ""}
      </motion.h2>

      {/* Timeline Container */}
      <div className="relative mx-auto px-70">
        {/* Animated Timeline Line */}
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "100%" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute left-1/2 w-1 bg-black transform -translate-x-1/2"
        >
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-black animate-ping" />
        </motion.div>

        {/* Capsules List */}
        <AnimatePresence mode="popLayout">
          {capsules.map((capsule, index) => {
            const isLocked = new Date(capsule.openDate) > new Date();
            const isLeft = index % 2 === 0;

            return (
              <motion.div
                key={capsule._id}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  transition: {
                    duration: 0.6,
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }
                }}
                viewport={{ once: true, margin: "-100px" }}
                className={`relative flex items-center mb-12 group ${isLeft ? "justify-start" : "justify-end"}`}
              >
                {/* Timeline Dot and Arrow */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="absolute left-1/2 transform -translate-x-1/2 z-10"
                >
                  {/* Dot */}
                  <div className="w-5 h-5 bg-black rounded-full" />
                  <div className="absolute top-0 left-0 w-5 h-5 bg-black rounded-full animate-ping opacity-20" />

                  {/* Animated Arrow */}
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    whileInView={{ width: "80px", opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
                    className={`absolute top-1/2 -translate-y-1/2 h-0.5 bg-black
                      ${isLeft ? 'right-full' : 'left-full'}`}
                  >
                    {/* Arrow Head */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.7 }}
                      className={`absolute ${isLeft ? '-right-2' : '-left-2'} -top-1.5 
                        border-t-[8px] border-t-transparent 
                        border-b-[8px] border-b-transparent
                        ${isLeft ? 'border-r-[10px] border-black' : 'border-l-[10px] border-black'}`}
                    />
                  </motion.div>
                </motion.div>

                {/* Capsule Container */}
                <div className={`w-1/3`}>
                  <motion.div
                    whileHover={{ y: -5, scale: 1.02 }}
                    className="group relative overflow-hidden rounded-4xl p-4 border border-black cursor-pointer transition-all duration-300 "
                    onClick={() => !isLocked && setSelectedCapsule(capsule)}
                  >
                    {/* Capsule Image or Video with Reveal Animation */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.4 }}
                      className="relative h-44 mb-3 overflow-hidden rounded-2xl border"
                    >
                      {capsule.images[0] ? (
                        <img
                          src={capsule.images[0]}
                          alt={capsule.title}
                          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${isLocked ? "blur-md" : ""}`}
                        />
                      ) : capsule.videos[0] ? (
                        <video
                          src={capsule.videos[0]}
                          className="w-full h-full object-cover"
                          autoPlay
                          loop
                          muted
                        />
                      ) : (
                        <img
                          src="Profile.png"
                          alt="Default"
                          className="w-full h-full object-cover"
                        />
                      )}

                      {/* Locked Capsule Overlay */}
                      {isLocked && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-md"
                        >
                          <Lock className="w-10 h-10" />
                        </motion.div>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                    >
                      <h3 className="text-2xl font-semibold mb-1">
                        {capsule.title}
                      </h3>
                      <p className="text-sm line-clamp-2 mb-3">{capsule.content}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-xs">By: {capsule.username || "Unknown"}</p>
                        <ChevronRight className="w-5 h-5 transform group-hover:translate-x-1 transition-all" />
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* No Capsules Found */}
        {capsules.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            No capsules found matching your search.
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Timeline;