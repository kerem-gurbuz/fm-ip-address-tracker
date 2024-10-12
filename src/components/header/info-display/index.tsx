'use client';

import type { GeolocationDataType } from '@/lib/definitions/geolocation';
import {
  useGeolocationQueryBySearchTerm,
  useInitialGeolocationData,
} from '@/lib/hooks';
import { selectCurrentGeolocationData } from '@/lib/redux-store/features/geolocation';
import { useAppSelector } from '@/lib/redux-store/hooks';
import { cn } from '@/lib/utils';
import { InfoCard } from './info-card';

type InfoDisplayProps = {
  className?: React.ComponentProps<'div'>['className'];
  initialData: GeolocationDataType;
};

export function InfoDisplay({ className, initialData }: InfoDisplayProps) {
  // Custom hooks for managing geolocation data
  useInitialGeolocationData(initialData);
  useGeolocationQueryBySearchTerm();

  const geolocationData = useAppSelector(selectCurrentGeolocationData);
  if (!geolocationData) {
    return null;
  }

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-y-6 rounded-[15px] bg-white p-6 pt-[26px] shadow-[0_50px_50px_-25px_rgba(0,0,0,0.10)] min-[480px]:grid-cols-2 md:gap-y-0 md:p-0 lg:grid-cols-4',
        className,
      )}
    >
      <InfoCard data={geolocationData} />
    </div>
  );
}
