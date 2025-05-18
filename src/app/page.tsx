"use client";

import Header from '@/components/landing/Header';
import Navbar from '@/components/landing/Navbar';
import VenueMap from '@/components/landing/VenueMap';
import CompetitionStages from '@/components/landing/CompetitionStages';
import DetailsSection from '@/components/landing/DetailsSection';
import type { StageInfo } from '@/components/landing/CompetitionStages';
import RegistrationSection from '@/components/landing/RegistrationSection';
import PosterSection from '@/components/landing/PosterSection';
import ContactUsSection from '@/components/landing/ContactUsSection';
import FAQSection from '@/components/landing/FAQSection';
import { Separator } from '@/components/ui/separator';
import dynamic from 'next/dynamic';
import Image from 'next/image';


export default function CyberSenseLandingPage() {
  const eventDetails = {
    name: "Cyber Sense",
    tagline: "The only place where breaking things wins prizes",
    subtext: "", 
    backgroundImageUrl: "https://placehold.co/1920x1080.png",
    backgroundVideoUrl: "/cyber-event-background.mp4",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSdSVZEYLbOI68I8e9RM-xRlQNr29RWL76r8XHEuNna0s6cl6Q/viewform"
  };

  const detailsData = [
    { text: "Date: May 23rd, 2025" },
    { text: "Time: 10:00 AM to 4:00 PM" },
    { text: "Venue: Maharaja Institute of Technology Mysore" },
    { text: "Registration Fee: ₹300 per team" },
    { text: "Team Size: 2 members per team" },
    { text: "Eligibility: Open to all undergraduate students" },
    { text: "Electronic Gadgets: Not allowed during the event duration including mobiles, smartwatches, etc." },
    { text: "Prizes: Exciting cash prizes" },
    { text: "Certificate: E-certificates will be provided to all participants" }
  ];

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
    gmapsLink: "https://maps.app.goo.gl/UjsdTdRBgbx33BMu9"
  };

  const posterLink = "https://drive.google.com/file/d/1G0l2_ODxJGBMwNoOhaT22Fzra2Ri6cl2/view?usp=sharing";
  const localPosterImage = "/CyberSense Poster - Hosted by IOT & CB CodeRed.png";


  const faqItems = [
    {
      question: "Do I need prior coding experience?",
      answer: "Not at all! Cyber Sense is designed to be beginner-friendly and welcomes participants with no prior coding experience. The challenges focus on a range of skills including problem-solving, analytical thinking, and digital forensics, not just coding."
    },
    {
      question: "What is the size of a team?",
      answer: "Yes, teams are strictly limited to 2 members to ensure fair participation and collaboration."
    },
    {
      question: "Will there be mentors or guidance available?",
      answer: "While direct answers to challenges won't be provided, event organizers and volunteers will be available to clarify rules, assist with technical difficulties related to the platform, and offer general guidance to ensure a smooth experience for all participants."
    },
    {
      question: "Will food and refreshments be provided?",
      answer: "Lunch will be provided."
    }
  ];


  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground antialiased">
      <Navbar />
      <Header
        eventName={eventDetails.name}
        tagline={eventDetails.tagline}
        subtext={eventDetails.subtext}
        backgroundImageUrl={eventDetails.backgroundImageUrl}
        backgroundVideoUrl={eventDetails.backgroundVideoUrl}
        registrationLink={eventDetails.registrationLink}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-20 md:space-y-32 mb-16 md:mb-24 relative z-[5]">
        <DetailsSection details={detailsData} />
        <Separator className="my-12 md:my-16 bg-border/50" />
        
        <CompetitionStages stages={competitionStagesData} />
        <Separator className="my-12 md:my-16 bg-border/50" />
        
        <VenueMap
          collegeName={venueDetails.collegeName}
          address={venueDetails.address}
          gmapsLink={venueDetails.gmapsLink}
        />
        <Separator className="my-12 md:my-16 bg-border/50" />
        <RegistrationSection registrationLink={eventDetails.registrationLink} />
        <Separator className="my-12 md:my-16 bg-border/50" />
        <PosterSection posterGdriveLink={posterLink} />
        <Separator className="my-12 md:my-16 bg-border/50" />
        <FAQSection items={faqItems} />
        <Separator className="my-12 md:my-16 bg-border/50" />
        <ContactUsSection />
      </main>

      <footer className="py-10 border-t border-border/50 text-center">
        <p className="mb-2 text-muted-foreground flex items-center justify-center gap-2">
          <Image
            src="/coderedlogo.png"
            alt="CodeRed Logo"
            width={24}
            height={24}
            className="object-contain"
          />
          © <span className="font-nunito font-bold text-primary uppercase text-sm">{eventDetails.name}</span> hosted by CodeRed of Dept. of CS-IOT & Cybersecurity.
        </p>
        <p className="text-sm text-muted-foreground">
          Website developed by <a href="https://www.linkedin.com/in/mohammedmuhaimin" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Mohammed Muhaimin</a> and <a href="https://www.linkedin.com/in/yashvitha-a-8b934332a/" target="_blank" rel="noopener noreferrer" className="text-primary font-semibold hover:underline">Yashvitha A</a>.
        </p>
      </footer>
    </div>
  );
}
