'use client';

import { useEffect } from 'react';

import type { GeolocationDataType } from '@/lib/definitions/geolocation';
import { useToast } from '@/lib/hooks';
import { setCurrentGeolocationData } from '@/lib/redux-store/features/geolocation';
import { addToSearchHistory } from '@/lib/redux-store/features/search';
import { useAppDispatch } from '@/lib/redux-store/hooks';

/**
 * Custom hook for managing geolocation data in the application.
 *
 * This hook performs the following tasks:
 * 1. Updates the Redux store with the fetched geolocation data.
 * 2. Displays toast notifications for errors in fetching location data.
 *
 * The hook interacts with the Redux store for state management.
 *
 * @returns {void}
 */
export const useInitialGeolocationData = (
  initialData?: GeolocationDataType | null,
): void => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (initialData) {
      dispatch(setCurrentGeolocationData({ geolocationData: initialData }));
      dispatch(
        addToSearchHistory({
          newEntry: {
            searchTerm: initialData.ip,
            data: initialData,
            timestamp: Date.now(),
          },
        }),
      );
    } else {
      toast({
        title: 'Location Display Error',
        variant: 'destructive',
        description:
          "We couldn't show your location on the map. Please check your internet connection and refresh the page. If this keeps happening, our support team is here to help.",
      });
    }
  }, [initialData, dispatch, toast]);
};
