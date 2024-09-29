import { cn } from '@/lib/utils';
import { PatternBackground } from './pattern-background';
import { SearchBar } from './search-bar';

type HeaderProps = {
  className?: React.ComponentProps<'header'>['className'];
};

export function Header({ className }: HeaderProps) {
  return (
    <header
      id="header"
      className={cn('relative pt-[26px] md:pt-[33px]', className)}
    >
      <PatternBackground className="absolute inset-0 -z-50" />
      <div className="container relative h-full max-w-[1110px] px-6 xl:px-0">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-[29px] text-[26px] font-medium leading-[30px] text-white md:mb-[31px] md:text-[30px]">
            IP Address Tracker
          </h1>
          <SearchBar />
        </div>
        <div></div>
      </div>
    </header>
  );
}
