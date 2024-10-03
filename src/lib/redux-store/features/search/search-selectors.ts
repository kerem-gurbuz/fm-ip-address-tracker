import { createSelectorCreator, weakMapMemoize } from '@reduxjs/toolkit';

import { fallbackToEmptyArray } from '@/lib/utils';
import { searchSlice } from './search-slice';

export const {
  selectCurrentSearchInput,
  selectSearchHistory,
  selectSearchHistoryLength,
  selectSearchErrorMessage,
} = searchSlice.selectors;

const createSelectorWeakMap = createSelectorCreator({
  memoize: weakMapMemoize,
  argsMemoize: weakMapMemoize,
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
