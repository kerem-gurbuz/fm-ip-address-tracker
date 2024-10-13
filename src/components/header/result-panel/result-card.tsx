import type { GeolocationDataType } from '@/lib/definitions/geolocation';
import { ResultItem } from './result-item';
import { ResultSeparator } from './result-separator';

type ResultCardProps = {
  data: GeolocationDataType;
};

export function ResultCard({ data }: ResultCardProps) {
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
      <ResultItem index={index} label={label} value={value} />
      {index !== formattedData.length - 1 ? (
        <ResultSeparator index={index} />
      ) : null}
    </div>
  ));
}
