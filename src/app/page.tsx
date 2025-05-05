"use client";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import useGames from "../hooks/basketball/useGames";
import useLeagues from "../hooks/basketball/useLeagues";
import useOdds from "../hooks/basketball/useOdds";

const GameOdds = ({
  league,
  season,
  homeTeam,
  awayTeam,
}: {
  league: string;
  season: string;
  homeTeam: string;
  awayTeam: string;
}) => {
  const { odds, loading, error } = useOdds({ league, season });

  if (loading) return <Skeleton className="h-24 w-full mb-4" />;
  if (error) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  const first = odds[0];
  const bookmaker = first?.bookmakers?.[0];
  const bets = bookmaker?.bets?.[0]?.values;

  return (
    <Card className="mb-4 bg-green-50 border border-green-200">
      <CardHeader>
        <CardTitle className="text-green-900">
          {homeTeam} vs {awayTeam}
        </CardTitle>
        <p className="text-sm text-green-800">
          Predicciones según <strong>{bookmaker?.name || "N/A"}</strong>
        </p>
      </CardHeader>
      <CardContent className="space-y-2 text-green-900">
        {bets ? (
          <div className="space-y-1">
            {bets.map((b: any) => {
              if (b.value === "Home") {
                return (
                  <p key={b.value}>
                    <Badge className="bg-green-200 text-green-900">Local</Badge>{" "}
                    <strong>{homeTeam}</strong>: {b.odd}
                  </p>
                );
              }
              if (b.value === "Away") {
                return (
                  <p key={b.value}>
                    <Badge className="bg-green-200 text-green-900">Visitante</Badge>{" "}
                    <strong>{awayTeam}</strong>: {b.odd}
                  </p>
                );
              }
              return null;
            })}
          </div>
        ) : (
          <p>No hay apuestas disponibles.</p>
        )}
      </CardContent>
    </Card>
  );
};

export default function Home() {
  const { leagues, loading: loadingLeagues, error: errorLeagues } = useLeagues();
  const { games, loading: loadingGames, error: errorGames } = useGames({
    timezone: "America/New_York",
    league: "12",
    season: "2024-2025",
  });

  const loading = loadingLeagues || loadingGames;
  const error = errorLeagues || errorGames;

  if (loading) {
    return (
      <main className="p-6 max-w-4xl mx-auto space-y-4">
        <Skeleton className="h-12 w-2/3" />
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-32 w-full" />
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-6 max-w-4xl mx-auto">
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </main>
    );
  }

  const nbaLeague = leagues.find((l) => l.id === 12);
  const leagueName = nbaLeague?.name || "NBA";

  const finishedGames = games
    .filter((g) => g.status.long === "Game Finished")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  const upcomingGames = games.filter((g) => g.status.long === "Not Started");

  return (
    <main className="p-6 space-y-10 max-w-4xl mx-auto">
      <header className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight text-green-900">Basketball Data</h1>
        <p className="text-green-800 text-lg">Liga: {leagueName}</p>
      </header>

      {/* Resultados Finalizados */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-green-900">Últimos 10 Resultados</h2>
        <Separator />
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

            return (
              <Card key={game.id} className="bg-green-50 border border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">
                    {home} vs {away}
                  </CardTitle>
                  <p className="text-sm text-green-800">
                    Resultado Final: <strong>{totalHome} - {totalAway}</strong>
                  </p>
                </CardHeader>
                <CardContent className="space-y-2 text-green-900">
                  <ul className="text-sm grid grid-cols-2 gap-2">
                    <li>Q1: {score.home.quarter_1} - {score.away.quarter_1}</li>
                    <li>Q2: {score.home.quarter_2} - {score.away.quarter_2}</li>
                    <li>Q3: {score.home.quarter_3} - {score.away.quarter_3}</li>
                    <li>Q4: {score.home.quarter_4} - {score.away.quarter_4}</li>
                  </ul>
                  <p><strong>Fecha:</strong> {date}</p>
                  <p><strong>Lugar:</strong> {game.venue || "Estadio no disponible"}</p>
                  <p><strong>País:</strong> {game.country?.name || "País no disponible"}</p>
                </CardContent>
              </Card>
            );
          })
        )}
      </section>

      {/* Calendario de Juegos */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-green-900">Calendario de Juegos</h2>
        <Separator />
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

            return (
              <Card key={game.id} className="bg-green-50 border border-green-200">
                <CardHeader>
                  <CardTitle className="text-green-900">{home} vs {away}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-green-900">
                  <p><strong>Fecha y hora:</strong> {date}</p>
                  <p>
                    <strong>Lugar:</strong> {game.venue || "Estadio no disponible"},{" "}
                    {game.country?.name || "País no disponible"}
                  </p>
                </CardContent>
              </Card>
            );
          })
        )}
      </section>

      {/* Predicciones */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold text-green-900">Predicciones para los próximos juegos</h2>
        <Separator />
        {upcomingGames.length === 0 ? (
          <p>No hay predicciones disponibles.</p>
        ) : (
          upcomingGames.map((game) => (
            <GameOdds
              key={game.id}
              league="12"
              season="2024-2025"
              homeTeam={game.teams.home.name}
              awayTeam={game.teams.away.name}
            />
          ))
        )}
      </section>
    </main>
  );
}
