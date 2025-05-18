
import Header from '@/components/landing/Header';
import VenueMap from '@/components/landing/VenueMap';
import CompetitionStages from '@/components/landing/CompetitionStages';
import type { StageInfo } from '@/components/landing/CompetitionStages';
import RegistrationSection from '@/components/landing/RegistrationSection';
import ContactUsSection from '@/components/landing/ContactUsSection';
import { Separator } from '@/components/ui/separator';

export default function CyberSenseLandingPage() {
  const eventDetails = {
    name: "Cyber Sense",
    tagline: "The only place where breaking things wins prizes",
    subtext: "",
    backgroundImageUrl: "https://placehold.co/1920x1080.png",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSdSVZEYLbOI68I8e9RM-xRlQNr29RWL76r8XHEuNna0s6cl6Q/viewform"
  };

  const competitionStagesData: StageInfo[] = [
    {
      id: 's1',
      title: "Half and Half",
      description: "Decrypt fragmented intel and piece together critical data from partially revealed clues. Precision is key.",
      iconName: "Puzzle"
    },
    {
      id: 's2',
      title: "Logo Recall",
      description: "Identify sophisticatedly altered corporate logos and digital watermarks in a high-stakes visual challenge.",
      iconName: "ScanEye"
    },
    {
      id: 's3',
      title: "Phishing Hunt",
      description: "Navigate a gauntlet of deceptive emails and websites. Distinguish friend from foe to avoid the hook.",
      iconName: "ShieldAlert"
    },
    {
      id: 's4',
      title: "Murder Mystery",
      description: "Unravel a complex cybercrime. Analyze digital evidence, trace attack vectors, and identify the culprit.",
      iconName: "FileSearch"
    },
    {
      id: 's5',
      title: "Rapid Fire",
      description: "A fast-paced Q&A on diverse cybersecurity topics. Speed and accuracy will determine the victor.",
      iconName: "Zap"
    },
  ];

  const venueDetails = {
    collegeName: "Maharaja Institute of Technology, Mysore",
    address: "Belawadi, Mandya District, Mysore, Karnataka 571477",
    coordinates: { lat: 12.3664375, lng: 76.6888125 }
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
        <Separator className="my-12 md:my-16 bg-border/50" />
        <ContactUsSection />
      </main>

      <footer className="py-10 border-t border-border/50 text-center">
        <p className="text-muted-foreground">
          &copy; {new Date().getFullYear()} <span className="font-orbitron font-bold uppercase text-sm">{eventDetails.name}</span>. Unleash Your Cyber Potential.
        </p>
      </footer>
    </div>
  );
}
