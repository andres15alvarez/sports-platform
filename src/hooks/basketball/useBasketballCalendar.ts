import { useState, useEffect, useCallback } from 'react';
import {
  CalendarFixture,
  UseCalendarHook,
  League,
  ViewType,
} from '@/src/types/sportCalendar';

interface BasketballGameResponse {
  id: number;
  date: string;
  timezone: string;
  timestamp: number;
  status?: {
    long: string;
    short: string;
  };
  venue?: {
    id: number;
    name: string;
  };
  country?: {
    name: string;
    flag?: string;
  };
  league?: {
    id: number;
    name: string;
    logo?: string;
    season?: string;
    type?: string;
  };
  teams?: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  scores?: {
    home: {
      total: number;
      quarter_1?: number;
      quarter_2?: number;
      overtime?: number;
    };
    away: {
      total: number;
      quarter_1?: number;
      quarter_2?: number;
      overtime?: number;
    };
  };
  periods?: {
    first: number | null;
    second: number | null;
  };
}

const useBasketballCalendar = (): UseCalendarHook => {
  const [fixtures, setFixtures] = useState<CalendarFixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState(12); // NBA
  const [viewType, setViewType] = useState<ViewType>('upcoming');

  const leagues: League[] = [
    { id: 12, name: 'NBA', country: 'USA' },
    { id: 13, name: 'NCAA', country: 'USA' },
    { id: 14, name: 'EuroLeague', country: 'Europe' },
    { id: 15, name: 'Liga ACB', country: 'Spain' },
    { id: 16, name: 'Lega Basket Serie A', country: 'Italy' },
    { id: 17, name: 'LNB Pro A', country: 'France' },
    { id: 18, name: 'BBL', country: 'Germany' },
    { id: 19, name: 'NBL', country: 'Australia' },
  ];

  const fetchFixtures = useCallback(
    async (leagueId: number) => {
      setLoading(true);
      setError(null);
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEYY;
        if (!apiKey) throw new Error('API key not configured');

        const season = '2024-2025';
        const allFixtures = [];

        for (let i = -7; i <= 30; i++) {
          const targetDate = new Date();
          targetDate.setDate(targetDate.getDate() + i);
          const dateString = targetDate.toISOString().split('T')[0];

          await new Promise((resolve) => setTimeout(resolve, 100));

          const response = await fetch(
            `https://v1.basketball.api-sports.io/games?league=${leagueId}&season=${season}&date=${dateString}`,
            {
              method: 'GET',
              headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'v1.basketball.api-sports.io',
              },
            },
          );

          if (!response.ok) {
            console.warn(
              `Could not fetch basketball data for ${dateString}: ${response.statusText}`,
            );
            continue;
          }

          const data = await response.json();
          if (data.response && data.response.length > 0) {
            allFixtures.push(...data.response);
          }
        }

        if (allFixtures.length > 0) {
          const sortedFixtures = allFixtures.sort(
            (a: BasketballGameResponse, b: BasketballGameResponse) =>
              new Date(a.date).getTime() - new Date(b.date).getTime(),
          );

          const adaptedFixtures: CalendarFixture[] = sortedFixtures.map(
            (game: BasketballGameResponse) => ({
              fixture: {
                id: game.id,
                referee: null,
                timezone: game.timezone,
                date: game.date,
                timestamp: game.timestamp,
                periods: {
                  first: game.periods?.first || null,
                  second: game.periods?.second || null,
                },
                venue: {
                  id: game.venue?.id || null,
                  name: game.venue?.name || 'N/A',
                  city: game.country?.name || 'N/A',
                },
                status: {
                  long: game.status?.long || 'Unknown',
                  short: game.status?.short || 'Unknown',
                  elapsed: null,
                },
              },
              league: {
                id: game.league?.id || selectedLeague,
                name: game.league?.name || 'Unknown',
                country: game.country?.name || 'Unknown',
                logo: game.league?.logo || '',
                flag: game.country?.flag || null,
                season: game.league?.season || season,
                round: game.league?.type || 'Regular Season',
              },
              teams: {
                home: {
                  id: game.teams?.home?.id || 0,
                  name: game.teams?.home?.name || 'Unknown',
                  logo: game.teams?.home?.logo || '',
                  winner:
                    (game.scores?.home?.total || 0) >
                    (game.scores?.away?.total || 0),
                },
                away: {
                  id: game.teams?.away?.id || 0,
                  name: game.teams?.away?.name || 'Unknown',
                  logo: game.teams?.away?.logo || '',
                  winner:
                    (game.scores?.away?.total || 0) >
                    (game.scores?.home?.total || 0),
                },
              },
              goals: {
                home: game.scores?.home?.total || null,
                away: game.scores?.away?.total || null,
              },
              score: {
                halftime: {
                  home:
                    (game.scores?.home?.quarter_1 || 0) +
                    (game.scores?.home?.quarter_2 || 0),
                  away:
                    (game.scores?.away?.quarter_1 || 0) +
                    (game.scores?.away?.quarter_2 || 0),
                },
                fulltime: {
                  home: game.scores?.home?.total || null,
                  away: game.scores?.away?.total || null,
                },
                extratime: {
                  home: game.scores?.home?.overtime || null,
                  away: game.scores?.away?.overtime || null,
                },
                penalty: { home: null, away: null },
              },
            }),
          );
          setFixtures(adaptedFixtures);
        } else {
          setFixtures([]);
        }
      } catch (err) {
        console.error('Error fetching basketball fixtures:', err);
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred.',
        );
        setFixtures([]);
      } finally {
        setLoading(false);
      }
    },
    [selectedLeague],
  );

  useEffect(() => {
    fetchFixtures(selectedLeague);
  }, [selectedLeague, fetchFixtures]);

  return {
    fixtures,
    loading,
    error,
    selectedLeague,
    setSelectedLeague,
    viewType,
    setViewType,
    leagues,
  };
};

export default useBasketballCalendar;
