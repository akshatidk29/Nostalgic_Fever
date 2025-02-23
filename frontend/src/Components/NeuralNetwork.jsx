import React from 'react';
import { motion } from 'framer-motion';

// Component 3: Neural Network
const NeuralNetwork = () => {
  const nodes = [
    { x: 50, y: 50 },
    { x: 150, y: 30 },
    { x: 100, y: 100 },
    { x: 30, y: 150 },
    { x: 170, y: 150 },
    { x: 100, y: 200 },
  ];

  return (
    <div className="relative w-48 h-48">
      <svg className="absolute inset-0" width="200" height="200">
        {/* Connections */}
        {nodes.map((start, i) =>
          nodes.slice(i + 1).map((end, j) => (
            <motion.line
              key={`${i}-${j}`}
              x1={start.x}
              y1={start.y}
              x2={end.x}
              y2={end.y}
              stroke="url(#gradient)"
              strokeWidth="1"
              initial={{ pathLength: 0, opacity: 0.2 }}
              animate={{
                pathLength: [0, 1, 0],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: (i + j) * 0.5,
              }}
            />
          ))
        )}
        
        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
      </svg>

      {/* Nodes */}
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400"
          style={{
            left: node.x - 8,
            top: node.y - 8,
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

export {  NeuralNetwork };