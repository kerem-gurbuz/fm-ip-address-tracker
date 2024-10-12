import type { GeolocationDataType } from '@/lib/definitions/geolocation';
import { InfoItem } from './info-item';
import { InfoSeparator } from './info-separator';

type InfoCardProps = {
  data: GeolocationDataType;
};

export function InfoCard({ data }: InfoCardProps) {
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
      className="relative inset-0 flex justify-center min-[480px]:justify-start lg:min-h-[161px]"
    >
      <InfoItem index={index} label={label} value={value} />
      {index !== formattedData.length - 1 ? (
        <InfoSeparator index={index} />
      ) : null}
    </div>
  ));
}
