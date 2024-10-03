import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  SearchHistoryEntryType,
  SearchHistoryType,
  SearchInputType,
} from '@/lib/definitions/search';

import {
  clearSearchHistoryFromLocalStorage,
  getSearchHistoryFromLocalStorage,
  saveSearchHistoryToLocalStorage,
} from '@/lib/utils';

const MAX_HISTORY_LENGTH_DEFAULT = 100;

type SearchState = {
  currentSearchInput: SearchInputType | null;
  searchHistory: SearchHistoryType | [];
  searchHistoryLength: number;
  errorMessage: string | null;
};

const initialState: SearchState = {
  currentSearchInput: null,
  searchHistory: getSearchHistoryFromLocalStorage(),
  searchHistoryLength: MAX_HISTORY_LENGTH_DEFAULT,
  errorMessage: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCurrentSearchInput: (
      state,
      action: PayloadAction<{ searchInput: SearchInputType | null }>,
    ) => {
      const { searchInput } = action.payload;
      state.currentSearchInput = searchInput;
    },
    setSearchHistoryLength: (
      state,
      action: PayloadAction<{ newLength: number }>,
    ) => {
      const { newLength } = action.payload;
      if (newLength > 0) {
        const updatedHistory = state.searchHistory.slice(0, newLength);
        state.searchHistory = updatedHistory;
        state.searchHistoryLength = newLength;
        saveSearchHistoryToLocalStorage(updatedHistory);
      } else {
        state.searchHistory = [];
        state.searchHistoryLength = 0;
        clearSearchHistoryFromLocalStorage();
      }
    },
    addToSearchHistory: (
      state,
      action: PayloadAction<{ newEntry: SearchHistoryEntryType }>,
    ) => {
      if (state.searchHistoryLength === 0) {
        return;
      }
      const { newEntry } = action.payload;
      const updatedHistory = [
        newEntry,
        ...state.searchHistory.filter(
          (entry) => entry.data.ip !== newEntry.data.ip,
        ),
      ].slice(0, state.searchHistoryLength);
      state.searchHistory = updatedHistory;
      saveSearchHistoryToLocalStorage(updatedHistory);
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
      clearSearchHistoryFromLocalStorage();
    },
    setSearchErrorMessage: (
      state,
      action: PayloadAction<{ errorMessage: string | null }>,
    ) => {
      const { errorMessage } = action.payload;
      state.errorMessage = errorMessage;
    },
  },
  selectors: {
    selectCurrentSearchInput: (state) => state.currentSearchInput,
    selectSearchHistory: (state) => state.searchHistory,
    selectSearchHistoryLength: (state) => state.searchHistoryLength,
    selectSearchErrorMessage: (state) => state.errorMessage,
  },
});

export const {
  setCurrentSearchInput,
  setSearchHistoryLength,
  addToSearchHistory,
  clearSearchHistory,
  setSearchErrorMessage,
} = searchSlice.actions;
