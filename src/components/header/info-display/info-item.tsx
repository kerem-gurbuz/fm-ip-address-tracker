import { cn } from '@/lib/utils';

type InfoItemProps = {
  className?: React.ComponentProps<'div'>['className'];
  index: number;
  label: string;
  value: string;
};

export function InfoItem({ className, index, label, value }: InfoItemProps) {
  return (
    <div
      className={cn(
        'space-y-[7px] text-center text-very-dark-gray min-[480px]:text-left md:space-y-[13px] md:px-[32px] lg:py-[37px]',
        {
          'md:pb-[18.5px] md:pt-[37px]': index < 2,
          'md:pb-[37px] md:pt-[18.5px]': index >= 2,
        },
        className,
      )}
    >
      <h2 className="text-[10px] font-bold uppercase leading-[12px] tracking-[1.46px] opacity-50 md:text-[12px] md:leading-[14px] md:tracking-[1.75px]">
        {label}
      </h2>
      <p className="text-[20px] font-medium leading-[24px] md:text-[26px] md:leading-[30px]">
        {value}
      </p>
    </div>
  );
}
