import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar'; // Import the Navbar component
import { Shield } from 'lucide-react';
import LetterGlitch from '@/components/effects/LetterGlitch';

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
    <header className="relative h-screen flex items-center justify-center text-center text-white shadow-2xl overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <LetterGlitch 
          glitchColors={['#0A192F', '#172A45', '#6495ED']}
          glitchSpeed={75}
          outerVignette={true}
          centerVignette={false}
          smooth={true}
        />
      </div>
      
      <video
        src={backgroundVideoUrl}
        poster={backgroundImageUrl}
        autoPlay
        loop
        muted
        playsInline // Important for iOS
        className="absolute top-0 left-0 w-full h-full object-cover z-[1] brightness-[0.2] mix-blend-overlay"
        data-ai-hint="3d abstract blue"
      />

      <div className="relative z-10 p-4 sm:p-6 max-w-6xl mx-auto pt-16 md:pt-20">
        <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-3 sm:mb-4 font-share-tech-mono uppercase tracking-wider">
          hosted by <span className="text-white">Code</span><span className="text-destructive">Red</span> Club
        </p>
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-press-start-2p font-bold uppercase mb-4 sm:mb-6 tracking-tight leading-[1.1] text-balance animate-in fade-in slide-in-from-bottom-8 duration-1000 glitch" style={{ color: 'hsl(var(--primary))' }}>
          {eventName}
          <span aria-hidden="true">{eventName}</span>
          <span aria-hidden="true">{eventName}</span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-4 sm:mb-6 font-light text-gray-200 italic">
          &ldquo;{tagline}&rdquo;
        </p>
        {subtext && subtext.trim() !== '' && (
           <p className="text-xs sm:text-sm md:text-base text-gray-300/80 mb-6 sm:mb-8 max-w-3xl mx-auto font-press-start-2p leading-relaxed" dangerouslySetInnerHTML={{ __html: subtext }}></p>
        )}
        <Button
          asChild
          size="lg"
          className="register-button mt-4 sm:mt-6 text-primary-foreground font-semibold py-3 px-8 sm:py-4 sm:px-10 text-base sm:text-lg rounded-lg"
        >
           <Link href={registrationLink} target="_blank" rel="noopener noreferrer">
            <span>Register Now</span>
          </Link>
        </Button>
      </div>
    </header>
  );
};

export default Header;
