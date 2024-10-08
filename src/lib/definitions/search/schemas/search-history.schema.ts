import { z } from 'zod';

import { searchHistoryEntrySchema } from './search-history-entry.schema';

export const searchHistorySchema = z.array(searchHistoryEntrySchema);
