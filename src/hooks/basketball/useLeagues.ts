import { useEffect, useState } from "react";
import { fetchBasketballData } from "../../services/basketballApi";

const useLeagues = () => {
  const [leagues, setLeagues] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const res = await fetchBasketballData("leagues");
        console.log("Leagues Data:", res);
        if (res?.response) {
          setLeagues(res.response);
        } else {
          setError("No se encontraron ligas");
        }
      } catch (e) {
        console.error("Error al cargar ligas:", e);
        setError("Error al cargar ligas");
      } finally {
        setLoading(false);
      }
    };

    fetchLeagues();
  }, []);

  return { leagues, loading, error };
};

export default useLeagues;
