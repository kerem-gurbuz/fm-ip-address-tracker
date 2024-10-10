'use client';

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
import { cn } from '@/lib/utils';

/* 
  Anıtkabir, Ankara, Turkey
  ------------------------------------------------------------------------
  Latitude and longitude coordinates are: 39.925018, 32.836956

  Anıtkabir (literally, "memorial tomb") is the mausoleum of Mustafa Kemal Atatürk, the leader of the Turkish War of Independence and the founder and first President of the Republic of Turkey.
 */
const FALLBACK_LOCATION: LatLngExpression = {
  lat: 39.925018,
  lng: 32.836956,
};

type GetMyLocationBtnProps = {
  className?: React.ComponentProps<'button'>['className'];
  setPosition: Dispatch<SetStateAction<LatLngExpression | null>>;
};

export function GetMyLocationBtn({
  className,
  setPosition,
}: GetMyLocationBtnProps) {
  const map = useMap();

  const { loading, location, error } = useUserLocation();
  // useUserLocation custom hook uses the browser Geolocation API to get the user's current location.

  const handleClick = useCallback(() => {
    if (location) {
      const [lat, lng] = location;
      const newPosition: LatLngExpression = { lat, lng };
      setPosition(() => newPosition);
      map.flyTo(newPosition);
    }
    if (error) {
      setPosition(() => FALLBACK_LOCATION);
      map.flyTo(FALLBACK_LOCATION);
    }
  }, [location, error, map, setPosition]);

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
