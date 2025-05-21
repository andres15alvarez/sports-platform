import { useEffect, useState } from 'react';
import { fetchBasketballData } from '../../services/basketballApi';
import { Game, League } from './useGames';

export type Odd = {
  id: number;
  game: Game;
  bookmakers: {
    bets: {
      values: number[]
    }[]
  }[]
  league: League;
}

const useOdds = ({ league, season }: { league: string; season: string }) => {
  const [odds, setOdds] = useState<Odd[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const res = await fetchBasketballData('odds', {
          league,
          season,
        });
        //console.log('Datos de odds recibidos:', res);

        if (res?.response && res.response.length > 0) {
          setOdds(res.response);
        } else {
          setError('No hay predicciones disponibles');
        }
      } catch (e) {
        console.error('Error al cargar odds:', e);
        setError('Error al cargar predicciones');
      } finally {
        setLoading(false);
      }
    };

    if (league && season) {
      fetchOdds();
    }
  }, [league, season]);

  return { odds, loading, error };
};

export default useOdds;
