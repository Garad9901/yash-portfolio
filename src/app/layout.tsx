import type { Metadata } from "next";
import { Orbitron, Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Yash Rajesh Garad | Space Command Center OS",
  description: "Spaceship Dashboard & AI Operating System. Specializing in computer vision, NLP, generative AI systems, and predictive risk platforms.",
  keywords: ["Yash Garad", "AI Engineer", "ML Engineer", "Portfolio", "Spaceship OS", "Command Center", "Next.js"],
  authors: [{ name: "Yash Rajesh Garad" }],
  openGraph: {
    title: "Yash Rajesh Garad | Space Command Center OS",
    description: "Spaceship Dashboard & AI Operating System. Specializing in computer vision, NLP, generative AI systems, and predictive risk platforms.",
    url: "https://yashgarad.tech",
    siteName: "Yash Rajesh Garad Space Command Center",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Yash Rajesh Garad | Space Command Center OS",
    description: "Spaceship Dashboard & AI Operating System. Specializing in computer vision, NLP, generative AI systems, and predictive risk platforms.",
    creator: "@yashgarad4848",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${orbitron.variable} ${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased dark`}
      style={{ scrollBehavior: 'smooth' }}
    >
      <body className="min-h-full flex flex-col bg-[#050505] text-[#E8E8ED] selection:bg-orange-500/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
