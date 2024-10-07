import type { GeolocationDataType } from '@/lib/definitions/geolocation';

const API_ENDPOINT = '/api/ip-geolocation';

type GetGeolocationDataParams = {
  ipAddress?: string;
  domainName?: string;
};

export async function getGeolocationData(
  params: GetGeolocationDataParams = {},
): Promise<GeolocationDataType> {
  let url = API_ENDPOINT;

  if (params.ipAddress) {
    url += `?ipAddress=${encodeURIComponent(params.ipAddress)}`;
  } else if (params.domainName) {
    url += `?domain=${encodeURIComponent(params.domainName)}`;
  }

  const response = await fetch(url, {
    headers: { 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
