'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import BentoCard from '@/components/BentoCard';
import { Award, Trophy, CalendarDays, BrainCircuit, ShieldAlert, Layers, MapPin } from 'lucide-react';

// Count-up helper component
function CountUp({
  end,
  duration = 1.5,
  prefix = "",
  suffix = "",
}: {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const endValue = end;
    if (start === endValue) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCount(endValue);
      return;
    }

    const totalMiliseconds = duration * 1000;
    const incrementTime = Math.max(Math.floor(totalMiliseconds / endValue), 20);

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= endValue) {
        clearInterval(timer);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className="font-mono text-4xl md:text-5xl font-extrabold text-cyan-400">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export default function Certifications() {
  const categories = [
    { id: "genai", name: "Generative AI & LLMs", icon: <BrainCircuit className="w-4 h-4" /> },
    { id: "agentic", name: "Agentic AI & LangChain", icon: <Layers className="w-4 h-4" /> },
    { id: "mldl", name: "ML & Deep Learning", icon: <Trophy className="w-4 h-4" /> },
    { id: "governance", name: "Governance & Security", icon: <ShieldAlert className="w-4 h-4" /> },
    { id: "geospatial", name: "Geospatial AI", icon: <MapPin className="w-4 h-4" /> }
  ];

  const [activeCategory, setActiveCategory] = useState("genai");

  const certsGrouped: { [key: string]: Certification[] } = {
    genai: [
      {
        title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
        issuer: "Oracle Cloud Infrastructure (OCI)",
        date: "Oct 2025 - Oct 2027",
      },
      {
        title: "Career Essentials in Generative AI",
        issuer: "Microsoft & LinkedIn",
        date: "May 2026",
      },
      {
        title: "Foundations of Prompt Engineering",
        issuer: "AWS",
        date: "Dec 2025",
      },
      {
        title: "Claude with the Anthropic API",
        issuer: "Anthropic Claude Portal",
        date: "Apr 2026",
      },
      {
        title: "Introduction to Model Context Protocol (MCP)",
        issuer: "Anthropic Developer Portal",
        date: "May 2026",
      },
      {
        title: "AI Appreciate",
        issuer: "Intel",
        date: "Dec 2025",
      },
      {
        title: "Introduction to Modern AI",
        issuer: "Cisco Networking Academy",
        date: "Jun 2026",
      },
    ],
    agentic: [
      {
        title: "Foundation: Introduction to LangGraph – Python",
        issuer: "LangChain Academy",
        date: "Jan 2026",
      },
      {
        title: "Quickstart: LangSmith Essentials",
        issuer: "LangChain Academy",
        date: "Jun 2026",
      },
      {
        title: "Foundation: Introduction to Agent Observability & Evaluations",
        issuer: "LangChain Academy",
        date: "Jun 2026",
      },
      {
        title: "Chatbot or Smart Assistant Development",
        issuer: "Nasscom Foundation",
        date: "Jun 2026",
      },
    ],
    mldl: [
      {
        title: "Fundamentals of Deep Learning",
        issuer: "NVIDIA Deep Learning Institute",
        date: "Jan 2026",
      },
      {
        title: "Introduction to Machine Learning",
        issuer: "NPTEL (IIT Kharagpur / Madras)",
        date: "Sep 2025",
      },
      {
        title: "Machine Learning – Dimensionality Reduction",
        issuer: "Cognitive Class / IBM",
        date: "Oct 2025",
      },
    ],
    governance: [
      {
        title: "AI Security & Governance",
        issuer: "Securiti AI Academy",
        date: "Jun 2026",
      },
      {
        title: "AI for Entrepreneurship",
        issuer: "Intel Partner Network",
        date: "Jul 2025",
      },
      {
        title: "AI in Pharma: Transforming Life Sciences Through Technology",
        issuer: "NCVET, MSDE, Government of India",
        date: "Mar 2026",
      },
    ],
    geospatial: [
      {
        title: "Overview of Geocomputation and Geo-web Services",
        issuer: "IIRS, ISRO",
        date: "Nov 2025",
      },
      {
        title: "What Works: Fast Field Scanning with AI",
        issuer: "InnovateUS Portal",
        date: "Jun 2026",
      },
    ],
  };

  return (
    <section id="credentials" className="py-24 px-4 md:px-12 bg-[#020205] text-[#E8E8ED] relative">
      <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-gradient-to-b from-transparent via-white/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Section Title */}
        <div className="space-y-2">
          <div className="flex items-center space-x-2 text-violet-400 font-mono text-xs tracking-[0.2em] uppercase">
            <span>[ SECTION 04 ]</span>
            <div className="h-[1px] w-8 bg-violet-400/50" />
            <span>CREDENTIAL INTELLIGENCE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tight">
            Credentials & Achievements
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Large Achievements Card - 2 Columns */}
          <BentoCard glowColor="orange" className="col-span-1 lg:col-span-2 space-y-8 min-h-[350px]">
            <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs uppercase tracking-wider">
              <Trophy className="w-4 h-4" />
              <span>Metrics & Milestones</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              {/* Metric 1 */}
              <div className="bg-[#090914] border border-white/5 p-6 rounded-2xl flex flex-col justify-center space-y-2">
                <CountUp end={15} prefix="Top " />
                <span className="text-xs text-[#8A8A94] uppercase tracking-wider font-mono">
                  Hackathon Rankings
                </span>
                <p className="text-[10px] text-cyan-400/60 font-mono">
                  National Innovation Contests
                </p>
              </div>

              {/* Metric 2 */}
              <div className="bg-[#090914] border border-white/5 p-6 rounded-2xl flex flex-col justify-center space-y-2">
                <CountUp end={22} suffix="+" />
                <span className="text-xs text-[#8A8A94] uppercase tracking-wider font-mono">
                  GitHub Repositories
                </span>
                <p className="text-[10px] text-cyan-400/60 font-mono">
                  Active ML & Dev Systems
                </p>
              </div>

              {/* Metric 3 */}
              <div className="bg-[#090914] border border-white/5 p-6 rounded-2xl flex flex-col justify-center space-y-2">
                <CountUp end={19} />
                <span className="text-xs text-[#8A8A94] uppercase tracking-wider font-mono">
                  Certificates Earned
                </span>
                <p className="text-[10px] text-cyan-400/60 font-mono">
                  Top Tech Providers & Gov
                </p>
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 font-mono text-xs text-[#8A8A94] space-y-2">
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400">&gt;</span>
                <span>Active contributor to AI research initiatives, intelligent automation systems, and open-source projects.</span>
              </div>
              <div className="flex items-start space-x-2">
                <span className="text-cyan-400">&gt;</span>
                <span>Selected for multiple competitive Data Analytics and AI Engineering internship cohorts.</span>
              </div>
            </div>
          </BentoCard>

          {/* Certifications Badge Container Card - Grouped Tabs - 1 Column */}
          <BentoCard glowColor="white" className="col-span-1 space-y-6 flex flex-col justify-between min-h-[350px]">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-violet-400 font-mono text-xs uppercase tracking-wider">
                <Award className="w-4 h-4" />
                <span>Grouped Registry</span>
              </div>

              {/* Tab selector buttons */}
              <div className="flex flex-wrap gap-1 border-b border-white/5 pb-3">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`
                      px-2.5 py-1.5 rounded-lg text-[9px] font-mono uppercase border transition-all duration-200 flex items-center space-x-1.5 outline-none
                      ${
                        activeCategory === cat.id
                          ? "bg-violet-500/20 border-violet-400 text-white font-bold"
                          : "bg-transparent border-transparent text-[#8A8A94] hover:text-white"
                      }
                    `}
                  >
                    {cat.icon}
                    <span>{cat.name.split(" & ")[0].split(" Ecosystem")[0]}</span>
                  </button>
                ))}
              </div>

              {/* Tab content list with smooth height adjustments */}
              <div className="overflow-y-auto max-h-[220px] pr-1 space-y-2.5 scrollbar-thin scrollbar-thumb-white/5">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="space-y-2.5"
                  >
                    {certsGrouped[activeCategory].map((c, idx) => (
                      <div
                        key={idx}
                        className="bg-white/5 border border-white/5 p-3 rounded-xl flex flex-col justify-between hover:border-violet-500/20 transition-all"
                      >
                        <div className="text-xs font-bold text-white leading-tight">
                          {c.title}
                        </div>
                        <div className="flex justify-between items-center text-[9px] font-mono text-[#8A8A94] mt-2">
                          <span>{c.issuer}</span>
                          <span className="text-violet-400 flex items-center space-x-1">
                            <CalendarDays className="w-3 h-3" />
                            <span>{c.date.split(" - ")[0]}</span>
                          </span>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="text-[10px] font-mono text-[#8A8A94] pt-2 border-t border-white/5">
              <span>Expected BE AI Grad: June 2027</span>
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}
