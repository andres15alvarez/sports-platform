'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import useLeagues from '@/src/hooks/basketball/useLeagues';
import useFootballLeagues from '@/src/hooks/football/useFootballLeagues';
import useBaseballLeagues from '@/src/hooks/baseball/useBaseballLeagues';

import {
  basketballLeagues as basketballIds,
  footballLeagues as footballIds,
  baseballLeagues as baseballLeaguesIds,
} from '@/src/config/leaguesData';

type MenuKey = 'football' | 'baseball' | 'basketball';

export default function SportsMenu() {
  const pathname = usePathname();
  const [open, setOpen] = useState<Record<MenuKey, boolean>>({
    football: false,
    baseball: false,
    basketball: false,
  });

  const { leagues, loading, error } = useLeagues();
  const {
    leagues: footballLeagues,
    loading: footballLoading,
    error: footballError,
  } = useFootballLeagues();

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

    const sport = pathSegments[0] as MenuKey | null;
    const leagueId = pathSegments[1] || null;

    return { sport, leagueId };
  };

  const { sport, leagueId } = getCurrentSportAndLeague();

  // Auto-open the current sport menu when on a specific sport page
  useEffect(() => {
    if (sport) {
      setOpen((prev) => ({
        ...prev,
        [sport]: true,
      }));
    }
  }, [sport]);

  const toggleMenu = (menu: MenuKey) => {
    setOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
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
        return 'calendars';
      if (pageType === 'standings') return 'standings';
    }
    if (pathSegments.length === 2) {
      const pageType = pathSegments[1];
      if (pageType === 'odds') return 'odds';
      if (pageType === 'calendars') return 'calendar';
      if (pageType === 'standings') return 'standings';
    }
    return null;
  };

  const currentPageType = getCurrentPageType();

  // If we're on a specific sport page, only show that sport
  if (sport) {
    const sportData = {
      football: {
        leagues: footballLeagues,
        loading: footballLoading,
        error: footballError,
        ids: footballIds,
        icon: 'bx-football',
        name: 'Football',
        path: 'football',
      },
      basketball: {
        leagues: leagues,
        loading: loading,
        error: error,
        ids: basketballIds,
        icon: 'bx-basketball',
        name: 'Basketball',
        path: 'basketball',
      },
      baseball: {
        leagues: baseballLeagues,
        loading: baseballLoading,
        error: baseballError,
        ids: baseballLeaguesIds,
        icon: 'bx-baseball',
        name: 'Baseball',
        path: 'baseball',
      },
    };

    const data = sportData[sport];

    if (!data) {
      return null;
    }

    return (
      <div id="sportsMenu">
        {/* League Navigation Links - Only show if on a specific league page */}
        {leagueId && isOnLeagueSpecificPage() && (
          <div className="mb-4">
            <h3 className="text-sm font-semibold text-yellow-300 mb-2">
              League Navigation
            </h3>
            <ul className="space-y-1 text-sm">
              <li>
                <Link
                  href={`/${sport}/${leagueId}/odds`}
                  className={`flex items-center space-x-2 py-1 px-2 rounded hover:bg-green-700 transition-colors ${
                    currentPageType === 'odds'
                      ? 'bg-green-700 text-yellow-300'
                      : ''
                  }`}
                >
                  <i className="bx bx-money text-xs"></i>
                  <span>Odds</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${sport}/${leagueId}/calendars`}
                  className={`flex items-center space-x-2 py-1 px-2 rounded hover:bg-green-700 transition-colors ${
                    currentPageType === 'calendars'
                      ? 'bg-green-700 text-yellow-300'
                      : ''
                  }`}
                >
                  <i className="bx bx-calendar text-xs"></i>
                  <span>Calendar</span>
                </Link>
              </li>
              <li>
                <Link
                  href={`/${sport}/${leagueId}/standings`}
                  className={`flex items-center space-x-2 py-1 px-2 rounded hover:bg-green-700 transition-colors ${
                    currentPageType === 'standings'
                      ? 'bg-green-700 text-yellow-300'
                      : ''
                  }`}
                >
                  <i className="bx bx-trophy text-xs"></i>
                  <span>Standings</span>
                </Link>
              </li>
            </ul>
          </div>
        )}

        <div className="mb-4">
          <button
            onClick={() => toggleMenu(sport)}
            className="w-full flex cursor-pointer justify-between items-center text-white font-semibold focus:outline-none"
          >
            <span className="flex items-center gap-2">
              <i className={`bx ${data.icon} text-lg`}></i>
              {data.name}
            </span>
            <i
              className={`bx ${open[sport] ? 'bx-chevron-up' : 'bx-chevron-down'}`}
            ></i>
          </button>
          {open[sport] && (
            <ul className="ml-4 mt-2 space-y-1 text-sm">
              {!data.loading &&
                !data.error &&
                data.leagues
                  .filter((league) => data.ids.includes(league.id))
                  .map((league) => (
                    <li
                      key={league.id}
                      className="flex items-center space-x-2 hover:text-yellow-300"
                    >
                      <Image
                        src={league.logo || '/default-logo.png'}
                        alt={league.name}
                        width={16}
                        height={16}
                        unoptimized
                      />
                      <Link
                        href={`/${data.path}/${league.id}${currentPageType ? `/${currentPageType}` : ''}`}
                        title={`${league.name}`}
                      >
                        {league.name}
                      </Link>
                    </li>
                  ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  // Show all sports if not on a specific sport page
  return (
    <div id="sportsMenu">
      {/* Football */}
      <div className="mb-4">
        <button
          onClick={() => toggleMenu('football')}
          className="w-full flex cursor-pointer justify-between items-center text-white font-semibold focus:outline-none"
        >
          <span className="flex items-center gap-2">
            <i className="bx bx-football text-lg"></i>Football
          </span>
          <i
            className={`bx ${open.football ? 'bx-chevron-up' : 'bx-chevron-down'}`}
          ></i>
        </button>
        {open.football && (
          <ul className="ml-4 mt-2 space-y-1 text-sm">
            {!footballLoading &&
              !footballError &&
              footballLeagues
                .filter((league) => footballIds.includes(league.id))
                .map((league) => (
                  <li
                    key={league.id}
                    className="flex items-center space-x-2 hover:text-yellow-300"
                  >
                    <Image
                      src={league.logo || '/default-logo.png'}
                      alt={league.name}
                      width={16}
                      height={16}
                      unoptimized
                    />
                    <Link
                      href={`/football/${league.id}`}
                      title={`${league.name}`}
                    >
                      {league.name}
                    </Link>
                  </li>
                ))}
          </ul>
        )}
      </div>

      {/* Baseball */}
      <div className="mb-4">
        <button
          onClick={() => toggleMenu('baseball')}
          className="w-full flex cursor-pointer justify-between items-center text-white font-semibold focus:outline-none"
        >
          <span className="flex items-center gap-2">
            <i className="bx bx-baseball text-lg"></i>Baseball
          </span>
          <i
            className={`bx ${open.baseball ? 'bx-chevron-up' : 'bx-chevron-down'}`}
          ></i>
        </button>
        {open.baseball && (
          <ul className="ml-4 mt-2 space-y-1 text-sm">
            {!baseballLoading &&
              !baseballError &&
              baseballLeagues
                .filter((league) => baseballLeaguesIds.includes(league.id))
                .map((league) => (
                  <li
                    key={league.id}
                    className="flex items-center space-x-2 hover:text-yellow-300"
                  >
                    <Image
                      src={league.logo || '/default-logo.png'}
                      alt={league.name}
                      width={16}
                      height={16}
                      unoptimized
                    />
                    <Link
                      href={`/baseball/${league.id}`}
                      title={`${league.name}`}
                    >
                      {league.name}
                    </Link>
                  </li>
                ))}
          </ul>
        )}
      </div>

      {/* Basketball */}
      <div className="mb-4">
        <button
          onClick={() => toggleMenu('basketball')}
          className="w-full flex cursor-pointer justify-between items-center text-white font-semibold focus:outline-none"
        >
          <span className="flex items-center gap-2">
            <i className="bx bx-basketball text-lg"></i>Basketball
          </span>
          <i
            className={`bx ${open.basketball ? 'bx-chevron-up' : 'bx-chevron-down'}`}
          ></i>
        </button>
        {open.basketball && (
          <ul className="ml-4 mt-2 space-y-1 text-sm">
            {!loading &&
              !error &&
              leagues
                .filter((league) => basketballIds.includes(league.id))
                .map((league) => (
                  <li
                    key={league.id}
                    className="flex items-center space-x-2 hover:text-yellow-300"
                  >
                    <Image
                      src={league.logo || '/default-basket-logo.png'}
                      alt={league.name}
                      width={16}
                      height={16}
                      unoptimized
                    />
                    <Link
                      href={`/basketball/${league.id}`}
                      title={`${league.name}`}
                    >
                      {league.name}
                    </Link>
                  </li>
                ))}
          </ul>
        )}
      </div>
    </div>
  );
}
