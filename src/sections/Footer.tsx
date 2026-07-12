'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, Terminal, Volume2, VolumeX, Radio } from 'lucide-react';
import { sound } from '@/utils/sound';
import MagneticButton from '@/components/MagneticButton';

export default function Footer() {


  const scrollToTop = () => {
    sound.playSuccess();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#050505] text-[#8A8A94] border-t-2 border-white py-12 px-4 md:px-12 relative overflow-hidden select-none starfield">
      {/* Spaceship panel crosshairs */}
      <div className="absolute top-0 left-8 w-4 h-[2px] bg-white" />
      <div className="absolute top-0 right-8 w-4 h-[2px] bg-white" />

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
        
        {/* Left column: branding + framework */}
        <div className="flex items-center space-x-3 text-left">
          <Terminal className="w-5 h-5 text-orange-500" />
          <div className="space-y-0.5">
            <div className="text-xs font-mono font-bold text-white tracking-widest uppercase">
              YASH_GARAD.SYS
            </div>
            <div className="text-[10px] text-[#8A8A94] font-mono uppercase tracking-wider">
              ENGINEERED VIA NEXT.JS &amp; TAILWIND V4
            </div>
          </div>
        </div>

        {/* Center column: System clocks */}
        <div className="flex items-center gap-6">
          {/* Clock stamp */}
          <div className="flex items-center gap-1.5 font-mono text-[10px] text-orange-500">
            <Radio className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
            <span>TRANSMIT_MATRIX: ONLINE</span>
          </div>
        </div>

        {/* Right column: back to top */}
        <div className="flex items-center gap-4">
          <div className="text-xs font-mono text-[#8A8A94]">
            &copy; {currentYear} YASH RAJESH GARAD
          </div>
          <MagneticButton
            onClick={scrollToTop}
            ariaLabel="Scroll back to top of the page"
            className="p-3.5 rounded-full bg-[#111111] border border-white hover:border-orange-500 hover:bg-black text-white transition-all duration-300 active:scale-90 flex items-center justify-center shadow-lg shadow-orange-500/5"
          >
            <ArrowUp className="w-4 h-4 text-orange-500" />
          </MagneticButton>
        </div>

      </div>
    </footer>
  );
}
