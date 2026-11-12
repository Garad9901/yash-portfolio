import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { person } from '@/data/site';
import './globals.css';

// Self-hosted (SIL Open Font License): no third-party font request at runtime.
const display = localFont({
  src: [
    { path: '../fonts/chakra-petch-latin-500-normal.woff2', weight: '500' },
    { path: '../fonts/chakra-petch-latin-600-normal.woff2', weight: '600' },
    { path: '../fonts/chakra-petch-latin-700-normal.woff2', weight: '700' },
  ],
  variable: '--font-display',
  display: 'swap',
});

const body = localFont({
  src: [
    { path: '../fonts/ibm-plex-sans-latin-400-normal.woff2', weight: '400' },
    { path: '../fonts/ibm-plex-sans-latin-400-italic.woff2', weight: '400', style: 'italic' },
    { path: '../fonts/ibm-plex-sans-latin-500-normal.woff2', weight: '500' },
    { path: '../fonts/ibm-plex-sans-latin-600-normal.woff2', weight: '600' },
  ],
  variable: '--font-body',
  display: 'swap',
});

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

export const viewport: Viewport = { themeColor: '#060A14', colorScheme: 'dark' };

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
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
