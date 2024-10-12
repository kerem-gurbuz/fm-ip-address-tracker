import { ReactQueryProvider, ReduxStoreProvider } from '@/components/providers';
import { Toaster } from '@/components/ui/toaster';
import { preloadInitialGeolocationData } from '@/lib/data/geolocation';
import { rubik } from '@/lib/styles/fonts';
import '@/lib/styles/globals.css';

export { metadata } from '@/lib/seo/metadata';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Preload initial data by client request's public IP address
  preloadInitialGeolocationData();

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
