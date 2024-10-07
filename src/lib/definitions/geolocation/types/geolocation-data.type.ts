import { z } from 'zod';

import { geolocationDataSchema } from '../schemas/geolocation-data.schema';

export type GeolocationDataType = z.infer<typeof geolocationDataSchema>;
