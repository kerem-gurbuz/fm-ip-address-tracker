import type { LatLngExpression } from 'leaflet';
import { EyeIcon } from 'lucide-react';
import { useCallback } from 'react';
import { useMap } from 'react-leaflet';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

const VIEW_ZOOM_LEVEL = 18;

type DisplayPositionProps = {
  className?: React.ComponentProps<'button'>['className'];
  center: LatLngExpression;
};

export function DisplayPositionBtn({
  className,
  center,
}: DisplayPositionProps) {
  const map = useMap();

  const handleClick = useCallback(() => {
    map.setView(center, VIEW_ZOOM_LEVEL);
  }, [map, center]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label="Reset view"
            onClick={handleClick}
            className={cn(
              'h-[30px] w-[50px] justify-end rounded-none rounded-l-full bg-white p-0 pr-[10px] hover:bg-[#f4f4f4]',
              className,
            )}
          >
            <EyeIcon className="h-5 w-5 stroke-black" />
            <span className="sr-only">Reset view</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="top">
          <p className="font-bold">Reset view</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
