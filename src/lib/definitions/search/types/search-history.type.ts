import { z } from 'zod';

import { searchHistorySchema } from '../schemas/search-history.schema';

export type SearchHistoryType = z.infer<typeof searchHistorySchema>;
