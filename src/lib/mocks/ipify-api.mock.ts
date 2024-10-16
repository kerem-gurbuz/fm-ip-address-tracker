/* 
  IP Geolocation API
  https://geo.ipify.org/docs
  ------------------------------------------------------------------------
  "Country + City" API type features:

    - Credits cost per request: 2
    - "Country" output fields: ip, country, timezone, isp, as, domains
    - "City" output fields: city, lat, lng, postalCode, geonameId

  Making requests:

    https://geo.ipify.org/api/v2/country,city?apiKey=...&ipAddress=...

  Input parameters:

    - apiKey          : Required
    - ipAddress       : Optional
    - domain          : Optional
    - email           : Optional
    - escapedUnicode  : Optional
 */

export const IPIFY_API_MOCK = {
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
};
