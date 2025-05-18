import Header from '@/components/landing/Header';
import VenueMap from '@/components/landing/VenueMap';
import CompetitionStages from '@/components/landing/CompetitionStages';
import type { StageInfo } from '@/components/landing/CompetitionStages';
import RegistrationSection from '@/components/landing/RegistrationSection';
import { Separator } from '@/components/ui/separator';

export default function CyberSenseLandingPage() {
  const eventDetails = {
    name: "Cyber Sense",
    tagline: "The only place where breaking things wins prizes",
    subtext: "An exhilarating cybersecurity competition designed to challenge your intellect, test your skills, and push your boundaries. Are you ready to prove your prowess?",
    backgroundImageUrl: "https://placehold.co/1920x1080.png",
    registrationLink: "https://example.com/register-cyber-sense" // Placeholder link
  };

  const competitionStagesData: StageInfo[] = [
    { 
      id: 's1', 
      title: "Cipher Breach", // Renamed from "Half and Half" for more cyber feel
      description: "Decrypt fragmented intel and piece together critical data from partially revealed clues. Precision is key.", 
      iconName: "Puzzle" // Changed icon
    },
    { 
      id: 's2', 
      title: "Brand Deception", // Renamed from "Logo Recall"
      description: "Identify sophisticatedly altered corporate logos and digital watermarks in a high-stakes visual challenge.", 
      iconName: "ScanEye" // Changed icon
    },
    { 
      id: 's3', 
      title: "Phishing Net", // Renamed from "Phishing Hunt"
      description: "Navigate a gauntlet of deceptive emails and websites. Distinguish friend from foe to avoid the hook.", 
      iconName: "ShieldAlert" 
    },
    { 
      id: 's4', 
      title: "Digital Forensics", // Renamed from "Murder Mystery"
      description: "Unravel a complex cybercrime. Analyze digital evidence, trace attack vectors, and identify the culprit.", 
      iconName: "FileSearch" 
    },
    { 
      id: 's5', 
      title: "Byte Blitz", // Renamed from "Rapid Fire"
      description: "A fast-paced Q&A on diverse cybersecurity topics. Speed and accuracy will determine the victor.", 
      iconName: "Zap" 
    },
  ];

  const venueDetails = {
    collegeName: "Tech Horizon Institute", // Example name
    address: "Cyber Park, Innovation Drive, Tech City, TC 10101", // Example address
    coordinates: { lat: 37.4220, lng: -122.0841 } // Example: Googleplex coordinates
  };

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground antialiased">
      <Header
        eventName={eventDetails.name}
        tagline={eventDetails.tagline}
        subtext={eventDetails.subtext}
        backgroundImageUrl={eventDetails.backgroundImageUrl}
        registrationLink={eventDetails.registrationLink}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-32 mt-[-8vh] mb-16 md:mb-24 relative z-[5]"> {/* Pull content up slightly */}
        <CompetitionStages stages={competitionStagesData} />
        <Separator className="my-12 md:my-16 bg-border/50" />
        <VenueMap
          collegeName={venueDetails.collegeName}
          address={venueDetails.address}
          coordinates={venueDetails.coordinates}
        />
        <Separator className="my-12 md:my-16 bg-border/50" />
        <RegistrationSection registrationLink={eventDetails.registrationLink} />
      </main>
      
      <footer className="py-10 border-t border-border/50 text-center">
        <p className="text-muted-foreground">
          &copy; {new Date().getFullYear()} {eventDetails.name}. Unleash Your Cyber Potential.
        </p>
      </footer>
    </div>
  );
}
