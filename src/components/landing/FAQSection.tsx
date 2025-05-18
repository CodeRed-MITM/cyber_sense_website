
import type { FC } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  items: FAQItem[];
}

const FAQSection: FC<FAQSectionProps> = ({ items }) => {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section id="faq" className="py-12 sm:py-16 md:py-24">
      <div className="flex flex-col items-center mb-10 sm:mb-12 md:mb-20">
        <HelpCircle className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-primary mb-3 sm:mb-4" />
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-orbitron font-bold text-center" style={{ color: 'hsl(var(--primary))' }}>
          Frequently Asked Questions
        </h2>
      </div>
      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full space-y-4">
          {items.map((item, index) => (
            <AccordionItem 
              value={`item-${index}`} 
              key={index} 
              className="bg-card shadow-lg rounded-xl border border-border/70 overflow-hidden"
            >
              <AccordionTrigger className="text-left text-base sm:text-lg font-semibold font-share-tech-mono px-6 py-4 hover:bg-muted/30 transition-colors focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-card">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 text-sm sm:text-base text-muted-foreground bg-background/30 leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
