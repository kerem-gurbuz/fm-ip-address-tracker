import { z } from 'zod';

import { searchTermSchema } from './search-term.schema';

export type SearchTermType = z.infer<typeof searchTermSchema>;
