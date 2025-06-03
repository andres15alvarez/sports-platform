'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import useLeagues from '@/src/hooks/useLeagues';

import {
  basketballLeagues as basketballIds,
  footballLeagues as footballIds,
  baseballLeagues as baseballIds,
} from '@/src/config/leagues';

type MenuKey = 'football' | 'baseball' | 'basketball';

export default function SportsMenu() {
  const [open, setOpen] = useState<Record<MenuKey, boolean>>({
    football: false,
    baseball: false,
    basketball: false,
  });

  const {
    leagues: footballLeagues,
    loading: footballLoading,
    error: footballError,
  } = useLeagues(footballIds, 'football');

  const {
    leagues: baseballLeagues,
    loading: baseballLoading,
    error: baseballError,
  } = useLeagues(baseballIds, 'baseball');

  const {
    leagues: basketballLeagues,
    loading: basketballLoading,
    error: basketballError,
  } = useLeagues(basketballIds, 'basketball');

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
            {!footballLoading &&
              !footballError &&
              footballLeagues.map((league) => (
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
                  <Link href={`/football/${league.id}`} title={league.name}>
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
            {!baseballLoading &&
              !baseballError &&
              baseballLeagues.map((league) => (
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
                  <Link href={`/baseball/${league.id}`} title={league.name}>
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
            {!basketballLoading &&
              !basketballError &&
              basketballLeagues.map((league) => (
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
                  <Link href={`/basketball/${league.id}`} title={league.name}>
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
