import { Trash2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { setCurrentGeolocationData } from '@/lib/redux-store/features/geolocation';
import {
  clearSearchHistory,
  selectSearchHistory,
} from '@/lib/redux-store/features/search';
import { useAppDispatch, useAppSelector } from '@/lib/redux-store/hooks';
import { SearchHistoryCard } from './search-history-card';

// TODO: Add confirmation dialog

export function SearchHistory() {
  const dispatch = useAppDispatch();
  const searchHistory = useAppSelector(selectSearchHistory);

  const handleClearSearchHistory = () => {
    if (window.confirm('Are you sure you want to clear the search history?')) {
      dispatch(clearSearchHistory());
      dispatch(setCurrentGeolocationData({ geolocationData: null }));
    }
  };

  return (
    <div className="flex-grow">
      <div className="mb-4 flex items-center justify-between pr-4">
        <h3 className="text-base font-semibold text-white">Search History</h3>
        <Button
          aria-label="Clear search history"
          variant="ghost"
          size="icon"
          className="h-6 w-6 bg-transparent text-gray-400 transition-colors duration-300 hover:bg-transparent hover:text-white"
          onClick={handleClearSearchHistory}
        >
          <Trash2Icon className="h-4 w-4" />
          <span className="sr-only">Clear search history</span>
        </Button>
      </div>
      <ScrollArea type="scroll" className="h-[calc(100vh-408px)]">
        {searchHistory.map((entry) => (
          <SearchHistoryCard key={entry.timestamp} entry={entry} />
        ))}
      </ScrollArea>
    </div>
  );
}
