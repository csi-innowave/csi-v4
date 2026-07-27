"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const TopEdgeGlowAtmosphere: React.FC = () => {
  // Particles concentrated strictly in the MIDDLE (between 38% and 62% horizontal width)
  const middleStars = [
    { bottom: '20px', left: '48%', size: '2.5px', opacity: 0.7 },
    { bottom: '35px', left: '44%', size: '2px', opacity: 0.6 },
    { bottom: '40px', left: '53%', size: '3px', opacity: 0.8 },
    { bottom: '55px', left: '50%', size: '1.5px', opacity: 0.5 },
    { bottom: '65px', left: '42%', size: '2.5px', opacity: 0.7 },
    { bottom: '70px', left: '56%', size: '2px', opacity: 0.6 },
    { bottom: '85px', left: '47%', size: '3px', opacity: 0.75 },
    { bottom: '95px', left: '52%', size: '1.5px', opacity: 0.5 },
    { bottom: '110px', left: '45%', size: '2px', opacity: 0.6 },
    { bottom: '120px', left: '54%', size: '2.5px', opacity: 0.7 },
    { bottom: '135px', left: '49%', size: '3px', opacity: 0.8 },
    { bottom: '150px', left: '51%', size: '1.5px', opacity: 0.5 },
    { bottom: '165px', left: '46%', size: '2px', opacity: 0.6 },
    { bottom: '180px', left: '53%', size: '2px', opacity: 0.5 },
  ];

  return (
    // Extends strictly UPWARDS from top border of card (z-0 behind card frame)
    <motion.div 
      initial={{ opacity: 0, scaleY: 0.1 }}
      whileInView={{ opacity: 1, scaleY: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="absolute bottom-[calc(100%-4px)] inset-x-0 h-80 pointer-events-none z-0 overflow-visible origin-bottom"
    >
      
      {/* ---------------------------------------------------- */}
      {/* 1. DEEP VIOLET NEBULA (Wide Ambient Background)      */}
      {/* ---------------------------------------------------- */}
      <motion.div 
        animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 blur-3xl origin-bottom"
        style={{
          background: 'radial-gradient(ellipse 80% 80% at 50% 100%, rgba(147, 51, 234, 0.7) 0%, rgba(99, 102, 241, 0.45) 45%, rgba(59, 130, 246, 0.15) 75%, transparent 100%)',
        }}
      />

      {/* ---------------------------------------------------- */}
      {/* 2. SEAMLESS PINK ERUPTION (Middle Layer)              */}
      {/* ---------------------------------------------------- */}
      <motion.div 
        animate={{ opacity: [0.4, 0.6, 0.4], scaleY: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4/5 h-48 blur-2xl origin-bottom"
        style={{
          background: 'radial-gradient(ellipse 65% 100% at 50% 100%, rgba(244, 114, 182, 0.6) 0%, rgba(232, 121, 249, 0.4) 45%, rgba(168, 85, 247, 0.15) 80%, transparent 100%)',
        }}
      />

      {/* ---------------------------------------------------- */}
      {/* 3. 100% SMOOTH BLINDING WHITE HOTSPOT (NO HARD EDGES)*/}
      {/* ---------------------------------------------------- */}
      {/* Soft Gaussian Blurred Hotspot Flare */}
      <motion.div 
        animate={{ opacity: [0.5, 0.8, 0.5], scaleX: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-20 blur-xl mix-blend-screen origin-bottom"
        style={{
          background: 'radial-gradient(ellipse 55% 100% at 50% 100%, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0.5) 30%, rgba(244, 114, 182, 0.5) 65%, transparent 100%)',
        }}
      />

      {/* Center Core Light Pulse (Smooth Circle/Ellipse Glow) */}
      <motion.div 
        animate={{ opacity: [0.6, 0.9, 0.6] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/5 h-10 blur-lg mix-blend-screen origin-bottom"
        style={{
          background: 'radial-gradient(ellipse 60% 100% at 50% 100%, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.5) 40%, rgba(244, 114, 182, 0.4) 75%, transparent 100%)',
        }}
      />

      {/* ---------------------------------------------------- */}
      {/* 4. CONCENTRATE STAR PARTICLES IN THE CENTER          */}
      {/* ---------------------------------------------------- */}
      {middleStars.map((star, idx) => (
        <div
          key={idx}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            bottom: star.bottom,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            boxShadow: `0 0 ${parseFloat(star.size) * 2}px rgba(255,255,255,0.8), 0 0 ${parseFloat(star.size) * 4}px rgba(244,114,182,0.6)`,
            animationDuration: `${2 + (idx % 4) * 0.8}s`,
          }}
        />
      ))}
    </motion.div>
  );
};
