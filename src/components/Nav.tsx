'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { person } from '@/data/site';

const sections = [
  { id: 'research', label: 'Research' },
  { id: 'systems', label: 'Systems' },
  { id: 'path', label: 'Path' },
  { id: 'honors', label: 'Honors' },
  { id: 'telemetry', label: 'GitHub' },
  { id: 'contact', label: 'Contact' },
];

type Cmd = { label: string; hint: string; run: () => void };

export default function Nav() {
  const [current, setCurrent] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [index, setIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = document.documentElement.dataset.theme;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- read the theme the head script chose before first paint
    setTheme(t === 'dark' ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch { /* storage blocked: the choice lasts for this visit */ }
    setTheme(next);
  };

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setCurrent(e.target.id); }),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    sections.forEach((s) => { const el = document.getElementById(s.id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setQuery(''); setIndex(0); setOpen((o) => !o); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  const openPalette = () => { setQuery(''); setIndex(0); setOpen(true); };

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView(); setOpen(false); };

  const commands: Cmd[] = useMemo(() => [
    ...sections.map((s) => ({ label: `Go to ${s.label}`, hint: 'Section', run: () => go(s.id) })),
    { label: 'Copy email address', hint: person.email, run: () => { navigator.clipboard?.writeText(person.email); setCopied(true); setTimeout(() => setCopied(false), 1600); setOpen(false); } },
    { label: 'Open resume', hint: 'PDF', run: () => { window.open(person.resume, '_blank'); setOpen(false); } },
    { label: 'Open GitHub', hint: '@' + person.githubUser, run: () => { window.open(person.github, '_blank'); setOpen(false); } },
    { label: 'Open ORCID', hint: person.orcidId, run: () => { window.open(person.orcid, '_blank'); setOpen(false); } },
    { label: 'Open LinkedIn', hint: 'Profile', run: () => { window.open(person.linkedin, '_blank'); setOpen(false); } },
  ], []);

  const filtered = commands.filter((c) => c.label.toLowerCase().includes(query.toLowerCase()));

  return (
    <>
      <header className="nav">
        <div className="wrap nav-inner">
          <a href="#top" className="brand" aria-label="Back to top">
            <span className="brand-mark" aria-hidden="true">YG</span>
            <span>Yash Garad</span>
          </a>
          <nav className="nav-links" aria-label="Sections">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} aria-current={current === s.id ? 'true' : undefined}>{s.label}</a>
            ))}
          </nav>
          <button className="kbd-hint" onClick={openPalette} aria-label="Open command menu">
            Command menu <kbd>Ctrl K</kbd>
          </button>
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
                <path d="M12 7.2c2.7-.1 4.9 2.1 4.8 4.9-.1 2.6-2.3 4.7-4.9 4.7-2.7 0-4.8-2.2-4.7-4.9.1-2.5 2.2-4.6 4.8-4.7z" />
                <path d="M12 2.5v2.2M12 19.4v2.1M2.6 12.1h2.1M19.3 11.9h2.2M5.2 5.3l1.5 1.4M17.3 17.4l1.5 1.5M5.1 18.8l1.6-1.5M17.4 6.6l1.4-1.5" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M19.6 14.7c-1 .4-2.2.6-3.3.5-4.2-.3-7.4-3.9-7.1-8.1.1-1.1.4-2.1.9-3-3.5 1-6 4.3-5.9 8.1.2 4.4 3.9 7.9 8.4 7.7 3.2-.1 5.9-2.2 7-5.2z" />
                <path d="M16.8 4.2l.4 1.3 1.3.4-1.3.5-.4 1.3-.5-1.3-1.3-.5 1.3-.4z" />
              </svg>
            )}
          </button>
          <a className="btn btn-primary btn-small" href={person.resume} target="_blank" rel="noreferrer">Resume</a>
        </div>
      </header>

      {copied && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 60, background: 'var(--yellow)', color: '#111111', border: '3px solid var(--edge)', boxShadow: 'var(--shadow-sm)', padding: '0.5rem 1.1rem', borderRadius: 'var(--r)', fontSize: 16, fontWeight: 700 }}>
          Email address copied
        </div>
      )}

      {open && (
        <div className="palette-backdrop" onClick={() => setOpen(false)}>
          <div className="palette" role="dialog" aria-modal="true" aria-label="Command menu" onClick={(e) => e.stopPropagation()}>
            <input
              ref={inputRef}
              value={query}
              placeholder="Type a command or section"
              aria-label="Search commands"
              onChange={(e) => { setQuery(e.target.value); setIndex(0); }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowDown') { e.preventDefault(); setIndex((i) => Math.min(i + 1, filtered.length - 1)); }
                if (e.key === 'ArrowUp') { e.preventDefault(); setIndex((i) => Math.max(i - 1, 0)); }
                if (e.key === 'Enter') filtered[index]?.run();
              }}
            />
            {filtered.length ? (
              <ul>
                {filtered.map((c, i) => (
                  <li key={c.label}>
                    <button data-active={i === index} onMouseEnter={() => setIndex(i)} onClick={c.run}>
                      <span>{c.label}</span><span>{c.hint}</span>
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty">No command matches “{query}”.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
}
