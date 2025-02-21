import React, { useState, useEffect } from 'react';
import { Users, Globe, BookOpen } from 'lucide-react';

const AboutPage = () => {
  const [rotation, setRotation] = useState(0);
  
  // Rotating effect for the icon
  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 relative overflow-hidden">
      {/* Hero Section */}
      <div className="mb-8 mt-32 w-80% mx-auto relative h-80 overflow-hidden shadow-2xl flex items-center justify-center">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

        {/* Background Image */}
        <img
          src="aboutbg.jpg"
          alt="About Nostalgic Fever"
          className="w-full h-full object-cover"
        />

        {/* Overlay Text */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 text-white text-center">
          <h2 className="text-6xl font-bold mb-2">Preserve Memories, Forever.</h2>
          <p className="text-lg italic opacity-90">Your Digital Time Capsules Await</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mt-16 mb-16 rounded-4xl mx-auto px-6 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
            Our Mission
          </h1>
          <p className="text-indigo-900 text-lg leading-relaxed">
            Nostalgic Fever is your gateway to reliving moments that matter. Whether it’s a heartfelt letter to your future self, a collection of cherished photos, or an archive of life’s milestones, our platform ensures that your memories are preserved safely and shared meaningfully.
          </p>
        </div>

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <FeatureCard
            icon={<Globe />}
            title="Public & Private Capsules"
            description="Decide who can access your memories – keep them private or share them with the world."
          />
          <FeatureCard
            icon={<Users />}
            title="Community Stories"
            description="Join a global network of memory keepers, contributing to a shared history."
          />
          <FeatureCard
            icon={<BookOpen />}
            title="Secure & Timed Release"
            description="Your memories stay locked until the set reveal date, ensuring a special moment."
          />
        </div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/80 backdrop-blur-lg p-8 rounded-4xl shadow-lg border border-indigo-200 hover:shadow-xl transition-all">
    <div className="text-indigo-500 mb-4 w-12 h-12">{icon}</div>
    <h3 className="text-2xl font-semibold text-indigo-800 mb-4">{title}</h3>
    <p className="text-indigo-700">{description}</p>
  </div>
);

export default AboutPage;