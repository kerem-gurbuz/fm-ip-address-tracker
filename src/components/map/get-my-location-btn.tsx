import type { LatLngTuple } from 'leaflet';
import { HouseIcon } from 'lucide-react';
import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useUserLocation } from '@/lib/hooks';
import { selectFallbackLocation } from '@/lib/redux-store/features/geolocation';
import {
  setCurrentGeolocationData,
  setUserLocation,
} from '@/lib/redux-store/features/geolocation/geolocation-slice';
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
  const [getLocation, setGetLocation] = useState(false);
  const { loading, location, error } = useUserLocation(getLocation);

  const dispatch = useAppDispatch();
  const fallbackLocation = useAppSelector(selectFallbackLocation);

  useEffect(() => {
    if (getLocation) {
      dispatch(
        setCurrentGeolocationData({
          geolocationData: null,
        }),
      );
      if (location) {
        dispatch(setUserLocation({ userLocation: location }));
        setPosition(() => location);
      }
      if (error) {
        dispatch(setUserLocation({ userLocation: fallbackLocation }));
        setPosition(() => fallbackLocation);
      }
    }
  }, [getLocation, location, error, fallbackLocation, setPosition, dispatch]);

  const handleGetLocation = () => {
    setGetLocation(true);

    dispatch(
      setCurrentGeolocationData({
        geolocationData: null,
      }),
    );
    if (location) {
      dispatch(setUserLocation({ userLocation: location }));
      setPosition(() => location);
    }
    if (error) {
      dispatch(setUserLocation({ userLocation: fallbackLocation }));
      setPosition(() => fallbackLocation);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            aria-label="Get my location"
            onClick={handleGetLocation}
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
