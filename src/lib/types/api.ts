// lib/types/api.ts

// Common interfaces used across all sports
export interface Country {
  id: number;
  name: string;
  code: string | null;
  flag: string | null;
}

export interface ApiResponse<T> {
  get: string;
  parameters: Record<string, unknown>;
  errors: string[];
  results: number;
  paging?: {
    current: number;
    total: number;
  };
  response: T;
}

export class ApiError extends Error {
  status: number;
  endpoint: string;

  constructor(message: string, status: number, endpoint: string) {
    super(message);
    this.status = status;
    this.endpoint = endpoint;
  }
}

export interface FootballLeague {
  id: number;
  name: string;
  country: string;
  logo: string;
  flag: string;
  season: number;
  round: string;
  standings: boolean;
}

export interface FootballTeam {
  id: number;
  name: string;
  logo: string;
  winner?: boolean | null;
}

export interface FootballVenue {
  id: number | null;
  name: string | null;
  city: string | null;
}

export interface FootballFixtureStatus {
  long: string;
  short: string;
  elapsed: number | null;
  extra: number | null;
}

export interface FootballFixturePeriods {
  first: number | null;
  second: number | null;
}

export interface FootballFixture {
  id: number;
  referee: string | null;
  timezone: string;
  date: string;
  timestamp: number;
  periods: FootballFixturePeriods;
  venue: FootballVenue;
  status: FootballFixtureStatus;
}

export interface FootballGoals {
  home: number | null;
  away: number | null;
}

export interface FootballScore {
  halftime: FootballGoals;
  fulltime: FootballGoals;
  extratime: FootballGoals;
  penalty: FootballGoals;
}

export interface FootballGame {
  fixture: FootballFixture;
  league: FootballLeague;
  teams: {
    home: FootballTeam;
    away: FootballTeam;
  };
  goals: FootballGoals;
  score: FootballScore;
}

export interface FootballStandingTeam {
  id: number;
  name: string;
  logo: string;
}

export interface FootballStandingStats {
  played: number;
  win: number;
  draw: number;
  lose: number;
  goals: {
    for: number;
    against: number;
  };
}

export interface FootballStanding extends Record<string, unknown> {
  rank: number;
  team: FootballStandingTeam;
  points: number;
  goalsDiff: number;
  group: string;
  form: string;
  status: string;
  description: string | null;
  all: FootballStandingStats;
  home: FootballStandingStats;
  away: FootballStandingStats;
  update: string;
}

export interface FootballPrediction {
  predictions: {
    winner: {
      id: number;
      name: string;
      comment: string | null;
    };
    win_or_draw: boolean;
    under_over: string;
    goals: {
      home: string;
      away: string | null;
    };
    advice: string;
    percent: {
      home: string;
      draw: string;
      away: string;
    };
  };
  league: FootballLeague;
  teams: {
    home: {
      id: number;
      name: string;
      logo: string;
      last_5: Record<string, unknown>;
      league: Record<string, unknown>;
    };
    away: {
      id: number;
      name: string;
      logo: string;
      last_5: Record<string, unknown>;
      league: Record<string, unknown>;
    };
  };
  comparison: Record<string, Record<string, string>>;
  h2h: FootballGame[];
}

export interface FootballPlayer {
  id: number;
  name: string;
  number: number;
  pos: string;
  grid: string | null;
}

export interface FootballLineup {
  team: {
    id: number;
    name: string;
    logo: string;
    colors: Record<string, unknown> | null;
  };
  coach: {
    id: number;
    name: string;
    photo: string;
  };
  formation: string;
  startXI: { player: FootballPlayer }[];
  substitutes: { player: FootballPlayer }[];
}

// Football Team Details
export interface FootballTeamDetails {
  team: FootballTeam;
  venue: FootballVenue;
}

// Football Team Statistics
export interface FootballTeamStats {
  league: FootballLeague;
  team: FootballTeam;
  form: string;
  fixtures: {
    played: { home: number; away: number; total: number };
    wins: { home: number; away: number; total: number };
    draws: { home: number; away: number; total: number };
    loses: { home: number; away: number; total: number };
  };
  goals: {
    for: {
      total: { home: number; away: number; total: number };
      average: { home: string; away: string; total: string };
      minute: Record<
        string,
        { total: number | null; percentage: string | null }
      >;
    };
    against: {
      total: { home: number; away: number; total: number };
      average: { home: string; away: string; total: string };
      minute: Record<
        string,
        { total: number | null; percentage: string | null }
      >;
    };
  };
  biggest: {
    streak: { wins: number; draws: number; loses: number };
    wins: { home: string; away: string };
    loses: { home: string; away: string };
    goals: {
      for: { home: number; away: number };
      against: { home: number; away: number };
    };
  };
  clean_sheet: { home: number; away: number; total: number };
  failed_to_score: { home: number; away: number; total: number };
  penalty: {
    scored: { total: number; percentage: string };
    missed: { total: number; percentage: string };
    total: number;
  };
  lineups: { formation: string; played: number }[];
  cards: {
    yellow: Record<string, { total: number | null; percentage: string | null }>;
    red: Record<string, { total: number | null; percentage: string | null }>;
  };
}

export interface FootballPlayerStats {
  player: {
    id: number;
    name: string;
    firstname: string;
    lastname: string;
    age: number;
    birth: { date: string; place: string; country: string };
    nationality: string;
    height: string;
    weight: string;
    injured: boolean;
    photo: string;
  };
  statistics: {
    team: FootballTeam;
    league: FootballLeague;
    games: {
      appearences: number;
      lineups: number;
      minutes: number;
      number: number | null;
      position: string;
      rating: string | null;
      captain: boolean;
    };
    substitutes: { in: number; out: number; bench: number };
    shots: { total: number; on: number };
    goals: {
      total: number;
      conceded: number | null;
      assists: number | null;
      saves: number | null;
    };
    passes: { total: number; key: number; accuracy: number };
    tackles: { total: number; blocks: number | null; interceptions: number };
    duels: { total: number; won: number };
    dribbles: { attempts: number; success: number; past: number | null };
    fouls: { drawn: number; committed: number };
    cards: { yellow: number; yellowred: number; red: number };
    penalty: {
      won: number | null;
      commited: number | null;
      scored: number;
      missed: number;
      saved: number | null;
    };
  }[];
}

// Basketball Types - API v1
export interface BasketballLeague {
  id: number;
  name: string;
  type: string;
  logo: string;
  country: Country;
  seasons: BasketballSeason[];
}

export interface BasketballSeason {
  season: string;
  start: string;
  end: string;
  coverage: {
    games: {
      statistics: {
        teams: boolean;
        players: boolean;
      };
    };
    standings: boolean;
    players: boolean;
    odds: boolean;
  };
}

export interface BasketballTeam {
  id: number;
  name: string;
  logo: string;
}

export interface BasketballGame {
  id: number;
  date: string;
  time: string;
  timestamp: number;
  timezone: string;
  stage: string | null;
  week: string | null;
  status: {
    long: string;
    short: string;
    timer: string | null;
  };
  league: BasketballLeague;
  country: Country;
  teams: {
    home: BasketballTeam;
    away: BasketballTeam;
  };
  scores: {
    home: Record<string, number | null> & { total: number | null };
    away: Record<string, number | null> & { total: number | null };
  };
}

export interface BasketballStanding {
  position: number;
  stage: string;
  group: {
    name: string;
    points: number;
  };
  team: BasketballTeam;
  league: {
    id: number;
    name: string;
    type: string;
    season: string;
    logo: string;
  };
  country: Country;
  games: {
    played: number;
    win: {
      total: number;
      percentage: string;
    };
    lose: {
      total: number;
      percentage: string;
    };
  };
  points: {
    for: number;
    against: number;
  };
  form: string | null;
  description: string | null;
}

export interface BasketballTeamDetails {
  id: number;
  name: string;
  logo: string;
  country: Country;
}

// Baseball Types - API v1
export interface BaseballLeague {
  id: number;
  name: string;
  type: string;
  logo: string;
  country: Country;
  seasons: BaseballSeason[];
}

export interface BaseballSeason {
  season: number;
  current: boolean;
  start: string;
  end: string;
}

export interface BaseballTeam {
  id: number;
  name: string;
  logo: string;
}

export interface BaseballGame {
  id: number;
  date: string;
  time: string;
  timestamp: number;
  timezone: string;
  status: {
    long: string;
    short: string;
  };
  league: BaseballLeague;
  country: Country;
  teams: {
    home: BaseballTeam;
    away: BaseballTeam;
  };
  scores: {
    home: {
      total: number | null;
      innings: Record<string, number>;
    };
    away: {
      total: number | null;
      innings: Record<string, number>;
    };
  };
}

export interface BaseballStanding {
  position: number;
  stage: string;
  group: {
    name: string;
  };
  team: BaseballTeam;
  league: {
    id: number;
    name: string;
    type: string;
    logo: string;
    season: number;
  };
  country: Country;
  games: {
    played: number;
    win: {
      total: number;
      percentage: string;
    };
    lose: {
      total: number;
      percentage: string;
    };
  };
  points: {
    for: number;
    against: number;
  };
  form: string;
  description: string | null;
}

// Param Types
export interface TeamParams extends Record<string, unknown> {
  id?: number;
  name?: string;
  league?: number;
  season?: number;
  country?: string;
  search?: string;
}

export interface TeamStatsParams extends Record<string, unknown> {
  league: number;
  season: number;
  team: number;
  date?: string;
}

export interface PlayerStatsParams extends Record<string, unknown> {
  player?: number;
  id?: number;
  season?: number;
}

export interface LineupParams extends Record<string, unknown> {
  fixture: number;
  team?: number;
}

export interface PredictionParams extends Record<string, unknown> {
  fixture: number;
}

export interface RoundsParams extends Record<string, unknown> {
  league: number;
  season: number;
  current?: boolean;
}

export interface FootballGameParams extends Record<string, unknown> {
  id?: number;
  ids?: string;
  live?: string;
  date?: string;
  league?: number;
  season?: number;
  team?: number;
  last?: number;
  next?: number;
  timezone?: string;
}

export interface BasketballGameParams extends Record<string, unknown> {
  id?: number;
  date?: string;
  league?: number;
  season?: string;
  h2h?: string;
  live?: string;
}

export interface BaseballGameParams extends Record<string, unknown> {
  id?: number;
  live?: string;
  date?: string;
  league?: number;
  season?: number;
  timezone?: string;
  h2h?: string;
}

export interface StandingsParams extends Record<string, unknown> {
  league: number;
  season: number | string;
}

export interface LeagueParams extends Record<string, unknown> {
  id?: number;
  name?: string;
  country?: string;
  code?: string;
  season?: number;
  type?: string;
  search?: string;
  last?: number;
}
