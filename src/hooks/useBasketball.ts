import { useState, useEffect } from "react";
import { fetchBasketballData } from "../services/basketballApi";

interface BasketballData {
  leagues: any[];
  games: any[];
  error: string | null;
  loading: boolean;
}

const useBasketballData = () => {
  const [leagues, setLeagues] = useState<any[]>([]);
  const [games, setGames] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const leaguesData = await fetchBasketballData("leagues");
        console.log("Leagues Data:", leaguesData); 
        if (leaguesData && leaguesData.response) {
          setLeagues(leaguesData.response);
        } else {
          setError("No se encontraron ligas");
        }

        const gamesParams = {
          timezone: "America/New_York", 
          league: "12", 
          season: "2022-2023", 
        };

        const gamesData = await fetchBasketballData("games", gamesParams);
        console.log("Games Data:", gamesData);
        if (gamesData && gamesData.response) {
          setGames(gamesData.response);
        } else {
          setError("No se encontraron juegos");
        }
      } catch (error) {
        console.error("Error al cargar los datos:", error);
        setError("Error al cargar los datos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { leagues, games, error, loading };
};

export default useBasketballData;
