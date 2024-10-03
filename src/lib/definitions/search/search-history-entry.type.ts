import { z } from 'zod';

import { searchHistoryEntrySchema } from './search-history-entry.schema';

export type SearchHistoryEntryType = z.infer<typeof searchHistoryEntrySchema>;
