export type Sport = 'football' | 'basketball' | 'baseball';

export interface CalendarFixture {
  fixture: {
    id: number;
    referee: string | null;
    timezone: string;
    date: string;
    timestamp: number;
    periods: {
      first: number | null;
      second: number | null;
    };
    venue: {
      id: number | null;
      name: string | null;
      city: string | null;
    };
    status: {
      long: string;
      short: string;
      elapsed: number | null;
    };
  };
  league: {
    id: number;
    name: string;
    country: string;
    logo: string;
    flag: string | null;
    season: number | string;
    round: string;
  };
  teams: {
    home: Team & { winner: boolean | null };
    away: Team & { winner: boolean | null };
  };
  goals: {
    home: number | null;
    away: number | null;
  };
  score: {
    halftime: {
      home: number | null;
      away: number | null;
    };
    fulltime: {
      home: number | null;
      away: number | null;
    };
    extratime: {
      home: number | null;
      away: number | null;
    };
    penalty: {
      home: number | null;
      away: number | null;
    };
  };
}

export interface Team {
  id: number;
  name: string;
  logo: string;
}

export interface League {
  id: number;
  name: string;
  country: string;
}

export type ViewType = 'all' | 'finished' | 'upcoming' | 'live';

export interface UseCalendarHook {
  fixtures: CalendarFixture[];
  loading: boolean;
  error: string | null;
  selectedLeague: number;
  setSelectedLeague: (leagueId: number) => void;
  viewType: ViewType;
  setViewType: (viewType: ViewType) => void;
  leagues: League[];
}

export interface SportCalendarConfig {
  sport: 'football' | 'basketball' | 'baseball';
  apiHost: string;
  leagues: League[];
  defaultLeagueId: number;
}
