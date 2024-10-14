import type { GeolocationDataType } from '@/lib/definitions/geolocation';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
const API_ENDPOINT = '/api/ipify';

type GetGeolocationDataParams = {
  ipAddress?: string;
  domainName?: string;
};

export async function getGeolocationData(
  params: GetGeolocationDataParams = {},
): Promise<{ data: GeolocationDataType }> {
  let url = `${BASE_URL}${API_ENDPOINT}`;

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
