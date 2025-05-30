import React from 'react';
import PreviewSection from '../preview';

interface MatchDetail {
  label: string;
  value: string;
}

interface TeamStanding {
  conference: string;
  name: string;
  won: number;
  lost: number;
  winPercentage: number;
  ppg: number;
  oppPpg: number;
  seed: number;
  highlight: boolean;
}

interface TableColumn {
  key: keyof TeamStanding;
  label: string;
}

const previewContent: string[] = [
  "Basketball's most storied rivalry takes center stage on May 3rd as the Los Angeles Lakers host the Boston Celtics in a critical Conference Finals matchup. With 34 championships between them, these two franchises bring history and intensity every time they face off, and this playoff encounter promises to deliver thrilling basketball at the highest level.",
  'The Lakers enter this contest with momentum after an impressive series victory over the Denver Nuggets, with LeBron James continuing to defy Father Time by averaging a near triple-double throughout the playoffs. Anthony Davis has been a defensive force, anchoring the paint and making life difficult for opponents trying to score inside.',
  ">Meanwhile, the Celtics have been the class of the Eastern Conference all season, led by their dynamic duo of Jayson Tatum and Jaylen Brown. Their balanced attack and versatile defense have made them the favorites to win it all this year. However, the Lakers' home court advantage and playoff experience make this a fascinating matchup that could go either way.",
];

const keyMatchFactors: string[] = [
  "Lakers' home advantage at Crypto.com Arena where they've won 80% of their playoff games",
  "Celtics' league-leading three-point shooting (39.7% as a team)",
  "LeBron James' leadership and playoff experience (18 Conference Finals appearances)",
  "Celtics' depth advantage with six players averaging double figures",
  "Anthony Davis' defensive presence (3.2 blocks per game in playoffs)",
  "Boston's #1 ranked defense allowing just 105.4 points per game",
  "Lakers' transition game (16.4 fast break points per game)",
];

const matchInformation: MatchDetail[][] = [
  [
    { label: 'Competition', value: 'NBA Playoffs 2025' },
    { label: 'Date', value: 'May 3, 2025' },
    { label: 'Tip-off', value: '20:00 ET' },
    { label: 'Venue', value: 'Crypto.com Arena' },
  ],
  [
    { label: 'Referees', value: 'Scott Foster, Tony Brothers' },
    { label: 'TV Coverage', value: 'ESPN, NBA TV' },
    { label: 'Series Standing', value: '0-0' },
    { label: 'Attendance', value: '19,000 (Expected)' },
  ],
];

const standingsTableData: TeamStanding[] = [
  {
    conference: 'Eastern',
    name: 'Boston Celtics',
    won: 8,
    lost: 2,
    winPercentage: 0.8,
    ppg: 112.4,
    oppPpg: 103.5,
    seed: 1,
    highlight: false,
  },
  {
    conference: 'Western',
    name: 'Los Angeles Lakers',
    won: 8,
    lost: 4,
    winPercentage: 0.667,
    ppg: 108.7,
    oppPpg: 105.1,
    seed: 5,
    highlight: false,
  },
  {
    conference: 'Eastern',
    name: 'New York Knicks',
    won: 7,
    lost: 6,
    winPercentage: 0.538,
    ppg: 106.2,
    oppPpg: 102.8,
    seed: 2,
    highlight: false,
  },
];

const columns: TableColumn[] = [
  { key: 'conference', label: 'Conference' },
  { key: 'name', label: 'Team' },
  { key: 'won', label: 'W' },
  { key: 'lost', label: 'L' },
  { key: 'winPercentage', label: 'Win %' },
  { key: 'ppg', label: 'PPG' },
  { key: 'oppPpg', label: 'OPP PPG' },
  { key: 'seed', label: 'Seed' },
];

const GamePreview: React.FC = () => {
  return (
    <PreviewSection
      titleOne="Key Game Factors"
      titleTwo="Game Information"
      titleThree="Current NBA Playoff Standings"
      columns={columns}
      content={previewContent}
      keyFactors={keyMatchFactors}
      matchInfo={matchInformation}
      tableData={standingsTableData}
    />
  );
};

export default GamePreview;
