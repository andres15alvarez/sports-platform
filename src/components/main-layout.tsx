import React, { ReactNode } from 'react';
import LeftSidebar from './home/left-sidebar';
import RightSidebar from './home/right-sidebar';

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="container mx-auto px-4 pt-6 lg:flex">
      <div className="hidden lg:block">
        <LeftSidebar />
      </div>
      <main className="flex-1 bg-white p-4 lg:p-6 mt-5 rounded-lg shadow">
        {children}
      </main>
      <div className="hidden lg:block">
        <RightSidebar />
      </div>
    </div>
  );
}
