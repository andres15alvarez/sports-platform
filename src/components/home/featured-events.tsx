'use client';

import Link from 'next/link';
import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import useUpcomingGames from '@/src/hooks/basketball/useUpcomingGames';

const FeaturedEvents: React.FC = () => {
  const { upcomingGames, loading, error } = useUpcomingGames();

  return (
    <section className="my-6">
      <h2 className="text-lg lg:text-xl font-semibold text-green-700 mb-3">
        Featured Sports Events
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {loading && (
          <p className="col-span-2 text-center text-gray-500">Loading...</p>
        )}

        {error && (
          <p className="col-span-2 text-center text-red-600">{error}</p>
        )}

        {!loading && !error && upcomingGames.length === 0 && (
          <p className="col-span-2 text-center text-gray-500">
            There are no upcoming games available.
          </p>
        )}

        {upcomingGames.map((game) => {
          const gameDate = new Date(game.date);
          const formattedDate = format(gameDate, 'dd/MM/yyyy - HH:mm', {
            locale: es,
          });

          return (
            <FeaturedEventCard
              key={game.id}
              league={game.league.name}
              dateTime={formattedDate}
              matchTitle={`${game.teams.home.name} vs ${game.teams.away.name}`}
              location={game.venue || 'Not available'}
            />
          );
        })}
      </div>

      <div className="text-center mt-4">
        <Link
          href="/today-events"
          className="inline-block bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
        >
          View all upcoming events
        </Link>
      </div>
    </section>
  );
};

type FeaturedCardProps = {
  league: string;
  dateTime: string;
  matchTitle: string;
  location: string;
};

const FeaturedEventCard: React.FC<FeaturedCardProps> = ({
  league,
  dateTime,
  matchTitle,
  location,
}) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">{league}</span>
        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
          {dateTime}
        </span>
      </div>

      <h3 className="font-bold text-lg mb-1">{matchTitle}</h3>
      <p className="text-sm text-gray-600">{location}</p>
    </div>
  );
};

export default FeaturedEvents;
