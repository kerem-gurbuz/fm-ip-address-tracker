import { type NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { geolocationDataSchema } from '@/lib/definitions/geolocation';
import { domainNameSchema, ipAddressSchema } from '@/lib/definitions/search';

// TODO: Integrate authentication and authorization checks for API calls
// TODO: Implement rate limiting to prevent abuse of the API
// TODO: Implement error logging and reporting (e.g. Sentry)

export const maxDuration = 5;

const API_URL = process.env.IPIFY_URL;
const API_KEY = process.env.IPIFY_KEY;
const API_ENDPOINT = '/api/v2/country,city';

if (!API_URL || !API_KEY) {
  throw new Error(
    'Missing required environment variables: IPIFY_URL or IPIFY_KEY',
  );
}

// const MOCK_DATA = {
//   ip: '8.8.8.8',
//   location: {
//     country: 'US',
//     region: 'California',
//     city: 'Mountain View',
//     lat: 37.40599,
//     lng: -122.078514,
//     postalCode: '94043',
//     timezone: '-07:00',
//     geonameId: 5375481,
//   },
//   domains: [
//     '0d2.net',
//     '003725.com',
//     '0f6.b0094c.cn',
//     '007515.com',
//     '0guhi.jocose.cn',
//   ],
//   as: {
//     asn: 15169,
//     name: 'Google LLC',
//     route: '8.8.8.0/24',
//     domain: 'https://about.google/intl/en/',
//     type: 'Content',
//   },
//   isp: 'Google LLC',
// };

export async function GET(request: NextRequest) {
  try {
    const searchParams = new URLSearchParams();
    searchParams.append('apiKey', API_KEY!);

    const ipAddress = request.nextUrl.searchParams.get('ipAddress');
    const domain = request.nextUrl.searchParams.get('domain');

    if (ipAddress) {
      if (!ipAddressSchema.safeParse(ipAddress).success) {
        return NextResponse.json(
          { error: 'Invalid IP address format' },
          { status: 400 },
        );
      }
      searchParams.append('ipAddress', ipAddress);
    } else if (domain) {
      if (!domainNameSchema.safeParse(domain).success) {
        return NextResponse.json(
          { error: 'Invalid domain name format' },
          { status: 400 },
        );
      }
      searchParams.append('domain', domain);
    }

    const url = `${API_URL}${API_ENDPOINT}?${searchParams.toString()}`;

    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Request failed: ${response.status} ${response.statusText}` },
        { status: response.status },
      );
    }

    const rawData = await response.json();
    const parsedData = geolocationDataSchema.parse(rawData);

    return NextResponse.json({ data: parsedData }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error, {
        prefix: 'Invalid data',
        prefixSeparator: ': ',
        issueSeparator: '; ',
        unionSeparator: ', or ',
        includePath: true,
      });
      return NextResponse.json(
        { error: validationError.message },
        { status: 422 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: 'An error occurred while fetching data' },
      { status: 500 },
    );
  }
}
