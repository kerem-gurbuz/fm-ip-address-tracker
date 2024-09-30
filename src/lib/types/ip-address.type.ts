import { z } from 'zod';

import { ipAddressSchema } from '@/lib/schemas';

export type IpAddressType = z.infer<typeof ipAddressSchema>;