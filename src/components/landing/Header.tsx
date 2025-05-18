
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface HeaderProps {
  eventName: string;
  tagline: string;
  subtext: string;
  backgroundImageUrl: string; // Will be used as video poster
  backgroundVideoUrl: string;
  registrationLink: string;
}

const Header: FC<HeaderProps> = ({ eventName, tagline, subtext, backgroundVideoUrl, backgroundImageUrl, registrationLink }) => {
  return (
    <header className="relative h-[70vh] md:h-[80vh] flex items-center justify-center text-center text-white shadow-2xl overflow-hidden">
      <video
        src={backgroundVideoUrl}
        poster={backgroundImageUrl}
        autoPlay
        loop
        muted
        playsInline // Important for iOS
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] brightness-[0.4]"
        data-ai-hint="abstract cyber video" // Optional: hint for AI if you ever want to generate/find a video
      />
      {/* Optional: Add an overlay div if brightness on video is not enough or for more complex effects
      <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-0"></div>
      */}
      <div className="relative z-10 p-4 sm:p-6 max-w-4xl">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-orbitron font-bold uppercase mb-4 tracking-tight" style={{ color: 'hsl(var(--primary))' }}>
          {eventName}
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-3 font-light text-gray-200">{tagline}</p>
        {subtext && subtext.trim() !== '' && (
           <p className="text-md sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">{subtext}</p>
        )}
        <Button
          asChild
          size="lg"
          className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg animate-subtle-glow transition-transform duration-300 transform hover:scale-105 hover:-translate-y-1"
        >
           <Link href={registrationLink} target="_blank" rel="noopener noreferrer">
            Register Now
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
