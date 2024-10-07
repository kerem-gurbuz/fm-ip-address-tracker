import { z } from 'zod';

import { domainNameSchema } from '../schemas/domain-name.schema';

export type DomainNameType = z.infer<typeof domainNameSchema>;
