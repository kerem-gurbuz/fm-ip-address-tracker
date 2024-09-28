import { rubik } from "@/lib/styles/fonts";
import "@/lib/styles/globals.css";

export { metadata } from "@/lib/seo/metadata";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${rubik.variable} antialiased font-sans`}>
        {children}
      </body>
    </html>
  );
}
