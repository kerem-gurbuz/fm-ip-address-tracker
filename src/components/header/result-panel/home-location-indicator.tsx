import { selectUserLocation } from '@/lib/redux-store/features/geolocation/geolocation-selectors';
import { useAppSelector } from '@/lib/redux-store/hooks';
import { ResultItem } from './result-item';

type HomeLocationIndicatorProps = {
  address?: string;
};

export function HomeLocationIndicator({ address }: HomeLocationIndicatorProps) {
  const userLocation = useAppSelector(selectUserLocation);
  if (!userLocation) return null;

  return (
    <div className="col-span-full flex flex-col items-center justify-center overflow-hidden">
      <div className="flex items-center gap-4 md:gap-0">
        <ResultItem
          index={0}
          label="Latitude"
          value={userLocation[0].toString()}
        />
        <div className="h-full w-[1px] bg-black opacity-15 md:h-3/5" />
        <ResultItem
          index={1}
          label="Longitude"
          value={userLocation[1].toString()}
        />
      </div>
      {address && (
        <p className="pt-6 text-center text-sm font-medium md:p-6 md:pt-2 lg:pt-0">
          {address}
        </p>
      )}
    </div>
  );
}
