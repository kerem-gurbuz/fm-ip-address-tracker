import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import { geolocationQueries } from '@/lib/react-query/geolocation';
import { getQueryClient } from '@/lib/react-query/get-query-client';
import { cn } from '@/lib/utils';
import { InfoDisplay } from './info-display';
import { PatternBackground } from './pattern-background';
import { SearchBar } from './search-bar';

type HeaderProps = {
  className?: React.ComponentProps<'header'>['className'];
};

export function Header({ className }: HeaderProps) {
  const queryClient = getQueryClient();

  // Prefetch initial geolocation data by client request's public IP address
  void queryClient.prefetchQuery(geolocationQueries.initial());

  return (
    <header
      id="header"
      className={cn('relative pt-[26px] md:pt-[33px]', className)}
    >
      <PatternBackground className="absolute inset-0 -z-50" />
      <div className="container h-full max-w-[1110px] px-6 xl:px-0">
        <div className="mb-6 flex flex-col items-center md:mb-12">
          <h1 className="mb-[29px] text-center text-[26px] font-medium leading-[30px] text-white md:mb-[31px] md:text-[30px]">
            IP Address Tracker
          </h1>
          <SearchBar />
        </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <InfoDisplay />
        </HydrationBoundary>
      </div>
    </header>
  );
}
