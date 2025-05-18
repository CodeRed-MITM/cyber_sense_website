
import type { FC } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Phone, Mail } from 'lucide-react';

interface Coordinator {
  name: string;
  title: string;
  phone?: string;
  email?: string;
}

const coordinators: Coordinator[] = [
  {
    name: "Punith Kumar",
    title: "Event Organizer",
    phone: "+91 8861608621",
    email: "punithkicchu346@gmail.com"
  },
  {
    name: "Sneha R",
    title: "Event Organizer",
    phone: "+91 9900827056",
    email: "snehargowda24@gmail.com"
  },
  {
    name: "Mohammed Muhaimin",
    title: "Technical Coordinator",
  },
  {
    name: "Yashvitha A",
    title: "Technical Coordinator",
  },
  {
    name: "Deekshitha",
    title: "Student Coordinator",
  },
  {
    name: "Rithu Gowda",
    title: "Student Coordinator",
  },
  {
    name: "Nishanth S",
    title: "Social Media Coordinator",
  },
  {
    name: "Pancham Jain",
    title: "Social Media Coordinator",
  }
];

const ContactUsSection: FC = () => {
  return (
    <section id="contact" className="py-12 sm:py-16 md:py-24">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-center mb-10 sm:mb-12 md:mb-20" style={{ color: 'hsl(var(--primary))' }}>
        Contact Us
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-12">
        {coordinators.map((coordinator, index) => (
          <Card key={index} className="bg-card shadow-lg hover:shadow-primary/30 transition-shadow duration-300 rounded-xl flex flex-col">
            <CardHeader className="pb-4 items-center text-center">
              <CardTitle className="text-xl sm:text-2xl font-orbitron text-card-foreground mb-1">{coordinator.name}</CardTitle>
              <p className="text-sm text-muted-foreground">{coordinator.title}</p>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 pt-0 flex-grow px-6">
              {coordinator.phone && (
                <div className="flex items-center text-sm sm:text-base text-muted-foreground justify-center sm:justify-start">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-3 text-accent flex-shrink-0" />
                  <a href={`tel:${coordinator.phone.replace(/\s/g, '')}`} className="hover:text-accent transition-colors">
                    {coordinator.phone}
                  </a>
                </div>
              )}
              {coordinator.email && (
                <div className="flex items-center text-sm sm:text-base text-muted-foreground justify-center sm:justify-start">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5 mr-3 text-accent flex-shrink-0" />
                  <a href={`mailto:${coordinator.email}`} className="hover:text-accent transition-colors break-all">
                    {coordinator.email}
                  </a>
                </div>
              )}
              {!coordinator.phone && !coordinator.email && (
                 <div className="flex items-center text-sm sm:text-base text-muted-foreground/70 italic h-10 justify-center"> {/* Added justify-center for consistency */}
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
