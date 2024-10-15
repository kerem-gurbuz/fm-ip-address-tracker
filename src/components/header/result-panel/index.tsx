import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ResultCard } from './result-card';

export function ResultPanel() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="accordion-item-1"
      className="overflow-hidden rounded-[15px] bg-white shadow-[0_50px_50px_-25px_rgba(0,0,0,0.10)]"
    >
      <AccordionItem value="accordion-item-1">
        <AccordionTrigger className="w-full bg-black px-6 py-[15px] hover:bg-[#3F3F3F] md:px-8">
          <h2 className="text-lg font-medium text-white">IP Insights</h2>
        </AccordionTrigger>
        <AccordionContent className="grid grid-cols-1 gap-y-6 p-6 pt-[26px] min-[480px]:grid-cols-2 md:gap-y-0 md:p-0 lg:grid-cols-4">
          <ResultCard />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
