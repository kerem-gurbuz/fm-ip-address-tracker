import type { RootState } from '@/lib/redux-store/store';
import { createSelectorWeakMap, fallbackToEmptyArray } from '@/lib/utils';
import { searchSlice } from './search-slice';

export const {
  selectSearchHistory,
  selectSearchHistoryLength,
  selectSearchErrorMessage,
  selectCurrentSearchTerm,
} = searchSlice.selectors;

export const selectAllSearchHistoryIps = createSelectorWeakMap(
  [selectSearchHistory],
  (searchHistory) => {
    return fallbackToEmptyArray(searchHistory.map((entry) => entry.data.ip));
  },
);

export const selectSearchHistoryEntryByIp = createSelectorWeakMap(
  [selectSearchHistory, (_state: RootState, ip: string) => ip],
  (searchHistory, ip) => {
    return searchHistory.find((entry) => entry.data.ip === ip);
  },
);
