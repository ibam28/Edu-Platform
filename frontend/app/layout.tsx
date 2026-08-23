import "./globals.css";
import { defaultLocale } from "@/lib/i18n";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale}>
      <body className="flex min-h-screen flex-col antialiased">{children}</body>
    </html>
  );
}
