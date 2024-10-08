import { z } from 'zod';

import { searchHistoryEntrySchema } from '../schemas/search-history-entry.schema';

export type SearchHistoryEntryType = z.infer<typeof searchHistoryEntrySchema>;
