import { cn } from '@/lib/utils';

import type { GeolocationDataType } from '@/lib/definitions/geolocation';
import { InfoItem } from './info-item';
import { InfoSeparator } from './info-separator';

type InfoCardProps = {
  className?: React.ComponentProps<'div'>['className'];
  data: GeolocationDataType;
};

export function InfoCard({ className, data }: InfoCardProps) {
  const { ip, location, isp } = data;
  const { city, region, timezone, postalCode } = location;

  const formattedData = [
    {
      label: 'IP Address',
      value: ip,
    },
    {
      label: 'Location',
      value: `${city}, ${region} ${postalCode ? `(${postalCode})` : ''}`.trim(),
    },
    {
      label: 'Timezone',
      value: `UTC ${timezone}`,
    },
    {
      label: 'ISP',
      value: isp || '-',
    },
  ];

  return formattedData.map(({ label, value }, index) => (
    <div
      key={index}
      className={cn(
        'relative inset-0 flex justify-center min-[480px]:justify-start lg:min-h-[161px]',
        className,
      )}
    >
      <InfoItem index={index} label={label} value={value} />
      {index !== formattedData.length - 1 ? (
        <InfoSeparator index={index} />
      ) : null}
    </div>
  ));
}
