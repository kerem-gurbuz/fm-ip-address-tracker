import { ScrollArea } from '@/components/ui/scroll-area';
import { SEARCH_HISTORY_MOCK } from '@/lib/mocks/search-history.mock';
import { SearchHistoryCard } from './search-history-card';

export function SearchHistory() {
  return (
    <div className="flex-grow">
      <h3 className="mb-4 font-semibold text-white">Search History</h3>
      <ScrollArea type="scroll" className="h-[calc(100vh-408px)]">
        {SEARCH_HISTORY_MOCK.map((entry) => (
          <SearchHistoryCard
            key={`${entry.data.location.lat}-${entry.data.location.lng}`}
            entry={entry}
          />
        ))}
      </ScrollArea>
    </div>
  );
}
