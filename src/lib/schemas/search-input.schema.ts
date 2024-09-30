import { z } from 'zod';

import { domainNameSchema } from './domain-name.schema';
import { ipAddressSchema } from './ip-address.schema';

// Zod schema for validating both IP address and domain
export const searchInputSchema = z.object({
  input: z.string().refine(
    (input) => {
      return z.union([ipAddressSchema, domainNameSchema]).safeParse(input)
        .success;
    },
    {
      message: 'Invalid input. Please enter a valid IP address or domain.',
    },
  ),
});
