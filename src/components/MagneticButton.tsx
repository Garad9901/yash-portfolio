'use client';

import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  tabIndex?: number;
  ariaLabel?: string;
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  tabIndex = 0,
  ariaLabel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Pull intensity factor (max range boundary of pull)
    const pullX = distanceX * 0.35;
    const pullY = distanceY * 0.35;

    // Constrain pull distance
    const maxPull = 15;
    const cappedX = Math.max(-maxPull, Math.min(maxPull, pullX));
    const cappedY = Math.max(-maxPull, Math.min(maxPull, pullY));

    setPosition({ x: cappedX, y: cappedY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="inline-block"
    >
      <motion.button
        animate={{ x: position.x, y: position.y }}
        transition={{ type: 'spring', damping: 15, stiffness: 200, mass: 0.1 }}
        onClick={onClick}
        tabIndex={tabIndex}
        aria-label={ariaLabel}
        className={className}
      >
        {children}
      </motion.button>
    </div>
  );
}
