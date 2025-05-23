import React from 'react';
import PreviewSection from '../../preview';

interface InfoItem {
  label: string;
  value: string;
}

type MatchInfoSection = InfoItem[];

interface TableRow {
  rank: number;
  name: string;
  played: number;
  won: number;
  draw: number;
  lost: number;
  gf: number;
  ga: number;
  gd: string;
  pts: number;
  highlight: boolean;
}

interface TableColumn {
  key: keyof TableRow;
  label: string;
  bold?: boolean;
}

const previewContent: string[] = [
  "The football world turns its attention to Camp Nou on May 4th as Barcelona hosts arch-rivals Real Madrid in another electrifying El Clásico. With only three points separating the teams in the La Liga title race, this match could prove decisive in determining this season's champion.",
  'Barcelona enters this clash after an impressive run of form, having won four of their last five league matches. Their attacking prowess has been on full display, netting 14 goals in that span, with Robert Lewandowski leading the charge. The Polish striker has found the net 8 times in his last 7 appearances across all competitions.',
  "Meanwhile, Real Madrid has shown occasional vulnerability on the road but remains a formidable opponent with their lethal counterattacking ability. Los Blancos have conceded in six consecutive away games, suggesting Barcelona could find opportunities in front of their home supporters. However, with talents like Vinicius Junior and Jude Bellingham in their ranks, Madrid's ability to punish even the slightest defensive lapse cannot be underestimated.",
];

const keyMatchFactors: string[] = [
  "Barcelona's home advantage at Camp Nou where they've won 85% of their matches this season",
  "Real Madrid's recent defensive struggles, conceding in 6 consecutive away games",
  "Robert Lewandowski's incredible scoring form with 8 goals in his last 7 matches",
  "Vinicius Junior's threat on the counter-attack for Real Madrid",
  "Barcelona's midfield maestro Pedri returning from injury",
  'The potential absence of Thibaut Courtois for Real Madrid',
  "Barcelona's superior possession statistics (62% average vs. Madrid's 54%)",
];

const matchInformation: MatchInfoSection[] = [
  [
    { label: 'Competition', value: 'La Liga 2024/25' },
    { label: 'Date', value: 'May 4, 2025' },
    { label: 'Kick-off', value: '20:00 CET' },
    { label: 'Venue', value: 'Camp Nou' },
  ],
  [
    { label: 'Referee', value: 'Jesús Gil Manzano' },
    { label: 'TV Coverage', value: 'DAZN, LaLiga TV' },
    { label: 'Weather', value: '18°C, Clear' },
    { label: 'Attendance', value: '99,000 (Expected)' },
  ],
];

const standingsTableData: TableRow[] = [
  {
    rank: 1,
    name: 'Real Madrid',
    played: 33,
    won: 24,
    draw: 6,
    lost: 3,
    gf: 68,
    ga: 25,
    gd: '+43',
    pts: 78,
    highlight: false,
  },
  {
    rank: 2,
    name: 'Barcelona',
    played: 33,
    won: 23,
    draw: 6,
    lost: 4,
    gf: 72,
    ga: 34,
    gd: '+38',
    pts: 75,
    highlight: true,
  },
  {
    rank: 3,
    name: 'Atletico Madrid',
    played: 33,
    won: 20,
    draw: 5,
    lost: 8,
    gf: 58,
    ga: 33,
    gd: '+25',
    pts: 65,
    highlight: false,
  },
];

const columns: TableColumn[] = [
  { key: 'rank', label: '#' },
  { key: 'name', label: 'Team' },
  { key: 'played', label: 'P' },
  { key: 'won', label: 'W' },
  { key: 'draw', label: 'D' },
  { key: 'lost', label: 'L' },
  { key: 'gf', label: 'GF' },
  { key: 'ga', label: 'GA' },
  { key: 'gd', label: 'GD' },
  { key: 'pts', label: 'PTS', bold: true },
];

const MatchPreview: React.FC = () => {
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

export default MatchPreview;
