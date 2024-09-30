import { cn } from '@/lib/utils';

type InfoSeparatorProps = {
  className?: React.ComponentProps<'div'>['className'];
  index: number;
};

export function InfoSeparator({ className, index }: InfoSeparatorProps) {
  return (
    <div
      className={cn(
        'absolute right-0 top-1/2 hidden h-full max-h-[75px] w-[1px] -translate-y-1/2 translate-x-1/2 bg-black opacity-15 lg:block',
        { 'md:block': index % 2 === 0 },
        className,
      )}
    />
  );
}
