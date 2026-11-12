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
  const inputRef = useRef<HTMLInputElement>(null);

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
            <img src="/yg_logo_dark.png" alt="" />
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
          <a className="btn btn-primary btn-small" href={person.resume} target="_blank" rel="noreferrer">Resume</a>
        </div>
      </header>

      {copied && (
        <div role="status" style={{ position: 'fixed', bottom: 24, left: '50%', transform: 'translateX(-50%)', zIndex: 60, background: 'var(--hull-2)', border: '1px solid var(--rivet-2)', padding: '0.6rem 1rem', borderRadius: 3, fontSize: 14 }}>
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
