import { useState, useEffect, useCallback } from 'react';
import {
  CalendarFixture,
  UseCalendarHook,
  League,
  ViewType,
} from '@/src/types/sportCalendar';

interface BaseballGameResponse {
  id: number;
  date: string;
  timezone: string;
  timestamp: number;
  status: {
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
  teams: {
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
  scores: {
    home: {
      total: number;
      innings: {
        extra: number | null;
      };
    };
    away: {
      total: number;
      innings: {
        extra: number | null;
      };
    };
  };
}

const useBaseballCalendar = (): UseCalendarHook => {
  const [fixtures, setFixtures] = useState<CalendarFixture[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedLeague, setSelectedLeague] = useState(1); // MLB
  const [viewType, setViewType] = useState<ViewType>('upcoming');

  const leagues: League[] = [
    { id: 1, name: 'MLB', country: 'USA' },
    { id: 2, name: 'NPB', country: 'Japan' },
    { id: 3, name: 'KBO', country: 'South Korea' },
    { id: 4, name: 'CPBL', country: 'Taiwan' },
    { id: 5, name: 'LMB', country: 'Mexico' },
    { id: 6, name: 'LIDOM', country: 'Dominican Republic' },
    { id: 7, name: 'LVBP', country: 'Venezuela' },
    { id: 8, name: 'LNB', country: 'Nicaragua' },
  ];

  const fetchFixtures = useCallback(
    async (leagueId: number) => {
      setLoading(true);
      setError(null);
      try {
        const apiKey = process.env.NEXT_PUBLIC_API_KEYY;
        if (!apiKey) throw new Error('API key not configured');

        const season = '2025';
        const allFixtures = [];

        for (let i = -7; i <= 30; i++) {
          const targetDate = new Date();
          targetDate.setDate(targetDate.getDate() + i);
          const dateString = targetDate.toISOString().split('T')[0];

          // Small delay to avoid rate-limiting
          await new Promise((resolve) => setTimeout(resolve, 150));

          const response = await fetch(
            `https://v1.baseball.api-sports.io/games?league=${leagueId}&season=${season}&date=${dateString}`,
            {
              method: 'GET',
              headers: {
                'x-rapidapi-key': apiKey,
                'x-rapidapi-host': 'v1.baseball.api-sports.io',
              },
            },
          );

          if (!response.ok) {
            console.warn(
              `Could not fetch baseball data for ${dateString}: ${response.statusText}`,
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
            (a: BaseballGameResponse, b: BaseballGameResponse) =>
              new Date(a.date).getTime() - new Date(b.date).getTime(),
          );

          const adaptedFixtures: CalendarFixture[] = sortedFixtures.map(
            (game: BaseballGameResponse) => ({
              fixture: {
                id: game.id,
                referee: null,
                timezone: game.timezone,
                date: game.date,
                timestamp: game.timestamp,
                periods: {
                  first: null,
                  second: null,
                },
                venue: {
                  id: game.venue?.id || null,
                  name: game.venue?.name || 'N/A',
                  city: game.country?.name || 'N/A',
                },
                status: {
                  long: game.status.long,
                  short: game.status.short,
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
                  id: game.teams.home.id,
                  name: game.teams.home.name,
                  logo: game.teams.home.logo,
                  winner: game.scores.home.total > game.scores.away.total,
                },
                away: {
                  id: game.teams.away.id,
                  name: game.teams.away.name,
                  logo: game.teams.away.logo,
                  winner: game.scores.away.total > game.scores.home.total,
                },
              },
              goals: {
                home: game.scores.home.total,
                away: game.scores.away.total,
              },
              score: {
                halftime: { home: null, away: null },
                fulltime: {
                  home: game.scores.home.total,
                  away: game.scores.away.total,
                },
                extratime: {
                  home: game.scores.home.innings.extra,
                  away: game.scores.away.innings.extra,
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
        console.error('Error fetching baseball fixtures:', err);
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

export default useBaseballCalendar;
