
import type { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { User, Phone, Mail } from 'lucide-react';

interface Coordinator {
  name: string;
  phone?: string; // Made optional
  email?: string; // Made optional
}

const coordinators: Coordinator[] = [
  {
    name: "Punith Kumar",
    phone: "+91 XXXXX XXXXX", 
    email: "punith.k@example.com" 
  },
  {
    name: "Sneha R",
    phone: "+91 YYYYY YYYYY", 
    email: "sneha.r@example.com" 
  },
  {
    name: "Mohammed Muhaimin",
  },
  {
    name: "Yashvitha A",
  },
  {
    name: "Deekshitha",
  },
  {
    name: "Rithu Gowda",
  },
  {
    name: "Nishanth S",
  },
  {
    name: "Pancham Jain",
  }
];

const ContactUsSection: FC = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-center mb-10 sm:mb-12 md:mb-20" style={{ color: 'hsl(var(--primary))' }}>
        Contact Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
        {coordinators.map((coordinator, index) => (
          <Card key={index} className="bg-card shadow-lg hover:shadow-primary/30 transition-shadow duration-300 rounded-xl flex flex-col">
            <CardHeader className="pb-4">
              <div className="flex items-center space-x-3 mb-3">
                <User className="w-8 h-8 sm:w-10 sm:h-10 text-primary flex-shrink-0" />
                <CardTitle className="text-xl sm:text-2xl font-orbitron text-card-foreground">{coordinator.name}</CardTitle>
              </div>
              <p className="text-sm text-muted-foreground ml-11 sm:ml-13">Student Coordinator</p>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 pt-0 flex-grow">
              {coordinator.phone && (
                <div className="flex items-center text-sm sm:text-base text-muted-foreground">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-3 text-accent flex-shrink-0" />
                  <span>{coordinator.phone}</span>
                </div>
              )}
              {coordinator.email && (
                <div className="flex items-center text-sm sm:text-base text-muted-foreground">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-3 text-accent flex-shrink-0" />
                  <a href={`mailto:${coordinator.email}`} className="hover:text-accent transition-colors break-all">
                    {coordinator.email}
                  </a>
                </div>
              )}
              {!coordinator.phone && !coordinator.email && (
                 <div className="flex items-center text-sm sm:text-base text-muted-foreground/70 italic">
                   {/* Intentionally empty or add a generic message if needed */}
                 </div>
              )}
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
