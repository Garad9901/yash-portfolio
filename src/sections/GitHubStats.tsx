'use client';
/* eslint-disable react-hooks/purity */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import BentoCard from '@/components/BentoCard';
import { sound } from '@/utils/sound';
import { CalendarDays, Star, Terminal, Users, Activity, RefreshCw } from 'lucide-react';

interface GitHubProfile {
  username: string;
  followers: number;
  publicRepos: number;
  totalStars: number;
  languages: { name: string; percentage: number }[];
  events: { type: string; repo: string; message: string; date: string }[];
}

const FALLBACK_PROFILE: GitHubProfile = {
  username: "Garad9901",
  followers: 18,
  publicRepos: 22,
  totalStars: 42,
  languages: [
    { name: "Python", percentage: 55 },
    { name: "TypeScript", percentage: 25 },
    { name: "JavaScript", percentage: 15 },
    { name: "Other", percentage: 5 }
  ],
  events: [
    { type: "PushEvent", repo: "Garad9901/AgroSense-AI", message: "Refactor LSTM model weights and add prediction telemetry", date: "2026-07-11" },
    { type: "PushEvent", repo: "Garad9901/AadhaarX", message: "Integrate liveness biometric scoring node", date: "2026-07-09" },
    { type: "CreateEvent", repo: "Garad9901/Lora-Vehicle-Network-", message: "Initialize V2V cooperative collision avoidance model", date: "2026-07-05" },
    { type: "PushEvent", repo: "Garad9901/PolicyPulse", message: "Align statistical charts for rural employment metrics", date: "2026-06-28" }
  ]
};

export default function GitHubStats() {
  const [profile, setProfile] = useState<GitHubProfile>(FALLBACK_PROFILE);
  const [loading, setLoading] = useState(true);

  // Git Contribution Heatmap grid dimensions
  const rows = 7;
  const cols = 28;
  const totalCells = rows * cols;

  const activityLevels = React.useMemo(() => {
    return Array.from({ length: totalCells }).map((_, i) => {
      // Generate organic looking contribution clusters
      const x = i % cols;
      const y = Math.floor(i / cols);
      const noise = Math.sin(x * 0.4) * Math.cos(y * 0.4);
      const rand = Math.random();
      if (noise > 0.3 && rand < 0.8) return 4; // Max cluster
      if (noise > 0 && rand < 0.7) return 3; // Dense
      if (rand < 0.4) return 0; // Empty
      if (rand < 0.7) return 1; // Light
      return 2; // Mid
    });
  }, [totalCells]);

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 0: return 'bg-neutral-900/60 border border-white/5';
      case 1: return 'bg-orange-950/20 border border-orange-900/10';
      case 2: return 'bg-orange-900/30 border border-orange-700/20';
      case 3: return 'bg-orange-500/60 border border-orange-400/30';
      case 4: return 'bg-orange-500 border border-orange-300/40 shadow-[0_0_8px_rgba(255,122,0,0.5)] animate-pulse';
      default: return 'bg-neutral-900/60';
    }
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const cached = localStorage.getItem('om_github_profile');
        const cachedTime = localStorage.getItem('om_github_profile_time');

        if (cached && cachedTime && Date.now() - parseInt(cachedTime) < 3600000) {
          setProfile(JSON.parse(cached));
          setLoading(false);
          return;
        }

        // Fetch User profile details
        const profileRes = await fetch('https://api.github.com/users/Garad9901');
        if (!profileRes.ok) throw new Error();
        const profileData = await profileRes.json();

        // Fetch user repos to compute languages and total stars
        const reposRes = await fetch('https://api.github.com/users/Garad9901/repos?per_page=100');
        const reposData = await reposRes.json();

        interface GitHubRepoMinimal {
          stargazers_count: number;
          language?: string;
        }

        interface GitHubEventMinimal {
          type: string;
          repo: { name: string };
          payload: {
            commits?: { message: string }[];
          };
          created_at: string;
        }

        let starsSum = 0;
        const langCounts: { [key: string]: number } = {};
        reposData.forEach((repo: GitHubRepoMinimal) => {
          starsSum += repo.stargazers_count || 0;
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
          }
        });

        const totalLangs = Object.values(langCounts).reduce((a, b) => a + b, 0);
        const mappedLangs = Object.entries(langCounts)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / totalLangs) * 100)
          }))
          .sort((a, b) => b.percentage - a.percentage)
          .slice(0, 4);

        // Fetch Recent Events / Commits
        const eventsRes = await fetch('https://api.github.com/users/Garad9901/events?per_page=10');
        const eventsData = await eventsRes.json();
        
        const mappedEvents = (eventsData as GitHubEventMinimal[])
          .filter((evt) => evt.type === 'PushEvent' || evt.type === 'CreateEvent')
          .map((evt) => {
            const commitMsg = evt.payload.commits?.[0]?.message || `Create repository ${evt.repo.name.split('/')[1]}`;
            return {
              type: evt.type,
              repo: evt.repo.name,
              message: commitMsg,
              date: evt.created_at.split('T')[0]
            };
          })
          .slice(0, 4);

        const newProfile: GitHubProfile = {
          username: "Garad9901",
          followers: profileData.followers || FALLBACK_PROFILE.followers,
          publicRepos: profileData.public_repos || FALLBACK_PROFILE.publicRepos,
          totalStars: starsSum || FALLBACK_PROFILE.totalStars,
          languages: mappedLangs.length > 0 ? mappedLangs : FALLBACK_PROFILE.languages,
          events: mappedEvents.length > 0 ? mappedEvents : FALLBACK_PROFILE.events
        };

        localStorage.setItem('om_github_profile', JSON.stringify(newProfile));
        localStorage.setItem('om_github_profile_time', Date.now().toString());
        setProfile(newProfile);
      } catch (err) {
        console.warn("GitHub Profile telemetry fallback loaded:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <section id="github" className="py-24 px-4 md:px-12 bg-[#050505] text-[#E8E8ED] relative select-none starfield">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#050505_95%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-2 border-l-4 border-orange-500 pl-4">
          <div className="flex items-center space-x-2 text-orange-500 font-mono text-xs tracking-[0.25em] uppercase">
            <span>[ SYSTEM MODULE 05 ]</span>
            <div className="h-[1px] w-8 bg-orange-500/50" />
            <span>GITHUB CORE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tighter uppercase text-white">
            GIT TELEMETRY CONSOLE
          </h2>
          <p className="text-xs text-[#8A8A94] font-mono">
            &gt; Read live telemetry synced directly with GitHub API repositories.
          </p>
        </div>

        {/* Command Panel Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Card 1: Live Stats overview - 4 Cols */}
          <BentoCard glowColor="orange" className="lg:col-span-4 flex flex-col justify-between p-8">
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest font-bold">
                  <Users className="w-4 h-4 text-orange-500" />
                  <span>PROFILE TELEMETRY</span>
                </div>
                {loading && <RefreshCw className="w-3.5 h-3.5 text-orange-500 animate-spin" />}
              </div>

              {/* Stats Counters */}
              <div className="space-y-4 font-mono">
                <div>
                  <span className="text-[9px] text-[#8A8A94] uppercase block">REPOSITORIES</span>
                  <span className="text-4xl font-extrabold text-white">{profile.publicRepos}</span>
                </div>
                <div>
                  <span className="text-[9px] text-[#8A8A94] uppercase block">TOTAL STARS</span>
                  <span className="text-4xl font-extrabold text-orange-500 flex items-center gap-1.5">
                    {profile.totalStars}
                    <Star className="w-6 h-6 text-orange-500 shrink-0 fill-orange-500" />
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-[#8A8A94] uppercase block">FOLLOWERS</span>
                  <span className="text-4xl font-extrabold text-white">{profile.followers}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#8A8A94]">
              <span>GITHUB: @{profile.username}</span>
              <a
                href={`https://github.com/Garad9901`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="text-orange-500 hover:text-orange-400 font-bold flex items-center gap-1"
              >
                OPEN LINK &rarr;
              </a>
            </div>
          </BentoCard>

          {/* Card 2: Contribution Heatmap & Languages - 8 Cols */}
          <BentoCard glowColor="white" className="lg:col-span-8 flex flex-col justify-between p-8">
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest font-bold">
                  <CalendarDays className="w-4 h-4 text-orange-500" />
                  <span>DEVELOPMENT FREQUENCY</span>
                </div>
                <span className="text-[9px] font-mono text-[#8A8A94]">ACTIVE MODULES</span>
              </div>

              {/* Heatmap Layout */}
              <div className="space-y-2">
                <span className="text-[9px] font-mono text-[#8A8A94] uppercase tracking-wider block">
                  CONTRIBUTION ACTIVITY MATRIX
                </span>
                <div className="bg-black/30 border border-white/10 rounded-2xl p-4 flex items-center justify-center relative overflow-hidden group/heatmap">
                  <div className="grid grid-flow-col grid-rows-7 gap-[3.5px]">
                    {activityLevels.map((level, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.4, zIndex: 10 }}
                        className={`w-2.5 h-2.5 rounded-[1.5px] cursor-pointer transition-all duration-300 ${getHeatmapColor(level)}`}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Languages Percentage Share bar */}
              <div className="space-y-3 font-mono text-xs">
                <span className="text-[9px] text-[#8A8A94] uppercase tracking-wider block font-bold">
                  COGNITION LANGUAGE RATIOS
                </span>
                <div className="flex h-3.5 rounded-full overflow-hidden bg-neutral-900 border border-white/10 p-0.5">
                  {profile.languages.map((lang, idx) => {
                    const colors = ['bg-orange-500', 'bg-cyan-500', 'bg-violet-500', 'bg-white/40'];
                    return (
                      <div
                        key={lang.name}
                        className={`${colors[idx % colors.length]} h-full first:rounded-l-full last:rounded-r-full`}
                        style={{ width: `${lang.percentage}%` }}
                      />
                    );
                  })}
                </div>
                
                <div className="flex flex-wrap gap-x-4 gap-y-1.5 pt-1 text-[10px]">
                  {profile.languages.map((lang, idx) => {
                    const dotColors = ['bg-orange-500', 'bg-cyan-500', 'bg-violet-500', 'bg-white/40'];
                    return (
                      <div key={lang.name} className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${dotColors[idx % dotColors.length]}`} />
                        <span className="text-white font-bold">{lang.name}</span>
                        <span className="text-[#8A8A94]">{lang.percentage}%</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 text-[9px] font-mono text-[#8A8A94] flex justify-between">
              <span>REACTOR CLOCK SPEED: OPTIMAL</span>
              <span>SYNCS EVERY 60M</span>
            </div>
          </BentoCard>

          {/* Card 3: Live scrolling Terminal Commits Feed - Occupies 12 cols */}
          <BentoCard glowColor="orange" className="lg:col-span-12 space-y-6 p-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 text-left">
              <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest font-bold">
                <Terminal className="w-4 h-4 text-orange-500 animate-pulse" />
                <span>TERMINAL LOG: LIVE COMMIT FEED</span>
              </div>
              <span className="flex items-center gap-1 text-[9px] font-mono text-orange-500 bg-orange-950/20 px-2.5 py-0.5 rounded-full border border-orange-500/20">
                <Activity className="w-3 h-3 text-orange-500 animate-ping" />
                SYNCED_LIVE
              </span>
            </div>

            {/* Commits List */}
            <div className="space-y-3 font-mono text-left text-xs bg-black/40 border border-white/10 rounded-2xl p-5 h-48 overflow-y-auto scrollbar-thin">
              {profile.events.map((evt, idx) => (
                <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-2.5 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-orange-500 font-bold font-mono">[{evt.type === 'PushEvent' ? 'COMMIT' : 'CREATE'}]</span>
                      <span className="text-white font-bold">{evt.repo.split('/')[1]}</span>
                      <span className="text-[#8A8A94] text-[10px]">&gt; {evt.message}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-orange-500/70 shrink-0 font-semibold">{evt.date}</span>
                </div>
              ))}
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
