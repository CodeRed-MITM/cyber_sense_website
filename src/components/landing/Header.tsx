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
  const handleScrollDown = () => {
    const detailsSection = document.getElementById('details');
    if (detailsSection) {
      detailsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

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

      <div className="relative z-[2] flex flex-col items-center justify-center px-4">
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

      {/* Scroll Down Arrow */}
      <button 
        onClick={handleScrollDown}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-[2] animate-bounce-slow cursor-pointer hover:scale-110 transition-transform duration-200"
        aria-label="Scroll to next section"
      >
        <div className="relative w-8 h-12 sm:w-10 sm:h-14">
          <div className="absolute inset-0 border-2 border-[#6495ED]/70 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-4 sm:w-1.5 sm:h-5 bg-[#6495ED]/80 rounded-full animate-pulse"></div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-2 h-2 sm:w-3 sm:h-3 border-b-2 border-r-2 border-[#6495ED]/90 rotate-45"></div>
        </div>
      </button>
    </header>
  );
};

export default Header;
