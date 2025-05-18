import type {Metadata} from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { Orbitron, Share_Tech_Mono } from 'next/font/google';
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
  weights: ['400', '500', '600', '700', '800', '900'], // Orbitron supports various weights
});

const shareTechMono = Share_Tech_Mono({
  variable: '--font-share-tech-mono',
  subsets: ['latin'],
  weight: ['400'], // Share Tech Mono typically has one weight
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
    <html lang="en" className="dark"> {/* Enforce dark theme */}
      <body className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${shareTechMono.variable} antialiased bg-background text-foreground`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
