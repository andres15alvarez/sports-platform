import { useEffect, useState } from "react";
import { fetchBasketballData } from "../../services/basketballApi";

const useOdds = (gameId: string) => {
  const [odds, setOdds] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOdds = async () => {
      try {
        const res = await fetchBasketballData("odds", { game: gameId });
        if (res?.response && res.response.length > 0) {
          setOdds(res.response[0]); 
        } else {
          setError("No hay predicciones disponibles");
        }
      } catch (e) {
        console.error("Error al cargar odds:", e);
        setError("Error al cargar predicciones");
      } finally {
        setLoading(false);
      }
    };

    if (gameId) {
      fetchOdds();
    }
  }, [gameId]);

  return { odds, loading, error };
};

export default useOdds;
