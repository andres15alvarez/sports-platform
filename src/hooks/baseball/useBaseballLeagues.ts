import { useEffect, useState } from 'react';
import { fetchBaseballData } from '@/src/services/baseballApi';

interface ApiLeague {
  id: number;
  name: string;
  logo: string;
}

interface ApiResponse {
  response: ApiLeague[];
}

interface League {
  id: number;
  name: string;
  logo: string;
}

const useBaseballLeagues = () => {
  const [leagues, setLeagues] = useState<League[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const res: ApiResponse = await fetchBaseballData('leagues');
        //console.log('Baseball Leagues Data:', res);
        if (res?.response) {
          const mappedLeagues = res.response.map((item) => ({
            id: item.id,
            name: item.name,
            logo: item.logo,
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

export default useBaseballLeagues;
