import { z } from 'zod';

import { searchInputSchema } from '@/lib/schemas';

export type SearchInputType = z.infer<typeof searchInputSchema>;
