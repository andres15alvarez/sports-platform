export type Team = {
  name?: string;
};

export type GameStatus = {
  short?: string;
};

export type Game = {
  timestamp?: number;
  status?: GameStatus;
  teams?: {
    home?: Team;
    away?: Team;
  };
};

export type OddValue = {
  value?: string;
};

export type Bet = {
  values?: OddValue[];
};

export type Bookmaker = {
  bets?: Bet[];
};

export type MatchData = {
  game?: Game;
  teams?: {
    home?: Team;
    away?: Team;
  };
  bookmakers?: Bookmaker[];
};
