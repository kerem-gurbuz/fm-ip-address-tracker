import { z } from 'zod';

import { ipAddressSchema } from './ip-address.schema';

export type IpAddressType = z.infer<typeof ipAddressSchema>;
