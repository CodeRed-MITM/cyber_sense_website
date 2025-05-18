
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Navbar from '@/components/landing/Navbar'; // Import the Navbar component

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
      {/* Integrated Navbar - Now Fixed */}
      <div className="fixed top-0 left-0 right-0 z-30 bg-background/70 backdrop-blur-md shadow-md print:hidden">
        <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          <Link href="#" className="text-xl sm:text-2xl font-nunito font-bold text-primary uppercase">
            {eventName}
          </Link>
          <Navbar /> {/* Render the icon navigation */}
        </div>
      </div>

      <video
        src={backgroundVideoUrl}
        poster={backgroundImageUrl}
        autoPlay
        loop
        muted
        playsInline // Important for iOS
        className="absolute top-0 left-0 w-full h-full object-cover z-[-1] brightness-[0.4]"
        data-ai-hint="3d abstract blue"
      />
      <div className="relative z-10 p-4 sm:p-6 max-w-4xl pt-20 md:pt-24"> {/* Ensure padding-top accounts for fixed navbar height */}
        <p className="text-sm sm:text-base text-gray-400 mb-2 font-share-tech-mono uppercase tracking-wider">
          powered by <span className="text-black">Code</span><span className="text-destructive">Red</span> Club
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-nunito font-bold uppercase mb-4 tracking-tight" style={{ color: 'hsl(var(--primary))' }}>
          {eventName}
        </h1>
        <p className="text-xl sm:text-2xl md:text-3xl mb-3 font-light text-gray-200 italic">
          &ldquo;{tagline}&rdquo;
        </p>
        {subtext && subtext.trim() !== '' && (
           <p className="text-md sm:text-lg md:text-xl text-gray-300/80 mb-8 max-w-2xl mx-auto font-press-start-2p text-xs sm:text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: subtext }}></p>
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
