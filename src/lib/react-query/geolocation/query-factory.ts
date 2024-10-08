import { queryOptions, skipToken } from '@tanstack/react-query';

import { getGeolocationData } from './query-functions';

/* 
  Frontend Mentor - IP address tracker > The challenge
  ------------------------------------------------------------------------
  Your users should be able to:

  - See their own IP address on the map on the initial page load
  - Search for any IP addresses or domains and see the key information and location
 */

export const geolocationQueries = {
  all: () => ['geolocations'] as const,
  lists: () => [...geolocationQueries.all(), 'list'] as const,
  details: () => [...geolocationQueries.all(), 'detail'] as const,

  // Get (initial) geolocation data by client request's public IP address
  initial: () =>
    queryOptions({
      queryKey: [...geolocationQueries.details(), 'initial'] as const,
      queryFn: () => getGeolocationData(),
      select: ({ data }) => data,
    }),

  // Get geolocation data by IP address
  detailByIpAddress: (ipAddress?: string) =>
    queryOptions({
      queryKey: [...geolocationQueries.details(), { ipAddress }] as const,
      queryFn: ipAddress ? () => getGeolocationData({ ipAddress }) : skipToken,
      select: ({ data }) => data,
    }),

  // Get geolocation data by domain name
  detailByDomainName: (domainName?: string) =>
    queryOptions({
      queryKey: [...geolocationQueries.details(), { domainName }] as const,
      queryFn: domainName
        ? () => getGeolocationData({ domainName })
        : skipToken,
      select: ({ data }) => data,
    }),
};
