'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BentoCard from '@/components/BentoCard';
import { GraduationCap, MapPin, Cpu, Award, Orbit, ShieldCheck, Flame } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="relative min-h-screen py-24 px-4 md:px-12 bg-[#050505] text-[#E8E8ED] overflow-hidden flex flex-col justify-center select-none starfield">
      {/* Sci-fi grid lines overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff01_1px,transparent_1px),linear-gradient(to_bottom,#ffffff01_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-12">
        {/* Section Header */}
        <div className="space-y-2 border-l-4 border-orange-500 pl-4">
          <div className="flex items-center space-x-2 text-orange-500 font-mono text-xs tracking-[0.25em] uppercase">
            <span>[ SYSTEM MODULE 01 ]</span>
            <div className="h-[1px] w-8 bg-orange-500/50" />
            <span>NEURAL CORE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tighter uppercase text-white">
            BIOMETRICS & TELEMETRY
          </h2>
        </div>

        {/* Bento Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Card 1: Core Bio Processor */}
          <BentoCard glowColor="orange" className="col-span-1 md:col-span-2 space-y-6">
            <div className="space-y-4 text-left">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 text-orange-500 font-mono text-xs uppercase tracking-widest font-bold">
                  <Cpu className="w-4.5 h-4.5 animate-pulse" />
                  <span>BIOGRAPHICAL ENGINE</span>
                </div>
                <span className="text-[9px] font-mono text-orange-500 bg-orange-950/20 border border-orange-500/20 px-2 py-0.5 rounded-full">
                  STATUS: SECURE
                </span>
              </div>
              
              <h3 className="text-2xl font-bold font-heading text-white tracking-tight uppercase">
                COMMANDER YASH RAJESH GARAD
              </h3>
              
              <p className="text-sm md:text-base text-[#8A8A94] leading-relaxed font-sans">
                I am an AI/ML developer and software architect specialized in constructing high-performance neural engines, 
                predictive analytics systems, and decentralized automation pipelines. My focus is on bridges 
                connecting geometric computer vision, natural language representations, and digital public infrastructure.
              </p>
              
              <p className="text-sm md:text-base text-[#8A8A94] leading-relaxed font-sans">
                By fusing statistical model optimization with cloud-native scalability (Kubernetes, NestJS, FastAPI), 
                I design robust systems engineered to resolve complex real-world challenges.
              </p>
            </div>

            {/* Bottom telemetry indicators */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-white/10 font-mono text-xs text-[#8A8A94]">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>NAGPUR, INDIA</span>
              </div>
              <div className="flex items-center space-x-2">
                <GraduationCap className="w-4 h-4 text-orange-500 shrink-0" />
                <span>B.E. AI (EXP: 2027)</span>
              </div>
              <div className="flex items-center space-x-2 col-span-2 sm:col-span-1">
                <ShieldCheck className="w-4 h-4 text-green-500 shrink-0 animate-pulse" />
                <span className="text-green-400">OS V3.1.2_STABLE</span>
              </div>
            </div>
          </BentoCard>

          {/* Card 2: Interactive CGPA & Education Console */}
          <BentoCard glowColor="white" className="col-span-1 flex flex-col justify-between">
            <div className="space-y-4 text-left">
              <div className="flex items-center space-x-2 text-white font-mono text-xs uppercase tracking-widest font-bold">
                <GraduationCap className="w-4.5 h-4.5" />
                <span>EDUCATION MODULE</span>
              </div>
              <h4 className="text-lg font-bold text-white tracking-tight leading-snug">
                B.E. ARTIFICIAL INTELLIGENCE
              </h4>
              <p className="text-xs text-[#8A8A94] leading-relaxed">
                St. Vincent Pallotti College of Engineering &amp; Technology, Nagpur.
              </p>
            </div>

            {/* Futuristic CGPA Cockpit Circular Gauge */}
            <div className="flex flex-col items-center justify-center py-6">
              <div className="relative w-32 h-32 flex items-center justify-center">
                {/* Outer spin rings */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-full h-full border border-dashed border-orange-500/20 rounded-full"
                />
                {/* SVG Progress Circle */}
                <svg className="w-28 h-28 transform -rotate-90">
                  <circle cx="56" cy="56" r="48" stroke="#1c1c1e" strokeWidth="8" fill="none" />
                  <motion.circle
                    cx="56"
                    cy="56"
                    r="48"
                    stroke="#ff7a00"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray="301.6"
                    initial={{ strokeDashoffset: 301.6 }}
                    animate={{ strokeDashoffset: 301.6 - (301.6 * 9.15) / 10 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                  />
                </svg>
                {/* Text centered inside progress bar */}
                <div className="absolute flex flex-col items-center justify-center font-mono">
                  <span className="text-xl font-extrabold text-white">9.15</span>
                  <span className="text-[8px] text-[#8A8A94] tracking-widest">CGPA VAL</span>
                </div>
              </div>
              <div className="text-[10px] font-mono text-[#8A8A94] tracking-widest uppercase mt-4">
                ACADEMIC INDEX: OPTIMAL
              </div>
            </div>
          </BentoCard>

          {/* Card 3: Achievements Registry */}
          <BentoCard glowColor="white" className="col-span-1 space-y-4">
            <div className="flex items-center space-x-2 text-white font-mono text-xs uppercase tracking-widest font-bold">
              <Award className="w-4.5 h-4.5" />
              <span>ACHIEVEMENTS REGISTRY</span>
            </div>
            
            <div className="space-y-4 text-left font-mono text-xs">
              <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1">
                <div className="text-orange-500 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <Flame className="w-3.5 h-3.5" />
                  <span>HACKATHONS</span>
                </div>
                <div className="text-white font-semibold">TOP 15 NATIONAL RANK</div>
                <p className="text-[9px] text-[#8A8A94]">Multiple competitive innovation and engineering summits.</p>
              </div>

              <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1">
                <div className="text-orange-500 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
                  <Orbit className="w-3.5 h-3.5" />
                  <span>OPEN SOURCE</span>
                </div>
                <div className="text-white font-semibold">ACTIVE CONTRIBUTOR</div>
                <p className="text-[9px] text-[#8A8A94]">Developing digital identity and risk systems.</p>
              </div>
            </div>
          </BentoCard>

          {/* Card 4: Collaboration Matrix */}
          <BentoCard glowColor="orange" className="col-span-1 md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2 text-orange-500 font-mono text-xs uppercase tracking-widest font-bold">
              <Orbit className="w-4.5 h-4.5" />
              <span>COGNITIVE MATRIX INTERESTS</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              <div className="space-y-2">
                <h5 className="text-xs font-bold font-mono text-white tracking-widest uppercase">
                  ACTIVE RESEARCH CHANNELS
                </h5>
                <ul className="space-y-2 font-mono text-[11px] text-[#8A8A94]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0" />
                    <span>Deep Reinforcement Agent Frameworks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0" />
                    <span>Geometric Graph Neural Networks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full shrink-0" />
                    <span>Liveness Biometrics & Fraud Analytics</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
                <h5 className="text-xs font-bold font-mono text-white tracking-widest uppercase">
                  COLLABORATIVE CRITERIA
                </h5>
                <p className="text-xs text-[#8A8A94] leading-relaxed">
                  I am actively seeking strategic collaborations in advanced AI agents, distributed geospatial ML pipelines, 
                  and high-throughput Full Stack systems.
                </p>
                <div className="pt-2">
                  <span className="inline-block bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-[9px] uppercase tracking-wider rounded-full px-3 py-1 animate-pulse">
                    RECEIVER_PORTS: ONLINE
                  </span>
                </div>
              </div>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
