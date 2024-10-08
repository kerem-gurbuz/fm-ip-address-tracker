'use client';

import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';

import { domainNameSchema, ipAddressSchema } from '@/lib/definitions/search';
import { useToast } from '@/lib/hooks';
import { geolocationQueries } from '@/lib/react-query/geolocation';
import {
  setCurrentGeolocationData,
  setGeolocationErrorMessage,
} from '@/lib/redux-store/features/geolocation';
import { addToSearchHistory } from '@/lib/redux-store/features/search';
import { useAppDispatch } from '@/lib/redux-store/hooks';

/**
 * Custom hook for managing geolocation data in the application.
 *
 * This hook performs the following tasks:
 * 1. Handles geolocation queries for user-entered IP addresses or domain names.
 * 2. Updates the Redux store with the fetched geolocation data.
 * 3. Displays toast notifications for errors in fetching or displaying location data.
 *
 * The hook uses React Query for data fetching and caching, and interacts with
 * the Redux store for state management. It also utilizes custom schemas for
 * input validation and a custom toast hook for notifications.
 *
 * @returns {void}
 */
export const useGeolocationQueryBySearchTerm = (
  searchTerm: string | null,
): void => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const parsedIpAddress = ipAddressSchema.safeParse(searchTerm).data;
  const parsedDomainName = domainNameSchema.safeParse(searchTerm).data;

  // These queries were not prefetched on the server and will not start
  // fetching until on the client.

  const {
    data: ipAddressQueryData,
    dataUpdatedAt: ipAddressQueryDataUpdatedAt,
    isSuccess: isIpAddressQuerySuccess,
    isError: isIpAddressQueryError,
    error: ipAddressQueryError,
  } = useQuery(geolocationQueries.detailByIpAddress(parsedIpAddress));

  const {
    data: domainNameQueryData,
    dataUpdatedAt: domainNameQueryDataUpdatedAt,
    isSuccess: isDomainNameQuerySuccess,
    isError: isDomainNameQueryError,
    error: domainNameQueryError,
  } = useQuery(geolocationQueries.detailByDomainName(parsedDomainName));

  useEffect(() => {
    if (isIpAddressQuerySuccess) {
      dispatch(
        setCurrentGeolocationData({ geolocationData: ipAddressQueryData }),
      );
      dispatch(setGeolocationErrorMessage({ errorMessage: null }));
      dispatch(
        addToSearchHistory({
          newEntry: {
            searchTerm: parsedIpAddress!,
            data: ipAddressQueryData,
            timestamp: ipAddressQueryDataUpdatedAt,
          },
        }),
      );
    }
  }, [
    parsedIpAddress,
    isIpAddressQuerySuccess,
    ipAddressQueryData,
    ipAddressQueryDataUpdatedAt,
    dispatch,
  ]);

  useEffect(() => {
    if (isIpAddressQueryError) {
      const errorMessage =
        ipAddressQueryError?.message ?? JSON.stringify(ipAddressQueryError);

      dispatch(setGeolocationErrorMessage({ errorMessage }));
      dispatch(setCurrentGeolocationData({ geolocationData: null }));
      toast({
        title: 'Search Error (IP Address)',
        variant: 'destructive',
        description:
          "We couldn't find results for the IP address you entered. Please check your input and try again. If the problem persists, the address may be invalid or not in our database.",
      });
    }
  }, [isIpAddressQueryError, ipAddressQueryError, dispatch, toast]);

  useEffect(() => {
    if (isDomainNameQuerySuccess) {
      dispatch(
        setCurrentGeolocationData({ geolocationData: domainNameQueryData }),
      );
      dispatch(setGeolocationErrorMessage({ errorMessage: null }));
      dispatch(
        addToSearchHistory({
          newEntry: {
            searchTerm: parsedDomainName!,
            data: domainNameQueryData,
            timestamp: domainNameQueryDataUpdatedAt,
          },
        }),
      );
    }
  }, [
    parsedDomainName,
    isDomainNameQuerySuccess,
    domainNameQueryData,
    domainNameQueryDataUpdatedAt,
    dispatch,
  ]);

  useEffect(() => {
    if (isDomainNameQueryError) {
      const errorMessage =
        domainNameQueryError?.message ?? JSON.stringify(domainNameQueryError);

      dispatch(setGeolocationErrorMessage({ errorMessage }));
      dispatch(setCurrentGeolocationData({ geolocationData: null }));
      toast({
        title: 'Search Error (Domain Name)',
        variant: 'destructive',
        description:
          "We couldn't find results for the domain name you entered. Please check your input and try again. If the problem persists, the domain name may be invalid or not in our database.",
      });
    }
  }, [isDomainNameQueryError, domainNameQueryError, dispatch, toast]);
};
