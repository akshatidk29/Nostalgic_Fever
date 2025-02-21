import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Star, Package, Users, Lock, Timer, Link } from "lucide-react";

const HomePage = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({
    hero: true,
    timeline: false,
    features: false,
    cta: false
  });

  // Hourglass size configuration
  const hourglassSize = {
    base: 400, // Base size in pixels
    scaled: 400 - (scrollY * 0.5) // Scales down as you scroll
  };

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Update section visibility based on scroll position
      const scrollPosition = window.scrollY + window.innerHeight;
      setVisibleSections({
        hero: scrollY < 500,
        timeline: scrollPosition > 800,
        features: scrollPosition > 1600,
        cta: scrollPosition > 2400
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollY]);

  const timelineMilestones = [
    {
      year: "2020",
      title: "First Memory",
      image: "i1.png",
      type: "Personal",
      openDate: "Dec 2025"
    },
    {
      year: "2021",
      title: "Summer Festival",
      image: "i2.png",
      type: "Community",
      openDate: "Jun 2026"
    },
    {
      year: "2022",
      title: "Time Vault",
      image: "i3.png",
      type: "Personal",
      openDate: "Jan 2027"
    },
    {
      year: "2023",
      title: "City Chronicles",
      image: "i4.png",
      type: "Community",
      openDate: "Jul 2028"
    },
    {
      year: "2024",
      title: "Future Letter",
      image: "i5.png",
      type: "Personal",
      openDate: "Dec 2029"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-900 text-white">
      {/* Floating Time Particles */}
      <div className="fixed w-full h-full pointer-events-none overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${10 + Math.random() * 20}s infinite linear`,
              transform: `scale(${0.5 + Math.random()})`,
              background: `rgba(${147 + Math.random() * 100}, ${190 + Math.random() * 65}, ${255}, ${0.1 + Math.random() * 0.3})`,
              boxShadow: `0 0 ${10 + Math.random() * 20}px rgba(147, 190, 255, 0.3)`
            }}
          />
        ))}
      </div>

      {/* Floating background orbs */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              background: `rgba(${147 + i * 30}, ${190 + i * 20}, 255, 0.1)`,
              animation: `float ${15 + i * 5}s infinite ease-in-out`,
              left: `${20 + i * 30}%`,
              top: `${30 + i * 20}%`,
            }}
          />
        ))}
      </div>

      {/* Animated background gradients */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-fuchsia-900/20 to-indigo-900/20 animate-pulse" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0ibm9uZSIgLz48Y2lyY2xlIGN4PSIxMDAiIGN5PSIxMDAiIHI9IjEiIGZpbGw9InJnYmEoMjU1LCAyNTUsIDI1NSwgMC4xKSIgLz48L3N2Zz4=')] opacity-20" />
      </div>

      {/* Hourglass Component - Positioned in top right */}
      {/* Hourglass Component - Positioned in top right */}
      <div
        className="fixed top-36 right-8 transition-all duration-300 z-50"
        style={{
          width: `${Math.max(200, hourglassSize.scaled)}px`,
          height: `${Math.max(200, hourglassSize.scaled)}px`,
          opacity: Math.max(0, 1 - (scrollY / 1000)),
          transform: `rotate(${Math.sin(scrollY / 500) * 0.5}deg)` // Subtle tilting effect as user scrolls
        }}
      >
        <div className="relative w-full h-full">
          {/* Ambient light reflection and shadow */}
          <div className="absolute -inset-4 rounded-full bg-fuchsia-500/10 blur-3xl animate-pulse" />
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/20 blur-xl rounded-full" />

          <svg viewBox="0 0 200 300" className="w-full h-full">
            <defs>
              {/* Enhanced gradients for more realistic glass look */}
              <radialGradient id="glassReflection" cx="30%" cy="30%" r="50%" fx="20%" fy="20%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.7)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
              </radialGradient>

              <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(219, 234, 254, 0.4)" />
                <stop offset="25%" stopColor="rgba(199, 210, 254, 0.2)" />
                <stop offset="50%" stopColor="rgba(167, 139, 250, 0.15)" />
                <stop offset="75%" stopColor="rgba(199, 210, 254, 0.2)" />
                <stop offset="100%" stopColor="rgba(219, 234, 254, 0.4)" />
              </linearGradient>

              <linearGradient id="woodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#5D4037" />
                <stop offset="15%" stopColor="#8B4513" />
                <stop offset="30%" stopColor="#A0522D" />
                <stop offset="50%" stopColor="#CD853F" />
                <stop offset="70%" stopColor="#A0522D" />
                <stop offset="85%" stopColor="#8B4513" />
                <stop offset="100%" stopColor="#5D4037" />
              </linearGradient>

              <radialGradient id="sandGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" stopColor="#fcd34d" />
                <stop offset="50%" stopColor="#f59e0b" />
                <stop offset="100%" stopColor="#d97706" />
              </radialGradient>

              <filter id="glassBlur" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.6" />
              </filter>

              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <filter id="woodTexture" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
              </filter>

              <pattern id="sandPattern" patternUnits="userSpaceOnUse" width="20" height="20">
                <rect width="20" height="20" fill="url(#sandGradient)" />
                <circle cx="5" cy="5" r="0.8" fill="#fcd34d" opacity="0.7" />
                <circle cx="15" cy="10" r="0.6" fill="#fcd34d" opacity="0.8" />
                <circle cx="10" cy="15" r="0.7" fill="#fcd34d" opacity="0.6" />
                <circle cx="2" cy="18" r="0.5" fill="#fcd34d" opacity="0.7" />
                <circle cx="18" cy="3" r="0.6" fill="#fcd34d" opacity="0.8" />
              </pattern>

              <clipPath id="topBulbClip">
                <path d="M70,20 C70,20 85,20 100,20 C115,20 130,20 130,20 L130,100 C130,120 100,140 70,140 L70,20 Z" />
              </clipPath>

              <clipPath id="middleNeckClip">
                <path d="M85,140 L115,140 L115,160 L85,160 Z" />
              </clipPath>

              <clipPath id="bottomBulbClip">
                <path d="M70,160 L130,160 L130,280 C130,280 115,280 100,280 C85,280 70,280 70,280 C70,260 100,240 70,160 Z" />
              </clipPath>
            </defs>

            {/* Wooden frame shadow */}
            <ellipse cx="100" cy="290" rx="50" ry="5" fill="rgba(0,0,0,0.3)" filter="url(#glassBlur)" />

            {/* Wooden Frame - Top with added details */}
            <g filter="url(#woodTexture)">
              <rect x="60" y="10" width="80" height="20" rx="5" ry="5" fill="url(#woodGradient)" />
              <rect x="65" y="15" width="70" height="10" rx="3" ry="3" fill="url(#woodGradient)" opacity="0.7" />
              <line x1="65" y1="20" x2="135" y2="20" stroke="#3E2723" strokeWidth="0.5" opacity="0.7" />
              <line x1="70" y1="25" x2="130" y2="25" stroke="#5D4037" strokeWidth="0.5" opacity="0.5" />
            </g>

            {/* Decorative brass fittings */}
            <circle cx="75" cy="20" r="3" fill="#D4AF37">
              <animate attributeName="fill" values="#D4AF37;#FFC107;#D4AF37" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="125" cy="20" r="3" fill="#D4AF37">
              <animate attributeName="fill" values="#D4AF37;#FFC107;#D4AF37" dur="4s" repeatCount="indefinite" />
            </circle>

            {/* Glass - Top Bulb with improved shape and shading */}
            <path
              d="M70,20 C70,20 85,20 100,20 C115,20 130,20 130,20 L130,100 C130,120 100,140 70,140 L70,20 Z"
              fill="url(#glassGradient)"
              stroke="rgba(167, 139, 250, 0.6)"
              strokeWidth="0.5"
              filter="url(#glassBlur)"
            />

            {/* Glass surface imperfections */}
            {[...Array(8)].map((_, i) => (
              <circle
                key={`top-imperfection-${i}`}
                cx={75 + Math.random() * 50}
                cy={30 + Math.random() * 80}
                r={0.3 + Math.random() * 0.5}
                fill="rgba(255, 255, 255, 0.4)"
                filter="url(#glassBlur)"
              />
            ))}

            {/* Glass Highlights - Top Bulb */}
            <path
              d="M75,25 Q77,40 75,55 Q73,70 75,85 Q77,100 75,115 L85,115 Q87,100 85,85 Q83,70 85,55 Q87,40 85,25 Z"
              fill="url(#glassReflection)"
              opacity="0.25"
              filter="url(#glassBlur)"
            />

            {/* Secondary glass reflection */}
            <path
              d="M120,25 Q118,40 120,55 Q122,70 120,85 Q118,100 120,115 L110,115 Q108,100 110,85 Q112,70 110,55 Q108,40 110,25 Z"
              fill="rgba(255, 255, 255, 0.1)"
              filter="url(#glassBlur)"
            />

            {/* Glass - Neck with subtle curve */}
            <path
              d="M85,140 C83,145 83,155 85,160 L115,160 C117,155 117,145 115,140 Z"
              fill="url(#glassGradient)"
              stroke="rgba(167, 139, 250, 0.6)"
              strokeWidth="0.5"
              filter="url(#glassBlur)"
            />

            {/* Glass reflection in neck */}
            <path
              d="M87,142 C86,146 86,154 87,158 L93,158 C92,154 92,146 93,142 Z"
              fill="rgba(255, 255, 255, 0.2)"
              filter="url(#glassBlur)"
            />

            {/* Glass - Bottom Bulb with improved shape */}
            <path
              d="M70,160 L130,160 L130,280 C130,280 115,280 100,280 C85,280 70,280 70,280 C70,260 100,240 70,160 Z"
              fill="url(#glassGradient)"
              stroke="rgba(167, 139, 250, 0.6)"
              strokeWidth="0.5"
              filter="url(#glassBlur)"
            />

            {/* Glass surface imperfections - bottom */}
            {[...Array(8)].map((_, i) => (
              <circle
                key={`bottom-imperfection-${i}`}
                cx={75 + Math.random() * 50}
                cy={180 + Math.random() * 80}
                r={0.3 + Math.random() * 0.5}
                fill="rgba(255, 255, 255, 0.4)"
                filter="url(#glassBlur)"
              />
            ))}

            {/* Glass Highlights - Bottom Bulb */}
            <path
              d="M75,175 Q77,190 75,205 Q73,220 75,235 Q77,250 75,265 L85,265 Q87,250 85,235 Q83,220 85,205 Q87,190 85,175 Z"
              fill="url(#glassReflection)"
              opacity="0.2"
              filter="url(#glassBlur)"
            />

            {/* Secondary glass reflection - Bottom */}
            <path
              d="M120,175 Q118,190 120,205 Q122,220 120,235 Q118,250 120,265 L110,265 Q108,250 110,235 Q112,220 110,205 Q108,190 110,175 Z"
              fill="rgba(255, 255, 255, 0.1)"
              filter="url(#glassBlur)"
            />

            {/* Wooden Frame - Bottom with added details */}
            <g filter="url(#woodTexture)">
              <rect x="60" y="270" width="80" height="20" rx="5" ry="5" fill="url(#woodGradient)" />
              <rect x="65" y="275" width="70" height="10" rx="3" ry="3" fill="url(#woodGradient)" opacity="0.7" />
              <line x1="65" y1="280" x2="135" y2="280" stroke="#3E2723" strokeWidth="0.5" opacity="0.7" />
              <line x1="70" y1="285" x2="130" y2="285" stroke="#5D4037" strokeWidth="0.5" opacity="0.5" />
            </g>

            {/* Decorative brass fittings - bottom */}
            <circle cx="75" cy="280" r="3" fill="#D4AF37">
              <animate attributeName="fill" values="#D4AF37;#FFC107;#D4AF37" dur="4s" repeatCount="indefinite" />
            </circle>
            <circle cx="125" cy="280" r="3" fill="#D4AF37">
              <animate attributeName="fill" values="#D4AF37;#FFC107;#D4AF37" dur="4s" repeatCount="indefinite" />
            </circle>

            {/* Sand in Top Bulb with improved physics and texture */}
            <g clipPath="url(#topBulbClip)">
              {/* Main sand body */}
              <rect
                x="70"
                y="20"
                width="60"
                height="120"
                fill="url(#sandPattern)"
                opacity="0.95"
              >
                <animate
                  attributeName="height"
                  values="120;110;100;90;80;70;60;50;40;30;20;10;0"
                  keyTimes="0;0.1;0.2;0.3;0.4;0.5;0.6;0.7;0.8;0.9;0.95;0.98;1"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                  dur="60s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  values="20;30;40;50;60;70;80;90;100;110;120;130;140"
                  keyTimes="0;0.1;0.2;0.3;0.4;0.5;0.6;0.7;0.8;0.9;0.95;0.98;1"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                  dur="60s"
                  repeatCount="indefinite"
                />
              </rect>

              {/* Sand surface curvature - more realistic non-flat top */}
              <path
                d="M70,20 C80,18 120,18 130,20 L130,30 C120,28 80,28 70,30 Z"
                fill="url(#sandPattern)"
                opacity="0.98"
              >
                <animate
                  attributeName="d"
                  values="M70,20 C80,18 120,18 130,20 L130,30 C120,28 80,28 70,30 Z; 
                   M70,120 C80,118 120,118 130,120 L130,130 C120,128 80,128 70,130 Z"
                  dur="60s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Sand particles that occasionally detach and fall early */}
              {[...Array(5)].map((_, i) => (
                <circle
                  key={`early-particle-${i}`}
                  cx={85 + Math.random() * 30}
                  cy={50 + i * 10}
                  r={0.6 + Math.random() * 0.8}
                  fill={`#f59e0b`}
                  opacity="0"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0.8;0"
                    keyTimes="0;0.5;1"
                    dur="1s"
                    begin={`${10 + i * 10}s`}
                    repeatCount="3"
                  />
                  <animate
                    attributeName="cy"
                    values={`${50 + i * 10};140`}
                    dur="1s"
                    begin={`${10 + i * 10}s`}
                    repeatCount="3"
                    calcMode="spline"
                    keySplines="0.42 0 0.58 1"
                  />
                </circle>
              ))}
            </g>

            {/* Falling Sand Particles through neck - natural physics */}
            <g clipPath="url(#middleNeckClip)">
              {/* Center stream particles */}
              {[...Array(15)].map((_, i) => (
                <circle
                  key={`center-stream-${i}`}
                  cx={100 + (Math.sin(i * 0.7) * 2)}
                  cy={(i * 1.3) % 20 + 140}
                  r={0.6 + Math.random() * 0.6}
                  fill={`rgb(${245 + Math.floor(Math.random() * 10)}, ${159 + Math.floor(Math.random() * 20)}, ${11 + Math.floor(Math.random() * 15)})`}
                  opacity={0.8 + Math.random() * 0.2}
                >
                  <animate
                    attributeName="cy"
                    from="140"
                    to="160"
                    dur={`${0.2 + Math.random() * 0.15}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.05}s`}
                    calcMode="spline"
                    keySplines="0.25 0.1 0.25 1"
                  />
                  <animate
                    attributeName="opacity"
                    values="0.8;1;0.8"
                    dur={`${0.2 + Math.random() * 0.15}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.05}s`}
                  />
                  <animate
                    attributeName="r"
                    values={`${0.6 + Math.random() * 0.6};${0.4 + Math.random() * 0.4}`}
                    dur={`${0.2 + Math.random() * 0.15}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.05}s`}
                  />
                </circle>
              ))}

              {/* Side-falling particles with swirl effects */}
              {[...Array(10)].map((_, i) => (
                <circle
                  key={`side-particle-${i}`}
                  cx={95 + Math.random() * 10}
                  cy={(i * 2) % 20 + 140}
                  r={0.3 + Math.random() * 0.4}
                  fill={`rgb(${245 + Math.floor(Math.random() * 10)}, ${159 + Math.floor(Math.random() * 20)}, ${11 + Math.floor(Math.random() * 15)})`}
                  opacity={0.7 + Math.random() * 0.3}
                >
                  <animate
                    attributeName="cx"
                    values={`${95 + Math.random() * 10};${93 + Math.random() * 14};${95 + Math.random() * 10}`}
                    dur={`${0.3 + Math.random() * 0.2}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.07}s`}
                  />
                  <animate
                    attributeName="cy"
                    from="140"
                    to="160"
                    dur={`${0.3 + Math.random() * 0.2}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.07}s`}
                    calcMode="spline"
                    keySplines="0.25 0.1 0.25 1"
                  />
                </circle>
              ))}

              {/* Occasional clumping particles that fall in groups */}
              <g>
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  keyTimes="0;0.1;1"
                  dur="3s"
                  repeatCount="indefinite"
                  begin="5s"
                />
                {[...Array(8)].map((_, i) => (
                  <circle
                    key={`clump-${i}`}
                    cx={97 + (i % 3) * 2}
                    cy={140 + (i % 4) * 1.5}
                    r={0.4 + Math.random() * 0.3}
                    fill={`rgb(${245 + Math.floor(Math.random() * 10)}, ${159 + Math.floor(Math.random() * 20)}, ${11 + Math.floor(Math.random() * 15)})`}
                  >
                    <animate
                      attributeName="cy"
                      from="140"
                      to="160"
                      dur="0.35s"
                      repeatCount="indefinite"
                      begin={`${i * 0.02}s`}
                      calcMode="spline"
                      keySplines="0.25 0.1 0.25 1"
                    />
                  </circle>
                ))}
              </g>

              {/* Sand neck walls texture */}
              <rect x="85" y="140" width="1" height="20" fill="url(#sandPattern)" opacity="0.2" />
              <rect x="114" y="140" width="1" height="20" fill="url(#sandPattern)" opacity="0.2" />
            </g>

            {/* Sand Pile in Bottom Bulb - realistic accumulation */}
            <g clipPath="url(#bottomBulbClip)">
              {/* Initial static pile */}
              <path
                d="M70,280 C85,275 115,275 130,280 L130,280 L70,280 Z"
                fill="url(#sandPattern)"
                opacity="0.95"
              />

              {/* Dynamically growing pile with natural settling */}
              <path
                d="M70,280 C90,270 110,270 130,280 L130,280 L70,280 Z"
                fill="url(#sandPattern)"
                opacity="0.95"
              >
                <animate
                  attributeName="d"
                  values="M70,280 C90,270 110,270 130,280 L130,280 L70,280 Z;
                   M70,280 C85,265 115,265 130,280 L130,280 L70,280 Z;
                   M70,280 C85,255 115,255 130,280 L130,280 L70,280 Z;
                   M70,280 C85,240 115,240 130,280 L130,280 L70,280 Z;
                   M70,280 C85,225 115,225 130,280 L130,280 L70,280 Z;
                   M70,280 C85,210 115,210 130,280 L130,280 L70,280 Z;
                   M70,280 C85,195 115,195 130,280 L130,280 L70,280 Z;
                   M75,220 C90,185 110,185 125,220 L130,280 L70,280 Z"
                  keyTimes="0;0.15;0.3;0.45;0.6;0.75;0.9;1"
                  dur="60s"
                  repeatCount="indefinite"
                  calcMode="spline"
                  keySplines="0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1; 0.42 0 0.58 1"
                />
              </path>

              {/* Impact zones where new sand hits the pile */}
              <circle cx="100" cy="165" r="0" fill="#f59e0b" opacity="0">
                <animate
                  attributeName="r"
                  values="0;3;0"
                  keyTimes="0;0.5;1"
                  dur="0.3s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  values="0;0.3;0"
                  keyTimes="0;0.5;1"
                  dur="0.3s"
                  repeatCount="indefinite"
                />
              </circle>

              {/* Small dust particles that puff up when sand hits the pile */}
              {[...Array(8)].map((_, i) => (
                <circle
                  key={`dust-${i}`}
                  cx={100}
                  cy={170}
                  r="0.7"
                  fill="#f8fafc"
                  opacity="0"
                >
                  <animate
                    attributeName="cx"
                    values={`100;${95 + Math.random() * 10}`}
                    dur="0.8s"
                    begin={`${i * 0.1}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="cy"
                    values={`170;${165 + Math.random() * 5}`}
                    dur="0.8s"
                    begin={`${i * 0.1}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="opacity"
                    values="0;0.6;0"
                    keyTimes="0;0.2;1"
                    dur="0.8s"
                    begin={`${i * 0.1}s`}
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="r"
                    values="0.3;0.8;0.3"
                    keyTimes="0;0.5;1"
                    dur="0.8s"
                    begin={`${i * 0.1}s`}
                    repeatCount="indefinite"
                  />
                </circle>
              ))}

              {/* Individual grains accumulating on the pile surface */}
              {[...Array(25)].map((_, i) => (
                <circle
                  key={`grain-${i}`}
                  cx={85 + (i % 5) * 8}
                  cy={260 - (i % 4) * 15 - Math.floor(i / 5) * 8}
                  r="0.7"
                  fill={`rgb(${245 - Math.floor(Math.random() * 15)}, ${159 - Math.floor(Math.random() * 20)}, ${11 - Math.floor(Math.random() * 5)})`}
                  opacity="0"
                >
                  <animate
                    attributeName="opacity"
                    values="0;0.9;0.9"
                    keyTimes="0;0.1;1"
                    dur="60s"
                    begin={`${2 + i * 2.4}s`}
                    repeatCount="1"
                    fill="freeze"
                  />
                </circle>
              ))}

              {/* Occasional small sand slides/avalanches */}
              <g opacity="0">
                <animate
                  attributeName="opacity"
                  values="0;1;0"
                  keyTimes="0;0.3;1"
                  dur="4s"
                  repeatCount="indefinite"
                  begin="15s"
                />
                {[...Array(10)].map((_, i) => (
                  <circle
                    key={`slide-${i}`}
                    cx={95 + i * 2}
                    cy={230 + Math.random() * 20}
                    r={0.5 + Math.random() * 0.5}
                    fill={`rgb(${245 + Math.floor(Math.random() * 10)}, ${159 + Math.floor(Math.random() * 20)}, ${11 + Math.floor(Math.random() * 15)})`}
                  >
                    <animate
                      attributeName="cx"
                      values={`${95 + i * 2};${100 + i * 1.5}`}
                      dur="0.6s"
                      fill="freeze"
                    />
                    <animate
                      attributeName="cy"
                      values={`${230 + Math.random() * 20};${240 + Math.random() * 30}`}
                      dur="0.6s"
                      fill="freeze"
                      calcMode="spline"
                      keySplines="0.25 0.1 0.25 1"
                    />
                  </circle>
                ))}
              </g>
            </g>


            {/* Subtle outer glow */}
            <rect
              x="60"
              y="10"
              width="80"
              height="280"
              rx="10"
              ry="10"
              fill="none"
              stroke="rgba(167, 139, 250, 0.4)"
              strokeWidth="1"
              filter="url(#glow)"
            />

            {/* Decorative time markings */}
            {[...Array(5)].map((_, i) => (
              <g key={i}>
                <line
                  x1="135"
                  y1={60 + (i * 40)}
                  x2="140"
                  y2={60 + (i * 40)}
                  stroke="rgba(167, 139, 250, 0.8)"
                  strokeWidth="1"
                />
                <text
                  x="143"
                  y={65 + (i * 40)}
                  fill="rgba(167, 139, 250, 0.8)"
                  fontSize="8"
                >
                  {20 * (i + 1)}s
                </text>
              </g>
            ))}
          </svg>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative h-screen flex flex-col justify-center items-start px-16">
        <div
          className={`transform transition-all duration-1000 ${visibleSections.hero ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <div className="text-left">
            <h1 className="text-8xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-blue-200 to-indigo-300 leading-[1.5]">
              Nostalgic Fever
            </h1>
            <p className="text-2xl text-indigo-200 mb-12">
              Create your time capsule today, unlock memories tomorrow
            </p>
          </div>
          <div className="flex flex-col items-center justify-center">
            <button
              onClick={() => navigate("/Timeline")}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full text-lg font-medium 
                 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-indigo-500/25"
            >
              See Your Time Journey
            </button>

          </div>

        </div>
        <ChevronDown className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-indigo-400 animate-bounce w-8 h-8" />
      </div>

      {/* Timeline Section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-4xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300">
          Time Capsules
        </h2>
        <div className="relative min-h-[800px] pt-8">
          <div className="absolute left-1/2 top-0 w-[2px] h-full bg-gradient-to-b from-indigo-500 to-blue-500" />
          {timelineMilestones.map((milestone, index) => (
            <div
              key={index}
              className={`relative flex items-center mb-24 group ${index % 2 === 0 ? "justify-start" : "justify-end"}`}
            >
              <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full group-hover:scale-150 transition-transform duration-300" />
              <svg
                className={`absolute left-1/2 ${index % 2 === 0 ? "-translate-x-full" : "translate-x-0"} top-1/2 -translate-y-1/2 w-[calc(50%-3rem)]`}
                height="80"
              >
                <path
                  d={
                    index % 2 === 0
                      ? "M 100% 50% C 75% 50%, 25% 0%, 0% 50%"
                      : "M 0% 50% C 25% 50%, 75% 100%, 100% 50%"
                  }
                  fill="none"
                  stroke="rgba(99, 102, 241, 0.4)"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                  className="group-hover:stroke-indigo-400 transition-colors duration-300"
                />
              </svg>
              <div className={`w-5/12 ${index % 2 === 0 ? "pr-12" : "pl-12"}`}>
                <div className="bg-white/5 backdrop-blur-sm p-6 rounded-xl hover:bg-white/10 transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-400 group-hover:border-indigo-400">
                  <div className="relative h-40 mb-4 overflow-hidden rounded-lg">
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-4 left-4">
                      <span className="px-3 py-1 bg-indigo-600 rounded-full text-sm">
                        Opens: {milestone.openDate}
                      </span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-indigo-300 mb-2">
                    {milestone.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-indigo-200">
                    <span>{milestone.year}</span>
                    <span className="px-2 py-1 bg-indigo-900/50 rounded-full">
                      {milestone.type}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div
        className={`max-w-6xl mx-auto px-6 py-20 transform transition-all duration-1000 ${visibleSections.features ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Lock />}
            title="Secure Storage"
            description="Your memories are encrypted and safely stored until their reveal date"
          />
          <FeatureCard
            icon={<Timer />}
            title="Timed Release"
            description="Set custom unlock dates for your time capsules"
          />
          <FeatureCard
            icon={<Users />}
            title="Community Sharing"
            description="Share your capsules with the world or keep them private"
          />
        </div>
      </div>

      {/* Call to Action */}
      <div
        className={`text-center py-20 transform transition-all duration-1000 ${visibleSections.cta ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20"
          }`}
      >
        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-300 mb-6">
          Begin Your Time Journey
        </h2>
        <p className="text-lg text-indigo-200 mb-8 max-w-2xl mx-auto">
          Create your first time capsule and start preserving memories for the future
        </p>
        <button
          onClick={() => navigate("/CreateCapsule")}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700
                 text-white px-8 py-4 rounded-full text-lg font-medium
                 transform hover:scale-105 transition-all duration-300
                 shadow-lg hover:shadow-indigo-500/25"
        >
          Create a Time Capsule
        </button>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-xl border border-white/10
                hover:bg-white/10 transform hover:-translate-y-2 transition-all duration-300">
    <div className="text-indigo-400 mb-4 w-12 h-12">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-indigo-300 mb-4">{title}</h3>
    <p className="text-indigo-200">{description}</p>
  </div>
);

export default HomePage;

<style>
  {`
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }

  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }

  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 4px;
  }

  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`}
</style>