import React, { ReactNode } from 'react';
import LeftSidebar from './home/left-sidebar';
import RightSidebar from './home/right-sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return React.createElement(
    'div',
    { className: 'container mx-auto px-4 pt-6 lg:flex' },
    React.createElement(
      'div',
      { className: 'hidden lg:block' },
      React.createElement(LeftSidebar, null),
    ),
    React.createElement(
      'main',
      { className: 'flex-1 bg-white p-4 lg:p-6 mt-5 rounded-lg shadow' },
      children,
    ),
    React.createElement(
      'div',
      { className: 'hidden lg:block' },
      React.createElement(RightSidebar, null),
    ),
  );
}
