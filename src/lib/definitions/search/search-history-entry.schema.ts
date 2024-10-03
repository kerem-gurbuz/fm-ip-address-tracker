import { z } from 'zod';

import { geolocationDataSchema } from '@/lib/definitions/geolocation';
import { searchInputSchema } from './search-input.schema';

export const searchHistoryEntrySchema = z.object({
  searchTerm: searchInputSchema,
  data: geolocationDataSchema,
  timestamp: z.string(), // new Date().toISOString()
});
