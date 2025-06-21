import { FixtureResponse } from '@/src/types/types';
import { CommonFixture, CommonLeagueData } from '@/src/types/sportsResults';

export const adaptFootballFixture = (
  fixture: FixtureResponse,
): CommonFixture => {
  return {
    id: fixture.fixture.id,
    date: fixture.fixture.date,
    timestamp: fixture.fixture.timestamp,
    status: fixture.fixture.status,
    venue: {
      name: fixture.fixture.venue.name,
      city: fixture.fixture.venue.city,
    },
    teams: {
      home: {
        id: fixture.teams.home.id,
        name: fixture.teams.home.name,
        logo: fixture.teams.home.logo,
        winner: fixture.teams.home.winner,
      },
      away: {
        id: fixture.teams.away.id,
        name: fixture.teams.away.name,
        logo: fixture.teams.away.logo,
        winner: fixture.teams.away.winner,
      },
    },
    score: {
      home: fixture.goals.home || 0,
      away: fixture.goals.away || 0,
      halftime: fixture.score.halftime,
      fulltime: fixture.score.fulltime,
    },
    league: {
      id: fixture.league.id,
      name: fixture.league.name,
      country: fixture.league.country,
      logo: fixture.league.logo,
      flag: fixture.league.flag,
    },
  };
};

interface BasketballGame {
  id: number;
  date: string;
  status: {
    short: string;
    long: string;
  };
  venue?: string;
  league?: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
  };
  teams?: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  scores?: {
    home: {
      total: number;
      quarter_1?: number;
      quarter_2?: number;
    };
    away: {
      total: number;
      quarter_1?: number;
      quarter_2?: number;
    };
  };
}

export const adaptBasketballFixture = (
  game: BasketballGame,
  leagueId: number,
  leagueName: string,
  leagueCountry: string,
): CommonFixture => {
  const homeScore = game.scores?.home?.total || 0;
  const awayScore = game.scores?.away?.total || 0;
  const homeWinner = homeScore > awayScore;
  const awayWinner = awayScore > homeScore;

  return {
    id: game.id,
    date: game.date,
    timestamp: new Date(game.date).getTime() / 1000,
    status: {
      long:
        game.status.long === 'Finished' ? 'Match Finished' : game.status.long,
      short: game.status.short === 'FT' ? 'FT' : game.status.short,
    },
    venue: {
      name: game.venue || null,
      city: null,
    },
    teams: {
      home: {
        id: game.teams?.home?.id || 0,
        name: game.teams?.home?.name || 'Home Team',
        logo: game.teams?.home?.logo || '',
        winner: homeWinner,
      },
      away: {
        id: game.teams?.away?.id || 0,
        name: game.teams?.away?.name || 'Away Team',
        logo: game.teams?.away?.logo || '',
        winner: awayWinner,
      },
    },
    score: {
      home: homeScore,
      away: awayScore,
      halftime: {
        home:
          (game.scores?.home?.quarter_1 || 0) +
          (game.scores?.home?.quarter_2 || 0),
        away:
          (game.scores?.away?.quarter_1 || 0) +
          (game.scores?.away?.quarter_2 || 0),
      },
      fulltime: {
        home: homeScore,
        away: awayScore,
      },
    },
    league: {
      id: game.league?.id || leagueId,
      name: game.league?.name || leagueName,
      country: game.league?.country || leagueCountry,
      logo: game.league?.logo || '',
      flag: game.league?.flag || null,
    },
  };
};

interface BaseballGame {
  id: number;
  date: string;
  status: {
    short: string;
    long: string;
  };
  venue?: string;
  league?: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string;
  };
  teams?: {
    home: {
      id: number;
      name: string;
      logo: string;
    };
    away: {
      id: number;
      name: string;
      logo: string;
    };
  };
  scores?: {
    home: {
      total: number;
      inning_1?: number;
      inning_2?: number;
    };
    away: {
      total: number;
      inning_1?: number;
      inning_2?: number;
    };
  };
}

export const adaptBaseballFixture = (
  game: BaseballGame,
  leagueId: number,
  leagueName: string,
  leagueCountry: string,
): CommonFixture => {
  const homeScore = game.scores?.home?.total || 0;
  const awayScore = game.scores?.away?.total || 0;
  const homeWinner = homeScore > awayScore;
  const awayWinner = awayScore > homeScore;

  return {
    id: game.id,
    date: game.date,
    timestamp: new Date(game.date).getTime() / 1000,
    status: {
      long:
        game.status.long === 'Finished' ? 'Match Finished' : game.status.long,
      short: game.status.short === 'FT' ? 'FT' : game.status.short,
    },
    venue: {
      name: game.venue || null,
      city: null,
    },
    teams: {
      home: {
        id: game.teams?.home?.id || 0,
        name: game.teams?.home?.name || 'Home Team',
        logo: game.teams?.home?.logo || '',
        winner: homeWinner,
      },
      away: {
        id: game.teams?.away?.id || 0,
        name: game.teams?.away?.name || 'Away Team',
        logo: game.teams?.away?.logo || '',
        winner: awayWinner,
      },
    },
    score: {
      home: homeScore,
      away: awayScore,
      halftime: {
        home:
          (game.scores?.home?.inning_1 || 0) +
          (game.scores?.home?.inning_2 || 0),
        away:
          (game.scores?.away?.inning_1 || 0) +
          (game.scores?.away?.inning_2 || 0),
      },
      fulltime: {
        home: homeScore,
        away: awayScore,
      },
    },
    league: {
      id: game.league?.id || leagueId,
      name: game.league?.name || leagueName,
      country: game.league?.country || leagueCountry,
      logo: game.league?.logo || '',
      flag: game.league?.flag || null,
    },
  };
};

interface LeagueDataInput {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  loading: boolean;
  error: string | null;
  expanded: boolean;
}

export const adaptLeagueData = (
  leagueData: LeagueDataInput,
  fixtures: CommonFixture[],
): CommonLeagueData => {
  return {
    id: leagueData.id,
    name: leagueData.name,
    country: leagueData.country,
    logo: leagueData.logo,
    flag: leagueData.flag,
    fixtures,
    loading: leagueData.loading,
    error: leagueData.error,
    expanded: leagueData.expanded,
  };
};
