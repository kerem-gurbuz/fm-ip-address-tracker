import { Header } from '@/components/header';
import { ReduxStoreProvider } from '@/components/redux-store-provider';
import { rubik } from '@/lib/styles/fonts';
import '@/lib/styles/globals.css';

export { metadata } from '@/lib/seo/metadata';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} font-sans antialiased`}>
        <ReduxStoreProvider>
          <div className="flex min-h-dvh flex-col">
            <Header className="h-[300px] w-full md:h-[280px]" />
            <main className="flex-1">{children}</main>
          </div>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}
