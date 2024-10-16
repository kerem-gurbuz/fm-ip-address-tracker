import { selectCurrentGeolocationData } from '@/lib/redux-store/features/geolocation';
import { useAppSelector } from '@/lib/redux-store/hooks';
import { ResultItem } from './result-item';
import { ResultSeparator } from './result-separator';

export function ResultCard() {
  const geolocationData = useAppSelector(selectCurrentGeolocationData);
  if (!geolocationData) return null;

  const {
    ip,
    isp,
    location: { city, region, timezone, postalCode },
  } = geolocationData;

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
