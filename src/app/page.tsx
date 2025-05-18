
import Header from '@/components/landing/Header';
import VenueMap from '@/components/landing/VenueMap';
import CompetitionStages from '@/components/landing/CompetitionStages';
import type { StageInfo } from '@/components/landing/CompetitionStages';
import RegistrationSection from '@/components/landing/RegistrationSection';
import PosterSection from '@/components/landing/PosterSection';
import ContactUsSection from '@/components/landing/ContactUsSection';
import FAQSection from '@/components/landing/FAQSection';
import { Separator } from '@/components/ui/separator';

export default function CyberSenseLandingPage() {
  const eventDetails = {
    name: "Cyber Sense",
    tagline: "The only place where breaking things wins prizes",
    subtext: "Whereas disregard and contempt for human rights have resulted <br /> in barbarous acts which have outraged the conscience of mankind",
    backgroundImageUrl: "https://placehold.co/1920x1080.png", // Poster for video
    backgroundVideoUrl: "/cyber-event-background.mp4", // Path to your video in public folder
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSdSVZEYLbOI68I8e9RM-xRlQNr29RWL76r8XHEuNna0s6cl6Q/viewform"
  };

  const competitionStagesData: StageInfo[] = [
    {
      id: 's1',
      title: "Half and Half",
      description: "Connect fragmented intel and match disparate clues. Decipher the data to reveal the complete picture. Speed and precision are vital.",
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
      description: "A classic whodunit. Examine clues, interrogate virtual suspects, and deduce the culprit in this narrative-driven investigation.",
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

  const posterLink = "https://drive.google.com/file/d/1G0l2_ODxJGBMwNoOhaT22Fzra2Ri6cl2/view?usp=sharing";

  const faqItems = [
    {
      question: "Do I need prior coding experience?",
      answer: "While some challenges might involve coding, Cyber Sense is designed to test a range of cybersecurity skills, including problem-solving, analytical thinking, and digital forensics. Participants of all skill levels are welcome, and many challenges focus more on wit and strategy than pure coding."
    },
    {
      question: "Is there a limit to team size?",
      answer: "Yes, teams are typically limited to 2-4 members to ensure fair participation and collaboration. Please check the official registration details for the exact team size requirements for this year's event."
    },
    {
      question: "Are pre-existing projects allowed?",
      answer: "No, all work submitted for the competition challenges must be created during the official event timeframe. The goal is to test your skills and creativity on the spot!"
    },
    {
      question: "Will there be mentors or guidance available?",
      answer: "While direct answers to challenges won't be provided, event organizers and volunteers will be available to clarify rules, assist with technical difficulties related to the platform, and offer general guidance to ensure a smooth experience for all participants."
    },
    {
      question: "Will food and refreshments be provided?",
      answer: "We aim to keep our participants energized! Light refreshments and water are typically available. Please check the final event schedule and announcements for specific details on food and beverage provisions."
    }
  ];


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground antialiased">
      <Header
        eventName={eventDetails.name}
        tagline={eventDetails.tagline}
        subtext={eventDetails.subtext}
        backgroundImageUrl={eventDetails.backgroundImageUrl}
        backgroundVideoUrl={eventDetails.backgroundVideoUrl}
        registrationLink={eventDetails.registrationLink}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-32 mt-[-2.5rem] md:mt-[-3.5rem] lg:mt-[-8vh] mb-16 md:mb-24 relative z-[5]">
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
        <PosterSection posterGdriveLink={posterLink} />
        <Separator className="my-12 md:my-16 bg-border/50" />
        <ContactUsSection />
        <Separator className="my-12 md:my-16 bg-border/50" />
        <FAQSection items={faqItems} />
      </main>

      <footer className="py-10 border-t border-border/50 text-center">
        <p className="text-muted-foreground">
          &copy; {new Date().getFullYear()} <span className="font-orbitron font-bold uppercase text-sm">{eventDetails.name}</span>. Unleash Your Cyber Potential.
        </p>
      </footer>
    </div>
  );
}
