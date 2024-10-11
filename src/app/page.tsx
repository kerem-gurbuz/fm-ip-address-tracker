import dynamic from 'next/dynamic';

const LeafletMap = dynamic(() => import('@/components/map'), {
  ssr: false,
});

export default function HomeScreen() {
  const number = Math.random();
  console.log('number:', number);
  if (number < 0.5) {
    throw new Error('Function not implemented.');
  }

  return (
    <div
      id="home-screen"
      className="flex min-h-[calc(100vh-300px)] md:min-h-[calc(100vh-280px)]"
    >
      <LeafletMap />
    </div>
  );
}
