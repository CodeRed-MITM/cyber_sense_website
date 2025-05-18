
"use client";

import type { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PosterSectionProps {
  posterGdriveLink: string;
}

const PosterSection: FC<PosterSectionProps> = ({ posterGdriveLink }) => {
  const localPosterPath = "/CyberSense Poster - Hosted by IOT & CB CodeRed.png";
  const placeholderImageUrl = 'https://placehold.co/600x849.png';

  const [currentImageSrc, setCurrentImageSrc] = useState(localPosterPath);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (currentImageSrc !== placeholderImageUrl && !hasError) {
      setCurrentImageSrc(placeholderImageUrl);
      setHasError(true); 
    }
  };

  // Reset error state if posterGdriveLink changes, to allow re-attempting local image load
  useEffect(() => {
    setHasError(false);
    setCurrentImageSrc(localPosterPath);
  }, [localPosterPath]);


  return (
    <section id="poster" className="py-12 sm:py-16 md:py-24 text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-center mb-10 sm:mb-12 md:mb-20" style={{ color: 'hsl(var(--primary))' }}>
        Event Poster
      </h2>
      <div className="container mx-auto px-4 flex flex-col items-center">
        <div className="mb-8 rounded-lg overflow-hidden shadow-xl border border-border w-full max-w-md sm:max-w-lg md:max-w-xl bg-muted/20">
          <Image
            key={currentImageSrc} // Add key to help React differentiate when src changes
            src={currentImageSrc}
            alt="Event Poster Preview"
            width={600}
            height={849}
            className="w-full h-auto object-contain"
            data-ai-hint="event poster"
            priority
            onError={!hasError ? handleError : undefined} // Only attach onError if we haven't already errored to placeholder
          />
        </div>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm sm:text-base">
          The event poster is displayed above. If you see a placeholder, ensure the image named <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">CyberSense Poster - Hosted by IOT & CB CodeRed.png</code> is in the <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded">public</code> folder of your project. You can also view the poster on Google Drive using the link below.
        </p>
        <Button asChild variant="outline" size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
          <Link href={posterGdriveLink} target="_blank" rel="noopener noreferrer">
            View Poster on Google Drive <ExternalLink className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default PosterSection;

