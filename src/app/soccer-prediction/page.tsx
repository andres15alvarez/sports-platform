import React from 'react';
import Footer from '@/src/components/footer';
import Header from '@/src/components/header';
import MainLayout from '@/src/components/main-layout';
import Content from '@/src/components/soccer-prediction/content';

const Page = (): React.ReactElement => {
  return React.createElement(
    'div',
    { className: 'bg-gray-100' },
    React.createElement(Header, null),
    // React.createElement(MobileNav, null),
    React.createElement(MainLayout, null, React.createElement(Content, null)),
    React.createElement(Footer, null),
  );
};

export default Page;
