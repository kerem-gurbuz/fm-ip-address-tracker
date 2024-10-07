import { z } from 'zod';

import { searchTermSchema } from '../schemas/search-term.schema';

export type SearchTermType = z.infer<typeof searchTermSchema>;
