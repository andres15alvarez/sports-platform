import { useEffect, useState } from 'react';
import { fetchBasketballData } from '../../services/basketballApi';

interface Game {
  id: number;
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
        console.log('Games Data:', res);
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
