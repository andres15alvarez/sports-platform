import { useEffect, useState } from 'react';
import { fetchBaseballData } from '@/src/services/baseballApi';

export type League = {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
};

export type Team = {
  id: number;
  name: string;
  logo: string;
};

export type Game = {
  id: number;
  date: string;
  timestamp: number;
  teams: {
    home: Team;
    away: Team;
  };
  scores: {
    home: number | null;
    away: number | null;
  };
};

const useBaseballGames = ({
  league,
  season,
}: {
  league: string;
  season: string;
}) => {
  const [games, setGames] = useState<Game[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetchBaseballData('games', {
          league,
          season,
        });

        if (res?.response && res.response.length > 0) {
          setGames(res.response);
        } else {
          setError('No hay partidos disponibles');
        }
      } catch (e) {
        console.error('Error al cargar partidos:', e);
        setError('Error al cargar partidos');
      } finally {
        setLoading(false);
      }
    };

    if (league && season) {
      fetchGames();
    }
  }, [league, season]);

  return { games, loading, error };
};

export default useBaseballGames;
