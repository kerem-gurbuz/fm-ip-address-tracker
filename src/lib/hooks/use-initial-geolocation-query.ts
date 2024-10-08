'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { useToast } from '@/lib/hooks';
import { geolocationQueries } from '@/lib/react-query/geolocation';
import {
  setCurrentGeolocationData,
  setGeolocationErrorMessage,
} from '@/lib/redux-store/features/geolocation';
import { addToSearchHistory } from '@/lib/redux-store/features/search';
import { useAppDispatch } from '@/lib/redux-store/hooks';

// TODO: Return refetch function for manual refetching (retrying) of the query.

/**
 * Custom hook for managing geolocation data in the application.
 *
 * This hook performs the following tasks:
 * 1. Fetches initial geolocation data based on the client's public IP address.
 * 2. Updates the Redux store with the fetched geolocation data.
 * 3. Displays toast notifications for errors in fetching or displaying location data.
 *
 * The hook uses React Query for data fetching and caching, and interacts with
 * the Redux store for state management.
 *
 * @returns {void}
 */
export const useInitialGeolocationQuery = (): void => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  // This query was prefetched on the server.

  const {
    data: initialGeolocationQueryData,
    dataUpdatedAt: initialGeolocationQueryDataUpdatedAt,
    isSuccess: isInitialGeolocationQuerySuccess,
    isError: isInitialGeolocationQueryError,
    error: initialGeolocationQueryError,
  } = useSuspenseQuery(geolocationQueries.initial());

  useEffect(() => {
    if (isInitialGeolocationQuerySuccess) {
      dispatch(
        setCurrentGeolocationData({
          geolocationData: initialGeolocationQueryData,
        }),
      );
      dispatch(
        addToSearchHistory({
          newEntry: {
            searchTerm: initialGeolocationQueryData.ip,
            data: initialGeolocationQueryData,
            timestamp: initialGeolocationQueryDataUpdatedAt,
          },
        }),
      );
    }
  }, [
    isInitialGeolocationQuerySuccess,
    initialGeolocationQueryData,
    initialGeolocationQueryDataUpdatedAt,
    dispatch,
  ]);

  useEffect(() => {
    if (isInitialGeolocationQueryError) {
      const errorMessage =
        initialGeolocationQueryError?.message ??
        JSON.stringify(initialGeolocationQueryError);

      dispatch(setGeolocationErrorMessage({ errorMessage }));
      toast({
        title: 'Location Display Error',
        variant: 'destructive',
        description:
          "We couldn't show your location on the map. Please check your internet connection and refresh the page. If this keeps happening, our support team is here to help.",
      });
    }
  }, [
    isInitialGeolocationQueryError,
    initialGeolocationQueryError,
    dispatch,
    toast,
  ]);
};
