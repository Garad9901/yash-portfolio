'use client';

import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { sound } from '@/utils/sound';

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'orange' | 'blue' | 'white' | 'none';
  onClick?: () => void;
  tabIndex?: number;
}

export default function BentoCard({
  children,
  className = '',
  glowColor = 'orange',
  onClick,
  tabIndex = 0,
}: BentoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [glowPos, setGlowPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // 3D tilt calculations
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    const rotateX = yPct * -10;
    const rotateY = xPct * 10;

    setTilt({ rotateX, rotateY });
    setGlowPos({ x: mouseX, y: mouseY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    sound.playHover();
  };

  const handleMouseLeave = () => {
    setTilt({ rotateX: 0, rotateY: 0 });
    setIsHovered(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      sound.playClick();
      if (onClick) onClick();
    }
  };

  // Class for custom dashboard borders and glows
  const getGlowBorder = () => {
    if (!isHovered && !isFocused) return 'border-white';
    switch (glowColor) {
      case 'orange':
        return 'border-orange-500 shadow-[0_0_30px_rgba(255,122,0,0.25)]';
      case 'blue':
        return 'border-orange-500 shadow-[0_0_30px_rgba(0,217,255,0.25)]'; // Orange border as requested by visual guidelines, but customizable glow
      case 'white':
        return 'border-white shadow-[0_0_30px_rgba(255,255,255,0.2)]';
      default:
        return 'border-white';
    }
  };

  const cardStyle: React.CSSProperties = shouldReduceMotion
    ? {}
    : {
        transform: isHovered
          ? `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.01, 1.01, 1.01)`
          : isFocused
          ? 'perspective(1000px) rotateX(-2deg) rotateY(2deg) scale3d(1.005, 1.005, 1.005)'
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        transition: isHovered ? 'none' : 'transform 0.4s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s, box-shadow 0.3s',
      };

  return (
    <motion.div
      ref={cardRef}
      style={cardStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      onKeyDown={handleKeyDown}
      onClick={() => {
        sound.playClick();
        if (onClick) onClick();
      }}
      tabIndex={tabIndex}
      data-hoverable="true"
      className={`
        relative overflow-hidden rounded-[2rem] border-2 bg-[#111111] p-8 select-none cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]
        ${getGlowBorder()}
        ${className}
      `}
    >
      {/* Background follow-mouse sweep glow */}
      {isHovered && !shouldReduceMotion && (
        <div
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 rounded-full blur-[70px] opacity-40 transition-opacity duration-300"
          style={{
            left: `${glowPos.x}px`,
            top: `${glowPos.y}px`,
            width: '160px',
            height: '160px',
            background:
              glowColor === 'orange'
                ? 'radial-gradient(circle, #ff7a00 0%, transparent 80%)'
                : glowColor === 'blue'
                ? 'radial-gradient(circle, #00d9ff 0%, transparent 80%)'
                : glowColor === 'white'
                ? 'radial-gradient(circle, #ffffff 0%, transparent 80%)'
                : 'transparent',
          }}
        />
      )}

      {/* Decorative spaceship cyber outline corners */}
      <div className="absolute top-2 right-2 w-6 h-6 pointer-events-none opacity-20 border-t border-r border-white rounded-tr-xl" />
      <div className="absolute bottom-2 left-2 w-6 h-6 pointer-events-none opacity-20 border-b border-l border-white rounded-bl-xl" />

      {/* Orange telemetry accent corner dots */}
      <div className="absolute top-2.5 left-2.5 w-1.5 h-1.5 rounded-full bg-orange-500/60 pointer-events-none" />
      <div className="absolute bottom-2.5 right-2.5 w-1.5 h-1.5 rounded-full bg-orange-500/60 pointer-events-none" />

      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        {children}
      </div>
    </motion.div>
  );
}
