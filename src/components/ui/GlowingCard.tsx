import React, { type ReactNode } from 'react';
import { TopEdgeGlowAtmosphere } from './TopEdgeGlowAtmosphere';

export interface GlowingCardProps {
  children: ReactNode;
  /**
   * Classes for the outermost wrapper (e.g., max-w-4xl, mx-auto)
   */
  className?: string;
  /**
   * Classes for the inner dark canvas (e.g., p-6, space-y-4, overflow-hidden)
   */
  innerClassName?: string;
}

export const GlowingCard: React.FC<GlowingCardProps> = ({ 
  children, 
  className = '', 
  innerClassName = '' 
}) => {
  return (
    <div className={`relative w-full py-8 ${className}`}>
      
      {/* ---------------------------------------------------- */}
      {/* FROSTED GLASS OUTER FRAME                            */}
      {/* ---------------------------------------------------- */}
      <div 
        className="relative rounded-[28px] p-3 sm:p-4 border border-white/10 backdrop-blur-3xl backdrop-saturate-150 transition-all duration-500 overflow-visible z-10"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(255, 255, 255, 0.05) 100%)',
          boxShadow: `
            0 -10px 40px 5px rgba(244, 114, 182, 0.25),
            0 0 70px 15px rgba(124, 58, 237, 0.15),
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.4),
            inset 0 -1px 1px 0 rgba(255, 255, 255, 0.1)
          `,
        }}
      >
        {/* Glow Atmosphere Extending Upward Behind Card */}
        <TopEdgeGlowAtmosphere />

        {/* Frosted Glass Sheen Overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.08] to-transparent pointer-events-none rounded-[28px]" />

        {/* ---------------------------------------------------- */}
        {/* INNER DARK CARD (Solid Canvas & Crisp Text)           */}
        {/* ---------------------------------------------------- */}
        <div className={`relative rounded-[16px] border border-gray-800/90 bg-[#161b22] shadow-2xl z-20 h-full flex flex-col ${innerClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
};
