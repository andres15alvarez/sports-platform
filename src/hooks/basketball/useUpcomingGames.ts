import useGames, { Game } from '@/src/hooks/basketball/useGames';

const params = {
  timezone: 'America/New_York',
  league: '12',
  season: '2024-2025',
};

export default function useUpcomingGames(limit = 4) {
  const { games, loading, error } = useGames(params);

  const upcomingGames =
    games
      ?.filter((g: Game) => g.status.long === 'Not Started')
      .slice(0, limit) ?? [];

  return { upcomingGames, loading, error };
}
