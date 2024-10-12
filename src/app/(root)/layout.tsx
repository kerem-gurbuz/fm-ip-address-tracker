import { Header } from '@/components/header';
import { getGeolocationData } from '@/lib/data/geolocation';

export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: initialData } = await getGeolocationData();

  return (
    <div id="home-layout" className="flex min-h-screen flex-col">
      <Header className="h-[300px] md:h-[280px]" initialData={initialData} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
