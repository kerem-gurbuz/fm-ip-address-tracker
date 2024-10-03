import { z } from 'zod';

import { searchInputSchema } from './search-input.schema';

export type SearchInputType = z.infer<typeof searchInputSchema>;
