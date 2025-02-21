import React, { useState, useEffect } from 'react';
import { Send, Clock, Sparkles } from 'lucide-react';

const ContactPage = () => {
  const [rotation, setRotation] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [showForm, setShowForm] = useState(false);

  // Rotating elements animation
  useEffect(() => {
    const timer = setInterval(() => {
      setRotation(prev => (prev + 1) % 360);
    }, 50);
    return () => clearInterval(timer);
  }, []);

  // Image carousel effect
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage(prev => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Animate form entrance
  useEffect(() => {
    setShowForm(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-indigo-100 relative overflow-hidden">

      <div className="mb-8 mt-32 w-80% mx-auto relative h-80 overflow-hidden shadow-2xl flex items-center justify-center">
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />

        {/* Image */}
        <img
          src="cbg.jpg"
          alt="Featured"
          className="w-full h-full object-cover"
        />

        {/* Text Overlay */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 text-white text-center">
          <h2 className="text-7xl font-bold mb-2">Share Your Story.</h2>
          <p className="text-lg italic opacity-90">Join Our Growing Community of Time Travelers</p>
        </div>
      </div>


      {/* Main content */}
      <div className="container mt-32 mb-16 rounded-4xl mx-auto px-4 py-16 relative z-10">
        <div className={`max-w-xl mx-auto transform rounded-4xl transition-all duration-1000 ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>

          {/* Contact form card */}
          <div className="bg-white/80 backdrop-blur-lg rounded-4xl p-8 shadow-xl border border-indigo-100">
            <div className="text-center mb-12 relative">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                Get in Touch
              </h1>
              <p className="text-indigo-600/80 text-lg">
                We'd love to hear from you
              </p>

              {/* Animated elements */}
              <div className="absolute -top-4 -right-4 animate-pulse">
                <Clock
                  className="text-indigo-400"
                  size={32}
                  style={{ transform: `rotate(${rotation}deg)` }}
                />

              </div>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-indigo-900 font-medium">Your Name</label>
                  <input
                    type="text"
                    className="w-full bg-white border border-indigo-200 rounded-xl p-4 text-indigo-900 placeholder-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition shadow-sm"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-indigo-900 font-medium">Email Address</label>
                  <input
                    type="email"
                    className="w-full bg-white border border-indigo-200 rounded-xl p-4 text-indigo-900 placeholder-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition shadow-sm"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-indigo-900 font-medium">Subject</label>
                <input
                  type="text"
                  className="w-full bg-white border border-indigo-200 rounded-xl p-4 text-indigo-900 placeholder-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition shadow-sm"
                  placeholder="What's on your mind?"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-indigo-900 font-medium">Your Message</label>
                <textarea
                  className="w-full bg-white border border-indigo-200 rounded-xl p-4 text-indigo-900 placeholder-indigo-300 focus:ring-2 focus:ring-indigo-400 focus:border-transparent transition h-32 shadow-sm"
                  placeholder="Share your thoughts with us..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-xl p-4 flex items-center justify-center space-x-2 transition group shadow-lg"
              >
                <span className="text-lg">Send Message</span>
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;