import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { getGeolocationData } from '@/lib/data/geolocation';

/*
  Note: z-index
  ------------------------------------------------------------------------
  Leaflet...: z-index: 1000
  Header....: z-index: 1100
  Sidebar...: z-index: 1200
  Dialog....: z-index: 2000
  Error.tsx : z-index: 9000
  Toast.....: z-index: 9900
 */

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: initialData } = await getGeolocationData();

  return (
    <div className="flex min-h-screen flex-col">
      <Header className="h-[300px] md:h-[280px]" initialData={initialData} />
      <Sidebar className="w-[300px] sm:w-[400px]" />
      {children}
    </div>
  );
}
