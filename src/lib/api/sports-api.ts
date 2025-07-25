import {
  ApiResponse,
  ApiError,
  Country,
  FootballLeague,
  FootballGame,
  FootballGameParams,
  FootballStanding,
  StandingsParams,
  LeagueParams,
  BasketballLeague,
  BasketballGame,
  BasketballStanding,
  BasketballGameParams,
  BaseballLeague,
  BaseballGame,
  BaseballStanding,
  BaseballGameParams,
  // New types for additional endpoints
  FootballLineup,
  FootballPrediction,
  FootballTeamDetails,
  FootballTeamStats,
  FootballPlayerStats,
  BasketballTeamDetails,
  TeamParams,
  TeamStatsParams,
  PlayerStatsParams,
  LineupParams,
  PredictionParams,
  RoundsParams,
} from '../types/api';

const API_KEY = process.env.API_SPORTS_KEY;
const BASE_URLS = {
  football: 'https://v3.football.api-sports.io',
  basketball: 'https://v1.basketball.api-sports.io',
  baseball: 'https://v1.baseball.api-sports.io',
};

class ApiClient {
  private baseUrl: string;

  constructor(sport: 'football' | 'basketball' | 'baseball') {
    this.baseUrl = BASE_URLS[sport];
  }

  private async request<T>(
    endpoint: string,
    params?: Record<string, unknown>,
  ): Promise<ApiResponse<T>> {
    const url = new URL(`${this.baseUrl}${endpoint}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        'x-rapidapi-key': API_KEY!,
        'x-apisports-key': API_KEY!,
      },
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new ApiError(
        `API request failed: ${response.statusText} - ${errorText}`,
        response.status,
        endpoint,
      );
    }

    return response.json();
  }

  async get<T>(endpoint: string, params?: Record<string, unknown>): Promise<T> {
    const result = await this.request<T>(endpoint, params);
    return result.response;
  }
}

export class FootballApi {
  private client = new ApiClient('football');

  // Countries
  async getCountries(): Promise<Country[]> {
    return this.client.get<Country[]>('/countries');
  }

  // Leagues
  async getLeagues(params?: LeagueParams): Promise<FootballLeague[]> {
    return this.client.get<FootballLeague[]>('/leagues', params);
  }

  // Games/Fixtures
  async getGames(params?: FootballGameParams): Promise<FootballGame[]> {
    return this.client.get<FootballGame[]>('/fixtures', params);
  }

  async getLiveGames(): Promise<FootballGame[]> {
    return this.getGames({ live: 'all' });
  }

  async getGamesByDate(date: string): Promise<FootballGame[]> {
    return this.getGames({ date });
  }

  async getGamesByLeague(
    league: number,
    season: number,
  ): Promise<FootballGame[]> {
    return this.getGames({ league, season });
  }

  async getGameById(id: number): Promise<FootballGame> {
    const games = await this.getGames({ id });
    if (games.length === 0) {
      throw new Error(`Game with id ${id} not found`);
    }
    return games[0];
  }

  // Head to Head
  async getHeadToHead(team1: number, team2: number): Promise<FootballGame[]> {
    return this.client.get<FootballGame[]>('/fixtures/headtohead', {
      h2h: `${team1}-${team2}`,
    });
  }

  // Lineups
  async getLineups(params: LineupParams): Promise<FootballLineup[]> {
    return this.client.get<FootballLineup[]>('/fixtures/lineups', params);
  }

  // Predictions
  async getPredictions(
    params: PredictionParams,
  ): Promise<FootballPrediction[]> {
    return this.client.get<FootballPrediction[]>('/predictions', params);
  }

  // Standings
  async getStandings(params: StandingsParams): Promise<FootballStanding[][]> {
    return this.client.get<FootballStanding[][]>('/standings', params);
  }

  // Rounds
  async getRounds(params: RoundsParams): Promise<string[]> {
    const result = await this.client.get<{ rounds: string[] }>(
      '/fixtures/rounds',
      params,
    );
    return result.rounds;
  }

  // Teams
  async getTeams(params?: TeamParams): Promise<FootballTeamDetails[]> {
    return this.client.get<FootballTeamDetails[]>('/teams', params);
  }

  async getTeamById(id: number): Promise<FootballTeamDetails> {
    const teams = await this.getTeams({ id });
    if (teams.length === 0) {
      throw new Error(`Team with id ${id} not found`);
    }
    return teams[0];
  }

  // Team Statistics
  async getTeamStatistics(
    params: TeamStatsParams,
  ): Promise<FootballTeamStats[]> {
    return this.client.get<FootballTeamStats[]>('/teams/statistics', params);
  }

  // Player Statistics
  async getPlayerStatistics(
    params: PlayerStatsParams,
  ): Promise<FootballPlayerStats[]> {
    return this.client.get<FootballPlayerStats[]>('/players', params);
  }

  async getPlayerById(
    id: number,
    season?: number,
  ): Promise<FootballPlayerStats> {
    const params: PlayerStatsParams = { player: id };
    if (season) {
      params.season = season;
    }
    const players = await this.getPlayerStatistics(params);
    if (players.length === 0) {
      throw new Error(`Player with id ${id} not found`);
    }
    return players[0];
  }
}

export class BasketballApi {
  private client = new ApiClient('basketball');

  // Countries
  async getCountries(): Promise<Country[]> {
    return this.client.get<Country[]>('/countries');
  }

  // Leagues
  async getLeagues(params?: LeagueParams): Promise<BasketballLeague[]> {
    return this.client.get<BasketballLeague[]>('/leagues', params);
  }

  // Games
  async getGames(params?: BasketballGameParams): Promise<BasketballGame[]> {
    return this.client.get<BasketballGame[]>('/games', params);
  }

  async getLiveGames(): Promise<BasketballGame[]> {
    return this.getGames({ live: 'all' });
  }

  async getGamesByDate(date: string): Promise<BasketballGame[]> {
    return this.getGames({ date });
  }

  async getGamesByLeague(
    league: number,
    season: string,
  ): Promise<BasketballGame[]> {
    return this.getGames({ league, season });
  }

  async getGameById(id: number): Promise<BasketballGame> {
    const games = await this.getGames({ id });
    if (games.length === 0) {
      throw new Error(`Game with id ${id} not found`);
    }
    return games[0];
  }

  // Head to Head
  async getHeadToHead(team1: number, team2: number): Promise<BasketballGame[]> {
    return this.client.get<BasketballGame[]>('/games/h2h', {
      h2h: `${team1}-${team2}`,
    });
  }

  // Standings
  async getStandings(params: StandingsParams): Promise<BasketballStanding[][]> {
    return this.client.get<BasketballStanding[][]>('/standings', params);
  }

  // Teams
  async getTeams(params?: TeamParams): Promise<BasketballTeamDetails[]> {
    return this.client.get<BasketballTeamDetails[]>('/teams', params);
  }

  async getTeamById(id: number): Promise<BasketballTeamDetails> {
    const teams = await this.getTeams({ id });
    if (teams.length === 0) {
      throw new Error(`Team with id ${id} not found`);
    }
    return teams[0];
  }
}

export class BaseballApi {
  private client = new ApiClient('baseball');

  // Countries
  async getCountries(): Promise<Country[]> {
    return this.client.get<Country[]>('/countries');
  }

  // Leagues
  async getLeagues(params?: LeagueParams): Promise<BaseballLeague[]> {
    return this.client.get<BaseballLeague[]>('/leagues', params);
  }

  // Games
  async getGames(params?: BaseballGameParams): Promise<BaseballGame[]> {
    return this.client.get<BaseballGame[]>('/games', params);
  }

  async getLiveGames(): Promise<BaseballGame[]> {
    return this.getGames({ live: 'all' });
  }

  async getGamesByDate(date: string): Promise<BaseballGame[]> {
    return this.getGames({ date });
  }

  async getGamesByLeague(
    league: number,
    season: number,
  ): Promise<BaseballGame[]> {
    return this.getGames({ league, season });
  }

  async getGameById(id: number): Promise<BaseballGame> {
    const games = await this.getGames({ id });
    if (games.length === 0) {
      throw new Error(`Game with id ${id} not found`);
    }
    return games[0];
  }

  // Head to Head (if available in baseball API)
  async getHeadToHead(team1: number, team2: number): Promise<BaseballGame[]> {
    return this.client.get<BaseballGame[]>('/games/h2h', {
      h2h: `${team1}-${team2}`,
    });
  }

  // Standings
  async getStandings(params: StandingsParams): Promise<BaseballStanding[][]> {
    return this.client.get<BaseballStanding[][]>('/standings', params);
  }
}

export class SportsApi {
  public football = new FootballApi();
  public basketball = new BasketballApi();
  public baseball = new BaseballApi();

  getCurrentSeason(): number {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    return month < 8 ? year - 1 : year;
  }

  getBasketballSeason(year?: number): string {
    const season = year ?? this.getCurrentSeason();
    return `${season}-${season + 1}`;
  }

  createSlug(name: string): string {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  async getPopularLeagues() {
    return {
      football: {
        'premier-league': {
          id: 39,
          name: 'Premier League',
          country: 'England',
        },
        'la-liga': { id: 140, name: 'La Liga', country: 'Spain' },
        'serie-a': { id: 135, name: 'Serie A', country: 'Italy' },
        bundesliga: { id: 78, name: 'Bundesliga', country: 'Germany' },
        'ligue-1': { id: 61, name: 'Ligue 1', country: 'France' },
        'champions-league': {
          id: 2,
          name: 'UEFA Champions League',
          country: 'World',
        },
      },
      basketball: {
        nba: { id: 12, name: 'NBA', country: 'USA' },
        euroleague: { id: 120, name: 'EuroLeague', country: 'Europe' },
      },
      baseball: {
        mlb: { id: 1, name: 'MLB', country: 'USA' },
        npb: { id: 2, name: 'NPB', country: 'Japan' },
      },
    };
  }
}

export const sportsApi = new SportsApi();
export const footballApi = new FootballApi();
export const basketballApi = new BasketballApi();
export const baseballApi = new BaseballApi();
