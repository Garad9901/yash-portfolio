import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { person } from '@/data/site';
import './globals.css';

// Self-hosted Patrick Hand (SIL Open Font License): no third-party font request at runtime.
const hand = localFont({
  src: [{ path: '../fonts/patrick-hand-latin-400-normal.woff2', weight: '400' }],
  variable: '--font-hand',
  display: 'swap',
});

// Runs before first paint so the page never flashes the wrong theme.
const themeScript = `(function(){try{var t=localStorage.getItem('theme');}catch(e){}if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.dataset.theme=t;})();`;

const description =
  'Yash Rajesh Garad: AI engineering student and researcher in Nagpur. Agentic AI, explainable medical imaging, edge AI and geospatial ML. Papers, systems and live GitHub activity.';

export const metadata: Metadata = {
  metadataBase: new URL(person.site),
  title: { default: 'Yash Rajesh Garad, AI research and engineering', template: '%s · Yash Rajesh Garad' },
  description,
  keywords: ['Yash Garad', 'Yash Rajesh Garad', 'AI engineer', 'AI research', 'agentic AI', 'RAG', 'computer vision', 'SVPCET'],
  authors: [{ name: person.name, url: person.site }],
  alternates: { canonical: '/' },
  icons: { icon: '/yg_logo_dark.png' },
  openGraph: {
    title: 'Yash Rajesh Garad, AI research and engineering',
    description,
    url: person.site,
    siteName: 'Yash Rajesh Garad',
    type: 'profile',
  },
  twitter: { card: 'summary_large_image', title: 'Yash Rajesh Garad, AI research and engineering', description },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FAFAF8' },
    { media: '(prefers-color-scheme: dark)', color: '#1D1B18' },
  ],
  colorScheme: 'light dark',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: person.name,
  url: person.site,
  email: `mailto:${person.email}`,
  jobTitle: 'AI engineering student and researcher',
  affiliation: { '@type': 'CollegeOrUniversity', name: 'St. Vincent Pallotti College of Engineering & Technology, Nagpur' },
  sameAs: [person.github, person.linkedin, person.orcid],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={hand.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
