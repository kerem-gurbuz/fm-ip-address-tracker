import { ClockIcon, MapPinIcon, Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import type { SearchHistoryEntryType } from '@/lib/definitions/search';
import {
  selectCurrentGeolocationData,
  setCurrentGeolocationData,
} from '@/lib/redux-store/features/geolocation';
import { deleteSearchHistoryEntry } from '@/lib/redux-store/features/search';
import { useAppDispatch, useAppSelector } from '@/lib/redux-store/hooks';

type SearchHistoryCardProps = {
  entry: SearchHistoryEntryType;
};

export function SearchHistoryCard({ entry }: SearchHistoryCardProps) {
  const dispatch = useAppDispatch();
  const currentGeolocationData = useAppSelector(selectCurrentGeolocationData);

  const { searchTerm: query, timestamp, data } = entry;
  const { city, region, postalCode, timezone } = data.location;

  const formattedDate = new Date(timestamp).toLocaleString();
  const formattedLocation = `${city}, ${region} ${
    postalCode ? `(${postalCode})` : ''
  }`.trim();

  const handleSelectEntry = () => {
    dispatch(setCurrentGeolocationData({ geolocationData: data }));
  };

  const handleDeleteEntry = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(deleteSearchHistoryEntry({ entryTimestamp: timestamp }));

    if (currentGeolocationData) {
      if (
        currentGeolocationData.location.lat === entry.data.location.lat &&
        currentGeolocationData.location.lng === entry.data.location.lng
      ) {
        dispatch(setCurrentGeolocationData({ geolocationData: null }));
      }
    }
  };

  return (
    <Card
      className="mb-4 cursor-pointer bg-gray-900 text-white hover:bg-gray-800"
      onClick={handleSelectEntry}
    >
      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-white">{query}</h4>
            <span className="text-xs text-gray-400">{formattedDate}</span>
          </div>
          <Button
            aria-label="Delete entry"
            variant="ghost"
            size="icon"
            className="h-6 w-6 bg-transparent text-gray-400 transition-colors duration-300 hover:bg-transparent hover:text-white"
            onClick={handleDeleteEntry}
          >
            <Trash2Icon className="h-4 w-4" />
            <span className="sr-only">Delete entry</span>
          </Button>
        </div>
        <div className="mb-1 flex items-center text-sm text-gray-300">
          <MapPinIcon className="mr-2 h-4 w-4 text-gray-400" />
          <span>{formattedLocation}</span>
        </div>
        <div className="flex items-center text-sm text-gray-300">
          <ClockIcon className="mr-2 h-4 w-4 text-gray-400" />
          <span>{timezone}</span>
        </div>
      </CardContent>
    </Card>
  );
}
