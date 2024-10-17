import { Header } from '@/components/header';
import { Sidebar } from '@/components/sidebar';
import { IPIFY_API_MOCK } from '@/lib/mocks/ipify-api.mock';

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Preload initial geolocation data
  // const { data: initialGeolocationData } = await getGeolocationData();

  const initialGeolocationData = IPIFY_API_MOCK; // For testing purposes

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
