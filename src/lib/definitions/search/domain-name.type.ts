import { z } from 'zod';

import { domainNameSchema } from './domain-name.schema';

export type DomainNameType = z.infer<typeof domainNameSchema>;
