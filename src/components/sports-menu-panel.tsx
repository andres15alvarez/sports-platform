'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const SportsMenuPanel = ({ isOpen }: { isOpen: boolean }) => {
  const [expanded, setExpanded] = useState('');
  const pathname = usePathname();

  const toggleSubmenu = (menuId: string) => {
    setExpanded(expanded === menuId ? '' : menuId);
  };

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

  // Auto-expand the current sport when on a specific sport page
  useEffect(() => {
    if (sport) {
      setExpanded(sport);
    }
  }, [sport]);

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

  if (!isOpen) return null;

  return (
    <div
      className={`fixed left-0 bottom-[60px] w-full bg-[#065f46] z-[49] max-h-[70vh] overflow-y-auto transition-transform duration-300 ease-in-out rounded-t-2xl p-4 ${
        isOpen ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      {/* League Navigation Links - Only show if on a specific league page */}
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
                <i className="bx bx-money"></i>
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
                <i className="bx bx-calendar"></i>
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
                <i className="bx bx-trophy"></i>
                <span>Standings</span>
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className="mb-4">
        <h2 className="text-lg font-bold text-white border-b border-yellow-400 pb-2 mb-3">
          Popular Leagues
        </h2>
        <ul className="space-y-3 text-white">
          <li className="flex items-center space-x-2 hover:text-yellow-300">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/e/e9/Serie_A_logo_2022.svg"
              width={20}
              height={20}
              alt="Serie A"
            />
            <Link href="/football/135">Serie A</Link>
          </li>
          <li className="flex items-center space-x-2 hover:text-yellow-300">
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/280px-Premier_League_Logo.svg.png"
              width={20}
              height={20}
              alt="Premier League"
            />
            <Link href="/football/39">Premier League</Link>
          </li>
          <li className="flex items-center space-x-2 hover:text-yellow-300">
            <Image
              src="https://upload.wikimedia.org/wikipedia/en/thumb/f/f5/UEFA_Champions_League.svg/240px-UEFA_Champions_League.svg.png"
              width={20}
              height={20}
              alt="Champions League"
            />
            <Link href="/football/2">Champions League</Link>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white border-b border-yellow-400 pb-2 mb-3">
          {sport
            ? `${sport.charAt(0).toUpperCase() + sport.slice(1)}`
            : 'All Sports'}
        </h2>
        {[
          {
            id: 'football',
            icon: 'bx-football',
            label: 'Football',
            links: [
              {
                href: '/football/39',
                label: 'Premier League',
                icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/f/f2/Premier_League_Logo.svg/280px-Premier_League_Logo.svg.png',
              },
              {
                href: '/football/135',
                label: 'Serie A',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e9/Serie_A_logo_2022.svg',
              },
              {
                href: '/football/140',
                label: 'La Liga',
                icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/LaLiga_EA_Sports_2023_Vertical_Logo.svg/250px-LaLiga_EA_Sports_2023_Vertical_Logo.svg.png',
              },
            ],
          },
          {
            id: 'basketball',
            icon: 'bx-basketball',
            label: 'Basketball',
            links: [
              {
                href: '/basketball/12',
                label: 'NBA',
                icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/03/National_Basketball_Association_logo.svg/120px-National_Basketball_Association_logo.svg.png',
              },
              {
                href: '/basketball/120',
                label: 'Euroleague',
                icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/d/d9/Turkish_Airlines_EuroLeague.svg/330px-Turkish_Airlines_EuroLeague.svg.png',
              },
            ],
          },
          {
            id: 'baseball',
            icon: 'bx-baseball',
            label: 'Baseball',
            links: [
              {
                href: '/baseball/1',
                label: 'MLB',
                icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a6/Major_League_Baseball_logo.svg/120px-Major_League_Baseball_logo.svg.png',
              },
              {
                href: '/baseball/2',
                label: 'NPB',
                icon: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/85/NPB_logo.svg/120px-NPB_logo.svg.png',
              },
            ],
          },
        ]
          .filter((sportItem) => !sport || sportItem.id === sport) // Only show current sport if on a specific sport page
          .map((sport) => (
            <div key={sport.id}>
              <button
                onClick={() => toggleSubmenu(sport.id)}
                className="w-full flex justify-between items-center text-white font-semibold"
              >
                <span className="flex items-center space-x-2">
                  <i className={`bx ${sport.icon} text-xl`} />
                  <span>{sport.label}</span>
                </span>
                <i
                  className={`bx ${expanded === sport.id ? 'bx-chevron-up' : 'bx-chevron-down'}`}
                />
              </button>
              {expanded === sport.id && (
                <ul className="ml-4 mt-2 space-y-2 text-sm text-white">
                  {sport.links.map((link) => (
                    <li
                      key={link.label}
                      className="flex items-center space-x-2 hover:text-yellow-300"
                    >
                      <Image
                        src={link.icon}
                        width={16}
                        height={16}
                        alt={link.label}
                      />
                      <Link href={link.href}>{link.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SportsMenuPanel;
