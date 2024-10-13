import { Header } from '@/components/header';
import { getGeolocationData } from '@/lib/data/geolocation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: initialData } = await getGeolocationData();

  return (
    <div className="flex min-h-screen flex-col">
      <Header className="h-[300px] md:h-[280px]" initialData={initialData} />
      {children}
    </div>
  );
}
