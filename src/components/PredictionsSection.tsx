"use client";
import { Separator } from "@/components/ui/separator";
import useOdds from "../hooks/basketball/useOdds";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { useEffect, useState } from "react";

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
  const [summary, setSummary] = useState("");
  const [summaryLoading, setSummaryLoading] = useState(false);

  useEffect(() => {
    if (!loading && odds.length > 0 && !summary) {
      const homeOdds = extractTeamOdd(odds, "Home");
      const awayOdds = extractTeamOdd(odds, "Away");

      const fetchSummary = async () => {
        setSummaryLoading(true);
        try {
          const response = await fetch("/api/prediction-summary", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              homeTeam,
              awayTeam,
              lastResults: null, // no aplica aún
              seriesState: null, // no aplica aún
              odds: { home: homeOdds, away: awayOdds },
            }),
          });

          const data = await response.json();
          if (data.summary) {
            setSummary(data.summary);
          }
        } catch (err) {
          console.error("Error fetching summary", err);
        } finally {
          setSummaryLoading(false);
        }
      };

      fetchSummary();
    }
  }, [loading, odds, homeTeam, awayTeam]);

  if (!odds || odds.length === 0 || !odds[0]) {
    return (
      <p className="text-sm text-green-600 italic">Cargando...</p>
    );
  }
  
  const first = odds[0];
  
  const gameDate = first?.game?.date
    ? new Date(first.game.date).toLocaleString("es-ES", {
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    : "Fecha no disponible";

  const topBookmakers = first?.bookmakers?.slice(0, 3) || [];

  return (
    <Card className="mb-4 bg-green-50 border border-green-200">
      <CardHeader>
        <CardTitle className="text-green-900">
          {homeTeam} vs {awayTeam}
        </CardTitle>
        <p className="text-sm text-green-800">{gameDate}</p>
      </CardHeader>

      <CardContent className="space-y-4 text-green-900">
        {topBookmakers.map((bookmaker: any) => {
          const bets = bookmaker.bets?.[0]?.values;
          if (!bets) return null;

          return (
            <div key={bookmaker.key} className="border-t pt-2">
              <p className="font-semibold text-green-800 mb-1">
                {bookmaker.name}
              </p>
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
            </div>
          );
        })}

        <Separator />
        <div className="mt-2">
          <p className="text-green-900 font-semibold mb-1">Análisis previo al partido</p>
          {summaryLoading ? (
            <p className="text-sm text-green-600 italic">Cargando análisis...</p>
          ) : summary ? (
            <p className="text-sm text-green-800 whitespace-pre-line">{summary}</p>
          ) : (
            <p className="text-sm text-green-600">No se pudo generar el análisis.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

function extractTeamOdd(odds: any[], teamType: "Home" | "Away") {
  for (const bookmaker of odds[0]?.bookmakers || []) {
    const bet = bookmaker.bets?.[0]?.values?.find((v: any) => v.value === teamType);
    if (bet) return bet.odd;
  }
  return null;
}

export default function PredictionsSection({ games }: { games: any[] }) {
    
  const upcoming = games.filter((g) => g.status.long === "Not Started");

  if (upcoming.length === 0) return <p>No hay predicciones disponibles.</p>;

  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold text-green-900">Predicciones para los próximos juegos</h2>
      <Separator />
      {upcoming.map((game) => (
        <GameOdds
          key={game.id}
          league="12"
          season="2024-2025"
          homeTeam={game.teams.home.name}
          awayTeam={game.teams.away.name}
        />
      ))}
    </section>
  );
}
