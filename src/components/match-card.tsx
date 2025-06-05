'use client';

import React from 'react';
import Link from 'next/link';

interface MatchCard {
  league: string;
  title: string;
  description: string;
  date: string;
  href: string;
}

interface MatchCardGridProps {
  matchCards: MatchCard[];
}

const MatchCardGrid: React.FC<MatchCardGridProps> = ({ matchCards }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 text-black">
      {matchCards.map(({ league, title, description, date, href }) => (
        <div
          key={title}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <span className="text-xs text-gray-500">{league}</span>
          <h3 className="font-bold text-base mt-1 mb-2">
            <Link href={href} className="hover:text-green-600">
              {title}
            </Link>
          </h3>
          <p className="text-sm text-gray-700 mb-2">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">{date}</span>
            <Link
              href={href}
              className="text-xs text-green-600 hover:underline"
            >
              Read Analysis
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchCardGrid;
