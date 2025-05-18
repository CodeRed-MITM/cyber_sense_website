
import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Ticket, ArrowRight } from 'lucide-react';

interface RegistrationSectionProps {
  registrationLink: string;
}

const RegistrationSection: FC<RegistrationSectionProps> = ({ registrationLink }) => {
  return (
    <section id="register" className="py-12 sm:py-16 md:py-24 text-center bg-card-foreground/5 rounded-xl shadow-inner">
      <div className="container mx-auto px-4">
        <Ticket className="w-12 h-12 sm:w-14 md:w-16 md:h-16 text-primary mx-auto mb-4 sm:mb-6" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold mb-4 sm:mb-6" style={{ color: 'hsl(var(--primary))' }}>
          Secure Your Spot!
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
          The digital arena awaits. Secure your place at Cyber Sense, showcase your expertise, and battle for supremacy and exciting rewards. Spots are limited!
        </p>
        <Button 
          asChild 
          size="lg" 
          className="group bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-3 px-6 text-base sm:py-4 sm:px-10 sm:text-lg rounded-lg shadow-xl hover:shadow-accent/40 transition-all duration-300 transform hover:scale-105"
        >
          <Link href={registrationLink} target="_blank" rel="noopener noreferrer">
            Register for Cyber Sense
            <ArrowRight className="ml-2 sm:ml-3 h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default RegistrationSection;
