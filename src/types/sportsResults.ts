import { ResultFilter } from '@/src/types/types';

export interface SportConfig {
  title: string;
  loadingMessage: string;
  sportType: string;
}

export interface Country {
  name: string;
  code: string | null;
  flag: string | null;
}

export interface League {
  id: number;
  name: string;
  type: string;
  logo: string;
}

export interface Season {
  year: number;
  start: string;
  end: string;
  current: boolean;
  coverage: {
    fixtures: {
      events: boolean;
      lineups: boolean;
      statistics_fixtures: boolean;
      statistics_players: boolean;
    };
    standings: boolean;
    players: boolean;
    top_scorers: boolean;
    top_assists: boolean;
    top_cards: boolean;
    injuries: boolean;
    predictions: boolean;
    odds: boolean;
  };
}

export interface LeagueData {
  league: League;
  country: Country;
  seasons: Season[];
}

export interface UseResultsHook {
  leaguesData: LeagueData[];
  initialLoading: boolean;
  selectedFilter: ResultFilter;
  setSelectedFilter: (filter: ResultFilter) => void;
  resultFilters: ResultFilter[];
}
