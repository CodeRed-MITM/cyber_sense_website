"use client";

import type { FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

interface VenueMapProps {
  collegeName: string;
  address: string;
  gmapsLink: string;
}

const VenueMap: FC<VenueMapProps> = ({ collegeName, address, gmapsLink }) => {
  return (
    <section id="venue" className="py-12 sm:py-16 md:py-24">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-center mb-10 sm:mb-12 md:mb-20" style={{ color: 'hsl(var(--primary))' }}>
        Event Venue
      </h2>
      <Card className="bg-card shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="p-4 sm:p-6 md:p-8">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-3">
            <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-primary flex-shrink-0" />
            <div>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-nunito text-card-foreground">
                <a href={gmapsLink} target="_blank" rel="noopener noreferrer" className="hover:underline focus:outline-none focus:ring-2 focus:ring-ring rounded">
                  {collegeName}
                </a>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base md:text-lg text-muted-foreground">{address}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="relative w-full aspect-[4/3]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3897.246768553072!2d76.68618637584395!3d12.366395827856314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baf71273625ff79%3A0xe21bc942801a6077!2sMaharaja%20Institute%20of%20Technology%20Mysore!5e0!3m2!1sen!2sin!4v1747587432637!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default VenueMap;
