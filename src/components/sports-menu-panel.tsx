'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import useFootballLeagues from '@/src/hooks/football/useFootballLeagues';
import useLeagues from '@/src/hooks/basketball/useLeagues';
import useBaseballLeagues from '@/src/hooks/baseball/useBaseballLeagues';

import {
  footballLeagues as footballLeagueIds,
  basketballLeagues as basketballLeagueIds,
  baseballLeagues as baseballLeagueIds,
} from '@/src/config/leaguesData';

const SportsMenuPanel = ({ isOpen }: { isOpen: boolean }) => {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState('');

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

  const toggleSubmenu = (menuId: string) => {
    setExpanded(expanded === menuId ? '' : menuId);
  };

  const getCurrentSportAndLeague = () => {
    if (!pathname) return { sport: null, leagueId: null };
    const segments = pathname.split('/').filter(Boolean);
    const sport = segments[0] as 'football' | 'basketball' | 'baseball' | null;
    const leagueId = segments[1] || null;
    return { sport, leagueId };
  };

  const { sport, leagueId } = getCurrentSportAndLeague();

  useEffect(() => {
    if (sport) setExpanded(sport);
  }, [sport]);

  const isOnLeagueSpecificPage = () => {
    if (!sport || !leagueId || !pathname) return false;
    const segments = pathname.split('/').filter(Boolean);
    return (
      segments.length >= 3 &&
      ['odds', 'calendar', 'calendars', 'standings'].includes(segments[2])
    );
  };

  const getCurrentPageType = () => {
    if (!pathname) return null;
    const segments = pathname.split('/').filter(Boolean);
    if (segments.length >= 3) {
      const pageType = segments[2];
      if (pageType === 'odds') return 'odds';
      if (pageType === 'calendar' || pageType === 'calendars')
        return 'calendar';
      if (pageType === 'standings') return 'standings';
    }
    return null;
  };

  const currentPageType = getCurrentPageType();

  if (!isOpen) return null;

  const sportsConfig = {
    football: {
      leagues: footballLeagues,
      loading: footballLoading,
      error: footballError,
      icon: 'bx-football',
      label: 'Football',
      ids: footballLeagueIds,
      path: 'football',
    },
    basketball: {
      leagues: basketballLeagues,
      loading: basketballLoading,
      error: basketballError,
      icon: 'bx-basketball',
      label: 'Basketball',
      ids: basketballLeagueIds,
      path: 'basketball',
    },
    baseball: {
      leagues: baseballLeagues,
      loading: baseballLoading,
      error: baseballError,
      icon: 'bx-baseball',
      label: 'Baseball',
      ids: baseballLeagueIds,
      path: 'baseball',
    },
  };

  return (
    <div
      className={`fixed left-0 bottom-[60px] w-full bg-[#065f46] z-[49] max-h-[70vh] overflow-y-auto transition-transform duration-300 ease-in-out rounded-t-2xl p-4 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* League Navigation */}
      {sport && leagueId && isOnLeagueSpecificPage() && (
        <div className="mb-4">
          <h2 className="text-lg font-bold text-white border-b border-yellow-400 pb-2 mb-3">
            League Navigation
          </h2>
          <ul className="space-y-2 text-white">
            <li>
              <Link
                href={`/${sport}/${leagueId}/odds`}
                className={`flex items-center space-x-2 py-2 px-3 rounded hover:bg-green-700 transition-colors ${
                  currentPageType === 'odds'
                    ? 'bg-green-700 text-yellow-300'
                    : ''
                }`}
              >
                <i className="bx bx-money" />
                <span>Odds</span>
              </Link>
            </li>
            <li>
              <Link
                href={`/${sport}/${leagueId}/calendar`}
                className={`flex items-center space-x-2 py-2 px-3 rounded hover:bg-green-700 transition-colors ${
                  currentPageType === 'calendar'
                    ? 'bg-green-700 text-yellow-300'
                    : ''
                }`}
              >
                <i className="bx bx-calendar" />
                <span>Calendar</span>
              </Link>
            </li>
            <li>
              <Link
                href={`/${sport}/${leagueId}/standings`}
                className={`flex items-center space-x-2 py-2 px-3 rounded hover:bg-green-700 transition-colors ${
                  currentPageType === 'standings'
                    ? 'bg-green-700 text-yellow-300'
                    : ''
                }`}
              >
                <i className="bx bx-trophy" />
                <span>Standings</span>
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-lg font-bold text-white border-b border-yellow-400 pb-2 mb-3">
          {sport ? sportsConfig[sport]?.label || 'Sports' : 'All Sports'}
        </h2>

        {Object.entries(sportsConfig)
          .filter(([key]) => !sport || key === sport)
          .map(([key, config]) => {
            const { leagues, loading, error, icon, label, ids, path } = config;

            return (
              <div key={key} className="mb-4">
                <button
                  onClick={() => toggleSubmenu(key)}
                  className="w-full flex justify-between items-center text-white font-semibold"
                >
                  <span className="flex items-center space-x-2">
                    <i className={`bx ${icon} text-xl`} />
                    <span>{label}</span>
                  </span>
                  <i
                    className={`bx ${
                      expanded === key ? 'bx-chevron-up' : 'bx-chevron-down'
                    }`}
                  />
                </button>

                {expanded === key && (
                  <ul className="ml-4 mt-2 space-y-2 text-sm text-white">
                    {!loading &&
                      !error &&
                      leagues
                        .filter((league) => ids.includes(league.id))
                        .map((league) => (
                          <li
                            key={league.id}
                            className="flex items-center space-x-2 hover:text-yellow-300"
                          >
                            <Image
                              src={league.logo || '/default-logo.png'}
                              width={16}
                              height={16}
                              alt={league.name}
                              unoptimized
                            />
                            <Link href={`/${path}/${league.id}`}>
                              {league.name}
                            </Link>
                          </li>
                        ))}
                  </ul>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SportsMenuPanel;
