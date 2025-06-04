import { useEffect, useState } from 'react';
import { fetchFootballData } from '@/src/services/footballApi';

interface League {
  id: number;
  name: string;
  logo: string;
  league: {
    id: number;
    name: string;
    logo: string;
  };
}

const useFootballLeagues = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const res = await fetchFootballData('leagues');
        //console.log('Football Leagues Data:', res);
        if (res?.response) {
          const mappedLeagues = res.response.map((item: League) => ({
            id: item.league.id,
            name: item.league.name,
            logo: item.league.logo,
          }));
          setLeagues(mappedLeagues);
        } else {
          setError('No se encontraron ligas');
        }
      } catch (e) {
        console.error('Error al cargar ligas:', e);
        setError('Error al cargar ligas');
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  return { leagues, loading, error };
};

export default useFootballLeagues;
