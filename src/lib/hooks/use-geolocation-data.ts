'use client';

import { useQuery, useSuspenseQuery } from '@tanstack/react-query';

import { domainNameSchema, ipAddressSchema } from '@/lib/definitions/search';
import { useToast } from '@/lib/hooks/use-toast';
import { geolocationQueries } from '@/lib/react-query/geolocation';
import { setCurrentGeolocationData } from '@/lib/redux-store/features/geolocation';
import { selectCurrentSearchTerm } from '@/lib/redux-store/features/search';
import { useAppDispatch, useAppSelector } from '@/lib/redux-store/hooks';

/**
 * Custom hook for managing geolocation data in the application.
 *
 * This hook performs the following tasks:
 * 1. Fetches initial geolocation data based on the client's public IP address.
 * 2. Handles geolocation queries for user-entered IP addresses or domain names.
 * 3. Updates the Redux store with the fetched geolocation data.
 * 4. Displays toast notifications for errors in fetching or displaying location data.
 *
 * The hook uses React Query for data fetching and caching, and interacts with
 * the Redux store for state management. It also utilizes custom schemas for
 * input validation and a custom toast hook for notifications.
 *
 * Note: The initial geolocation query is prefetched on the server, while
 * subsequent queries (by IP or domain) are executed on the client side.
 *
 * @returns {void}
 */
export const useGeolocationData = (): void => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  // Initial geolocation data (by client request's public IP address)
  // ------------------------------------------------------------------------
  // This query was prefetched on the server...

  const {
    data: initialData,
    isSuccess,
    isError,
  } = useSuspenseQuery(geolocationQueries.initial());

  if (isSuccess) {
    dispatch(setCurrentGeolocationData({ geolocationData: initialData }));
  }

  if (isError) {
    toast({
      title: 'Location Display Error',
      variant: 'destructive',
      description:
        "We couldn't show your location on the map. Please check your internet connection and refresh the page. If this keeps happening, our support team is here to help.",
    });
  }

  // Geolocation data by search term (IP address or domain name)
  // ------------------------------------------------------------------------
  // These queries were not prefetched on the server and will not start
  // fetching until on the client.

  const searchTerm = useAppSelector(selectCurrentSearchTerm);
  const parsedIpAddress = ipAddressSchema.safeParse(searchTerm);
  const parsedDomainName = domainNameSchema.safeParse(searchTerm);

  const ipAddressQuery = useQuery(
    geolocationQueries.detailByIpAddress(
      parsedIpAddress.success ? parsedIpAddress.data : undefined,
    ),
  );

  const domainNameQuery = useQuery(
    geolocationQueries.detailByDomainName(
      parsedDomainName.success ? parsedDomainName.data : undefined,
    ),
  );

  if (ipAddressQuery.isSuccess) {
    dispatch(
      setCurrentGeolocationData({ geolocationData: ipAddressQuery.data }),
    );
  }

  if (domainNameQuery.isSuccess) {
    dispatch(
      setCurrentGeolocationData({ geolocationData: domainNameQuery.data }),
    );
  }

  if (ipAddressQuery.isError || domainNameQuery.isError) {
    toast({
      title: 'Search Error',
      variant: 'destructive',
      description:
        "We couldn't find results for the IP or domain you entered. Please check your input and try again. If the problem persists, the address may be invalid or not in our database.",
    });
  }
};
