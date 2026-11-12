'use client';

import { useEffect, useState } from 'react';
import { papers, projects, statusLabel, type PaperStatus } from '@/data/site';

type Sat = {
  id: string;
  ring: 0 | 1 | 2;
  kind: string;
  title: string;
  detail: string;
  href?: string;
  linkLabel?: string;
  color: string;
  shape: 'dot' | 'diamond' | 'ring';
};

const statusColor: Record<PaperStatus, string> = {
  'in-preparation': 'var(--st-prep)',
  submitted: 'var(--st-sub)',
  'under-revision': 'var(--st-rev)',
  presented: 'var(--st-pres)',
  published: 'var(--st-pres)',
};

const RADII = [128, 192, 256] as const;
const PERIODS = ['260s', '340s', '420s'];
const RING_NAMES = ['Papers', 'Research code', 'Systems'];

const sats: Sat[] = [
  ...papers.map((p, i) => ({
    id: `p${i}`,
    ring: 0 as const,
    kind: `Paper, ${statusLabel[p.status].toLowerCase()}`,
    title: p.title,
    detail: p.venue ?? p.area,
    href: p.code,
    linkLabel: p.code ? 'Open the code' : undefined,
    color: statusColor[p.status],
    shape: 'dot' as const,
  })),
  ...projects
    .filter((p) => p.track === 'research')
    .map((p, i) => ({
      id: `r${i}`,
      ring: 1 as const,
      kind: 'Research code',
      title: p.name,
      detail: p.summary,
      href: p.repo,
      linkLabel: 'Open the repository',
      color: 'var(--kraft-ink)',
      shape: 'diamond' as const,
    })),
  ...projects
    .filter((p) => p.track === 'system')
    .map((p, i) => ({
      id: `s${i}`,
      ring: 2 as const,
      kind: 'System',
      title: p.name,
      detail: p.summary,
      href: p.repo,
      linkLabel: p.repo ? 'Open the repository' : undefined,
      color: 'var(--rust)',
      shape: 'ring' as const,
    })),
];

function place(s: Sat, idx: number, count: number) {
  const offset = [-90, -60, -75][s.ring];
  const a = ((offset + (360 / count) * idx) * Math.PI) / 180;
  const r = RADII[s.ring];
  return { x: 300 + r * Math.cos(a), y: 300 + r * Math.sin(a) };
}

export default function OrbitMap() {
  const [active, setActive] = useState<Sat | null>(null);
  const [pinned, setPinned] = useState(false);
  // Hand-drawn "boiling" lines: the pencil wobble redraws in hard steps, only when motion is welcome.
  const [boil, setBoil] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setBoil(!mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const byRing = [0, 1, 2].map((r) => sats.filter((s) => s.ring === r));

  const show = (s: Sat) => setActive(s);
  const leave = () => { if (!pinned) setActive(null); };
  const toggle = (s: Sat) => {
    if (pinned && active?.id === s.id) { setPinned(false); setActive(null); }
    else { setPinned(true); setActive(s); }
  };

  return (
    <div className={`orbit-wrap${active ? ' engaged' : ''}`}>
      <svg className="orbit-svg" viewBox="0 0 600 600" role="group" aria-label="Map of papers, research code and systems">
        <defs>
          <filter id="pencil" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="3" result="noise">
              {boil && <animate attributeName="seed" values="3;8;14;21" dur="0.9s" calcMode="discrete" repeatCount="indefinite" />}
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" />
          </filter>
        </defs>

        <g filter="url(#pencil)">
          {RADII.map((r, i) => (
            <circle key={r} cx="300" cy="300" r={r} className={`orbit-ring draw-in${i === 1 ? ' dashed' : ''}`} style={{ animationDelay: `${i * 0.18}s` }} />
          ))}
          <circle cx="300" cy="300" r="52" className="core-pulse" />
          <circle cx="300" cy="300" r="40" className="orbit-core" />
        </g>
        {RADII.map((r, i) => (
          <text key={`l${r}`} x="300" y={300 - r - 10} textAnchor="middle" className="orbit-label fade-in" style={{ animationDelay: `${0.6 + i * 0.1}s` }}>
            {RING_NAMES[i]}
          </text>
        ))}

        <text x="300" y="309" textAnchor="middle" className="orbit-core-text">YG</text>

        {byRing.map((ring, ri) => (
          <g key={ri} className={`spin${ri === 1 ? ' reverse' : ''}`} style={{ ['--period' as string]: PERIODS[ri] }}>
            {ring.map((s, i) => {
              const { x, y } = place(s, i, ring.length);
              const pressed = pinned && active?.id === s.id;
              return (
                <g
                  key={s.id}
                  className="sat fade-in"
                  style={{ animationDelay: `${0.9 + (ri * 6 + i) * 0.04}s` }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={pressed}
                  aria-label={`${s.kind}: ${s.title}`}
                  onMouseEnter={() => show(s)}
                  onMouseLeave={leave}
                  onFocus={() => show(s)}
                  onBlur={leave}
                  onClick={() => toggle(s)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(s); } }}
                >
                  <circle className="hit" cx={x} cy={y} r="16" />
                  <circle className="halo" cx={x} cy={y} r="12" />
                  {s.shape === 'dot' && <circle cx={x} cy={y} r="7" style={{ fill: s.color, stroke: 'var(--ink)', strokeWidth: 1.5 }} />}
                  {s.shape === 'diamond' && <rect x={x - 6} y={y - 6} width="12" height="12" style={{ fill: s.color, stroke: 'var(--ink)', strokeWidth: 1.5 }} transform={`rotate(45 ${x} ${y})`} />}
                  {s.shape === 'ring' && <circle cx={x} cy={y} r="7" style={{ fill: 'var(--paper)', stroke: s.color, strokeWidth: 3 }} />}
                </g>
              );
            })}
          </g>
        ))}
      </svg>

      <div className="readout" aria-live="polite">
        {active ? (
          <>
            <p className="kind">{active.kind}</p>
            <h3>{active.title}</h3>
            <p>{active.detail}</p>
            {active.href && (
              <p style={{ marginTop: '0.5rem' }}>
                <a href={active.href} target="_blank" rel="noreferrer">{active.linkLabel}</a>
              </p>
            )}
          </>
        ) : (
          <>
            <p className="kind">Mission map</p>
            <h3>{papers.length} papers, {projects.filter((p) => p.track === 'research').length} research codebases, {projects.filter((p) => p.track === 'system').length} systems</h3>
            <p>Point at any satellite to read it. Click to keep it open.</p>
          </>
        )}
      </div>
      <div className="legend" aria-hidden="true">
        <span><i style={{ background: statusColor['in-preparation'] }} />Paper in preparation</span>
        <span><i style={{ background: statusColor.submitted }} />Submitted</span>
        <span><i style={{ background: statusColor['under-revision'] }} />Under revision</span>
        <span><i style={{ background: statusColor.presented }} />Presented</span>
        <span><i style={{ background: 'var(--kraft-ink)', borderRadius: 0, transform: 'rotate(45deg) scale(.85)' }} />Research code</span>
        <span><i style={{ background: 'transparent', border: '3px solid var(--rust)' }} />System</span>
      </div>
    </div>
  );
}
