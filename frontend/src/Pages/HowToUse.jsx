import React, { useState, useEffect } from "react";
import { ArrowDown, Rocket, Dna, Clock, CheckSquare } from "lucide-react";

const HowToUse = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);

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

  const steps = [
    {
      title: "Step 1: Sign Up",
      description: "Create your account in just a few seconds to get started with our service.",
      icon: <Clock className="w-20 h-20 text-indigo-400" />,
      era: "Future",
      year: "3025 AD",
    },
    {
      title: "Step 2: Set Preferences",
      description: "Customize your experience by selecting your preferred settings and options.",
      icon: <CheckSquare className="w-20 h-20 text-indigo-400" />,
      era: "Present",
      year: "2025 AD",
    },
    {
      title: "Step 3: Connect Your Data",
      description: "Link your existing accounts to get the full benefit of our platform.",
      icon: <Dna className="w-20 h-20 text-indigo-400" />,
      era: "Ice Age",
      year: "10,000 BC",
    },
    {
      title: "Step 4: Start Exploring",
      description: "You're all set! Begin exploring all the amazing features available to you.",
      icon: <Rocket className="w-20 h-20 text-indigo-400" />,
      era: "Dinosaur Era",
      year: "65 Million BC",
    },
  ];

  const getShipPosition = () => {
    const maxScroll = window.innerHeight * 3;
    const scrollPercentage = Math.min(1, scrollPosition / maxScroll);
    return {
      left: `${10 + scrollPercentage * 80}%`,
      top: `${20 + Math.sin(scrollPercentage * Math.PI * 4) * 10}%`,
    };
  };

  return (
    <div className="relative w-full bg-black text-white overflow-hidden">
      {/* Background Stars */}
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

      {/* Floating Rocket */}
      <div
        className="fixed z-5 w-24 h-24 transform rotate-15 transition-all duration-500"
        style={getShipPosition()}
      >
        <Rocket className="w-24 h-24 text-purple-400 animate-pulse" />
      </div>

      {/* Steps */}
      {steps.map((step, index) => (
        <div
          key={index}
          className={`min-h-screen flex items-center justify-center relative bg-gradient-to-b ${index % 2 === 0 ? "from-blue-900 to-green-700" : "from-green-700 to-brown-700  "
            }`}
        >
          <div
            className={`relative w-2/3 p-12 bg-gray-900 bg-opacity-80 rounded-3xl shadow-lg transition-transform duration-500 transform ${activeStep === index ? "scale-105 opacity-100" : "scale-95 opacity-60"
              }`}
          >
            <div className="text-purple-300 text-lg mb-4">
              {step.era} • {step.year}
            </div>
            <div className="flex items-center mb-6">
              {step.icon}
              <h2 className="text-3xl font-bold ml-4">{step.title}</h2>
            </div>
            <p className="text-gray-300 text-lg leading-relaxed">{step.description}</p>
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
