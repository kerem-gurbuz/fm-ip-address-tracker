import { z } from 'zod';

import { searchHistorySchema } from './search-history.schema';

export type SearchHistoryType = z.infer<typeof searchHistorySchema>;
