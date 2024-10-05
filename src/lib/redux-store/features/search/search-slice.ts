import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type {
  SearchHistoryEntryType,
  SearchHistoryType,
  SearchTermType,
} from '@/lib/definitions/search';

import {
  clearSearchHistoryFromLocalStorage,
  getSearchHistoryFromLocalStorage,
  saveSearchHistoryToLocalStorage,
} from '@/lib/utils';

const MAX_HISTORY_LENGTH_DEFAULT = 100;

type SearchState = {
  currentSearchTerm: SearchTermType | null;
  searchHistory: SearchHistoryType | [];
  searchHistoryLength: number;
  errorMessage: string | null;
};

const initialState: SearchState = {
  currentSearchTerm: null,
  searchHistory: getSearchHistoryFromLocalStorage(),
  searchHistoryLength: MAX_HISTORY_LENGTH_DEFAULT,
  errorMessage: null,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setCurrentSearchTerm: (
      state,
      action: PayloadAction<{ searchTerm: SearchTermType | null }>,
    ) => {
      const { searchTerm } = action.payload;
      state.currentSearchTerm = searchTerm;
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
    selectCurrentSearchTerm: (state) => state.currentSearchTerm,
    selectSearchHistory: (state) => state.searchHistory,
    selectSearchHistoryLength: (state) => state.searchHistoryLength,
    selectSearchErrorMessage: (state) => state.errorMessage,
  },
});

export const {
  setCurrentSearchTerm,
  setSearchHistoryLength,
  addToSearchHistory,
  clearSearchHistory,
  setSearchErrorMessage,
} = searchSlice.actions;
