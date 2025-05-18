
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
  const fileId = "1G0l2_ODxJGBMwNoOhaT22Fzra2Ri6cl2";
  const gDriveImageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
  const placeholderImageUrl = 'https://placehold.co/600x849.png';

  const [currentImageSrc, setCurrentImageSrc] = useState(placeholderImageUrl);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    // Only attempt to load the Google Drive image on the client side
    // and only if no error has occurred yet for this specific gDriveImageUrl.
    if (!hasError) {
      setCurrentImageSrc(gDriveImageUrl);
    }
  }, [gDriveImageUrl, hasError]); // Depend on gDriveImageUrl and hasError

  const handleError = () => {
    // Check if we are not already displaying the placeholder due to a previous error
    if (currentImageSrc !== placeholderImageUrl && !hasError) {
      console.error("Failed to load image from Google Drive, falling back to placeholder.");
      setCurrentImageSrc(placeholderImageUrl);
      setHasError(true); // Set error state to true
    }
  };

  return (
    <section id="poster" className="py-12 sm:py-16 md:py-24 text-center">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-center mb-10 sm:mb-12 md:mb-20" style={{ color: 'hsl(var(--primary))' }}>
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
            unoptimized={true}
            onError={currentImageSrc === gDriveImageUrl && !hasError ? handleError : undefined}
          />
        </div>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto text-sm sm:text-base">
          You can view the official event poster using the link below. For the best display integrated into this website,
          it's recommended to download the poster and place it in the project's `public` folder, then update the image source path in the code.
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
