import type { LatLngExpression } from 'leaflet';
import { HouseIcon } from 'lucide-react';
import { useCallback, type Dispatch, type SetStateAction } from 'react';
import { useMap } from 'react-leaflet';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUserLocation } from '@/lib/hooks';
import { selectFallbackLocation } from '@/lib/redux-store/features/geolocation';
import { useAppSelector } from '@/lib/redux-store/hooks';
import { cn } from '@/lib/utils';

type GetMyLocationBtnProps = {
  className?: React.ComponentProps<'button'>['className'];
  setPosition: Dispatch<SetStateAction<LatLngExpression | null>>;
};

export function GetMyLocationBtn({
  className,
  setPosition,
}: GetMyLocationBtnProps) {
  const { loading, location: userLocation, error } = useUserLocation();
  const fallbackLocation = useAppSelector(selectFallbackLocation);
  const map = useMap();

  const handleClick = useCallback(() => {
    if (userLocation) {
      setPosition(() => userLocation as LatLngExpression);
      map.flyTo(userLocation as LatLngExpression);
    }
    if (error) {
      setPosition(() => fallbackLocation);
      map.flyTo(fallbackLocation);
    }
  }, [userLocation, error, fallbackLocation, map, setPosition]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            className={cn(
              'h-[30px] w-[30px] rounded-none rounded-t-[2px] p-0',
              { 'bg-red-700 hover:bg-red-700/90': Boolean(error) },
              className,
            )}
            onClick={handleClick}
            disabled={loading}
          >
            <HouseIcon className="h-5 w-5 stroke-white" />
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="left"
          className={cn({ 'bg-red-700 text-white': Boolean(error) })}
        >
          <p className="font-bold">{error || 'Get My Location'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
