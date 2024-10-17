import { ReactQueryProvider, ReduxStoreProvider } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { rubik } from '@/lib/styles/fonts';
import '@/lib/styles/globals.css';

export { metadata } from '@/lib/seo/metadata';

/*
  NOTE: z-index
  ------------------------------------------------------------------------
  Leaflet...: z-index: 1000
  Header....: z-index: 1100
  Sidebar...: z-index: 1200
  Dialog....: z-index: 2000
  Error.tsx : z-index: 9000
  Toast.....: z-index: 9900
 */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: Preload initial data by client request's public IP address
  // preloadInitialGeolocationData();

  return (
    <html lang="en">
      <body className={`${rubik.variable} font-sans antialiased`}>
        <ReduxStoreProvider>
          <ReactQueryProvider>
            {children}
            <Toaster />
          </ReactQueryProvider>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
