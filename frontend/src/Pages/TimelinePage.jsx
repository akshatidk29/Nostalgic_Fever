import React, { useEffect } from "react";
import { Calendar, Image, Lock } from "lucide-react";
import { UseCapsuleStore } from "../Store/UseCapsuleStore";
import { UseAuthStore } from "../Store/UseAuthStore";

const TimelinePage = () => {
  const { capsules, getUserCapsules, loading } = UseCapsuleStore();
  const { authUser } = UseAuthStore();

  useEffect(() => {
    if (authUser) {
      getUserCapsules();
    }
  }, [authUser, getUserCapsules]);

  const currentDate = new Date();

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300">
        Your Time Capsules
      </h1>

      {loading ? (
        <p className="text-center text-indigo-300">Loading capsules...</p>
      ) : (
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Line */}
          <div className="absolute left-1/2 w-1 bg-indigo-500 h-full transform -translate-x-1/2"></div>

          {capsules.length === 0 ? (
            <p className="text-center text-gray-400">No capsules found.</p>
          ) : (
            capsules.map((capsule, index) => {
              const isUnlocked = new Date(capsule.openDate) <= currentDate;

              return (
                <div
                  key={capsule._id}
                  className={`relative flex items-center mb-16 group ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-indigo-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>

                  {/* Capsule Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                    <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:bg-white/20 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                      {/* Image */}
                      <div className="relative h-40 mb-4 overflow-hidden rounded-lg">
                        <img
                          src={capsule.images[0] || "default-image.jpg"}
                          alt={capsule.title}
                          className={`w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500 ${isUnlocked ? "" : "blur-md"}`}
                        />
                        {!isUnlocked && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <Lock className="w-10 h-10 text-white" />
                          </div>
                        )}
                      </div>

                      {/* Capsule Details */}
                      <h3 className="text-xl font-bold text-indigo-300 mb-2">{capsule.title}</h3>
                      <div className="flex items-center justify-between text-sm text-indigo-200">
                        <span className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-indigo-400" /> {new Date(capsule.createdAt).getFullYear()}
                        </span>
                        <span className="px-2 py-1 bg-indigo-900/50 rounded-full flex items-center space-x-1">
                          <Image className="w-4 h-4 text-indigo-300" /> <span>Opens: {new Date(capsule.openDate).toDateString()}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default TimelinePage;