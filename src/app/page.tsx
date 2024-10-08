import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/map/map-content'), {
  ssr: false,
});

export default function HomeScreen() {
  return (
    <div
      id="home-screen"
      className="flex h-[calc(100vh-300px)] md:h-[calc(100vh-280px)]"
    >
      <LeafletMap />
    </div>
  );
}
