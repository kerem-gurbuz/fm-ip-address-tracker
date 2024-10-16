import { type NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { geolocationDataSchema } from '@/lib/definitions/geolocation';
import { domainNameSchema, ipAddressSchema } from '@/lib/definitions/search';

// TODO: Integrate authentication and authorization checks for API calls
// TODO: Implement error logging and reporting (e.g. Sentry)

/* By default, Next.js does not limit the execution of server-side logic (rendering a page or handling an API). Deployment platforms can use maxDuration from the Next.js build output to add specific execution limits.

https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#maxduration */
export const maxDuration = 5;

const API_KEY = process.env.IPIFY_KEY;
const API_BASE_URL = process.env.IPIFY_URL;
const API_ENDPOINT = '/api/v2/country,city';

if (!API_BASE_URL || !API_KEY) {
  throw new Error(
    'Missing required environment variables: IPIFY_URL or IPIFY_KEY',
  );
}

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

    const url = `${API_BASE_URL}${API_ENDPOINT}?${searchParams.toString()}`;

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
