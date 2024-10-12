import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/map'), {
  ssr: false,
});

export default function HomeScreen() {
  return (
    <div id="home-screen">
      <LeafletMap />
    </div>
  );
}
