import { ImageResponse } from 'next/og';
import { person, papers, projects } from '@/data/site';

export const alt = 'Yash Rajesh Garad, AI research and engineering';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  const rings = [150, 215, 280];
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#060a14', color: '#e7edf8', padding: 72, position: 'relative', fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: 640 }}>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 0.95, letterSpacing: -2 }}>Yash Rajesh</div>
          <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 0.95, letterSpacing: -2, color: '#ffa53a' }}>Garad</div>
          <div style={{ fontSize: 32, marginTop: 28, lineHeight: 1.25 }}>{person.tagline}</div>
          <div style={{ fontSize: 24, marginTop: 28, color: '#8e9bb6' }}>
            {`${papers.length} papers · ${projects.length} open projects · AI research and engineering`}
          </div>
        </div>
        <div style={{ position: 'absolute', right: -40, top: 15, width: 600, height: 600, display: 'flex' }}>
          {rings.map((r) => (
            <div key={r} style={{ position: 'absolute', left: 300 - r, top: 300 - r, width: r * 2, height: r * 2, borderRadius: '50%', border: '1.5px solid #2a3a5c' }} />
          ))}
          <div style={{ position: 'absolute', left: 260, top: 260, width: 80, height: 80, borderRadius: '50%', border: '2px solid #ffa53a', background: '#0c1322', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, fontWeight: 700 }}>YG</div>
          <div style={{ position: 'absolute', left: 300 - 6, top: 300 - 150 - 6, width: 12, height: 12, borderRadius: 6, background: '#6fe3ff' }} />
          <div style={{ position: 'absolute', left: 300 + 152 - 6, top: 300 + 152 - 6, width: 12, height: 12, borderRadius: 6, background: '#ffa53a' }} />
          <div style={{ position: 'absolute', left: 300 - 280 - 7, top: 300 - 7, width: 14, height: 14, borderRadius: 7, border: '3px solid #ffa53a' }} />
        </div>
      </div>
    ),
    size,
  );
}
