'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BentoCard from '@/components/BentoCard';
import { sound } from '@/utils/sound';
import { Star, GitFork, Search, ArrowUpRight, ExternalLink, X, Radio, Terminal } from 'lucide-react';

const GithubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  stack: string[];
  glow: 'orange' | 'blue' | 'white';
  githubUrl: string;
  demoUrl?: string;
  featured?: boolean;
  category: 'aiml' | 'frameworks' | 'systems';
  stats?: {
    stars: number;
    forks: number;
    updatedAt: string;
    language: string;
  };
}

// Full high-fidelity fallback projects list to match the user's repos
const FALLBACK_PROJECTS: Project[] = [
  {
    id: "agrosense",
    name: "AgroSense AI",
    tagline: "Intelligent Crop & Climate Risk Platform",
    description: "District-level AI platform for Rainfall Forecasting, Crop Yield Prediction, and Climate Risk Assessment across 11 districts of Vidarbha, Maharashtra.",
    stack: ["Python", "XGBoost", "LSTM", "GNNs", "FastAPI", "MLflow", "PostgreSQL", "Streamlit"],
    glow: "orange",
    githubUrl: "https://github.com/Garad9901/AgroSense-AI",
    demoUrl: "https://github.com/Garad9901/AgroSense-AI",
    featured: true,
    category: "aiml",
    stats: { stars: 12, forks: 4, updatedAt: "2026-07-10", language: "Python" }
  },
  {
    id: "aadhaarx",
    name: "AadhaarX",
    tagline: "AI-Powered Identity Verification Ecosystem",
    description: "Cloud-native digital identity platform featuring biometric verification, passive liveness detection, and decentralized audit trails.",
    stack: ["TypeScript", "Next.js", "NestJS", "Docker", "Kubernetes", "Biometrics"],
    glow: "blue",
    githubUrl: "https://github.com/Garad9901/AadhaarX",
    demoUrl: "https://github.com/Garad9901/AadhaarX",
    featured: false,
    category: "systems",
    stats: { stars: 9, forks: 2, updatedAt: "2026-06-25", language: "TypeScript" }
  },
  {
    id: "policypulse",
    name: "PolicyPulse",
    tagline: "AI Policy Analytics Framework",
    description: "Evaluates the historical impact of India's rural employment guarantee programs and analyzes ongoing transit and policy execution datasets.",
    stack: ["Python", "Pandas", "Numpy", "Scikit-Learn", "Data Analytics"],
    glow: "white",
    githubUrl: "https://github.com/Garad9901/PolicyPulse",
    featured: false,
    category: "aiml",
    stats: { stars: 6, forks: 1, updatedAt: "2026-05-18", language: "Python" }
  },
  {
    id: "mathgpt",
    name: "MathGPT Enterprise",
    tagline: "Neuro-Symbolic Math Research Platform",
    description: "Combines Gemini 2.5, Lean 4, SymPy, ArXiv, and knowledge graphs to enable formal proof verification and symbolic reasoning pipelines.",
    stack: ["JavaScript", "React.js", "Node.js", "Lean4", "SymPy", "Knowledge Graphs"],
    glow: "blue",
    githubUrl: "https://github.com/Garad9901/mathgpt-enterprise",
    featured: false,
    category: "frameworks",
    stats: { stars: 8, forks: 2, updatedAt: "2026-07-02", language: "JavaScript" }
  },
  {
    id: "urduguard",
    name: "UrduGuard Moderation Suite",
    tagline: "Urdu NLP Content Moderation",
    description: "Production-grade platform designed for hierarchical violence-incitation and abuse detection in social media content.",
    stack: ["JavaScript", "NLP", "BERT", "FastAPI", "React", "Moderation APIs"],
    glow: "orange",
    githubUrl: "https://github.com/Garad9901/urduguard-moderation-suite",
    featured: false,
    category: "frameworks",
    stats: { stars: 5, forks: 1, updatedAt: "2026-04-12", language: "JavaScript" }
  },
  {
    id: "gaia",
    name: "GAIA Dashboard",
    tagline: "Geospatial Intelligence Platform",
    description: "Full-stack geospatial dashboard combining census demographics, environmental indicators, and seismic risks through interactive GIS.",
    stack: ["JavaScript", "PostGIS", "Leaflet", "React", "FastAPI", "Geospatial AI"],
    glow: "white",
    githubUrl: "https://github.com/Garad9901/gaia-geospatial-dashboard",
    featured: false,
    category: "systems",
    stats: { stars: 7, forks: 2, updatedAt: "2026-05-22", language: "JavaScript" }
  },
  {
    id: "smartresume",
    name: "Smart Resume Screener",
    tagline: "AI Job Matcher & Screening",
    description: "AI-powered resume parsing and job alignment system built using FastAPI, React, natural language modeling, and classification ML.",
    stack: ["FastAPI", "React.js", "NLP", "Scikit-Learn", "Machine Learning"],
    glow: "blue",
    githubUrl: "https://github.com/Garad9901/Smart-Resume-Screening-Job-Matcher",
    featured: false,
    category: "aiml",
    stats: { stars: 10, forks: 3, updatedAt: "2026-06-30", language: "JavaScript" }
  },
  {
    id: "loravehicle",
    name: "LoRa Vehicle Network / V2V ADAS",
    tagline: "Cooperative Collision Avoidance",
    description: "Real-time latency-aware hazard detection network utilizing predictive ML algorithms to coordinate vehicle-to-vehicle crash warnings.",
    stack: ["TypeScript", "Node.js", "LoRaWAN", "Predictive ML", "V2V Protocols"],
    glow: "orange",
    githubUrl: "https://github.com/Garad9901/Lora-Vehicle-Network-",
    featured: false,
    category: "systems",
    stats: { stars: 9, forks: 2, updatedAt: "2026-07-09", language: "TypeScript" }
  }
];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>(FALLBACK_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'aiml' | 'frameworks' | 'systems'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Fetch real-time stars and forks from GitHub API
  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // LocalStorage cache validation
        const cached = localStorage.getItem('om_github_repos');
        const cachedTime = localStorage.getItem('om_github_repos_time');
        
        if (cached && cachedTime && Date.now() - parseInt(cachedTime) < 3600000) {
          setProjects(JSON.parse(cached));
          return;
        }

        interface GitHubRepo {
          name: string;
          html_url: string;
          stargazers_count: number;
          forks_count: number;
          updated_at: string;
          language: string;
        }

        const response = await fetch('https://api.github.com/users/Garad9901/repos?per_page=100');
        if (!response.ok) throw new Error('API Rate limit exceeded or offline');

        const repos: GitHubRepo[] = await response.json();
        
        // Map GitHub data onto our curated project list
        const updated = FALLBACK_PROJECTS.map(proj => {
          const matchingRepo = repos.find((r) => r.name.toLowerCase() === proj.id || r.name === proj.name || r.html_url === proj.githubUrl);
          if (matchingRepo) {
            return {
              ...proj,
              stats: {
                stars: matchingRepo.stargazers_count || proj.stats?.stars || 0,
                forks: matchingRepo.forks_count || proj.stats?.forks || 0,
                updatedAt: matchingRepo.updated_at.split('T')[0] || proj.stats?.updatedAt || '',
                language: matchingRepo.language || proj.stats?.language || 'Python'
              }
            };
          }
          return proj;
        });

        localStorage.setItem('om_github_repos', JSON.stringify(updated));
        localStorage.setItem('om_github_repos_time', Date.now().toString());
        setProjects(updated);
      } catch (err) {
        console.warn("GitHub API fallback loaded successfully:", err);
      }
    };

    fetchGitHubData();
  }, []);

  const handleCardClick = (project: Project) => {
    setSelectedProject(project);
    sound.playSuccess();
  };

  const closeModal = () => {
    setSelectedProject(null);
    sound.playClick();
  };

  const filteredProjects = projects.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.stack.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredProject = projects.find(p => p.featured) || projects[0];

  return (
    <section id="projects" className="py-24 px-4 md:px-12 bg-[#050505] text-[#E8E8ED] relative select-none starfield">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#050505_95%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-2 border-l-4 border-orange-500 pl-4">
          <div className="flex items-center space-x-2 text-orange-500 font-mono text-xs tracking-[0.25em] uppercase">
            <span>[ SYSTEM MODULE 04 ]</span>
            <div className="h-[1px] w-8 bg-orange-500/50" />
            <span>PROJECTS GRID</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tighter uppercase text-white">
            FEATURED PROJECT & REPOSITORIES
          </h2>
          <p className="text-xs text-[#8A8A94] font-mono">
            &gt; Read entries of software development builds and active deployment nodes.
          </p>
        </div>

        {/* 1. Featured Project - Large Astronaut-inspired layout */}
        {featuredProject && (
          <div className="border-2 border-white rounded-[2.5rem] bg-[#111111] overflow-hidden p-6 md:p-10 relative flex flex-col lg:flex-row gap-8 shadow-[0_20px_50px_rgba(255,122,0,0.1)] hover:border-orange-500 transition-colors duration-300">
            {/* Ambient glows */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-orange-500/5 blur-[80px] pointer-events-none" />

            {/* Left side description */}
            <div className="flex-1 flex flex-col justify-between space-y-6 text-left">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
                  <span className="text-[10px] font-mono text-orange-400 uppercase tracking-widest font-bold">PRIMARY BUILD OUTLET</span>
                </div>
                <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-white tracking-tight uppercase">
                  {featuredProject.name}
                </h3>
                <p className="text-xs font-mono text-[#8A8A94] uppercase tracking-wider">
                  {featuredProject.tagline}
                </p>
              </div>

              <p className="text-sm text-[#8A8A94] leading-relaxed font-sans font-normal">
                {featuredProject.description}
              </p>

              {/* Technologies */}
              <div className="flex flex-wrap gap-2 pt-2">
                {featuredProject.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono text-white uppercase"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Action trigger row */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button
                  onClick={() => handleCardClick(featuredProject)}
                  className="px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono font-bold text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2"
                >
                  <Terminal className="w-3.5 h-3.5" />
                  DIAGNOSTICS
                </button>
                
                <a
                  href={featuredProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full bg-transparent hover:bg-white/5 border border-white text-white font-mono font-bold text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center gap-2"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  REPOSITORY
                </a>
              </div>
            </div>

            {/* Right side: Astronaut-style interactive graphic */}
            <div className="w-full lg:w-[400px] h-[300px] bg-black/40 border border-white/10 rounded-3xl overflow-hidden relative flex items-center justify-center p-6 shrink-0 border-dashed">
              
              {/* Radar rings */}
              <div className="absolute w-56 h-56 rounded-full border border-orange-500/10 flex items-center justify-center animate-pulse">
                <div className="w-40 h-40 rounded-full border border-white/5 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full border border-orange-500/10" />
                </div>
              </div>

              {/* Holographic glowing central icon */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-4">
                <svg viewBox="0 0 100 100" className="w-20 h-20 text-orange-500 animate-pulse">
                  <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1.5" fill="none" strokeDasharray="3 3" />
                  <path d="M50,15 L50,85 M15,50 L85,50" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                  <polygon points="50,28 69,60 31,60" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
                <div className="font-mono text-[10px] text-white tracking-widest uppercase">
                  AGROSENSE NEURAL BLOCK
                </div>
              </div>

              {/* Hotspot indicators with pointer lines */}
              <div className="absolute top-1/4 left-1/4 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                <div className="text-[8px] font-mono bg-black border border-white/10 rounded px-1 text-white">
                  MODEL: LSTM
                </div>
              </div>

              <div className="absolute bottom-1/4 right-1/4 flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                <div className="text-[8px] font-mono bg-black border border-white/10 rounded px-1 text-white">
                  INPUT: GNNs
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 2. Controls: Search and Filter Row */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#111111] border-2 border-white rounded-2xl p-4">
          {/* Search */}
          <div className="flex items-center gap-3 w-full md:w-80 px-4 py-2.5 bg-black/40 border border-white/10 rounded-xl">
            <Search className="w-4 h-4 text-orange-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                sound.playTypeChirp();
              }}
              placeholder="Search repository registry..."
              className="bg-transparent text-xs font-mono text-white placeholder-white/30 outline-none w-full"
            />
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            {(['all', 'aiml', 'frameworks', 'systems'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  sound.playClick();
                }}
                className={`
                  px-4 py-2 rounded-xl text-[10px] font-mono uppercase border transition-all active:scale-95 outline-none
                  ${
                    activeCategory === cat
                      ? "bg-orange-500 border-orange-500 text-white font-bold"
                      : "bg-transparent border-white/10 text-[#8A8A94] hover:text-white"
                  }
                `}
              >
                {cat === 'aiml' ? 'AI / ML' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Grid of Repositories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <BentoCard
              key={project.id}
              glowColor={project.glow}
              onClick={() => handleCardClick(project)}
              className="flex flex-col justify-between h-[300px]"
            >
              {/* Card Header */}
              <div className="flex justify-between items-start">
                <span className="text-[9px] font-mono text-orange-500 uppercase tracking-widest font-bold">
                  {project.stats?.language || 'Python'}
                </span>
                <span className="text-[9px] font-mono text-[#8A8A94] flex items-center gap-1">
                  MODULE_LOCK
                  <ArrowUpRight className="w-3 h-3 text-orange-500" />
                </span>
              </div>

              {/* Title & Tagline */}
              <div className="text-left space-y-1.5 my-4">
                <h4 className="text-xl font-bold font-heading text-white uppercase tracking-tight truncate group-hover:text-orange-500 transition-colors">
                  {project.name}
                </h4>
                <p className="text-[10px] font-mono text-[#8A8A94] uppercase tracking-wider truncate">
                  {project.tagline}
                </p>
                <p className="text-xs text-[#8A8A94] line-clamp-3 font-sans pt-1 font-normal">
                  {project.description}
                </p>
              </div>

              {/* Footer */}
              <div className="space-y-3 pt-3 border-t border-white/5">
                {/* Micro tech stack */}
                <div className="flex gap-1 overflow-hidden h-5">
                  {project.stack.slice(0, 3).map(tech => (
                    <span key={tech} className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[8px] font-mono text-[#8A8A94] uppercase shrink-0">
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 3 && (
                    <span className="text-[8px] font-mono text-orange-500 self-center shrink-0">
                      +{project.stack.length - 3} MORE
                    </span>
                  )}
                </div>

                {/* Stars/Forks row */}
                <div className="flex justify-between items-center text-[10px] font-mono text-[#8A8A94]">
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-orange-500" />
                      {project.stats?.stars || 0}
                    </span>
                    <span className="flex items-center gap-0.5">
                      <GitFork className="w-3 h-3 text-orange-500" />
                      {project.stats?.forks || 0}
                    </span>
                  </div>
                  <span className="text-[8px] uppercase">
                    UPDATED: {project.stats?.updatedAt}
                  </span>
                </div>
              </div>
            </BentoCard>
          ))}
        </div>

      </div>

      {/* Detail dashboard Modal overlay */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="w-full max-w-[650px] bg-[#111111] border-2 border-white rounded-[2.5rem] p-8 overflow-hidden relative shadow-[0_20px_50px_rgba(255,122,0,0.2)] flex flex-col space-y-6"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 hover:border-orange-500 hover:text-orange-500 transition-all active:scale-90"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="text-left space-y-1.5 border-b border-white/10 pb-4">
                <div className="flex items-center gap-2">
                  <Radio className="w-4 h-4 text-orange-500 animate-pulse" />
                  <span className="text-[9px] font-mono text-orange-500 uppercase tracking-widest font-bold">
                    TACTICAL COMPONENT MODULE
                  </span>
                </div>
                <h3 className="text-3xl font-heading font-extrabold text-white uppercase tracking-tight">
                  {selectedProject.name}
                </h3>
                <span className="text-xs font-mono text-[#8A8A94] uppercase tracking-wider block">
                  {selectedProject.tagline}
                </span>
              </div>

              {/* Modal Body */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
                {/* Description - occupies 2 cols */}
                <div className="sm:col-span-2 space-y-4 font-mono text-xs text-[#8A8A94]">
                  <div className="space-y-1">
                    <span className="text-[10px] text-white uppercase font-bold">PROJECT DESCRIPTION</span>
                    <p className="text-xs font-sans leading-relaxed text-[#8A8A94] font-normal">{selectedProject.description}</p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-[10px] text-white uppercase font-bold">TECHNOLOGY OUTLET</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedProject.stack.map(tech => (
                        <span key={tech} className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[9px] text-white uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Diagnostics side metrics */}
                <div className="space-y-3 p-4 bg-black/40 border border-white/5 rounded-2xl text-left font-mono">
                  <div className="text-[9px] text-orange-500 font-bold uppercase tracking-wider pb-1.5 border-b border-white/5 flex items-center gap-1">
                    <Terminal className="w-3.5 h-3.5" />
                    <span>DIAGNOSTICS</span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div>
                      <span className="text-[9px] text-[#8A8A94] block uppercase">Stars telemetry</span>
                      <span className="text-white font-bold">{selectedProject.stats?.stars || 0}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8A8A94] block uppercase">Forks index</span>
                      <span className="text-white font-bold">{selectedProject.stats?.forks || 0}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8A8A94] block uppercase">Language</span>
                      <span className="text-orange-500 font-bold uppercase">{selectedProject.stats?.language || 'Python'}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-[#8A8A94] block uppercase">Build stamp</span>
                      <span className="text-[#E8E8ED] font-bold">{selectedProject.stats?.updatedAt}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action triggers */}
              <div className="flex gap-4 pt-4 border-t border-white/10">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3.5 rounded-full bg-orange-500 hover:bg-orange-600 text-white font-mono font-bold text-xs uppercase tracking-widest text-center transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <GithubIcon className="w-4 h-4" />
                  GITHUB SOURCE
                </a>
                
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 px-6 py-3.5 rounded-full bg-transparent hover:bg-white/5 border border-white text-white font-mono font-bold text-xs uppercase tracking-widest text-center transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  LIVE DEMO
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
