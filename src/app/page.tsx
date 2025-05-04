"use client";

import useGames from "../hooks/basketball/useGames";
import useLeagues from "../hooks/basketball/useLeagues";

const Home = () => {
  const { leagues, loading: loadingLeagues, error: errorLeagues } = useLeagues();

  const { games, loading: loadingGames, error: errorGames } = useGames({
    timezone: "America/New_York",
    league: "12",
    season: "2024-2025",
  });

  const loading = loadingLeagues || loadingGames;
  const error = errorLeagues || errorGames;

  if (loading) return <p>Cargando datos...</p>;
  if (error) return <p>Error al cargar datos.</p>;

  const nbaLeague = leagues.find((l) => l.id === 12);
  const leagueName = nbaLeague?.name || "NBA";

  const finishedGames = games
    .filter((g) => g.status.long === "Game Finished")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const upcomingGames = games.filter((g) => g.status.long === "Not Started");

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>BASKETBALL DATA</h1>
      <h2>Liga: {leagueName}</h2>

      {/* Resultados Finalizados */}
      <section style={{ marginTop: "30px" }}>
        <h3>ÚLTIMOS 10 RESULTADOS</h3>
        {finishedGames.length === 0 ? (
          <p>No hay juegos finalizados disponibles.</p>
        ) : (
          finishedGames.map((game) => {
            const home = game.teams.home.name;
            const away = game.teams.away.name;
            const score = game.scores;
            const totalHome =
              score.home.quarter_1 +
              score.home.quarter_2 +
              score.home.quarter_3 +
              score.home.quarter_4;
            const totalAway =
              score.away.quarter_1 +
              score.away.quarter_2 +
              score.away.quarter_3 +
              score.away.quarter_4;

            const date = new Date(game.date).toLocaleString("es-ES", {
              dateStyle: "full",
              timeStyle: "short",
            });

            const venue = game.venue || "Estadio no disponible";
            const country = game.country?.name || "País no disponible";

            return (
              <div key={game.id} style={{ marginBottom: "20px", borderBottom: "1px solid #ccc", paddingBottom: "10px" }}>
                <strong>{home} vs {away}</strong><br />
                <strong>Resultado Final:</strong> {totalHome} - {totalAway}
                <ul>
                  <li>Q1: {score.home.quarter_1} - {score.away.quarter_1}</li>
                  <li>Q2: {score.home.quarter_2} - {score.away.quarter_2}</li>
                  <li>Q3: {score.home.quarter_3} - {score.away.quarter_3}</li>
                  <li>Q4: {score.home.quarter_4} - {score.away.quarter_4}</li>
                </ul>
                <p><strong>Fecha y hora:</strong> {date}</p>
                <p><strong>Lugar:</strong> {venue}</p>
                <p><strong>País:</strong> {country}</p>
              </div>
            );
          })
        )}
      </section>

      {/* Próximos Juegos */}
      <section style={{ marginTop: "30px" }}>
        <h3>CALENDARIO DE JUEGOS</h3>
        {upcomingGames.length === 0 ? (
          <p>No hay próximos juegos disponibles.</p>
        ) : (
          upcomingGames.map((game) => {
            const home = game.teams.home.name;
            const away = game.teams.away.name;
            const date = new Date(game.date).toLocaleString("es-ES", {
              dateStyle: "full",
              timeStyle: "short",
            });
            const venue = game.venue || "Estadio no disponible";
            const country = game.country?.name || "País no disponible";

            return (
              <div key={game.id} style={{ marginBottom: "20px" }}>
                <strong>{home} vs {away}</strong><br />
                Fecha y hora: {date}<br />
                Lugar: {venue}, {country}
              </div>
            );
          })
        )}
      </section>
    </div>
  );
};

export default Home;
