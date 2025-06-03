'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import SportsMenu from './sports-menu';

import useFootballLeagues from '@/src/hooks/football/useFootballLeagues';
import { popularFootballLeagues } from '@/src/config/leagues';

const LeftSidebar: React.FC = () => {
  const { leagues, loading, error } = useFootballLeagues();

  const popularLeagues =
    leagues?.filter((league) => popularFootballLeagues.includes(league.id)) ||
    [];

  return (
    <aside
      className="w-56 bg-gradient-to-b from-green-900 to-green-800 text-white h-screen sticky top-16 p-4 shadow-lg overflow-y-auto"
      aria-label="Popular leagues and sports"
    >
      {/* Popular Leagues in Europa */}
      <div className="mb-6 text-center">
        <h2 className="text-lg font-bold border-b border-yellow-400 pb-2">
          Popular Leagues in Europa
        </h2>
        {error && <p className="text-red-500">Error al cargar ligas.</p>}
        {!loading && !error && (
          <ul className="mt-4 space-y-3">
            {popularLeagues.length === 0 && (
              <li>No hay ligas populares disponibles.</li>
            )}
            {popularLeagues.map((league) => (
              <li
                key={league.id}
                className="flex items-center justify-center space-x-2 hover:text-yellow-300"
              >
                <Image
                  src={league.logo || '/default-logo.png'}
                  alt={league.name}
                  width={20}
                  height={20}
                  unoptimized
                />
                <Link
                  href={`/football/${league.id}`}
                  title={`${league.name} odds and predictions`}
                >
                  {league.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
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
