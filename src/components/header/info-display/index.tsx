'use client';

import { selectCurrentSearchTerm } from '@/lib/redux-store/features/search';
import { useAppSelector } from '@/lib/redux-store/hooks';
import { cn } from '@/lib/utils';
import { InfoCard } from './info-card';
import { InfoSeparator } from './info-separator';

const MOCK_DATA = {
  ip: '8.8.8.8',
  location: {
    country: 'US',
    region: 'California',
    city: 'Mountain View',
    lat: 37.40599,
    lng: -122.078514,
    postalCode: '94043',
    timezone: '-07:00',
    geonameId: 5375481,
  },
  domains: [
    '0d2.net',
    '003725.com',
    '0f6.b0094c.cn',
    '007515.com',
    '0guhi.jocose.cn',
  ],
  as: {
    asn: 15169,
    name: 'Google LLC',
    route: '8.8.8.0/24',
    domain: 'https://about.google/intl/en/',
    type: 'Content',
  },
  isp: 'Google LLC',
};

type InfoDisplayProps = {
  className?: React.ComponentProps<'div'>['className'];
};

export function InfoDisplay({ className }: InfoDisplayProps) {
  const searchTerm = useAppSelector(selectCurrentSearchTerm);
  console.log('searchTerm:', searchTerm);

  const {
    ip,
    isp,
    location: { region, city, postalCode, timezone },
  } = MOCK_DATA;

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
      value: isp,
    },
  ];

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-y-6 rounded-[15px] bg-white p-6 pt-[26px] shadow-[0_50px_50px_-25px_rgba(0,0,0,0.10)] min-[480px]:grid-cols-2 md:gap-y-0 md:p-0 lg:grid-cols-4',
        className,
      )}
    >
      {formattedData.map(({ label, value }, index) => (
        <div
          key={index}
          className="relative inset-0 flex justify-center min-[480px]:justify-start lg:min-h-[161px]"
        >
          <InfoCard label={label} value={value} />
          {index !== formattedData.length - 1 ? (
            <InfoSeparator index={index} />
          ) : null}
        </div>
      ))}
    </div>
  );
}
