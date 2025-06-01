import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import Header from '@/src/components/header';
import MainLayout from '@/src/components/main-layout';
import MobileNav from '@/src/components/mobile-nav';
import Footer from '@/src/components/footer';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Oddsides',
  description: 'Oddsides - Compare Betting Odds',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="bg-gray-100">
          <Header />
          <MobileNav />
          <MainLayout>{children}</MainLayout>
          <Footer />
        </div>
      </body>
    </html>
  );
}
