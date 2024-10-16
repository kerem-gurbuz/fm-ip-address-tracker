import { SearchIcon } from 'lucide-react';

export function EmptyHistoryState() {
  return (
    <div className="flex h-full flex-col items-center justify-start p-4 text-center">
      <SearchIcon className="mb-4 h-12 w-12 text-gray-400" />
      <h4 className="mb-2 text-lg font-semibold text-white">
        No search history yet
      </h4>
      <p className="text-sm text-gray-400">
        Your IP address and domain searches will appear here. Start tracking to
        see your history!
      </p>
    </div>
  );
}
