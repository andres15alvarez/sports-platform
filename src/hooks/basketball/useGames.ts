import { useEffect, useState } from 'react';
import { fetchBasketballData } from '../../services/basketballApi';

export type League = {
  id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
}

export type Game = {
  id: number;
  league: League;
  status: {
    long: string
    short: string;
  };
  date: string;
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      winner: boolean | null;
    };
  },
  venue: string;
  scores: {
    home: {
      total: number;
      quarter: number[];
    };
    away: {
      total: number;
      quarter: number[];
    };
  };
}

const useGames = (params: {
  timezone: string;
  league: string;
  season: string;
}) => {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const res = await fetchBasketballData('games', params);
        //console.log('Games Data:', res);
        if (res?.response) {
          setGames(res.response);
        } else {
          setError('No se encontraron juegos');
        }
      } catch (e) {
        console.error('Error al cargar juegos:', e);
        setError('Error al cargar juegos');
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, [params]);

  return { games, loading, error };
};

export default useGames;
