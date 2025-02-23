import React, { useState, useEffect } from "react";
import { Users, Shield, Award, Brain, MessageCircle, Sparkles, Clock } from "lucide-react";

const AboutPage = () => {
  const [rotation, setRotation] = useState(0);

  // ✅ Rotating effect for the icon
  useEffect(() => {
    const timer = setInterval(() => {
      setRotation((prev) => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 relative overflow-hidden">
      {/* ✅ Hero Section */}
      <div className="mb-8 mt-20 w-80% mx-auto relative h-100 overflow-hidden shadow-2xl flex items-center justify-center">
        {/* ✅ Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

        {/* ✅ Background Image */}
        <img
          src="About_BG.jpg"
          alt="About Nostalgic Fever"
          className="w-full h-full object-cover"
        />

        {/* ✅ Overlay Text */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 text-white text-center">
          <h2 className="text-6xl font-bold mb-2">Capture. Lock. Relive.</h2>
          <p className="text-lg italic opacity-90">
            Your Digital Time Capsules, Secured for the Future
          </p>
        </div>
      </div>

      {/* ✅ Main Content */}
      <div className="container mt-16 mb-16 rounded-4xl mx-auto px-6 py-16 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 pb-6 bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
            Why Nostalgic Fever?
          </h1>
          <p className="text-indigo-900 text-lg leading-relaxed">
            We believe that memories are more than just moments—they are stories waiting to be rediscovered.
            Nostalgic Fever allows you to store, secure, and gamify your memories while ensuring privacy, engagement, and longevity.
          </p>
        </div>

        {/* ✅ Features Section */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <FeatureCard
            icon={<Clock />}
            title="Dynamic Timeline: Relive Every Moment"
            description="Unlock your time capsules on a personalized timeline, allowing you to travel back to cherished memories effortlessly."
          />
          <FeatureCard
            icon={<Shield />}
            title="Decentralized Security: Your Memories, Your Control"
            description="With blockchain verification, your memories stay tamper-proof and forever yours—no third-party interference."
          />
          <FeatureCard
            icon={<Brain />}
            title="AI-Powered Sentiment Analysis: Understand Your Story"
            description="Analyze emotions within your capsules to see how your experiences evolve over time."
          />
          <FeatureCard
            icon={<Award />}
            title="Leaderboard & Streaks: Climb the Nostalgia Ranks"
            description="Earn rewards, maintain streaks, and compete on the leaderboard by engaging with your stored memories."
          />
          <FeatureCard
            icon={<Sparkles />}
            title="Generative AI: Your Nostalgia Companion"
            description="Have a buddy to talk with—our AI-powered chatbot understands your emotions, shares meaningful conversations."
          />

          <FeatureCard
            icon={<MessageCircle />}
            title="Community-Driven Chat: Connect, Share, Reminisce"
            description="Engage with like-minded individuals, share stories, and spark conversations through our immersive community chat."
          />
        </div>
      </div>
    </div>
  );
};

// ✅ Reusable Feature Card Component
const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/80 backdrop-blur-lg p-8 rounded-4xl shadow-lg border border-indigo-200 hover:shadow-xl transition-all">
    <div className="text-indigo-500  w-12 h-10">{icon}</div>
    <h3 className="text-2xl font-semibold text-indigo-800 mb-8">{title}</h3>
    <p className="text-indigo-700">{description}</p>
  </div>
);

export default AboutPage;
