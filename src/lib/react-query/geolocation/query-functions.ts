import type { GeolocationDataType } from '@/lib/definitions/geolocation';

export async function getGeolocationDataByIpAddress(
  ipAddress: string,
): Promise<GeolocationDataType> {
  const url = `/api/ip-geolocation?ipAddress=${ipAddress}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  return response.json();
}
export async function getGeolocationDataByDomainName(
  domainName: string,
): Promise<GeolocationDataType> {
  const url = `/api/ip-geolocation?domain=${domainName}`;
  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  return response.json();
}
