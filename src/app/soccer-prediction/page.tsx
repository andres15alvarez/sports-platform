import React from 'react';
import Footer from '@/src/components/footer';
import Header from '@/src/components/header';
import MainLayout from '@/src/components/main-layout';
import MobileNav from '@/src/components/mobile-nav';
import Content from '@/src/components/soccer-prediction/content';

export default function Page() {
  return (
    <div className="bg-gray-100">
      <Header />
      <MobileNav />
      <MainLayout>
        <Content />
      </MainLayout>
      <Footer />
    </div>
  );
}
