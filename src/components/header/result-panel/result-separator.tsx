import { cn } from '@/lib/utils';

type ResultSeparatorProps = {
  index: number;
};

export function ResultSeparator({ index }: ResultSeparatorProps) {
  return (
    <div
      className={cn(
        'absolute right-0 top-1/2 hidden h-full max-h-[75px] w-[1px] -translate-y-1/2 translate-x-1/2 bg-black opacity-15 lg:block',
        { 'md:block': index % 2 === 0 },
      )}
    />
  );
}
