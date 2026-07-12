'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Volume2, VolumeX, ShieldAlert, Navigation, Settings } from 'lucide-react';
import { sound } from '@/utils/sound';

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [muted, setMuted] = useState(false);
  const [easterEggActive, setEasterEggActive] = useState(false);
  const [easterEggTimer, setEasterEggTimer] = useState(10);
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMuted(sound.isMuted());

    // Listen for Ctrl+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        sound.playClick();
      }
      // Escape key to close
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle outside clicks
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (paletteRef.current && !paletteRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);



  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      sound.playSuccess();
    }
  };

  // Easter Egg Spaceship Warning System
  const triggerSelfDestruct = () => {
    sound.playClick();
    setEasterEggActive(true);
    setSearch('');
  };

  useEffect(() => {
    if (!easterEggActive) return;
    if (easterEggTimer <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEasterEggActive(false);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEasterEggTimer(10);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(false);
      return;
    }
    const timer = setTimeout(() => {
      setEasterEggTimer((prev) => prev - 1);
      sound.playTypeChirp();
    }, 1000);
    return () => clearTimeout(timer);
  }, [easterEggActive, easterEggTimer]);

  const items = [
    { name: 'Navigate to Hero Home', category: 'Navigation', shortcut: 'H', action: () => scrollToSection('hero') },
    { name: 'Navigate to About Core', category: 'Navigation', shortcut: 'A', action: () => scrollToSection('about') },
    { name: 'Navigate to Projects Array', category: 'Navigation', shortcut: 'P', action: () => scrollToSection('projects') },
    { name: 'Navigate to Skills Radar', category: 'Navigation', shortcut: 'S', action: () => scrollToSection('skills') },
    { name: 'Navigate to Mission Timeline (Exp)', category: 'Navigation', shortcut: 'E', action: () => scrollToSection('experience') },
    { name: 'Navigate to Resume Vault', category: 'Navigation', shortcut: 'R', action: () => scrollToSection('resume') },
    { name: 'Navigate to GitHub Logs', category: 'Navigation', shortcut: 'G', action: () => scrollToSection('github') },
    { name: 'Navigate to Secure Socket (Contact)', category: 'Navigation', shortcut: 'C', action: () => scrollToSection('contact') },
    { name: 'Simulation: Spaceship Alarm Mode', category: 'Easter Eggs', shortcut: 'X', action: triggerSelfDestruct },
  ];

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          {/* Main Modal Box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            ref={paletteRef}
            className="w-full max-w-[550px] bg-[#111111] border-2 border-white rounded-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(255,122,0,0.15)] flex flex-col"
          >
            {easterEggActive ? (
              // Fun Alert warning screens
              <div className="p-8 text-center space-y-6 font-mono text-red-500 bg-red-950/20">
                <ShieldAlert className="w-16 h-16 text-red-500 animate-bounce mx-auto" />
                <h3 className="text-xl font-bold tracking-widest uppercase">WARNING: TACTICAL OVERLOAD</h3>
                <p className="text-xs text-red-400/80 leading-relaxed">
                  Spaceship operating system has triggered a simulated fusion overload. Resuming core stabilizers in:
                </p>
                <div className="text-5xl font-extrabold tracking-widest text-white py-4 animate-pulse">
                  00:0{easterEggTimer}
                </div>
                <button
                  onClick={() => {
                    setEasterEggActive(false);
                    setEasterEggTimer(10);
                    sound.playSuccess();
                  }}
                  className="px-6 py-2.5 rounded-full border border-red-500 text-red-500 font-bold hover:bg-red-500 hover:text-white transition-all text-xs"
                >
                  STABILIZE SYSTEM REACTOR
                </button>
              </div>
            ) : (
              // Standard search navigation menu
              <>
                {/* Search Bar */}
                <div className="flex items-center gap-3 px-6 py-4 border-b border-white/10 bg-black/30">
                  <Search className="w-4 h-4 text-orange-500" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      sound.playTypeChirp();
                    }}
                    placeholder="Search spaceship command palette (e.g. Projects, Sound...)"
                    className="flex-1 bg-transparent text-sm font-mono text-[#E8E8ED] placeholder-white/30 outline-none"
                  />
                  <span className="text-[10px] font-mono text-white/40 bg-white/5 border border-white/10 rounded px-1.5 py-0.5 select-none">
                    ESC
                  </span>
                </div>

                {/* Items list */}
                <div className="max-h-[300px] overflow-y-auto p-4 space-y-1 scrollbar-thin">
                  {filteredItems.length > 0 ? (
                    filteredItems.map((item, idx) => (
                      <div
                        key={idx}
                        onClick={item.action}
                        onMouseEnter={() => sound.playHover()}
                        className="flex items-center justify-between px-4 py-3 rounded-xl border border-transparent hover:border-orange-500/30 hover:bg-white/5 text-sm font-mono text-[#8A8A94] hover:text-white cursor-pointer transition-all duration-200 group"
                      >
                        <div className="flex items-center gap-3">
                          {item.category === 'Navigation' && <Navigation className="w-4 h-4 text-white/30 group-hover:text-orange-500" />}
                          {item.category === 'System Settings' && <Settings className="w-4 h-4 text-white/30 group-hover:text-orange-500" />}
                          {item.category === 'Easter Eggs' && <ShieldAlert className="w-4 h-4 text-white/30 group-hover:text-red-500" />}
                          <span>{item.name}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-[#8A8A94] bg-white/5 border border-white/10 rounded px-1.5 py-0.5 group-hover:border-orange-500/20 group-hover:text-orange-500">
                            {item.shortcut}
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center font-mono text-xs text-[#8A8A94] py-8">
                      No system directory matching request.
                    </div>
                  )}
                </div>

                {/* Command Footer */}
                <div className="p-4 border-t border-white/5 bg-black/40 flex justify-between items-center text-[10px] font-mono text-[#8A8A94]">
                  <span>CMD MENU SYSTEM ACTIVE</span>
                  <div className="flex items-center gap-3">
                    <span>Press Ctrl + K to close</span>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
