import { z } from 'zod';

import { geolocationDataSchema } from '@/lib/schemas';

export type GeolocationDataType = z.infer<typeof geolocationDataSchema>;
