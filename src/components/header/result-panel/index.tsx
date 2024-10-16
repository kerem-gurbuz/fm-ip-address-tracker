import { HomeIcon } from 'lucide-react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { selectIsHomeLocation } from '@/lib/redux-store/features/ui';
import { useAppSelector } from '@/lib/redux-store/hooks';
import { HomeLocationIndicator } from './home-location-indicator';
import { ResultCard } from './result-card';

export function ResultPanel() {
  const isHomeLocation = useAppSelector(selectIsHomeLocation);

  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="accordion-item-1"
      className="overflow-hidden rounded-[15px] bg-white shadow-[0_50px_50px_-25px_rgba(0,0,0,0.10)]"
    >
      <AccordionItem value="accordion-item-1">
        <AccordionTrigger className="w-full bg-gradient-to-r from-indigo-800 via-blue-600 to-blue-500 px-6 py-[15px] md:px-8">
          <h2 className="flex items-center gap-2 text-white">
            {isHomeLocation ? (
              <>
                <HomeIcon className="h-6 w-6" />
                <span className="text-xl font-medium">Home Location</span>
              </>
            ) : (
              <span className="text-xl font-medium">IP Insights</span>
            )}
          </h2>
        </AccordionTrigger>
        <AccordionContent className="grid grid-cols-1 gap-y-6 p-6 pt-[26px] min-[480px]:grid-cols-2 md:gap-y-0 md:p-0 lg:grid-cols-4">
          {isHomeLocation ? <HomeLocationIndicator /> : <ResultCard />}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
