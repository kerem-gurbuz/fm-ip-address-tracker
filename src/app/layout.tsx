import { Header } from '@/components/header';
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
        <div className="flex min-h-dvh flex-col">
          <Header className="h-[300px] w-full md:h-[280px]" />
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
