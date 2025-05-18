import type { FC } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';

export interface StageInfo {
  id: string;
  title: string;
  description: string;
  iconName: keyof typeof LucideIcons;
}

interface CompetitionStagesProps {
  stages: StageInfo[];
}

const CompetitionStages: FC<CompetitionStagesProps> = ({ stages }) => {
  return (
    <section id="stages" className="py-12 sm:py-16 md:py-24">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-orbitron font-bold text-center mb-10 sm:mb-12 md:mb-20" style={{ color: 'hsl(var(--primary))' }}>
        Competition Stages
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
        {stages.map((stage) => {
          const IconComponent = LucideIcons[stage.iconName] as LucideIcons.LucideIcon | undefined;
          return (
            <Card 
              key={stage.id} 
              className="bg-card shadow-xl hover:shadow-primary/40 transition-all duration-300 rounded-xl flex flex-col transform hover:-translate-y-1 sm:hover:-translate-y-2"
            >
              <CardHeader className="items-center text-center pt-6 sm:pt-8">
                {IconComponent && <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-4 sm:mb-5 text-primary" strokeWidth={1.5} />}
                <CardTitle className="text-xl sm:text-2xl font-orbitron text-card-foreground">{stage.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center px-4 pb-6 sm:px-6 sm:pb-8 flex-grow">
                <CardDescription className="text-sm sm:text-base text-muted-foreground leading-relaxed">{stage.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default CompetitionStages;
