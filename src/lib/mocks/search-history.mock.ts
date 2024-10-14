import type { SearchHistoryType } from '@/lib/definitions/search';

/*
  IP Geolocation API
  https://geo.ipify.org/docs

  Mock data ("Country + City" API type) for the sidebar search history list
  ------------------------------------------------------------------------
  This data represents sample search history entries that will be displayed in the sidebar. In a production environment, this data would be replaced with actual user search history from a backend service.
 */

export const SEARCH_HISTORY_MOCK: SearchHistoryType = [
  {
    searchTerm: '192.212.174.101',
    timestamp: 1684146600000, // 2023-05-15 10:30:00
    data: {
      ip: '192.212.174.101',
      location: {
        country: 'US',
        region: 'California',
        city: 'Rosemead',
        lat: 34.08057,
        lng: -118.07285,
        postalCode: '91770',
        timezone: '-07:00',
        geonameId: 5388867,
      },
      as: {
        asn: 7127,
        name: 'SCE',
        route: '192.212.0.0/15',
        domain: '',
        type: '',
      },
      isp: '',
    },
  },
  {
    searchTerm: 'google.com',
    timestamp: 1684151100000, // 2023-05-15 11:45:00
    data: {
      ip: '142.250.217.142',
      location: {
        country: 'US',
        region: 'California',
        city: 'The Greenhouse',
        lat: 37.41889,
        lng: -122.10361,
        postalCode: '',
        timezone: '-07:00',
        geonameId: 7150361,
      },
      domains: [
        '005d8ca3.cdn5.cc',
        '0157a19f.cdn5.cc',
        '060346b3.cdn5.cc',
        '0689c226.cdn5.cc',
        '086ddf32.cdn5.cc',
      ],
      as: {
        asn: 15169,
        name: 'GOOGLE',
        route: '142.250.217.0/24',
        domain: 'https://about.google/intl/en/',
        type: 'Content',
      },
      isp: 'Google LLC',
    },
  },
  {
    searchTerm: 'amazon.com',
    timestamp: 1684160400000, // 2023-05-15 14:20:00
    data: {
      ip: '52.94.236.248',
      location: {
        country: 'US',
        region: 'Virginia',
        city: 'Ashburn Village',
        lat: 39.04372,
        lng: -77.47416,
        postalCode: '',
        timezone: '-04:00',
        geonameId: 4744882,
      },
      domains: [
        'amazon.com',
        'masterbakers.in',
        'xianshusong.com',
        'keeplivingyourbestlife.com',
        'americanspirit.fun',
      ],
      as: {
        asn: 16509,
        name: 'AMAZON-02',
        route: '52.94.224.0/20',
        domain: 'https://www.amazon.com',
        type: 'Enterprise',
      },
      isp: 'Amazon.com',
    },
  },
  {
    searchTerm: '104.16.249.249',
    timestamp: 1684170200000, // 2023-05-15 17:10:00
    data: {
      ip: '104.16.249.249',
      location: {
        country: 'US',
        region: 'California',
        city: 'South Beach',
        lat: 37.78298,
        lng: -122.38969,
        postalCode: '',
        timezone: '-07:00',
        geonameId: 5326621,
      },
      domains: [
        'cloudflare-dns.com',
        'cloudflare.cloudflare-dns.com',
        'dns.byxiaorun.com',
        'winsec.cn',
      ],
      as: {
        asn: 13335,
        name: 'CLOUDFLARENET',
        route: '104.16.240.0/20',
        domain: 'https://www.cloudflare.com',
        type: 'Content',
      },
      isp: 'Cloudflare',
    },
  },
  {
    searchTerm: '157.240.241.35',
    timestamp: 1684213200000, // 2023-05-16 05:00:00
    data: {
      ip: '157.240.241.35',
      location: {
        country: 'US',
        region: 'New York',
        city: 'New York City',
        lat: 40.71427,
        lng: -74.00597,
        postalCode: '10001',
        timezone: '-04:00',
        geonameId: 5128581,
      },
      domains: [
        'edge-star-mini-shv-02-lga3.facebook.com',
        'facebook.com',
        'r3ef.com',
        'star-mini.c10r.facebook.com',
        'fiorentinajeans.com',
      ],
      as: {
        asn: 32934,
        name: 'FACEBOOK',
        route: '157.240.241.0/24',
        domain: 'https://www.meta.com/',
        type: 'Content',
      },
      isp: 'Meta',
    },
  },
  {
    searchTerm: '8.8.8.8',
    timestamp: 1684234800000, // 2023-05-16 11:00:00
    data: {
      ip: '8.8.8.8',
      location: {
        country: 'US',
        region: 'California',
        city: 'Mountain View',
        lat: 37.40599,
        lng: -122.078514,
        postalCode: '94043',
        timezone: '-07:00',
        geonameId: 5375481,
      },
      domains: [
        '0d2.net',
        '003725.com',
        '0f6.b0094c.cn',
        '007515.com',
        '0guhi.jocose.cn',
      ],
      as: {
        asn: 15169,
        name: 'Google LLC',
        route: '8.8.8.0/24',
        domain: 'https://about.google/intl/en/',
        type: 'Content',
      },
      isp: 'Google LLC',
    },
  },
];
