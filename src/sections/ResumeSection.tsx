'use client';

import React from 'react';
import BentoCard from '@/components/BentoCard';
import { sound } from '@/utils/sound';
import { FileText, Download, ExternalLink, Printer, ShieldCheck } from 'lucide-react';

export default function ResumeSection() {
  const resumeUrl = '/Yash_Garad_Resume.pdf';

  const handleDownload = () => {
    sound.playSuccess();
    const link = document.createElement('a');
    link.href = resumeUrl;
    link.download = 'YASH_RAJESH_GARAD_RESUME.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOpen = () => {
    sound.playClick();
    window.open(resumeUrl, '_blank');
  };

  const handlePrint = () => {
    sound.playClick();
    const printWindow = window.open(resumeUrl, '_blank');
    if (printWindow) {
      // Allow browser to load PDF, then trigger print
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  return (
    <section id="resume" className="py-24 px-4 md:px-12 bg-[#050505] text-[#E8E8ED] relative select-none starfield">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#050505_95%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-2 border-l-4 border-orange-500 pl-4">
          <div className="flex items-center space-x-2 text-orange-500 font-mono text-xs tracking-[0.25em] uppercase">
            <span>[ SYSTEM MODULE 06 ]</span>
            <div className="h-[1px] w-8 bg-orange-500/50" />
            <span>RESUME STORAGE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tighter uppercase text-white">
            MISSION DIRECTIVE RESUME
          </h2>
          <p className="text-xs text-[#8A8A94] font-mono">
            &gt; Access and extract formal credentials from the spaceship secure vaults.
          </p>
        </div>

        {/* Layout Command console */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Embedded PDF Viewer Frame (8 cols) */}
          <BentoCard glowColor="orange" className="lg:col-span-8 p-6 flex flex-col justify-between h-[600px]">
            <div className="w-full h-full flex flex-col justify-between space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-left">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest font-bold">
                  <FileText className="w-4 h-4 text-orange-500" />
                  <span>EMBEDDED RESUME VAULT</span>
                </div>
                <span className="text-[9px] font-mono text-orange-500 bg-orange-950/20 px-2.5 py-0.5 rounded-full border border-orange-500/20 animate-pulse">
                  SECURE_VIEWPORT
                </span>
              </div>

              {/* PDF Viewer Embed */}
              <div className="flex-1 bg-black/40 border border-white/10 rounded-2xl overflow-hidden relative shadow-inner">
                <iframe
                  src={`${resumeUrl}#toolbar=0&navpanes=0`}
                  className="w-full h-full object-cover rounded-2xl filter contrast-100 brightness-95"
                  title="Yash Garad Resume PDF Viewer"
                />
              </div>
            </div>
          </BentoCard>

          {/* Right panel: Action controls and descriptions (4 cols) */}
          <BentoCard glowColor="white" className="lg:col-span-4 p-8 flex flex-col justify-between h-[600px]">
            <div className="space-y-6 text-left">
              <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest font-bold border-b border-white/10 pb-3">
                <ShieldCheck className="w-4.5 h-4.5 text-orange-500" />
                <span>COMMAND SHORTCUTS</span>
              </div>

              <div className="space-y-4 font-mono text-xs text-[#8A8A94]">
                <p className="leading-relaxed font-sans">
                  The document details academic criteria, internship deployment log objectives, and custom skill metrics.
                </p>
                <div className="p-3 bg-black/40 border border-white/5 rounded-xl">
                  <span className="text-[9px] text-orange-500 font-bold block">FILE IDENTIFICATION</span>
                  <span className="text-white text-xs font-semibold block mt-0.5">YASH_GARAD_RESUME.PDF</span>
                  <span className="text-[8px] text-[#8A8A94]">SIZE: 101.49 KB | FORMAT: PDF/A</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3 pt-4">
                <button
                  onClick={handleDownload}
                  className="w-full px-6 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-mono font-bold text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2.5 shadow-lg shadow-orange-500/10"
                >
                  <Download className="w-4 h-4" />
                  DOWNLOAD RESUME
                </button>

                <button
                  onClick={handleOpen}
                  className="w-full px-6 py-4 rounded-xl bg-transparent hover:bg-white/5 border border-white text-white font-mono font-bold text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2.5"
                >
                  <ExternalLink className="w-4 h-4 text-orange-500" />
                  OPEN VAULT IN TAB
                </button>

                <button
                  onClick={handlePrint}
                  className="w-full px-6 py-4 rounded-xl bg-transparent hover:bg-white/5 border border-white/10 text-[#8A8A94] hover:text-white font-mono font-bold text-xs uppercase tracking-widest transition-all active:scale-95 flex items-center justify-center gap-2.5"
                >
                  <Printer className="w-4 h-4 text-orange-500/60" />
                  PRINT ARCHIVE
                </button>
              </div>
            </div>

            {/* Verification Footer badge */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#8A8A94]">
              <span>DECRYPT STATUS: COMPLETED</span>
              <span className="text-green-400">OPTIMAL</span>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
