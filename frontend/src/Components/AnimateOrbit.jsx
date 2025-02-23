import React from 'react';
import { motion } from 'framer-motion';

const AnimatedOrb = () => {
  // Generate random delay for each ring
  const getRandomDelay = () => -(Math.random() * 2);
  
  return (
    <div className="relative w-120 h-120 flex items-center justify-center">
      {/* Core orb */}
      <motion.div
        className="absolute w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-300 rounded-full"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Inner glow */}
        <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-50" />
      </motion.div>

      {/* Orbiting rings */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border-2 rounded-full"
          style={{
            width: `${(i + 2) * 5}rem`,
            height: `${(i + 2) * 5}rem`,
            borderColor: `rgba(96, 165, 250, ${0.3 - i * 0.1})`,
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: {
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: getRandomDelay(),
            }
          }}
        >
          {/* Orbiting particles */}
          <motion.div
            className="absolute w-3 h-3 bg-blue-400 rounded-full"
            style={{
              top: '50%',
              left: '-1.5px',
              transform: 'translateY(-50%)',
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: getRandomDelay(),
            }}
          />
        </motion.div>
      ))}

      {/* Floating particles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute w-2 h-2 bg-blue-300 rounded-full"
          style={{
            top: '50%',
            left: '50%',
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 100],
            y: [0, (Math.random() - 0.5) * 100],
            opacity: [0, 0.8, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 0.4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedOrb;