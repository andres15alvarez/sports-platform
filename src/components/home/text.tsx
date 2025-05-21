import React from 'react';
import Breadcrumb from '../breadcrumb';
import Tabs from './tabs';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Odds and Predictions' }
];

const Text: React.FC = () => {
  return (
    <>
      <h1 className="text-xl sm:text-2xl font-bold mb-4">
        Sports Odds and Predictions in Real Time | OddsSite
      </h1>
      <Breadcrumb items={breadcrumbItems} />

      <section className="mb-6">
        <h2 className="text-md whitespace-nowrap sm:text-xl font-semibold text-green-700 mb-3">
          The Best Sports Odds and Predictions
        </h2>
        <p className="mb-4 text-xs sm:text-sm">
          Welcome to OddsSite, your complete portal for updated sports odds, expert predictions, and comparison of the best Italian bookmakers. Find the most convenient odds for football, tennis, basketball, and other sports events.
        </p>
        <p className="mb-4 text-xs sm:text-sm">
          Our expert analyses will help you make informed decisions on your bets, while our odds comparison tools allow you to always find the best value.
        </p>
      </section>

      <section className="mb-8">
        <div className="justify-between items-center mb-4 hidden lg:flex">
          <h2 className="text-xl font-semibold text-green-700">
            Today&apos;s Sports Predictions
          </h2>
          <a href="/all-predictions" className="text-green-600 hover:text-green-800 flex items-center">
            See all <i className="bx bx-chevron-right ml-1"></i>
          </a>
        </div>

        {/* Sport Tabs - Mobile (Scrollable) */}
        <div className="flex justify-between items-center mb-4 sm:hidden">
          <h2 className="text-md whitespace-nowrap font-semibold text-green-700">
            Today&apos;s Sports Predictions
          </h2>
          <a href="/all-predictions" className="text-green-600 hover:text-green-800 flex items-center text-sm">
            See all <i className="bx bx-chevron-right ml-1"></i>
          </a>
        </div>

        <Tabs />
      </section>
    </>
  );
};

export default Text;
