"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function FinishedGamesSection({ games }: { games: any[] }) {
  const finishedGames = games
    .filter((g) => g.status.long === "Game Finished")
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 10);

  if (finishedGames.length === 0) return <p>No hay juegos finalizados disponibles.</p>;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-green-900">Últimos 10 Resultados</h2>
      <Separator />
      {finishedGames.map((game) => {
        const { home, away } = game.teams;
        const score = game.scores;
        const totalHome = score.home.quarter_1 + score.home.quarter_2 + score.home.quarter_3 + score.home.quarter_4;
        const totalAway = score.away.quarter_1 + score.away.quarter_2 + score.away.quarter_3 + score.away.quarter_4;
        const date = new Date(game.date).toLocaleString("es-ES", { dateStyle: "full", timeStyle: "short" });

        return (
          <Card key={game.id} className="bg-green-50 border border-green-200">
            <CardHeader>
              <CardTitle className="text-green-900">{home.name} vs {away.name}</CardTitle>
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
      })}
    </section>
  );
}
