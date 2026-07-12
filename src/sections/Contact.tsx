'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BentoCard from '@/components/BentoCard';
import { sound } from '@/utils/sound';
import { Mail, Phone, Send, Radio, ShieldCheck, Terminal } from 'lucide-react';

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GitHubIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    sound.playClick();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, honeypot }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(true);
        sound.playSuccess();
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setErrorMsg(data.message || 'Transmission failed.');
      }
    } catch (err) {
      console.error(err);
      setErrorMsg('Transceiver connection offline. Retry later.');
    } finally {
      setLoading(false);
    }
  };

  const socialLinks = [
    {
      name: "EMAIL CHANNELS",
      value: "yash.garad27@gmail.com",
      url: "mailto:yash.garad27@gmail.com",
      icon: <Mail className="w-5 h-5 text-orange-500" />,
    },
    {
      name: "VOICE CHANNELS",
      value: "+91-9370471759",
      url: "tel:+91-9370471759",
      icon: <Phone className="w-5 h-5 text-orange-500" />,
    },
    {
      name: "LINKEDIN REGISTRY",
      value: "yash-garad",
      url: "https://www.linkedin.com/in/yash-garad-23a315255/",
      icon: <LinkedInIcon />,
    },
    {
      name: "GITHUB REPOSITORIES",
      value: "Garad9901",
      url: "https://github.com/Garad9901",
      icon: <GitHubIcon />,
    }
  ];

  return (
    <section id="contact" className="py-24 px-4 md:px-12 bg-[#050505] text-[#E8E8ED] relative select-none starfield">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,#050505_95%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        
        {/* Section Header */}
        <div className="space-y-2 border-l-4 border-orange-500 pl-4">
          <div className="flex items-center space-x-2 text-orange-500 font-mono text-xs tracking-[0.25em] uppercase">
            <span>[ SYSTEM MODULE 07 ]</span>
            <div className="h-[1px] w-8 bg-orange-500/50" />
            <span>TRANSCEIVER TERMINAL</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-heading font-extrabold tracking-tighter uppercase text-white">
            ESTABLISH COMMUNICATION
          </h2>
          <p className="text-xs text-[#8A8A94] font-mono">
            &gt; Open transmission channels to send packet matrices directly to the bridge.
          </p>
        </div>

        {/* Command Panel Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Info register (4 cols) */}
          <BentoCard glowColor="white" className="lg:col-span-4 flex flex-col justify-between p-8 min-h-[420px]">
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest font-bold">
                  <Terminal className="w-4 h-4 text-orange-500" />
                  <span>ROUTING MAPS</span>
                </div>
                <span className="text-[9px] font-mono text-orange-500 bg-orange-950/20 px-2 py-0.5 rounded-full border border-orange-500/20">
                  SECURE_LINE
                </span>
              </div>

              {/* Channels list */}
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => sound.playClick()}
                    className="flex items-center justify-between p-3.5 rounded-2xl bg-black/40 border border-white/10 hover:border-orange-500/40 hover:bg-[#111111] transition-all duration-300 group"
                  >
                    <div className="flex items-center space-x-3 text-left">
                      {link.icon}
                      <span className="text-[10px] font-mono font-bold text-white group-hover:text-orange-500 transition-colors">
                        {link.name}
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-[#8A8A94] group-hover:text-white transition-colors truncate max-w-[130px]">
                      {link.value}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-[#8A8A94]">
              <span>GEOLOCATION: 21.1458° N</span>
              <span>INDIA</span>
            </div>
          </BentoCard>

          {/* Right panel: Transceiver message inputs (8 cols) */}
          <BentoCard glowColor="orange" className="lg:col-span-8 p-8 min-h-[420px] flex flex-col justify-between">
            <div className="w-full">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-left mb-6">
                <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-widest font-bold">
                  <Radio className="w-4 h-4 text-orange-500 animate-pulse" />
                  <span>TRANSMIT PACKET ENVELOPE</span>
                </div>
                {success && (
                  <span className="text-[9px] font-mono text-green-400 bg-green-950/20 px-2 py-0.5 rounded-full border border-green-500/10">
                    TRANSMISSION COMPLETE
                  </span>
                )}
              </div>

              <AnimatePresence mode="wait">
                {success ? (
                  // Success Animation
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="p-8 text-center space-y-4 font-mono text-green-400 min-h-[250px] flex flex-col items-center justify-center"
                  >
                    <ShieldCheck className="w-16 h-16 text-green-400 animate-bounce" />
                    <h4 className="text-lg font-bold tracking-widest uppercase">TRANSMISSION REGISTERED</h4>
                    <p className="text-xs text-[#8A8A94] max-w-sm mx-auto">
                      Message packet has bypassed firewalls and is synced with the Commander Bridge. A reply is pending.
                    </p>
                    <button
                      onClick={() => setSuccess(false)}
                      className="px-6 py-2.5 rounded-full border border-green-500 text-green-400 font-bold hover:bg-green-500 hover:text-black transition-all text-xs tracking-wider"
                    >
                      OPEN NEW LINK CHANNEL
                    </button>
                  </motion.div>
                ) : (
                  // Transceiver Input form
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className="space-y-4 text-left"
                  >
                    {/* Honeypot spam trap */}
                    <input
                      type="text"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Name */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase text-[#8A8A94] tracking-widest block font-bold">
                          TRANSMITTER IDENTIFIER (NAME)
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            sound.playTypeChirp();
                          }}
                          placeholder="ENTER NAME..."
                          className="w-full bg-black/40 border-2 border-white rounded-xl px-4 py-3 text-xs text-white font-mono placeholder-white/20 outline-none focus:border-orange-500 focus:shadow-[0_0_12px_rgba(255,122,0,0.2)] transition-all uppercase"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-mono uppercase text-[#8A8A94] tracking-widest block font-bold">
                          RETURN SOCKET ADDRESS (EMAIL)
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            sound.playTypeChirp();
                          }}
                          placeholder="ENTER EMAIL..."
                          className="w-full bg-black/40 border-2 border-white rounded-xl px-4 py-3 text-xs text-white font-mono placeholder-white/20 outline-none focus:border-orange-500 focus:shadow-[0_0_12px_rgba(255,122,0,0.2)] transition-all"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-mono uppercase text-[#8A8A94] tracking-widest block font-bold">
                        MESSAGE PAYLOAD PACKET
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          sound.playTypeChirp();
                        }}
                        placeholder="ENTER MESSAGE PROTOCOLS..."
                        className="w-full bg-black/40 border-2 border-white rounded-xl px-4 py-3 text-xs text-white font-mono placeholder-white/20 outline-none focus:border-orange-500 focus:shadow-[0_0_12px_rgba(255,122,0,0.2)] transition-all resize-none uppercase"
                      />
                    </div>

                    {/* Actions and status logs */}
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-4">
                      <div className="text-[10px] font-mono text-red-500">
                        {errorMsg && <span>&gt; ERROR: {errorMsg}</span>}
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-mono font-bold text-xs uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/10"
                      >
                        {loading ? (
                          <>
                            <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>TRANSMITTING PACKET...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-3.5 h-3.5" />
                            <span>TRANSMIT_MESSAGE</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </BentoCard>

        </div>
      </div>
    </section>
  );
}
