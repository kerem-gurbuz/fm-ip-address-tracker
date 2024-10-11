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
            className={cn(
              'h-[30px] w-[30px] rounded-none rounded-b-[2px] p-0',
              className,
            )}
            onClick={handleClick}
          >
            <EyeIcon className="h-5 w-5 stroke-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p className="font-bold">Reset view</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
