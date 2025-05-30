'use client';

import React from 'react';
import PreviewSection from '../preview';

interface MatchDetail {
  label: string;
  value: string;
}

interface TableRow {
  rank: number;
  name: string;
  won: number;
  lost: number;
  pct: number;
  gb: string;
  rs: number;
  ra: number;
  diff: string;
  strk: string;
  highlight: boolean;
}

interface TableColumn {
  key: keyof TableRow;
  label: string;
}

const previewContent: string[] = [
  'The historic rivalry between the New York Yankees and the Boston Red Sox continues at Yankee Stadium on May 10th with Game 2 of a three-game series. With the Yankees currently leading the AL East and the Red Sox close behind in third place, this matchup has significant divisional implications.',
  'The Yankees enter this contest with impressive home form, having won 14 of their 18 home games this season. Their pitching rotation has been dominant, posting a combined 3.24 ERA, while their offense leads the league with 52 home runs. Aaron Judge has been particularly explosive, leading the MLB with 15 home runs already this season.',
  'Meanwhile, the Red Sox have shown resilience on the road with a 12-8 away record. Their batting lineup has been productive, ranking third in the league for team batting average (.267). Rafael Devers continues to be their offensive catalyst, currently batting .312 with 10 home runs and 32 RBIs this season. However, their pitching has been inconsistent, presenting potential opportunities for the powerful Yankees lineup.',
];

const keyMatchFactors: string[] = [
  "Yankees' home advantage at Yankee Stadium where they've won 78% of their games",
  'Gerrit Cole scheduled to start for the Yankees (5-1, 2.68 ERA)',
  "Red Sox's strong road batting average of .271",
  "Aaron Judge's league-leading home run performance",
  'Injury concerns for Red Sox closer Kenley Jansen',
  'Historical rivalry impact on player performance',
  'Weather forecast: 72°F, slight chance of rain (15%)',
];

const matchInformation: MatchDetail[][] = [
  [
    { label: 'Competition', value: 'MLB Regular Season 2025' },
    { label: 'Date', value: 'May 10, 2025' },
    { label: 'Kick-off', value: '19:00 ET' },
    { label: 'Venue', value: 'Yankee Stadium' },
  ],
  [
    { label: 'TV Coverage', value: 'ESPN, YES Network' },
    { label: 'Weather', value: '72°F, 15% Rain Chance' },
    { label: 'Wind', value: '8 mph Out to Right Field' },
    { label: 'Attendance', value: '47,000 (Expected)' },
  ],
];

const standingsTableData: TableRow[] = [
  {
    rank: 1,
    name: 'New York Yankees',
    won: 27,
    lost: 13,
    pct: 0.675,
    gb: '-',
    rs: 178,
    ra: 124,
    diff: '+54',
    strk: 'W3',
    highlight: false,
  },
  {
    rank: 2,
    name: 'Tampa Bay Rays',
    won: 24,
    lost: 18,
    pct: 0.571,
    gb: '4.0',
    rs: 153,
    ra: 138,
    diff: '+15',
    strk: 'L1',
    highlight: false,
  },
  {
    rank: 3,
    name: 'Boston Red Sox',
    won: 23,
    lost: 18,
    pct: 0.561,
    gb: '4.5',
    rs: 166,
    ra: 149,
    diff: '+17',
    strk: 'W2',
    highlight: false,
  },
  {
    rank: 4,
    name: 'Toronto Blue Jays',
    won: 19,
    lost: 21,
    pct: 0.475,
    gb: '8.0',
    rs: 137,
    ra: 142,
    diff: '-5',
    strk: 'L2',
    highlight: false,
  },
  {
    rank: 5,
    name: 'Baltimore Orioles',
    won: 18,
    lost: 23,
    pct: 0.439,
    gb: '9.5',
    rs: 141,
    ra: 168,
    diff: '-27',
    strk: 'W1',
    highlight: false,
  },
];

const columns: TableColumn[] = [
  { key: 'rank', label: '#' },
  { key: 'name', label: 'Team' },
  { key: 'won', label: 'W' },
  { key: 'lost', label: 'L' },
  { key: 'pct', label: 'PCT' },
  { key: 'gb', label: 'GB' },
  { key: 'rs', label: 'RS' },
  { key: 'ra', label: 'RA' },
  { key: 'diff', label: 'DIFF' },
  { key: 'strk', label: 'STRK' },
];

const GamePreview: React.FC = () => {
  return (
    <PreviewSection
      content={previewContent}
      keyFactors={keyMatchFactors}
      matchInfo={matchInformation}
      tableData={standingsTableData}
      columns={columns}
    />
  );
};

export default GamePreview;
