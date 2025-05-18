"use client";

import type { FC } from 'react';
import { APIProvider, Map, Marker, InfoWindow } from '@vis.gl/react-google-maps';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

interface VenueMapProps {
  collegeName: string;
  address: string;
  coordinates: { lat: number; lng: number };
}

const VenueMap: FC<VenueMapProps> = ({ collegeName, address, coordinates }) => {
  const [apiKey, setApiKey] = useState<string | undefined>(undefined);
  const [showInfoWindow, setShowInfoWindow] = useState(true);

  useEffect(() => {
    // Ensure this runs only on the client after hydration
    setApiKey(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);
  }, []);

  return (
    <section id="venue" className="py-12 sm:py-16 md:py-24">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-center mb-10 sm:mb-12 md:mb-20" style={{ color: 'hsl(var(--primary))' }}>
        Event Venue
      </h2>
      <Card className="bg-card shadow-xl rounded-xl overflow-hidden">
        <CardHeader className="p-4 sm:p-6 md:p-8">
          <div className="flex items-center space-x-3 sm:space-x-4 mb-3">
            <MapPin className="w-8 h-8 sm:w-10 sm:h-10 text-primary flex-shrink-0" />
            <div>
              <CardTitle className="text-xl sm:text-2xl md:text-3xl font-orbitron text-card-foreground">{collegeName}</CardTitle>
              <CardDescription className="text-sm sm:text-base md:text-lg text-muted-foreground">{address}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {apiKey ? (
            <div className="h-[300px] sm:h-[350px] md:h-[450px] w-full">
              <APIProvider apiKey={apiKey}>
                <Map
                  defaultCenter={coordinates}
                  defaultZoom={15}
                  gestureHandling="greedy"
                  disableDefaultUI={false}
                  mapId="cyberSenseMapStyle" 
                  className="w-full h-full"
                  mapTypeControl={false}
                  streetViewControl={false}
                  fullscreenControl={false}
                  styles={[{featureType: "all", stylers: [{saturation: -100}, {lightness: -50}, {gamma:0.5}]}]}
                >
                  <Marker position={coordinates} onClick={() => setShowInfoWindow(!showInfoWindow)} />
                  {showInfoWindow && (
                     <InfoWindow position={coordinates} onCloseClick={() => setShowInfoWindow(false)}>
                        <div className="p-2 text-foreground bg-background rounded-md shadow-md">
                           <h3 className="font-semibold text-sm sm:text-md text-primary">{collegeName}</h3>
                           <p className="text-xs sm:text-sm">{address}</p>
                        </div>
                     </InfoWindow>
                  )}
                </Map>
              </APIProvider>
            </div>
          ) : (
            <div className="h-[300px] sm:h-[350px] md:h-[450px] flex items-center justify-center bg-muted/50">
              <div className="text-center p-4 sm:p-8">
                <MapPin className="w-12 h-12 sm:w-16 sm:h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-lg sm:text-xl text-muted-foreground font-semibold">Map Preview Unavailable</p>
                <p className="text-muted-foreground text-sm sm:text-base">
                  The interactive map requires a Google Maps API key to be configured.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

export default VenueMap;
