'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SportsMenu from './sports-menu';

import useFootballLeagues from '@/src/hooks/football/useFootballLeagues';
import useLeagues from '@/src/hooks/basketball/useLeagues';
import useBaseballLeagues from '@/src/hooks/baseball/useBaseballLeagues';
import { popularFootballLeagues } from '@/src/config/leaguesData';

const LeftSidebar: React.FC = () => {
  const pathname = usePathname();
  const {
    leagues: footballLeagues,
    loading: footballLoading,
    error: footballError,
  } = useFootballLeagues();
  const {
    leagues: basketballLeagues,
    loading: basketballLoading,
    error: basketballError,
  } = useLeagues();
  const {
    leagues: baseballLeagues,
    loading: baseballLoading,
    error: baseballError,
  } = useBaseballLeagues();

  // Determine current sport and league from URL
  const getCurrentSportAndLeague = () => {
    if (!pathname) return { sport: null, leagueId: null };

    const pathSegments = pathname.split('/').filter(Boolean);

    if (pathSegments.length === 0) return { sport: null, leagueId: null };

    const sport = pathSegments[0] as
      | 'football'
      | 'basketball'
      | 'baseball'
      | null;
    const leagueId = pathSegments[1] || null;

    return { sport, leagueId };
  };

  const { sport, leagueId } = getCurrentSportAndLeague();

  // Get popular leagues for current sport
  const getPopularLeagues = () => {
    switch (sport) {
      case 'football':
        return (
          footballLeagues?.filter((league) =>
            popularFootballLeagues.includes(league.id),
          ) || []
        );
      case 'basketball':
        return (
          basketballLeagues?.filter(
            (league) => league.id <= 50, // Assuming first 50 are popular, adjust as needed
          ) || []
        );
      case 'baseball':
        return (
          baseballLeagues?.filter(
            (league) => league.id <= 10, // Assuming first 10 are popular, adjust as needed
          ) || []
        );
      default:
        return (
          footballLeagues?.filter((league) =>
            popularFootballLeagues.includes(league.id),
          ) || []
        );
    }
  };

  const popularLeagues = getPopularLeagues();
  const isLoading = footballLoading || basketballLoading || baseballLoading;
  const hasError = footballError || basketballError || baseballError;

  // Get sport title
  const getSportTitle = () => {
    switch (sport) {
      case 'football':
        return 'Popular Leagues in Europa';
      case 'basketball':
        return 'Popular Basketball Leagues';
      case 'baseball':
        return 'Popular Baseball Leagues';
      default:
        return 'Popular Leagues in Europa';
    }
  };

  // Check if we're on a specific league page with odds, calendar, or standings
  const isOnLeagueSpecificPage = () => {
    if (!sport || !leagueId || !pathname) return false;
    const pathSegments = pathname.split('/').filter(Boolean);
    return (
      pathSegments.length >= 3 &&
      ['odds', 'calendar', 'calendars', 'standings'].includes(pathSegments[2])
    );
  };

  // Get current page type
  const getCurrentPageType = () => {
    if (!pathname) return null;
    const pathSegments = pathname.split('/').filter(Boolean);
    if (pathSegments.length >= 3) {
      const pageType = pathSegments[2];
      if (pageType === 'odds') return 'odds';
      if (pageType === 'calendar' || pageType === 'calendars')
        return 'calendar';
      if (pageType === 'standings') return 'standings';
    }
    return null;
  };

  const currentPageType = getCurrentPageType();

  return (
    <aside
      className="w-56 bg-gradient-to-b from-green-900 to-green-800 text-white h-screen sticky top-16 p-4 shadow-lg overflow-y-auto"
      aria-label="Popular leagues and sports"
    >
      {/* Popular Leagues Section */}
      {!sport && !leagueId && (
        <div className="mb-6 text-center">
          <h2 className="text-lg font-bold border-b border-yellow-400 pb-2">
            {getSportTitle()}
          </h2>
          <ul className="mt-4 space-y-3">
            {!isLoading &&
              !hasError &&
              popularLeagues.map((league) => (
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
                    href={`/${sport}/${league.id}`}
                    title={`${league.name} odds and predictions`}
                  >
                    {league.name}
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      )}

      {/* League Navigation Links - Only show if on a specific league page */}
      {sport && leagueId && isOnLeagueSpecificPage() && (
        <div className="mb-6 text-center">
          <h2 className="text-lg font-bold border-b border-yellow-400 pb-2">
            League Navigation
          </h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link
                href={`/${sport}/${leagueId}/odds`}
                className={`block py-2 px-3 rounded hover:bg-green-700 transition-colors ${
                  currentPageType === 'odds'
                    ? 'bg-green-700 text-yellow-300'
                    : ''
                }`}
              >
                <i className="bx bx-money mr-2"></i>
                Odds
              </Link>
            </li>
            <li>
              <Link
                href={`/${sport}/${leagueId}/calendar`}
                className={`block py-2 px-3 rounded hover:bg-green-700 transition-colors ${
                  currentPageType === 'calendar'
                    ? 'bg-green-700 text-yellow-300'
                    : ''
                }`}
              >
                <i className="bx bx-calendar mr-2"></i>
                Calendar
              </Link>
            </li>
            <li>
              <Link
                href={`/${sport}/${leagueId}/standings`}
                className={`block py-2 px-3 rounded hover:bg-green-700 transition-colors ${
                  currentPageType === 'standings'
                    ? 'bg-green-700 text-yellow-300'
                    : ''
                }`}
              >
                <i className="bx bx-trophy mr-2"></i>
                Standings
              </Link>
            </li>
          </ul>
        </div>
      )}

      {/* All Sports - Only show if not on a specific sport page or show only current sport */}
      <div className="mb-4 text-center">
        <h2 className="text-lg font-bold border-b border-yellow-400 pb-2">
          {sport
            ? `${sport.charAt(0).toUpperCase() + sport.slice(1)}`
            : 'All Sports'}
        </h2>
      </div>

      <SportsMenu />
    </aside>
  );
};

export default LeftSidebar;
