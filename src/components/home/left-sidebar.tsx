'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SportsMenu from './sports-menu';

const LeftSidebar: React.FC = () => {
  return (
    <aside
      className="w-56 bg-gradient-to-b from-green-900 to-green-800 text-white h-screen sticky top-16 p-4 shadow-lg overflow-y-auto"
      aria-label="Popular leagues and sports"
    >
      {/* Popular Leagues */}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-bold border-b border-yellow-400 pb-2">
          Popular Leagues in Italy
        </h2>
        <ul className="mt-4 space-y-3">
          <li className="flex items-center justify-center space-x-2 hover:text-yellow-300">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Serie_A_logo_2022.svg"
              alt="Serie A logo"
              width={20}
              height={20}
              unoptimized 
            />
            <Link href="/leagues/serie-a" title="Serie A odds and predictions">
              Serie A
            </Link>
          </li>
          <li className="flex items-center justify-center space-x-2 hover:text-yellow-300">
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg"
              alt="Premier League logo"
              width={20}
              height={20}
              unoptimized 
            />
            <Link href="/leagues/premier-league" title="Premier League odds and predictions">
              Premier League
            </Link>
          </li>
          <li className="flex items-center justify-center space-x-2 hover:text-yellow-300">
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/f/f5/UEFA_Champions_League.svg"
              alt="Champions League logo"
              width={20}
              height={20}
              unoptimized 
            />
            <Link href="/leagues/champions-league" title="Champions League odds and predictions">
              Champions League
            </Link>
          </li>
        </ul>
      </div>

      {/* All Sports */}
      <div className="mb-4 text-center">
        <h2 className="text-lg font-bold border-b border-yellow-400 pb-2">
          All Sports
        </h2>
      </div>

      <SportsMenu /> 
    </aside>
  );
};

export default LeftSidebar;
