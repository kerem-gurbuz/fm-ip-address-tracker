import { queryOptions } from '@tanstack/react-query';

import {
  getGeolocationDataByDomainName,
  getGeolocationDataByIpAddress,
} from './query-functions';

export const geolocationQueries = {
  all: () => ['geolocations'] as const,
  lists: () => [...geolocationQueries.all(), 'list'] as const,
  details: () => [...geolocationQueries.all(), 'detail'] as const,
  detailByIpAddress: (ipAddress: string) =>
    queryOptions({
      queryKey: [...geolocationQueries.details(), { ipAddress }] as const,
      queryFn: () => getGeolocationDataByIpAddress(ipAddress),
    }),
  detailByDomainName: (domainName: string) =>
    queryOptions({
      queryKey: [...geolocationQueries.details(), { domainName }] as const,
      queryFn: () => getGeolocationDataByDomainName(domainName),
    }),
};
