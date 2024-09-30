import { z } from 'zod';

// Regular expression that adheres to most domain name standards, including those outlined in RFC 1035:
const domainRegex = /^(?!:\/\/)([a-zA-Z0-9-_]+\.)+[a-zA-Z]{2,6}$/;
/*
  Breakdown of the Expression:
  ------------------------------------------------------------------------
  1. ^(?!:\/\/): This ensures the string doesn't start with http:// or https://, preventing accidental validation of URLs.
  2. ([a-zA-Z0-9-_]+\.)+: Matches one or more subdomains, each consisting of letters, numbers, hyphens, or underscores, followed by a dot.
  3. [a-zA-Z]{2,6}$: Matches a top-level domain (TLD) of 2 to 6 characters consisting of letters only. 

  const validDomains = [
    "example.com",
    "www.example.com",
    "subdomain.example.com",
    "example.co.uk",
    "example.net",
    "example.org",
  ];

  const invalidDomains = [
    "example",
    "http://example.com",
    "example..com",
    "example.com.",
    "example.123",
  ];
*/

export const domainNameSchema = z.string().regex(domainRegex);