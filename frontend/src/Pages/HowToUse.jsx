import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowDown, Rocket, Dna, Clock, CheckSquare } from "lucide-react";

const HowToUse = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

  // ✅ Track Scroll Position & Update Active Step
  useEffect(() => {
    const handleScroll = () => {
      const position = window.scrollY;
      setScrollPosition(position);
      const sectionHeight = window.innerHeight;
      const newActiveStep = Math.min(3, Math.floor(position / sectionHeight));

      if (newActiveStep !== activeStep) {
        setActiveStep(newActiveStep);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeStep]);

  // ✅ Step Data (Each Step Represents a Different Era)
  const steps = [
    {
      title: "Step 1: Sign Up",
      link: "/Signup",
      description: "Create Your Account To Get Started With Our Service.",
      icon: <Clock className="w-20 h-20 text-indigo-400" />,
      era: "Future",
      year: "3025 AD",
    },
    {
      title: "Step 2: Set Preferences",
      link: "/Profile",
      description: "Customize Your Experience by Selecting Your Preferred Settings and Options.",
      icon: <CheckSquare className="w-20 h-20 text-indigo-400" />,
      era: "Present",
      year: "2025 AD",
    },
    {
      title: "Step 3: Create Your Time Capsule",
      link: "/CreateCapsule",
      description: "Add your Most Cherished Memories and Secrets. Lock them away for the Future or Share them Now!",
      icon: <Dna className="w-20 h-20 text-indigo-400" />,
      era: "Futuristic Vault",
      year: "3024 AD",
    },
    {
      title: "Step 4: Explore & Connect",
      link: "/Chat",
      description: "You're all set! Discover incredible Time Capsules, climb the Leaderboard, and chat with the Community to share your journey.",
      icon: <Rocket className="w-20 h-20 text-indigo-400" />,
      era: "Dinosaur Era & Beyond",
      year: "65 Million BC - Present",
    }


  ];

  // ✅ Calculate Floating Rocket Position Based on Scroll
  const getShipPosition = () => {
    const maxScroll = window.innerHeight * 3; // Full scroll height
    const scrollPercentage = Math.min(1, scrollPosition / maxScroll);

    return {
      left: `${10 + scrollPercentage * 80}%`, // Move from left to right
      top: `${20 + Math.sin(scrollPercentage * Math.PI * 4) * 10}%`, // Wavy effect
    };
  };

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">

      {/* ✅ Background Stars Animation */}
      <div className="fixed inset-0 z-[-1]">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full animate-pulse"
            style={{
              width: `${Math.random() * 7 + 2}px`,
              height: `${Math.random() * 7 + 2}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${Math.random() * 3 + 2}s`,
              opacity: Math.random() * 0.7 + 0.3,
            }}
          />
        ))}
      </div>

      {/* ✅ Floating Rocket Animation */}
      <div
        className="fixed z-5 w-24 h-24 transform rotate-15 transition-all duration-500"
        style={getShipPosition()}
      >
        <Rocket className="w-24 h-24 text-purple-400 animate-pulse" />
      </div>

      {/* ✅ Step Sections */}
      {steps.map((step, index) => (
        <div
          key={index}
          className={`min-h-screen flex items-center justify-center relative bg-gradient-to-b ${index % 2 === 0 ? "from-blue-900 to-green-700" : "from-green-700 to-brown-700"
            }`}
        >
          {/* ✅ Step Content */}
          <div
            className={`relative w-2/3 p-12 bg-gray-900 bg-opacity-80 rounded-3xl shadow-lg transition-transform duration-500 transform ${activeStep === index ? "scale-105 opacity-100" : "scale-95 opacity-60"
              }`}
          >
            <div className="text-purple-300 text-lg mb-4">
              {step.era} • {step.year}
            </div>

            {/* ✅ Step Icon & Title */}
            <div className="flex items-center mb-6">
              {step.icon}
              <button
                onClick={() => navigate(step.link)}
                className="text-3xl font-bold ml-4 text-indigo-300 hover:text-indigo-500 transition-all duration-300"
              >
                {step.title}
              </button>
            </div>

            {/* ✅ Step Description */}
            <p className="text-gray-300 text-lg leading-relaxed">{step.description}</p>

            {/* ✅ Scroll Indicator (If Not Last Step) */}
            {index !== 3 && (
              <div className="text-center text-gray-400 mt-6 animate-bounce">
                <ArrowDown className="w-12 h-12" />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HowToUse;
