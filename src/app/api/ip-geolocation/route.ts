import { type NextRequest } from 'next/server';
import { ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import { geolocationDataSchema } from '@/lib/definitions/geolocation';
import { domainNameSchema, ipAddressSchema } from '@/lib/definitions/search';

// TODO: Integrate authentication and authorization checks for API calls
// TODO: Implement rate limiting to prevent abuse of the API
// TODO: Implement error logging

export const maxDuration = 5;

const BASE_URL = process.env.IPIFY_BASE_URL;
const API_KEY = process.env.IPIFY_API_KEY;

if (!BASE_URL || !API_KEY) {
  throw new Error(
    'Missing required environment variables: IPIFY_BASE_URL or IPIFY_API_KEY',
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
        return Response.json(
          { error: 'Invalid IP address format' },
          { status: 400 },
        );
      }
      searchParams.append('ipAddress', ipAddress);
    } else if (domain) {
      if (!domainNameSchema.safeParse(domain).success) {
        return Response.json(
          { error: 'Invalid domain name format' },
          { status: 400 },
        );
      }
      searchParams.append('domain', domain);
    }

    const url = `${BASE_URL}/country,city?${searchParams.toString()}`;

    const response = await fetch(url, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      return Response.json(
        { error: `Request failed: ${response.status} ${response.statusText}` },
        { status: response.status },
      );
    }

    const rawData = await response.json();
    const parsedData = geolocationDataSchema.parse(rawData);

    return Response.json({ data: parsedData }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      const validationError = fromZodError(error, {
        prefix: 'Invalid data',
        prefixSeparator: ': ',
        issueSeparator: '; ',
        unionSeparator: ', or ',
        includePath: true,
      });
      return Response.json({ error: validationError.message }, { status: 422 });
    }

    if (error instanceof Error) {
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json(
      { error: 'An error occurred while fetching data' },
      { status: 500 },
    );
  }
}
