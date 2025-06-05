export const footballLeagues = process.env.NEXT_PUBLIC_FOOTBALL_LEAGUES
  ? process.env.NEXT_PUBLIC_FOOTBALL_LEAGUES.split(',').map((id) =>
      Number(id.trim()),
    )
  : [];

export const popularFootballLeagues = process.env
  .NEXT_PUBLIC_POPULAR_FOOTBALL_LEAGUES
  ? process.env.NEXT_PUBLIC_POPULAR_FOOTBALL_LEAGUES.split(',').map((id) =>
      Number(id.trim()),
    )
  : [];

export const basketballLeagues = process.env.NEXT_PUBLIC_BASKETBALL_LEAGUES
  ? process.env.NEXT_PUBLIC_BASKETBALL_LEAGUES.split(',').map((id) =>
      Number(id.trim()),
    )
  : [];

export const baseballLeagues = process.env.NEXT_PUBLIC_BASEBALL_LEAGUES
  ? process.env.NEXT_PUBLIC_BASEBALL_LEAGUES.split(',').map((id) =>
      Number(id.trim()),
    )
  : [];
