
import type { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { User, Phone, Mail } from 'lucide-react';

interface Coordinator {
  name: string;
  phone: string;
  email: string;
}

const coordinators: Coordinator[] = [
  {
    name: "Punith Kumar",
    phone: "+91 XXXXX XXXXX", // Placeholder
    email: "punith.k@example.com" // Placeholder
  },
  {
    name: "Sneha R",
    phone: "+91 YYYYY YYYYY", // Placeholder
    email: "sneha.r@example.com" // Placeholder
  }
];

const ContactUsSection: FC = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-center mb-10 sm:mb-12 md:mb-20" style={{ color: 'hsl(var(--primary))' }}>
        Contact Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
        {coordinators.map((coordinator, index) => (
          <Card key={index} className="bg-card shadow-lg hover:shadow-primary/30 transition-shadow duration-300 rounded-xl">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-primary flex-shrink-0" />
                <CardTitle className="text-xl sm:text-2xl font-orbitron text-card-foreground">{coordinator.name}</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground ml-11 sm:ml-13">Student Coordinator</p>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 pt-0">
              <div className="flex items-center text-sm sm:text-base text-muted-foreground">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-3 text-accent" />
                <span>{coordinator.phone}</span>
              </div>
              <div className="flex items-center text-sm sm:text-base text-muted-foreground">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-3 text-accent" />
                <a href={`mailto:${coordinator.email}`} className="hover:text-accent transition-colors">
                  {coordinator.email}
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-center text-muted-foreground mt-10 sm:mt-12 md:mt-16 text-sm sm:text-base">
        For any queries regarding the event, feel free to reach out to our student coordinators.
      </p>
    </section>
  );
};

export default ContactUsSection;
