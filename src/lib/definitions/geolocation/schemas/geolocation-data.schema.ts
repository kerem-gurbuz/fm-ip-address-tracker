import { z } from 'zod';

// IP Geolocation API
// https://geo.ipify.org/docs
/* -------------------------------------------------------------------------- */
// "Country + City" API Type Response

const locationSchema = z.object({
  country: z.string(),
  region: z.string(),
  city: z.string(),
  lat: z.number(),
  lng: z.number(),
  postalCode: z.string(),
  timezone: z.string(),
  geonameId: z.number(),
});

const asSchema = z.object({
  asn: z.number(),
  name: z.string(),
  route: z.string(),
  domain: z.string(),
  type: z.string(),
});

export const geolocationDataSchema = z
  .object({
    ip: z.string(), // IP address
    location: locationSchema, // Location
    domains: z.array(z.string()).optional(), // Domains
    as: asSchema, // Autonomous System
    isp: z.string(), // Internet Service Provider
  })
  .strict();
