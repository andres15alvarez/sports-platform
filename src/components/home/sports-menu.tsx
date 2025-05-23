'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useLeagues from '@/src/hooks/basketball/useLeagues';
import useFootballLeagues from '@/src/hooks/football/useFootballLeagues';

type MenuKey = 'football' | 'baseball' | 'tennis' | 'basketball';

export default function SportsMenu() {
  const [open, setOpen] = useState<Record<MenuKey, boolean>>({
    football: false,
    baseball: false,
    tennis: false,
    basketball: false,
  });

  const { leagues, loading, error } = useLeagues();
  const {
    leagues: footballLeagues,
    loading: footballLoading,
    error: footballError,
  } = useFootballLeagues();

  const toggleMenu = (menu: MenuKey) => {
    setOpen((prev) => ({ ...prev, [menu]: !prev[menu] }));
  };

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
            {footballLoading && (
              <li className="text-gray-400">Cargando ligas...</li>
            )}
            {footballError && <li className="text-red-400">{footballError}</li>}
            {!footballLoading &&
              !footballError &&
              footballLeagues.slice(0, 10).map((league) => (
                <li
                  key={league.id}
                  className="flex items-center space-x-2 hover:text-yellow-300"
                >
                  <Image
                    src={league.logo || ''}
                    alt={league.name}
                    width={16}
                    height={16}
                    unoptimized
                  />
                  <Link
                    href={`/football/${league.id}`}
                    title={`${league.name} Odds`}
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
          <ul id="baseballMenu" className="ml-4 mt-2 space-y-1 text-sm">
            <li className="flex items-center space-x-2 hover:text-yellow-300">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Major_League_Baseball_logo.svg/200px-Major_League_Baseball_logo.svg.png"
                alt="MLB"
                width={16}
                height={16}
                unoptimized
              />
              <Link href="/baseball-prediction" title="MLB Odds">
                MLB
              </Link>
            </li>
            <li className="flex items-center space-x-2 hover:text-yellow-300">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/NPB_logo.svg/250px-NPB_logo.svg.png"
                alt="NPB"
                width={16}
                height={16}
                unoptimized
              />
              <Link href="/basket-prediction" title="NPB Odds">
                NPB
              </Link>
            </li>
            <li className="flex items-center space-x-2 hover:text-yellow-300">
              <Image
                src="https://upload.wikimedia.org/wikipedia/fr/8/85/MiLB_logo.png?20110810101641"
                alt="MiLB"
                width={16}
                height={16}
                unoptimized
              />
              <Link href="#" title="MiLB Odds">
                MiLB
              </Link>
            </li>
          </ul>
        )}
      </div>

      {/* Tennis */}
      <div>
        <button
          onClick={() => toggleMenu('tennis')}
          className="w-full flex cursor-pointer justify-between items-center text-white font-semibold focus:outline-none"
        >
          <span className="flex items-center gap-2">
            <i className="bx bx-tennis-ball text-lg"></i>Tennis
          </span>
          <i
            className={`bx ${open.tennis ? 'bx-chevron-up' : 'bx-chevron-down'}`}
          ></i>
        </button>
        {open.tennis && (
          <ul id="tennisMenu" className="ml-4 mt-2 space-y-1 text-sm">
            <li className="flex items-center space-x-2 hover:text-yellow-300">
              <Image
                src="https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/ATP_Tour_logo.svg/250px-ATP_Tour_logo.svg.png"
                alt="ATP Tour"
                width={16}
                height={16}
                unoptimized
              />
              <Link href="#" title="ATP Tour Odds">
                ATP Tour
              </Link>
            </li>
            <li className="flex items-center space-x-2 hover:text-yellow-300">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/WTA_logo_2010.svg/408px-WTA_logo_2010.svg.png"
                alt="WTA Tour"
                width={16}
                height={16}
                unoptimized
              />
              <Link href="#" title="WTA Tour Odds">
                WTA Tour
              </Link>
            </li>
            <li className="flex items-center space-x-2 hover:text-yellow-300">
              <Image
                src="https://upload.wikimedia.org/wikipedia/fr/5/59/Le_Grand_Slam_Logo.png"
                alt="Grand Slams"
                width={16}
                height={16}
                unoptimized
              />
              <Link href="#" title="Grand Slams Odds">
                Grand Slams
              </Link>
            </li>
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
            {loading && <li className="text-gray-400">Cargando ligas...</li>}
            {error && <li className="text-red-400">{error}</li>}
            {!loading &&
              !error &&
              leagues.slice(0, 10).map((league) => (
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
                    title={`${league.name} Odds`}
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
