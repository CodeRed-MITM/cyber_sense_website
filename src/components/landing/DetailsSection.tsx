import type { FC } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { CircleDot } from 'lucide-react';

interface DetailItem {
  text: string;
}

interface DetailsSectionProps {
  details: DetailItem[];
}

const DetailsSection: FC<DetailsSectionProps> = ({ details }) => {
  return (
    <section id="details" className="py-12 sm:py-16 md:py-24">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-center mb-10 sm:mb-12 md:mb-20" style={{ color: 'hsl(var(--primary))' }}>
        Event Details
      </h2>
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-6 sm:p-8 md:p-10">
          <ul className="space-y-4 max-w-3xl mx-auto">
            {details.map((item, index) => (
              <li key={index} className="flex items-start gap-3">
                <CircleDot className="w-4 h-4 text-primary flex-shrink-0 mt-1.5" />
                <span className="text-base sm:text-lg font-share-tech-mono text-muted-foreground">
                  {item.text}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
};

export default DetailsSection; 