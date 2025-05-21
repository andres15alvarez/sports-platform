import { useEffect, useState } from 'react';
import { fetchFootballData } from '../../services/footballApi';
import { Game, League, Teams } from '../basketball/useGames';
import { OddValue } from '../basketball/useOdds';

export type FootballOdd = {
  id: number;
  fixture: {
    date: string;
  };
  game: Game;
  bookmakers: {
    bets: {
      values: OddValue[];
      name: string;
    }[];
    name: string;
  }[];
  league: League;
  teams: Teams;
};

const useFootballOdds = ({
  league,
  season,
}: {
  league: string;
  season: string;
}) => {
  const [odds, setOdds] = useState<FootballOdd[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const res = await fetchFootballData('odds', {
          league,
          season,
        });

        //console.log('Datos de odds de fútbol recibidos:', res);

        if (res?.response && res.response.length > 0) {
          setOdds(res.response);
        } else {
          setError('No hay predicciones disponibles');
        }
      } catch (e) {
        console.error('Error al cargar odds de fútbol:', e);
        setError('Error al cargar predicciones');
      } finally {
        setLoading(false);
      }
    };

    if (league && season) {
      fetchOdds();
    } else {
      setLoading(false);
      setOdds(null);
      setError(null);
    }
  }, [league, season]);

  return { odds, loading, error };
};

export default useFootballOdds;
