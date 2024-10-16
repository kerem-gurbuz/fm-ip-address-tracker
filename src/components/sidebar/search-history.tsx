import { Trash2Icon } from 'lucide-react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { setCurrentGeolocationData } from '@/lib/redux-store/features/geolocation';
import {
  clearSearchHistory,
  selectSearchHistory,
} from '@/lib/redux-store/features/search';
import { useAppDispatch, useAppSelector } from '@/lib/redux-store/hooks';
import { EmptyHistoryState } from './empty-history-state';
import { SearchHistoryCard } from './search-history-card';

export function SearchHistory() {
  const dispatch = useAppDispatch();
  const searchHistory = useAppSelector(selectSearchHistory);

  const handleClearSearchHistory = () => {
    dispatch(setCurrentGeolocationData({ geolocationData: null }));
    dispatch(clearSearchHistory());
  };

  return (
    <div className="flex-grow">
      <div className="mb-4 flex items-center justify-between pr-4">
        <h3 className="text-base font-semibold text-white">Search History</h3>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {searchHistory.length > 0 ? (
              <Button
                aria-label="Clear search history"
                variant="ghost"
                size="icon"
                className="h-6 w-6 bg-transparent text-gray-400 transition-colors duration-300 hover:bg-transparent hover:text-white"
              >
                <Trash2Icon className="h-4 w-4" />
                <span className="sr-only">Clear search history</span>
              </Button>
            ) : null}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                search history.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearSearchHistory}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
      {searchHistory.length > 0 ? (
        <ScrollArea type="scroll" className="h-[calc(100vh-408px)]">
          {searchHistory.map((entry) => (
            <SearchHistoryCard key={entry.timestamp} entry={entry} />
          ))}
        </ScrollArea>
      ) : (
        <EmptyHistoryState />
      )}
    </div>
  );
}
