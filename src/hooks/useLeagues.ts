import { useEffect, useState, useMemo } from 'react';
import { League } from '@prisma/client';

export default function useLeagues(leagueIds: number[], sportName: string) {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const leagueIdsKey = useMemo(() => leagueIds.join(','), [leagueIds]);

  useEffect(() => {
    if (!sportName || leagueIds.length === 0) {
      setLeagues([]);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchLeagues = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `/api/leagues?sport=${encodeURIComponent(sportName)}&ids=${encodeURIComponent(leagueIdsKey)}`,
        );

        if (!res.ok) {
          throw new Error(
            `Error fetching leagues: ${res.status} ${res.statusText}`,
          );
        }

        const data = await res.json();
        setLeagues(data);
      } catch (err) {
        setError(err as Error);
        setLeagues([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, [leagueIdsKey, sportName]);

  return { leagues, loading, error };
}
