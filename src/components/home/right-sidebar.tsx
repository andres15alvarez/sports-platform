'use client';

import React from 'react';
import Image from 'next/image';
import Carousel from './carousel';

import useOdds from '@/src/hooks/basketball/useOdds';
import useBaseballOdds from '@/src/hooks/baseball/useBaseballOdds';
import useFootballOdds from '@/src/hooks/football/useFootballOdds';

import { MatchData } from '@/src/types/odds';

type Offer = {
  name: string;
  bonus: string;
  logo: string;
  link: string;
  odds: string;
};

const offers: Offer[] = [
  {
    name: 'Bet365',
    bonus: '€100 Bonus',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Bet365_Logo.svg/442px-Bet365_Logo.svg.png',
    link: 'https://affiliate.bet365.com/?aff=123',
    odds: '1.85',
  },
  {
    name: 'William Hill',
    bonus: '€120 Bonus',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/William_Hill_logo.png/250px-William_Hill_logo.png',
    link: 'https://affiliate.williamhill.com/?aff=456',
    odds: '2.10',
  },
  {
    name: 'Unibet',
    bonus: '€80 Bonus',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Unibet-Logo-white.jpg/250px-Unibet-Logo-white.jpg',
    link: 'https://affiliate.unibet.com/?aff=789',
    odds: '1.95',
  },
  {
    name: 'Pinnacle',
    bonus: '€90 Bonus',
    logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/7/72/Pinnacle_Logo.jpeg/250px-Pinnacle_Logo.jpeg',
    link: 'https://affiliate.pinnacle.com/?aff=321',
    odds: '2.00',
  },
  {
    name: 'Betway',
    bonus: '€75 Bonus',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Betway_Logo_%28black%29.svg/512px-Betway_Logo_%28black%29.svg.png',
    link: 'https://affiliate.betway.com/?aff=654',
    odds: '1.90',
  },
];

const RightSidebar: React.FC = () => {
  //// LIGAS Y TEMPORADAS
  const { odds: oddsBasket1 } = useOdds({ league: '12', season: '2024-2025' });
  const { odds: oddsBasket2 } = useOdds({ league: '117', season: '2024-2025' });
  const { odds: oddsBase1 } = useBaseballOdds({ league: '1', season: '2025' });
  const { odds: oddsBase2 } = useBaseballOdds({ league: '21', season: '2025' });
  const { odds: oddsFoot1 } = useFootballOdds({ league: '71', season: '2025' });
  const { odds: oddsFoot2 } = useFootballOdds({
    league: '909',
    season: '2025',
  });

  const getLatestGames = (
    oddsArray: MatchData[] | null | undefined,
  ): MatchData[] => {
    if (!oddsArray) return [];
    return oddsArray
      .filter((o) => o?.game?.status?.short !== 'FT')
      .sort((a, b) => (b?.game?.timestamp || 0) - (a?.game?.timestamp || 0))
      .slice(0, 2);
  };

  const basketballGames: MatchData[] = getLatestGames([
    ...(oddsBasket1 || []),
    ...(oddsBasket2 || []),
  ]);
  const baseballGames: MatchData[] = getLatestGames([
    ...(oddsBase1 || []),
    ...(oddsBase2 || []),
  ]);
  const footballGames: MatchData[] = getLatestGames([
    ...(oddsFoot1 || []),
    ...(oddsFoot2 || []),
  ]);

  return (
    <aside
      className="w-64 bg-white h-full"
      aria-label="Bookmaker offers and predictions"
    >
      <h2 className="text-green-700 font-semibold mb-6">Most Visited Events</h2>

      <Carousel />
      {/* Top Bookmaker Offers */}
      <div className="mt-6 space-y-4">
        <h2 className="text-green-700 font-semibold">Top Bookmaker Offers</h2>
        <div className="space-y-2 text-black">
          {offers.map((offer, index) => (
            <div
              key={index}
              className="flex items-center justify-between bg-green-100 hover:bg-green-200 transition-colors duration-300 px-4 py-2 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <Image
                  src={offer.logo}
                  alt={`${offer.name} logo`}
                  width={80}
                  height={32}
                  className="object-contain"
                  unoptimized
                />
                <span className="text-sm font-bold">{offer.bonus}</span>
              </div>
              <a
                href={offer.link}
                target="_blank"
                rel="nofollow noopener noreferrer"
                className="text-green-600 font-semibold hover:underline"
              >
                {offer.odds}
              </a>
            </div>
          ))}
        </div>

        {/* Latest Predictions */}
        <div className="mt-6">
          <h2 className="text-green-700 font-semibold mb-2">
            Latest Predictions
          </h2>
          <ul className="space-y-1 text-black">
            {basketballGames.map((o, i) => (
              <li
                key={`basket-${i}`}
                className="block hover:bg-green-50 transition-colors rounded px-3 py-2"
              >
                🏀 {o?.game?.teams?.home?.name} vs {o?.game?.teams?.away?.name}:{' '}
                <span className="italic text-green-800">
                  Win{' '}
                  {o?.bookmakers?.[0]?.bets?.[0]?.values?.[0]?.value || 'N/A'}
                </span>
              </li>
            ))}

            {baseballGames.map((o, i) => (
              <li
                key={`base-${i}`}
                className="block hover:bg-green-50 transition-colors rounded px-3 py-2"
              >
                ⚾ {o?.game?.teams?.home?.name} vs {o?.game?.teams?.away?.name}:{' '}
                <span className="italic text-green-800">
                  Win{' '}
                  {o?.bookmakers?.[0]?.bets?.[0]?.values?.[0]?.value || 'N/A'}
                </span>
              </li>
            ))}

            {footballGames.map((o, i) => {
              const homeTeam = o?.teams?.home?.name || 'Home';
              const awayTeam = o?.teams?.away?.name || 'Away';
              const prediction =
                o?.bookmakers?.[0]?.bets?.[0]?.values?.[0]?.value || 'N/A';

              return (
                <li
                  key={`foot-${i}`}
                  className="block hover:bg-green-50 transition-colors rounded px-3 py-2"
                >
                  ⚽ {homeTeam} vs {awayTeam}:{' '}
                  <span className="italic text-green-800">
                    Win {prediction}
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default RightSidebar;
