'use client';

import { useState } from 'react';
import { person } from '@/data/site';

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const copy = () => {
    navigator.clipboard?.writeText(person.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const mailto = `mailto:${person.email}?subject=${encodeURIComponent(`Hello from ${name || 'your portfolio'}`)}&body=${encodeURIComponent(message)}`;

  return (
    <div className="contact-grid">
      <div>
        <p className="contact-big">Let&apos;s build something that holds up.</p>
        <p style={{ color: 'var(--haze)', maxWidth: '46ch', margin: '0 0 2rem' }}>
          Open to research collaborations, internships and AI engineering roles. Email is the fastest way to reach me.
        </p>
        <ul className="channels">
          <li>
            <span className="k">Email</span>
            <a href={`mailto:${person.email}`}>{person.email}</a>
            <button className="copy" onClick={copy}>{copied ? 'Copied' : 'Copy'}</button>
          </li>
          <li><span className="k">LinkedIn</span><a href={person.linkedin} target="_blank" rel="noreferrer">yash-garad</a><span /></li>
          <li><span className="k">GitHub</span><a href={person.github} target="_blank" rel="noreferrer">@{person.githubUser}</a><span /></li>
          <li><span className="k">ORCID</span><a href={person.orcid} target="_blank" rel="noreferrer">{person.orcidId}</a><span /></li>
          <li><span className="k">Resume</span><a href={person.resume} target="_blank" rel="noreferrer">Download PDF</a><span /></li>
        </ul>
      </div>

      <form className="composer" onSubmit={(e) => { e.preventDefault(); window.location.href = mailto; }}>
        <label>
          Your name
          <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
        </label>
        <label>
          Message
          <textarea rows={6} value={message} onChange={(e) => setMessage(e.target.value)} required />
        </label>
        <div>
          <button type="submit" className="btn btn-primary">Open in your email app</button>
        </div>
        <p className="hint">This opens a pre-filled email to {person.email}. Nothing is stored on this site.</p>
      </form>
    </div>
  );
}
