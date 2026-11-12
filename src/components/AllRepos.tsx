'use client';

import { useState } from 'react';
import type { PublicRepo } from '@/lib/github';

function ago(iso: string) {
  const days = Math.floor((Date.now() - new Date(iso).getTime()) / 86_400_000);
  if (days <= 0) return 'today';
  if (days === 1) return 'yesterday';
  if (days < 30) return `${days}d ago`;
  const m = Math.floor(days / 30);
  return m < 12 ? `${m}mo ago` : `${Math.floor(m / 12)}y ago`;
}

export default function AllRepos({ repos, profile }: { repos: PublicRepo[] | null; profile: string }) {
  const [q, setQ] = useState('');
  if (!repos) {
    return (
      <p className="tele-foot">
        The live repository list is unavailable right now. Browse everything at <a href={profile} style={{ color: 'var(--ignition)' }}>GitHub</a>.
      </p>
    );
  }
  const term = q.trim().toLowerCase();
  const list = repos.filter((r) =>
    !term || [r.name, r.description ?? '', r.language ?? '', ...r.topics].join(' ').toLowerCase().includes(term),
  );

  return (
    <div className="repos">
      <div className="repos-head">
        <h3><span className="live">Every public repository</span> <span className="count">{repos.length}, live from GitHub</span></h3>
        <label className="repo-search">
          <span className="sr-only">Search repositories</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, language or topic" />
        </label>
      </div>
      {list.length ? (
        <ul className="repo-list">
          {list.map((r) => (
            <li key={r.name}>
              <div className="repo-main">
                <a href={r.url} target="_blank" rel="noreferrer" className="repo-name">{r.name}</a>
                {r.description && <p>{r.description}</p>}
                {r.topics.length > 0 && <span className="topics">{r.topics.slice(0, 6).join(', ')}</span>}
              </div>
              <div className="repo-side">
                {r.language && <span>{r.language}</span>}
                <time dateTime={r.pushedAt}>Updated {ago(r.pushedAt)}</time>
                <span className="repo-links">
                  <a href={r.url} target="_blank" rel="noreferrer">Code</a>
                  {r.homepage && <a href={r.homepage} target="_blank" rel="noreferrer">Live</a>}
                </span>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="tele-foot">No repository matches “{q}”. Try a language such as Python, or a topic such as rag.</p>
      )}
    </div>
  );
}
