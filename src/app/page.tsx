'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Loader from '@/components/Loader';
import CustomCursor from '@/components/CustomCursor';
import CommandPalette from '@/components/CommandPalette';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Projects from '@/sections/Projects';
import Skills from '@/sections/Skills';
import Experience from '@/sections/Experience';
import Certifications from '@/sections/Certifications';
import GitHubStats from '@/sections/GitHubStats';
import ResumeSection from '@/sections/ResumeSection';
import Contact from '@/sections/Contact';
import Footer from '@/sections/Footer';
import { Terminal } from 'lucide-react';
import { sound } from '@/utils/sound';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'skills', 'experience', 'credentials', 'github', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 250;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    sound.playClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  if (!mounted) {
    return <div className="min-h-screen bg-[#050505]" />;
  }

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'resume', label: 'Resume' },
    { id: 'github', label: 'Github' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      {/* Spaceship boot loading sequence */}
      <Loader onComplete={() => setLoading(false)} />

      {/* Main command layout */}
      <AnimatePresence>
        {!loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-[#050505] text-[#E8E8ED] min-h-screen flex flex-col font-sans select-none"
          >
            {/* Custom high-tech mouse cursor trail */}
            <CustomCursor />

            {/* Keyboard shortcut command palette overlay (Ctrl+K) */}
            <CommandPalette />

            {/* Floating Glassmorphic Capsule Header */}
            <header className="fixed top-6 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-[850px] bg-[#111111]/70 backdrop-blur-xl border-2 border-white px-4 md:px-8 py-3 rounded-full flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.8)] transition-all">
              
              {/* Telemetry Logo */}
              <div
                onClick={() => scrollToSection('hero')}
                className="flex items-center space-x-2 cursor-pointer text-white hover:text-orange-500 transition-colors shrink-0"
              >
                <img src="/yg_logo_dark.png" alt="YG Logo" className="w-5 h-5 object-contain" />
                <span className="text-[10px] font-mono font-bold tracking-[0.15em] uppercase hidden sm:inline">
                  YASH_GARAD.SYS
                </span>
              </div>

              {/* Capsule Navigation Links */}
              <nav className="flex items-center space-x-1 md:space-x-3 overflow-x-auto scrollbar-none">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      onMouseEnter={() => sound.playHover()}
                      className={`
                        text-[9px] md:text-[10px] font-mono tracking-wider uppercase transition-all relative py-1.5 px-2.5 md:px-3 rounded-full outline-none
                        ${
                          isActive
                            ? 'bg-orange-500 text-white font-bold'
                            : 'text-[#8A8A94] hover:text-white'
                        }
                      `}
                    >
                      {item.label}
                      {isActive && (
                        <motion.span
                          layoutId="capsuleGlow"
                          className="absolute inset-0 rounded-full border border-orange-300 pointer-events-none shadow-[0_0_8px_rgba(255,122,0,0.4)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </button>
                  );
                })}

                {/* External LinkedIn Link */}
                <a
                  href="https://www.linkedin.com/in/yash-garad-23a315255/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  onMouseEnter={() => sound.playHover()}
                  className="hidden md:inline-block text-[9px] md:text-[10px] font-mono tracking-wider uppercase text-[#8A8A94] hover:text-white py-1.5 px-2.5 shrink-0"
                >
                  LinkedIn
                </a>
              </nav>

            </header>

            {/* Structured Page Sections */}
            <main className="flex-1 w-full">
              <Hero />
              <About />
              <Projects />
              <Skills />
              <Experience />
              <Certifications />
              <GitHubStats />
              <ResumeSection />
              <Contact />
            </main>

            {/* Spaceship Panel Footer */}
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
