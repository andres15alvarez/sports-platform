import React from 'react';
import Tabs from './tabs';
import Link from 'next/link';

const TodayPredictions: React.FC = () => {
  return (
    <section className="mb-8">
      <div className="justify-between items-center mb-4 hidden lg:flex">
        <h2 className="text-xl font-semibold text-green-700">
          Today&apos;s Sports Predictions
        </h2>
        <Link
          href="/all-predictions"
          className="text-green-600 hover:text-green-800 flex items-center"
        >
          See all <i className="bx bx-chevron-right ml-1"></i>
        </Link>
      </div>

      {/* Sport Tabs - Mobile (Scrollable) */}
      <div className="flex justify-between items-center mb-4 sm:hidden">
        <h2 className="text-md whitespace-nowrap font-semibold text-green-700">
          Today&apos;s Sports Predictions
        </h2>
        <Link
          href="/all-predictions"
          className="text-green-600 hover:text-green-800 flex items-center text-sm"
        >
          See all <i className="bx bx-chevron-right ml-1"></i>
        </Link>
      </div>

      <Tabs />
    </section>
  );
};

export default TodayPredictions;
