import React from "react";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-12 px-6">
      {/* Title */}
      <h1 className="text-5xl font-extrabold text-indigo-600 mb-6">About Krachhack</h1>
      
      {/* Description Section */}
      <div className="max-w-4xl text-center text-gray-700 space-y-6">
        <p className="text-lg">
          Krachhack is a dynamic platform dedicated to empowering developers and innovators.
          We believe in **creativity, collaboration, and technology** as the core pillars for building a better future.
        </p>

        <p className="text-lg">
          Our mission is to **foster innovation, provide top-notch resources, and build a strong tech community** where ideas flourish.
        </p>
      </div>

      {/* Features Section */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
        {/* Feature 1 */}
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-indigo-600 mb-2">🚀 Innovation</h2>
          <p className="text-gray-600">We embrace cutting-edge technology to create a better tomorrow.</p>
        </div>

        {/* Feature 2 */}
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-indigo-600 mb-2">🤝 Community</h2>
          <p className="text-gray-600">A strong network of like-minded developers and professionals.</p>
        </div>

        {/* Feature 3 */}
        <div className="bg-white shadow-lg p-6 rounded-lg text-center">
          <h2 className="text-2xl font-bold text-indigo-600 mb-2">📚 Learning</h2>
          <p className="text-gray-600">Resources, workshops, and events to help you grow.</p>
        </div>
      </div>

      {/* Call to Action */}
      <button className="mt-10 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg text-lg font-medium transition-all">
        Join Us Today
      </button>
    </div>
  );
};

export default About;
