"use client";

import React from "react";
import { motion } from 'framer-motion';
import { useRouter } from "next/navigation";
import { levels } from "@/data/course";

// Helper function to get color with opacity
const getBackgroundColor = (colorClass: string, opacity: number) => {
  // Map of color classes to their RGB values
  const colorMap: { [key: string]: [number, number, number] } = {
    'bg-blue-400': [96, 165, 250],
    'bg-purple-400': [192, 132, 252],
    'bg-pink-400': [244, 114, 182],
    'bg-green-400': [74, 222, 128],
    'bg-yellow-400': [250, 204, 21],
  };
  
  const rgb = colorMap[colorClass] || [0, 0, 0];
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`;
};



export default function LearningPath() {
  const router = useRouter();
  // Calculate total height needed for the SVG container
  const totalHeight = levels.length * 150; // 120px per item + 20px margin
  
  return (
    <div className="flex-1 flex flex-col relative w-full">
      <div>
          <h1 className="text-2xl font-bold text-left">Robotic Learning Path</h1>
      </div>
      
      <div className="relative w-full max-w-md py-8" style={{ minHeight: `${totalHeight}px` }}>
        {/* SVG connectors */}
        <svg 
          className="absolute left-0 top-0 w-full h-full pointer-events-none z-0" 
          viewBox={`0 0 300 ${totalHeight}`}
          preserveAspectRatio="none"
        >
          {levels.map((_, idx) => {
            if (idx === levels.length - 1) return null;
            
            const isEven = idx % 2 === 0;
            const startX = isEven ? 220 : 80;  // Adjusted X positions
            const endX = isEven ? 80 : 220;    // Opposite side for next item
            const startY = 60 + (idx * 140);   // Center Y of current circle
            const endY = 60 + ((idx + 1) * 140); // Center Y of next circle
            
            // Control points for the curve
            const controlX1 = isEven ? 300 : 0;  // Curve out to the right/left
            const controlX2 = isEven ? 300 : 0;  // Curve back from the right/left
            
            return (
              <path
                key={idx}
                d={`M${startX},${startY} C${controlX1},${startY + 40} ${controlX2},${endY - 40} ${endX},${endY}`}
                stroke="#e2e8f0"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                strokeDasharray="8 4"
              />
            );
          })}
        </svg>
        
        {/* Levels */}
        {levels.map((level, idx) => (
          <div
            key={level.title}
            className="relative z-10 flex items-center justify-between mb-10"
            style={{
              minHeight: 130,
            }}
          >
            {/* Level circle - positioned absolutely */}
            <div 
              className={`flex flex-col items-center ${idx % 2 === 0 ? 'order-2 ml-4' : 'order-1 mr-4'}`}
              style={{
                width: '80px',
                flexShrink: 0
              }}
            >
              <button 
                onClick={() => router.push(`/learn/level-${level.level}`)}
                className={`w-16 h-16 flex items-center justify-center rounded-full text-white text-2xl font-extrabold relative z-10 shadow-md ${level.color} cursor-pointer hover:brightness-110 active:brightness-90 transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 ${level.color.replace('bg-', 'focus:ring-')}`}
                aria-label={`Go to ${level.title}`}
              >
                {level.level}
              </button>
            </div>

            {/* Card - takes remaining space */}
            <div 
              className={`${idx % 2 === 0 ? 'order-1' : 'order-2'}`}
              style={{
                width: 'calc(100% - 100px)'
              }}
            >
              <motion.div 
                className="rounded-2xl shadow-md px-6 py-5 font-sans border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{
                  backgroundColor: getBackgroundColor(level.color, 0.1),
                  borderColor: getBackgroundColor(level.color, 0.2)
                }}
                whileHover={{ 
                  scale: 1.01,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                  borderColor: getBackgroundColor(level.color, 0.3)
                }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  type: 'spring',
                  stiffness: 300,
                  delay: level.level * 0.1 + 0.2
                }}
              >
                <div className="font-bold text-lg mb-2" style={{ color: getBackgroundColor(level.color, 1) }}>{level.title}</div>
                <div className="text-sm text-gray-600">{level.desc}</div>
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
