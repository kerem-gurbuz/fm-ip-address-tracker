import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { getGeolocationData } from '@/lib/data/geolocation';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: initialGeolocationData } = await getGeolocationData();

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        className="h-[300px] md:h-[280px]"
        initialGeolocationData={initialGeolocationData}
      />
      <Sidebar className="w-[300px] sm:w-[400px]" />
      {children}
    </div>
  );
}
