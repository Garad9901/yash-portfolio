'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BentoCard from '@/components/BentoCard';
import { sound } from '@/utils/sound';
import { Compass, Terminal, ShieldCheck } from 'lucide-react';

interface Skill {
  name: string;
  category: 'AI_CORE' | 'FRAMEWORKS' | 'SYSTEMS';
  level: string; // e.g. "95% COGNITION"
  range: number; // 0.2 to 1 (radius on radar)
  description: string;
}

const SKILLS: Skill[] = [
  { name: "Python", category: "AI_CORE", level: "98% COGNITION", range: 0.95, description: "Primary scripting & neural pipeline constructor." },
  { name: "Machine Learning", category: "AI_CORE", level: "95% COGNITION", range: 0.9, description: "Statistical classification, regression, and GNN matrices." },
  { name: "Deep Learning", category: "AI_CORE", level: "92% COGNITION", range: 0.85, description: "Neural architectures, weight adjustments, and optimizers." },
  { name: "TensorFlow", category: "AI_CORE", level: "88% COGNITION", range: 0.75, description: "Industrial model training and deployment." },
  { name: "PyTorch", category: "AI_CORE", level: "92% COGNITION", range: 0.82, description: "Custom neural network research & graph engineering." },
  { name: "LangChain", category: "AI_CORE", level: "94% COGNITION", range: 0.8, description: "Autonomous LLM reasoning and agent orchestration." },
  { name: "CrewAI", category: "AI_CORE", level: "90% COGNITION", range: 0.78, description: "Multi-agent swarm operations and workflows." },
  
  { name: "React", category: "FRAMEWORKS", level: "92% COGNITION", range: 0.72, description: "Sleek frontend dashboard and control UI constructor." },
  { name: "Node", category: "FRAMEWORKS", level: "88% COGNITION", range: 0.68, description: "Asynchronous backend packet processing APIs." },
  { name: "FastAPI", category: "FRAMEWORKS", level: "95% COGNITION", range: 0.74, description: "High-performance Python rest endpoints." },
  { name: "Flask", category: "FRAMEWORKS", level: "85% COGNITION", range: 0.6, description: "Micro-framework implementation models." },
  { name: "Django", category: "FRAMEWORKS", level: "82% COGNITION", range: 0.62, description: "Monolithic admin dashboard backends." },
  
  { name: "Docker", category: "SYSTEMS", level: "90% COGNITION", range: 0.7, description: "Microservice containerization & orchestration." },
  { name: "SQL", category: "SYSTEMS", level: "92% COGNITION", range: 0.76, description: "Structured querying and database schema models." },
  { name: "Power BI", category: "SYSTEMS", level: "88% COGNITION", range: 0.65, description: "Interactive telemetry dashboards & analytics reporting." },
  { name: "Git", category: "SYSTEMS", level: "95% COGNITION", range: 0.88, description: "Decentralized version matrix controls." },
  { name: "Github", category: "SYSTEMS", level: "94% COGNITION", range: 0.86, description: "Central coordinate repository code spaces." },
  { name: "Linux", category: "SYSTEMS", level: "90% COGNITION", range: 0.8, description: "Operating shell commands & kernel structures." },
  { name: "Cloud", category: "SYSTEMS", level: "86% COGNITION", range: 0.72, description: "Distributed server computing nodes (OCI/AWS/GCP)." }
];

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<Skill>(SKILLS[0]);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const activeSkill = hoveredSkill || selectedSkill;

  // Render Skill Nodes on the circular SVG radar
  const radarRadius = 180;
  const centerX = 200;
  const centerY = 200;

  const getCoordinates = (index: number, total: number, range: number) => {
    // Distribute skills evenly in 360 degrees
    const angle = (index * (360 / total) * Math.PI) / 180;
    const radius = range * radarRadius;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);
    return { x, y, angle };
  };

  const handleSkillHover = (skill: Skill) => {
    setHoveredSkill(skill);
    sound.playHover();
  };

  const handleSkillClick = (skill: Skill) => {
    setSelectedSkill(skill);
    sound.playSuccess();
  };

  return (
    <section id="skills" className="py-24 px-4 md:px-12 bg-[#050505] text-[#E8E8ED] relative select-none starfield">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#050505_95%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-2 border-l-4 border-orange-500 pl-4">
          <div className="flex items-center space-x-2 text-orange-500 font-mono text-xs tracking-[0.25em] uppercase">
            <span>[ SYSTEM MODULE 02 ]</span>
            <div className="h-[1px] w-8 bg-orange-500/50" />
            <span>RADAR MATRIX</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tighter uppercase text-white">
            TACTICAL COGNITION RADAR
          </h2>
          <p className="text-xs text-[#8A8A94] font-mono">
            &gt; Hover over radar sector nodes to lock targeting array and parse diagnostics.
          </p>
        </div>

        {/* Space Command Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Panel: Circular Tactical Radar Interface (7 Cols) */}
          <BentoCard glowColor="orange" className="lg:col-span-7 flex flex-col items-center justify-center p-6 h-[480px]">
            <div className="relative w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] flex items-center justify-center">
              
              {/* SVG Tactical Display */}
              <svg viewBox="0 0 400 400" className="w-full h-full absolute inset-0 pointer-events-none">
                
                {/* 1. Radar Circular Grids */}
                {[0.2, 0.4, 0.6, 0.8, 1.0].map((r, idx) => (
                  <circle
                    key={idx}
                    cx={centerX}
                    cy={centerY}
                    r={r * radarRadius}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1.5"
                    fill="none"
                  />
                ))}

                {/* 2. Crosshair Grid Lines */}
                <line x1={centerX - radarRadius} y1={centerY} x2={centerX + radarRadius} y2={centerY} stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                <line x1={centerX} y1={centerY - radarRadius} x2={centerX} y2={centerY + radarRadius} stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1" />
                
                {/* 3. Grid border */}
                <circle
                  cx={centerX}
                  cy={centerY}
                  r={radarRadius}
                  stroke="rgba(255, 122, 0, 0.15)"
                  strokeWidth="1"
                  fill="none"
                />

                {/* 4. Active node targeting pointer line */}
                {activeSkill && (
                  <line
                    x1={centerX}
                    y1={centerY}
                    x2={getCoordinates(SKILLS.indexOf(activeSkill), SKILLS.length, activeSkill.range).x}
                    y2={getCoordinates(SKILLS.indexOf(activeSkill), SKILLS.length, activeSkill.range).y}
                    stroke="#ff7a00"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="drop-shadow-[0_0_8px_#ff7a00]"
                  />
                )}
              </svg>

              {/* 5. Sweep Scan Line overlay */}
              <div className="absolute w-[90%] h-[90%] rounded-full border border-orange-500/10 pointer-events-none overflow-hidden flex items-center justify-center">
                <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-orange-500/80 to-transparent radar-sweep" style={{ transformOrigin: 'center' }} />
              </div>

              {/* 6. Radar Core Widget */}
              <div className="absolute w-12 h-12 bg-black border border-white rounded-full flex items-center justify-center z-10">
                <Compass className="w-5 h-5 text-orange-500 animate-spin" style={{ animationDuration: '20s' }} />
              </div>

              {/* 7. Skill Nodes positioned radially */}
              {SKILLS.map((skill, idx) => {
                const { x, y } = getCoordinates(idx, SKILLS.length, skill.range);
                const pctX = (x / 400) * 100;
                const pctY = (y / 400) * 100;
                const isActive = activeSkill.name === skill.name;
                const isSelected = selectedSkill.name === skill.name;

                return (
                  <div
                    key={skill.name}
                    className="absolute"
                    style={{
                      left: `${pctX}%`,
                      top: `${pctY}%`,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div
                      onMouseEnter={() => handleSkillHover(skill)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      onClick={() => handleSkillClick(skill)}
                      className={`
                        w-4.5 h-4.5 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 relative
                        ${
                          isActive
                            ? 'bg-orange-500 scale-125 shadow-[0_0_15px_#ff7a00]'
                            : isSelected
                            ? 'bg-orange-500 scale-110'
                            : 'bg-[#050505] border border-white/50 hover:border-orange-500'
                        }
                      `}
                    >
                      {/* Sub-pulse indicators on active node */}
                      {isActive && (
                        <span className="absolute -inset-2 rounded-full border border-orange-500/40 animate-ping" />
                      )}
                      
                      {/* Compact text labeling nodes on radar display */}
                      <span className={`
                        absolute top-6 left-1/2 -translate-x-1/2 text-[9px] font-mono tracking-tighter whitespace-nowrap px-1 rounded bg-black/60 border border-white/5 transition-all
                        ${isActive ? 'text-orange-500 font-bold border-orange-500/30' : 'text-[#8A8A94]'}
                      `}>
                        {skill.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </BentoCard>

          {/* Right Panel: Advanced Telemetry Diagnostics (5 Cols) */}
          <BentoCard glowColor="white" className="lg:col-span-5 flex flex-col justify-between p-8 h-[480px]">
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest font-bold">
                  <Terminal className="w-4 h-4 text-orange-500" />
                  <span>NODE TELEMETRY DIRECTORY</span>
                </div>
                <span className="flex items-center gap-1 text-[9px] font-mono text-green-400 bg-green-950/20 px-2 py-0.5 rounded-full border border-green-500/10">
                  <span className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                  STABLE
                </span>
              </div>

              {/* Detail display panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSkill.name}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6 font-mono"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] text-orange-500 uppercase tracking-widest block font-bold">
                      NODE_IDENTIFIER
                    </span>
                    <h3 className="text-3xl font-heading font-extrabold text-white uppercase tracking-tight">
                      {activeSkill.name}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1">
                      <span className="text-[9px] text-[#8A8A94] uppercase block">SUBSYSTEM</span>
                      <span className="text-xs font-bold text-white uppercase">{activeSkill.category}</span>
                    </div>
                    
                    <div className="p-3 bg-black/40 border border-white/5 rounded-xl space-y-1">
                      <span className="text-[9px] text-[#8A8A94] uppercase block">COMPETENCE</span>
                      <span className="text-xs font-bold text-orange-500 uppercase">{activeSkill.level}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-[#8A8A94] uppercase block font-bold">
                      DIAGNOSTIC REPORT
                    </span>
                    <p className="text-xs text-[#8A8A94] leading-relaxed font-sans font-normal">
                      {activeSkill.description}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Bottom safety badge */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#8A8A94]">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-orange-500" />
                <span>DECRYPT: COMPLETE</span>
              </div>
              <span>COMMANDER VERIFIED</span>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
