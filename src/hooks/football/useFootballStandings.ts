import { useState, useEffect } from 'react';
import { Standing, LeagueInfo } from '@/src/types/footballStandings';

interface UseStandingsProps {
  leagueId: number;
  season: number;
}

interface UseStandingsReturn {
  standings: Standing[];
  leagueInfo: LeagueInfo | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useStandings = ({
  leagueId,
  season,
}: UseStandingsProps): UseStandingsReturn => {
  const [standings, setStandings] = useState<Standing[]>([]);
  const [leagueInfo, setLeagueInfo] = useState<LeagueInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStandings = async () => {
    setLoading(true);
    setError(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEYY;
      if (!apiKey) {
        throw new Error('API key not configured');
      }

      const response = await fetch(
        `https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`,
        {
          method: 'GET',
          headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'v3.football.api-sports.io',
          },
        },
      );

      if (!response.ok) {
        throw new Error(`Error fetching data: ${response.status}`);
      }

      const data = await response.json();

      if (data.response?.length > 0) {
        const leagueData = data.response[0];
        setLeagueInfo(leagueData.league);

        if (leagueData.league.standings?.length > 0) {
          setStandings(leagueData.league.standings.flat());
        } else {
          setError('Invalid standings data structure');
        }
      } else if (data.errors && Object.keys(data.errors).length > 0) {
        setError('API Error: ' + JSON.stringify(data.errors));
      } else {
        setError('No data was found for this league/season.');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, [leagueId, season]);

  return { standings, leagueInfo, loading, error, refetch: fetchStandings };
};
