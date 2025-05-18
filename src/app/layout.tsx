import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Orbitron, Share_Tech_Mono, Press_Start_2P } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const orbitron = Orbitron({
  variable: '--font-orbitron',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

const shareTechMono = Share_Tech_Mono({
  variable: '--font-share-tech-mono',
  subsets: ['latin'],
  weight: ['400'],
});

const pressStart2P = Press_Start_2P({
  variable: '--font-press-start-2p',
  subsets: ['latin'],
  weight: ['400'], // Press Start 2P typically has one weight
});

export const metadata: Metadata = {
  title: 'Cyber Sense Landing',
  description: 'Join Cyber Sense - an exciting cybersecurity competition event.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${shareTechMono.variable} ${pressStart2P.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
