import React from "react";
import { Calendar, Image } from "lucide-react";

const dummyCapsules = [
  { year: "2020", title: "First Memory", image: "i1.png", unlockDate: "Dec 2025" },
  { year: "2021", title: "Summer Festival", image: "i2.png", unlockDate: "Jun 2026" },
  { year: "2022", title: "Time Vault", image: "i3.png", unlockDate: "Jan 2027" },
  { year: "2023", title: "City Chronicles", image: "i4.png", unlockDate: "Jul 2028" },
  { year: "2024", title: "Future Letter", image: "i5.png", unlockDate: "Dec 2029" },
];

const TimelinePage = () => {
  return (
    <div className="min-h-screen pt-32 bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white py-16 px-6">
      <h1 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300">
        Your Time Capsules
      </h1>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical Line */}
        <div className="absolute left-1/2 w-1 bg-indigo-500 h-full transform -translate-x-1/2"></div>

        {dummyCapsules.map((capsule, index) => (
          <div key={index} className={`relative flex items-center mb-16 group ${index % 2 === 0 ? "justify-start" : "justify-end"}`}>
            {/* Timeline Dot */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 bg-indigo-400 rounded-full group-hover:scale-150 transition-transform duration-300"></div>

            {/* Capsule Content */}
            <div className={`w-5/12 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
              <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/10 hover:bg-white/20 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {/* Image */}
                <div className="relative h-40 mb-4 overflow-hidden rounded-lg">
                  <img
                    src={capsule.image}
                    alt={capsule.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                </div>

                {/* Capsule Details */}
                <h3 className="text-xl font-bold text-indigo-300 mb-2">{capsule.title}</h3>
                <div className="flex items-center justify-between text-sm text-indigo-200">
                  <span className="flex items-center space-x-2"><Calendar className="w-4 h-4 text-indigo-400" /> {capsule.year}</span>
                  <span className="px-2 py-1 bg-indigo-900/50 rounded-full flex items-center space-x-1">
                    <Image className="w-4 h-4 text-indigo-300" /> <span>Opens: {capsule.unlockDate}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimelinePage;
