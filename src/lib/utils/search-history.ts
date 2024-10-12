import type { SearchHistoryType } from '@/lib/definitions/search';

const SEARCH_HISTORY_KEY = 'geolocation_search_history';

export const getSearchHistoryFromLocalStorage = (): SearchHistoryType => {
  if (typeof localStorage === 'undefined') return [];

  try {
    const storedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    return storedHistory ? JSON.parse(storedHistory) : [];
  } catch (error) {
    console.error('Error retrieving search history:', error);
    return [];
  }
};

export const saveSearchHistoryToLocalStorage = (
  history: SearchHistoryType,
): void => {
  if (typeof localStorage === 'undefined') return;

  try {
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Error saving search history:', error);
  }
};

export const clearSearchHistoryFromLocalStorage = (): void => {
  if (typeof localStorage === 'undefined') return;

  try {
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  } catch (error) {
    console.error('Error clearing search history:', error);
  }
};
