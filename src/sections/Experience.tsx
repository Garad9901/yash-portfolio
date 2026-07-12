'use client';

import React from 'react';
import { motion } from 'framer-motion';
import BentoCard from '@/components/BentoCard';
import { Calendar, Navigation } from 'lucide-react';

interface MissionLog {
  id: string;
  role: string;
  mission: string; // Company / Institution
  duration: string;
  objectives: string[];
  status: 'COMPLETED' | 'ACTIVE' | 'ARCHIVED';
  tag: string;
}

const MISSIONS: MissionLog[] = [
  {
    id: "rnr-innotech",
    role: "AI Developer Intern",
    mission: "RNR Innotech",
    duration: "Oct 2025 - Dec 2025",
    objectives: [
      "Engineered high-throughput computer vision models for automated defect detection systems.",
      "Optimized inference runtime latencies of YOLO architectures by 35% using TensorRT profiling.",
      "Integrated secure multi-agent swarms using LangGraph to automate local analytics generation."
    ],
    status: "COMPLETED",
    tag: "SYS_OPTIMIZATION"
  },
  {
    id: "acube-ai",
    role: "ML Engineer Intern",
    mission: "Acube AI",
    duration: "Jun 2025 - Aug 2025",
    objectives: [
      "Built production-grade document parse engines leveraging multimodal LLM models.",
      "Deployed scalable vector indexing schemas using PostGIS and PgVector.",
      "Spearheaded model alignment evaluations to guarantee liveness verification accuracy."
    ],
    status: "COMPLETED",
    tag: "MODEL_ALIGNMENT"
  },
  {
    id: "college-leadership",
    role: "AI Student Representative & Dev Lead",
    mission: "St. Vincent Pallotti College of Engineering",
    duration: "Jul 2024 - Present",
    objectives: [
      "Directing student developer cohorts to build automated internal campus portals.",
      "Organized national-level hackathons and hands-on LLM model context protocol workshops.",
      "Conducting training bootcamps on cloud deployment (Docker, GitHub Actions)."
    ],
    status: "ACTIVE",
    tag: "COMMAND_SWARM"
  },
  {
    id: "research",
    role: "Geospatial AI & Risk Research Coordinator",
    mission: "Autonomous Research Initiatives",
    duration: "Nov 2024 - Present",
    objectives: [
      "Designing predictive risk models for environmental indicators across Maharashtra districts.",
      "Combining spatial demographic census metrics with real-time remote sensing bands.",
      "Drafting comparative analysis reports evaluating GNN and LSTM forecasting efficiency."
    ],
    status: "ACTIVE",
    tag: "NEURAL_RESEARCH"
  },
  {
    id: "events",
    role: "Competitive Hackathon Contender",
    mission: "National Innovation Contests",
    duration: "2024 - 2026",
    objectives: [
      "Secured Top 15 finishes in competitive national engineering summits.",
      "Constructed functional software prototypes (AadhaarX, AgroSense AI) within 36-hour lock-ins.",
      "Presented systems architectural maps to panels of enterprise directors and engineers."
    ],
    status: "ACTIVE",
    tag: "STRIKE_MISSIONS"
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 md:px-12 bg-[#050505] text-[#E8E8ED] relative select-none starfield">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#050505_95%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-16 relative z-10">
        
        {/* Section Title */}
        <div className="space-y-2 border-l-4 border-orange-500 pl-4">
          <div className="flex items-center space-x-2 text-orange-500 font-mono text-xs tracking-[0.25em] uppercase">
            <span>[ SYSTEM MODULE 03 ]</span>
            <div className="h-[1px] w-8 bg-orange-500/50" />
            <span>MISSION LOG</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tighter uppercase text-white">
            CHRONOLOGICAL MISSION LOGS
          </h2>
          <p className="text-xs text-[#8A8A94] font-mono">
            &gt; Read entries of deployment history and tactical engineering missions.
          </p>
        </div>

        {/* Timeline Log Grid */}
        <div className="relative">
          
          {/* Vertical central glowing line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-orange-500 via-white/20 to-orange-500/10 -translate-x-1/2" />

          {/* Timeline Nodes */}
          <div className="space-y-12">
            {MISSIONS.map((mission, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div key={mission.id} className="relative flex flex-col md:flex-row md:justify-between items-start md:items-center">
                  
                  {/* Glowing Node Circle on Vertical Line */}
                  <div className="absolute left-4 md:left-1/2 w-4 h-4 rounded-full bg-[#050505] border-2 border-orange-500 -translate-x-1/2 z-10 flex items-center justify-center">
                    <motion.div
                      animate={{ scale: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                      className="w-1.5 h-1.5 rounded-full bg-orange-500"
                    />
                  </div>

                  {/* Left Column Spacer / Card container */}
                  <div className={`w-full md:w-[46%] pl-10 md:pl-0 ${isEven ? 'md:text-right md:order-1' : 'md:order-2 md:text-left'}`}>
                    <BentoCard glowColor={mission.status === 'ACTIVE' ? 'orange' : 'white'} className="space-y-4">
                      
                      {/* Log Header */}
                      <div className={`flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-3 ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className="space-y-0.5">
                          <span className="text-[10px] font-mono text-orange-500 uppercase tracking-widest font-bold">
                            {mission.tag}
                          </span>
                          <h3 className="text-lg font-bold font-heading text-white uppercase leading-snug">
                            {mission.role}
                          </h3>
                        </div>
                        <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-full border
                          ${
                            mission.status === 'ACTIVE'
                              ? 'text-orange-400 bg-orange-950/20 border-orange-500/20 animate-pulse'
                              : 'text-[#8A8A94] bg-white/5 border-white/10'
                          }
                        `}>
                          {mission.status}
                        </span>
                      </div>

                      {/* Meta information row */}
                      <div className={`flex items-center gap-3.5 text-[10px] font-mono text-[#8A8A94] ${isEven ? 'md:flex-row-reverse' : ''}`}>
                        <div className="flex items-center gap-1">
                          <Navigation className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span className="text-white font-bold">{mission.mission}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span>{mission.duration}</span>
                        </div>
                      </div>

                      {/* Objectives checklist */}
                      <ul className={`space-y-2 text-xs text-[#8A8A94] leading-relaxed list-none pl-0 ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                        {mission.objectives.map((obj, i) => (
                          <li key={i} className={`flex gap-2 items-start ${isEven ? 'md:flex-row-reverse' : ''}`}>
                            <span className="text-orange-500 shrink-0 font-bold">&gt;</span>
                            <span className="font-sans">{obj}</span>
                          </li>
                        ))}
                      </ul>

                    </BentoCard>
                  </div>

                  {/* Empty Spacer column for desktop alignment */}
                  <div className="hidden md:block w-[46%] md:order-2" />

                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
