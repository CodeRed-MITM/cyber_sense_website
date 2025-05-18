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
    <section id="stages" className="py-16 md:py-24">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 md:mb-20" style={{ color: 'hsl(var(--primary))' }}>
        Competition Stages
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-8">
        {stages.map((stage) => {
          const IconComponent = LucideIcons[stage.iconName] as LucideIcons.LucideIcon | undefined;
          return (
            <Card 
              key={stage.id} 
              className="bg-card shadow-xl hover:shadow-primary/40 transition-all duration-300 rounded-xl flex flex-col transform hover:-translate-y-2"
            >
              <CardHeader className="items-center text-center pt-8">
                {IconComponent && <IconComponent className="w-14 h-14 mb-5 text-primary" strokeWidth={1.5} />}
                <CardTitle className="text-2xl text-primary-foreground">{stage.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pb-8 flex-grow">
                <CardDescription className="text-muted-foreground text-base leading-relaxed">{stage.description}</CardDescription>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
};

export default CompetitionStages;
