'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { sound } from '@/utils/sound';
import { Cpu, Radio } from 'lucide-react';

const BOOT_LOGS = [
  "INITIALIZING SPACE COMMAND CENTER OS...",
  "AUTHENTICATING SATELLITE KEY CHAINS...",
  "CONNECTING TO ORBIT NETWORK PROTOCOLS...",
  "INITIALIZING AI CONTROLLERS (GEMINI CORE)...",
  "RETRIEVING MISSION OBJECTIVES...",
  "DOWNLOADING GIT REPOSITORY DATA...",
  "CALIBRATING TACTICAL RADAR MATRICES...",
  "WELCOME COMMANDER."
];

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [logIndex, setLogIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Play deep spaceship hum sound on loading start
    sound.playBoot();

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            setTimeout(onComplete, 500);
          }, 600);
          return 100;
        }
        // Random progress step
        const step = Math.floor(Math.random() * 10) + 6;
        return Math.min(prev + step, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    const nextLogTrigger = Math.min(
      Math.floor((progress / 100) * BOOT_LOGS.length),
      BOOT_LOGS.length - 1
    );
    if (nextLogTrigger > logIndex) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLogIndex(nextLogTrigger);
      sound.playTypeChirp();
    }
  }, [progress, logIndex]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050505] text-[#E8E8ED] font-mono px-4 select-none"
        >
          {/* Futuristic grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:3rem_3rem] pointer-events-none" />

          {/* Central orange glowing orb */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full bg-orange-500/10 blur-[80px] pointer-events-none" />

          {/* Spaceship boot status graphics */}
          <div className="relative mb-12 flex items-center justify-center">
            {/* Spinning radar lines */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-full border-2 border-dashed border-orange-500/30 flex items-center justify-center"
            >
              <div className="w-24 h-24 rounded-full border border-orange-500/20" />
            </motion.div>

            {/* Sweep radar arm */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute w-32 h-32 rounded-full border-r border-t border-orange-500/80 filter drop-shadow-[0_0_8px_rgba(255,122,0,0.5)]"
              style={{ transformOrigin: 'center' }}
            />

            <div className="absolute flex space-x-1">
              <Cpu className="w-8 h-8 text-orange-500 animate-pulse" />
            </div>
          </div>

          {/* Loader text box */}
          <div className="w-full max-w-[550px] text-center space-y-4 px-4">
            <div className="flex items-center justify-between text-[10px] text-orange-500 tracking-[0.2em] font-bold border-b border-orange-500/20 pb-2">
              <span>SYSTEM BOOT SEQUENCER</span>
              <span className="flex items-center gap-1">
                <Radio className="w-3.5 h-3.5 text-orange-500 animate-ping" />
                ONLINE
              </span>
            </div>

            {/* Simulated log screen */}
            <div className="bg-[#111111] border-2 border-white rounded-2xl p-5 h-40 text-left text-[11px] leading-relaxed overflow-hidden shadow-inner text-[#8A8A94] relative">
              <div className="absolute top-0 bottom-0 left-0 right-0 p-5 flex flex-col justify-end space-y-1.5">
                {BOOT_LOGS.slice(0, logIndex + 1).map((log, index) => {
                  const isLast = index === logIndex;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                      className={`${isLast ? "text-orange-400 font-bold" : "text-[#8A8A94]"}`}
                    >
                      <span className="text-orange-500 mr-2">&gt;</span>
                      {log}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Load percentage */}
            <div className="mt-8 space-y-2">
              <div className="flex justify-between items-center text-xs font-mono text-[#8A8A94]">
                <span>DOWNLOADING ASSETS</span>
                <span className="text-orange-400 font-bold">{progress}%</span>
              </div>
              
              <div className="bg-[#111111] border border-white/20 h-3.5 rounded-full overflow-hidden p-0.5">
                <motion.div
                  className="bg-orange-500 h-full rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: `${progress}%` }}
                  transition={{ ease: "easeInOut" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
