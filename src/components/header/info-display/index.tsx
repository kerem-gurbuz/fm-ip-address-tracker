import { fromZodError } from 'zod-validation-error';

import { geolocationDataSchema } from '@/lib/schemas';
import type { GeolocationDataType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { InfoCard } from './info-card';
import { InfoSeparator } from './info-separator';

// TODO: Fetch the actual data from the IP Geolocation API.
const DATA: Pick<GeolocationDataType, 'ip' | 'location' | 'isp'> = {
  ip: '192.212.174.101',
  location: {
    city: 'Brooklyn',
    region: 'NY',
    postalCode: '10001',
    timezone: '-05:00',
    country: 'US',
    geonameId: 1,
    lat: 1,
    lng: 1,
  },
  isp: 'SpaceX Starlink',
};

const infoDisplaySchema = geolocationDataSchema.pick({
  ip: true,
  location: true,
  isp: true,
});

type InfoDisplayProps = {
  className?: React.ComponentProps<'div'>['className'];
};

export function InfoDisplay({ className }: InfoDisplayProps) {
  const result = infoDisplaySchema.safeParse(DATA);

  if (!result.success) {
    const validationError = fromZodError(result.error, {
      prefix: 'Invalid data',
      prefixSeparator: ': ',
      issueSeparator: '; ',
      unionSeparator: ', or ',
      includePath: true,
    });

    // TODO: Show an error message to the user. For now, just throw an error.
    throw new Error(validationError.message);
  }

  const {
    ip,
    isp,
    location: { region, city, postalCode, timezone },
  } = result.data;

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
