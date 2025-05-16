"use client";
import { useState } from "react";

import FinishedGamesSection from "../components/FinishedGamesSection";
import UpcomingGamesSection from "../components/UpcomingGamesSection";
import PredictionsSection from "../components/PredictionsSection";


import useGames from "../hooks/basketball/useGames";
import useLeagues from "../hooks/basketball/useLeagues";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function Home() {
  const [showResults, setShowResults] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [showPredictions, setShowPredictions] = useState(false);

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

  const leagueName = leagues.find((l) => l.id === 12)?.name || "NBA";

  return (
    <main className="p-6 space-y-6 max-w-4xl mx-auto">
      <header className="space-y-1">
        <h1 className="text-4xl font-bold tracking-tight text-green-900">Basketball Data</h1>
        <p className="text-green-800 text-lg">Liga: {leagueName}</p>
      </header>

      <div className="space-y-4">
        <Button onClick={() => setShowResults(!showResults)} className="w-full">
          {showResults ? "Ocultar Resultados" : "Mostrar Resultados"}
        </Button>
        {showResults && <FinishedGamesSection games={games} />}

        <Button onClick={() => setShowCalendar(!showCalendar)} className="w-full">
          {showCalendar ? "Ocultar Calendario" : "Mostrar Calendario"}
        </Button>
        {showCalendar && <UpcomingGamesSection games={games} />}

        <Button onClick={() => setShowPredictions(!showPredictions)} className="w-full">
          {showPredictions ? "Ocultar Predicciones" : "Mostrar Predicciones"}
        </Button>
        {showPredictions && <PredictionsSection games={games} />}
      </div>
    </main>
  );
}
