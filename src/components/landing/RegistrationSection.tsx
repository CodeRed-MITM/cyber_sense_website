import type { FC } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Ticket, ArrowRight } from 'lucide-react';

interface RegistrationSectionProps {
  registrationLink: string;
}

const RegistrationSection: FC<RegistrationSectionProps> = ({ registrationLink }) => {
  return (
    <section id="register" className="py-16 md:py-24 text-center bg-card-foreground/5 rounded-xl shadow-inner">
      <div className="container mx-auto px-4">
        <Ticket className="w-16 h-16 text-primary mx-auto mb-6" />
        <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ color: 'hsl(var(--primary))' }}>
          Ready to Test Your Mettle?
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
          The digital arena awaits. Secure your place at Cyber Sense, showcase your expertise, and battle for supremacy and exciting rewards. Spots are limited!
        </p>
        <Button 
          asChild 
          size="lg" 
          className="group bg-accent hover:bg-accent/90 text-accent-foreground font-bold py-4 px-10 text-lg rounded-lg shadow-xl hover:shadow-accent/40 transition-all duration-300 transform hover:scale-105"
        >
          <Link href={registrationLink} target="_blank" rel="noopener noreferrer">
            Register for Cyber Sense
            <ArrowRight className="ml-3 h-6 w-6 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default RegistrationSection;
