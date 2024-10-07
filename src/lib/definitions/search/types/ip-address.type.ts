import { z } from 'zod';

import { ipAddressSchema } from '../schemas/ip-address.schema';

export type IpAddressType = z.infer<typeof ipAddressSchema>;
