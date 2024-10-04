import { createSelectorCreator, weakMapMemoize } from '@reduxjs/toolkit';

import type { RootState } from '@/lib/redux-store/store';
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

export const selectSearchHistoryEntryByIp = (state: RootState, ip: string) => {
  const { searchHistory } = state.search;
  return searchHistory.find((entry) => entry.data.ip === ip);
};

export const selectSearchHistoryEntryByDomain = (
  state: RootState,
  domain: string,
) => {
  const { searchHistory } = state.search;
  return searchHistory.find((entry) => entry.data.domains.includes(domain));
};
 