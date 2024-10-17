import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'IP Address Tracker',
    short_name: 'IP Address Tracker',
    description:
      'Track any IP address easily and get details like location, ISP, timezone, and more. Our IP Address Tracker is fast, accurate, and reliable for both professionals and casual users.',
    start_url: '/',
    display: 'standalone',
  };
}
