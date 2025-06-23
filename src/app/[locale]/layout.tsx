import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/src/app/globals.css';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/src/i18n/routing';
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
  title: {
    template: '%s | Sports Platform',
    default: 'Sports Platform - Soccer, Basketball & Baseball',
  },
  description:
    'Your ultimate sports platform for soccer, basketball, and baseball matches, results, standings, and live scores.',
  keywords: [
    'sports',
    'soccer',
    'basketball',
    'baseball',
    'matches',
    'results',
    'standings',
  ],
  authors: [{ name: 'Your Company' }],
  creator: 'Your Company',
  publisher: 'Sports Platform',
  metadataBase: new URL('https://your-sports-platform.com'),
  alternates: {
    canonical: '/',
    languages: {
      en: '/en',
      es: '/es',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-sports-platform.com',
    siteName: 'Sports Platform',
    title: 'Sports Platform - Live Sports Updates',
    description:
      'Get live updates for soccer, basketball, and baseball matches.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sports Platform',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  return (
    <html lang={locale}>
      <head>
        <link
          href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <div className="bg-gray-100">
            <Header />
            <MobileNav />
            <MainLayout>{children}</MainLayout>
            <Footer />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
