import { z } from 'zod';

import { domainNameSchema } from '@/lib/schemas';

export type DomainNameType = z.infer<typeof domainNameSchema>;