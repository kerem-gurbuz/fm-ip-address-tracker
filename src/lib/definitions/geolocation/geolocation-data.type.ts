import { z } from 'zod';

import { geolocationDataSchema } from './geolocation-data.schema';

export type GeolocationDataType = z.infer<typeof geolocationDataSchema>;
