import { z } from 'zod';

import { geolocationDataSchema } from '@/lib/definitions/geolocation';
import { searchTermSchema } from './search-term.schema';

export const searchHistoryEntrySchema = z.object({
  searchTerm: searchTermSchema,
  data: geolocationDataSchema,
  timestamp: z.string(), // new Date().toISOString()
});
