'use client';

import React from 'react';

export default function AstronautCard() {
  return (
    <div className="relative w-full max-w-[500px] h-[520px] rounded-[2rem] border-2 border-white bg-[#111111] overflow-hidden p-3 select-none group shadow-[0_15px_50px_rgba(0,0,0,0.8)]">
      {/* Background Profile Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-85 group-hover:scale-105 transition-transform duration-700 ease-out" 
        style={{ backgroundImage: "url('/profile.jpg')" }} 
      />

      {/* Floating Orange Grid Scan Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_95%,rgba(255,122,0,0.15)_95%)] bg-[size:100%_20px] pointer-events-none animate-pulse" />

      {/* Glass overlay on bottom/corners */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 pointer-events-none" />

      {/* Top Left Branding Badge */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-ping" />
        <span className="text-[9px] font-mono text-white tracking-widest font-bold">SPACE COMMANDER OS</span>
      </div>

      {/* Top Right "ACTIVE" Telemetry Capsule */}
      <div className="absolute top-6 right-6 z-10 bg-white text-black font-mono font-bold text-[9px] tracking-widest rounded-full px-5 py-2 hover:bg-orange-500 hover:text-white transition-colors duration-300">
        SYS_ACTIVE
      </div>

      {/* Bottom Left Huge futuristic label */}
      <div className="absolute bottom-6 left-6 z-10 max-w-[200px]">
        <h4 className="text-white font-bold font-heading text-xl uppercase tracking-tighter leading-none">
          SYSTEMS <span className="text-orange-500 font-extrabold">INTEGRATION</span>
        </h4>
        <p className="text-[9px] font-mono text-[#8A8A94] uppercase mt-1 tracking-wider">
          AI AGENT OPERATING PLATFORM
        </p>
      </div>

      {/* Inset Reactor Diagnostics Monitor (Bottom Right Inset) */}
      <div className="absolute bottom-5 right-5 z-20 flex flex-col justify-between bg-black border-2 border-white rounded-2xl p-3.5 w-[170px] h-[110px] shadow-[0_8px_24px_rgba(0,0,0,0.9)] hover:border-orange-500 transition-colors duration-300">
        <div className="flex justify-between items-center text-[8px] font-mono text-orange-500 font-bold tracking-widest uppercase">
          <span>SYSTEM MONITOR</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
        </div>
        <div className="space-y-1 font-mono text-left">
          <div className="flex justify-between items-center text-[9px]">
            <span className="text-[#8A8A94]">REACTOR:</span>
            <span className="text-white font-bold">98.4%</span>
          </div>
          <div className="flex justify-between items-center text-[9px]">
            <span className="text-[#8A8A94]">TEMP:</span>
            <span className="text-white font-bold">42.8°C</span>
          </div>
          <div className="flex justify-between items-center text-[9px]">
            <span className="text-[#8A8A94]">UPTIME:</span>
            <span className="text-white font-bold">14.2H</span>
          </div>
        </div>
      </div>
    </div>
  );
}
