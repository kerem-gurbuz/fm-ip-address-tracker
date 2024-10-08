import { createSelectorCreator, weakMapMemoize } from '@reduxjs/toolkit';

import type { RootState } from '@/lib/redux-store/store';
import { fallbackToEmptyArray } from '@/lib/utils';
import { searchSlice } from './search-slice';

export const {
  selectSearchHistory,
  selectSearchHistoryLength,
  selectSearchErrorMessage,
  selectCurrentSearchTerm,
} = searchSlice.selectors;

const createSelectorWeakMap = createSelectorCreator({
  argsMemoize: weakMapMemoize,
  memoize: weakMapMemoize,
  devModeChecks: {
    inputStabilityCheck: 'always',
    identityFunctionCheck: 'always',
  },
});

export const selectAllSearchHistoryIps = createSelectorWeakMap(
  [selectSearchHistory],
  (searchHistory) => {
    return fallbackToEmptyArray(searchHistory.map((entry) => entry.data.ip));
  },
);

export const selectAllSearchHistoryDomains = createSelectorWeakMap(
  [selectSearchHistory],
  (searchHistory) => {
    return fallbackToEmptyArray(
      searchHistory.map((entry) => entry.data.domains.flat()),
    );
  },
);

export const selectSearchHistoryEntryByIp = createSelectorWeakMap(
  [selectSearchHistory, (_state: RootState, ip: string) => ip],
  (searchHistory, ip) => {
    return searchHistory.find((entry) => entry.data.ip === ip);
  },
);

export const selectSearchHistoryEntryByDomain = createSelectorWeakMap(
  [selectSearchHistory, (_state: RootState, domain: string) => domain],
  (searchHistory, domain) => {
    return searchHistory.find((entry) => entry.data.domains.includes(domain));
  },
);
