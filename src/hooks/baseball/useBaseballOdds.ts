import { useEffect, useState } from 'react';
import { fetchBaseballData } from '../../services/baseballApi';

export type Team = {
  id: number;
  name: string;
  logo: string;
};

export type Score = {
  total: number;
  hits?: number;
  errors?: number;
  innings?: Record<string, number | null>;
};

export type League = {
  id: number;
  name: string;
  logo: string;
  season: number;
  type: string;
};

export type Status = {
  short: string;
  long: string;
};

export type Country = {
  id: number;
  name: string;
  code: string;
  flag: string;
};

export type Game = {
  id: number;
  date: string;
  country: Country;
  league: League;
  scores: {
    home: Score;
    away: Score;
  };
  status: Status;
  teams: {
    home: Team;
    away: Team;
  };
  time: string;
  timestamp: number;
  timezone: string;
  week: number | null;
};

export type OddValue = {
  odd: string;
  value: string;
};

export type BookmakerBet = {
  values: OddValue[];
};

export type Bookmaker = {
  bets: BookmakerBet[];
};

export type Odd = {
  id: number;
  game: Game;
  bookmakers: Bookmaker[];
};

const useBaseballOdds = ({
  league,
  season,
}: {
  league: string;
  season: string;
}) => {
  const [odds, setOdds] = useState<Odd[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const res = await fetchBaseballData('odds', {
          league,
          season,
        });

        //console.log('Datos de odds recibidos baseball:', res);

        if (res?.response && res.response.length > 0) {
          setOdds(res.response);
        } else {
          setError('No hay odds disponibles');
        }
      } catch (e) {
        console.error('Error al cargar odds:', e);
        setError('Error al cargar odds');
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

export default useBaseballOdds;
