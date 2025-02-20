import React from "react";

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      {/* Welcome Message */}
      <h1 className="text-4xl font-bold text-indigo-600 mb-4">
        Welcome to Krachhack 🚀
      </h1>
      <p className="text-lg text-gray-700 max-w-lg">
        Empowering developers and innovators to build the future. Join us and
        explore the best of technology, development, and creativity!
      </p>

      {/* Call to Action */}
      <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all">
        Get Started
      </button>
    </div>
  );
};

export default HomePage;
