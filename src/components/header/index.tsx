'use client';

import type { GeolocationDataType } from '@/lib/definitions/geolocation';
import {
  selectIsFullscreenMap,
  selectShowResultPanel,
} from '@/lib/redux-store/features/ui';
import { useAppSelector } from '@/lib/redux-store/hooks';
import { cn } from '@/lib/utils';
import { InfoDisplay } from './info-display';
import { PatternBackground } from './pattern-background';
import { SearchBar } from './search-bar';

type HeaderProps = {
  className?: React.ComponentProps<'header'>['className'];
  initialData: GeolocationDataType;
};

export function Header({ className, initialData }: HeaderProps) {
  const isFullscreenMap = useAppSelector(selectIsFullscreenMap);
  const showResultPanel = useAppSelector(selectShowResultPanel);

  if (isFullscreenMap) {
    return null;
  }

  return (
    <header
      id="header"
      className={cn('relative z-[1100] pt-[26px] md:pt-[33px]', className)}
    >
      <PatternBackground className="absolute inset-0 -z-50" />
      <div className="container h-full max-w-[1110px] px-6 xl:px-0">
        <div className="mb-6 flex flex-col items-center md:mb-12">
          <h1 className="mb-[29px] text-center text-[26px] font-medium leading-[30px] text-white md:mb-[31px] md:text-[30px]">
            IP Address Tracker
          </h1>
          <SearchBar />
        </div>
        {showResultPanel ? <InfoDisplay initialData={initialData} /> : null}
      </div>
    </header>
  );
}
