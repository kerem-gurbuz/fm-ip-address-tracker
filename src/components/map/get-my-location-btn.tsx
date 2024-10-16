import type { LatLngTuple } from 'leaflet';
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
import { setUserLocation } from '@/lib/redux-store/features/geolocation/geolocation-slice';
import { useAppDispatch, useAppSelector } from '@/lib/redux-store/hooks';
import { cn } from '@/lib/utils';

type GetMyLocationBtnProps = {
  className?: React.ComponentProps<'button'>['className'];
  setPosition: Dispatch<SetStateAction<LatLngTuple | null>>;
};

export function GetMyLocationBtn({
  className,
  setPosition,
}: GetMyLocationBtnProps) {
  const { loading, location: userLocation, error } = useUserLocation();
  const fallbackLocation = useAppSelector(selectFallbackLocation);
  const dispatch = useAppDispatch();
  const map = useMap();

  const handleClick = useCallback(() => {
    if (userLocation) {
      dispatch(setUserLocation({ userLocation }));
      setPosition(() => userLocation);
    }
    if (error) {
      setPosition(() => fallbackLocation);
      map.flyTo(fallbackLocation);
    }
  }, [userLocation, error, fallbackLocation, map, dispatch, setPosition]);

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label="Get my location"
            onClick={handleClick}
            disabled={loading}
            className={cn(
              'h-[30px] w-[40px] rounded-none bg-white p-0 hover:bg-[#f4f4f4]',
              { 'bg-red-700 hover:bg-red-700/90': Boolean(error) },
              className,
            )}
          >
            <HouseIcon
              className={cn('h-5 w-5 stroke-black', {
                'stroke-white': Boolean(error),
              })}
            />
            <span className="sr-only">Get my location</span>
          </Button>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className={cn({ 'bg-red-700 text-white': Boolean(error) })}
        >
          <p className="font-bold">{error || 'Get My Location'}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
