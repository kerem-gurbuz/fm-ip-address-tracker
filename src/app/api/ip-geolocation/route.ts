import { type NextRequest } from 'next/server';
import { fromZodError } from 'zod-validation-error';

import { geolocationDataSchema } from '@/lib/definitions/geolocation';
import { domainNameSchema, ipAddressSchema } from '@/lib/definitions/search';

const BASE_URL = process.env.IPIFY_BASE_URL;
const API_KEY = process.env.IPIFY_API_KEY;

export async function GET(request: NextRequest) {
  // TODO: Integrate authentication and authorization checks for API calls
  // TODO: Add API rate limiting

  if (!BASE_URL || !API_KEY) {
    return Response.json(
      { error: 'Missing required environment variables.' },
      { status: 500 },
    );
  }

  const url = new URL(`${BASE_URL}/country,city`);
  url.searchParams.append('apiKey', API_KEY);

  const ipAddress = request.nextUrl.searchParams.get('ipAddress');
  const domain = request.nextUrl.searchParams.get('domain');

  if (ipAddress) {
    const result = ipAddressSchema.safeParse(ipAddress);
    if (result.success) {
      url.searchParams.append('ipAddress', result.data);
    }
  }

  if (domain) {
    const result = domainNameSchema.safeParse(domain);
    if (result.success) {
      url.searchParams.append('domain', result.data);
      url.searchParams.delete('ipAddress');
    }
  }

  const response = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    return Response.json(
      { error: `Request failed with status: ${response.status}` },
      { status: response.status },
    );
  }

  const result = geolocationDataSchema.safeParse(await response.json());

  if (!result.success) {
    const validationError = fromZodError(result.error, {
      prefix: 'Invalid data',
      prefixSeparator: ': ',
      issueSeparator: '; ',
      unionSeparator: ', or ',
      includePath: true,
    });
    return Response.json({ error: validationError.message }, { status: 500 });
  }

  console.log('api/ip-geolocation > GET > url:', url);
  console.log('api/ip-geolocation > GET > data:', result.data);

  return Response.json({ data: result.data }, { status: 200 });
}
