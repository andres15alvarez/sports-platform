'use client';
import BarcelonaRadarChart from '../../charts/desktop/barcelona-radar';
import GoalComparisonChart from '../../charts/desktop/goal-comparison';
import HorizontalBarChart from '../../charts/desktop/goal-scored';
import BarChart from '../../charts/desktop/goals-timings';
import PieChart from '../../charts/desktop/historical-matchup-summary';
import PointsLineChart from '../../charts/desktop/last-ten-match-performance';
import MatchResultChart from '../../charts/desktop/match-result-probability';
import GoalsContributionComparison from '../../charts/desktop/player-goal-contribution';
import PointsProgressionChart from '../../charts/desktop/points-accumulation';
import RealMadridRadarChart from '../../charts/desktop/real-madrid';

import Image from 'next/image';
import React, { useState } from 'react';

type PlayerStat = {
  label: string;
  value: string | number;
};

type PlayerCardProps = {
  name: string;
  position: string;
  stats: PlayerStat[];
  description: string;
  color: string;
};

type AdvantageProps = {
  title: string;
  points: string[];
};

type MatchupProps = {
  title: string;
  description: string;
  left: AdvantageProps;
  right: AdvantageProps;
  chartId: string;
};

const outcomeData = [
  {
    label: 'Home Win',
    odds: '2.15',
    probability: '40%',
    color: 'blue',
  },
  {
    label: 'Draw',
    odds: '3.50',
    probability: '30%',
    color: 'gray',
  },
  {
    label: 'Away Win',
    odds: '3.25',
    probability: '30%',
    color: 'purple',
  },
];

const bettingTips = [
  {
    title: 'Both Teams to Score (BTTS) - YES',
    odds: '1.65',
    description:
      'Both teams have found the net in 8 of the last 10 El Clásico encounters. Given the offensive strength of both sides and the high-stakes nature of this match, both teams are likely to score.',
    confidence: 'High',
    successRate: '80%',
    border: 'green',
  },
  {
    title: 'Over 2.5 Goals',
    odds: '1.75',
    description:
      'Recent El Clásico encounters have been high-scoring affairs, with 7 of the last 10 matches featuring over 2.5 goals. The offensive quality of both teams suggests this trend will continue.',
    confidence: 'High',
    successRate: '70%',
    border: 'green',
  },
  {
    title: 'Lewandowski to Score Anytime',
    odds: '2.10',
    description:
      'The Polish striker has been in excellent form, scoring in 4 of his last 5 matches. His record against Real Madrid is impressive, with 5 goals in his last 7 appearances against them.',
    confidence: 'Medium',
    successRate: '65%',
    border: 'yellow',
  },
  {
    title: 'Barcelona Win & Over 1.5 Goals',
    odds: '2.75',
    description:
      'Barcelona s home advantage coupled with the attacking nature of both teams makes this an attractive proposition. Barcelona has won 14 of 17 home games, with 15 of those featuring more than 1.5 goals.',
    confidence: 'Medium',
    successRate: '60%',
    border: 'yellow',
  },
  {
    title: 'First Half Most Goals',
    odds: '3.25',
    description:
      'A riskier but potentially rewarding bet. In recent El Clásico encounters, the first half has featured more goals than the second in only 4 of the last 10 matches. However, the early intensity of this match could lead to an early goal rush.',
    confidence: 'Low',
    successRate: '40%',
    border: 'red',
  },
];

const goalScorers = [
  { player: 'Robert Lewandowski (BAR)', odds: '2.10' },
  { player: 'Vinícius Júnior (RMA)', odds: '2.75' },
  { player: 'Jude Bellingham (RMA)', odds: '3.00' },
  { player: 'Raphinha (BAR)', odds: '3.50' },
  { player: 'Rodrygo (RMA)', odds: '3.75' },
  { player: 'Pedri (BAR)', odds: '4.50' },
];

const otherMarkets = [
  { market: 'Exact Score: 2-1 Barcelona', odds: '9.00' },
  { market: 'Exact Score: 1-1 Draw', odds: '7.50' },
  { market: 'Exact Score: 2-1 Real Madrid', odds: '11.00' },
  { market: 'Half-Time/Full-Time: Draw/Barcelona', odds: '5.50' },
  { market: 'Half-Time/Full-Time: Draw/Real Madrid', odds: '7.00' },
  { market: 'Total Corners: Over 9.5', odds: '1.85' },
];

const AnalysisTabs = () => {
  const [activeTab, setActiveTab] = useState('analysis');

  const tabs = [
    { id: 'analysis', label: 'Match Analysis' },
    { id: 'head-to-head', label: 'Head-to-Head' },
    { id: 'team-stats', label: 'Team Stats' },
    { id: 'players', label: 'Key Players' },
    { id: 'predictions', label: 'Predictions' },
  ];

  return (
    <div className="hidden lg:block">
      {/* Tabs */}
      <div className="mb-4 border-b border-gray-200 text-black">
        <ul
          className="flex flex-wrap -mb-px text-sm font-medium text-center"
          id="analysisTabs"
        >
          {tabs.map((tab) => (
            <li key={tab.id} className="mr-2">
              <button
                onClick={() => setActiveTab(tab.id)}
                className={`inline-block p-4 border-b-2 rounded-t-lg ${
                  activeTab === tab.id
                    ? 'border-green-600 text-green-600'
                    : 'border-transparent hover:text-gray-600 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Content based on Active Tab */}
      <div className="p-4 bg-white rounded-lg">
        {activeTab === 'analysis' && (
          <div className="prose max-w-none text-black">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Match Analysis: Barcelona vs Real Madrid
            </h2>

            <p className="mb-4">
              The upcoming El Clásico between Barcelona and Real Madrid presents
              one of the most anticipated fixtures in world football. This
              analysis examines the key factors that could influence the
              outcome, including recent form, tactical approaches, and crucial
              player matchups.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Current Form Analysis
            </h3>

            <p className="mb-4">
              Real Madrid comes into this match as the league leaders, holding a
              5-point advantage over Barcelona. The visitors have shown
              exceptional consistency throughout the season, suffering only 2
              defeats in their last 20 league matches. Their defensive solidity
              has been particularly impressive, conceding just 23 goals in 34
              matches.
            </p>

            <p className="mb-4">
              Barcelona, despite some turbulence earlier in the season, have
              rallied strongly under their new tactical approach. They&rsquo;ve
              won 4 of their last 5 matches, with the lone defeat coming away to
              Atletico Madrid. Their home form has been near impeccable, winning
              14 of 17 matches at Camp Nou this season.
            </p>

            {/* Form Chart */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <h4 className="font-semibold mb-3">
                Last 10 Matches Performance
              </h4>
              <PointsLineChart />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Tactical Analysis
            </h3>

            <p className="mb-4">
              Barcelona&apos;s tactical approach has evolved significantly this
              season, transitioning from their traditional 4-3-3 to a more
              flexible 4-2-3-1 formation. This change has allowed their creative
              midfielders more freedom while providing additional defensive
              cover. Their possession-based style remains, but with a more
              vertical approach in transitions.
            </p>

            <p className="mb-4">
              Real Madrid has maintained their balanced 4-3-3 system,
              emphasizing quick transitions and exploiting wide areas. Their
              midfield trinity continues to control games effectively, while
              their full-backs provide width and attacking support. The
              defensive organization has been exceptional, often shifting to a
              compact 4-5-1 when out of possession.
            </p>

            {/* Expected Formations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-lg shadow-sm p-4">
                <h4 className="font-semibold mb-3 text-blue-800">
                  Barcelona Expected Formation (4-2-3-1)
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Marc-André ter Stegen</strong> (Goalkeeper)
                  </li>
                  <li>
                    <strong>Alejandro Baldé</strong> (Left Back)
                  </li>
                  <li>
                    <strong>Ronald Araújo</strong> (Center Back)
                  </li>
                  <li>
                    <strong>Jules Koundé</strong> (Center Back)
                  </li>
                  <li>
                    <strong>João Cancelo</strong> (Right Back)
                  </li>
                  <li>
                    <strong>Frenkie de Jong</strong> (Central Midfielder)
                  </li>
                  <li>
                    <strong>Ilkay Gündogan</strong> (Central Midfielder)
                  </li>
                  <li>
                    <strong>Raphinha</strong> (Left Winger)
                  </li>
                  <li>
                    <strong>Pedri</strong> (Attacking Midfielder)
                  </li>
                  <li>
                    <strong>Lamine Yamal</strong> (Right Winger)
                  </li>
                  <li>
                    <strong>Robert Lewandowski</strong> (Striker)
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-lg shadow-sm p-4">
                <h4 className="font-semibold mb-3 text-purple-800">
                  Real Madrid Expected Formation (4-3-3)
                </h4>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Thibaut Courtois</strong> (Goalkeeper)
                  </li>
                  <li>
                    <strong>Ferland Mendy</strong> (Left Back)
                  </li>
                  <li>
                    <strong>Antonio Rüdiger</strong> (Center Back)
                  </li>
                  <li>
                    <strong>Éder Militão</strong> (Center Back)
                  </li>
                  <li>
                    <strong>Dani Carvajal</strong> (Right Back)
                  </li>
                  <li>
                    <strong>Eduardo Camavinga</strong> (Central Midfielder)
                  </li>
                  <li>
                    <strong>Aurélien Tchouaméni</strong> (Central Midfielder)
                  </li>
                  <li>
                    <strong>Jude Bellingham</strong> (Central Midfielder)
                  </li>
                  <li>
                    <strong>Vinícius Júnior</strong> (Left Winger)
                  </li>
                  <li>
                    <strong>Kylian Mbappé</strong> (Striker)
                  </li>
                  <li>
                    <strong>Rodrygo</strong> (Right Winger)
                  </li>
                </ul>
              </div>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Key Battle Areas
            </h3>

            <ol className="list-decimal pl-6 mb-6 space-y-3">
              <li>
                <strong>Midfield Control:</strong> Barcelona&apos;s double pivot
                versus Real Madrid&apos;s midfield trio will be crucial in
                determining which team dominates possession and dictates the
                tempo.
              </li>
              <li>
                <strong>Wing Play:</strong> Both teams rely heavily on their
                wide attackers. Barcelona&apos;s wingers tend to cut inside,
                while Real Madrid&apos;s prefer to stretch play and deliver
                crosses.
              </li>
              <li>
                <strong>High Press:</strong> Barcelona&apos;s pressing has
                intensified recently, but Real Madrid&apos;s ability to play
                through pressure could prove decisive.
              </li>
              <li>
                <strong>Set Pieces:</strong> Real Madrid has scored 14 goals
                from set pieces this season, while Barcelona has shown
                vulnerability in defending dead-ball situations.
              </li>
              <li>
                <strong>Transition Moments:</strong> Real Madrid excels in
                counter-attacking scenarios, making Barcelona&apos;s defensive
                transitions a potential weakness to exploit.
              </li>
            </ol>

            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
              <h4 className="font-semibold text-yellow-800 mb-2">
                Expert Insight
              </h4>
              <p className="text-yellow-800">
                &apos;This El Clásico comes at a critical juncture in the title
                race. Barcelona must win to maintain any realistic hopes of
                catching Real Madrid. Expect an aggressive approach from the
                home side from the opening whistle, while Real Madrid will
                likely adopt a more measured approach, looking to exploit spaces
                on the counter-attack.&apos;
              </p>
            </div>
          </div>
        )}
        {activeTab === 'head-to-head' && (
          <div id="head-to-head-content" className="text-black hidden md:block">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Head-to-Head: Barcelona vs Real Madrid
            </h2>

            {/* Historical Matchup Summary */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Historical Matchup Summary
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <span className="block text-3xl font-bold text-blue-600 mb-2">
                    96
                  </span>
                  <span className="text-sm text-gray-600">Barcelona Wins</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <span className="block text-3xl font-bold text-gray-600 mb-2">
                    52
                  </span>
                  <span className="text-sm text-gray-600">Draws</span>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <span className="block text-3xl font-bold text-purple-600 mb-2">
                    101
                  </span>
                  <span className="text-sm text-gray-600">
                    Real Madrid Wins
                  </span>
                </div>
              </div>

              {/* Head to Head Chart */}
              <div className="mb-6">
                <PieChart />
              </div>

              {/* Last 5 Meetings */}
              <h4 className="font-semibold mb-3">Last 5 Meetings</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      {['Date', 'Competition', 'Home', 'Score', 'Away'].map(
                        (heading) => (
                          <th
                            key={heading}
                            className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            {heading}
                          </th>
                        ),
                      )}
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        date: 'Dec 21, 2024',
                        competition: 'La Liga',
                        home: 'Real Madrid',
                        score: '2-1',
                        away: 'Barcelona',
                      },
                      {
                        date: 'Apr 13, 2024',
                        competition: 'La Liga',
                        home: 'Barcelona',
                        score: '2-2',
                        away: 'Real Madrid',
                      },
                      {
                        date: 'Jan 14, 2024',
                        competition: 'Super Cup',
                        home: 'Real Madrid',
                        score: '3-1',
                        away: 'Barcelona',
                      },
                      {
                        date: 'Oct 28, 2023',
                        competition: 'La Liga',
                        home: 'Barcelona',
                        score: '1-2',
                        away: 'Real Madrid',
                      },
                      {
                        date: 'Mar 19, 2023',
                        competition: 'La Liga',
                        home: 'Barcelona',
                        score: '2-1',
                        away: 'Real Madrid',
                      },
                    ].map((match, idx) => (
                      <tr key={idx}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.competition}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {match.home}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {match.score}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {match.away}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Goal Distribution */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Goal Distribution
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">
                    Goals Scored (Last 10 Meetings)
                  </h4>
                  <HorizontalBarChart />
                </div>
                <div>
                  <h4 className="font-semibold mb-3">
                    Goal Timing (Last 10 Meetings)
                  </h4>
                  <BarChart />
                </div>
              </div>
            </div>

            {/* El Clásico Records */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                El Clásico Records
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">All-Time Top Scorers</h4>
                  <ol className="list-decimal pl-6 space-y-2">
                    {[
                      { player: 'Lionel Messi (Barcelona)', goals: 26 },
                      { player: 'Cristiano Ronaldo (Real Madrid)', goals: 18 },
                      { player: 'Alfredo Di Stéfano (Real Madrid)', goals: 18 },
                      { player: 'Ferenc Puskás (Real Madrid)', goals: 14 },
                      { player: 'Karim Benzema (Real Madrid)', goals: 13 },
                    ].map((scorer, idx) => (
                      <li key={idx}>
                        <strong>{scorer.player}</strong>: {scorer.goals} goals
                      </li>
                    ))}
                  </ol>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">
                    Notable El Clásico Moments
                  </h4>
                  <ul className="list-disc pl-6 space-y-2">
                    {[
                      {
                        moment: 'Nov 2010',
                        detail: 'Barcelona s 5-0 victory at Camp Nou',
                      },
                      {
                        moment: 'Apr 2017',
                        detail:
                          "Messi's last-minute winner and iconic shirt celebration",
                      },
                      {
                        moment: 'Aug 2011',
                        detail: "José Mourinho's eye-poke incident",
                      },
                      {
                        moment: 'May 2009',
                        detail: 'Barcelona s 6-2 win at the Bernabéu',
                      },
                      {
                        moment: 'Mar 2024',
                        detail: 'Real Madrid s comeback from 0-2 to win 3-2',
                      },
                    ].map((event, idx) => (
                      <li key={idx}>
                        <strong>{event.moment}</strong>: {event.detail}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'team-stats' && (
          <div id="team-stats-content" className="text-black hidden  md:block">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Team Statistics Comparison
            </h2>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Season Performance
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3">Points Accumulation</h4>
                  <PointsProgressionChart />
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Goals Comparison</h4>
                  <GoalComparisonChart />
                </div>
              </div>

              <h4 className="font-semibold mb-3">Key Performance Metrics</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Metric
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Barcelona
                      </th>
                      <th className="px-6 py-3 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Real Madrid
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {[
                      {
                        metric: 'Possession (%)',
                        barcelona: '65.2',
                        madrid: '58.7',
                      },
                      {
                        metric: 'Pass Accuracy (%)',
                        barcelona: '89.3',
                        madrid: '87.1',
                      },
                      {
                        metric: 'Shots per Game',
                        barcelona: '15.8',
                        madrid: '17.2',
                      },
                      {
                        metric: 'Shots on Target',
                        barcelona: '6.4',
                        madrid: '7.1',
                      },
                      {
                        metric: 'Dribbles per Game',
                        barcelona: '11.3',
                        madrid: '9.6',
                      },
                      {
                        metric: 'Tackles per Game',
                        barcelona: '18.2',
                        madrid: '19.4',
                      },
                      {
                        metric: 'Corners per Game',
                        barcelona: '6.1',
                        madrid: '5.8',
                      },
                      {
                        metric: 'Fouls per Game',
                        barcelona: '9.8',
                        madrid: '10.3',
                      },
                    ].map(({ metric, barcelona, madrid }, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {metric}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                          {barcelona}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-gray-500">
                          {madrid}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Barcelona Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Barcelona Performance Radar
                </h3>
                <BarcelonaRadarChart />
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Team Strengths</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Exceptional ball possession and control in midfield</li>
                    <li>High pressing efficiency in opponent&apos;s half</li>
                    <li>Strong conversion rate from set pieces</li>
                    <li>Impressive home record (14W-2D-1L)</li>
                  </ul>

                  <h4 className="font-semibold mt-3 mb-2">Team Weaknesses</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Vulnerability to counter-attacks</li>
                    <li>Relatively lower aerial duel success rate</li>
                    <li>Inconsistency in defensive transitions</li>
                    <li>Lower efficiency in away matches</li>
                  </ul>
                </div>
              </div>

              {/* Real Madrid Card */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Real Madrid Performance Radar
                </h3>
                <RealMadridRadarChart />
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">Team Strengths</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Elite counter-attacking capabilities</li>
                    <li>Exceptional aerial threat from set pieces</li>
                    <li>Strong defensive organization and discipline</li>
                    <li>
                      Consistent performance across home and away fixtures
                    </li>
                  </ul>

                  <h4 className="font-semibold mt-3 mb-2">Team Weaknesses</h4>
                  <ul className="list-disc pl-6 space-y-1 text-sm">
                    <li>Occasional vulnerability to high-pressing teams</li>
                    <li>
                      Less effective in breaking down deep defensive blocks
                    </li>
                    <li>Over-reliance on key players in critical moments</li>
                    <li>Higher fouls committed in crucial matches</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
        {activeTab === 'players' && (
          <div id="players-content" className="text-black hidden md:block">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Key Players Analysis
            </h2>

            {/* Goal Contribution Comparison Chart */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Goal Contribution Comparison
              </h3>
              <GoalsContributionComparison />
              <p className="text-sm text-gray-600 mt-4">
                Chart shows combined goals and assists for top 5 contributors
                from each team this season.
              </p>
            </div>

            {/* Barcelona and Real Madrid Key Players */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Barcelona */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/en/4/47/FC_Barcelona_%28crest%29.svg"
                    alt="FC Barcelona"
                    width={32}
                    height={32}
                    className="w-8 h-8 mr-3"
                  />
                  <h3 className="text-xl font-semibold text-blue-800">
                    Barcelona Key Players
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Robert Lewandowski */}
                  <PlayerCard
                    name="Robert Lewandowski"
                    position="Forward"
                    stats={[
                      { label: 'Goals', value: 27 },
                      { label: 'Assists', value: 6 },
                      { label: 'Matches', value: 33 },
                    ]}
                    description="The Polish striker continues to demonstrate exceptional finishing ability and positioning. His movement in the box creates constant problems for defenders."
                    color="blue"
                  />

                  {/* Pedri */}
                  <PlayerCard
                    name="Pedri"
                    position="Midfielder"
                    stats={[
                      { label: 'Goals', value: 8 },
                      { label: 'Assists', value: 12 },
                      { label: 'Matches', value: 29 },
                    ]}
                    description="Barcelona s creative hub, Pedri's vision and passing ability have been instrumental in creating opportunities. His ability to operate in tight spaces is exceptional."
                    color="blue"
                  />

                  {/* Marc-André ter Stegen */}
                  <PlayerCard
                    name="Marc-André ter Stegen"
                    position="Goalkeeper"
                    stats={[
                      { label: 'Clean Sheets', value: 13 },
                      { label: 'Goals Conceded', value: 28 },
                      { label: 'Matches', value: 32 },
                    ]}
                    description="The German goalkeeper has been vital to Barcelona s defensive stability with crucial saves in critical moments. His distribution and command of the box have improved significantly."
                    color="blue"
                  />
                </div>
              </div>

              {/* Real Madrid */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center mb-4">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg"
                    alt="Real Madrid"
                    width={32}
                    height={32}
                    className="w-8 h-8 mr-3"
                  />
                  <h3 className="text-xl font-semibold text-purple-800">
                    Real Madrid Key Players
                  </h3>
                </div>

                <div className="space-y-4">
                  {/* Vinícius Júnior */}
                  <PlayerCard
                    name="Vinícius Júnior"
                    position="Forward"
                    stats={[
                      { label: 'Goals', value: 22 },
                      { label: 'Assists', value: 14 },
                      { label: 'Matches', value: 31 },
                    ]}
                    description="The Brazilian winger has evolved into a complete forward. His pace and dribbling ability make him a constant threat, while his finishing has reached elite levels."
                    color="purple"
                  />

                  {/* Jude Bellingham */}
                  <PlayerCard
                    name="Jude Bellingham"
                    position="Midfielder"
                    stats={[
                      { label: 'Goals', value: 18 },
                      { label: 'Assists', value: 10 },
                      { label: 'Matches', value: 34 },
                    ]}
                    description="The English midfielder has adapted seamlessly to La Liga, providing both goal-scoring and creative qualities. His box-to-box presence has transformed Real Madrid s midfield."
                    color="purple"
                  />

                  {/* Antonio Rüdiger */}
                  <PlayerCard
                    name="Antonio Rüdiger"
                    position="Defender"
                    stats={[
                      { label: 'Goals', value: 3 },
                      { label: 'Clean Sheets', value: 12 },
                      { label: 'Matches', value: 33 },
                    ]}
                    description="The German defender has been a rock at the back for Real Madrid, combining physical presence with tactical intelligence. His leadership has solidified the defensive line."
                    color="purple"
                  />
                </div>
              </div>
            </div>

            {/* Key Player Matchups */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Key Player Matchups
              </h3>

              <div className="space-y-6">
                {/* Matchup 1 */}
                <Matchup
                  title="Lewandowski vs. Rüdiger"
                  description="This battle could define the outcome of the match. Lewandowski's clever movement against Rüdiger's physicality and anticipation presents a fascinating tactical duel."
                  left={{
                    title: 'Lewandowski Advantage',
                    points: [
                      'Superior positioning in the box',
                      'Clinical finishing with both feet',
                      'Experience in high-pressure matches',
                    ],
                  }}
                  right={{
                    title: 'Rüdiger Advantage',
                    points: [
                      'Physical strength in duels',
                      'Exceptional aerial ability',
                      'Recovery pace when turned',
                    ],
                  }}
                  chartId="duelChart1"
                />

                {/* Matchup 2 */}
                <Matchup
                  title="Pedri vs. Bellingham"
                  description="The midfield battle between these two young talents will be crucial. Pedri's technical ability against Bellingham's athleticism represents a contrast in midfield styles."
                  left={{
                    title: 'Pedri Advantage',
                    points: [
                      'Superior ball retention',
                      'Vision and passing range',
                      'Ability to operate in tight spaces',
                    ],
                  }}
                  right={{
                    title: 'Bellingham Advantage',
                    points: [
                      'Superior goal-scoring threat',
                      'Physical presence in duels',
                      'Box-to-box stamina',
                    ],
                  }}
                  chartId="duelChart2"
                />
              </div>
            </div>
          </div>
        )}
        ;
        {activeTab === 'predictions' && (
          <div id="predictions-content" className="text-black hidden md:block">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Match Predictions & Betting Tips
            </h2>

            {/* Outcome Prediction */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Outcome Prediction
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold mb-3">
                    Match Result Probability
                  </h4>
                  <MatchResultChart />
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Expert Analysis</h4>
                  <p className="text-sm mb-3">
                    Based on our comprehensive analysis of current form,
                    historical matchups, and key player performance, Barcelona
                    holds a slight edge in this El Clásico encounter. The home
                    advantage at Camp Nou will be significant, particularly
                    given Barcelona&apos;s impressive home record this season.
                  </p>
                  <p className="text-sm">
                    However, Real Madrid&apos;s recent form and tactical
                    approach in big matches cannot be overlooked. Their ability
                    to absorb pressure and strike on the counter makes them
                    dangerous regardless of venue.
                  </p>
                </div>
              </div>

              {/* Probabilities */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                {outcomeData.map((item, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 text-center hover:bg-${item.color}-50 transition-colors`}
                  >
                    <span className="text-sm text-gray-600">{item.label}</span>
                    <div
                      className={`text-2xl font-bold text-${item.color}-600 my-2`}
                    >
                      {item.odds}
                    </div>
                    <span
                      className={`text-xs bg-${item.color}-100 text-${item.color}-800 px-2 py-1 rounded`}
                    >
                      {item.probability} Probability
                    </span>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Prediction: Barcelona 2-1 Real Madrid
                </h4>
                <p className="text-sm text-yellow-800">
                  Barcelona&apos;s home advantage and the must-win nature of
                  this match should provide enough motivation to secure a narrow
                  victory. Expect a closely contested match with both teams
                  finding the net, but Barcelona&apos;s offensive firepower at
                  Camp Nou should prove decisive.
                </p>
              </div>
            </div>

            {/* Betting Tips */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Top Betting Tips
              </h3>

              <div className="space-y-4">
                {bettingTips.map((tip, index) => (
                  <div
                    key={index}
                    className={`border-l-4 border-${tip.border}-900 pl-4 py-2`}
                  >
                    <div className="flex justify-between items-center">
                      <h4 className="font-semibold">{tip.title}</h4>
                      <div className="text-lg font-bold text-green-600">
                        {tip.odds}
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
                      {tip.description}
                    </p>
                    <div className="mt-2">
                      <span
                        className={`inline-block px-2 py-1 bg-${tip.border}-100 text-${tip.border}-800 rounded text-xs`}
                      >
                        Confidence: {tip.confidence}
                      </span>
                      <span
                        className={`inline-block px-2 py-1 bg-${tip.border}-100 text-${tip.border}-800 rounded text-xs ml-2`}
                      >
                        Historical Success Rate: {tip.successRate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Goal Scorer Predictions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Goal Scorers Prediction
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Player</span>
                    <span className="font-medium">Anytime Scorer Odds</span>
                  </div>
                  {goalScorers.map((g, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center"
                    >
                      <span>{g.player}</span>
                      <span className="font-bold text-green-600">{g.odds}</span>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-600 mt-4">
                  Odds provided are the best available across major bookmakers
                  as of April 27, 2025.
                </p>
              </div>

              {/* Other Markets */}
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Other Popular Markets
                </h3>

                <div className="space-y-3">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-medium">Market</span>
                    <span className="font-medium">Odds</span>
                  </div>
                  {otherMarkets.map((m, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center"
                    >
                      <span>{m.market}</span>
                      <span className="font-bold text-green-600">{m.odds}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-blue-50 p-3 rounded-lg mt-4">
                  <p className="text-sm text-blue-800">
                    Remember to bet responsibly. Odds are subject to change and
                    should be checked before placing any bets.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const PlayerCard: React.FC<PlayerCardProps> = ({
  name,
  position,
  stats,
  description,
  color,
}) => (
  <div className="border-b border-gray-100 pb-4">
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold">{name}</span>
      <span
        className={`text-xs bg-${color}-100 text-${color}-800 px-2 py-1 rounded`}
      >
        {position}
      </span>
    </div>
    <div className="grid grid-cols-3 gap-2 text-center text-sm">
      {stats.map((stat, idx) => (
        <div key={idx}>
          <span className="block font-bold text-xl">{stat.value}</span>
          <span className="text-xs text-gray-600">{stat.label}</span>
        </div>
      ))}
    </div>
    <p className="text-sm mt-2">{description}</p>
  </div>
);

const Matchup: React.FC<MatchupProps> = ({
  title,
  description,
  left,
  right,
  chartId,
}) => (
  <div className="border-b border-gray-100 pb-4">
    <h4 className="font-semibold mb-3">{title}</h4>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <p className="text-sm mb-3">{description}</p>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <Advantage title={left.title} points={left.points} />
          <Advantage title={right.title} points={right.points} />
        </div>
      </div>
      <div>
        <canvas id={chartId} width="400" height="150"></canvas>
      </div>
    </div>
  </div>
);

const Advantage: React.FC<AdvantageProps> = ({ title, points }) => (
  <div>
    <span className="font-medium">{title}:</span>
    <ul className="list-disc pl-5 text-xs space-y-1 mt-1">
      {points.map((point, idx) => (
        <li key={idx}>{point}</li>
      ))}
    </ul>
  </div>
);

export default AnalysisTabs;
