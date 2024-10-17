import type { Metadata } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  alternates: {
    canonical: '/',
  },
  title: 'IP Address Tracker | Find Your Exact Location',
  description:
    'Track any IP address easily and get details like location, ISP, timezone, and more. Our IP Address Tracker is fast, accurate, and reliable for both professionals and casual users.',
  keywords: [
    'IP address tracker',
    'IP information',
    'IP location',
    'IP mapping',
    'find location',
    'location',
    'location information',
    'location lookup',
    'location finder',
    'geolocation',
    'geolocation information',
    'geolocation lookup',
    'geolocation finder',
    'timezone',
    'timezone information',
    'timezone lookup',
    'ISP',
    'ISP information',
    'ISP details',
  ],
  openGraph: {
    title: 'IP Address Tracker',
    description:
      'Track and locate IP addresses with detailed information including location, timezone, and ISP details',
    url: BASE_URL,
    siteName: 'IP Address Tracker',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IP Address Tracker',
    description:
      'Track and locate IP addresses with detailed information including location, timezone, and ISP details',
    site: BASE_URL,
  },
  creator: 'Kerem Gürbüz',
  authors: [
    {
      name: 'Kerem Gürbüz',
      url: 'https://www.linkedin.com/in/gurbuz-kerem/',
    },
  ],
};
