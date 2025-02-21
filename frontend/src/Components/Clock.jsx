import React, { useEffect, useState } from 'react';

const Clock1 = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = Math.min((window.scrollY / maxScroll) * 100, 100);
      setScrollProgress(currentProgress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic color calculations based on scroll
  const baseHue = 220 + (scrollProgress * 1.4); // Shift from blue to purple
  const baseSaturation = 80 + (scrollProgress * 0.2);
  const clockFaceColor = `hsl(${baseHue}, ${baseSaturation}%, 60%)`;
  const hourHandColor = `hsl(${baseHue}, ${baseSaturation}%, 70%)`;
  const minuteHandColor = `hsl(${baseHue + 20}, ${baseSaturation}%, 75%)`;
  const secondHandColor = `hsl(${baseHue + 40}, ${baseSaturation}%, 80%)`;

  // Calculate rotations
  const hourRotation = (scrollProgress * 3.6) % 360; // Full rotation every 100% scroll
  const minuteRotation = (scrollProgress * 7.2) % 360; // Faster rotation
  const secondRotation = (scrollProgress * 14.4) % 360; // Fastest rotation

  return (
    <div className="fixed top-8 right-8 z-50 w-32 h-32 transition-all duration-300 hover:scale-110">
      {/* Glowing background effects */}
      <div
        className="absolute inset-0 rounded-full blur-2xl opacity-30"
        style={{
          background: `radial-gradient(circle, ${clockFaceColor}, transparent)`,
          transform: `rotate(${scrollProgress * 2}deg)`
        }}
      />

      <svg
        viewBox="0 0 100 100"
        className="w-full h-full transform rotate-180"
      >
        {/* Clock face with dynamic gradient */}
        <defs>
          <radialGradient id="clockFace" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={`hsl(${baseHue}, ${baseSaturation}%, 30%)`} />
            <stop offset="100%" stopColor={`hsl(${baseHue}, ${baseSaturation}%, 15%)`} />
          </radialGradient>
        </defs>

        {/* Main clock face */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="url(#clockFace)"
          stroke={clockFaceColor}
          strokeWidth="1"
          className="transition-all duration-300"
        />

        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="10"
            x2="50"
            y2="15"
            stroke={clockFaceColor}
            strokeWidth="2"
            transform={`rotate(${i * 30} 50 50)`}
            className="transition-colors duration-300"
          />
        ))}

        {/* Minute markers */}
        {[...Array(60)].map((_, i) => (
          i % 5 !== 0 && (
            <line
              key={i}
              x1="50"
              y1="10"
              x2="50"
              y2="12"
              stroke={clockFaceColor}
              strokeWidth="1"
              strokeOpacity="0.5"
              transform={`rotate(${i * 6} 50 50)`}
              className="transition-colors duration-300"
            />
          )
        ))}

        {/* Clock hands with dynamic colors and smooth transitions */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="25"
          stroke={hourHandColor}
          strokeWidth="3"
          strokeLinecap="round"
          transform={`rotate(${hourRotation} 50 50)`}
          className="transition-all duration-300"
        />

        <line
          x1="50"
          y1="50"
          x2="50"
          y2="20"
          stroke={minuteHandColor}
          strokeWidth="2"
          strokeLinecap="round"
          transform={`rotate(${minuteRotation} 50 50)`}
          className="transition-all duration-300"
        />

        <line
          x1="50"
          y1="50"
          x2="50"
          y2="15"
          stroke={secondHandColor}
          strokeWidth="1"
          strokeLinecap="round"
          transform={`rotate(${secondRotation} 50 50)`}
          className="transition-all duration-300"
        />

        {/* Center dot with pulsing effect */}
        <circle
          cx="50"
          cy="50"
          r="3"
          fill={clockFaceColor}
          className="animate-pulse"
        />
      </svg>

      {/* Decorative ring */}
      <div
        className="absolute inset-0 rounded-full border-2 opacity-20"
        style={{
          borderColor: clockFaceColor,
          transform: `rotate(${-scrollProgress * 2}deg)`
        }}
      />
    </div>
  );
};

export default Clock1;