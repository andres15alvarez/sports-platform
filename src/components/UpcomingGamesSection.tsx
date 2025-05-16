"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function UpcomingGamesSection({ games }: { games: any[] }) {
  const upcoming = games.filter((g) => g.status.long === "Not Started");

  if (upcoming.length === 0) return <p>No hay próximos juegos disponibles.</p>;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-green-900">Calendario de Juegos</h2>
      <Separator />
      {upcoming.map((game) => {
        const { home, away } = game.teams;
        const date = new Date(game.date).toLocaleString("es-ES", {
          dateStyle: "full",
          timeStyle: "short",
        });

        return (
          <Card key={game.id} className="bg-green-50 border border-green-200">
            <CardHeader>
              <CardTitle className="text-green-900">{home.name} vs {away.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-green-900">
              <p><strong>Fecha y hora:</strong> {date}</p>
              <p><strong>Lugar:</strong> {game.venue || "Estadio no disponible"}, {game.country?.name || "País no disponible"}</p>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
