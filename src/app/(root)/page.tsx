import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/map'), {
  ssr: false,
});

export default function MapScreen() {
  return (
    <main id="map-screen" className="relative flex-1">
      <LeafletMap />
    </main>
  );
}
