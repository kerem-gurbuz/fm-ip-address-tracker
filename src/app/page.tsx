import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/map'), {
  ssr: false,
});

export default function HomeScreen() {
  return (
    <main id="home-screen">
      <LeafletMap />
    </main>
  );
}
