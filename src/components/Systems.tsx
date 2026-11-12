'use client';

import { useState } from 'react';
import { projects } from '@/data/site';

const filters = [
  { id: 'all', label: 'Everything' },
  { id: 'research', label: 'Research code' },
  { id: 'system', label: 'Products & systems' },
] as const;

export default function Systems() {
  const [filter, setFilter] = useState<(typeof filters)[number]['id']>('all');
  const list = projects
    .filter((p) => filter === 'all' || p.track === filter)
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));

  return (
    <>
      <div className="segmented" role="group" aria-label="Filter projects">
        {filters.map((f) => (
          <button key={f.id} aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
            {f.label}
          </button>
        ))}
      </div>
      <div className="systems">
        {list.map((p) => (
          <article key={p.name} className={`system${p.featured ? ' featured' : ''}`}>
            <span className="track">{p.track === 'research' ? 'Research code' : 'System'}{p.featured ? ', featured' : ''}</span>
            <h3>{p.name}</h3>
            <p>{p.summary}</p>
            <span className="stack">{p.stack.join(', ')}</span>
            <span className="links">
              {p.repo ? <a href={p.repo} target="_blank" rel="noreferrer">Code</a> : <span style={{ color: 'var(--haze)', fontWeight: 400 }}>Source not public</span>}
              {p.demo && <a href={p.demo} target="_blank" rel="noreferrer">Live demo</a>}
            </span>
          </article>
        ))}
      </div>
    </>
  );
}
