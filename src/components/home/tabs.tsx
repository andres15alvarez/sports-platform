'use client';
import React, { useState } from 'react';
import { Table } from './table';

interface MatchData {
  match: string;
  date: string;
  probability: string;
  prediction: string;
  result: string;
  odds: string;
  greenOddsIndex?: number;
  leagueLogo: string;
  leagueName: string;
  [key: string]: string | number | undefined;
}

// Datos Desktop
const seriesADesktop: MatchData[] = [
  {
    match: 'Inter - Milan',
    date: '04/27 20:45',
    probability: '42%  28%  30%',
    prediction: '1',
    result: '2-1',
    odds: '1.85  3.40  4.50',
    greenOddsIndex: 0,
    leagueLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Serie_A_logo_2022.svg/261px-Serie_A_logo_2022.svg.png',
    leagueName: 'Serie A',
  },
  {
    match: 'Juventus - Roma',
    date: '04/27 15:00',
    probability: '44%  30%  26%',
    prediction: '1',
    result: '2-0',
    odds: '1.95  3.30  3.75',
    greenOddsIndex: 0,
    leagueLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Serie_A_logo_2022.svg/261px-Serie_A_logo_2022.svg.png',
    leagueName: 'Serie A',
  },
];

const premierDesktop: MatchData[] = [
  {
    match: 'Liverpool - Man City',
    date: '04/27 18:30',
    probability: '35%  35%  30%',
    prediction: 'X',
    result: '1-1',
    odds: '2.50  3.40  2.80',
    greenOddsIndex: 1,
    leagueLogo:
      'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
    leagueName: 'Premier',
  },
];

const atpDesktop: MatchData[] = [
  {
    match: 'Djokovic - Alcaraz',
    date: '04/27 14:00',
    probability: '45%  55%',
    prediction: '2',
    result: '1-2',
    odds: '2.05  1.75',
    greenOddsIndex: 1,
    leagueLogo:
      'https://upload.wikimedia.org/wikipedia/fr/thumb/f/fe/Logo_Novak_Djokovic.svg/300px-Logo_Novak_Djokovic.svg.png?20120708093452',
    leagueName: 'Madrid',
  },
];

const wtaDesktop: MatchData[] = [
  {
    match: 'Swiatek - Sabalenka',
    date: '04/27 16:00',
    probability: '60%  40%',
    prediction: '1',
    result: '2-0',
    odds: '1.65  2.25',
    greenOddsIndex: 0,
    leagueLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/WTA_2025.svg/330px-WTA_2025.svg.png',
    leagueName: 'Rome',
  },
];

const nbaDesktop: MatchData[] = [
  {
    match: 'Lakers - Celtics',
    date: '04/27 02:30',
    probability: '48%  52%',
    prediction: '2',
    result: '98-105',
    odds: '2.10  1.75',
    greenOddsIndex: 1,
    leagueLogo:
      'https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg',
    leagueName: 'NBA',
  },
  {
    match: 'Bucks - Heat',
    date: '04/27 23:00',
    probability: '65%  35%',
    prediction: '1',
    result: '112-103',
    odds: '1.45  2.75',
    greenOddsIndex: 0,
    leagueLogo:
      'https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg',
    leagueName: 'NBA',
  },
];

const euroleagueDesktop: MatchData[] = [
  {
    match: 'Olympiacos - Real Madrid',
    date: '04/27 20:00',
    probability: '55%  45%',
    prediction: '1',
    result: '83-74',
    odds: '1.70  2.15',
    leagueLogo:
      'https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Olympiacos_FC_crest.svg/250px-Olympiacos_FC_crest.svg.png',
    leagueName: 'Euroleague',
  },
];

const f1Desktop: MatchData[] = [
  {
    match: 'Max Verstappen - Red Bull',
    date: '05/26 15:00',
    probability: '38%',
    prediction: 'Winner',
    result: '1st',
    odds: '1.60',
    greenOddsIndex: 0,
    leagueLogo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg',
    leagueName: 'Formula 1',
  },
  {
    match: 'Charles Leclerc - Ferrari',
    date: '05/26 15:00',
    probability: '25%',
    prediction: 'Pole',
    result: '1st',
    odds: '2.10',
    greenOddsIndex: 0,
    leagueLogo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg',
    leagueName: 'Formula 1',
  },
  {
    match: 'Lando Norris - McLaren',
    date: '05/26 15:00',
    probability: '65%',
    prediction: 'Podium',
    result: '3rd',
    odds: '1.85',
    greenOddsIndex: 0,
    leagueLogo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg',
    leagueName: 'Formula 1',
  },
];

// Datos Mobile
const seriesAMobile: MatchData[] = [
  {
    match: 'Inter - Milan',
    date: '04/27 20:45',
    probability: '42%  28%  30%',
    prediction: '1',
    result: '2-1',
    odds: '1.85',
    greenOddsIndex: 0,
    leagueLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Serie_A_logo_2022.svg/261px-Serie_A_logo_2022.svg.png',
    leagueName: 'Serie A',
  },
  {
    match: 'Juve - Roma',
    date: '04/27 15:00',
    probability: '44%  30%  26%',
    prediction: '1',
    result: '2-0',
    odds: '1.95',
    greenOddsIndex: 0,
    leagueLogo:
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Serie_A_logo_2022.svg/261px-Serie_A_logo_2022.svg.png',
    leagueName: 'Serie A',
  },
];

const premierMobile: MatchData[] = [
  {
    match: 'Liverpool - Man City',
    date: '04/27 18:30',
    probability: '35%  35%  30%',
    prediction: 'X',
    result: '1-1',
    odds: '3.40',
    greenOddsIndex: 0,
    leagueLogo:
      'https://upload.wikimedia.org/wikipedia/en/f/f2/Premier_League_Logo.svg',
    leagueName: 'Premier',
  },
];

const atpMobile: MatchData[] = [
  {
    match: 'Djokovic - Alcaraz',
    date: '04/27 14:00',
    probability: '45%  55%',
    prediction: '2',
    result: '1-2',
    odds: '1.75',
    greenOddsIndex: 0,
    leagueLogo:
      'https://upload.wikimedia.org/wikipedia/fr/thumb/f/fe/Logo_Novak_Djokovic.svg/300px-Logo_Novak_Djokovic.svg.png?20120708093452',
    leagueName: 'Madrid',
  },
];

const nbaMobile: MatchData[] = [
  {
    match: 'Lakers - Celtics',
    date: '04/27 02:30',
    probability: '48%  52%',
    prediction: '2',
    result: '98-105',
    odds: '1.75',
    greenOddsIndex: 0,
    leagueLogo:
      'https://upload.wikimedia.org/wikipedia/en/0/03/National_Basketball_Association_logo.svg',
    leagueName: 'NBA',
  },
];

const f1Mobile: MatchData[] = [
  {
    match: 'Verstappen',
    date: '05/26 15:00',
    probability: '38%',
    prediction: 'Win',
    result: '1st',
    odds: '1.60',
    greenOddsIndex: 0,
    leagueLogo: 'https://upload.wikimedia.org/wikipedia/commons/3/33/F1.svg',
    leagueName: 'Formula 1',
  },
];

interface TableColumn {
  key: string;
  label: string;
}

const desktopCol: TableColumn[] = [
  { key: 'match', label: 'Match' },
  { key: 'date', label: 'Date' },
  { key: 'probability', label: 'Prob. %' },
  { key: 'prediction', label: 'Prediction' },
  { key: 'result', label: 'Result' },
  { key: 'odds', label: 'Odds' },
];

//const desktopMonacoCol: TableColumn[] = [
//{ key: 'driver', label: 'Driver' },
//{ key: 'date', label: 'Date' },
//{ key: 'probability', label: 'Prob. %' },
//{ key: 'prediction', label: 'Prediction' },
//{ key: 'result', label: 'Result' },
//{ key: 'odds', label: 'Odds' },
//];

const mobileCol: TableColumn[] = [
  { key: 'match', label: 'Match' },
  { key: 'prediction', label: 'Pred' },
  { key: 'odds', label: 'Odds' },
];

type TabType = 'football' | 'tennis' | 'basketball' | 'f1';

const Tabs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('football');

  const handleTabClick = (tab: TabType) => {
    setActiveTab(tab);
  };

  return (
    <>
      <div className="mb-4 border-b border-gray-200 ">
        <ul
          className="flex text-xs whitespace-nowrap lg:text-sm font-medium text-center"
          id="sportsTabs"
        >
          <li className="mr-1 lg:mr-2">
            <button
              className={`inline-block p-4 border-b-2 ${
                activeTab === 'football'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              } rounded-t-lg`}
              onClick={() => handleTabClick('football')}
            >
              Football
            </button>
          </li>
          <li className="mr-1 lg:mr-2">
            <button
              className={`inline-block p-4 border-b-2 ${
                activeTab === 'tennis'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              } rounded-t-lg`}
              onClick={() => handleTabClick('tennis')}
            >
              Tennis
            </button>
          </li>
          <li className="mr-1 lg:mr-2">
            <button
              className={`inline-block p-4 border-b-2 ${
                activeTab === 'basketball'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              } rounded-t-lg`}
              onClick={() => handleTabClick('basketball')}
            >
              Basketball
            </button>
          </li>
          <li className="mr-1 lg:mr-2">
            <button
              className={`inline-block p-4 border-b-2 ${
                activeTab === 'f1'
                  ? 'border-green-600 text-green-600'
                  : 'border-transparent hover:text-gray-600 hover:border-gray-300'
              } rounded-t-lg`}
              onClick={() => handleTabClick('f1')}
            >
              Formula 1
            </button>
          </li>
        </ul>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'football' && (
          <>
            <div id="football-content" className="sport-content">
              <div className="bg-gray-50 rounded-lg p-2 mb-4 overflow-x-auto whitespace-nowrap">
                <div className="flex space-x-2">
                  <a
                    href="#"
                    className="bg-green-600 hidden text-white px-3 py-1 rounded-md text-xs font-medium lg:inline-block"
                  >
                    1X2 Predictions
                  </a>
                  <a
                    href="#"
                    className="bg-green-600 text-white lg:hidden px-3 py-1 rounded-md text-xs font-medium inline-block"
                  >
                    1X2
                  </a>
                  <a
                    href="#"
                    className="bg-white hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 inline-block"
                  >
                    Under/Over 2.5
                  </a>
                  <a
                    href="#"
                    className="bg-white hidden hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 lg:inline-block"
                  >
                    Both Teams to Score
                  </a>

                  <a
                    href="#"
                    className="bg-white hover:bg-green-50 lg:hidden text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 inline-block"
                  >
                    BTTS
                  </a>
                  <a
                    href="#"
                    className="bg-white hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 inline-block"
                  >
                    Double Chance
                  </a>
                  <a
                    href="#"
                    className="bg-white hidden hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 lg:inline-block"
                  >
                    Handicap
                  </a>
                </div>
              </div>
            </div>
            <div className="mb-6 hidden lg:block">
              <Table
                title={'Serie A'}
                bookmakerOdds={seriesADesktop}
                columns={desktopCol}
              />
            </div>

            <div className="mb-6 lg:hidden">
              <Table
                title={'Serie A'}
                bookmakerOdds={seriesAMobile}
                columns={mobileCol}
              />
            </div>

            <div className="mb-6 hidden lg:block">
              <Table
                title={'Premier League'}
                bookmakerOdds={premierDesktop}
                columns={desktopCol}
              />
            </div>

            <div className="mb-6 lg:hidden">
              <Table
                title={'Premier League'}
                bookmakerOdds={premierMobile}
                columns={mobileCol}
              />
            </div>

            <div className="text-center mt-4">
              <a
                href="/football-predictions"
                className="inline-block bg-green-600  hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
              >
                View all football predictions
              </a>
            </div>
          </>
        )}
        {activeTab === 'tennis' && (
          <>
            <div id="football-content" className="sport-content">
              <div className="bg-gray-50 rounded-lg p-2 mb-4 overflow-x-auto whitespace-nowrap">
                <div className="flex space-x-2">
                  <a
                    href="#"
                    className="bg-green-600  text-white px-3 py-1 rounded-md text-xs font-medium lg:inline-block"
                  >
                    Match Winner
                  </a>
                  <a
                    href="#"
                    className="bg-white hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 inline-block"
                  >
                    Set Betting
                  </a>
                  <a
                    href="#"
                    className="bg-white hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 inline-block"
                  >
                    Total Games
                  </a>
                  <a
                    href="#"
                    className="bg-white hidden hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 lg:inline-block"
                  >
                    Game Handicap
                  </a>
                </div>
              </div>
            </div>
            <div className="mb-6 hidden lg:block">
              <Table
                title={'ATP Tour'}
                bookmakerOdds={atpDesktop}
                columns={desktopCol}
              />
            </div>

            <div className="mb-6 lg:hidden">
              <Table
                title={'ATP Tour'}
                bookmakerOdds={atpMobile}
                columns={mobileCol}
              />
            </div>

            <div className="mb-6 hidden lg:block">
              <Table
                title={'WTA Tour'}
                bookmakerOdds={wtaDesktop}
                columns={desktopCol}
              />
            </div>

            <div className="text-center mt-4">
              <a
                href="/football-predictions"
                className="inline-block bg-green-600  hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
              >
                View all tennis predictions
              </a>
            </div>
          </>
        )}
        {activeTab === 'basketball' && (
          <>
            <div id="football-content" className="sport-content">
              <div className="bg-gray-50 rounded-lg p-2 mb-4 overflow-x-auto whitespace-nowrap">
                <div className="flex space-x-2">
                  <a
                    href="#"
                    className="bg-green-600  text-white px-3 py-1 rounded-md text-xs font-medium lg:inline-block"
                  >
                    Match Winner
                  </a>
                  <a
                    href="#"
                    className="bg-white hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 inline-block"
                  >
                    Point Spread
                  </a>
                  <a
                    href="#"
                    className="bg-white  hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 lg:inline-block"
                  >
                    Over/Under
                  </a>

                  <a
                    href="#"
                    className="bg-white hidden lg:inline-block hover:bg-green-50  text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 "
                  >
                    Team Totals
                  </a>
                </div>
              </div>
            </div>
            <div className="mb-6 hidden lg:block">
              <Table
                title={'NBA'}
                bookmakerOdds={nbaDesktop}
                columns={desktopCol}
              />
            </div>

            <div className="mb-6 lg:hidden">
              <Table
                title={'NBA'}
                bookmakerOdds={nbaMobile}
                columns={mobileCol}
              />
            </div>

            <div className="mb-6 hidden lg:block">
              <Table
                title={'Euroleague'}
                bookmakerOdds={euroleagueDesktop}
                columns={desktopCol}
              />
            </div>

            <div className="text-center mt-4">
              <a
                href="/football-predictions"
                className="inline-block bg-green-600  hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
              >
                View all basketball predictions
              </a>
            </div>
          </>
        )}
        {activeTab === 'f1' && (
          <>
            <div id="football-content" className="sport-content">
              <div className="bg-gray-50 rounded-lg p-2 mb-4 overflow-x-auto whitespace-nowrap">
                <div className="flex space-x-2">
                  <a
                    href="#"
                    className="bg-green-600  text-white px-3 py-1 rounded-md text-xs font-medium lg:inline-block"
                  >
                    Race Winner
                  </a>

                  <a
                    href="#"
                    className="bg-white hover:bg-green-50 text-gray-700 px-3 py-1 rounded-md text-xs border border-gray-200 inline-block"
                  >
                    Podium Finish
                  </a>
                </div>
              </div>
            </div>

            <div className="mb-6 hidden lg:block">
              <Table
                title={'Formula 1'}
                bookmakerOdds={f1Desktop}
                columns={desktopCol}
              />
            </div>

            <div className="mb-6 lg:hidden">
              <Table
                title={'Formula 1'}
                bookmakerOdds={f1Mobile}
                columns={mobileCol}
              />
            </div>

            <div className="text-center mt-4">
              <a
                href="/football-predictions"
                className="inline-block bg-green-600  hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium"
              >
                View all formula 1 predictions
              </a>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default Tabs;
