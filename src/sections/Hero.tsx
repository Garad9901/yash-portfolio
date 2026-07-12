'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import MagneticButton from '@/components/MagneticButton';
import AstronautCard from '@/components/AstronautCard';
import { ArrowDown, Radio, Activity, Compass } from 'lucide-react';
import { sound } from '@/utils/sound';

const ThreeNeuralNet = dynamic(() => import('@/components/ThreeNeuralNet'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050505] opacity-20 pointer-events-none" />,
});

const ROLES = [
  "AI Engineer",
  "Data Analytics Engineer",
  "Machine Learning Engineer",
  "Full Stack Developer",
  "Researcher"
];
const TYPING_SPEED = 80;
const DELETING_SPEED = 40;
const PAUSE_DURATION = 1500;

export default function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [roleIndex, setRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Smooth typing effect
  useEffect(() => {
    if (shouldReduceMotion) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentText(ROLES[0]);
      return;
    }

    const currentFullText = ROLES[roleIndex];
    let timer: NodeJS.Timeout;

    if (isDeleting) {
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, DELETING_SPEED);
    } else {
      timer = setTimeout(() => {
        setCurrentText(currentFullText.slice(0, currentText.length + 1));
      }, TYPING_SPEED);
    }

    if (!isDeleting && currentText === currentFullText) {
      clearTimeout(timer);
      timer = setTimeout(() => setIsDeleting(true), PAUSE_DURATION);
    } else if (isDeleting && currentText === "") {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, roleIndex, shouldReduceMotion]);

  const scrollToSection = (id: string) => {
    sound.playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full bg-[#050505] flex flex-col justify-center items-center overflow-hidden px-4 md:px-12 pt-28 pb-16 select-none starfield"
    >
      {/* 3D Space Background */}
      <ThreeNeuralNet />

      {/* Radial overlay gradient to merge background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,#050505_95%)] pointer-events-none" />

      {/* Cyber Orange/Blue Ambient Glows */}
      <div className="absolute top-1/4 left-1/3 w-[300px] h-[300px] rounded-full bg-orange-500/5 blur-[120px] pointer-events-none glow-ambient" />
      <div className="absolute bottom-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-[120px] pointer-events-none glow-ambient" style={{ animationDelay: '2s' }} />

      {/* Futuristic Outer Border Frame enclosing landing page */}
      <div className="absolute inset-4 md:inset-8 border-2 border-white rounded-[2.5rem] pointer-events-none z-10 opacity-70">
        {/* Dashboard telemetry crosshairs */}
        <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white" />
        <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white" />
        <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white" />
      </div>

      <div className="relative z-20 max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center h-full">
        
        {/* Left Side: Large Space OS Text Intro */}
        <div className="lg:col-span-7 text-left space-y-6 md:pr-4">
          
          {/* Signal Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-[#111111] border border-white/20 rounded-full px-4.5 py-2 backdrop-blur-md mb-2 shadow-lg"
          >
            <Radio className="w-4 h-4 text-orange-500 animate-pulse" />
            <span className="text-[10px] font-mono text-white tracking-widest uppercase font-semibold">
              COMMUNICATION CHANNEL_OPEN
            </span>
          </motion.div>

          {/* Heading */}
          <div className="space-y-1">
            <motion.p
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-lg md:text-2xl font-mono text-orange-500 uppercase tracking-widest font-semibold"
            >
              HELLO. I&apos;M
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-8xl font-heading font-extrabold tracking-tighter text-white uppercase leading-none"
            >
              YASH <br className="hidden md:inline" />
              <span className="text-orange-500">GARAD</span>
            </motion.h1>
          </div>

          {/* Typing dynamic discipline cursor */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-3xl font-mono text-white flex items-center space-x-1.5 border-l-2 border-orange-500 pl-4 py-1"
          >
            <span className="text-[#8A8A94] mr-1">&gt;&gt;</span>
            <span className="font-bold tracking-tight text-white">{currentText}</span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="w-1.5 h-6 bg-orange-500 inline-block align-middle ml-1"
            />
          </motion.div>

          {/* Minimal short description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="max-w-xl text-sm md:text-base text-[#8A8A94] leading-relaxed font-sans"
          >
            Engineering advanced AI/ML models, scalable data analytics platforms, 
            and decentralized full-stack systems. Operating at the intersection of computer vision, 
            generative AI, and intelligent automation.
          </motion.p>

          {/* Magnetic Buttons CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-4 flex flex-wrap gap-4"
          >
            <MagneticButton
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-bold font-mono text-xs uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-orange-500/20"
            >
              PROJECT_REGISTRY
            </MagneticButton>

            <MagneticButton
              onClick={() => scrollToSection('contact')}
              className="px-8 py-4 rounded-full bg-transparent hover:bg-white/5 border border-white text-white font-bold font-mono text-xs uppercase tracking-widest transition-all active:scale-95"
            >
              SECURE_LINK
            </MagneticButton>
          </motion.div>

          {/* System status widgets */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg pt-8 border-t border-white/10 font-mono text-[10px] text-[#8A8A94]"
          >
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-orange-500 animate-pulse" />
              <span>REACTOR TEMP: STABLE</span>
            </div>
            <div className="flex items-center gap-2">
              <Compass className="w-3.5 h-3.5 text-orange-500" />
              <span>LATITUDE: 21.1458° N</span>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Futuristic Astronaut Instrument Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.3 }}
          className="lg:col-span-5 flex justify-center lg:justify-end w-full relative z-20"
        >
          <AstronautCard />
        </motion.div>

      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        onClick={() => scrollToSection('about')}
        className="absolute bottom-10 cursor-pointer flex flex-col items-center justify-center text-[#8A8A94] hover:text-orange-500 transition-colors z-20"
      >
        <span className="text-[9px] font-mono tracking-[0.25em] uppercase mb-1.5">INITIALIZE_DESCENT</span>
        <ArrowDown className="w-4 h-4 text-orange-500" />
      </motion.div>
    </section>
  );
}
